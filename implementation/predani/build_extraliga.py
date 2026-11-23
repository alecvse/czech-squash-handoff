"""Build the local Czech Squash handoff preview, or its final ZIP on request."""
from argparse import ArgumentParser
from hashlib import sha256
from html import escape
from html.parser import HTMLParser
from pathlib import Path
import re
from tempfile import NamedTemporaryFile
from urllib.parse import unquote, urlsplit
from zipfile import ZipFile, ZIP_DEFLATED

from doc_pages import render_page

ROOT = Path(__file__).resolve().parents[2]
GUIDE = Path(__file__).resolve().parent / 'extraliga'
ARCHIVE = ROOT / 'outputs/predani/extraliga.zip'
CHAPTERS = (
    'souteze-druzstev.html', 'sportovni-prehledy.html', 'kluby-nabory.html',
    'uvod-media.html', 'asociace-dokumenty.html', 'odborny-servis.html',
)
WITHHELD = {'historie.html', 'co-je-to-squash.html', 'design-system.html'}


def withheld(name):
    return name in WITHHELD or name.startswith('turnaj-')


class PageLinks(HTMLParser):
    def __init__(self, base):
        super().__init__()
        self.base = base
        self.assets = set()
        self.samples = set()

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key not in ('src', 'href') or not value:
                continue
            url = urlsplit(value)
            if url.scheme or url.netloc or not url.path:
                continue
            path = (self.base / unquote(url.path)).resolve()
            if path.is_relative_to(ROOT / 'assets'):
                self.assets.add(path.relative_to(ROOT))
            if self.base == ROOT and tag == 'a' and path.parent == ROOT / 'templates' and path.suffix == '.html':
                self.samples.add(path.name)


class Chapter(HTMLParser):
    """Read the directory entries from the chapter's own section headings."""
    def __init__(self, filename, markup):
        super().__init__()
        self.filename = filename
        self.title = ''
        self.entries = []
        self.current = None
        self.heading = None
        self.words = []
        self.feed(markup)
        self.close()
        if not self.title or not self.entries:
            raise ValueError(f'Missing title or page types in {filename}')

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'section' and 'data-template' in a:
            self.current = (a['id'], a['data-template'])
        if tag == 'h1' or tag == 'h2' and self.current:
            self.heading = tag
            self.words = []

    def handle_data(self, data):
        if self.heading:
            self.words.append(data)

    def handle_endtag(self, tag):
        if tag != self.heading:
            return
        title = ' '.join(''.join(self.words).split())
        if tag == 'h1':
            self.title = title
        else:
            anchor, sample = self.current
            self.entries.append((anchor, title, sample))
            self.current = None
        self.heading = None

    def directory_html(self):
        rows = []
        for anchor, title, sample in self.entries:
            rows.append(
                f'<li><h3><a href="{escape(self.filename)}#{escape(anchor)}">{escape(title)}</a></h3>'
                f'<a href="templates/{escape(sample)}" '
                f'aria-label="Otevřít mustr – {escape(title)}">Otevřít mustr</a></li>'
            )
        return (f'<details class="directory-group"><summary class="directory-heading">{escape(self.title)}'
                '<span class="ui-icon ui-icon--chevron-down" aria-hidden="true"></span></summary>'
                f'<p><a href="{escape(self.filename)}">Zadání celé sekce · {escape(self.title)}</a></p>'
                '<ul class="template-list">\n' + '\n'.join(rows) + '\n</ul></details>')


def sample_markup(name):
    if Path(name).name != name or not name.endswith('.html') or withheld(name):
        raise ValueError(f'Outside the approved handoff: {name}')
    markup = (ROOT / 'templates' / name).read_text(encoding='utf-8')
    markup = re.sub(r'<!--\s*old fixtures:start\b.*?-->', '', markup, flags=re.S)
    markup = re.sub(r'<li>\s*<a href="\./historie\.html">Historie(?: squashe)?</a>\s*</li>', '', markup)
    # Keep event names in the approved calendar and homepage. The deferred tournament
    # detail itself is outside the handoff, including standalone calls to open it.
    def approved_link(match):
        if not withheld(match['target']):
            return match[0]
        if 'class="button' in match[0].split('>', 1)[0]:
            return ''
        return match['label']
    markup = re.sub(r'<a\b[^>]*?\bhref="(?:\./)?(?P<target>[^"/?#]+\.html)(?:[?#][^"]*)?"[^>]*>'
                    r'(?P<label>.*?)</a>', approved_link, markup, flags=re.S)
    return markup.replace('../assets/js/mapy-config.local.js', '../assets/js/mapy-config.js')


