# Kluby a nábory

Návštěvník může začít průvodcem Hrej squash!, najít vhodné sportoviště v přehledu klubů a otevřít veřejné klubové kontakty. Ze stejného profilu se dostane na družstva a jejich soutěžní soupisky. Společné požadavky doplňují [obecné principy předání](principy.md).

<a id="kluby"></a>

## Přehled klubů

### Hledání klubu a domácích kurtů

#### Dnes

V žebříčku je u hráče uvedený klub. Soupiska družstva uvádí název klubu, sportoviště a adresu domácích kurtů. Dalším zdrojem názvů klubů je seznam s počty hlasů k valné hromadě. Zachycuje stav k datu zasedání.

- [Kluby hráčů v žebříčku](https://czechsquash.cz/zebricek/dospeli/muzi/?datum=2026-10-01)
- [Domácí kurty v soupisce](https://czechsquash.cz/liga/2026-2027-extraliga/soupisky/?druzstvo_id=203#soupiska)
- [Seznam klubů k valné hromadě 14. 6. 2025 (PDF)](https://czechsquash.cz/web/Pocet_hlasu_VH_2025.pdf)

#### Nový mustr

Hledání podle textu na kartě lze kombinovat s výběrem města. U Moravské Slavie jsou obě sportoviště vypsaná až na profilu. Podle názvu kurtů proto mustr tento klub nenajde.

- [Hledání klubu nebo sportoviště](templates/kluby-adresar-s-mapou.html#club-search)
- [Karty klubů](templates/kluby-adresar-s-mapou.html#club-results)
- [Sportoviště Moravské Slavie](templates/klub-profil-se-dvema-sportovisti-bez-kontaktu.html#sportoviste)
- [Klub bez doloženého sportoviště](templates/kluby-adresar-s-mapou.html#klub-casq-ixi)

**Data pro adresář.** Klub a sportoviště mají vlastní identity. Jeden klub může používat více areálů a jeden areál může sloužit více klubům. Do hledání zahrň název klubu i názvy a města všech jeho přiřazených sportovišť. Klub zobraz jednou. Při volbě města nabídni kluby s kurty v tomto městě. Při souběžném hledání podle názvu kurtů musí obě podmínky splnit stejné sportoviště. Kluby bez známého města zůstávají dostupné v seznamu.

**Ověřit v backendu.** Který identifikátor vydává evidence klubů a kde je vazba na sportoviště pro danou sezónu? U doložených názvových variant udržuj převod na tutéž organizaci. Podobná jména ani společná adresa neprokazují totožnost.

**Administrace.** Správce potřebuje opravit jméno nebo adresu sportoviště a přiřadit ho konkrétním klubům. Oprava musí být vidět v seznamu i v profilu.

**Kontrola po napojení.** V Brně najdi Moravskou Slavii jednou podle „Zone sports“ a podruhé podle „Brno-Ivanovice“. Oba výsledky musí otevřít stejný profil se dvěma adresami. Ověř i klub s kurty ve dvou městech, volbu neznámého města a filtr bez výsledku. Zrušení filtrů obnoví seznam.

### Mapa a řazení podle polohy

#### Dnes

Na současném webu nemá tato část předobraz.

#### Nový mustr

Mapa zobrazuje sportoviště se známými souřadnicemi. Více klubů na jedné adrese může sdílet značku. Výběr klubů ovlivňuje viditelné značky. Na vyžádání návštěvníka se seznam seřadí podle vzdálenosti a lze se vrátit k původnímu pořadí.

- [Mapa, odkazy na Mapy.com a ovládání polohy](templates/kluby-adresar-s-mapou.html#club-map-title)

**Data pro mapu.** Souřadnice, název a mapový odkaz patří ke sportovišti. Původní [mapa v Kontaktech ČASQ](https://czechsquash.cz/kontakty/) ukazuje pouze sekretariát. Po napojení zobraz značku každého areálu, který vyhovuje filtrům a má ověřené souřadnice. Dva kluby se společným areálem patří pod jednu značku. Sportoviště s pouhou textovou adresou zůstává dostupné v seznamu a na profilu.

**Ověřit v backendu.** Pro mapové dlaždice ověř vlastní konfiguraci Mapy.com, oprávnění klíče pro cílovou doménu a povolený název hostitele také ve společném site.js. Náhled má prázdnou konfiguraci. Seznam, filtry a přímé odkazy Mapy.com fungují i bez vložené mapy. Zachovej atribuci poskytovatele při zobrazení dlaždic.

**Poloha návštěvníka.** Vyžádej ji až po stisku ovládacího prvku na zabezpečeném webu. Vzdálenost vypočítej v prohlížeči a neodesílej souřadnice návštěvníka poskytovateli mapy. Každý klub seřaď podle vzdálenosti vzdušnou čarou k jeho nejbližšímu sportovišti, které odpovídá aktuálním filtrům. Použij pouze kurty se známou polohou. Klub bez takových kurtů zůstane na konci seznamu bez údaje o vzdálenosti.

**Kontrola po napojení.** U klubu se dvěma areály se známou polohou ověř obě značky. Omez výběr na vzdálenější areál a zkontroluj, že značka i vzdálenost v kartě odpovídají tomuto areálu. Vyzkoušej sdílenou značku dvou klubů, seznam bez mapového klíče, odmítnutí polohy a návrat k původnímu pořadí. Na cílové doméně ověř dlaždice a atribuci.

<a id="profil-klubu"></a>

## Profil klubu

### Základní informace, kontakty a domácí kurty

#### Dnes

Soupiska uvádí klub, kapitána družstva a domácí kurty s adresou, telefonem a počtem kurtů pro soutěž. V propozicích turnaje jsou také kontakty pořadatele konkrétní akce. Přihláška klubu za člena ČASQ rozlišuje registrační číslo, IČO, sídlo, web a kontaktní osoby.

- [Klub, kapitán a kurty v soupisce Viktorie Brno](https://czechsquash.cz/liga/2026-2027-extraliga/soupisky/?druzstvo_id=203#soupiska)
- [BÁSTR Cup – místo konání a kontakt pořadatele](https://czechsquash.cz/turnaj/2026-11-bastr-cup---muzi-a-centrum-viktoria/propozice#propozice)
- [Přihláška klubu – údaje v evidenci ČASQ (PDF)](https://czechsquash.cz/web/Predpisy_CASQ/03_prihlaska_klubu_za_clena_CASQ.pdf)

#### Nový mustr

Tři karty odlišují právní údaje organizace, kontakty klubu a domácí sportoviště. Sídlo a kurty mohou mít odlišnou adresu, telefon i mapový odkaz. Pod jedním klubem mohou být dvě sportoviště. Bez veřejných kontaktů nebo kurtů zůstává odpovídající prázdný stav.

- [Profil s veřejnými kontakty a kurty](templates/klub-profil-s-kontakty-druzstvy-a-exporty.html#o-klubu)
- [Dvě sportoviště jednoho klubu](templates/klub-profil-se-dvema-sportovisti-bez-kontaktu.html#sportoviste)
- [Klub bez potvrzeného IČO a sportoviště](templates/klub-profil-bez-sportoviste-kontaktu-a-druzstev.html)

**Data pro profil.** Rozliš právní a sportovní název, IČO, sídlo, veřejné kontakty klubu a údaje ke každému domácímu sportovišti. Sportoviště má vlastní název, adresu, případný počet soutěžních kurtů, telefon, web a mapu. Kontakty kapitána patří konkrétnímu družstvu.

**Původ údajů v mustru.** U Squash Viktoria dokládají soupisky vazbu klubu na Centrum Viktoria. Název spolku, IČO a sídlo byly ověřeny v ARES. Veřejné kontakty na vedení zveřejňuje klub a kontakt na kurty provozovatel areálu. [Záznam v ARES](https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/22864890) · [Kontakty klubu](https://www.squashviktoria.cz/) · [Kontakty sportoviště](https://www.centrumviktoria.cz/en/contacts/)

**Ověřit v backendu.** Jak registry propojují klub, jeho právní subjekt a sportoviště? Klíč založený v ukázce na ověřeném IČO není automaticky klubovým ID ČASQ. Historický název bez ověřeného IČO musí jít zobrazit s jeho doloženými údaji.

**Administrace.** U organizace a sportoviště spravuj veřejné kontakty a jejich původ odděleně. Spojení z propozic přebírej jen v roli, v níž bylo zveřejněno. Registrační formulář dokládá význam polí. Hodnoty a možnost jejich zveřejnění ověř pro konkrétní klub. Chybějící kontakt nebo IČO může zůstat nevyplněné.

**Migrace.** Propoj doložené názvové varianty s jedním profilem. Staré adresy soupisek ponech směrovat na družstva pro správný ročník. Z výskytu názvu klubu ve starém žebříčku nevytvářej původní adresu profilu.

**Kontrola po napojení.** Porovnej sídlo s adresou kurtů, oba telefonní kontakty a mapové cíle. Ověř jeden klub se dvěma sportovišti a jeden bez ověřeného právního subjektu.

### Družstva a stažení soupisky

#### Dnes

V každé soutěži má družstvo vlastní soupisku se jménem klubu, seznamem hráčů a odkazem na Excel. Mužské a ženské družstvo stejného klubu tak návštěvník najde ve dvou soutěžích.

- [Viktoria Brno · soupiska mužů](https://czechsquash.cz/liga/2026-2027-extraliga/soupisky/?druzstvo_id=203#soupiska)
- [Viktoria Brno · soupiska žen](https://czechsquash.cz/liga/2026-2027-extraliga-zeny/soupisky/?druzstvo_id=125#soupiska)

#### Nový mustr

Tabulka Týmy seskupuje družstva klubu pro uvedenou sezónu. Název týmu a soutěže otevírá odpovídající detaily, počet hráčů a soubor XLSX patří ke konkrétní soupisce. Pokud nejsou doložena žádná družstva, tabulka to uvede.

- [Více družstev v různých soutěžích](templates/klub-profil-s-kontakty-druzstvy-a-exporty.html#tymy)
- [Stav bez uvedeného družstva](templates/klub-profil-bez-sportoviste-kontaktu-a-druzstev.html#tymy)

**Data pro řádek.** Spoj klub s účastí družstva podle identity, sezóny a soutěže včetně skupiny. Součet hráčů a export musejí vycházet z téže verze soupisky. Použij skutečný název družstva pro daný ročník.

**Ověřit v backendu.** Ověř, zda lze jednoznačně získat příslušnost družstev a příslušné veřejné soupisky pro každou skupinu. Zachovej starší fragmenty vedoucí k týmům v profilu, například `#soupiska`.

**Administrace.** Při opravě soupisky zajisti shodu aktualizovaného počtu hráčů, veřejného detailu družstva a souboru ke stažení.

**Kontrola po napojení.** Z klubu otevři dvě družstva s různými soutěžemi. Stáhni jejich soupisky a porovnej jména a počty s příslušnými detaily. V sezóně bez družstev musí být prázdný stav čitelný.

<a id="nabory"></a>

## Nábory – Hrej squash!

### Od první návštěvy ke klubu

#### Dnes

Začátečník najde základ hry na stránce „Co je to squash?“. Nábor dětí popisuje ČASQ v trenérské sekci jako projekt podpory klubů a škol.

- [Úvod do hry](https://czechsquash.cz/co-je-to-squash/)
- [Nábor dětí na současném webu](https://czechsquash.cz/treneri/projekty-nabor)

#### Nový mustr

Úvod vede na seznam klubů. Následují důvody vyzkoušet squash, dětský trénink, tři kroky k první návštěvě a rozbalovací otázky pro zájemce. V obsahu jsou ilustrační fotografie a odkazy na dostupné kluby, seznam trenérů a pravidla.

- [Úvod a hledání klubu](templates/nabory.html#prvni-krok)
- [Dětský trénink a návaznosti](templates/nabory.html#detsky-trenink)
- [První návštěva](templates/nabory.html#prvni-navsteva)
- [Otázky a odpovědi](templates/nabory.html#otazky)

**Obsah a správa.** Uchovej schválené pořadí sekcí, nadpisy, texty, fotografie s alternativním popisem, otázky s odpověďmi a odkazy. Cenu, vybavení, kapacitu a termín první návštěvy řeší přímo konkrétní klub. Žádost se na této stránce neodesílá. Oddíl pro dospělé a vnitřní navigace průvodce jsou v mustru skryté.

**Ověřit v backendu.** Ověř, jak zveřejnit a upravovat pořadí otázek, jejich formátované odpovědi a vazby na klubový adresář a trenéry. Podrobnosti k pravidlům a trenérům mají zůstat na jejich vlastních stránkách.

**Migrace.** Udrž vstup přes Hrej squash! a přímé odkazy do otázek (`#otazky`). Původní samostatný soubor FAQ v prototypu vede do této sekce. Zachovej také používané odkazy na dětský trénink a první návštěvu.

**Kontrola po napojení.** Přejdi z náborové stránky na klub a najdi veřejný kontakt. Otevři seznam trenérů, přímo načti #otazky a rozbal odpověď klávesnicí i bez JavaScriptu. Ověř textové alternativy obou fotografií.
