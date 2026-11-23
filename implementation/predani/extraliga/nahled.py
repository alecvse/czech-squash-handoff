"""Lokální náhled předávaných šablon. Vyžaduje pouze Python 3."""
from functools import partial
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urljoin, urlsplit

ROOT = Path(__file__).resolve().parent
PORT = 8011


class TemplateLinks(HTMLParser):
    def __init__(self, page):
        super().__init__()
        self.page = '/templates/' + page.name
        self.targets = set()

    def handle_starttag(self, tag, attrs):
        href = dict(attrs).get('href')
        if tag != 'a' or not href:
            return
        url = urlsplit(urljoin(self.page, href))
        if not url.scheme and not url.netloc and url.path.startswith('/templates/') and url.path.endswith('.html'):
            self.targets.add(url.path)


def omitted_pages():
    pages = set()
    for page in (ROOT / 'templates').glob('*.html'):
        links = TemplateLinks(page)
        links.feed(page.read_text(encoding='utf-8'))
        pages.update(links.targets)
    return {page for page in pages if not (ROOT / page.lstrip('/')).is_file()}


class Preview(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        if Path(path).suffix in ('.md', '.txt'):
            return 'text/plain; charset=utf-8'
        return super().guess_type(path)

    def send_head(self):
        url = urlsplit(self.path)
        path = url.path
        local_docs = (ROOT / 'docs/index.html').is_file()
        legacy = path.lstrip('/') or 'index.html'
        if local_docs and '/' not in legacy and (ROOT / 'docs' / legacy).is_file():
            self.send_response(302)
            self.send_header('Location', url._replace(path='/docs/' + legacy).geturl())
            self.end_headers()
            return None
        if path in self.server.omitted:
            self.send_response(303)
            self.send_header('Location', ('/docs' if local_docs else '') + '/index.html#rozsah')
            self.send_header('Content-Length', '0')
            self.end_headers()
            return None
        return super().send_head()


if __name__ == '__main__':
    handler = partial(Preview, directory=str(ROOT))
    with ThreadingHTTPServer(('127.0.0.1', PORT), handler) as server:
        server.omitted = omitted_pages()
        print(f'Předání šablon: http://127.0.0.1:{PORT}/', flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
