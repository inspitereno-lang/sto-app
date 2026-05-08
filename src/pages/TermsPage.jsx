import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const content = {
  en: {
    label: 'Legal',
    title: 'Terms and Conditions',
    lastUpdated: 'Last updated: 25-04-2026',
    welcome: 'Welcome to https://saanatuotanto.com/',
    intro: 'These Terms and Conditions outline the rules and regulations for the use of the website operated by Saana Tuotanto Oy.',
    consent: 'By accessing this website, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our website.',
    sections: [
      { title: '1. Company Information', body: 'Vantaa, Finland. admin@saanatuatanto.com' },
      { title: '2. Definitions', body: '“You”, “User”, “Company”, “We”, “Us”, “Website”, “Services”' },
      { title: '3. Use of the Website', body: 'You agree to use our website only for lawful purposes and in a way that does not infringe the rights of others.' },
      { title: '4. Cookies', body: 'We use cookies to improve user experience in accordance with our Privacy Policy.' },
      { title: '5. Intellectual Property Rights', body: 'Saana Tuotanto Oy owns all intellectual property rights for the content on this website.' },
      { title: '6. User-Generated Content', body: 'We reserve the right to monitor and remove inappropriate user content.' },
      { title: '7. Hyperlinking to Our Website', body: 'Certain organizations may link to our website without prior approval.' },
      { title: '8. iFrames', body: 'You may not create frames around our website without prior written permission.' },
      { title: '9. Content Liability', body: 'We are not responsible for content appearing on third-party websites that link to us.' },
      { title: '10. Privacy', body: 'Your use of the website is also governed by our Privacy Policy.' },
      { title: '11. Reservation of Rights', body: 'We reserve the right to request removal of links and modify these Terms at any time.' },
      { title: '12. Accuracy of Information', body: 'We strive for accuracy but do not guarantee completeness or correctness.' },
      { title: '13. Limitation of Liability', body: 'We are not liable for indirect or consequential damages as permitted by law.' },
      { title: '14. Governing Law', body: 'These Terms are governed by the laws of Finland.' }
    ]
  },
  fi: {
    label: 'Lakiasiat',
    title: 'Käyttöehdot',
    lastUpdated: 'Viimeksi päivitetty: 25.04.2026',
    welcome: 'Tervetuloa osoitteeseen https://saanatuotanto.com/',
    intro: 'Nämä käyttöehdot määrittelevät Saana Tuotanto Oy:n operoiman verkkosivuston käytön säännöt ja määräykset.',
    consent: 'Käyttämällä tätä verkkosivustoa hyväksyt nämä käyttöehdot. Jos et hyväksy niitä, älä käytä verkkosivustoamme.',
    sections: [
      { title: '1. Yritystiedot', body: 'Vantaa, Suomi. admin@saanatuatanto.com' },
      { title: '2. Määritelmät', body: '”Sinä”, ”Käyttäjä”, ”Yritys”, ”Me”, ”Verkkosivusto”, ”Palvelut”' },
      { title: '3. Verkkosivuston käyttö', body: 'Sitoudut käyttämään verkkosivustoa vain laillisiin tarkoituksiin.' },
      { title: '4. Evästeet', body: 'Käytämme evästeitä parantaaksemme käyttäjäkokemusta tietosuojaselosteemme mukaisesti.' },
      { title: '5. Immateriaalioikeudet', body: 'Saana Tuotanto Oy omistaa kaikki tämän verkkosivuston sisällön immateriaalioikeudet.' },
      { title: '6. Käyttäjien tuottama sisältö', body: 'Pidätämme oikeuden valvoa ja poistaa sopimatonta sisältöä.' },
      { title: '7. Linkittäminen verkkosivustollemme', body: 'Tietyt organisaatiot voivat linkittää verkkosivustollemme ilman ennakkoilmoitusta.' },
      { title: '8. iFrame-kehykset', body: 'Et saa luoda kehyksiä verkkosivustomme ympärille ilman kirjallista lupaa.' },
      { title: '9. Sisältövastuu', body: 'Emme ole vastuussa sisällöstä, joka näkyy kolmansien osapuolten verkkosivustoilla.' },
      { title: '10. Tietosuoja', body: 'Verkkosivuston käyttöä säätelee myös tietosuojaselosteemme.' },
      { title: '11. Oikeuksien pidättäminen', body: 'Pidätämme oikeuden pyytää linkkien poistamista ja muuttaa näitä ehtoja.' },
      { title: '12. Tietojen tarkkuus', body: 'Pyrimme tarkkuuteen, mutta emme takaa tietojen täydellisyyttä.' },
      { title: '13. Vastuunrajoitus', body: 'Emme ole vastuussa epäsuorista tai välillisistä vahingoista lain sallimissa rajoissa.' },
      { title: '14. Sovellettava laki', body: 'Näihin ehtoihin sovelletaan Suomen lakia.' }
    ]
  },
  sv: {
    label: 'Juridik',
    title: 'Villkor',
    lastUpdated: 'Senast uppdaterad: 25-04-2026',
    welcome: 'Välkommen till https://saanatuotanto.com/',
    intro: 'Dessa villkor fastställer reglerna och föreskrifterna för användningen av webbplatsen som drivs av Saana Tuotanto Oy.',
    consent: 'Genom att använda denna webbplats godkänner du dessa villkor. Om du inte godkänner dem, vänligen använd inte vår webbplats.',
    sections: [
      { title: '1. Företagsinformation', body: 'Vanda, Finland. admin@saanatuatanto.com' },
      { title: '2. Definitioner', body: '”Du”, ”Användare”, ”Företaget”, ”Vi”, ”Oss”, ”Webbplats”, ”Tjänster”' },
      { title: '3. Användning av webbplatsen', body: 'Du godkänner att använda webbplatsen endast för lagliga ändamål.' },
      { title: '4. Cookies', body: 'Vi använder cookies för att förbättra användarupplevelsen i enlighet med vår integritetspolicy.' },
      { title: '5. Immateriella rättigheter', body: 'Saana Tuotanto Oy äger alla immateriella rättigheter för innehållet på denna webbplats.' },
      { title: '6. Användargenererat innehåll', body: 'Vi förbehåller oss rätten att övervaka och ta bort olämpligt innehåll.' },
      { title: '7. Länkar till vår webbplats', body: 'Vissa organisationer kan länka till vår webbplats utan föregående godkännande.' },
      { title: '8. iFrames', body: 'Du får inte skapa ramar runt vår webbplats utan föregående skriftligt tillstånd.' },
      { title: '9. Innehållsansvar', body: 'Vi ansvarar inte för innehåll som visas på tredje parts webbplatser.' },
      { title: '10. Integritet', body: 'Din användning von webbplatsen styrs också av vår integritetspolicy.' },
      { title: '11. Förbehåll av rättigheter', body: 'Vi förbehåller oss rätten att begära borttagning av länkar.' },
      { title: '12. Informationens korrekthet', body: 'Vi strävar efter att säkerställa korrekthet men garanterar inte fullständighet.' },
      { title: '13. Ansvarsbegränsning', body: 'Vi är inte ansvariga för indirekta skador eller följdskador.' },
      { title: '14. Tillämplig lag', body: 'Dessa villkor styrs av finsk lag.' }
    ]
  },
  no: {
    label: 'Juridisk',
    title: 'Vilkår og betingelser',
    lastUpdated: 'Sist oppdatert: 25.04.2026',
    welcome: 'Velkommen til https://saanatuotanto.com/',
    intro: 'Disse vilkårene og betingelsene fastsetter reglene for bruk av nettstedet som drives av Saana Tuotanto Oy.',
    consent: 'Ved å bruke dette nettstedet godtar du disse vilkårene. Hvis du ikke er enig, vennligst ikke bruk nettstedet vårt.',
    sections: [
      { title: '1. Firmainformasjon', body: 'Vantaa, Finland. admin@saanatuatanto.com' },
      { title: '2. Definisjoner', body: '«Du», «Bruker», «Selskapet», «Vi», «Oss», «Nettsted», «Tjenester»' },
      { title: '3. Bruk av nettstedet', body: 'Du godtar å bruke nettstedet vårt kun til lovlige formål.' },
      { title: '4. Informasjonskapsler', body: 'Vi bruker informasjonskapsler i samsvar med vår personvernerklæring.' },
      { title: '5. Immaterielle rettigheter', body: 'Saana Tuotanto Oy eier alle rettigheter til innholdet på dette nettstedet.' },
      { title: '6. Brukergenerert innhold', body: 'Vi forbeholder oss retten til å fjerne upassende innhold.' },
      { title: '7. Lenking til nettstedet', body: 'Visse organisasjoner kan lenke til oss uten forhåndsgodkjenning.' },
      { title: '8. iFrames', body: 'Du kan ikke lage rammer rundt nettstedet vårt uten skriftlig tillatelse.' },
      { title: '9. Ansvar for innhold', body: 'Vi er ikke ansvarlige for innhold på tredjeparts nettsteder.' },
      { title: '10. Personvern', body: 'Bruk av nettstedet styres også av vår personvernerklæring.' },
      { title: '11. Rettighetsforbehold', body: 'Vi kan be om fjerning av lenker til enhver tid.' },
      { title: '12. Informasjonens nøyaktighet', body: 'Vi streber etter nøyaktighet, men garanterer ikke fullstendighet.' },
      { title: '13. Ansvarsbegrensning', body: 'Vi er ikke ansvarlige for indirekte skader så langt loven tillater det.' },
      { title: '14. Lovvalg', body: 'Disse vilkårene styres av finsk lov.' }
    ]
  },
  da: {
    label: 'Juridisk',
    title: 'Vilkår og betingelser',
    lastUpdated: 'Sidst opdateret: 25.04.2026',
    welcome: 'Velkommen til https://saanatuotanto.com/',
    intro: 'Disse vilkår og betingelser fastlægger reglerne for brug af webstedet, som drives af Saana Tuotanto Oy.',
    consent: 'Ved at bruge dette websted accepterer du disse vilkår. Hvis du ikke er enig, bedes du ikke bruge vores websted.',
    sections: [
      { title: '1. Virksomhedsoplysninger', body: 'Vantaa, Finland. admin@saanatuatanto.com' },
      { title: '2. Definitioner', body: '»Du«, »Bruger«, »Virksomheden«, »Vi«, »Os«, »Websted«, »Tjenester«' },
      { title: '3. Brug af webstedet', body: 'Du accepterer kun at bruge vores websted til lovlige formål.' },
      { title: '4. Cookies', body: 'Vi bruger cookies i overensstemmelse med vores privatlivspolitik.' },
      { title: '5. Immaterielle rettigheder', body: 'Saana Tuotanto Oy ejer alle rettigheder til indholdet på dette websted.' },
      { title: '6. Brugergenereret indhold', body: 'Vi forbeholder os retten til at fjerne upassende indhold.' },
      { title: '7. Linkning til vores websted', body: 'Visse organisationer kan linke til os uden forudgående godkendelse.' },
      { title: '8. iFrames', body: 'Du må ikke oprette rammer omkring vores websted uden skriftlig tilladelse.' },
      { title: '9. Ansvar for indhold', body: 'Vi er ikke ansvarlige for indhold på tredjepartswebsteder.' },
      { title: '10. Privatliv', body: 'Brug af webstedet er også underlagt vores privatlivspolitik.' },
      { title: '11. Forbehold af rettigheder', body: 'Vi kan til enhver tid anmode om fjernelse af links.' },
      { title: '12. Informationens nøjagtighed', body: 'Vi stræber efter nøjagtighed, men garanterer ikke fuldstændighed.' },
      { title: '13. Ansvarsbegrænsning', body: 'Vi er ikke ansvarlige for indirekte skader, som loven tillader.' },
      { title: '14. Lovvalg', body: 'Disse vilkår er underlagt finsk lovgivning.' }
    ]
  },
  et: {
    label: 'Juriidiline teave',
    title: 'Kasutustingimused',
    lastUpdated: 'Viimati uuendatud: 25.04.2026',
    welcome: 'Tere tulemast veebilehele https://saanatuotanto.com/',
    intro: 'Need kasutustingimused sätestavad Saana Tuotanto Oy hallatava veebilehe kasutamise reeglid ja eeskirjad.',
    consent: 'Sellele veebilehele sisenedes nõustute nende kasutustingimustega. Kui te ei nõustu, palun ärge kasutage meie veebilehte.',
    sections: [
      { title: '1. Ettevõtte andmed', body: 'Vantaa, Soome. admin@saanatuatanto.com' },
      { title: '2. Mõisted', body: '„Teie“, „Kasutaja“, „Ettevõte“, „Meie“, „Veebileht“, „Teenused“' },
      { title: '3. Veebilehe kasutamine', body: 'Nõustute kasutama veebilehte ainult seaduslikel eesmärkidel.' },
      { title: '4. Küpsised', body: 'Kasutame küpsiseid kasutajakogemuse parandamiseks.' },
      { title: '5. Intellektuaalomandi õigused', body: 'Saana Tuotanto Oy-le kuuluvad kõik selle veebilehe sisu intellektuaalomandi õigused.' },
      { title: '6. Kasutajate loodud sisu', body: 'Jätame endale õiguse jälgida ja eemaldada sobimatut sisu.' },
      { title: '7. Lingid meie veebilehele', body: 'Teatud organisatsioonid võivad linkida meie veebilehele ilma eelneva nõusolekuta.' },
      { title: '8. iFrame-id', body: 'Te ei tohi ilma eelneva kirjaliku loata luua raame meie veebilehe ümber.' },
      { title: '9. Vastutus sisu eest', body: 'Me ei vastuta sisu eest, mis ilmub kolmandate osapoolte veebilehtedel.' },
      { title: '10. Privaatsus', body: 'Veebilehte kasutamist reguleerib ka meie privaatsuspoliitika.' },
      { title: '11. Õiguste reserveerimine', body: 'Jätame endale õiguse nõuda linkide eemaldamist.' },
      { title: '12. Teabe täpsus', body: 'Püüame tagada teabe täpsust, kuid ei garanteeri selle täielikkust.' },
      { title: '13. Vastutuse piiramine', body: 'Me ei vastuta kaudsete või tegevusest tulenevate kahjude eest.' },
      { title: '14. Kohaldatav õigus', body: 'Neid tingimusi reguleerib Soome seadus.' }
    ]
  },
  de: {
    label: 'Rechtliches',
    title: 'Allgemeine Geschäftsbedingungen',
    lastUpdated: 'Zuletzt aktualisiert: 25.04.2026',
    welcome: 'Willkommen auf https://saanatuotanto.com/',
    intro: 'Diese Allgemeinen Geschäftsbedingungen legen die Regeln für die Nutzung der von Saana Tuotanto Oy betriebenen Website fest.',
    consent: 'Durch den Zugriff auf diese Website erklären Sie sich mit diesen Bedingungen einverstanden. Wenn Sie nicht einverstanden sind, nutzen Sie unsere Website bitte nicht.',
    sections: [
      { title: '1. Unternehmensinformationen', body: 'Vantaa, Finnland. admin@saanatuatanto.com' },
      { title: '2. Definitionen', body: '„Sie“, „Nutzer“, „Unternehmen“, „Wir“, „Uns“, „Website“, „Dienstleistungen“' },
      { title: '3. Nutzung der Website', body: 'Sie erklären sich damit einverstanden, die Website nur für rechtmäßige Zwecke zu nutzen.' },
      { title: '4. Cookies', body: 'Wir verwenden Cookies in Übereinstimmung mit unserer Datenschutzerklärung.' },
      { title: '5. Geistiges Eigentum', body: 'Saana Tuotanto Oy besitzt alle Rechte an den Inhalten dieser Website.' },
      { title: '6. Nutzerinhalte', body: 'Wir behalten uns das Recht vor, unangebrachte Inhalte zu entfernen.' },
      { title: '7. Verlinkung', body: 'Bestimmte Organisationen dürfen ohne vorherige Genehmigung auf uns verlinken.' },
      { title: '8. iFrames', body: 'Die Erstellung von Frames um unsere Website ist ohne Erlaubnis untersagt.' },
      { title: '9. Haftung für Inhalte', body: 'Wir haften nicht für Inhalte auf verlinkten externen Websites.' },
      { title: '10. Datenschutz', body: 'Die Nutzung unterliegt unserer Datenschutzerklärung.' },
      { title: '11. Rechtsvorbehalt', body: 'Wir behalten uns das Recht vor, die Entfernung von Links zu verlangen.' },
      { title: '12. Genauigkeit', body: 'Wir bemühen uns um Korrektheit, garantieren jedoch keine Vollständigkeit.' },
      { title: '13. Haftungsbeschränkung', body: 'Wir haften nicht für indirekte Schäden, soweit gesetzlich zulässig.' },
      { title: '14. Anwendbares Recht', body: 'Diese Bedingungen unterliegen finnischem Recht.' }
    ]
  },
  nl: {
    label: 'Juridisch',
    title: 'Algemene voorwaarden',
    lastUpdated: 'Laatst bijgewerkt: 25-04-2026',
    welcome: 'Welkom op https://saanatuotanto.com/',
    intro: 'Deze algemene voorwaarden beschrijven de regels voor het gebruik van de website beheerd door Saana Tuotanto Oy.',
    consent: 'Door deze website te bezoeken, gaat u akkoord met deze voorwaarden. Als u niet akkoord gaat, gebruik onze website dan niet.',
    sections: [
      { title: '1. Bedrijfsinformatie', body: 'Vantaa, Finland. admin@saanatuatanto.com' },
      { title: '2. Definities', body: '“U”, “Gebruiker”, “Bedrijf”, “Wij”, “Ons”, “Website”, “Diensten”' },
      { title: '3. Gebruik van de website', body: 'U stemt ermee in de website alleen voor wettige doeleinden te gebruiken.' },
      { title: '4. Cookies', body: 'Wij gebruiken cookies in overeenstemming met ons privacybeleid.' },
      { title: '5. Intellectueel eigendom', body: 'Saana Tuotanto Oy bezit alle rechten op de inhoud van deze website.' },
      { title: '6. Gebruikersinhoud', body: 'Wij behouden ons het recht voor om ongepaste inhoud te verwijderen.' },
      { title: '7. Hyperlinks naar onze site', body: 'Bepaalde organisaties mogen zonder voorafgaande toestemming naar ons linken.' },
      { title: '8. iFrames', body: 'Zonder toestemming mag u geen frames rond onze website maken.' },
      { title: '9. Aansprakelijkheid voor inhoud', body: 'Wij zijn niet verantwoordelijk voor inhoud op externe websites.' },
      { title: '10. Privacy', body: 'Uw gebruik valt ook onder ons privacybeleid.' },
      { title: '11. Voorbehoud van rechten', body: 'Wij kunnen verzoeken om links naar onze site te verwijderen.' },
      { title: '12. Nauwkeurigheid', body: 'Wij streven naar nauwkeurigheid, maar garanderen geen volledigheid.' },
      { title: '13. Beperking van aansprakelijkheid', body: 'Wij zijn niet aansprakelijk voor indirecte schade voor zover wettelijk toegestaan.' },
      { title: '14. Toepasselijk recht', body: 'Deze voorwaarden worden beheerst door het Finse recht.' }
    ]
  },
  fr: {
    label: 'Juridique',
    title: 'Conditions générales',
    lastUpdated: 'Dernière mise à jour : 25-04-2026',
    welcome: 'Bienvenue sur https://saanatuotanto.com/',
    intro: 'Ces conditions générales définissent les règles d\'utilisation du site web exploité par Saana Tuotanto Oy.',
    consent: 'En accédant à ce site, vous acceptez ces conditions. Si vous n\'êtes pas d\'accord, veuillez ne pas utiliser notre site.',
    sections: [
      { title: '1. Informations sur la société', body: 'Vantaa, Finlande. admin@saanatuatanto.com' },
      { title: '2. Définitions', body: '« Vous », « Utilisateur », « Société », « Nous », « Site web », « Services »' },
      { title: '3. Utilisation du site', body: 'Vous acceptez d\'utiliser le site uniquement à des fins licites.' },
      { title: '4. Cookies', body: 'Nous utilisons des cookies conformément à notre politique de confidentialité.' },
      { title: '5. Propriété intellectuelle', body: 'Saana Tuotanto Oy détient tous les droits sur le contenu de ce site.' },
      { title: '6. Contenu généré par l\'utilisateur', body: 'Nous nous réservons le droit de supprimer tout contenu inapproprié.' },
      { title: '7. Liens vers notre site', body: 'Certaines organisations peuvent créer des liens vers nous sans autorisation préalable.' },
      { title: '8. iFrames', body: 'L\'utilisation d\'iFrames autour de notre site est interdite sans autorisation écrite.' },
      { title: '9. Responsabilité du contenu', body: 'Nous ne sommes pas responsables du contenu des sites tiers.' },
      { title: '10. Confidentialité', body: 'L\'utilisation du site est régie par notre politique de confidentialité.' },
      { title: '11. Réserve de droits', body: 'Nous nous réservons le droit de demander la suppression de tout lien.' },
      { title: '12. Exactitude', body: 'Nous nous efforçons d\'être exacts mais ne garantissons pas l\'exhaustivité.' },
      { title: '13. Limitation de responsabilité', body: 'Nous ne sommes pas responsables des dommages indirects selon la loi.' },
      { title: '14. Droit applicable', body: 'Ces conditions sont régies par le droit finlandais.' }
    ]
  },
  pl: {
    label: 'Prawne',
    title: 'Regulamin',
    lastUpdated: 'Ostatnia aktualizacja: 25.04.2026',
    welcome: 'Witaj na https://saanatuotanto.com/',
    intro: 'Niniejszy regulamin określa zasady korzystania z witryny internetowej obsługiwanej przez Saana Tuotanto Oy.',
    consent: 'Korzystając z tej witryny, akceptujesz niniejszy regulamin. Jeśli się nie zgadzasz, prosimy o opuszczenie strony.',
    sections: [
      { title: '1. Informacje o firmie', body: 'Vantaa, Finlandia. admin@saanatuatanto.com' },
      { title: '2. Definicje', body: '„Ty”, „Użytkownik”, „Firma”, „My”, „Strona internetowa”, „Usługi”' },
      { title: '3. Korzystanie z witryny', body: 'Zgadzasz się korzystać z witryny wyłącznie w celach zgodnych z prawem.' },
      { title: '4. Ciasteczka', body: 'Używamy ciasteczek zgodnie z naszą polityką prywatności.' },
      { title: '5. Własność intelektualna', body: 'Saana Tuotanto Oy posiada wszelkie prawa do treści na tej stronie.' },
      { title: '6. Treści użytkowników', body: 'Zastrzegamy sobie prawo do usuwania nieodpowiednich treści.' },
      { title: '7. Linkowanie do strony', body: 'Niektóre organizacje mogą linkować do nas bez uprzedniej zgody.' },
      { title: '8. iFrames', body: 'Nie wolno tworzyć ramek wokół naszej strony bez pisemnej zgody.' },
      { title: '9. Odpowiedzialność za treść', body: 'Nie ponosimy odpowiedzialności za treści na stronach zewnętrznych.' },
      { title: '10. Prywatność', body: 'Korzystanie ze strony podlega naszej polityce prywatności.' },
      { title: '11. Zastrzeżenie praw', body: 'Możemy zażądać usunięcia linków do naszej strony w dowolnym momencie.' },
      { title: '12. Dokładność', body: 'Dążymy do dokładności, ale nie gwarantujemy kompletności informacji.' },
      { title: '13. Ograniczenie odpowiedzialności', body: 'Nie odpowiadamy za szkody pośrednie w zakresie dozwolonym przez prawo.' },
      { title: '14. Prawo właściwe', body: 'Niniejszy regulamin podlega prawu fińskiemu.' }
    ]
  },
  es: {
    label: 'Legal',
    title: 'Términos y condiciones',
    lastUpdated: 'Última actualización: 25-04-2026',
    welcome: 'Bienvenido a https://saanatuotanto.com/',
    intro: 'Estos términos y condiciones describen las reglas para el uso del sitio web operado por Saana Tuotanto Oy.',
    consent: 'Al acceder a este sitio web, acepta estos términos. Si no está de acuerdo, no utilice nuestro sitio web.',
    sections: [
      { title: '1. Información de la empresa', body: 'Vantaa, Finlandia. admin@saanatuatanto.com' },
      { title: '2. Definiciones', body: '“Usted”, “Usuario”, “Compañía”, “Nosotros”, “Sitio web”, “Servicios”' },
      { title: '3. Uso del sitio web', body: 'Acepta usar el sitio web solo para fines legales.' },
      { title: '4. Cookies', body: 'Usamos cookies de acuerdo con nuestra política de privacidad.' },
      { title: '5. Propiedad intelectual', body: 'Saana Tuotanto Oy posee todos los derechos sobre el contenido de este sitio.' },
      { title: '6. Contenido del usuario', body: 'Nos reservamos el derecho de eliminar contenido inapropiado.' },
      { title: '7. Enlaces a nuestro sitio', body: 'Ciertas organizaciones pueden enlazarnos sin aprobación previa.' },
      { title: '8. iFrames', body: 'No puede crear marcos alrededor de nuestro sitio sin permiso por escrito.' },
      { title: '9. Responsabilidad del contenido', body: 'No somos responsables del contenido de sitios externos.' },
      { title: '10. Privacidad', body: 'Su uso también se rige por nuestra política de privacidad.' },
      { title: '11. Reserva de derechos', body: 'Podemos solicitar la eliminación de enlaces en cualquier momento.' },
      { title: '12. Exactitud', body: 'Nos esforzamos por la precisión pero no garantizamos la integridad.' },
      { title: '13. Limitación de responsabilidad', body: 'No somos responsables de daños indirectos según la ley.' },
      { title: '14. Ley aplicable', body: 'Estos términos se rigen por la ley de Finlandia.' }
    ]
  },
  it: {
    label: 'Legale',
    title: 'Termini e condizioni',
    lastUpdated: 'Ultimo aggiornamento: 25-04-2026',
    welcome: 'Benvenuti su https://saanatuotanto.com/',
    intro: 'Questi termini e condizioni delineano le regole per l\'utilizzo del sito web gestito da Saana Tuotanto Oy.',
    consent: 'Accedendo a questo sito, accetti questi termini. Se non sei d\'accordo, ti preghiamo di non utilizzare il sito.',
    sections: [
      { title: '1. Informazioni sull\'azienda', body: 'Vantaa, Finlandia. admin@saanatuatanto.com' },
      { title: '2. Definizioni', body: '“Tu”, “Utente”, “Società”, “Noi”, “Sito web”, “Servizi”' },
      { title: '3. Utilizzo del sito web', body: 'Accetti di utilizzare il sito solo per scopi leciti.' },
      { title: '4. Cookie', body: 'Utilizziamo i cookie in conformità con la nostra politica sulla privacy.' },
      { title: '5. Proprietà intellettuale', body: 'Saana Tuotanto Oy detiene tutti i diritti sui contenuti di questo sito.' },
      { title: '6. Contenuto generato dall\'utente', body: 'Ci riserviamo il diritto di rimuovere contenuti inappropriati.' },
      { title: '7. Link al nostro sito', body: 'Alcune organizzazioni possono collegarsi a noi senza previa approvazione.' },
      { title: '8. iFrame', body: 'Non è consentito creare cornici attorno al nostro sito senza permesso.' },
      { title: '9. Responsabilità dei contenuti', body: 'Non siamo responsabili per i contenuti di siti esterni.' },
      { title: '10. Privacy', body: 'L\'utilizzo è regolato anche dalla nostra politica sulla privacy.' },
      { title: '11. Riserva di diritti', body: 'Possiamo richiedere la rimozione dei link in qualsiasi momento.' },
      { title: '12. Accuratezza', body: 'Puntiamo all\'accuratezza ma non garantiamo la completezza.' },
      { title: '13. Limitazione di responsabilità', body: 'Non siamo responsabili per danni indiretti come previsto dalla legge.' },
      { title: '14. Legge applicabile', body: 'Questi termini sono regolati dalla legge finlandese.' }
    ]
  },
  pt: {
    label: 'Legal',
    title: 'Termos e Condições',
    lastUpdated: 'Última atualização: 25-04-2026',
    welcome: 'Bem-vindo a https://saanatuotanto.com/',
    intro: 'Estes termos e condições descrevem as regras para o uso do site operado pela Saana Tuotanto Oy.',
    consent: 'Ao aceder a este site, concorda com estes termos. Se não concordar, não utilize o nosso site.',
    sections: [
      { title: '1. Informações da empresa', body: 'Vantaa, Finlândia. admin@saanatuatanto.com' },
      { title: '2. Definições', body: '“Você”, “Utilizador”, “Empresa”, “Nós”, “Site”, “Serviços”' },
      { title: '3. Uso do site', body: 'Concorda em usar o site apenas para fins legais.' },
      { title: '4. Cookies', body: 'Utilizamos cookies de acordo com a nossa política de privacidade.' },
      { title: '5. Propriedade Intelectual', body: 'A Saana Tuotanto Oy detém todos os direitos sobre o conteúdo deste site.' },
      { title: '6. Conteúdo do utilizador', body: 'Reservamos o direito de remover conteúdo inadequado.' },
      { title: '7. Links para o nosso site', body: 'Certas organizações podem ligar-se a nós sem aprovação prévia.' },
      { title: '8. iFrames', body: 'Não pode criar molduras em redor do nosso site sem permissão.' },
      { title: '9. Responsabilidade pelo conteúdo', body: 'Não somos responsáveis pelo conteúdo de sites externos.' },
      { title: '10. Privacidade', body: 'O seu uso também é regido pela nossa política de privacidade.' },
      { title: '11. Reserva de direitos', body: 'Podemos solicitar a remoção de links a qualquer momento.' },
      { title: '12. Precisão', body: 'Esforçamo-nos pela precisão, mas não garantimos a integridade.' },
      { title: '13. Limitação de responsabilidade', body: 'Não somos responsáveis por danos indiretos sob a lei.' },
      { title: '14. Lei aplicável', body: 'Estes termos regem-se pela lei da Finlândia.' }
    ]
  },
  el: {
    label: 'Νομικά',
    title: 'Όροι και Προϋποθέσεις',
    lastUpdated: 'Τελευταία ενημέρωση: 25-04-2026',
    welcome: 'Καλώς ήρθατε στο https://saanatuotanto.com/',
    intro: 'Αυτοί οι όροι περιγράφουν τους κανόνες για τη χρήση του ιστότοπου της Saana Tuotanto Oy.',
    consent: 'Με την πρόσβαση σε αυτόν τον ιστότοπο, συμφωνείτε με αυτούς τους όρους. Εάν διαφωνείτε, μην χρησιμοποιείτε τον ιστότοπο.',
    sections: [
      { title: '1. Πληροφορίες Εταιρείας', body: 'Vantaa, Φινλανδία. admin@saanatuatanto.com' },
      { title: '2. Ορισμοί', body: '«Εσείς», «Χρήστης», «Εταιρεία», «Εμείς», «Ιστότοπος», «Υπηρεσίες»' },
      { title: '3. Χρήση του Ιστότοπου', body: 'Συμφωνείτε να χρησιμοποιείτε τον ιστότοπο μόνο για νόμιμους σκοπούς.' },
      { title: '4. Cookies', body: 'Χρησιμοποιούμε cookies σύμφωνα με την Πολιτική Απορρήτου μας.' },
      { title: '5. Πνευματική Ιδιοκτησία', body: 'Η Saana Tuotanto Oy κατέχει όλα τα δικαιώματα για το περιεχόμενο αυτού του ιστότοπου.' },
      { title: '6. Περιεχόμενο Χρήστη', body: 'Διατηρούμε το δικαίωμα να αφαιρούμε ακατάλληλο περιεχόμενο.' },
      { title: '7. Σύνδεσμοι προς τον Ιστότοπό μας', body: 'Ορισμένοι οργανισμοί μπορούν να συνδέονται μαζί μας χωρίς έγκριση.' },
      { title: '8. iFrames', body: 'Δεν επιτρέπεται η δημιουργία πλαισίων γύρω από τον ιστότοπό μας χωρίς άδεια.' },
      { title: '9. Ευθύνη Περιεχομένου', body: 'Δεν φέρουμε ευθύνη για περιεχόμενο σε εξωτερικούς ιστότοπους.' },
      { title: '10. Απόρρητο', body: 'Η χρήση διέπεται επίσης από την Πολιτική Απορρήτου μας.' },
      { title: '11. Επιφύλαξη Δικαιωμάτων', body: 'Μπορούμε να ζητήσουμε την αφαίρεση συνδέσμων ανά πάσα στιγμή.' },
      { title: '12. Ακρίβεια', body: 'Επιδιώκουμε την ακρίβεια αλλά δεν εγγυόμαστε την πληρότητα.' },
      { title: '13. Περιορισμός Ευθύνης', body: 'Δεν ευθυνόμαστε για έμμεσες ζημιές σύμφωνα με το νόμο.' },
      { title: '14. Εφαρμοστέο Δίκαιο', body: 'Αυτοί οι όροι διέπονται από το δίκαιο της Φινλανδίας.' }
    ]
  },
  tr: {
    label: 'Yasal',
    title: 'Şartlar και Koşullar',
    lastUpdated: 'Son güncelleme: 25-04-2026',
    welcome: 'https://saanatuotanto.com/ adresine hoş geldiniz',
    intro: 'Bu şartlar ve koşullar, Saana Tuotanto Oy tarafından işletilen web sitesinin kullanım kurallarını belirler.',
    consent: 'Bu web sitesine erişerek bu şartları kabul etmiş olursunuz. Kabul etmiyorsanız lütfen sitemizi kullanmayın.',
    sections: [
      { title: '1. Şirket Bilgileri', body: 'Vantaa, Finlandiya. admin@saanatuatanto.com' },
      { title: '2. Tanımlar', body: '“Siz”, “Kullanıcı”, “Şirket”, “Biz”, “Web Sitesi”, “Hizmetler”' },
      { title: '3. Web Sitesinin Kullanımı', body: 'Web sitesini yalnızca yasal amaçlarla kullanmayı kabul edersiniz.' },
      { title: '4. Çerezler', body: 'Çerezleri Gizlilik Politikamıza uygun olarak kullanıyoruz.' },
      { title: '5. Fikri Mülkiyet Hakları', body: 'Bu sitedeki içeriğin tüm hakları Saana Tuotanto Oy\'a aittir.' },
      { title: '6. Kullanıcı İçeriği', body: 'Uygunsuz içerikleri izleme ve kaldırma hakkımızı saklı tutarız.' },
      { title: '7. Sitemize Bağlantı Verme', body: 'Belirli kuruluşlar önceden onay almadan sitemize bağlantı verebilir.' },
      { title: '8. iFrame\'ler', body: 'Yazılı izin olmadan web sitemizin etrafında çerçeveler oluşturamazsınız.' },
      { title: '9. İçerik Sorumluluğu', body: 'Dış bağlantılardaki içeriklerden sorumlu değiliz.' },
      { title: '10. Gizlilik', Turkey: 'Kullanımınız ayrıca Gizlilik Politikamıza tabidir.' },
      { title: '11. Hakların Saklı Tutulması', body: 'Bağlantıların kaldırılmasını talep etme hakkımızı saklı tutarız.' },
      { title: '12. Bilgi Doğruluğu', body: 'Doğruluk için çalışıyoruz ancak tamlığı garanti etmiyoruz.' },
      { title: '13. Sorumluluk Sınırlandırması', body: 'Yasalara göre dolaylı zararlardan sorumlu değiliz.' },
      { title: '14. Uygulanacak Hukuk', body: 'Bu şartlar Finlandiya yasalarına tabidir.' }
    ]
  },
  jp: {
    label: '法務',
    title: '利用規約',
    lastUpdated: '最終更新日: 2026年4月25日',
    welcome: 'https://saanatuotanto.com/ へようこそ',
    intro: '本利用規約は、Saana Tuotanto Oyが運営するウェブサイトの利用に関する規則を定めたものです。',
    consent: '本サイトを利用することで、これらの規約に同意したものとみなされます。同意いただけない場合は利用をお控えください。',
    sections: [
      { title: '1. 会社情報', body: 'フィンランド、ヴァンター。admin@saanatuatanto.com' },
      { title: '2. 定義', body: '「お客様」、「ユーザー」、「当社」、「ウェブサイト」、「サービス」' },
      { title: '3. 本サイトの利用', body: '合法的な目的のみに使用し、他者の権利を侵害しないことに同意するものとします。' },
      { title: '4. クッキー', body: 'プライバシーポリシーに従い、ユーザー体験向上のためにクッキーを使用します。' },
      { title: '5. 知的財産権', body: '本サイトの全コンテンツの知的財産権はSaana Tuotanto Oyに帰属します。' },
      { title: '6. ユーザー投稿コンテンツ', body: '不適切なコンテンツを監視し、削除する権利を留保します。' },
      { title: '7. リンクについて', body: '特定の組織は、事前の承認なしに本サイトへリンクすることができます。' },
      { title: '8. アイフレーム', body: '事前の許可なく本サイトをフレームで囲むことは禁止されています。' },
      { title: '9. コンテンツ責任', body: '外部サイトに表示されるコンテンツについて、当社は責任を負いません。' },
      { title: '10. プライバシー', body: '本サイトの利用には当社のプライバシーポリシーも適用されます。' },
      { title: '11. 権利の留保', body: 'いつでもリンクの削除を要求する権利を留保します。' },
      { title: '12. 情報の正確性', body: '正確性を期していますが、完全性や正確性を保証するものではありません。' },
      { title: '13. 免責事項', body: '法律で認められる範囲において、間接的損害について責任を負いません。' },
      { title: '14. 準拠法', body: '本規約はフィンランド法に準拠します。' }
    ]
  },
  ar: {
    label: 'قانوني',
    title: 'الشروط والأحكام',
    lastUpdated: 'آخر تحديث: 25-04-2026',
    welcome: 'مرحباً بكم في https://saanatuotanto.com/',
    intro: 'تحدد هذه الشروط والأحكام القواعد واللوائح الخاصة باستخدام الموقع الإلكتروني الذي تديره شركة Saana Tuotanto Oy.',
    consent: 'من خلال الوصول إلى هذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق، يرجى عدم استخدام موقعنا.',
    sections: [
      { title: '1. معلومات الشركة', body: 'فانتا، فنلندا. admin@saanatuatanto.com' },
      { title: '2. التعريفات', body: '“أنت”، “المستخدم”، “الشركة”، “نحن”، “الموقع”، “الخدمات”' },
      { title: '3. استخدام الموقع', body: 'أنت توافق على استخدام موقعنا للأغراض المشروعة فقط.' },
      { title: '4. ملفات تعريف الارتباط', body: 'نحن نستخدم ملفات تعريف الارتباط وفقاً لسياسة الخصوصية الخاصة بنا.' },
      { title: '5. حقوق الملكية الفكرية', body: 'تمتلك شركة Saana Tuotanto Oy جميع حقوق الملكية الفكرية للمحتوى الموجود على هذا الموقع.' },
      { title: '6. المحتوى الذي ينشئه المستخدم', body: 'نحتفظ بالحق في مراقبة وإزالة أي محتوى غير لائق.' },
      { title: '7. الروابط المؤدية إلى موقعنا', body: 'يمكن لبعض المنظمات الارتباط بموقعنا دون موافقة مسبقة.' },
      { title: '8. إطارات iFrames', body: 'لا يجوز لك إنشاء إطارات حول موقعنا دون إذن خطي مسبق.' },
      { title: '9. المسؤولية عن المحتوى', body: 'نحن لسنا مسؤولين عن المحتوى الذي يظهر على المواقع الخارجية.' },
      { title: '10. الخصوصية', body: 'يخضع استخدامك للموقع أيضاً لسياسة الخصوصية الخاصة بنا.' },
      { title: '11. الاحتفاظ بالحقوق', body: 'نحتفظ بالحق في طلب إزالة أي روابط في أي وقت.' },
      { title: '12. دقة المعلومات', body: 'نحن نسعى لضمان الدقة ولكننا لا نضمن الكمال أو الصحة.' },
      { title: '13. تحديد المسؤولية', body: 'نحن لسنا مسؤولين عن الأضرار غير المباشرة حسب ما يسمح به القانون.' },
      { title: '14. القانون الواجب التطبيق', body: 'تخضع هذه الشروط لقوانين فنلندا.' }
    ]
  }
};

