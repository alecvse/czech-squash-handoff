import re
import unittest
from html import unescape
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch

import build_extraliga as build


class OutputModeTest(unittest.TestCase):
    def test_only_an_explicit_zip_request_selects_the_archive(self):
        for args, archive_expected in (([], False), (['--preview'], False), (['--zip'], True)):
            with self.subTest(args=args), patch.object(build, 'package_files', return_value={}), \
                    patch.object(build, 'write_preview') as preview, patch.object(build, 'write_archive') as archive:
                build.main(args)
                self.assertEqual(preview.called, not archive_expected)
                self.assertEqual(archive.called, archive_expected)


class SampleLinkTests(unittest.TestCase):
    def test_missing_record_keeps_its_name_and_drops_open_action(self):
        markup = ('<a class="directory-card accent-card" href="./unpublished.html">'
                  '<h2>Pozvánky</h2><span class="text-link">Otevřít</span></a>')
        result = build.prepare_sample(markup, set())
        self.assertIn('<h2>Pozvánky</h2>', result)
        self.assertNotIn('Otevřít', result)
        self.assertNotIn('href=', result)

    def test_document_alias_preserves_filter_and_fragment(self):
        markup = '<a href="./treneri-dokumenty.html?search=kurz#files">Dokumenty</a>'
        self.assertEqual(
            build.prepare_sample(markup, {'dokumenty-treneri.html'}),
            '<a href="./dokumenty-treneri.html?search=kurz#files">Dokumenty</a>',
        )


class FeaturedHomepageTest(unittest.TestCase):
    def test_each_slide_opens_its_own_article_even_in_a_portable_rebuild(self):
        homepage = 'uvodni-stranka.html'
        names = {name for name, _, _ in build.FEATURED_ARTICLES}
        self.assertEqual(len(names), 3)
        approved = names | {homepage}
        page = build.sample_markup(homepage, approved)
        image_links = re.findall(r'<a class="hero__media-link" href="\./([^"]+)">(<img[^>]+>)</a>', page, re.S)
        stories = re.findall(r'<div data-hero-content(?: hidden)?>\s*<p class="eyebrow">(.*?)</p>'
                             r'\s*<h2><a href="\./([^"]+)">(.*?)</a></h2>\s*<p>(.*?)</p>', page, re.S)
        self.assertEqual(len(image_links), 3)
        self.assertEqual({name for name, _ in image_links}, names)
        with TemporaryDirectory() as directory:
            root = Path(directory)
            templates = root / 'templates'
            templates.mkdir()
            (templates / homepage).write_text(page, encoding='utf-8')
            for (target, image), (label, text_target, title, summary) in zip(image_links, stories, strict=True):
                self.assertEqual(target, text_target)
                detail = build.sample_markup(target, approved)
                self.assertRegex(detail, r'<h1[^>]*>' + re.escape(title) + r'</h1>')
                published = re.search(r'<time datetime="(\d{4})-(\d{2})-(\d{2})"', detail)
                self.assertTrue(label.endswith(f' · {published[3]}. {published[2]}. {published[1]}'))
                self.assertIn(unescape(summary), unescape(detail))
                self.assertIn(re.search(r'src="[^"]+"', image)[0], detail)
                (templates / target).write_text(detail, encoding='utf-8')
            with patch.object(build, 'ROOT', root):
                self.assertEqual(build.sample_markup(homepage, approved), page)


if __name__ == '__main__':
    unittest.main()
