# Obecné principy

Každá sekce popisuje chování typu stránky při výměně obsahu. Konkrétní adresa, jméno, datum a výsledek v ukázce slouží k porovnání. Produkční stránka je načítá pro právě zvolený záznam.

<a id="spusteni"></a>

## Spuštění náhledu

Ve složce se souborem `nahled.py` spusť `python3 nahled.py` a otevři [lokální přehled šablon](http://127.0.0.1:8011/). Stačí Python 3.

HTML mustry jsou v `templates/`. Sdílené styly, skript, písma, ikony a soubory ke stažení jsou v `assets/`. Pro produkční cesty sestav adresy stránek i assetů pomocí routeru projektu.

<a id="data"></a>

## Data a identita záznamů

Vazbu mezi přehledem a detailem sestav ze stabilního ID. Pokud záznam závisí na soutěži, sezóně nebo rozhodném datu, přenes tento kontext i do detailu a exportu. Změna zobrazovaného jména má zachovat správný cíl odkazu.

Chybějící údaj ponech neznámý. Nulu zobraz až tam, kde ji potvrzují zdrojová data. Datum a obsah ukázky mohou být starší než živý web. Při porovnávání hodnot vybírej stejnou verzi záznamu.

<a id="admin"></a>

## Backend a administrace

U každé změny je uvedeno, co má stránka zobrazit a které údaje k tomu potřebuje. Správce backendu ověří, co už poskytuje dnešní rozhraní a jaký zásah je potřeba. Veřejný web a HTML mustry samy o sobě nedokládají podobu neveřejného API.

U redakčně spravovaných údajů určuj, kde vznikají, kdo je může změnit a na které stránky se má změna propsat. Pokud stejný údaj používá přehled, detail i export, mají ho přebírat z jednoho zdroje. Odkazy na dostupné profily sestavuj z existujících vazeb.

<a id="odkazy"></a>

## Odkazy a ovládání

Při přechodu ze stávajícího webu mapuj přímé adresy na odpovídající záznam a část stránky. Zachovej důležité parametry, fragmenty a návrat tlačítkem Zpět. Konkrétní mapování najdeš v příslušné sekci.

Při napojení zachovej popisky odkazů a polí, viditelný fokus a ovládání klávesnicí. Obsah vykreslený v HTML i běžné odkazy mají fungovat před spuštěním JavaScriptu. U širší tabulky má na úzké obrazovce rolovat její vlastní oblast.

<a id="overeni"></a>

## Ověření po napojení

Začni na přehledu, otevři konkrétní detail a vrať se zpět. Zkontroluj zvolený záznam a jeho kontext. U sdílených údajů proveď v testovací administraci jednu změnu a ověř ji na všech dotčených místech. Pokud stránka nabízí export, porovnej jej se stejnou verzí dat na webu.

[Příklad kontroly po napojení soutěží družstev](souteze-druzstev.md#prevzeti)

<a id="postup"></a>

## Zadání další sekce

1. Urči, které typy stránek sekce obsahuje a jak mezi nimi návštěvník přechází. U každého rozdílu dej do karty „Dnes“ odkaz na odpovídající místo současného webu a do karty „Nový mustr“ odkaz na šablonu. Pokud nový mustr spojuje údaje z více míst, popiš v „Dnes“, kde je návštěvník najde, a odkaž na příslušné stránky. Pokud předobraz neexistuje, obsah karty „Dnes“ tvoří jediná věta „Na současném webu nemá tato část předobraz.“ Při nedostupné stránce uveď, co ještě potřebuješ ověřit.
2. Soubor mustru pojmenuj podle typu stránky a stavu, který ukazuje. Konkrétní jméno, titulek, sezónu nebo ID ponech v ukázkových datech. Ke každému typu stránky vyber jeden hlavní mustr. Vedle něj uveď další ukázku jen tehdy, když jiný stav dat mění rozložení, chování nebo dostupnou akci. Další ročníky a obsahové příklady pro kontrolu migrace odkazuj na původní web.
3. Popiš požadované chování pro libovolný záznam daného typu, potřebná data, jejich vazby a zobrazení při chybějící hodnotě. Vysvětli také, co správce zadává a kam se jeho změna propíše. Konkrétní jména, výsledky nebo ID použij jako příklad pro ověření.
4. Otevřené otázce přiřaď odpovědnost. Pod označením „Ověřit v backendu“ vývojář zjistí třeba zdroj dat, existující vazbu nebo oprávnění v administraci. Pod označením „Rozhodnout s vlastníkem…“ uveď konkrétní roli a volbu, například kde má být návštěvníkům dostupný dosavadní export.
5. Přečti zadání v Markdownu a zkus podle něj popsat napojení jiného záznamu. Musí z něj být poznat, co implementovat, podle čeho ověřit výsledek a komu patří zbývající rozhodnutí. V pracovním náhledu ověř cestu mezi mustry a odkazy z obou karet.

V autorském projektu příkaz `python3 implementation/predani/build_extraliga.py` aktualizuje lokální náhled. Schválené mustry a zadání předáváme jako [označené verze na GitHubu](https://github.com/alecvse/czech-squash-handoff/tags).
