import unittest
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


if __name__ == '__main__':
    unittest.main()
