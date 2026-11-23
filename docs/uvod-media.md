# Úvod, aktuality a média

Úvod vybírá obsah z více částí webu. Samostatné Aktuality zpřístupňují archiv a Média propojují zprávy, fotografie, videa a tiskové informace. Zadání platí pro všechny zveřejněné záznamy těchto typů a doplňuje [obecné principy předání](principy.md).

[Mustr úvodu](../templates/uvodni-stranka.html)

[Mustr archivu aktualit](../templates/aktuality-prehled-s-filtry.html)

[Mustr rozcestníku médií](../templates/media-rozcestnik.html)

[Mustr přehledu galerií](../templates/fotogalerie-prehled-s-filtry.html)

<a id="uvod"></a>

## Úvodní stránka

### Hlavní aktuality a výběr článků

#### Dnes

Úvod zvýrazňuje vybrané zprávy s fotografiemi a datem. Níže je výpis posledních aktualit s vyhledáváním a výběrem měsíce.

- [Živý úvod a jeho aktuality](https://czechsquash.cz/)

#### Nový mustr

Nahoře se přepínají tři zvýrazněné články s fotografií, rubrikou, datem, titulkem a perexem. Dalších šest karet tvoří blok Aktuality s odkazem na celý archiv. Krátké zprávy jsou vypnuté.

- [Hlavní aktuality](../templates/uvodni-stranka.html#main-content)
- [Šest článkových karet](../templates/uvodni-stranka.html#aktuality)

**Backend.** Oba bloky čtou zveřejněné články. Položka potřebuje stabilní identitu a adresu, rubriku, datum publikace, titulek, perex a fotografii s alternativním textem. Text i obraz v každé hlavní aktualitě odkazují na stejný článek. Karta i hlavní aktualita přebírají opravy článku ze společného zdroje. Zachovej ruční přepnutí, zastavení rotace při najetí a při focusu a vypnutí automatické rotace v režimu omezeného pohybu.

**Ověřit v backendu.** Zjisti, zda současný zvýrazněný výběr má příznak, vlastní pořadí a dobu platnosti a kdo je může měnit v administraci.

**Rozhodnout s redakcí.** Potvrď výběr a pořadí hlavních aktualit a pravidlo pro doplnění šesti dalších karet. Urči, zda se může článek objevit v obou blocích a jak má úvod fungovat při menším počtu publikovaných článků. Mustr dokládá rozložení, způsob výběru neurčuje.

### Vybrané akce

#### Dnes

Úvod má samostatné seznamy Nadcházející turnaje a Poslední turnaje. Oba odkazují do kalendáře. U nadcházejícího turnaje se podle stavu nabízí detail a přihláška nebo los. Ligové dvojice, termín, čas a halu najde návštěvník po výběru soutěže družstev v kalendáři.

- [Turnaje na živém úvodu](https://czechsquash.cz/)
- [Kalendář Extraligy mužů s časy a místy utkání](https://czechsquash.cz/kalendar-akci/?kat%5B%5D=DM1&nazev=&od=01.09.2026&do=&Hledat=Hledat)

#### Nový mustr

Jeden vodorovný pás míchá turnaje a termíny družstev. Karta ukazuje datum nebo rozsah, název a kategorii. Akce s publikovaným cílem může vést na přehled ligy. Záhlaví pásu odkazuje do kalendáře akcí.

- [Vybrané akce v mustru úvodu](../templates/uvodni-stranka.html#main-content)

**Backend.** Záznam přebírej z kalendáře nebo rozpisu včetně identity, data začátku a konce, názvu, kategorie a dostupného cíle. Změna termínu v jeho zdrojové evidenci se projeví i tady. Položka bez veřejného cíle zůstane čitelná jako text. Pozastavené detaily turnajů se v cílovém rozsahu nezpřístupňují.

**Rozhodnout s vlastníkem kalendáře.** Potvrď ruční nebo automatický výběr akcí, časové okno, pořadí a pravidla pro ligové termíny a uplynulé akce. Ujasni, kudy uživatel dál přejde k funkční přihlášce a losu, které dnes nabízí úvod, pokud to schválený rozsah dovoluje.

### CzechSquash Stream

#### Dnes

ČASQ zveřejňuje epizody Squashcastu jako jednotlivé aktuality s odkazy na video a playlist. Epizody s Karolínou Šrámkovou, Jakubem Stupkou a Viktorem Byrtusem odkazují na stejná videa jako karty v mustru.

- [Squashcast s Karolínou Šrámkovou](https://czechsquash.cz/novinka/?news=3119)
- [Squashcast s Jakubem Stupkou](https://czechsquash.cz/novinka/?news=3106)
- [Squashcast s Viktorem Byrtusem](https://czechsquash.cz/novinka/?news=3120)

#### Nový mustr

Stream na úvodu má čtyři karty s náhledem, titulkem, datem a odkazem na video. Pod 768 px zůstávají dvě první karty. Odkaz Odebírej vede na skutečný kanál.

- [CzechSquash Stream](../templates/uvodni-stranka.html#stream)

**Backend.** Každá karta potřebuje platnou adresu videa, titulek, datum a náhled s alternativním textem. Odkaz z rozcestníku médií a patičky vede na `#stream` na úvodu.

**Rozhodnout s redakcí.** Potvrď, kdo vybírá videa a spravuje náhledy a pořadí. Urči zdroj zobrazovaného data. Datum publikace aktuality a datum vydání videa se mohou lišit a v mustru jsou data ukázková. Mustr používá lokální náhledy a běžné odkazy na YouTube.

### Společná hlavička, patička a partneři

#### Dnes

Hlavička dává přímý přístup ke sportovním částem a členskému přihlášení. V patičce jsou loga partnerů a podporovatele, odkazy ČASQ, sportovní odkazy a Facebook.

- [Společná navigace na živém webu](https://czechsquash.cz/)

#### Nový mustr

Desktop má hlavní a doplňkovou navigaci. Mobil stejné cíle seskupuje v menu. Patička odděluje hlavního partnera, další partnery a finanční podporu. Skupina Média a sítě vede na tiskové informace, mediální kontakt, fotogalerie, videa a sociální kanály.

- [Desktopová a mobilní navigace](../templates/uvodni-stranka.html)
- [Partneři a patička](../templates/uvodni-stranka.html#partneri)

**Backend a administrace.** Zaveď jeden zdroj společné hlavičky a patičky. Aktuality jsou přímá položka hlavního menu, vstupní stránka Média zůstává dostupná přes obsahové odkazy. Změny kontaktního cíle, kanálu nebo partnera se mají projevit na všech stránkách. Ke zveřejněnému logu patří přístupný název, skupina a pořadí. Odkaz používej jen u ověřeného cíle.

**Členský vstup.** Tlačítko Přihlášení pro členy vede v živé hlavičce do členské aplikace a v mustru na informační stránku. Cílové chování popisuje zadání členského přístupu. [Stávající vstup](https://czechsquash.cz/login/) · [Zadání členského přístupu](asociace-dokumenty.md#clensky-pristup) · [Mustr členského přístupu](../templates/clensky-system.html#main-content)

**Rozhodnout s vlastníkem webu.** Potvrď schválené role partnerů a aktualizační proces, definitivní sociální odkazy a obsluhu položky Nastavení cookies. Instagram je v hlavičce mustru neodkazový a Nastavení cookies v patičce je text.

### Newsletter

#### Dnes

Patička obsahuje formulář s povinnou e-mailovou adresou a odesláním. Doručení ani funkce správy odběru nebyly předmětem veřejné kontroly.

- [Newsletter v živé patičce](https://czechsquash.cz/)

#### Nový mustr

Newsletter má označené e-mailové pole a tlačítko, obojí je deaktivované. Odesílání není napojené.

- [Newsletter v nové patičce](../templates/uvodni-stranka.html#newsletter-title)

**Ověřit v backendu.** Zjisti příjemce stávajícího formuláře, místo správy seznamu, potvrzování odběru, řešení duplicit a odhlašování.

**Rozhodnout s vlastníkem newsletteru.** Potvrď, zda odběr pokračuje, a případně schval službu, podmínky odběru a správu existujících kontaktů. Před aktivací stanov chování při úspěchu, neplatné adrese, existujícím odběru a chybě služby včetně opakování. Formulář se zapne po skutečném napojení a ověření těchto stavů.

<a id="aktuality"></a>

## Archiv aktualit

### Vyhledávání, rubriky a stránkování

#### Dnes

Aktuality v navigaci vedou na úvod. Výpis na něm přijímá hledaný výraz nebo výběr měsíce v adrese. Článek se otevírá z titulku nebo odkazu Více zde.

- [Živý archiv podle měsíce](https://czechsquash.cz/?month=2026-10)
- [Živé vyhledávání v aktualitách](https://czechsquash.cz/?search=Pan%C3%A1%C4%8Dek)

#### Nový mustr

Samostatný archiv nabízí hledání v textu karet a filtr rubriky. Filtry se kombinují a lze je zrušit. Výsledky jsou po 12, další strana se volí pod výpisem. Karta ukazuje rubriku, datum, titulek, perex a fotografii, případně označenou jako ilustrační.

- [Mustr archivu s filtry](../templates/aktuality-prehled-s-filtry.html#main-content)

**Backend.** Vrať všechny odpovídající zveřejněné zprávy, po datech od nejnovějších se stabilním pořadím také při shodném dni. Filtr uplatni před rozdělením na stránky. Hledání v mustru pracuje s veřejným textem karty bez rozlišení diakritiky a velikosti písmen. Po změně filtru přejdi na první stránku, oznam počet výsledků a při nulové shodě nabídni reset. Bez JavaScriptu jsou v mustru dostupné karty a odkazy. Pro napojený archiv zachovej přístup k celému obsahu i bez JS, například serverovým stránkováním.

**Ověřit v backendu.** Zjisti pokrytí historických článků, stávající kategorizaci a rozsah vyhledávání. Rubriky mustru jsou Turnaje a soutěže, Reprezentace a ČASQ. Ověř, jak redaktor rubriku a zdroj náhledu mění a kdy je zveřejněná položka k dispozici ve všech výpisech.

**Rozhodnout s redakcí.** Potvrď mapování starších záznamů do rubrik a rozsah hledání na novém webu. Mustr nemá výběr měsíce ani trvalý kontext filtrů v URL. Zvol, jak zachovat staré odkazy na měsíc či hledání a jak umožnit návrat z detailu na původní výsledky.

<a id="clanek"></a>

## Detail článku

### Redakční obsah a fotografie

#### Dnes

Detail má adresu s číselným ID. Ukazuje titulek, datum, autora a vlastní text. Podle článku jsou v něm fotografie a popisky. Vedle nebo pod obsahem jsou turnaje a další aktuality. U článku je také ovládání tisku a sdílení.

- [Živý článek Hradecký juniorský CUP](https://czechsquash.cz/novinka/?news=3231)
- [Živá zpráva Open de Quebec](https://czechsquash.cz/novinka/?news=3227)

#### Nový mustr

Sloupec článku odděluje titulek a metadata, perex, volitelný hlavní snímek a redakční text. Fotografie mohou mít popisek a kredit nebo vlastní galerii. Drobečky odkazují na skutečné předky. Hradecká reportáž má hlavní snímek a galerii deseti fotografií s popisky.

- [Reportáž s galerií](../templates/clanek-s-fotogalerii.html)

**Backend.** Převezmi stabilní ID, kanonickou adresu, titulek, dostupnou rubriku, datum publikace, doloženého autora, perex a tělo článku v původním pořadí. Zachovej význam odstavců, podnadpisů, seznamů, tabulek, odkazů a vložených médií. Každému snímku ponech funkční adresu originálu, alternativní text, případný popisek a samostatný kredit. Fotografii, autora, rubriku a galerii vykresli podle dostupnosti. Vydavatele článku a fotografa eviduj odděleně. Stejný záznam může být odkazován i z tematické části webu a má jednu kanonickou adresu.

**Ověřit v backendu.** Zjisti formát uloženého těla článku, vztah perexu a prvního odstavce a dostupnost samostatné fotografie pro kartu a detail. V redakci musí jít nastavit výřez, způsob zobrazení grafiky a označení ilustrační fotografie bez záměny s dokumentárním snímkem.

**Rozhodnout s redakcí.** Urči, zda mají mít nový detail a sdílená metadata vlastní tisk/sdílení a blok dalších aktualit. Potvrď, zda se při migraci použije původní tělo nebo konkrétní schválená redakční úprava.

### Přílohy a externí odkazy

#### Dnes

V textu článku mohou být přímé odkazy na soubory, výsledky a vysílání. Některé vedou ven ze současného webu.

- [Živý článek s PDF a dvěma soubory XLSX](https://czechsquash.cz/novinka/?news=3196)
- [Živá reportáž s výsledky a vysíláním](https://czechsquash.cz/novinka/?news=3122)

#### Nový mustr

Výzva LSCM má text bez hlavní fotografie. Za podmínkami projektu odkazuje na jedno PDF a dva přihlašovací soubory XLSX. Reportáž z Krakova ukazuje delší text s externími odkazy včetně výsledků a několika zdrojů přenosu.

- [Výzva bez fotografie s PDF a dvěma formuláři XLSX](../templates/clanek-bez-fotografie-s-prilohami.html)
- [Článek z hlavních aktualit s ilustrační grafikou bez galerie](../templates/clanek-s-ilustracni-grafikou-bez-galerie.html)
- [Reportáž s externími výsledky a přenosy](../templates/clanek-s-externimi-prenosy.html)

**Backend a administrace.** Redaktor může ke konkrétnímu článku přiřadit soubor nebo externí odkaz s čitelným názvem. Převeď relativní cíle z původního webu podle skutečné adresy souboru a zachovej obsahové pořadí odkazů. U příloh získej formát a případnou zobrazovanou velikost ze skutečného souboru. Externí odkaz na přenos zůstává odkazem podle zdroje. Pokud záznam opravdu má video s náhledem a titulkem, použij společnou video kartu.

**Ověřit v backendu.** Zjisti, zda jsou přílohy evidované samostatně, nebo jen v redakčním HTML. Při migraci porovnej názvy, pořadí a cíle všech odkazů s původním článkem.

<a id="media"></a>

## Rozcestník Média

### Vstupy do mediálních sekcí

#### Dnes

Aktuality zpřístupňují fotografie a videa v jednotlivých zprávách. U konkrétních akcí ČASQ už soustřeďuje odkazy na reportáže, rozhovory a přenosy do jednoho článku. Kontakt na marketing a komunikaci je součástí Kontaktů ČASQ.

- [Přehled přenosů a mediálních ohlasů MČR](https://czechsquash.cz/novinka/?news=1261)
- [Galerie medailistů MČR juniorů](https://czechsquash.cz/novinka/?news=3145)
- [Kontakty ČASQ](https://czechsquash.cz/kontakty/)

#### Nový mustr

Rozcestník nabízí odkazy na Aktuality, Fotogalerii, Videa a Tiskové informace. Stejné cíle používá sekční navigace mediálních stránek. Videa vedou k bloku Stream na úvodu.

- [Mustr rozcestníku Média](../templates/media-rozcestnik.html#main-content)

**Backend a administrace.** Sdílej stejné veřejné adresy mezi rozcestníkem, sekční navigací a patičkou. Označ aktuální stránku v sekční navigaci a zachovej hierarchii předků v drobečcích. Média mají vlastní veřejnou adresu dostupnou z navázaných obsahových stránek.

<a id="tiskove-zpravy"></a>

## Tiskové informace

### Přehled tiskových zpráv

#### Dnes

Na současném webu nemá tato část předobraz.

#### Nový mustr

Rubrika zatím zobrazuje schválený prázdný stav a směřuje běžné zprávy do Aktualit. Na stejné stránce je také odkaz na mediální kontakt.

- [Mustr tiskových informací](../templates/tiskove-zpravy-prazdny-stav.html#main-content)

**Související podklady.** Při srovnání se ve veřejném archivu nepodařilo dohledat vydanou tiskovou zprávu. V Aktualitách jsou pozvánky na tiskové konference a přehledy mediálních ohlasů. [Termín tiskové konference k MČR 2026](https://czechsquash.cz/novinka/?news=3115) · [Pozvánka k přenosu tiskové konference k MČR 2021](https://czechsquash.cz/novinka/?news=1971) · [Mediální ohlasy MČR 2021](https://czechsquash.cz/novinka/?news=1985)

**Backend a administrace.** Prázdný stav platí, dokud nejsou schválené zprávy nebo materiály. Pro publikovanou tiskovou zprávu bude třeba doložený původ, titulek, datum a zveřejněný obsah s funkčními přílohami. Běžné články se při migraci automaticky nepřeznačují.

**Rozhodnout s vlastníkem tiskových informací.** Dodá a schválí první tiskové materiály a určí, kdo je bude publikovat. Potvrď, zda se budou vést jako zvláštní rubrika článků nebo samostatné záznamy, zda se objeví i v Aktualitách a kam povede položka z neprázdného seznamu. Podobu seznamu s položkami mustr nepředvádí.

### Kontakt pro média

#### Dnes

V kontaktech ČASQ je člen VV odpovědný za marketing a komunikaci se jménem, veřejným e-mailem a telefonem.

- [Živé kontakty ČASQ](https://czechsquash.cz/kontakty/)

#### Nový mustr

Tiskové informace jmenují odpovědnou osobu a odkazují na její kartu v Kontaktech. Stejný cíl používá patička.

- [Kontakt v tiskových informacích](../templates/tiskove-zpravy-prazdny-stav.html#main-content)
- [Mustr cílového kontaktu](../templates/kontakty.html#marketing-komunikace)

**Backend a administrace.** Jméno a veřejné kontaktní údaje spravuj u role marketingu a komunikace ve společném adresáři. Po výměně odpovědné osoby se aktualizuje i tiskový text. Trvalý odkaz směřuje na roli.

<a id="fotogalerie"></a>

## Přehled fotogalerií

### Archiv, kategorie a ročníky

#### Dnes

Galerie jsou v archivu aktualit. Hledání podle názvu najde například galerie medailistů ze dvou ročníků i články s odkazy na externí alba.

- [Živý výpis galerií medailistů](https://czechsquash.cz/?search=galerie+v%C3%ADt%C4%9Bz%C5%AF)
- [Živý výpis aktualit s fotogaleriemi](https://czechsquash.cz/?search=fotogalerie)
- [Fotogalerie s externími alby](https://czechsquash.cz/novinka/?news=1852)

#### Nový mustr

Karty ukazují náhled, titulek, datum, počet fotografií a krátký popis. Lze kombinovat hledání, kategorii a ročník. Výsledek otevírá samostatný detail nebo přímo galerii uvnitř článku.

- [Mustr archivu fotogalerií](../templates/fotogalerie-prehled-s-filtry.html#main-content)

**Backend.** Každá zveřejněná galerie potřebuje vlastní stabilní identitu, titulek, datum, ročník, kategorii, popis, veřejný náhled a odkaz na skutečnou galerii. Počet karty odpovídá zveřejněným fotografiím v cíli. Všechny filtry se uplatňují společně, s počtem výsledků a možností resetu. Bez JS zůstávají karty a cíle dostupné.

**Ověřit v backendu.** Zjisti, jestli pro zdrojové fotky existují alba, nebo zda je třeba vytvořit vazbu na část článku. Admin musí umět měnit zveřejnění, kategorii, náhled a pořadí fotografií bez rozbití cíle archivní karty.

**Rozhodnout s redakcí.** Potvrď, které historické galerie do archivu zařadit, jaké budou kategorie a pořadí a zda ročník vychází z data akce nebo z redakčního zařazení. Oba způsoby otevření galerie využívej podle obsahu a jeho vazeb.

<a id="galerie"></a>

## Detail galerie

### Galerie uvnitř článku

#### Dnes

Reportáž o Hradeckém juniorském CUPu obsahuje fotografie z vyhlášení a připojené popisky v rámci článku.

- [Fotografie v reportáži z Hradce](https://czechsquash.cz/novinka/?news=3231)
- [Fotografie ze světového šampionátu](https://czechsquash.cz/novinka/?news=3197)
- [Fotografie z mistrovství republiky juniorských družstev](https://czechsquash.cz/novinka/?news=3163)

#### Nový mustr

V článku je samostatná fotografická mřížka dosažitelná fragmentem `#fotogalerie`. Na ten míří také archivní karta. Fotografie se přes běžný odkaz otevře jako celý snímek.

- [Mustr galerie v reportáži](../templates/clanek-s-fotogalerii.html#fotogalerie)

**Backend a administrace.** Foto blok má vlastní trvalý fragment a stále patří k článku. Archivní karta odkazuje přímo na tento fragment. Po stažení článku z publikace aktualizuj i archivní kartu, aby nevedla na nedostupný obsah.

### Samostatná galerie

#### Dnes

ČASQ vydává fotogalerie medailistů jako samostatné aktuality. Galerie pro každý ročník má vlastní adresu s ID zprávy. Dvojice fotografií z HAMRu je součástí původní reportáže.

- [Živá galerie MČR juniorů 2026](https://czechsquash.cz/novinka/?news=3145)
- [Živá galerie MČR juniorů 2025](https://czechsquash.cz/novinka/?news=2945)
- [Živá reportáž z HAMRu](https://czechsquash.cz/novinka/?news=2689)

#### Nový mustr

Galerie MČR juniorů má deset fotografií s popisky a jménem fotografky. Galerie HAMR uvádí u dvou fotografií zdroj ČASQ. Oba snímky pocházejí ze související reportáže. Každá má vlastní adresu a návrat do archivu.

- [Mustr galerie s uvedenou fotografkou](../templates/galerie-se-jmenem-fotografa.html)
- [Galerie HAMR se zdrojem a vazbou na reportáž](../templates/galerie-se-zdrojem-bez-jmena-fotografa.html)

**Backend a administrace.** Pro oba typy zachovej pořadí snímků, jejich poměr stran v originálu a čitelný náhled. Každý snímek potřebuje alternativní text, odkaz na úplný soubor a dostupný popisek a kredit. Správce musí mít možnost upravit popisek, pořadí, náhled i vazbu na článek. Pokud je jeden snímek na obou místech, může být spravovaný jako jeden mediální soubor.

**Migrace.** Samostatná galerie může vzniknout z fotografií dříve publikovaných uvnitř článku. Spáruj soubor s původním popiskem, zachovej autorství a práva ke zveřejnění. U HAMRu je zdrojem původní reportáž ČASQ, autora fotografie veřejný zdroj neuvádí. [Živá reportáž se zdrojovými fotografiemi](https://czechsquash.cz/novinka/?news=2689)

<a id="prechod"></a>

## Přechod ze stávajícího webu

- Vytvoř mapu starého číselného ID na cílovou kanonickou adresu. Zahrň i články otevřené ze speciálního přehledu Trenérů nebo Reprezentace. Kontroluj každý záznam podle ID a zdrojového data. Stejný titulek může patřit více článkům.
- Při migraci zachovej historická data publikace, autora, pořadí textu, původní popisky, kredity a média i v článcích mimo reprezentativní ukázky. Prověř staré odkazy na soubory a přesměrování starých adres podle schválené mapy.
- Zápis výkonného výboru 7/2026 odkazuje přímo na přílohy. Při migraci zkontroluj, že cílový článek zachoval každý schválený soubor i jeho název. [Živý zápis s přílohami](https://czechsquash.cz/novinka/?news=3216)
- Před přepnutím vyřeš staré adresy parametrů `search` a `month`, funkční přístup hráčů a klubů, stav newsletteru, dostupnost tiskových materiálů a schválený rozsah historických galerií podle rozhodnutí výše.

<a id="prevzeti"></a>

## Kontrola po napojení

1. Zveřejni nový článek a změň náhled, titulek a rubriku jiného. Zkontroluj úvod, archiv a detail. Nezveřejněný článek se nesmí objevit ve veřejných výpisech.
2. Přepni hlavní aktuality tlačítky i klávesnicí a otevři zvolenou zprávu z obrázku i titulku. Vyzkoušej mobil, režim s omezením pohybu a přístup k první aktualitě bez JS. Ověř aktuální termín akce, ligový odkaz i čitelnou položku bez odkazu. Otevři video i odkaz na kanál.
3. Hledej text s diakritikou i bez ní, přidej rubriku, přejdi na další stránku výsledků, vyzkoušej nulovou shodu a zruš filtry. Otevři jeden článek ze starého ID a ověř dohodnuté chování starých adres měsíce a hledání.
4. Otevři stručný článek i dlouhou reportáž, stáhni přílohu a porovnej ji se zdrojem. Zkontroluj variantu bez fotografie, ilustrační snímek a zprávu s fotografiemi a autorským kreditem.
5. Zkombinuj všechny filtry fotogalerie. Z jedné karty otevři samostatnou galerii, z jiné přímo oddíl článku. V obou případech otevři originál a zkontroluj popisky, čitelnost a shodu počtu fotografií.
6. Ověř prázdný stav tiskových zpráv, přechod z patičky na veřejný mediální kontakt a změnu kontaktní osoby. Ověř schválený průchod do členské aplikace a podle rozhodnutí také newsletter včetně chybového stavu. U obou služeb ověř skutečný výsledek v prostředí určeném pro testování.

<a id="referencni-priklad"></a>

### Původní články pro kontrolu migrace

- Hlavní aktuality vedou na tři předané články. U Hradeckého juniorského CUPu se otevře reportáž s galerií, u ME U19 reportáž z Krakova s odkazy na přenosy a u podpory trenérů zpráva s grafikou Nadace ČEZ. [Hradecký juniorský CUP](../templates/clanek-s-fotogalerii.html) · [ME U19 v Krakově](../templates/clanek-s-externimi-prenosy.html) · [Podpora trenérů](../templates/clanek-s-ilustracni-grafikou-bez-galerie.html)
- Zpráva o podpoře trenérů patří v ukázce do hlavních aktualit i do bloku šesti karet. [Podpora trenérů](https://czechsquash.cz/novinka/?news=3198)
- Reportáže z Brazílie a z Dutch Junior Open ukazují stručnější a rozsáhlejší galerii. [Živá Brazílie](https://czechsquash.cz/novinka/?news=3230) · [Živý Dutch Junior Open](https://czechsquash.cz/novinka/?news=3195)
