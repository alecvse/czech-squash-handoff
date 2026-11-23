# ČASQ, dokumenty a veřejné informace

Návštěvník tu hledá odpovědnou osobu, platný předpis, formulář nebo zápis z konkrétního jednání. Veřejné informační stránky mu pomohou s pravidly hry, členstvím a kontaktem na asociaci.

<a id="komise"></a>

## ČASQ a odborné komise

### Členové, role a spojení

#### Dnes

Odborné komise mají vlastní stránku se jmény, předsedy a zveřejněnými kontakty. Stránka asociace představuje organizaci a výkonný výbor.

- [Odborné komise ČASQ](https://czechsquash.cz/casq/odborne-komise/)
- [Dosavadní stránka asociace](https://czechsquash.cz/asociace/)

#### Nový mustr

Vstup ČASQ otevírá karty odborných komisí. Stejný seznam zůstává i na samostatné adrese komisí. Odtud návštěvník přejde k rozhodčím, školením a trenérům.

- [Komise na vstupu ČASQ](templates/asociace.html#odborne-komise)
- [Samostatná adresa komisí](templates/odborne-komise.html)

**Data a správa.** U komise eviduj název, agendu, pořadí a členství osob s rolí. Zobraz jen doložené funkce a zveřejněné kontakty. Agenda může být svěřená jinému orgánu a kontakt může vést na sekretariát.

**Přechod ze starého webu.** Přímý vstup `/casq/odborne-komise/` veď na seznam odborných komisí. Nová položka ČASQ v hlavní navigaci otevírá stejný obsah. Dosavadní adresy představení asociace a výkonného výboru mají vlastní cíle v [Kontaktech](#kontakty).

**Ověřit v backendu.** Najdi společný zdroj pro členství a veřejné kontakty. Změna člena komise rozhodčích se má propsat také na stránku Rozhodčí. Kontaktní seznam nemusí odpovídat seznamu komisí v archivu zápisů.

**Kontrola po napojení.** Vedle komise se jmenovaným předsedou zobraz arbitrážní komisi bez uvedeného předsedy a marketingovou komisi s popisem agendy. Porovnej obě adresy seznamu.

<a id="kontakty"></a>

## Kontakty a vedení asociace

### Organizace, bankovní spojení a lidé

#### Dnes

Představení asociace, složení výboru a kontakty jsou rozdělené mezi tři stránky. Kontaktní stránka uvádí sídlo, fakturační údaje, bankovní spojení, pracovníky sekretariátu a členy výboru.

- [O asociaci](https://czechsquash.cz/asociace/)
- [Kontakty a bankovní spojení](https://czechsquash.cz/kontakty/)
- [Výkonný výbor](https://czechsquash.cz/casq/vykonny-vybor/)

#### Nový mustr

Kontakty začínají kartou O asociaci. Následují adresa s mapou, organizační údaje a účty podle měny, pak karty výkonného výboru a sekretariátu. E-mail nebo telefon lze otevřít přímo u správné osoby.

- [Představení asociace v Kontaktech](templates/kontakty.html#o-asociaci)
- [Karty výkonného výboru](templates/kontakty.html#vybor)
- [Kontakt pro média](templates/kontakty.html#marketing-komunikace)

**Data a správa.** Odděl údaje organizace, banky a veřejný pracovní kontakt osoby. Zachovej jméno s tituly, roli, agendu, pořadí a určení účtu včetně měny, IBAN a SWIFT. Změnu držitele agendy promítni do kontaktů i cíle odkazu pro média.

**Přechod ze starého webu.** Návštěvníka z původní `/asociace/` veď na kartu O asociaci v Kontaktech, z `/casq/vykonny-vybor/` přímo na výkonný výbor a z `/kontakty/` na kontaktní stránku. V routeru vyhraď pro nový vstup ČASQ s komisemi odlišnou adresu, aby převod staré adresy fungoval jednoznačně.

**Ověřit v backendu.** Zjisti, která evidence je rozhodná pro pracovní e-mail a telefon a kdo může upravit bankovní údaje. Ulož i identifikátory a účty s úvodními nulami bez číselných převodů.

**Kontrola po napojení.** Otevři původní adresy asociace, výboru a odborných komisí. Každá musí přivést návštěvníka přímo k příslušnému obsahu. Na druhé měně porovnej číslo účtu i IBAN se zdrojem. U člena výboru ověř volání a e-mail. Otevři uložený odkaz na agendu marketingu.

<a id="partneri"></a>

## Partneři

### Partnerské úrovně a odkazy na partnery

#### Dnes

V patičce úvodní stránky jsou klikací loga rozdělená podle role. Národní sportovní agentura je uvedena jako poskytovatel finanční podpory, Aricoma jako hlavní partner a ASB, Under Armour a Dunlop jako další partneři.

- [Partnerský pás v patičce úvodní stránky](https://czechsquash.cz/#:~:text=%C4%8Cesk%C3%BD%20squash%20je%20finan%C4%8Dn%C4%9B%20podporov%C3%A1n)

#### Nový mustr

Na samostatné stránce má každá skupina nadpis a každý partner odkaz na svůj web. Zájemce o spolupráci může pokračovat na kontakty. Stejné partnerské úrovně a loga využívá patička.

- [Přehled partnerů a spolupráce](templates/partneri.html)

**Data a správa.** V jedné evidenci pro stránku i patičku spravuj partnera, název pro alternativní text, logo, cílovou URL, úroveň a pořadí v rámci úrovně. Popis finanční podpory patří k poskytovateli podpory. Se změnou partnera aktualizuj jeho stránku i společný pás.

**Kontrola po napojení.** Ověř přímý cíl u partnera z druhé skupiny a u poskytovatele finanční podpory. Po změně pořadí musejí obě umístění respektovat příslušnost ke skupině.

<a id="predpisy"></a>

## Řády a předpisy

### Vstup do Dokumentů a platnost předpisu

#### Dnes

Do rozcestníku Ke stažení vede odkaz z hlavičky i z patičky, každý na jinou adresu. Z rozcestníku návštěvník vybírá kategorii. Řády a předpisy obsahují stanovy a předpisy, u některých s datem platnosti, změnami nebo popisem.

- [Ke stažení z hlavičky](https://czechsquash.cz/soubory/)
- [Ke stažení z patičky](https://czechsquash.cz/ke-stazeni/)
- [Přímo do řádů a předpisů](https://czechsquash.cz/ke-stazeni/rady-a-predpisy/)

#### Nový mustr

Dokumenty jsou samostatným vstupem v hlavním menu. Řády a předpisy se otevírají jako první ze šesti kategorií. Každý předpis je přímý odkaz s názvem, formátem a velikostí.

- [Vstup do Dokumentů](templates/dokumenty.html)

**Data a správa.** Přenes název, kategorii, řazení, číslo či platnost uvedenou vydavatelem, soubor nebo externí cíl. Záměnu verze řeš v místě správy předpisu. Původní příloha zápisu musí zůstat dohledatelná i po změně nyní platného řádu.

**Přechod ze starého webu.** Převod adres otestuj z obou původních vstupů `/soubory/` a `/ke-stazeni/`. Obě mají otevřít Dokumenty s výchozí kategorií Řády a předpisy. Staré přímé vstupy do předávaných kategorií musejí otevřít odpovídající výpis, například Formuláře.

**Kontrola po napojení.** Porovnej předpis s uvedenou účinností a stanovy na jiné doméně. Otevři skutečný dokument a zkontroluj shodu názvu, verze a souboru.

<a id="hledani"></a>

## Hledání napříč dokumenty

### Dotaz z libovolné kategorie

#### Dnes

Návštěvník prochází samostatné výpisy předpisů, formulářů, zápisů výboru a komisí nebo valných hromad v sekci Ke stažení. Kodexy a další trenérské podklady jsou v sekci Trenéři. V každém výpisu vybírá příslušný dokument a jeho přílohy zvlášť.

- [Řády a předpisy](https://czechsquash.cz/ke-stazeni/rady-a-predpisy/)
- [Formuláře](https://czechsquash.cz/ke-stazeni/formulare/)
- [Zápisy výkonného výboru](https://czechsquash.cz/ke-stazeni/zapisy-vv/)
- [Valné hromady](https://czechsquash.cz/ke-stazeni/valne-hromady/)
- [Zápisy komisí](https://czechsquash.cz/ke-stazeni/zapisy-komisi/)
- [Základní dokumenty a kodexy pro trenéry](https://czechsquash.cz/treneri/dokumenty/)
- [Starší trenérské podklady](https://czechsquash.cz/treneri/archiv/)

#### Nový mustr

Pole Hledat dokument prohledá všechny kategorie včetně trenérských materiálů. Výsledky zůstávají ve skupinách, přílohy u příslušných zápisů. Zadání bez shody má vlastní stav a vymazání dotazu vrací původní výpis.

- [Vyhledání kodexů z hlavní kategorie](templates/dokumenty.html?q=kodex)
- [Kategorie trenérů](templates/dokumenty-treneri.html)

**Ověřit v backendu.** Vyhledej publikované záznamy ze stejné evidence, která plní kategorie. Dotaz bez diakritiky musí najít český název, změna kategorie zachovat parametr q a vymazání obnovit její místní obsah. Při vypnutém JavaScriptu zůstávají kategorie a odkazy dostupné.

**Kontrola po napojení.** Z formulářů vyhledej název přílohy VV, otevři nalezený soubor, pak vyhledej neexistující výraz. Při návratu bez dotazu ověř běžný výpis formulářů.

<a id="formulare"></a>

## Formuláře

### Jeden formulář ve více formátech nebo ročnících

#### Dnes

Původní tabulka páruje dokumenty v PDF a editovatelné soubory. Některé položky mají jen jediný formát nebo více ročníkových verzí.

- [Tabulka formulářů](https://czechsquash.cz/ke-stazeni/formulare/)

#### Nový mustr

Návštěvník vybírá přímo název formuláře a formát. Dostupné verze jsou u sebe a každá má vlastní odkaz i velikost.

- [Formátové a ročníkové verze](templates/dokumenty-formulare.html)

**Data a správa.** Publikuj formulář s jeho doloženými verzemi, každou s vlastním cílem, označením, formátem a velikostí. Zachovej číslo a pořadí formuláře. Jediná verze smí stát samostatně.

**Kontrola po napojení.** Zkontroluj jeden formulář s PDF a DOC a další se sezónními variantami. Obdobný základ názvu nesmí sloučit dva různé soubory.

<a id="vybor"></a>

## Zápisy výkonného výboru

### Zápis VV a jeho přílohy

#### Dnes

Zápisy jsou v sezónních blocích. Pod jednotlivými zápisy jsou očíslované přílohy s vlastními odkazy.

- [Zápisy výkonného výboru](https://czechsquash.cz/ke-stazeni/zapisy-vv/)

#### Nový mustr

Chronologický seznam drží pohromadě zápis, datum jednání a zveřejnění a jeho přílohy. Starší rok lze otevřít přímo odkazem.

- [Zápisy s přílohami](templates/dokumenty-zapisy-vv.html)
- [Starší rok jednání](templates/dokumenty-zapisy-vv.html#rok-2025)

**Data a správa.** U zápisu zachovej číslo, datum jednání, případné datum zveřejnění, vlastní soubor a uspořádané přílohy. Přílohu spoj s konkrétním zápisem, a to i při shodné adrese souboru u více záznamů.

**Kontrola po napojení.** Prověř starší zápis i zápis bez přílohy. Vyhledání výrazu z přílohy musí ukázat, ke kterému zápisu patří.

<a id="hromady"></a>

## Valné hromady

### Jedna nebo více valných hromad za rok

#### Dnes

Pod ročními nadpisy jsou zápisy, pozvánky, prezenční listiny a zprávy. Jeden rok může obsahovat více zasedání.

- [Veřejné podklady valných hromad](https://czechsquash.cz/ke-stazeni/valne-hromady/)

#### Nový mustr

Jeden blok v přehledu obsahuje zdrojové dokumenty daného roku. V roce s více zasedáními se zobrazí všechny jeho zápisy a přílohy v původním pořadí.

- [Přehled podle roku](templates/dokumenty-valne-hromady.html)

**Data a správa.** Vazba souboru na zasedání a jeho pořadí musí přežít seskupení podle roku. Zachovej také jednotlivé soubory uvnitř jedné číslované přílohy. Při rozporu názvu a cílového souboru zaznamenej původní dvojici k opravě správcem.

**Kontrola po napojení.** Vedle běžného ročníku zkontroluj obě zasedání z roku 2014. Pro rok bez zveřejněných podkladů nevytvářej prázdné zasedání.

<a id="zapisy-komisi"></a>

## Zápisy komisí

### Rozhodnutí nebo zápisy podle komise

#### Dnes

Komise se střídají v dlouhém výpisu. Soutěžní a disciplinární komise navíc rozlišuje rozhodnutí a zápisy po sezónách.

- [Původní skupiny rozhodnutí a zápisů](https://czechsquash.cz/ke-stazeni/zapisy-komisi/)

#### Nový mustr

Přepínač vybere komisi. Její rozhodnutí a zápisy se zobrazí v původních skupinách. Komise bez rozepsaných sezón má soubory pohromadě.

- [Výběr komise a skupiny dokumentů](templates/dokumenty-zapisy-komisi.html)

**Data a správa.** Uchovej příslušnost ke komisi, druh záznamu, zdrojovou sezónu a pořadí. Historické komise zůstávají v archivu i po změně organizační struktury. Položka bez cílového souboru zůstává textem.

**Ověřit v backendu.** Prověř zdroj chybných či nejednoznačných označení sezón a dostupnost přílohy podle záznamu. Původní hodnoty ponech dohledatelné do potvrzení opravy.

**Kontrola po napojení.** Porovnej soutěžní komisi po sezónách s komisí bez sezonního dělení. Bez skriptů musí jít přečíst seznamy všech komisí.

<a id="trenerske-dokumenty"></a>

## Dokumenty pro trenéry

### Jedna kategorie pro metodické dokumenty a starší podklady

#### Dnes

Trenérské dokumenty obsahují systém tříd a kodexy. Starší pozvánky, historické seznamy a projektové podklady jsou samostatně v trenérském archivu.

- [Základní trenérské dokumenty](https://czechsquash.cz/treneri/dokumenty/)
- [Starší trenérské podklady](https://czechsquash.cz/treneri/archiv/)

#### Nový mustr

Trenérská kategorie v Dokumentech spojuje základní dokumenty a starší soubory. Původní místní adresa dokumentů zobrazuje stejný obsah. Z pozvánek vede odkaz přímo na starší podklady.

- [Kategorie Dokumenty pro trenéry](templates/dokumenty-treneri.html)
- [Starší podklady](templates/dokumenty-treneri.html#skoleni-a-starsi-podklady)
- [Dosavadní místní adresa](templates/treneri-dokumenty.html)

**Data a správa.** Zařaď každý soubor do odpovídající skupiny, zachovej datum a místo kurzu, doložený popis a verzi seznamu. Pod stejnou veřejnou položkou spravuj pouze jednu kopii metadat pro obě adresy a pro společné vyhledávání.

**Kontrola po napojení.** Najdi historický seznam k určitému datu z jiné kategorie Dokumentů. Ověř, že dokument zůstává datovaným souborem a že stará adresa vede ke shodné verzi.

<a id="pravidla"></a>

## Pravidla hry

### Úplná pravidla v českém a anglickém znění

#### Dnes

Původní stránka ke stažení nabízí český překlad a anglický originál pravidel WSF 2020 i další soubory včetně zkrácených pravidel.

- [Oficiální výpis pravidel a jazykových verzí](https://czechsquash.cz/ke-stazeni/pravidla/)

#### Nový mustr

Stránka pro veřejnost nabízí výklad pro začátečníky a dvojici úplných pravidel v češtině a angličtině. U odkazů přímo uvádí jazyk, rok vydání, formát a velikost.

- [Pravidla hry](templates/pravidla.html)
- [Úplná pravidla ve dvou jazycích](templates/pravidla.html#rules-downloads-title)

**Data a správa.** U každé jazykové verze zachovej vydavatele, vydání, jazyk a skutečný soubor. Krátké redakční karty mají název a výklad, který lze při změně pravidel přezkoumat. Informace v kartách a označení staženého vydání musí souhlasit.

**Rozhodnout s vlastníkem pravidel.** Potvrdit, které vydání a překlad má ČASQ při spuštění nabízet. Ukázka vychází z vydání 2020, které je přímo uvedené u souborů.

**Kontrola po napojení.** Otevři českou i anglickou verzi a zkontroluj titulní stranu proti popisu. Při budoucí výměně přezkoušej všechny dotčené karty, například podání nebo bránění ve hře.

<a id="clensky-pristup"></a>

## Členský přístup

### Veřejná nápověda pro hráče a kluby

#### Dnes

Přihlašovací stránka členské aplikace obsahuje vedle formuláře samostatné pokyny pro hráče a kluby. Vysvětluje jejich oprávnění i to, kdo jim zajišťuje přístupové údaje.

- [Přihlášení pro členy ČASQ](https://czechsquash.cz/login)

#### Nový mustr

Informační stránka rozděluje pokyny pro hráče a kluby a odkazuje na přehled klubů, sekretariát a kalendář. V mustru se žádné přihlašovací údaje nezadávají.

- [Veřejné pokyny pro členy](templates/clensky-system.html)

**Data a správa.** Udržuj dva různé kontaktní postupy. Hráč získává přístup prostřednictvím svého klubu, klub přes sekretariát. Zachovej veřejnou cestu ke kontaktům i při změně adresy členské aplikace.

**Ověřit v backendu.** Potvrď, kam v produkci vede stávající vstup do členské aplikace a kdo spravuje jeho adresu. Přihlášení, oprávnění a soukromé členské úkony nejsou předmětem tohoto informačního mustru.

**Rozhodnout s vlastníkem členského systému.** Určit, odkud bude člen na novém webu vstupovat přímo do provozované aplikace. Samotný informační mustr vstup do účtu nenabízí.

**Kontrola po napojení.** Projdi případ hráče bez účtu a klubu bez účtu. Každý musí dojít ke svému správci přístupu. Po napojení zkontroluj též dohodnutý veřejný vstup do přihlášení.

<a id="faq"></a>

## Časté otázky

### Odpovědi na stránce Hrej squash!

#### Dnes

Počet hráčů vysvětluje úvod do hry, bodování a úplné znění pravidel jsou v sekci Pravidla. Termíny soutěží jsou v kalendáři. Členská aplikace vysvětluje, kdo vystavuje přístupy hráčům a klubům, a kontakty rozdělují soutěžní agendu a práci s mládeží mezi členy výboru.

- [Dvouhra a čtyřhra na původním webu](https://czechsquash.cz/co-je-to-squash/)
- [Počítání skóre a úplná pravidla](https://czechsquash.cz/ke-stazeni/pravidla/)
- [Termíny soutěží podle kategorie a data](https://czechsquash.cz/kalendar-akci/)
- [Přístupové údaje hráče a klubu](https://czechsquash.cz/login)
- [Odpovědnost za soutěže a mládež](https://czechsquash.cz/kontakty/)

#### Nový mustr

Odpovědi pro začátečníky, rodiče, kluby a členy se rozbalují přímo na stránce Hrej squash!. Patička i dosavadní adresa Častých otázek vedou na sekci s odpověďmi.

- [Otázky a odpovědi na Hrej squash!](templates/nabory.html#otazky)
- [Původní místní adresa FAQ](templates/faq.html)

**Data a správa.** Spravuj znění otázky, odpověď, pořadí a případný související odkaz. Odkazy na pravidla, klub či sekretariát musejí sledovat stejné zdroje jako navazující stránky. Věk pro přijetí dítěte a cenu první lekce určuje konkrétní klub.

**Kontrola po napojení.** Otevři starou adresu i odkaz z patičky. Klávesnicí a bez JavaScriptu rozbal otázku s odkazem na pravidla a otázku s čistě textovou odpovědí.

<a id="ochrana-udaju"></a>

## Ochrana osobních údajů

### Informační stránka a stav před dodáním znění

#### Dnes

ČASQ zveřejňuje informace pro subjekty osobních údajů včetně účelů zpracování, kategorií příjemců, lhůt a práv. Registrační řád zvlášť popisuje evidenci členů a druhá strana registračního formuláře obsahuje souhlas pro členskou evidenci, statistiku a organizaci soutěží.

- [Informace ČASQ pro subjekty osobních údajů](https://czechsquash.cz/casq/gdpr/)
- [Registrační řád, čl. 4–6 (PDF, strana 2)](https://czechsquash.cz/web/Predpisy_CASQ/2025_08_01_Registracni_a_prestupni_rad_CASQ.pdf#page=2)
- [Individuální registrace, souhlas člena (PDF, strana 2)](https://czechsquash.cz/web/Predpisy_CASQ/01_individualni_registrace_clena_CASQ.pdf#page=2)

#### Nový mustr

Mustr sděluje, že úplné informace pro tento web zatím nejsou k dispozici. Uvádí ověřený obecný kontakt ČASQ a odkaz na kontaktní stránku.

- [Stav při chybějícím úplném textu](templates/ochrana-osobnich-udaju.html)

**Data a správa.** Zveřejni verzi potvrzenou vlastníkem pro nový web. Udržuj datum verze a ověřený kontakt. Změna kontaktní osoby se má projevit i na stránce otevřené z patičky. Registrační formulář patří k členské registraci.

**Ověřit v backendu.** Zjisti, jaké údaje zpracovává veřejný web, které přebírá z členské aplikace a komu se předávají. Na původní informační stránce se zobrazená e-mailová adresa liší od cíle odkazu. Před migrací ověř skutečnou schránku a cíl odkazu pro žádosti.

**Rozhodnout s vlastníkem webu.** Porovnat zjištěné zpracování se zveřejněnými informacemi ČASQ, schválit rozsah a znění pro nový web, odpovědný kontakt a další aktualizace.

**Kontrola po napojení.** Z patičky otevři stránku i s chybějícím textem a ověř obecný kontakt. Po dodání schválené verze porovnej zveřejněné znění s podkladem vlastníka.
