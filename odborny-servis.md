# Trenéři, rozhodčí a školení

Trenér si vyhledá kvalifikaci, podklady k projektu nebo pozvánku s termínem. Rozhodčí najde svou komisi, vzdělávací materiály a starší kurzy. Pozvánky a archivní podklady si návštěvník může otevřít přímo u příslušného kurzu nebo sezóny.

<a id="treneri"></a>

## Trenérský rozcestník

### Vstupy pro trenéry a návaznost na metodiku

#### Dnes

Přehled trenérské části odkazuje na aktuality, seznam, projekty, pozvánky, dokumenty, archiv a metodiku v XPS Network.

- [Trenérská část ČASQ](https://czechsquash.cz/treneri/)

#### Nový mustr

Rozcestník slouží jako vstup k šesti oblastem. Dokumenty míří do společné kategorie Dokumentů, metodika zůstává externí. Článkový archiv je dostupný z trenérských aktualit.

- [Rozcestník Trenéři](templates/treneri.html)
- [Cíl karty Dokumenty](templates/dokumenty-treneri.html)

**Data a správa.** Pro kartu zachovej název, pořadí, popis a cíl. U metodiky použij přímo adresu externí služby. Odborné materiály a článkový archiv mají rozdílnou funkci a vlastní cílové stránky.

**Kontrola po napojení.** Otevři Dokumenty a vrať se k seznamu trenérů. Zkontroluj, že při přesunu kategorie stále funguje stará adresa trenérských dokumentů a že Metodika vede do XPS Network.

<a id="aktuality"></a>

## Aktuality pro trenéry

### Oznámení s přílohou

#### Dnes

Trenérské aktuality zveřejňují například oznámení o školení mládeže LSCM 13. prosince 2024 v Brně s odkazem na PDF pozvánky.

- [Aktuality pro trenéry na současném webu](https://czechsquash.cz/treneri/aktuality/)
- [Pozvánka na školení LSCM v Brně (PDF)](https://czechsquash.cz/web/Skoleni/Pozvanka%20na%20skoleni%20LSCM%20v%20Brne%2013.12.2024.pdf)

#### Nový mustr

Zpráva v trenérské sekci zachovává text a přílohu, pokračování vede do archivu zpráv podle sezón.

- [Zpráva trenérské sekce](templates/treneri-aktuality.html)

**Data a správa.** Článek má vlastní text a datum zveřejnění. Spoj ho s evidovaným kurzem a jeho přílohou. Datum vydání zprávy a termín kurzu uchovávej zvlášť. Stejnou zprávu odkazuj i ze sezónního archivu.

**Kontrola po napojení.** U další zprávy ověř, že pozvánka patří k jejímu termínu. Přes Další starší zprávy musí jít otevřít sezónní archiv i po zveřejnění novější aktuality.

<a id="archiv"></a>

## Archiv trenérů

### Výběr zpráv podle sezóny

#### Dnes

Trenérský archiv spojuje starší dokumenty s odkazy na celé sezónní články. U některých sezón je uveden jen nadpis, bez odkazu na článek.

- [Původní trenérský archiv](https://czechsquash.cz/treneri/archiv/)

#### Nový mustr

Archiv dostupný z Aktualit pro trenéry vypisuje sezóny se zveřejněným článkem. Starší pozvánky a další samostatné soubory patří do trenérské kategorie Dokumentů.

- [Seznam sezón s články](templates/treneri-archiv.html)
- [Převedené samostatné soubory](templates/dokumenty-treneri.html#skoleni-a-starsi-podklady)

**Data a správa.** Zachovej označení a pořadí sezón i ID navazujícího článku. Sezóna s nadpisem bez cíle nevytváří prázdnou archivní stránku. Samostatnou přílohu identifikuj podle souboru a zařaď ji do odpovídající skupiny.

**Kontrola po napojení.** Z přehledu otevři zprávy ze dvou různých sezón. Po návratu do archivu musí být u obou stále zřejmý správný ročník.

<a id="archivni-clanek"></a>

## Archivní odborný článek

### Sezónní články trenérů, školení a rozhodčích

#### Dnes

Každý archivní článek má původní číselné ID a vlastní soubor oznámení a příloh. Archiv rozhodčích soustřeďuje více sezón v jednom článku.

- [Sezónní článek trenérů](https://czechsquash.cz/novinka/?news=1746)
- [Sezónní článek školení](https://czechsquash.cz/novinka/?news=1745)
- [Archivní článek rozhodčích](https://czechsquash.cz/novinka/?news=750)

#### Nový mustr

Detail zachovává původní členění textu a odkazy na jednotlivé přílohy. Drobečková navigace se řídí odbornou sekcí. Přehledy Rozhodčí a Školení nabízejí dostupné soubory také přímo.

- [Trenérský článek 2019/2020](templates/obsah-archiv-1746.html)
- [Školení 2019/2020](templates/obsah-archiv-1745.html)
- [Archiv rozhodčích](templates/obsah-archiv-750.html)

**Data a správa.** Přenášej ID článku, sekci, datum zveřejnění a uspořádaný obsah. Článek může pokrývat jednu i více sezón. U každého sezónního bloku zachovej jeho pořadí, text a přílohy. Dva podobné články v různých sekcích si ponechávají vlastní identitu.

**Migrace.** Staré adresy s parametrem news mapuj podle ID článku, i když na ně nová hlavní stránka školení přímo neodkazuje. Sdílený soubor může mít více správných obsahových vazeb.

**Kontrola po napojení.** Porovnej trenérský a školicí článek téže sezóny, poté jiný ročník s odlišným počtem příloh. Otevři původní adresu i soubor připojený uvnitř textu.

### Další ročníky pro kontrolu migrace

- 2018/2019 · [Trenéři](templates/obsah-archiv-1470.html) · [Školení](templates/obsah-archiv-1471.html)
- 2017/2018 · [Trenéři](templates/obsah-archiv-1028.html) · [Školení](templates/obsah-archiv-1029.html)
- 2016/2017 · [Trenéři](templates/obsah-archiv-671.html) · [Školení](templates/obsah-archiv-670.html)
- 2015/2016 · [Trenéři](templates/obsah-archiv-408.html) · [Školení](templates/obsah-archiv-410.html)

<a id="projekty"></a>

## Přehled trenérských projektů

### Výběr programu pro trenéry a kluby

#### Dnes

Trenérská sekce nabízí odkazy na tři samostatné projekty včetně podpory mládeže LSCM, podpory regionů a náboru.

- [Projekty České asociace squashe](https://czechsquash.cz/treneri/projekty/)

#### Nový mustr

Přehled nabízí tři místní detaily. Jejich drobečková navigace i odkaz Všechny projekty vedou zpět na tento přehled.

- [Rozcestník projektů](templates/treneri-projekty.html)

**Data a správa.** Spravuj vždy název projektu, vlastní cílovou stránku a pořadí. Projekt může mít více výzev pro různé sezóny. Náborový projekt pro kluby patří do odborné sekce a má jiný účel než úvod pro rodiče.

**Kontrola po napojení.** Otevři z přehledu dva různé projekty a z každého se vrať na tentýž seznam. Změna názvu jednoho projektu nesmí přerušit odkaz na jeho detail.

<a id="detail-projektu"></a>

## Detail projektu

### Podpora LSCM, regionální program a nábor

#### Dnes

Každý projekt má vlastní datovaný text. U Squash Regiony popisuje podstránka ročník 2023. Ročník 2026 je zveřejněný jako příloha č. 4 zápisu VV č. 7/2026 z 8. září 2026. LSCM odkazuje na další zprávy a podklady, nábor využívá obrazové a video materiály.

- [Projekt LSCM](https://czechsquash.cz/treneri/projekty-lscm)
- [Podmínky projektu Squash Regiony 2023](https://czechsquash.cz/treneri/projekty-regiony)
- [Přehled zápisů VV s přílohou k ročníku 2026](https://czechsquash.cz/ke-stazeni/zapisy-vv/)
- [Zápis VV č. 7/2026 (PDF)](https://czechsquash.cz/web/Zapisy_VV/Zapis_z_VV-2026-7.pdf)
- [Příloha č. 4, Squash Regiony 2026 (PDF)](https://czechsquash.cz/web/Zapisy_VV/Squash_Regiony_2026.pdf)
- [Projekt Nábor](https://czechsquash.cz/treneri/projekty-nabor)
- [Archivní aktuality LSCM](https://czechsquash.cz/novinka/?news=2250)

#### Nový mustr

Všechny varianty zachovávají vlastní text, datum a cestu zpět na přehled. Mustr projektu Squash Regiony ukazuje ročník 2023. Příloha ročníku 2026 je v mustru Zápisy VV. LSCM propojuje sezónní dokument, archivní zprávu a novější článek o podpoře. Nábor nabízí dobový leták a odkazy na dvě videa.

- [LSCM se souvisejícími podklady](templates/treneri-projekty-lscm.html)
- [Squash Regiony 2023](templates/treneri-projekty-regiony.html)
- [Příloha pro ročník 2026 v Zápisech VV](templates/dokumenty-zapisy-vv.html#rok-2026)
- [Náborový projekt s letákem a videi](templates/treneri-projekty-nabor.html)
- [Archivní aktuality LSCM](templates/obsah-archiv-2250.html)

**Data a správa.** Ročník založ u příslušného projektu. Ve stejném záznamu spravuj období, schválený text, přílohy a stav zveřejnění. Detail projektu nebo navazující aktualita odkazují na konkrétní ročník. Zápis VV si ponechá vazbu na svou přílohu. Pokud se PDF zobrazí také u projektu, použij stejný soubor. U obrazových materiálů zachovej popis a u videí skutečné odkazy.

**Ověřit v backendu.** V administraci projektů a Zápisů VV ověř, zda lze jeden soubor připojit k ročníku i k zápisu, a jak se uchová jeho původní URL.

**Rozhodnout s vlastníkem projektu Squash Regiony v ČASQ.** Potvrď, kdo schvaluje zveřejnění ročníku v Trenéři → Projekty a zda bude ročník doložený jen přílohou dostupný z detailu projektu jako samostatně označená položka.

**Kontrola po napojení.** Otevři podmínky ročníku 2023 a z přílohy zápisu ověř podmínky ročníku 2026. Pokud je novější ročník uveden i u projektu, oba odkazy musí otevřít stejné PDF a starší ročník musí zůstat samostatně dostupný. U LSCM ověř vazbu na správnou sezónu, u náboru leták a oba odkazy na videa.

<a id="pozvanky"></a>

## Pozvánky pro trenéry

### Termín, stav a propozice

#### Dnes

Filtrovaný kalendář kategorie Trenéři dokládá termíny, pořadatele, stavy a propozice převzaté do tabulky v mustru, například kurz III. třídy ČASQ a WSC Level 1 v Praze 19.–22. června 2025. Na samostatné stránce Trenéři pod ČASQ je pozvánka na další ročník 4.–7. června 2026 v Praze na Squashareně.

- [Kalendář s vybranou kategorií Trenéři od roku 2024](https://czechsquash.cz/kalendar-akci-treneri?kat%5B%5D=TR&nazev=&od=01.01.2024&do=&Hledat=Hledat)
- [Propozice kurzu z června 2025 (PDF)](https://czechsquash.cz/web/Skoleni/Pozvanka%20na%20skoleni%20III.%20trenerske%20tridy%20CASQ%20a%20WSC%20Level%201%2019.-22.6.2025.pdf)
- [Samostatné oznámení o kurzu z června 2026](https://czechsquash.cz/casq/treneri/)
- [Propozice kurzu z června 2026 (PDF)](https://czechsquash.cz/web/Skoleni/Pozvanka%20na%20skoleni%20III.%20trenerske%20tridy%20CASQ%20a%20WSC%20Level%201%204.-7.6.2026.pdf)

#### Nový mustr

Tabulka obsahuje termíny z let 2024 a 2025. Řádek kurzu z června 2025 má odkaz na propozice. Stejný kurz je v mustru kalendáře uveden jako termín bez odkazu.

- [Termíny, propozice a zrušená akce](templates/treneri-pozvanky.html)
- [Stejný termín v kalendáři](templates/kalendar-akci.html)
- [Navazující starší podklady](templates/dokumenty-treneri.html#skoleni-a-starsi-podklady)

**Data a správa.** V evidenci školení založ jeden záznam pro každý termín kurzu. U něj spravuj kategorii, začátek a konec, místo, pořadatele, propozice a stav zveřejnění. Přesun nebo zrušení uprav v témže záznamu se zachováním zveřejněného důvodu. Kalendář zobrazí termín a stav z tohoto záznamu. U zveřejněné pozvánky vede odkaz z kalendáře přímo na její položku v Pozvánkách a odtud na schválené propozice. Bez přílohy zůstane termín čitelný a buňka pro dokument bez odkazu.

**Migrace.** Samostatnou pozvánku na kurz z června 2026 připoj k příslušnému termínu jako oznámení s odkazem na stejné propozice. Pro původní adresu pod ČASQ zachovej přímou cestu na tento ročník.

**Ověřit v backendu.** V administraci kalendáře, obsahu a souborů ověř společné ID kurzu, vazbu na oznámení a propozice, stav zveřejnění a přímý odkaz na položku. Při migraci dolož shodu názvu, termínu a místa před propojením stejnojmenných pozvánek.

**Rozhodnout s vlastníkem trenérských školení v ČASQ.** Potvrď, kdo zakládá a schvaluje kurz, kdo zveřejňuje jeho oznámení a podle čeho se pozvánka přesouvá mezi aktuálním přehledem a archivem.

**Kontrola po napojení.** Z kalendáře pro 19.–22. června 2025 otevři položku v Pozvánkách a ověř PDF podle termínu a místa. U ročníku 4.–7. června 2026 ověř dohledatelnost samostatného oznámení a správné PDF bez záměny za ročník 2025. Ověř také zrušenou akci a kurz bez přílohy, u něhož zůstane dostupný termín bez nefunkčního odkazu.

<a id="seznam"></a>

## Seznam trenérů

### Kvalifikace a zveřejněný licenční záznam

#### Dnes

Seznam zveřejňuje trenéry podle kvalifikace a vysvětluje význam licenčních údajů. U trenéra může být datum, pozastavení nebo neaktivní licence.

- [Licenční seznam ČASQ](https://czechsquash.cz/treneri/seznam/)

#### Nový mustr

Tabulka rozlišuje jméno, třídu ČASQ a zveřejněný údaj o licenci. Hledání podle jména lze kombinovat s třídou a typem záznamu. Výpis hlásí počet shod, nabízí zrušení filtrů a má stav bez výsledků.

- [Seznam trenérů s kombinovatelnými filtry](templates/treneri-seznam.html)

**Data a správa.** Základem je záznam kvalifikace, nikoli unikátní napsané jméno. Zachovej různé licence i osoby shodného jména. Ulož doložené datum i případné slovní označení. Datum v minulosti a výslovné pozastavení licence jsou dva různé údaje.

**Ověřit v backendu.** Zjisti, jak licenční evidence předává třídu, platnost, datum a případný individuální stav. Rozlišení budoucího a uplynulého data musí odpovídat referenčnímu dni živého výpisu.

**Kontrola po napojení.** Vyhledej shodné jméno s více řádky, zkombinuj třídu s pozastavením a projdi stav bez shody. Reset musí obnovit celý veřejný seznam a jeho počet.

<a id="rozhodci"></a>

## Rozhodčí

### Komise, dokumenty a kurzy

#### Dnes

Odborná stránka odkazuje na vzdělávací dokumenty a starší kurzy. Pozvánka na kurz rozhodčích III. třídy 25.–26. září 2026 v Bratislavě vyšla 11. září v běžných Aktualitách s odkazem na PDF.

- [Současná stránka rozhodčích](https://czechsquash.cz/casq/rozhodci/)
- [Starší kurzy rozhodčích](https://czechsquash.cz/novinka/?news=750)
- [Oznámení o kurzu III. třídy v Aktualitách](https://czechsquash.cz/novinka/?news=3217)
- [Pozvánka na kurz z 25.–26. září 2026 (PDF)](https://czechsquash.cz/web/Skoleni/Pozvanka%202026%20kurz%20rozhodcich%20III.tridy%20CASQ.pdf)

#### Nový mustr

Na jednom místě jsou kontakty komise rozhodčích, soubory v sekci Dokumenty a pozvánky na starší kurzy. Přílohy lze otevřít přímo z výpisu.

- [Kontakty, dokumenty a kurzy rozhodčích](templates/rozhodci.html)

**Data a správa.** Členy komise zobraz ze stejné evidence jako na stránce ČASQ. Předpisy, systém vzdělávání a seznamy patří do části Dokumenty. Část Kurzy používá stejnou evidenci školení jako Kalendář. Odborný přehled nabídne zveřejněný termín, odkaz na případné oznámení v Aktualitách a stejnou schválenou přílohu, kterou má kurz v evidenci. Článek má vlastní ID a datum vydání.

**Migrace.** Zařaď dostupné soubory z aktuální stránky i archivu. Historický text bez odkazu se nemá nabídnout jako položka ke stažení. Starý odkaz na archivní článek musí nadále rozlišit správný obsah.

**Ověřit v backendu.** V administraci Aktualit a školení ověř vazbu článku č. 3217 na kurz v Bratislavě a jeho PDF. Prověř, zda už má kurz vlastní záznam v kalendáři a jak se na něj napojí odborný přehled.

**Rozhodnout s komisí rozhodčích a redakcí ČASQ.** Potvrď, kdo schvaluje kurz s přílohou, kdo publikuje zprávu v Aktualitách a po jakou dobu má být zveřejněný kurz viditelný v odborném přehledu.

**Kontrola po napojení.** Otevři kurz z 25.–26. září 2026 v části Kurzy i jeho oznámení v Aktualitách. V obou případech musí být dostupné stejné PDF a termín musí odpovídat evidenci školení. Otevři také starší pozvánku z archivu a ověř její vlastní ročník. U dokumentu zkontroluj formát a velikost, člena komise porovnej s kontakty ČASQ.

<a id="skoleni"></a>

## Školení

### Přílohy a další materiály ze starších sezón

#### Dnes

Stránka Školení a sezónní články kombinují texty pozvánek s přílohami. Stejná příloha se může objevit v článcích archivu Školení a Trenérů, například u kurzu III. třídy z 11.–14. července 2019 v Ostravě.

- [Školení ČASQ](https://czechsquash.cz/casq/skoleni/)
- [Archivní článek Školení 2018/2019](https://czechsquash.cz/novinka/?news=1471)
- [Archivní článek Trenéři 2018/2019](https://czechsquash.cz/novinka/?news=1470)
- [Sdílená příloha kurzu z července 2019 (PDF)](https://czechsquash.cz/web/Skoleni/pozv%C3%A1nka%20na%20%C5%A1kolen%C3%AD%20iii.%20tren%C3%A9rsk%C3%A9%20t%C5%99%C3%ADdy%20%C4%8Dasq%2011.-14.7.2019.pdf)

#### Nový mustr

Školení je výpis převzatých archivních souborů. Uvádí název, věcný popis, formát a velikost. Pozvánky pro trenéry mají samostatnou tabulku termínů a propozic. Ze Školení lze přejít do Pozvánek i Kalendáře.

- [Archivní materiály ke školení](templates/skoleni.html)
- [Termíny a propozice v Pozvánkách](templates/treneri-pozvanky.html)

**Data a správa.** Do archivního výpisu zařaď dostupné přílohy školení a další schválené archivní materiály. Stejnou přílohu uveď ve výpisu jednou. Pokud patří k evidovanému kurzu, použij jeho vazbu na soubor. Sezónní články si ponechají původní text, ID a odkazy na přílohy. Kurz bez přílohy je dohledatelný podle termínu v kalendáři, pokud je zveřejněný.

**Ověřit v backendu.** V evidenci souborů ověř identitu přílohy napříč články a přehledy. Při rozporu názvu pozvánky s přílohou porovnej termín a místo přímo v dokumentu. Správnou vazbu potvrdí vlastník školení v ČASQ.

**Kontrola po napojení.** Otevři PDF kurzu z 11.–14. července 2019 ze sezónních článků i přímo z výpisu Školení. Ověř, že výpis uvádí přílohu jednou a že oba původní články zůstaly dostupné. Prověř také otevření editovatelné přílohy a odkaz do Pozvánek na novější termíny.