def style_assets(stylesheet):
    sheet = (ROOT / stylesheet).read_text(encoding='utf-8')
    for ref in re.findall(r'url\(["\']?([^)"\']+)', sheet):
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            raise ValueError(f'Unexpected non-local stylesheet asset: {ref}')
        if url.path:
            yield (ROOT / stylesheet.parent / unquote(url.path)).resolve().relative_to(ROOT)


def package_files():
    sources = {name: (GUIDE / name).read_text(encoding='utf-8')
               for name in ('index.html', 'principy.html', *CHAPTERS)}
    chapters = [Chapter(name, sources[name]) for name in CHAPTERS]
    directory = '\n'.join(ch.directory_html() for ch in chapters)
    sources['index.html'] = sources['index.html'].replace('<!-- SECTION_DIRECTORY -->', directory)
    guide_files = ('predani.css', 'puvodni-odkazy.js', 'nahled.py', 'ai.js')
    files = {name: (GUIDE / name).read_bytes() for name in guide_files}
    style_version = sha256(files['predani.css']).hexdigest()[:12]
    menu = (GUIDE / 'ai-menu.inc.html').read_text(encoding='utf-8')
    index = ['# Czech Squash — předání šablon', '', '## Dokumentace', '']
    links = PageLinks(ROOT)
    for name, source in sources.items():
        source = source.replace('href="predani.css"', f'href="predani.css?v={style_version}"')
        links.feed(source)
        pages = render_page(name, source, menu)
        files.update(pages)
        md_name = Path(name).with_suffix('.md').name
        title = pages[md_name].decode('utf-8').splitlines()[0].removeprefix('# ')
        index.append(f'- [{title}]({md_name})')
    files['llms.txt'] = ('\n'.join(index) + '\n').encode('utf-8')
    files['assets/font/VendSans-OFL.txt'] = (GUIDE / 'VendSans-OFL.txt').read_bytes()
    template_links = PageLinks(ROOT / 'templates')
    for name in sorted(links.samples):
        markup = sample_markup(name)
        template_links.feed(markup)
        files['templates/' + name] = markup.encode('utf-8')

    paths = links.assets | template_links.assets
    for sheet in [p for p in paths if p.suffix == '.css']:
        paths.update(style_assets(sheet))
    # These icons are loaded by site.js when the respective widget is active.
    if Path('assets/js/mapy-config.js') in paths:
        paths.remove(Path('assets/js/mapy-config.js'))
        files['assets/js/mapy-config.js'] = b'window.CZECH_SQUASH_MAPY_KEY = "";\n'
        paths.update(Path('assets/ui', name) for name in ('logo-mapy.svg', 'club-map-marker.svg'))
    if any(path.name == 'echarts.min.js' for path in paths):
        paths.add(Path('assets/ui/champion-stroke-rounded-16.svg'))
    for vendor in {p.parts[2] for p in paths if p.parts[:2] == ('assets', 'vendor')}:
        lib = Path('assets/vendor', vendor)
        for name in ('LICENSE', 'NOTICE', 'SOURCE.txt'):
            if (ROOT / lib / name).is_file():
                paths.add(lib / name)
    for path in paths:
        if not (ROOT / path).resolve().is_relative_to(ROOT / 'assets'):
            raise ValueError(f'Asset outside the project assets: {path}')
        files[path.as_posix()] = (ROOT / path).read_bytes()
    return files


def write_preview(files):
    directory = ARCHIVE.with_suffix('')
    for name, data in files.items():
        target = directory / name
        if target.is_file() and target.read_bytes() == data:
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
    print(f'{directory} ({len(files)} files)')


def write_archive(files):
    ARCHIVE.parent.mkdir(parents=True, exist_ok=True)
    with NamedTemporaryFile(dir=ARCHIVE.parent, delete=False) as temp:
        tmp = Path(temp.name)
    try:
        with ZipFile(tmp, 'w', compression=ZIP_DEFLATED) as archive:
            for name, data in sorted(files.items()):
                archive.writestr('extraliga/' + name, data)
        tmp.replace(ARCHIVE)
    finally:
        tmp.unlink(missing_ok=True)
    print(f'{ARCHIVE} ({len(files)} files)')


def main(argv=None):
    parser = ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument('--preview', action='store_true', help='Update the local preview (default)')
    mode.add_argument('--zip', action='store_true', help='Create the archive for the final handoff')
    args = parser.parse_args(argv)
    files = package_files()
    if args.zip:
        write_archive(files)
    else:
        write_preview(files)


if __name__ == '__main__':
    main()
