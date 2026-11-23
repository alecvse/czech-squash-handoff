# Soutěže družstev

Z přehledu návštěvník vybere soutěž v konkrétní sezóně. U ligy otevře družstvo z tabulky. Z rozpisu ligy, play-off nebo baráže pokračuje na zápis vybrané dvojice. Zadání platí pro všechny ligy, skupiny a ročníky a doplňuje [obecné principy předání](principy.md). Karty „Dnes“ odkazují na současný web, karty „Nový mustr“ na stejnou část v nové šabloně.

[Mustr přehledu soutěží](templates/souteze.html)

[Mustr soutěže · Extraliga mužů](templates/soutez-extraliga-muzi.html)

[Mustr družstva · JM Ostrava](templates/druzstvo-300-2026-2027.html)

[Mustr utkání](templates/utkani-11588.html)

<a id="prehled"></a>

## Přehled soutěží

### Výběr sezóny, ligy a skupiny

#### Dnes

Ročníky jsou pod sebou na jedné stránce. Vedle lig a skupin tu mají vlastní odkazy také výsledkové fáze. V sezóně 2018/2019 vede mužské play-off na semifinálový a finálový termín, baráž o extraligu na barážový termín.

- [Současný přehled ročníků](https://czechsquash.cz/souteze/)
- [Play-off extraligy mužů 2018/2019](https://czechsquash.cz/liga/2018-2019-extraligaplayoff)
- [Baráž o extraligu mužů 2018/2019](https://czechsquash.cz/liga/2018-2019-barazextraliga)

#### Nový mustr

Návštěvník vybírá sezónu v záhlaví. Každá liga má vlastní kartu. U kategorie nebo skupiny najde odkaz na detail soutěže a případně také PDF s rozlosováním. Přiložený ročník ukazuje ligy a skupiny. Samostatná výsledková fáze v něm nemá vlastní mustr.

- [Výběr sezóny a karty lig](templates/souteze.html#competition-season)

**Backend.** Nabídni dostupné ročníky. Pro zvolený ročník vrať zveřejněné soutěže s identitou, ligovou úrovní, názvem kategorie či skupiny a pořadím. Převezmi i zveřejněné fáze soutěže s jejich vlastní identitou, názvem a pořadím. Odkaz musí otevřít příslušnou skupinu nebo fázi ve vybraném ročníku. PDF připoj jen k příslušné soutěži a pouze tehdy, je-li k dispozici.

**Ověřit v backendu.** Zjisti, odkud přehled čte zařazení do ročníku a ligy. Publikace nové skupiny v administraci ji má zpřístupnit v přehledu i před nahráním rozlosování.

**Rozhodnout s vlastníkem soutěží.** Který ročník má návštěvník vidět při prvním otevření přehledu v době, kdy už je zveřejněná i příští sezóna?

### Hrací systém a dokumenty ke stažení

#### Dnes

Odkaz na hrací systém je v záhlaví ročníku. Níže jsou pořadí zápasů a formuláře zápisů. Některé starší ročníky mají navíc vlastní rozhodnutí soutěžní komise.

- [Dokumenty u jednotlivých sezón](https://czechsquash.cz/souteze/)

#### Nový mustr

Pod ligami je jeden seznam dokumentů pro vybranou sezónu. Každá položka má název, formát a velikost. Formuláře pro trojutkání a víceutkání mají samostatné odkazy na Excel a PDF.

- [Mustr přehledu s dokumenty](templates/souteze.html)
- [Ukázka hracího systému (PDF)](assets/files/souteze-2026-2027/Hraci%20system.pdf)

**Backend.** Sestav seznam ze souborů platných pro vybranou sezónu a ze společných předpisů a formulářů. Každá položka potřebuje popis, odkaz na konkrétní soubor, formát a velikost. Zachovej i přílohy zveřejněné jen u jediného ročníku.

**Ověřit v backendu.** Zjisti, jak správce přiřadí přílohu k ročníku nebo ke konkrétní skupině a kde spravuje společné formuláře. Výměna hracího systému pro nový ročník musí zachovat verzi dostupnou z archivu předchozí sezóny.

<a id="soutez"></a>

## Detail soutěže

### Tabulka a odkaz na družstvo

#### Dnes

Řádek tabulky obsahuje pořadí a bilanci družstva. Název je prostý text. Na soupisku se návštěvník dostane přes samostatný seznam družstev.

- [Otevřít současnou tabulku](https://czechsquash.cz/liga/2026-2027-extraliga)
- [Soupisky družstev](https://czechsquash.cz/liga/2026-2027-extraliga/soupisky/)

#### Nový mustr

Název v řádku otevírá detail družstva pro vybranou soutěž a sezónu. Tabulka zachovává sportovní hodnoty, rozepisuje názvy posledních sloupců a u zkratek nabízí vysvětlení.

- [Otevřít nový mustr tabulky](templates/soutez-extraliga-muzi.html#tabulky)

**Backend.** Každý řádek propoj s účastí družstva v konkrétní soutěži a sezóně. Převezmi oficiální pořadí, počet utkání, výhry, prohry, skreče, bilanci zápasů jednotlivců, sety, skóre a body. Odkaz musí zůstat správný i po změně názvu nebo sponzora. Pokud tabulka ještě není zveřejněná, zobraz prázdný stav.

**Ověřit v backendu.** Zjisti, zda účast družstva v ročníku už tuto vazbu zakládá. Pokud ano, odkaz může vzniknout automaticky při vykreslení řádku.

### Týmy, kluby a kapitáni

#### Dnes

Soupisky nabízejí seznam názvů družstev. Klub, kapitán a soupiska se zobrazí až po výběru družstva.

- [Živý seznam soupisek](https://czechsquash.cz/liga/2026-2027-extraliga/soupisky/)
- [Klub a kapitán po výběru JM Ostrava](https://czechsquash.cz/liga/2026-2027-extraliga/soupisky/?druzstvo_id=300#soupiska)

#### Nový mustr

Záložka Týmy ukazuje karty v pořadí ligové tabulky. Každá obsahuje družstvo, jeho klub, kapitána a odkaz na stejný detail jako v tabulce. Kontakty jsou až na detailu.

- [Mustr týmových karet](templates/soutez-extraliga-muzi.html#soupisky)

**Backend.** Vrať ke každé účasti v soutěži klub a kapitána včetně dostupných identifikátorů profilů. Klub může mít více družstev. Chybí-li profil, zobraz jméno jako text. Pro chybějící hodnotu používá mustr pomlčku.

**Ověřit v backendu.** Zjisti, odkud se čte klub a kdo mění kapitána pro příslušné družstvo a ročník. Změna kapitána se musí projevit na kartě i v detailu téhož družstva.

### Rozpis, výsledky a filtry

#### Dnes

Kalendář/Výsledky vypisuje odkazy podle data a soupeřů. Po výběru termínu lze pokračovat na zápis konkrétní dvojice. V baráži 2018/2019 nabízí jeden termín tři dvojice, finálový termín play-off dvě.

- [Živý kalendář](https://czechsquash.cz/liga/2026-2027-extraliga/vysledky/)
- [Živý zápis](https://czechsquash.cz/liga/2026-2027-extraliga/vysledky/?turnier=11588&liga=7913#liga)
- [Tři dvojice v baráži](https://czechsquash.cz/liga/2018-2019-barazextraliga/vysledky/?turnier=3812#liga)
- [Dvě dvojice ve finálovém termínu](https://czechsquash.cz/liga/2018-2019-extraligaplayoff/vysledky/?turnier=3805#liga)

#### Nový mustr

Utkání jsou ve skupinách podle kola a data. V řádku návštěvník vidí soupeře, výsledek nebo čas, místo či pořadatele a dostupný detail. Filtry Tým a Kolo lze kombinovat a zrušit.

- [Mustr rozpisu](templates/soutez-extraliga-muzi.html#utkani)

**Backend.** Převezmi datum, dostupné kolo, účastníky v pořadí rozlosování, čas, místo, výsledek a odkaz na zveřejněný zápis. Obě hodnoty oficiálního skóre přiřaď k ID družstev. V řádku rozpisu patří první hodnota prvnímu uvedenému družstvu, i když podle zápisu hrálo jako host. Při přeložení zachovej identitu utkání. U společného termínu s více družstvy zachovej všechny účastníky a zahrň je do filtru. Chybějící čas nebo místo ponech neurčené.

**Ověřit v backendu.** Zjisti, kde pořadatel mění termín, čas a místo a kdy se do veřejného rozpisu promítá oficiální výsledek. Filtrování již vykreslených řádků obsluhuje přiložený JavaScript.

**Stav návrhu.** Mustr Extraligy obsahuje ligovou tabulku, týmy a rozpis. Pro play-off nebo baráž hrané pouze na zápisy chybí ukázka detailu fáze. Samostatně je potřeba předvést ligu, která tabulku vede, ale zatím ji nezveřejnila.

**Rozhodnout s vlastníkem soutěží.** Bude u play-off nebo baráže bez vlastní tabulky a soupisek rovnou otevřený rozpis bez záložek, nebo má přístup k tabulce a týmům navazující ligy zůstat součástí navigace? Ověř, které vazby na ligu skutečně existují.

<a id="druzstvo"></a>

## Detail družstva

### Klub, kapitán a umístění

#### Dnes

Po výběru družstva se pod seznamem týmů zobrazí klub, kapitán, kontaktní a adresní údaje, domácí kurty a hráči. Bilance družstva se čte v ligové tabulce.

- [Klub, kapitán a kurty JM Ostrava](https://czechsquash.cz/liga/2026-2027-extraliga/soupisky/?druzstvo_id=300#soupiska)
- [Pořadí a bilance družstva v ligové tabulce](https://czechsquash.cz/liga/2026-2027-extraliga/tabulky/)

#### Nový mustr

Družstvo má vlastní stránku s názvem a sezónou, proklikem na klub a kapitána, telefonem a e-mailem. Nad soupiskou je devět údajů od umístění po body. Drobečková navigace vede zpět na příslušnou soutěž.

- [Mustr kontaktů](templates/druzstvo-300-2026-2027.html#main-content)
- [Mustr umístění](templates/druzstvo-300-2026-2027.html#umisteni)

**Backend.** Kontaktní panel čte klub a kapitána z účasti družstva v konkrétní soutěži a sezóně. Bilanci načti ze stejného řádku a ke stejnému datu jako v soutěžní tabulce. Po změně výsledku se proto aktualizují obě zobrazení.

**Ověřit v backendu.** Zjisti zdroj veřejného telefonu a e-mailu kapitána. Při výměně kapitána převezmi kontakty platné pro dané družstvo.

### Soupiska a hráčské statistiky

#### Dnes

Soupiska uvádí hráče, jejich nasazení a poznámky. Ročník hráče je v jeho profilu, posun v konkrétním vydání žebříčku. Jednotlivé výhry, prohry a sety se dají ověřit v zápisech utkání jeho družstva.

- [Nasazení a poznámky na soupisce Ostravy](https://czechsquash.cz/liga/2026-2027-extraliga/soupisky/?druzstvo_id=300#soupiska)
- [Ročník Viktora Byrtuse na profilu](https://czechsquash.cz/player/340/viktor-byrtus#basicinfo)
- [Pořadí a posun mužů k 1. 11. 2026, vydání pro srovnání s mustrem](https://czechsquash.cz/zebricek/dospeli/muzi/?datum=2026-11-01)
- [Individuální výsledky a sety v zápisu Ostrava – SCC HK](https://czechsquash.cz/liga/2026-2027-extraliga/vysledky/?turnier=11588&liga=7913#liga)

#### Nový mustr

Přibývá ročník, známý posun v žebříčku a statistiky za toto družstvo v sezóně (zápasy, výhry–prohry a sety). Pořadí hráčů a poznámky se přebírají z oficiální soupisky.

- [Mustr statistické soupisky](templates/druzstvo-300-2026-2027.html#soupiska)

**Backend.** Propoj hráče se soupiskou přes jeho ID. Převezmi pořadí hráčů, nasazení i poznámky z oficiální soupisky. Posun připoj z vydání určeného pro nasazení, pokud souhlasí hráč, kategorie, datum a pořadí. Při neověřené shodě zachovej nasazení a posun vynech.

**Výpočet bilance.** Vyber platné zveřejněné zápisy utkání této účasti družstva v soutěži, skupině a sezóně. Z nich započítej jednou každý doložený individuální výsledek hráče za toto družstvo. Sčítej výhry, prohry a získané i ztracené sety z pohledu hráče. Skreč přiřaď hráči až podle zápisu a doložené účasti. Ověřených nula startů se zobrazí jako 0, bilance 0–0 a sety „—“. Nezjištěná hodnota zůstává neznámá.

**Ověřit v backendu.** Zjisti, kdo spravuje soupisku, poznámky a rozhodné datum nasazení. Ročník patří k profilu. Bilance má vycházet z výsledků, aby oprava zápisu upravila i detail družstva.

### Export soupisky

#### Dnes

V detailu soupisky je odkaz na Excel pro zvolené družstvo.

- [Export na živé soupisce](https://czechsquash.cz/liga/2026-2027-extraliga/soupisky/?druzstvo_id=300#soupiska)

#### Nový mustr

Pod soupiskou jsou dvě karty ke stažení. U souboru XLSX je ikona Excelu, u CSV ikona s označením CSV. Oba uvádějí družstvo, soutěž, sezónu, platnost soupisky, datum nasazovacího žebříčku, zdroj a seznam hráčů se třemi sloupci.

- [Mustr soupisky s exporty](templates/druzstvo-300-2026-2027.html#soupiska)
- [Ukázka XLSX](assets/files/soupisky/soupiska-300-2026-2027.xlsx)
- [Ukázka CSV](assets/files/soupisky/soupiska-300-2026-2027.csv)

**Backend.** Oba formáty sestav z téže verze soupisky. Zachovej pořadí hráčů a sloupce Hráč, Na žebříčku a Poznámka. Chybějící pořadí je prázdná buňka. CSV používá UTF-8 s BOM a středník. XLSX obsahuje číselné pořadí a textové poznámky. Rozšířené statistiky jsou jen na stránce.

**Ověřit v backendu.** Zjisti, zda nynější generování Excelu umí vybírat družstvo i sezónu a jak po opravě soupisky obnovit oba soubory. Jejich ruční dvojí nahrávání šablona nevyžaduje.

<a id="utkani"></a>

## Detail utkání

### Odkaz z rozpisu a výsledek družstev

#### Dnes

V Kalendáři/Výsledcích návštěvník otevře termín a u dvojice družstev vybere výsledky. Zápis se zobrazí pod výběrem. Celkový výsledek, sety a míčky jsou na konci zápisu.

- [Výběr utkání v termínu](https://czechsquash.cz/liga/2026-2027-extraliga/vysledky/?turnier=11588)
- [Současný zápis utkání](https://czechsquash.cz/liga/2026-2027-extraliga/vysledky/?turnier=11588&liga=7913#liga)

#### Nový mustr

Řádek JM Ostrava – SCC HK vede přímo na místní zápis této dvojice. Názvy soupeřů a sezóna jsou v záhlaví. Nad zápasy jednotlivců jsou datum, soutěž, pořadatel, týmový výsledek, sety a míčky. Odkaz na soutěž vede do stejného ročníku.

- [Mustr rozpisu](templates/soutez-extraliga-muzi.html#utkani)
- [Mustr výsledku utkání](templates/utkani-11588.html#main-content)

**Backend.** Každý veřejný zápis propoj s konkrétním utkáním, jeho termínem a soutěží v ročníku. Jeden termín může obsahovat více dvojic. V zápisu zobraz oficiální výsledek, sety i míčky v pořadí domácí–hosté. Rozpis čte tentýž výsledek a seřadí jeho hodnoty podle ID družstev v řádku. Pořadatele načti z termínu, může jím být i jiné družstvo. Dokud není zveřejněn zápis, ponech utkání v rozpisu bez odkazu na detail.

**Ověřit v backendu.** Podle současného webu mohou ligové výsledky zadávat kapitáni a kluby. Ověř, kdo potvrzuje zápis konkrétní dvojice a kdy se zveřejní. Po opravě ověř v obou pohledech vítěze a skóre každého družstva. Ověř také přepočet tabulky a bilancí hráčů podle pravidel soutěže.

### Zápasy jednotlivců a průběh setů

#### Dnes

Hráči jsou na protilehlých stranách řádku zápisu. Mezi jmény jsou skóre jednotlivých setů a výsledek zápasu. Nevyužitá místa pro sety zůstávají v tabulce.

- [Jednotlivé zápasy na současném webu](https://czechsquash.cz/liga/2026-2027-extraliga/vysledky/?turnier=11588&liga=7913#liga)

#### Nový mustr

Domácí hráč a host jsou vedle sebe. Za jejich jmény je výsledek zápasu a v posledním sloupci odehrané sety v pořadí zápisu. Vyšší počet míčků v setu je zvýrazněný. Jméno může odkazovat na profil hráče.

- [Mustr zápasů a setů](templates/utkani-11588.html)

**Backend.** Převezmi pořadí dvojic, jména a dostupná hráčská ID, výsledek každé dvojice a posloupnost setů. Počet dvojic i setů určuje zápis. Hráče bez ověřené vazby na profil zobraz jako text. Volné místo (bye) zachovej. Nevyplněný set vynech. U skreče převezmi vykázaný výsledek a jen doložené skóre setů. Pokud je zveřejněný pouze výsledek družstev, zobraz dostupné součty a pod nimi prázdný stav jednotlivých zápasů.

**Stav návrhu.** Zápis JM Ostrava – SCC HK obsahuje tři dokončené zápasy jednotlivců. Pro zveřejněný týmový výsledek bez rozepsaných dvojic a pro skreč s neúplným skóre setů chybí ukázka. Při převzetí oba případy porovnej se zveřejněným zápisem pro stejné utkání.

**Ověřit v backendu.** Zjisti, kde lze opravit hráče, jejich přiřazení ke stranám a skóre setu. Rozliš nezadanou hodnotu od zaznamenané nuly. Po opravě musí detail zobrazit jednotlivé zápasy i součty z téže platné verze.

<a id="prechod"></a>

## Přechod ze stávajícího webu

- **Ročníky a přílohy.** Převeď vstup [Soutěže družstev](https://czechsquash.cz/souteze/) na [výběr sezóny](templates/souteze.html). Pro každý ročník porovnej veřejné ligy, skupiny a přílohy včetně historických rozhodnutí. Při otevření detailu a návratu do přehledu zachovej zvolenou sezónu.
- **Staré vstupní adresy.** Namapuj tabulky na `#tabulky`, seznam soupisek na `#soupisky` a seznam výsledků na `#utkani`. U odkazu s `druzstvo_id` zachovej příslušnou účast družstva v soutěži a sezóně. Původní adresa play-off nebo baráže vede na výsledky právě této fáze. Parametr `turnier` otevře konkrétní termín se všemi jeho dvojicemi, včetně odkazů z kořene fáze i z její cesty `/vysledky/`. S parametrem `liga` navíc otevři přímo zápis vybrané dvojice. Při návratu zachovej fázi a termín. Podobu produkčních URL určí router. [Původní přímý odkaz](https://czechsquash.cz/liga/2026-2027-extraliga/vysledky/?turnier=11588&liga=7913#liga) · [Mustr cílového zápisu](templates/utkani-11588.html)
- **Tisk a XLS tabulky.** Živá soutěž nabízí ovládání tisku a export ligové tabulky. Mustr má ke stažení soupisku týmu. **Rozhodnout s vlastníkem soutěží.** Kde návštěvník najde tisk a export celé tabulky po přechodu? [Živá tabulka](https://czechsquash.cz/liga/2026-2027-extraliga/tabulky/) · [Mustr](templates/soutez-extraliga-muzi.html#tabulky)
- **Adresy a domácí kurty.** Adresu klubu a kapitána, domácí halu, její kontakt a počet kurtů živá soupiska zobrazuje. Mustr týmu má kontaktní panel a odkaz na klub. **Rozhodnout s vlastníkem soutěží.** Které adresní údaje a kontakty mají zůstat veřejné a které patří na detail klubu? [Živý detail](https://czechsquash.cz/liga/2026-2027-extraliga/soupisky/?druzstvo_id=300#soupiska) · [Mustr](templates/druzstvo-300-2026-2027.html#main-content)
- **Platnost dat.** Živá soutěž zobrazuje platnost soupisek i datum nasazovacího žebříčku již v záhlaví. Mustr soutěže uvádí sezónu, oba datumové údaje jsou v exportu soupisky. **Rozhodnout s vlastníkem soutěží.** Na které stránce potřebuje návštěvník obě data vidět? **Ověřit v backendu.** Urči zdroj dat platný pro stejnou verzi stránky a exportu. [Živé záhlaví](https://czechsquash.cz/liga/2026-2027-extraliga) · [Mustr](templates/soutez-extraliga-muzi.html#main-content) · [Ukázkový export](assets/files/soupisky/soupiska-300-2026-2027.csv)

<a id="prevzeti"></a>

## Kontrola po napojení

1. Na datech dvou ročníků přepni sezónu. Zkontroluj skupiny, cíle detailů a verzi hracího systému. Otevři detail skupiny a vrať se do přehledu. Musí zůstat vybraná původní sezóna.
2. Otevři rozlosování u skupiny s PDF a detail skupiny bez PDF. V seznamu dokumentů stáhni přílohu a porovnej formát i velikost se souborem. U staršího ročníku ověř také dostupnost dokumentu platného jen pro tuto sezónu.
3. Vyber družstvo s publikovaným utkáním. Otevři je z tabulky, karty v Týmech i řádku rozpisu. Všechny tři odkazy mají vybrat stejný tým a sezónu. Umístění a body se musí shodovat s příslušným řádkem tabulky.
4. Přejdi ze záložky Týmy na družstvo a vrať se tlačítkem Zpět. Zůstane vybraná záložka Týmy. U ligové soutěže se třemi částmi musí být bez JavaScriptu všechny viditelné a odkazy i exporty funkční.
5. Vyber družstvo a kolo. Zobrazené řádky musí splňovat obě podmínky. Zrušení filtrů obnoví celý rozpis. Ověř také soutěž bez zveřejněné tabulky, týmů nebo rozpisu. U části, kterou tato soutěž vede, zobraz při chybějících údajích její prázdný stav.
6. Porovnej hráče, nasazení, poznámky a pořadí řádků mezi stránkou, XLSX a CSV ze stejné verze soupisky. U hráče bez známého pořadí musí zůstat v exportech prázdná buňka. Vyber hráče se shodným i s nedoloženým žebříčkovým pořadím a ověř zobrazení posunu. Na hráči s účastí za více družstev prověř, že bilance obsahuje jen zápasy za vybrané družstvo v dané soutěži a sezóně. Po opravě zveřejněného zápisu ověř, že opravené skóre v bilanci nahradilo původní a počet zápasů zůstal stejný. Zkontroluj také změnu kapitána.
7. Z otevřeného ročníku vyber baráž a její termín se třemi dvojicemi. Totéž ověř u play-off s odděleným semifinále a finálovým termínem se dvěma dvojicemi. Původní adresu fáze, samotného termínu i konkrétního zápisu otevři přímo. Návrat ze zápisu musí zobrazit původní výběr. [Barážový zápis SC Strahov B – Buldočci (4 : 0)](https://czechsquash.cz/liga/2018-2019-barazextraliga/vysledky/?turnier=3812&liga=3878#liga) · [Finálový termín, zápis Viktoria Brno Hanya – Buldoci (3 : 1)](https://czechsquash.cz/liga/2018-2019-extraligaplayoff/vysledky/?turnier=3805&liga=3883#liga)
8. V testovacích datech použij domácí A a hosty B s výsledkem 2 : 1. Jestliže los staví na první místo B, řádek B – A musí ukázat 1 : 2 a zápis A – B musí ukázat 2 : 1. V zápisu ověř pořadí domácí–hosté u každého setu. Ověř delší zápas, skreč a hráče bez profilu. Po opravě skóre v administraci znovu porovnej detail, rozpis a bilance obou družstev.

<a id="referencni-priklad"></a>

### Referenční příklad · Extraliga mužů 2026/2027

- Mustr přehledu obsahuje jednu ukázkovou sezónu. V jejím [živém přehledu](https://czechsquash.cz/souteze/) je navíc [1. liga žen](https://czechsquash.cz/liga/2026-2027-1liga-zeny). Po napojení na ní lze ověřit, že zveřejněná soutěž přibude do přehledu bez ručního doplnění odkazu. U mužských skupin I a II téže ligy ukázka předvádí detail bez PDF rozlosování.
- JM Ostrava je v této soutěži vedená jako `druzstvo_id=300`. V mustru má k 3. 11. 2026 čtvrté místo, v živé tabulce měla při srovnání 19. 11. první místo.
- Ve filtru JM Ostrava a 1. kolo zůstane v mustru utkání se SCC HK s výsledkem 2 : 1. Na původním webu jde o termín `turnier=11588` a zápis `liga=7913`.
- V [mustru zápisu](templates/utkani-11588.html) odpovídají výsledku 2 : 1 tři zápasy jednotlivců, součet setů 6 : 3 a míčků 76 : 64. První domácí hráč prohrál 0 : 3, pořadí stran se zachovává i v jednotlivých setech.
- Ukázkový export uvádí nasazovací žebříček k 1. 11. 2026, živé záhlaví při srovnání uvádělo 2. 11. 2026. Pro kontrolu shody vyber stránku i export ze stejné verze dat.

<a id="navaznosti"></a>

## Rozsah náhledu a návazné stránky

V náhledu můžeš projít z přehledu soutěží do Extraligy mužů, z tabulky na JM Ostrava a z rozpisu na její utkání se SCC HK. Další družstva, soutěže a zápisy používají stejné typy stránek. Příklady pro další typy najdeš v [rozsahu předání](index.md#rozsah).

Další typy stránek a stav jejich dokumentace najdeš v [přehledu šablon](index.md).

[Mustr přehledu soutěží](templates/souteze.html)

[Mustr soutěže · Extraliga mužů](templates/soutez-extraliga-muzi.html)

[Mustr družstva · JM Ostrava](templates/druzstvo-300-2026-2027.html)

[Mustr utkání](templates/utkani-11588.html)
