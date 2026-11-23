"""Write the private repository's docs layout from the same public preview."""
from argparse import ArgumentParser
from pathlib import Path
import re

from build_extraliga import CHAPTERS, package_files


def write_docs(checkout):
    files = package_files()
    directory = checkout / 'docs'
    directory.mkdir(exist_ok=True)
    pages = ('index.html', 'principy.html', *CHAPTERS)
    names = [*pages, *(Path(p).with_suffix('.md').name for p in pages),
             'ai.js', 'puvodni-odkazy.js', 'predani.css']
    for name in names:
        content = files[name].decode()
        # Product examples and their assets remain siblings of docs/.
        content = re.sub(r'((?:href|src)="|\]\(|url\(")(assets/|templates/)', r'\1../\2', content)
        (directory / name).write_text(content)
        (checkout / name).unlink(missing_ok=True)
    index = files['llms.txt'].decode().replace('](', '](docs/')
    (checkout / 'llms.txt').write_text(index)
    (checkout / 'nahled.py').write_bytes(files['nahled.py'])


if __name__ == '__main__':
    parser = ArgumentParser(description=__doc__)
    parser.add_argument('checkout', type=Path)
    write_docs(parser.parse_args().checkout.resolve())
