"""Create portable Markdown and the shared AI actions from each handoff guide."""
from html import escape
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import urlsplit

VOID_ELEMENTS = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}


class Markdown(HTMLParser):
    """Read the semantic content of the guides, including collapsed examples."""
    def __init__(self):
        super().__init__()
        self.active = False
        self.skip = 0
        self.parts = []
        self.links = []
        self.lists = []

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if tag == 'main':
            self.active = True
        if not self.active:
            return
        if self.skip or tag == 'nav' or attrs.get('class') in ('eyebrow', 'former-chapters'):
            if tag not in VOID_ELEMENTS:
                self.skip += 1
            return
        if tag in ('section', 'details') and 'id' in attrs:
            self.parts.append(f'\n\n<a id="{escape(attrs["id"])}"></a>\n')
        elif tag in ('h1', 'h2', 'h3', 'h4'):
            self.parts.append('\n\n' + '#' * int(tag[1]) + ' ')
        elif tag in ('ul', 'ol'):
            # The directory entries already introduce each item with its own heading.
            self.lists.append(['headings' if attrs.get('class') == 'template-list' else tag, 0])
            self.parts.append('\n')
        elif tag == 'li':
            group = self.lists[-1]
            group[1] += 1
            if group[0] != 'headings':
                self.parts.append('\n' + ('- ' if group[0] == 'ul' else f'{group[1]}. '))
        elif tag == 'a':
            if self.parts and self.parts[-1].startswith(']('):
                self.parts.append('\n\n')
            target = urlsplit(attrs['href'])
            if not target.netloc and not target.scheme and '/' not in target.path and target.path.endswith('.html'):
                target = target._replace(path=Path(target.path).with_suffix('.md').name)
            self.links.append(target.geturl())
            self.parts.append('[')
        elif tag == 'summary':
            self.parts.append('\n\n## ' if attrs.get('class') == 'directory-heading' else '\n\n### ')
        elif tag == 'strong':
            self.parts.append('**')
        elif tag == 'code':
            self.parts.append('`')

    def handle_endtag(self, tag):
        if not self.active:
            return
        if self.skip:
            if tag not in VOID_ELEMENTS:
                self.skip -= 1
        elif tag == 'main':
            self.active = False
        elif tag == 'a':
            self.parts.append('](' + self.links.pop() + ')')
        elif tag == 'strong':
            self.parts.append('**')
        elif tag == 'code':
            self.parts.append('`')
        elif tag in ('ul', 'ol'):
            self.lists.pop()
            self.parts.append('\n\n')
        elif tag in ('p', 'h1', 'h2', 'h3', 'h4', 'article', 'section', 'details', 'summary'):
            self.parts.append('\n\n')

    def handle_data(self, text):
        if self.active and not self.skip:
            # Source indentation separates block elements but inline spaces carry meaning.
            if text.strip() or '\n' not in text:
                self.parts.append(re.sub(r'\s+', ' ', text))

    def result(self):
        lines = (line.strip() for line in ''.join(self.parts).splitlines())
        return re.sub(r'\n{3,}', '\n\n', '\n'.join(lines)).strip() + '\n'


def render_page(name, source, menu):
    parser = Markdown()
    parser.feed(source)
    parser.close()
    markdown = parser.result()
    if name == 'index.html':
        title, body = markdown.split('\n', 1)
        markdown = f'{title}\n\n[Obecné principy](principy.md)\n{body}'
    md_name = Path(name).with_suffix('.md').name
    alternate = f'<link rel="alternate" type="text/markdown" href="{md_name}">'
    html = source.replace('</head>', f'  {alternate}\n  <script src="ai.js" defer></script>\n</head>')
    end = html.index('</nav>', html.index('class="handoff-nav"'))
    html = html[:end] + menu.replace('MARKDOWN_FILE', md_name) + '\n    ' + html[end:]
    html = html.replace('</body>', '<template id="page-markdown">' + escape(markdown) + '</template>\n</body>')
    return {name: html.encode('utf-8'), md_name: markdown.encode('utf-8')}
