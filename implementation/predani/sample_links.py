"""Keep the links in a portable sample within its selected set of HTML pages."""
from html import escape, unescape
import re
from urllib.parse import parse_qs, unquote, urljoin, urlsplit

# Templates contain generated, non-nested anchors. Edit those in place so that
# untouched markup (including inert search templates) retains its original bytes.
ANCHOR = re.compile(r'<a\b(?P<attrs>[^>]*?)>(?P<body>.*?)</a\s*>', re.I | re.S)
HREF = re.compile(r'''\shref\s*=\s*(["'])(.*?)\1''', re.I | re.S)
CLASS = re.compile(r'''\sclass\s*=\s*(["'])(.*?)\1''', re.I | re.S)
RELATED_NAV = re.compile(r'<nav\b[^>]*\bclass="related-links"[^>]*>.*?</nav>', re.S)
ICONS = re.compile(r'<span class="ui-icon\b[^"]*"[^>]*>\s*</span>', re.S)
HIDDEN_LABEL = re.compile(r'<span class="visually-hidden"[^>]*>.*?</span>', re.S)
CARD_ACTION = re.compile(r'<span class="text-link"[^>]*>.*?</span>\s*$', re.S)
DETAIL_ACTION = re.compile(r'Detail (?:soutěže|utkání|turnaje|týmu|klubu)')
EMPTY_ACTIONS = re.compile(r'<div class="(?:club-card__actions|league-group__actions|text-actions)">\s*</div>')


def prepare_sample(markup, approved_names):
    """Preserve readable record data when its own destination is outside the handoff."""
    def render_link(match, *, navigation=False):
        attrs, body = match.group('attrs', 'body')
        href = HREF.search(attrs)
        if not href:
            return match[0]
        url = urlsplit(unescape(href[2]))
        if url.scheme or url.netloc:
            if (url.hostname == 'czechsquash.cz' and url.path.startswith('/liga/')
                    and url.path.rstrip('/').endswith('/vysledky') and body.startswith('Detail utkání')):
                query = parse_qs(url.query)
                if query.get('turnier') and not query.get('liga'):
                    return match[0].replace('>Detail utkání', '>Přehled termínu', 1)
            return match[0]
        if not unquote(url.path).lower().endswith('.html'):
            return match[0]

        path = urljoin('/templates/', unquote(url.path))
        name = path.rsplit('/', 1)[-1]
        if path == '/templates/' + name:
            if name == 'treneri-dokumenty.html' and 'dokumenty-treneri.html' in approved_names:
                folder, slash, _ = url.path.rpartition('/')
                alias_path = folder + slash + 'dokumenty-treneri.html'
                alias = escape(url._replace(path=alias_path).geturl(), quote=True)
                return '<a' + attrs[:href.start(2)] + alias + attrs[href.end(2):] + '>' + body + '</a>'
            if name in approved_names:
                return match[0]

        if navigation:
            return ''
        class_attr = CLASS.search(attrs)
        classes = class_attr[2].split() if class_attr else []
        if 'button' in classes or 'match-event__bracket' in classes or 'section-action' in classes:
            return ''
        if 'directory-card' in classes:
            # Keep the title and description together. The actionable footer and
            # the linked-card hover style only belong to an available destination.
            return '<article class="accent-card">' + CARD_ACTION.sub('', ICONS.sub('', body)) + '</article>'
        if 'article-card__media' in classes or 'hero__media-link' in classes:
            return '<div class="' + escape(' '.join(classes), quote=True) + '">' + body + '</div>'
        content = ICONS.sub('', body)
        visible_label = re.sub(r'<[^>]+>', '', HIDDEN_LABEL.sub('', content)).strip()
        if DETAIL_ACTION.fullmatch(visible_label) or (not visible_label and '<img' not in content):
            return ''
        return content

    def related_nav(match):
        block = ANCHOR.sub(lambda link: render_link(link, navigation=True), match[0])
        block = re.sub(r'<li>\s*</li>', '', block)
        return block if ANCHOR.search(block) else ''

    markup = RELATED_NAV.sub(related_nav, markup)
    return EMPTY_ACTIONS.sub('', ANCHOR.sub(render_link, markup))
