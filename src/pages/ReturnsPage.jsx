import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const content = {
  en: {
    label: 'Legal',
    title: 'Refund & Return Policy',
    lastUpdated: 'Last updated: 25-04-2026',
    intro: 'Thank you for your purchase from Saana Tuotanto Oy. We hope you are satisfied with your order. However, if you are not completely satisfied, please review our policy below.',
    sections: [
      { title: '1. Returns', body: 'You may request a return within 7 days of delivery. Returns are accepted only if you received a defective or incorrect product.' },
      { title: '2. Return Conditions', body: 'Items must be unused, in original packaging, with proof of purchase and a valid RMA number.' },
      { title: '3. Return Process', body: 'Email admin@saanatuatanto.com with order details. Wait for an RMA number before shipping to our support team address.' },
      { title: '4. Shipping Costs', body: 'Customers are responsible for return shipping costs. We recommend using a trackable shipping service.' },
      { title: '5. Refunds', body: 'Refunds are provided as store credit for future purchases, not in cash or to original payment methods.' },
      { title: '6. Missing or Damaged Items', body: 'A parcel opening video is mandatory. Verified claims will result in reshipping or store credit.' },
      { title: '7. Delivery Issues', body: 'Do not accept tampered or incomplete packages. Contact us immediately for assistance.' },
      { title: '8. Exceptions', body: 'For special cases involving defective products, please contact us directly for an appropriate resolution.' }
    ]
  },
  fi: {
    label: 'Lakiasiat',
    title: 'Palautusehdot',
    lastUpdated: 'Viimeksi päivitetty: 25.04.2026',
    intro: 'Kiitos ostoksestasi Saana Tuotanto Oy:ltä. Toivomme, että olet tyytyväinen tilaukseesi. Jos et ole tyytyväinen, tutustu alla oleviin palautusehtoihimme.',
    sections: [
      { title: '1. Palautukset', body: 'Voit pyytää palautusta 7 päivän sisällä toimituksesta. Palautus hyväksytään vain, jos tuote on viallinen tai väärä.' },
      { title: '2. Palautusehdot', body: 'Tuotteen on oltava käyttämätön, alkuperäisessä pakkauksessa ja mukana on oltava ostotosite sekä RMA-numero.' },
      { title: '3. Palautusprosessi', body: 'Lähetä sähköpostia osoitteeseen admin@saanatuatanto.com. Odota RMA-numeroa ennen tuotteen lähettämistä.' },
      { title: '4. Toimituskulut', body: 'Asiakas vastaa palautuksen toimituskuluista. Suosittelemme seurantakoodilla varustettua lähetystä.' },
      { title: '5. Hyvitykset', body: 'Hyvitykset annetaan kauppasaldoina (store credit) tulevia ostoksia varten, ei käteisenä.' },
      { title: '6. Puuttuvat tai vaurioituneet tuotteet', body: 'Paketin avausvideo on pakollinen. Vahvistetut vaateet johtavat uudelleenlähetykseen tai hyvitykseen.' },
      { title: '7. Toimitusongelmat', body: 'Älä vastaanota avattua tai vahingoittunutta pakettia. Ota meihin heti yhteyttä.' },
      { title: '8. Poikkeukset', body: 'Erikoistapauksissa ota meihin suoraan yhteyttä sopivan ratkaisun löytämiseksi.' }
    ]
  },
  sv: {
    label: 'Juridik',
    title: 'Återbetalnings- och returpolicy',
    lastUpdated: 'Senast uppdaterad: 25-04-2026',
    intro: 'Tack för ditt köp från Saana Tuotanto Oy. Vi hoppas att du är nöjd med din beställning. Om inte, vänligen läs vår policy nedan.',
    sections: [
      { title: '1. Returer', body: 'Du kan begära retur inom 7 dagar efter leverans. Returer accepteras endast för defekta eller felaktiga produkter.' },
      { title: '2. Returvillkor', body: 'Varan måste vara oanvänd, i originalförpackning, med inköpsbevis och ett giltigt RMA-nummer.' },
      { title: '3. Returprocess', body: 'Mejla admin@saanatuatanto.com med orderdetaljer. Vänta på ett RMA-nummer innan du skickar varan.' },
      { title: '4. Fraktkostnader', body: 'Kunden ansvarar för returfraktkostnader. Vi rekommenderar spårbar frakt.' },
      { title: '5. Återbetalningar', body: 'Återbetalningar ges som butikskredit för framtida köp, inte kontant.' },
      { title: '6. Saknade eller skadade varor', body: 'En video när paketet öppnas är obligatorisk. Verifierade krav leder till ny leverans eller kredit.' },
      { title: '7. Leveransproblem', body: 'Acceptera inte skadade eller öppnade paket. Kontakta oss omedelbart.' },
      { title: '8. Undantag', body: 'För speciella fall med defekta produkter, kontakta oss direkt för en lösning.' }
    ]
  },
  no: {
    label: 'Juridisk',
    title: 'Refusjons- og returretningslinjer',
    lastUpdated: 'Sist oppdatert: 25.04.2026',
    intro: 'Takk for kjøpet hos Saana Tuotanto Oy. Vi håper du er fornøyd med bestillingen din. Hvis ikke, vennligst les våre retningslinjer nedenfor.',
    sections: [
      { title: '1. Returer', body: 'Du kan be om retur innen 7 dager etter levering. Returer aksepteres kun for defekte eller feilleverte produkter.' },
      { title: '2. Returvilkår', body: 'Varen må være ubrukt, i originalemballasje, med kjøpsbevis og et gyldig RMA-nummer.' },
      { title: '3. Returprosess', body: 'Send e-post til admin@saanatuatanto.com med ordredetaljer. Vent på RMA-nummer før du sender varen.' },
      { title: '4. Fraktkostnader', body: 'Kunden er ansvarlig for returfrakt. Vi anbefaler sporbar frakt.' },
      { title: '5. Refusjoner', body: 'Refusjoner gis som butikkreditt for fremtidige kjøp, ikke i kontanter.' },
      { title: '6. Manglende eller skadede varer', body: 'Video av pakkeåpning er obligatorisk. Bekreftede krav vil resultere i ny forsendelse eller kreditt.' },
      { title: '7. Leveringsproblemer', body: 'Ikke aksepter skadede eller åpnede pakker. Kontakt oss umiddelbart.' },
      { title: '8. Unntak', body: 'For spesielle tilfeller med defekte produkter, kontakt oss direkte for en løsning.' }
    ]
  },
  da: {
    label: 'Juridisk',
    title: 'Refusions- og returpolitik',
    lastUpdated: 'Sidst opdateret: 25.04.2026',
    intro: 'Tak for dit køb hos Saana Tuotanto Oy. Vi håber, du er tilfreds med din ordre. Hvis ikke, bedes du læse vores politik nedenfor.',
    sections: [
      { title: '1. Returneringer', body: 'Du kan anmode om returnering inden for 7 dage efter levering. Returneringer accepteres kun for defekte eller forkerte produkter.' },
      { title: '2. Returbetingelser', body: 'Varen skal være ubrugt, i original emballage, med købsbevis og et gyldigt RMA-nummer.' },
      { title: '3. Returproces', body: 'Send en e-mail til admin@saanatuatanto.com med ordreoplysninger. Vent på et RMA-nummer før afsendelse.' },
      { title: '4. Forsendelsesomkostninger', body: 'Kunden er ansvarlig for returfragtomkostninger. Vi anbefaler sporbar fragt.' },
      { title: '5. Refusioner', body: 'Refusioner gives som butikskredit til fremtidige køb, ikke kontant.' },
      { title: '6. Manglende eller beskadigede varer', body: 'Video af pakkeåbning er obligatorisk. Bekræftede krav vil resultere i ny forsendelse eller kredit.' },
      { title: '7. Leveringsproblemer', body: 'Acceptér ikke beskadigede eller åbnede pakker. Kontakt os med det samme.' },
      { title: '8. Undtagelser', body: 'Ved særlige tilfælde med defekte produkter, kontakt os direkte for en løsning.' }
    ]
  },
  et: {
    label: 'Juriidiline teave',
    title: 'Tagastuspoliitika',
    lastUpdated: 'Viimati uuendatud: 25.04.2026',
    intro: 'Täname ostu eest Saana Tuotanto Oy-st. Loodame, et olete oma tellimusega rahul. Kui aga mitte, tutvuge palun meie poliitikaga.',
    sections: [
      { title: '1. Tagastamine', body: 'Tagastamist saab taotleda 7 päeva jooksul. Tagastamine on lubatud vaid defektse või vale toote korral.' },
      { title: '2. Tingimused', body: 'Toode peab olema kasutamata, originaalpakendis, koos ostutõendi ja kehtiva RMA numbriga.' },
      { title: '3. Protsess', body: 'Kirjutage admin@saanatuatanto.com. Oodake RMA numbrit enne toote tagasi saatmist.' },
      { title: '4. Saatekulu', body: 'Tagastamise saatekulu tasub klient. Soovitame kasutada jälgitavat teenust.' },
      { title: '5. Hüvitised', body: 'Hüvitised väljastatakse poekrediidina tulevaste ostude jaoks, mitte sularahas.' },
      { title: '6. Puuduvad või rikutud tooted', body: 'Paki avamise video on kohustuslik. Kinnitatud nõuded toovad kaasa uue saadetise või krediidi.' },
      { title: '7. Kohaletoimetamise probleemid', body: 'Ärge võtke vastu rikutud pakke. Võtke meiega koheselt ühendust.' },
      { title: '8. Erandid', body: 'Erijuhtude korral võtke meiega otse ühendust, et leida sobiv lahendus.' }
    ]
  },
  de: {
    label: 'Rechtliches',
    title: 'Rückerstattungsrichtlinie',
    lastUpdated: 'Zuletzt aktualisiert: 25.04.2026',
    intro: 'Vielen Dank für Ihren Einkauf bei Saana Tuotanto Oy. Wir hoffen, dass Sie zufrieden sind. Sollte dies nicht der Fall sein, lesen Sie bitte unsere Richtlinien.',
    sections: [
      { title: '1. Rückgaben', body: 'Rückgaben sind innerhalb von 7 Tagen nach Lieferung möglich, jedoch nur bei defekten oder falschen Produkten.' },
      { title: '2. Bedingungen', body: 'Die Ware muss unbenutzt, in Originalverpackung und mit Kaufbeleg sowie RMA-Nummer sein.' },
      { title: '3. Ablauf', body: 'Senden Sie eine E-Mail an admin@saanatuatanto.com. Warten Sie auf die RMA-Nummer vor dem Versand.' },
      { title: '4. Versandkosten', body: 'Kunden tragen die Rücksendekosten. Wir empfehlen einen versicherten Versand.' },
      { title: '5. Erstattungen', body: 'Erstattungen erfolgen als Guthaben für zukünftige Einkäufe, nicht in bar.' },
      { title: '6. Fehlende oder beschädigte Artikel', body: 'Ein Video vom Öffnen des Pakets ist zwingend erforderlich.' },
      { title: '7. Lieferprobleme', body: 'Nehmen Sie keine beschädigten Pakete an. Kontaktieren Sie uns sofort.' },
      { title: '8. Ausnahmen', body: 'In Sonderfällen kontaktieren Sie uns bitte direkt für eine angemessene Lösung.' }
    ]
  },
  nl: {
    label: 'Juridisch',
    title: 'Terugbetalingsbeleid',
    lastUpdated: 'Laatst bijgewerkt: 25-04-2026',
    intro: 'Bedankt voor uw aankoop bij Saana Tuotanto Oy. Wij hopen dat u tevreden bent. Zo niet, lees dan ons beleid hieronder.',
    sections: [
      { title: '1. Retourneren', body: 'U kunt binnen 7 dagen na levering een retour aanvragen. Dit geldt alleen voor defecte of onjuiste producten.' },
      { title: '2. Voorwaarden', body: 'Artikelen moeten ongebruikt zijn, in originele verpakking, met aankoopbewijs en een geldig RMA-nummer.' },
      { title: '3. Proces', body: 'E-mail naar admin@saanatuatanto.com met orderdetails. Wacht op het RMA-nummer voor verzending.' },
      { title: '4. Verzendkosten', body: 'Klanten zijn verantwoordelijk voor retourkosten. Wij raden traceerbare verzending aan.' },
      { title: '5. Terugbetalingen', body: 'Terugbetalingen worden verstrekt als winkeltegoed voor toekomstige aankopen, niet in contanten.' },
      { title: '6. Ontbrekende artikelen', body: 'Een video van het openen van het pakket is verplicht voor claims.' },
      { title: '7. Leveringsproblemen', body: 'Accepteer geen beschadigde pakketten. Neem direct contact met ons op.' },
      { title: '8. Uitzonderingen', body: 'Neem bij defecte producten direct contact met ons op voor een passende oplossing.' }
    ]
  },
  fr: {
    label: 'Juridique',
    title: 'Politique de remboursement',
    lastUpdated: 'Dernière mise à jour : 25-04-2026',
    intro: 'Merci pour votre achat chez Saana Tuotanto Oy. Nous espérons que vous êtes satisfait. Si ce n\'est pas le cas, veuillez lire notre politique.',
    sections: [
      { title: '1. Retours', body: 'Vous pouvez demander un retour sous 7 jours après livraison, uniquement pour les produits défectueux ou incorrects.' },
      { title: '2. Conditions', body: 'Les articles doivent être inutilisés, dans leur emballage d\'origine, avec preuve d\'achat et numéro RMA.' },
      { title: '3. Processus', body: 'Envoyez un e-mail à admin@saanatuatanto.com. Attendez le numéro RMA avant de renvoyer le produit.' },
      { title: '4. Frais de port', body: 'Les frais de retour sont à la charge du client. Nous recommandons un envoi avec suivi.' },
      { title: '5. Remboursements', body: 'Les remboursements sont crédités sous forme d\'avoir pour de futurs achats, pas en espèces.' },
      { title: '6. Articles manquants', body: 'Une vidéo de l\'ouverture du colis est obligatoire pour toute réclamation.' },
      { title: '7. Problèmes de livraison', body: 'N\'acceptez pas de colis endommagés. Contactez-nous immédiatement.' },
      { title: '8. Exceptions', body: 'Pour les cas particuliers de produits défectueux, contactez-nous directement.' }
    ]
  },
  pl: {
    label: 'Prawne',
    title: 'Polityka zwrotów',
    lastUpdated: 'Ostatnia aktualizacja: 25.04.2026',
    intro: 'Dziękujemy za zakupy w Saana Tuotanto Oy. Mamy nadzieję, że jesteś zadowolony. Jeśli nie, zapoznaj się z naszą polityką zwrotów.',
    sections: [
      { title: '1. Zwroty', body: 'Zwrot można zgłosić w ciągu 7 dni od dostawy. Akceptujemy zwroty tylko wadliwych lub błędnych produktów.' },
      { title: '2. Warunki', body: 'Produkt musi być nieużywany, w oryginalnym opakowaniu, z dowodem zakupu i numerem RMA.' },
      { title: '3. Proces', body: 'Napisz na admin@saanatuatanto.com. Poczekaj na numer RMA przed wysyłką produktu.' },
      { title: '4. Koszty wysyłki', body: 'Klient ponosi koszty wysyłki zwrotnej. Zalecamy przesyłkę z możliwością śledzenia.' },
      { title: '5. Zwrot środków', body: 'Zwroty są przyznawane w formie kredytu sklepowego na przyszłe zakupy, nie w gotówce.' },
      { title: '6. Brakujące przedmioty', body: 'Wideo z otwierania paczki jest obowiązkowe przy zgłaszaniu reklamacji.' },
      { title: '7. Problemy z dostawą', body: 'Nie przyjmuj uszkodzonych paczek. Skontaktuj się z nami niezwłocznie.' },
      { title: '8. Wyjątki', body: 'W przypadku wadliwych produktów prosimy o bezpośredni kontakt w celu rozwiązania problemu.' }
    ]
  },
  es: {
    label: 'Legal',
    title: 'Política de devoluciones',
    lastUpdated: 'Última actualización: 25-04-2026',
    intro: 'Gracias por su compra en Saana Tuotanto Oy. Esperamos que esté satisfecho. Si no es así, consulte nuestra política a continuación.',
    sections: [
      { title: '1. Devoluciones', body: 'Puede solicitar una devolución dentro de los 7 días posteriores a la entrega por productos defectuosos.' },
      { title: '2. Condiciones', body: 'Los artículos deben estar sin usar, en su embalaje original, con comprobante de compra y número RMA.' },
      { title: '3. Proceso', body: 'Envíe un correo a admin@saanatuatanto.com. Espere el número RMA antes de enviar el producto.' },
      { title: '4. Gastos de envío', body: 'El cliente es responsable de los gastos de envío de devolución.' },
      { title: '5. Reembolsos', body: 'Los reembolsos se emiten como crédito de tienda para futuras compras, no en efectivo.' },
      { title: '6. Artículos faltantes', body: 'Es obligatorio un video de la apertura del paquete para procesar reclamaciones.' },
      { title: '7. Problemas de entrega', body: 'No acepte paquetes dañados o abiertos. Contáctenos de inmediato.' },
      { title: '8. Excepciones', body: 'Para casos especiales de productos defectuosos, contáctenos directamente.' }
    ]
  },
  it: {
    label: 'Legale',
    title: 'Politica di reso',
    lastUpdated: 'Ultimo aggiornamento: 25-04-2026',
    intro: 'Grazie per il tuo acquisto presso Saana Tuotanto Oy. Se non sei soddisfatto, consulta la nostra politica qui sotto.',
    sections: [
      { title: '1. Resi', body: 'Puoi richiedere un reso entro 7 giorni dalla consegna solo per prodotti difettosi o errati.' },
      { title: '2. Condizioni', body: 'Gli articoli devono essere inutilizzati, nella confezione originale, con prova d\'acquisto e numero RMA.' },
      { title: '3. Procedura', body: 'Invia un\'email a admin@saanatuatanto.com. Attendi il numero RMA prima di spedire.' },
      { title: '4. Spese di spedizione', body: 'Le spese di spedizione per il reso sono a carico del cliente.' },
      { title: '5. Rimborsi', body: 'I rimborsi sono erogati come credito del negozio per acquisti futuri, non in contanti.' },
      { title: '6. Articoli mancanti', body: 'Il video dell\'apertura del pacco è obbligatorio per eventuali reclami.' },
      { title: '7. Problemi di consegna', body: 'Non accettare pacchi danneggiati. Contattaci immediatamente.' },
      { title: '8. Eccezioni', body: 'In caso di prodotti difettosi, contattaci direttamente per una soluzione.' }
    ]
  },
  pt: {
    label: 'Legal',
    title: 'Política de devoluções',
    lastUpdated: 'Última atualização: 25-04-2026',
    intro: 'Obrigado pela sua compra na Saana Tuotanto Oy. Se não estiver satisfeito, consulte a nossa política abaixo.',
    sections: [
      { title: '1. Devoluções', body: 'Pode solicitar uma devolução no prazo de 7 dias após a entrega para produtos defeituosos.' },
      { title: '2. Condições', body: 'Os itens devem estar novos, na embalagem original, com prova de compra e número RMA.' },
      { title: '3. Processo', body: 'Envie um e-mail para admin@saanatuatanto.com. Aguarde o número RMA antes de enviar.' },
      { title: '4. Custos de envio', body: 'O cliente é responsável pelos custos de envio da devolução.' },
      { title: '5. Reembolsos', body: 'Os reembolsos são concedidos como crédito na loja para compras futuras, não em dinheiro.' },
      { title: '6. Itens em falta', body: 'É obrigatório um vídeo da abertura da encomenda para reclamações.' },
      { title: '7. Problemas de entrega', body: 'Não aceite embalagens danificadas. Contacte-nos imediatamente.' },
      { title: '8. Exceções', body: 'Para casos de produtos defeituosos, contacte-nos diretamente.' }
    ]
  },
  el: {
    label: 'Νομικά',
    title: 'Πολιτική Επιστροφών',
    lastUpdated: 'Τελευταία ενημέρωση: 25-04-2026',
    intro: 'Σας ευχαριστούμε για την αγορά σας. Εάν δεν είστε ικανοποιημένοι, διαβάστε την πολιτική μας.',
    sections: [
      { title: '1. Επιστροφές', body: 'Μπορείτε να ζητήσετε επιστροφή εντός 7 ημερών για ελαττωματικά ή λανθασμένα προϊόντα.' },
      { title: '2. Προϋποθέσεις', body: 'Τα προϊόντα πρέπει να είναι αχρησιμοποίητα, στην αρχική συσκευασία με απόδειξη και αριθμό RMA.' },
      { title: '3. Διαδικασία', body: 'Στείλτε email στο admin@saanatuatanto.com. Περιμένετε τον αριθμό RMA πριν την αποστολή.' },
      { title: '4. Έξοδα Αποστολής', body: 'Ο πελάτης επιβαρύνεται με τα έξοδα επιστροφής.' },
      { title: '5. Επιστροφή Χρημάτων', body: 'Οι επιστροφές γίνονται μέσω πιστωτικού υπολοίπου για μελλοντικές αγορές.' },
      { title: '6. Ελλιπή Προϊόντα', body: 'Το βίντεο ανοίγματος του δέματος είναι υποχρεωτικό για καταγγελίες.' },
      { title: '7. Προβλήματα Παράδοσης', body: 'Μην αποδέχεστε κατεστραμμένα δέματα. Επικοινωνήστε μαζί μας αμέσως.' },
      { title: '8. Εξαιρέσεις', body: 'Για ελαττωματικά προϊόντα, επικοινωνήστε απευθείας μαζί μας.' }
    ]
  },
  tr: {
    label: 'Yasal',
    title: 'İade ve Geri Ödeme Politikası',
    lastUpdated: 'Son güncelleme: 25-04-2026',
    intro: 'Saana Tuotanto Oy\'dan yaptığınız alışveriş için teşekkürler. Memnun kalmazsanız politikamıza göz atın.',
    sections: [
      { title: '1. İadeler', body: 'Hatalı veya kusurlu ürünler için teslimattan sonra 7 gün içinde iade talebinde bulunabilirsiniz.' },
      { title: '2. Koşullar', body: 'Ürünler kullanılmamış, orijinal ambalajında ve RMA numarası ile birlikte olmalıdır.' },
      { title: '3. Süreç', body: 'admin@saanatuatanto.com adresine e-posta gönderin. Gönderimden önce RMA numarasını bekleyin.' },
      { title: '4. Nakliye Ücretleri', body: 'İade nakliye ücretlerinden müşteri sorumludur.' },
      { title: '5. Geri Ödemeler', body: 'Geri ödemeler nakit olarak değil, gelecekteki alışverişler için mağaza kredisi olarak yapılır.' },
      { title: '6. Eksik Ürünler', body: 'Hak talepleri için paket açma videosu zorunludur.' },
      { title: '7. Teslimat Sorunları', body: 'Hasarlı paketleri kabul etmeyin. Hemen bizimle iletişime geçin.' },
      { title: '8. İstisnalar', body: 'Kusurlu ürünler için lütfen doğrudan bizimle iletişime geçin.' }
    ]
  },
  jp: {
    label: '法務',
    title: '返品・返金ポリシー',
    lastUpdated: '最終更新日: 2026年4月25日',
    intro: 'Saana Tuotanto Oyをご利用いただきありがとうございます。返品をご希望の場合は以下のポリシーをご確認ください。',
    sections: [
      { title: '1. 返品について', body: '配送後7日以内に、不良品または誤配送の場合のみ返品を承ります。' },
      { title: '2. 返品条件', body: '未使用かつ未開封で、購入証明書およびRMA番号が必要です。' },
      { title: '3. 手順', body: 'admin@saanatuatanto.comへメールし、RMA番号の発行をお待ちください。' },
      { title: '4. 送料', body: '返品時の送料はお客様のご負担となります。' },
      { title: '5. 返金について', body: '返金は現金ではなく、次回以降使えるストアクレジットで提供されます。' },
      { title: '6. 不足・破損', body: '開封時の動画撮影が必須です。動画がない場合は対応できないことがあります。' },
      { title: '7. 配送トラブル', body: '破損した荷物は受け取らず、すぐにご連絡ください。' },
      { title: '8. 特例', body: '不良品等の特殊なケースは、直接お問い合わせください。' }
    ]
  },
  ar: {
    label: 'قانوني',
    title: 'سياسة الاسترجاع والاسترداد',
    lastUpdated: 'آخر تحديث: 25-04-2026',
    intro: 'شكراً لشرائكم من شركة Saana Tuotanto Oy. إذا لم تكن راضياً، يرجى مراجعة سياستنا أدناه.',
    sections: [
      { title: '1. المرتجعات', body: 'يمكنك طلب الإرجاع خلال 7 أيام من الاستلام للمنتجات المعيبة أو الخاطئة فقط.' },
      { title: '2. شروط الإرجاع', body: 'يجب أن يكون المنتج غير مستخدم، في عبوته الأصلية، مع إثبات الشراء ورقم RMA.' },
      { title: '3. عملية الإرجاع', body: 'راسلنا على admin@saanatuatanto.com. انتظر رقم RMA قبل الشحن.' },
      { title: '4. تكاليف الشحن', body: 'يتحمل العميل تكاليف شحن المرتجعات.' },
      { title: '5. الاسترداد', body: 'يتم الاسترداد كرصيد متجر للمشتريات المستقبلية، وليس نقداً.' },
      { title: '6. العناصر المفقودة', body: 'فيديو فتح الطرد إلزامي لمعالجة أي مطالبات.' },
      { title: '7. مشاكل التسليم', body: 'لا تقبل الطرود التالفة. اتصل بنا فوراً للحصول على المساعدة.' },
      { title: '8. استثناءات', body: 'للحالات الخاصة بالمنتجات المعيبة، يرجى التواصل معنا مباشرة.' }
    ]
  }
};

export default function ReturnsPage() {
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
