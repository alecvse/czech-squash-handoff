# Sportovní přehledy a profily

Kalendář spojuje několik druhů akcí. Žebříčky, hráčské profily a reprezentace používají společnou identitu hráče. Každý z přehledů zobrazuje údaje k určitému datu nebo události. Společné požadavky doplňují [obecné principy předání](principy.md).

<a id="kalendar"></a>

## Kalendář akcí

### Termín, kategorie a stav akce

#### Dnes

Veřejný kalendář nabízí kategorii, název a období od–do. Pod měsíci vypisuje termíny, kódy kategorií, název a pořadatele či místo. Podle akce vede na propozice, přihlášené hráče nebo výsledky. Trenérské Pozvánky používají výběr kategorie Trenéři. Kurz III. třídy v Praze 19.–22. června 2025 má přímo u termínu propozice v PDF.

- [Současný kalendář s filtry](https://czechsquash.cz/kalendar-akci/)
- [Trenérské termíny a dostupné propozice](https://czechsquash.cz/kalendar-akci-treneri?kat%5B%5D=TR&nazev=&od=01.01.2024&do=&Hledat=Hledat)
- [Propozice pražského kurzu 19.–22. června 2025 (PDF)](https://czechsquash.cz/web/Skoleni/Pozvanka%20na%20skoleni%20III.%20trenerske%20tridy%20CASQ%20a%20WSC%20Level%201%2019.-22.6.2025.pdf)

#### Nový mustr

Pod měsícem je tabulka s termínem, kategorií, názvem, místem a stavem nebo časem. Hledání podle názvu či místa se kombinuje s kategorií a rozmezím dat. Přehled rozlišuje jednotlivce, konkrétní utkání družstev, společné ligové kolo i školení trenérů a rozhodčích.

- [Kalendář, filtry a měsíční tabulky](../templates/kalendar-akci.html#main-content)
- [Trenérské pozvánky čekající na zpracování](index.md#trenerske-detaily)

**Data pro přehled.** Ke zveřejněné položce předej identitu, druh a podrobnější kategorii, začátek, případně konec, místní čas, název, sportoviště a zveřejněný stav. Ligové kolo může mít místo až v rozlosování. U kurzu zachovej i zrušení a zveřejněný důvod. Samotné uplynutí data nedokládá odehrání.

**Ověřit v backendu.** Které údaje propojují kalendářní položku se soutěží, zápisem utkání nebo školením? Ověř, odkud se čte změna termínu či stavu. Vícedenní akce patří do výsledku, i pokud zvolený interval protíná jen jeden její den.

**Cesta k propozicím.** V kalendářním mustru je kurz z 19.–22. 6. 2025 uvedený bez odkazu. Detail trenérské pozvánky čeká na zpracování. Po jeho schválení a napojení má odkaz u termínu otevřít zveřejněnou pozvánku tohoto kurzu a z ní aktuální propozice. Kalendář i Pozvánky čtou stejný záznam kurzu. Ověř cestu i po výměně PDF. U kurzu bez veřejné přílohy zobraz termín, místo a známý stav bez odkazu ke stažení.

**Administrace.** Správce musí umět odlišit pořadatele od místa akce a změnit termín nebo stav na jednom místě. Při překladu termínu zachovej existující záznam a jeho vazby.

**Migrace.** Převeď původní kódy na kategorie výběru a uchovej přesnější označení u řádku. V předávaném rozsahu veď ze soutěží na schválené cíle, u akcí bez předaného detailu ponech jejich obsah čitelný.

**Kontrola po napojení.** Vyhledej místo a současně omez kategorii. Ověř vícedenní akci na hranici intervalu, zrušený kurz, utkání s dostupným zápisem, nulový výsledek, zrušení filtrů a hlášení při konci před začátkem.

<a id="zebricky"></a>

## Žebříčky

### Oficiální kategorie, vydání a výsledná tabulka

#### Dnes

Rozcestník odkazuje na domácí výpisy i úplné zahraniční žebříčky PSA, ESF a WSF. Domácí kategorie mají vlastní adresu a výběr data. U vybraného vydání je ovládání tisku a odkaz na XLS. Tabulka uvádí pořadí, posun, jméno hráče, klub a sloupce podle kategorie.

- [Vstupy do žebříčků ČASQ, PSA, ESF a WSF](https://czechsquash.cz/zebricek/)
- [Tisk a odkaz na XLS u vydání mužů k 1. 10. 2026](https://czechsquash.cz/zebricek/dospeli/muzi/?datum=2026-10-01)
- [Juniorská kategorie B19](https://czechsquash.cz/zebricek/juniori/B19/)

#### Nový mustr

Jeden panel vybírá okruh, mužskou či ženskou kategorii, juniorský nebo masters věk a následně rok a datum vydání. Hledání hráče nebo klubu a stránkování zachovávají oficiální pořadí. Nadpis nese datum platnosti. Výchozí volbou jsou dospělí muži a poslední dostupné vydání.

- [Výchozí tabulka dospělých](../templates/zebricky.html#muzi)
- [Junioři do 19 let](../templates/zebricky.html#B19)
- [Masters 35+](../templates/zebricky.html#VM35)
- [Kategorie bez vydání](../templates/zebricky.html#VZ60)

**Data pro vydání.** Předávej oficiální kategorii, datum vydání a jeho úplné seřazené řádky. Zachovej pořadí i při stejných bodech, publikovaný posun, hráče a klub k vydání, ligové a turnajové body, celkem a dostupné umístění PSA či ESF podle konkrétní tabulky. Datum narození se nesmí dostat do veřejného HTML ani skrytých dat žebříčku.

**Ověřit v backendu.** Ověř seznam skutečně dostupných vydání v každé kategorii, včetně historických nebo prázdných kategorií. Hráče ani klub neurčuj podle současného věku nebo příslušnosti. Profily propoj přes ověřenou identitu, zbývající jména ponech čitelná.

**Administrace.** Nové zveřejněné vydání nabídni v odpovídající kategorii. Oprava historického vydání se týká jeho řádků a jejich data. Výběr vydání a jeho filtraci řiď výhradně domácími žebříčky ČASQ.

**Rozhodnout s vlastníkem žebříčků.** Mustr nabízí výběr a hledání v domácích vydáních. Urči, odkud po přechodu návštěvník otevře zahraniční žebříčky, zda zůstanou tisk a stažení domácího vydání a zda při hledání zahrnou celé vydání, nebo pouze shody. Při kontrole 19. 11. 2026 vrátil odkaz na říjnový XLS mužů po opakování HTTP 503. Pokud má export zůstat dostupný, ověř otevření skutečného souboru, kategorii, datum vydání a soulad řádků s dohodnutým rozsahem filtru, včetně řádků za první stránkou.

**Migrace.** Přesměruj původní cestu kategorie a parametr `datum` na stejné vydání. Nový odkaz používá `category` a `edition`, při hledání také `search` a při stránkování `page`. Zachovej i přímé fragmenty kategorií a vydání. Ve vzorku je pouze výběr archivu.

**Kontrola po napojení.** Porovnej několik řádků dospělých, juniorů a masters se stejným vydáním. Z jiného roku otevři hráče a vrať se do vyfiltrované tabulky. Při změně kategorie zachovej dostupné datum, jinak vyber její poslední vydání. Ověř nulový posun, chybějící hodnotu, kategorii bez vydání a nepřítomnost narození ve zdroji stránky.

<a id="hrac"></a>

## Profil hráče

### Identita, umístění a měsíční historie

#### Dnes

Profil ukazuje základní údaje, aktuální a nejlepší umístění v kategoriích, měsíční tabulku i graf pořadí a bodů. U jednotlivých vydání jsou vidět také změny proti předchozímu vydání.

- [Základní údaje a nejlepší umístění](https://czechsquash.cz/player/2752/marek-panacek#basicinfo)
- [Lukáš Levínský – klub, družstvo a registrační číslo](https://czechsquash.cz/player/2125/lukas-levinsky#basicinfo)
- [Vývoj na žebříčku](https://czechsquash.cz/player/2752/marek-panacek#vyvoj-na-zebricku)

#### Nový mustr

Obě varianty mají společnou kartu se základními údaji. Rozhoduje, jestli má hráč vlastní měsíční záznamy pořadí nebo bodů. Marek Panáček má graf, roční přehled a podrobná data. Martin Svoboda vlastní měsíční řadu nemá. V části Pohyb na žebříčku proto vidí prázdný stav. Doložená umístění z jednotlivých vydání lze na profilu uvést samostatně s kategorií a datem.

- [Marek Panáček – profil s měsíční historií](../templates/hrac-profil-s-historii-a-zapasy.html)
- [Graf, měsíční historie a podrobná data](../templates/hrac-profil-s-historii-a-zapasy.html#pohyb)
- [Martin Svoboda – profil bez měsíční historie](../templates/hrac-profil-bez-historie-a-zapasu.html)

**Data pro profil.** Společná karta obsahuje Klub, Družstvo, Soupisku pro příslušnou sezónu, Ročník a Registrační číslo. Pod Soupiskou odkaž na všechny doložené účasti v družstvech daného ročníku. Například Lukáš Levínský má v profilu uvedené družstvo HAMR B a v sezóně 2026/2027 je také na soupisce HAMR D. Jeho ID 2125 určuje zdrojový profil, veřejné registrační číslo je 2050. Neznámou hodnotu ponech jako neuvedenou.

**Klub a umístění k datu.** Pokud příslušnost ke klubu dokládá vydání žebříčku, zobraz datum tohoto vydání. Příslušnost doloženou soupiskou vztáhni k její sezóně. U posledního známého umístění v každé kategorii zachovej datum vydání, u osobního maxima jeho měsíc a rok. Samostatná umístění v několika vydáních nepřeváděj na měsíční řadu.

**Ověřit v backendu.** Která vydání a kategorie mají srovnatelné body a posun? Zachovej desetinné hodnoty i známou nulu. Nezveřejněný měsíc vykresli jako mezeru a při nedostatku měření ponech změnu neurčenou.

**Administrace.** Opravu výsledku nebo žebříčku přenes z vlastníka údajů do všech výpisů. U změny klubu či opravy jména ponech identitu osoby a dobový kontext soupisek.

**Migrace.** Starou adresu `/player/` převeď podle ID na stejného hráče. Z `#basicinfo` otevři základní údaje a z `#vyvoj-na-zebricku` historii v části `#pohyb`. V přehledech ponech jméno bez odkazu, dokud není k dispozici ověřená identita a veřejný profil.

**Kontrola po napojení.** Ze stránky klubu Squash Viktoria otevři družstvo Viktoria Brno Sportprofit, ze soupisky Marka Panáčka a z jeho profilu soupisku 2026/2027. Ověř také vstup ze žebříčku a reprezentace. Porovnej graf, roční přehled a podrobnosti se stejnými měsíčními záznamy. U hráče bez měsíční řady ověř čitelný stav bez grafu a datum každého doloženého umístění.

### Účasti, zápasy a jejich filtry

#### Dnes

Seznam sdružuje zápasy pod jednotlivé účasti. Návštěvník může vybrat ligu nebo turnaje, u dospělých třídu A–D, u juniorů třídu a věkovou kategorii chlapců či dívek a u masters věkovou kategorii. Některá umístění mají bodový souhrn bez rozepsaných zápasů.

- [Zdrojový výběr ligových zápasů](https://czechsquash.cz/player/2752/marek-panacek?turnTyp=liga#turnaje)
- [Turnaje juniorů třídy A, chlapci do 19 let](https://czechsquash.cz/player/2752/marek-panacek?turnTyp=turnJunAB19#turnaje)

#### Nový mustr

Na Panáčkově profilu návštěvník hledá soupeře či akci, vybírá rok a přepíná Vše, Turnaje a Liga. U turnajů s doloženým zařazením navazují okruh, třída a kategorie. Stránkují se celé akce. Po rozbalení zůstávají zápasy pohromadě s příslušnou účastí a jejími body. U profilu bez vlastní měsíční řady se známé zápasy zobrazí v jednoduché tabulce a samostatné turnajové účasti v seznamu. Martin Svoboda nemá doložené ani zápasy, ani turnajovou účast, a proto vidí prázdný stav.

- [Zápasové karty a navazující filtry](../templates/hrac-profil-s-historii-a-zapasy.html#zapasy)
- [Martin Svoboda – bez doložených zápasů a účastí](../templates/hrac-profil-bez-historie-a-zapasu.html#zapasy)

**Data pro účast.** Pro každou účast uchovej akci, datum, druh, kategorii, umístění, zveřejněné body za pořadí, za soupeře a celkem. Jednotlivé zápasy mají pořadí, soupeře, fázi, výsledek z pohledu hráče a dostupné body. Více kategorií na jedné akci smí mít různé souhrny. Samotná přihláška nebo účast na turnaji nedokládá odehraný zápas.

**Výsledek a návaznosti.** Skóre uváděj v pořadí zobrazený hráč – soupeř. Když je podkladem řádek na soupeřově profilu, obrať obě hodnoty a zachovej označení skreče. Body soupeře nepřebírej. U ligového zápisu ověř dvojici, termín i stranu hráče. Odkaz patří konkrétnímu zápisu. Pokud znáš jen název a datum akce, zobraz je jako text.

**Ověřit v backendu.** Ověř vazbu zápasu na konkrétní účast i u zdrojové hlavičky bez odkazu. Volný los nebo neznámý soupeř nesmí vytvořit hráčský profil. Doložený výsledek účasti uchovej i při nulovém počtu rozepsaných zápasů. Podrobnější filtry sestav jen z ověřených kategorií.

**Migrace.** Starý odkaz s `turnTyp` a `#turnaje` otevři podle ID hráče v jeho zápasech a přenes odpovídající výběr ligy nebo turnajového okruhu, třídy a kategorie. Ověř to zvlášť na lize a juniorském výběru B19 třídy A. U některých ukázkových hráčů patří část zápasů k chybné hlavičce a chybějí účasti bez zápasů. Při napojení proto páruj výsledky ke konkrétním účastem z evidence.

**Kontrola po napojení.** Vyber ligu, konkrétní rok a soupeře. U turnaje s více kategoriemi porovnej umístění a bodové souhrny po přepnutí filtru. Vyzkoušej také Marka Dufka (ID 8292) bez měsíční historie. Dne 17. 10. 2026 má prohru 0 : 3 s Matějem Bombou a další prohru 0 : 3 s Natálií Babjukovou. Obě patří stejnému termínu, ale mají různé zápisy. Dále ověř účast bez zápasu a výsledek získaný ze soupeřova profilu. [Zápis s Matějem Bombou](https://czechsquash.cz/liga/2026-2027-1ligaa/vysledky/?turnier=11627&liga=7932#liga) · [Zápis s Natálií Babjukovou](https://czechsquash.cz/liga/2026-2027-1ligaa/vysledky/?turnier=11627&liga=7935#liga)

<a id="reprezentace"></a>

## Reprezentace

### Výběr podle doložené účasti

#### Dnes

Jména účastníků a jejich konečná umístění zveřejňuje ČASQ ve zprávách z jednotlivých šampionátů. Ve zprávě z ME U19 jsou výsledky jednotlivců i družstev. Ročník a klub hráče uvádí jeho veřejný profil. Výkonný výbor samostatně zveřejňuje nominace žen a mužů pro danou sezónu a širší nominace juniorů pro vymezené období.

- [ME jednotlivců 2026 – konečná umístění českých hráčů](https://czechsquash.cz/novinka/?news=3209)
- [ME U19 2026 – výsledky českých juniorů](https://czechsquash.cz/novinka/?news=3122)
- [Ročník a klub na profilu Marka Panáčka](https://czechsquash.cz/player/2752/marek-panacek#basicinfo)
- [Nominace mužů 2026/2027 (PDF)](https://czechsquash.cz/web/Zapisy_VV/Nominace_reprezentace_2026-2027_muzi.pdf)
- [Nominace žen 2026/2027 (PDF)](https://czechsquash.cz/web/Zapisy_VV/Nominace_reprezentace_2026-2027_zeny.pdf)
- [Širší nominace juniorů od 1. 9. 2026 do 31. 1. 2027 (PDF)](https://czechsquash.cz/web/Zapisy_VV/Reprezentacni_tym_nominace_juniori_09_2026.pdf)

#### Nový mustr

Karty spojují české účastníky konkrétních šampionátů. U osoby jsou klub, ročník, umístění na příslušné akci a odkaz na profil. Hledání, kategorie Dospělí / Junioři U19 a skupina Hráči / Hráčky se kombinují. Hráč s účastí na obou šampionátech má jednu kartu dostupnou z obou kategorií.

- [Přehled reprezentantů a výsledků](../templates/reprezentace.html#main-content)

**Data pro kartu.** Spoj evidenci osoby s jednou nebo více účastmi. Pro každou uchovej šampionát, rok, veřejnou kategorii, skupinu, publikované umístění a zdroj výsledku. Označení a období výběru patří k přehledu. Veřejná ukázka představuje účastníky dvou akcí v roce 2026.

**Ověřit v backendu.** Je účast jednotlivce jednoznačně propojená s hráčským ID? Ověř možnost připojit dvě různé účasti k téže osobě. Příslušnost ke kategorii vyplývá z účasti. Při převodu článku o soutěži družstev a jednotlivců převezmi ke kartě člověka pouze jeho výsledek v jednotlivcích.

**Rozhodnout s vlastníkem reprezentace.** Urči, které další šampionáty patří do výběru podle účasti a kdo je schvaluje. Pokud má web zveřejňovat i formální nominace, potvrď jejich umístění. Nominaci lze doložit rozhodnutím výboru pro konkrétní tým a dobu platnosti. Účast a umístění hráče na šampionátu dolož výsledkovou zprávou i v případě, že je hráč současně v nominaci.

**Administrace.** Správce výběru potřebuje přidat schválenou akci, svázat její účastníky s profily a opravit umístění bez duplikování karty osoby.

**Kontrola po napojení.** Porovnej umístění s výsledkovou zprávou. U hráče s dvěma účastmi přepni obě kategorie, spoj je postupně s hledáním a skupinou a ověř prázdný výsledek i návrat na celý výběr.
