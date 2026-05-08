const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const PageContent = mongoose.model('PageContent', new mongoose.Schema({
  page: String,
  content: Object,
  translations: Object
}, { collection: 'pagecontents' }));

async function fixFooter() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const footer = await PageContent.findOne({ page: 'footer' });
    if (!footer) {
      console.log('Footer not found');
      return;
    }

    // Define the master English content with consistent keys
    const content = {
      tagline: "Premium urban agriculture for a modern lifestyle. Stewardship through soil.",
      address: "Vantaa, Finland",
      businessId: "Business ID: 3617994-6",
      explore: "Explore",
      policies: "Policies",
      shop: "Shop",
      about: "About",
      blog: "Blog",
      feedback: "Feedback",
      faq: "FAQ",
      contact: "Contact",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      returns: "Refund & Return Policy",
      ctaTitle: "Have Questions?",
      ctaSub: "Need help with your order or want to learn more about our seasonal drops?",
      contactBtn: "Contact Now",
      copy: "© 2026 Saana Tuotanto Sustainable Urban Agriculture.",
      admin: "Admin"
    };

    // Update root content
    footer.content = content;

    // Manually fix Finnish for speed and accuracy
    const fi = {
      tagline: "Ensiluokkaista kaupunkiviljelyä moderniin elämäntapaan.",
      address: "Vantaa, Suomi",
      businessId: "Y-tunnus: 3617994-6",
      explore: "Tutki",
      policies: "Käytännöt",
      shop: "Kauppa",
      about: "Meistä",
      blog: "Blogi",
      feedback: "Palaute",
      faq: "UKK",
      contact: "Ota yhteyttä",
      terms: "Käyttöehdot",
      privacy: "Tietosuojaseloste",
      returns: "Hyvitys- ja palautuskäytäntö",
      ctaTitle: "Onko kysyttävää?",
      ctaSub: "Tarvitsetko apua tilauksesi kanssa tai haluatko tietää lisää tuotteistamme?",
      contactBtn: "Ota yhteyttä",
      copy: "© 2026 Saana Tuotanto - Kestävä kaupunkiviljely.",
      admin: "Ylläpito"
    };

    // Set translations
    footer.translations = footer.translations || {};
    footer.translations.fi = fi;
    
    // Also update others via a quick merge or wait for the big script
    // For now, let's just fix Finnish as requested
    
    footer.markModified('content');
    footer.markModified('translations');
    await footer.save();

    console.log('Footer content and Finnish translations fixed.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixFooter();