export default function TermsPage() {
  const { language } = useLanguage();
  const t = content[language] || content.en;
  const isArabic = language === 'ar';

  return (
    <main style={{ 
      paddingTop: '100px', 
      paddingBottom: '80px', 
      background: '#FAFAF8', 
      minHeight: '100vh',
      direction: isArabic ? 'rtl' : 'ltr',
      textAlign: isArabic ? 'right' : 'left'
    }}>
      <div className="container" style={{ maxWidth: '800px', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={styles.header}>
            <div style={styles.label}>{t.label}</div>
            <h1 style={styles.title}>{t.title}</h1>
            <p style={styles.meta}>{t.lastUpdated}</p>
          </div>

          <div style={styles.content}>
            <p>
              <strong>{t.welcome}</strong>
            </p>
            <p>{t.intro}</p>
            <p>{t.consent}</p>

            {t.sections.map((section, index) => (
              <div key={index}>
                <h2 style={styles.heading}>{section.title}</h2>
                <div style={styles.sectionBody}>
                  {section.body}
                </div>
              </div>
            ))}

            <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #eae7e1' }}>
              <p>
                Email: <a href="mailto:admin@saanatuatanto.com" style={styles.link}>admin@saanatuatanto.com</a><br />
                Website: <a href="https://saanatuotanto.com/" target="_blank" rel="noreferrer" style={styles.link}>https://saanatuotanto.com/</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

const styles = {
  header: {
    borderBottom: '1px solid #eae7e1',
    paddingBottom: '32px',
    marginBottom: '40px',
  },
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#7BAA8D',
    marginBottom: '12px',
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    color: '#0F2F24',
    fontWeight: 400,
    marginBottom: '16px',
    lineHeight: 1.1,
  },
  meta: {
    fontSize: '14px',
    color: '#9a9a9a',
  },
  content: {
    fontSize: '16px',
    color: '#4a4a4a',
    lineHeight: 1.8,
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.8rem',
    color: '#0F2F24',
    fontWeight: 400,
    marginTop: '48px',
    marginBottom: '16px',
  },
  sectionBody: {
    marginBottom: '24px',
  },
  link: {
    color: '#7BAA8D',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },
};
