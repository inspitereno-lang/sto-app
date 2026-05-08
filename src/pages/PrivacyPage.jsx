import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const content = {
  en: {
    label: 'Legal',
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: 25-04-2026',
    intro: 'Saana Tuotanto Oy (“Company”, “We”, “Us”, or “Our”) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
    sections: [
      { title: '1. Information We Collect', body: 'We collect personal information that you voluntarily provide to us when you register, express interest in our services, or contact us.' },
      { title: '2. How We Use Your Information', body: 'We process your information for legitimate business interests, contract performance, and legal compliance.' },
      { title: '3. Data Controller', body: 'The data controller is Saana Tuotanto Oy, Vantaa, Finland.' },
      { title: '4. Definitions', body: 'Key terms: Account, Company, Cookies, Country, Device, Personal Data, Service Provider, Usage Data, Website, You.' },
      { title: '5. Types of Data Collected', body: 'We collect Personal Data (Name, Email, Phone, Address) and Usage Data (IP address, Browser type, Pages visited).' },
      { title: '6. Tracking Technologies', body: 'We use Cookies (Essential, Functional, Analytics) to improve functionality and analyze usage.' },
      { title: '7. Legal Basis (GDPR)', body: 'Processing is based on consent, contract performance, legal obligations, and legitimate interests.' },
      { title: '8. Sharing of Data', body: 'We may share data with service providers, during business transfers, or as required by law. We do NOT sell your data.' },
      { title: '9. Data Retention', body: 'We retain data only as long as necessary for business, legal, or dispute resolution purposes.' },
      { title: '10. Your Rights (GDPR)', body: 'You have rights to access, correct, delete, restrict, or object to processing, and data portability.' },
      { title: '11. Children’s Privacy', body: 'Our services are not intended for individuals under 13 years of age.' }
    ]
  },
  fi: {
    label: 'Lakiasiat',
    title: 'Tietosuojaseloste',
    lastUpdated: 'Viimeksi päivitetty: 25.04.2026',
    intro: 'Saana Tuotanto Oy (”Yritys”, ”Me”) kunnioittaa yksityisyyttäsi ja on sitoutunut suojaamaan henkilötietojasi. Tämä tietosuojaseloste selittää, kuinka keräämme, käytämme ja suojaamme tietojasi.',
    sections: [
      { title: '1. Keräämämme tiedot', body: 'Keräämme henkilötietoja, jotka annat vapaaehtoisesti rekisteröitymisen yhteydessä tai ottaessasi meihin yhteyttä.' },
      { title: '2. Tietojen käyttö', body: 'Käsittelemme tietojasi liiketoiminnallisiin tarkoituksiin, sopimusten täyttämiseksi ja lakisääteisten velvoitteiden noudattamiseksi.' },
      { title: '3. Rekisterinpitäjä', body: 'Rekisterinpitäjä on Saana Tuotanto Oy, Vantaa, Suomi.' },
      { title: '4. Määritelmät', body: 'Keskeiset termit: Tili, Yritys, Evästeet, Maa, Laite, Henkilötiedot, Palveluntarjoaja, Käyttötiedot, Verkkosivusto, Sinä.' },
      { title: '5. Kerätyt tietotyypit', body: 'Keräämme henkilötietoja (Nimi, Sähköposti, Puhelin) ja käyttötietoja (IP-osoite, Selaintyyppi).' },
      { title: '6. Seurantateknologiat', body: 'Käytämme evästeitä parantaaksemme toimivuutta ja analysoidaksemme käyttöä.' },
      { title: '7. Oikeusperusta (GDPR)', body: 'Käsittely perustuu suostumukseen, sopimukseen, lakiin tai oikeutettuun etuun.' },
      { title: '8. Tietojen jakaminen', body: 'Voimme jakaa tietoja palveluntarjoajille tai lain vaatimuksesta. Emme MYY tietojasi.' },
      { title: '9. Tietojen säilytys', body: 'Säilytämme tietoja vain niin kauan kuin se on tarpeellista tarkoituksen toteuttamiseksi.' },
      { title: '10. Oikeutesi (GDPR)', body: 'Sinulla on oikeus tarkastaa, korjata, poistaa tai vastustaa tietojesi käsittelyä.' },
      { title: '11. Lasten tietosuoja', body: 'Palvelumme eivät ole tarkoitettu alle 13-vuotiaille.' }
    ]
  },
  sv: {
    label: 'Juridik',
    title: 'Integritetspolicy',
    lastUpdated: 'Senast uppdaterad: 25-04-2026',
    intro: 'Saana Tuotanto Oy (”Företaget”, ”Vi”) respekterar din integritet och är fast besluten att skydda dina personuppgifter. Denna policy förklarar hur we samlar in och använder din information.',
    sections: [
      { title: '1. Information vi samlar in', body: 'Vi samlar in personuppgifter som du frivilligt tillhandahåller vid registrering eller kontakt.' },
      { title: '2. Hur vi använder din information', body: 'Vi behandlar din information för affärsintressen, avtal och juridiska förpliktelser.' },
      { title: '3. Personuppgiftsansvarig', body: 'Ansvarig är Saana Tuotanto Oy, Vanda, Finland.' },
      { title: '4. Definitioner', body: 'Nyckeltermer: Konto, Företag, Cookies, Land, Enhet, Personuppgifter, Webbplats, Du.' },
      { title: '5. Typer av data som samlas in', body: 'Vi samlar in personuppgifter (Namn, E-post) och användningsdata (IP-adress, Webbläsare).' },
      { title: '6. Spårningsteknik', body: 'Vi använder cookies för att förbättra funktionalitet och analysera användning.' },
      { title: '7. Laglig grund (GDPR)', body: 'Behandlingen baseras på samtycke, avtal, lagliga skyldigheter och berättigat intresse.' },
      { title: '8. Delning av data', body: 'Vi kan dela data med tjänsteleverantörer eller enligt lag. Vi säljer INTE dina uppgifter.' },
      { title: '9. Datalagring', body: 'Vi lagrar data endast så länge det är nödvändigt för våra ändamål.' },
      { title: '10. Dina rättigheter (GDPR)', body: 'Du har rätt att få tillgång till, korrigera, radera eller invända mot behandling.' },
      { title: '11. Barns integritet', body: 'Våra tjänster är inte avsedda för personer under 13 år.' }
    ]
  },
  no: {
    label: 'Juridisk',
    title: 'Personvernerklæring',
    lastUpdated: 'Sist oppdatert: 25.04.2026',
    intro: 'Saana Tuotanto Oy («Selskapet», «Vi») respekterer ditt personvern og er forpliktet til å beskytte dine personopplysninger.',
    sections: [
      { title: '1. Informasjon vi samler inn', body: 'Vi samler inn personopplysninger som du frivillig gir oss ved registrering eller kontakt.' },
      { title: '2. Hvordan vi bruker informasjonen', body: 'Vi behandler opplysninger for forretningsinteresser, avtaler og lovpålagte oppgaver.' },
      { title: '3. Behandlingsansvarlig', body: 'Behandlingsansvarlig er Saana Tuotanto Oy, Vantaa, Finland.' },
      { title: '4. Definisjoner', body: 'Nøkkelbegreper: Konto, Selskap, Informasjonskapsler, Land, Enhet, Personopplysninger, Nettsted, Deg.' },
      { title: '5. Typer data som samles inn', body: 'Vi samler inn personopplysninger (Navn, E-post) og bruksdata (IP-adresse, Nettleser).' },
      { title: '6. Sporingsteknologi', body: 'Vi bruker informasjonskapsler for funksjonalitet og analyse.' },
      { title: '7. Rettslig grunnlag (GDPR)', body: 'Behandlingen er basert på samtykke, avtale, lovpålagte plikter og legitime interesser.' },
      { title: '8. Deling av data', body: 'Vi kan dele data med tjenesteleverandører eller ved lovkrav. Vi selger IKKE dine data.' },
      { title: '9. Oppbevaring av data', body: 'Vi oppbevarer data kun så lenge det er nødvendig for formålet.' },
      { title: '10. Dine rettigheter (GDPR)', body: 'Du har rett til innsyn, korrigering, sletting eller innsigelse mot behandling.' },
      { title: '11. Barns personvern', body: 'Våre tjenester er ikke rettet mot barn under 13 år.' }
    ]
  },
  da: {
    label: 'Juridisk',
    title: 'Privatlivspolitik',
    lastUpdated: 'Sidst opdateret: 25.04.2026',
    intro: 'Saana Tuotanto Oy (»Virksomheden«, »Vi«) respekterer dit privatliv og er forpligtet til at beskytte dine personoplysninger.',
    sections: [
      { title: '1. Information vi indsamler', body: 'Vi indsamler personoplysninger, som du frivilligt giver os ved tilmelding eller kontakt.' },
      { title: '2. Hvordan vi bruger oplysningerne', body: 'Vi behandler oplysninger til forretningsinteresser, kontrakter og lovmæssige krav.' },
      { title: '3. Dataansvarlig', body: 'Den dataansvarlige er Saana Tuotanto Oy, Vantaa, Finland.' },
      { title: '4. Definitioner', body: 'Nøglebegreber: Konto, Virksomhed, Cookies, Land, Enhed, Personoplysninger, Websted, Dig.' },
      { title: '5. Typer af data indsamlet', body: 'Vi indsamler personoplysninger (Navn, E-mail) og brugsdata (IP-adresse, Browser).' },
      { title: '6. Sporingsteknologier', body: 'Vi bruger cookies til funktionalitet og analyse.' },
      { title: '7. Retsgrundlag (GDPR)', body: 'Behandling er baseret på samtykke, kontrakt, lovkrav og legitime interesser.' },
      { title: '8. Deling av data', body: 'Vi kan dele data med tjenesteudbydere eller ved lovkrav. Vi sælger IKKE dine data.' },
      { title: '9. Opbevaring af data', body: 'Vi opbevarer kun data så længe det er nødvendigt til formålet.' },
      { title: '10. Dine rettigheder (GDPR)', body: 'Du har ret til indsigt, rettelse, sletning eller indsigelse.' },
      { title: '11. Børns privatliv', body: 'Vores tjenester er ikke beregnet til børn under 13 år.' }
    ]
  },
  et: {
    label: 'Juriidiline teave',
    title: 'Privaatsuspoliitika',
    lastUpdated: 'Viimati uuendatud: 25.04.2026',
    intro: 'Saana Tuotanto Oy („Ettevõte“, „Meie“) austab teie privaatsust ja on pühendunud teie isikuandmete kaitsmisele. See poliitika selgitab meie andmetöötlust.',
    sections: [
      { title: '1. Kogutavad andmed', body: 'Kogume isikuandmeid, mida edastate vabatahtlikult registreerumisel või meiega ühendust võttes.' },
      { title: '2. Kuidas me andmeid kasutame', body: 'Töötleme andmeid ärilistel eesmärkidel, lepingute täitmiseks ja seadusjärgseteks kohustusteks.' },
      { title: '3. Vastutav töötleja', body: 'Vastutav töötleja on Saana Tuotanto Oy, Vantaa, Soome.' },
      { title: '4. Mõisted', body: 'Põhimõisted: Konto, Ettevõte, Küpsised, Riik, Seade, Isikuandmed, Veebileht, Teie.' },
      { title: '5. Kogutavate andmete tüübid', body: 'Kogume isikuandmeid (Nimi, E-post) ja kasutatavuse andmeid (IP-aadress, Brauser).' },
      { title: '6. Jälgimistehnoloogiad', body: 'Kasutame küpsiseid funktsionaalsuse parandamiseks ja analüüsiks.' },
      { title: '7. Õiguslik alus (IKÜM)', body: 'Töötlemine põhineb nõusolekul, lepingul, seadusel või õigustatud huvil.' },
      { title: '8. Andmete jagamine', body: 'Jagame andmeid teenusepakkujatega või seaduse nõudel. Me EI müü teie andmeid.' },
      { title: '9. Andmete säilitamine', body: 'Säilitame andmeid ainult nii kaua, kui see on eesmärkide saavutamiseks vajalik.' },
      { title: '10. Teie õigused (IKÜM)', body: 'Teil on õigus andmetega tutvuda, neid parandada, kustutada või vastuseisu avaldada.' },
      { title: '11. Laste privaatsus', body: 'Meie teenused ei ole mõeldud alla 13-aastastele isikutele.' }
    ]
  },
  de: {
    label: 'Rechtliches',
    title: 'Datenschutzerklärung',
    lastUpdated: 'Zuletzt aktualisiert: 25.04.2026',
    intro: 'Saana Tuotanto Oy („Unternehmen“, „Wir“) respektiert Ihre Privatsphäre und setzt sich für den Schutz Ihrer personenbezogenen Daten ein.',
    sections: [
      { title: '1. Informationen, die wir sammeln', body: 'Wir sammeln Daten, die Sie uns freiwillig bei der Registrierung oder Kontaktaufnahme zur Verfügung stellen.' },
      { title: '2. Verwendung Ihrer Informationen', body: 'Wir verarbeiten Daten für Geschäftszwecke, Vertragserfüllung und rechtliche Verpflichtungen.' },
      { title: '3. Verantwortlicher', body: 'Verantwortlich ist Saana Tuotanto Oy, Vantaa, Finnland.' },
      { title: '4. Definitionen', body: 'Wichtige Begriffe: Konto, Unternehmen, Cookies, Land, Gerät, Personenbezogene Daten, Website, Sie.' },
      { title: '5. Arten der gesammelten Daten', body: 'Wir sammeln personenbezogene Daten (Name, E-Mail) und Nutzungsdaten (IP-Adresse, Browser).' },
      { title: '6. Tracking-Technologien', body: 'Wir verwenden Cookies zur Verbesserung der Funktionalität und Nutzungsanalyse.' },
      { title: '7. Rechtsgrundlage (DSGVO)', body: 'Die Verarbeitung basiert auf Einwilligung, Vertrag, Gesetz oder berechtigtem Interesse.' },
      { title: '8. Weitergabe von Daten', body: 'Wir teilen Daten mit Dienstleistern oder bei gesetzlicher Verpflichtung. Wir verkaufen Ihre Daten NICHT.' },
      { title: '9. Datenspeicherung', body: 'Wir speichern Daten nur so lange, wie es für die Zwecke erforderlich ist.' },
      { title: '10. Ihre Rechte (DSGVO)', body: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung oder Widerspruch.' },
      { title: '11. Datenschutz für Kinder', body: 'Unsere Dienste sind nicht für Personen unter 13 Jahren bestimmt.' }
    ]
  },
  nl: {
    label: 'Juridisch',
    title: 'Privacybeleid',
    lastUpdated: 'Laatst bijgewerkt: 25-04-2026',
    intro: 'Saana Tuotanto Oy (“Bedrijf”, “Wij”) respecteert uw privacy en zet zich in om uw persoonsgegevens te beschermen.',
    sections: [
      { title: '1. Informatie die we verzamelen', body: 'Wij verzamelen gegevens die u vrijwillig verstrekt bij registratie of contact.' },
      { title: '2. Hoe we uw informatie gebruiken', body: 'Wij verwerken gegevens voor bedrijfsbelangen, contracten en wettelijke verplichtingen.' },
      { title: '3. Verwerkingsverantwoordelijke', body: 'De verantwoordelijke is Saana Tuotanto Oy, Vantaa, Finland.' },
      { title: '4. Definities', body: 'Kernbegrippen: Account, Bedrijf, Cookies, Land, Apparaat, Persoonsgegevens, Website, U.' },
      { title: '5. Soorten verzamelde gegevens', body: 'Wij verzamelen persoonsgegevens (Naam, E-mail) en gebruiksgegevens (IP-adres, Browser).' },
      { title: '6. Trackingtechnologieën', body: 'Wij gebruiken cookies voor functionaliteit en analyse.' },
      { title: '7. Rechtsgrondslag (AVG)', body: 'Verwerking is gebaseerd op toestemming, contract, wet of legitiem belang.' },
      { title: '8. Delen van gegevens', body: 'Wij kunnen gegevens delen met dienstverleners of bij wet. Wij verkopen uw gegevens NIET.' },
      { title: '9. Gegevensbewaring', body: 'Wij bewaren gegevens niet langer dan nodig voor het doel.' },
      { title: '10. Uw rechten (AVG)', body: 'U heeft recht op inzage, correctie, verwijdering of bezwaar.' },
      { title: '11. Privacy van kinderen', body: 'Onze diensten zijn niet bedoeld voor kinderen onder de 13 jaar.' }
    ]
  },
  fr: {
    label: 'Juridique',
    title: 'Politique de confidentialité',
    lastUpdated: 'Dernière mise à jour : 25-04-2026',
    intro: 'Saana Tuotanto Oy (« Société », « Nous ») respecte votre vie privée et s\'engage à protéger vos données personnelles.',
    sections: [
      { title: '1. Informations collectées', body: 'Nous collectons les données que vous nous fournissez volontairement lors de l\'inscription ou du contact.' },
      { title: '2. Utilisation de vos informations', body: 'Nous traitons les données pour nos intérêts commerciaux, l\'exécution de contrats et les obligations légales.' },
      { title: '3. Responsable du traitement', body: 'Le responsable est Saana Tuotanto Oy, Vantaa, Finlande.' },
      { title: '4. Définitions', body: 'Termes clés : Compte, Société, Cookies, Pays, Appareil, Données personnelles, Site web, Vous.' },
      { title: '5. Types de données collectées', body: 'Nous collectons des données personnelles (Nom, E-mail) et des données d\'utilisation (IP, Navigateur).' },
      { title: '6. Technologies de suivi', body: 'Nous utilisons des cookies pour la fonctionnalité et l\'analyse.' },
      { title: '7. Base juridique (RGPD)', body: 'Le traitement est basé sur le consentement, le contrat, la loi ou l\'intérêt légitime.' },
      { title: '8. Partage de données', body: 'Nous pouvons partager des données avec des prestataires ou par la loi. Nous ne vendons PAS vos données.' },
      { title: '9. Rétention des données', body: 'Nous conservons les données uniquement le temps nécessaire aux fins prévues.' },
      { title: '10. Vos droits (RGPD)', body: 'Vous avez un droit d\'accès, de rectification, de suppression ou d\'opposition.' },
      { title: '11. Vie privée des enfants', body: 'Nos services ne sont pas destinés aux enfants de moins de 13 ans.' }
    ]
  },
  pl: {
    label: 'Prawne',
    title: 'Polityka prywatności',
    lastUpdated: 'Ostatnia aktualizacja: 25.04.2026',
    intro: 'Saana Tuotanto Oy („Firma”, „My”) szanuje Twoją prywatność i zobowiązuje się do ochrony Twoich danych osobowych.',
    sections: [
      { title: '1. Informacje, które zbieramy', body: 'Zbieramy dane, które dobrowolnie nam przekazujesz podczas rejestracji lub kontaktu.' },
      { title: '2. Jak wykorzystujemy Twoje dane', body: 'Przetwarzamy dane w celach biznesowych, realizacji umów i obowiązków prawnych.' },
      { title: '3. Administrator danych', body: 'Administratorem danych jest Saana Tuotanto Oy, Vantaa, Finlandia.' },
      { title: '4. Definicje', body: 'Kluczowe terminy: Konto, Firma, Ciasteczka, Kraj, Urządzenie, Dane osobowe, Witryna, Ty.' },
      { title: '5. Typy zbieranych danych', body: 'Zbieramy dane osobowe (Imię, E-mail) i dane o użytkowaniu (adres IP, Przeglądarka).' },
      { title: '6. Technologie śledzenia', body: 'Używamy ciasteczek w celu zapewnienia funkcjonalności i analizy.' },
      { title: '7. Podstawa prawna (RODO)', body: 'Przetwarzanie opiera się na zgodzie, umowie, prawie lub prawnie uzasadnionym interesie.' },
      { title: '8. Udostępnianie danych', body: 'Możemy udostępniać dane dostawcom usług lub na mocy prawa. NIE sprzedajemy Twoich danych.' },
      { title: '9. Przechowywanie danych', body: 'Przechowujemy dane tylko tak długo, jak jest to konieczne.' },
      { title: '10. Twoje prawa (RODO)', body: 'Masz prawo do dostępu, poprawiania, usuwania lub wniesienia sprzeciwu.' },
      { title: '11. Prywatność dzieci', body: 'Nasze usługi nie są przeznaczone dla dzieci poniżej 13 roku życia.' }
    ]
  },
  es: {
    label: 'Legal',
    title: 'Política de privacidad',
    lastUpdated: 'Última actualización: 25-04-2026',
    intro: 'Saana Tuotanto Oy (“Compañía”, “Nosotros”) respeta su privacidad y se compromete a proteger sus datos personales.',
    sections: [
      { title: '1. Información que recopilamos', body: 'Recopilamos datos que nos proporciona voluntariamente al registrarse o contactarnos.' },
      { title: '2. Cómo usamos su información', body: 'Procesamos datos para intereses comerciales, contratos y obligaciones legales.' },
      { title: '3. Controlador de datos', body: 'El responsable es Saana Tuotanto Oy, Vantaa, Finlandia.' },
      { title: '4. Definiciones', body: 'Términos clave: Cuenta, Compañía, Cookies, País, Dispositivo, Datos personales, Sitio web, Usted.' },
      { title: '5. Tipos de datos recopilados', body: 'Recopilamos datos personales (Nombre, Email) y datos de uso (IP, Navegador).' },
      { title: '6. Tecnologías de seguimiento', body: 'Usamos cookies para funcionalidad y análisis.' },
      { title: '7. Base legal (RGPD)', body: 'El tratamiento se basa en el consentimiento, contrato, ley o interés legítimo.' },
      { title: '8. Compartir datos', body: 'Podemos compartir datos con proveedores o por ley. NO vendemos sus datos.' },
      { title: '9. Retención de datos', body: 'Conservamos los datos solo el tiempo necesario para el propósito.' },
      { title: '10. Sus derechos (RGPD)', body: 'Tiene derecho a acceder, corregir, eliminar u oponerse al tratamiento.' },
      { title: '11. Privacidad infantil', body: 'Nuestros servicios no están destinados a menores de 13 años.' }
    ]
  },
  it: {
    label: 'Legale',
    title: 'Informativa sulla privacy',
    lastUpdated: 'Ultimo aggiornamento: 25-04-2026',
    intro: 'Saana Tuotanto Oy (“Società”, “Noi”) rispetta la tua privacy e si impegna a proteggere i tuoi dati personali.',
    sections: [
      { title: '1. Informazioni raccolte', body: 'Raccogliamo i dati forniti volontariamente al momento della registrazione o del contatto.' },
      { title: '2. Utilizzo delle informazioni', body: 'Trattiamo i dati per interessi commerciali, contratti e obblighi legali.' },
      { title: '3. Titolare del trattamento', body: 'Il titolare è Saana Tuotanto Oy, Vantaa, Finlandia.' },
      { title: '4. Definizioni', body: 'Termini chiave: Account, Società, Cookie, Paese, Dispositivo, Dati personali, Sito web, Tu.' },
      { title: '5. Tipi di dati raccolti', body: 'Raccogliamo dati personali (Nome, Email) e dati di utilizzo (IP, Browser).' },
      { title: '6. Tecnologie di tracciamento', body: 'Utilizziamo i cookie per funzionalità e analisi.' },
      { title: '7. Base giuridica (GDPR)', body: 'Il trattamento si basa su consenso, contratto, legge o legittimo interesse.' },
      { title: '8. Condivisione dei dati', body: 'Possiamo condividere i dati con fornitori o per legge. NON vendiamo i tuoi dati.' },
      { title: '9. Conservazione dei dati', body: 'Conserviamo i dati solo per il tempo necessario agli scopi previsti.' },
      { title: '10. I tuoi diritti (GDPR)', body: 'Hai il diritto di accedere, correggere, cancellare o opporsi al trattamento.' },
      { title: '11. Privacy dei minori', body: 'I nostri servizi non sono rivolti ai minori di 13 anni.' }
    ]
  },
  pt: {
    label: 'Legal',
    title: 'Política de Privacidade',
    lastUpdated: 'Última atualização: 25-04-2026',
    intro: 'A Saana Tuotanto Oy (“Empresa”, “Nós”) respeita a sua privacidade e está empenhada em proteger os seus dados pessoais.',
    sections: [
      { title: '1. Informações que recolhemos', body: 'Recolhemos dados que nos fornece voluntariamente ao registar-se ou contactar-nos.' },
      { title: '2. Como usamos a sua informação', body: 'Processamos dados para interesses comerciais, contratos e obrigações legais.' },
      { title: '3. Controlador de dados', body: 'O responsável é a Saana Tuotanto Oy, Vantaa, Finlândia.' },
      { title: '4. Definições', body: 'Termos chave: Conta, Empresa, Cookies, País, Dispositivo, Dados Pessoais, Site, Você.' },
      { title: '5. Tipos de dados recolhidos', body: 'Recolhemos dados pessoais (Nome, Email) e dados de uso (IP, Navegador).' },
      { title: '6. Tecnologias de rastreio', body: 'Utilizamos cookies para funcionalidade e análise.' },
      { title: '7. Base legal (RGPD)', body: 'O tratamento baseia-se no consentimento, contrato, lei ou interesse legítimo.' },
      { title: '8. Partilha de dados', body: 'Podemos partilhar dados com fornecedores ou por lei. NÃO vendemos os seus dados.' },
      { title: '9. Retenção de dados', body: 'Conservamos os dados apenas pelo tempo necessário para o efeito.' },
      { title: '10. Os seus direitos (RGPD)', body: 'Tem o direito de aceder, corrigir, apagar ou opor-se ao tratamento.' },
      { title: '11. Privacidade infantil', body: 'Os nossos serviços não se destinam a menores de 13 anos.' }
    ]
  },
  el: {
    label: 'Νομικά',
    title: 'Πολιτική Απορρήτου',
    lastUpdated: 'Τελευταία ενημέρωση: 25-04-2026',
    intro: 'Η Saana Tuotanto Oy («Εταιρεία», «Εμείς») σέβεται το απόρρητό σας και δεσμεύεται για την προστασία των προσωπικών σας δεδομένων.',
    sections: [
      { title: '1. Πληροφορίες που συλλέγουμε', body: 'Συλλέγουμε δεδομένα που μας παρέχετε οικειοθελώς κατά την εγγραφή ή την επικοινωνία.' },
      { title: '2. Χρήση των πληροφοριών σας', body: 'Επεξεργαζόμαστε δεδομένα για επιχειρηματικά συμφέροντα, συμβάσεις και νομικές υποχρεώσεις.' },
      { title: '3. Υπεύθυνος Επεξεργασίας', body: 'Ο υπεύθυνος είναι η Saana Tuotanto Oy, Vantaa, Φινλανδία.' },
      { title: '4. Ορισμοί', body: 'Όροι: Λογαριασμός, Εταιρεία, Cookies, Χώρα, Συσκευή, Προσωπικά Δεδομένα, Ιστότοπος, Εσείς.' },
      { title: '5. Τύποι δεδομένων που συλλέγονται', body: 'Συλλέγουμε προσωπικά δεδομένα (Όνομα, Email) και δεδομένα χρήσης (IP, Browser).' },
      { title: '6. Τεχνολογίες παρακολούθησης', body: 'Χρησιμοποιούμε cookies για λειτουργικότητα και ανάλυση.' },
      { title: '7. Νομική βάση (GDPR)', body: 'Η επεξεργασία βασίζεται σε συγκατάθεση, σύμβαση, νόμο ή έννομο συμφέρον.' },
      { title: '8. Κοινή χρήση δεδομένων', body: 'Μπορεί να μοιραστούμε δεδομένα με παρόχους ή βάσει νόμου. ΔΕΝ πουλάμε τα δεδομένα σας.' },
      { title: '9. Διατήρηση δεδομένων', body: 'Διατηρούμε τα δεδομένα μόνο για όσο διάστημα απαιτείται για τον σκοπό.' },
      { title: '10. Τα δικαιώματά σας (GDPR)', body: 'Έχετε δικαίωμα πρόσβασης, διόρθωσης, διαγραφής ή εναντίωσης.' },
      { title: '11. Απόρρητο παιδιών', body: 'Οι υπηρεσίες μας δεν προορίζονται για άτομα κάτω των 13 ετών.' }
    ]
  },
  tr: {
    label: 'Yasal',
    title: 'Gizlilik Politikası',
    lastUpdated: 'Son güncelleme: 25-04-2026',
    intro: 'Saana Tuotanto Oy (“Şirket”, “Biz”) gizliliğinize saygı duyar ve kişisel verilerinizi korumayı taahhüt eder.',
    sections: [
      { title: '1. Topladığımız Bilgiler', body: 'Kayıt veya iletişim sırasında gönüllü olarak verdiğiniz verileri topluyoruz.' },
      { title: '2. Bilgilerinizi Nasıl Kullanıyoruz', body: 'Verileri iş çıkarları, sözleşmeler ve yasal yükümlülükler için işliyoruz.' },
      { title: '3. Veri Sorumlusu', body: 'Sorumlu şirket Saana Tuotanto Oy, Vantaa, Finlandiya\'dır.' },
      { title: '4. Tanımlar', body: 'Anahtar terimler: Hesap, Şirket, Çerezler, Ülke, Cihaz, Kişisel Veriler, Web Sitesi, Siz.' },
      { title: '5. Toplanan Veri Türleri', body: 'Kişisel verileri (İsim, E-posta) ve kullanım verilerini (IP, Tarayıcı) topluyoruz.' },
      { title: '6. İzleme Teknolojileri', body: 'İşlevsellik ve analiz için çerezleri kullanıyoruz.' },
      { title: '7. Yasal Dayanak (GDPR)', body: 'İşleme süreci rıza, sözleşme, yasa veya meşru menfaate dayanır.' },
      { title: '8. Veri Paylaşımı', body: 'Verileri hizmet sağlayıcılarla veya yasal gereklilikle paylaşabiliriz. Verilerinizi SATMIYORUZ.' },
      { title: '9. Veri Saklama', body: 'Verileri yalnızca amaç için gerekli olduğu sürece saklıyoruz.' },
      { title: '10. Haklarınız (GDPR)', body: 'Erişim, düzeltme, silme veya itiraz etme hakkına sahipsiniz.' },
      { title: '11. Çocukların Gizliliği', body: 'Hizmetlerimiz 13 yaşın altındaki bireylere yönelik değildir.' }
    ]
  },
  jp: {
    label: '法務',
    title: 'プライバシーポリシー',
    lastUpdated: '最終更新日: 2026年4月25日',
    intro: 'Saana Tuotanto Oy（「当社」）はお客様のプライバシーを尊重し、個人データの保護に努めています。',
    sections: [
      { title: '1. 収集する情報', body: '登録やお問い合わせの際に、お客様が自発的に提供された個人情報を収集します。' },
      { title: '2. 情報の利用目的', body: '事業利益、契約履行、および法的義務遵守のために情報を処理します。' },
      { title: '3. データ管理者', body: '管理者はSaana Tuotanto Oy（フィンランド、ヴァンター）です。' },
      { title: '4. 定義', body: '主要用語：アカウント、当社、クッキー、国、デバイス、個人データ、ウェブサイト、お客様。' },
      { title: '5. 収集されるデータの種類', body: '個人データ（氏名、メールアドレス）および利用データ（IP、ブラウザ）を収集します。' },
      { title: '6. トラッキング技術', body: '機能向上と分析のためにクッキーを使用します。' },
      { title: '7. 法的根拠 (GDPR)', body: '処理は同意、契約履行、法的義務、および正当な利益に基づきます。' },
      { title: '8. データの共有', body: 'サービスプロバイダーや法的要請に応じてデータを共有する場合があります。データの販売は行いません。' },
      { title: '9. データの保持', body: '目的達成に必要な期間のみデータを保持します。' },
      { title: '10. お客様の権利 (GDPR)', body: 'アクセス、訂正、削除、または処理への異議申し立ての権利があります。' },
      { title: '11. お子様のプライバシー', body: '当社のサービスは13歳未満の方を対象としていません。' }
    ]
  },
  ar: {
    label: 'قانوني',
    title: 'سياسة الخصوصية',
    lastUpdated: 'آخر تحديث: 25-04-2026',
    intro: 'تحترم شركة Saana Tuotanto Oy (“الشركة”، “نحن”) خصوصيتك وتلتزم بحماية بياناتك الشخصية.',
    sections: [
      { title: '1. المعلومات التي نجمعها', body: 'نجمع المعلومات الشخصية التي تقدمها لنا طواعية عند التسجيل أو التواصل معنا.' },
      { title: '2. كيف نستخدم معلوماتك', body: 'نعالج المعلومات لمصالح العمل، وأداء العقود، والامتثال القانوني.' },
      { title: '3. مراقب البيانات', body: 'مراقب البيانات هو شركة Saana Tuotanto Oy، فانتا، فنلندا.' },
      { title: '4. التعريفات', body: 'المصطلحات الرئيسية: الحساب، الشركة، ملفات تعريف الارتباط، الدولة، الجهاز، البيانات الشخصية، الموقع، أنت.' },
      { title: '5. أنواع البيانات التي نجمعها', body: 'نجمع البيانات الشخصية (الاسم، البريد الإلكتروني) وبيانات الاستخدام (IP، المتصفح).' },
      { title: '6. تقنيات التتبع', body: 'نستخدم ملفات تعريف الارتباط لتحسين الوظائف وتحليل الاستخدام.' },
      { title: '7. الأساس القانوني (GDPR)', body: 'تعتمد المعالجة على الموافقة، وأداء العقد، والالتزامات القانونية، والمصالح المشروعة.' },
      { title: '8. مشاركة البيانات', body: 'قد نشارك البيانات مع مزودي الخدمة أو حسب القانون. نحن لا نبيع بياناتك.' },
      { title: '9. الاحتفاظ بالبيانات', body: 'نحتفظ بالبيانات فقط طالما كان ذلك ضرورياً للغرض المقصود.' },
      { title: '10. حقوقك (GDPR)', body: 'لديك الحق في الوصول إلى بياناتك أو تصحيحها أو حذفها أو الاعتراض على المعالجة.' },
      { title: '11. خصوصية الأطفال', body: 'خدماتنا ليست مخصصة للأفراد الذين تقل أعمارهم عن 13 عاماً.' }
    ]
  }
};

export default function PrivacyPage() {
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
            <p>{t.intro}</p>

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
