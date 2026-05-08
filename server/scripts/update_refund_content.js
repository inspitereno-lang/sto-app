const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const PageContent = mongoose.model('PageContent', new mongoose.Schema({
  page: String,
  content: Object,
  translations: Object
}, { collection: 'pagecontents' }));

async function updateRefundPolicy() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const page = await PageContent.findOne({ page: 'returns_page' });
    if (!page) {
      console.log('Page not found');
      return;
    }

    const newContent = {
      title: "Refund & Return Policy",
      label: "Legal",
      lastUpdated: "Last updated: 07-05-2026",
      intro: "Thank you for your purchase from Saana Tuotanto Oy. We hope you are satisfied with your order. However, if you are not completely satisfied, please review our policy below.",
      sections: [
        {
          title: "1. Returns",
          body: "You may request a return within 7 days from the date of delivery. At present, returns are accepted only under the following conditions:\n- You received a defective product, or\n- You received an incorrect product\nWe do not accept returns for any other reasons."
        },
        {
          title: "2. Return Conditions",
          body: "To be eligible for a return:\n- The item must be unused and in its original packaging\n- Proof of purchase must be provided\n- A valid Return Merchandise Authorization (RMA) must be obtained before sending the item"
        },
        {
          title: "3. Return Process",
          body: "To initiate a return:\n- Email us at admin@saanatuotanto.com\n- Provide order details and reason for return\n- Wait for confirmation and your RMA number\n- Pack the item securely in original packaging\n- Ship the product to the address provided by our support team\n⚠️ Important: Returns sent without prior approval (RMA) may not be accepted."
        },
        {
          title: "4. Shipping Costs",
          body: "Customers are responsible for return shipping costs. We recommend using a trackable shipping service. Saana Tuotanto Oy is not responsible for lost return shipments."
        },
        {
          title: "5. Refunds",
          body: "Refunds are not issued in cash or to original payment methods. Approved returns will be provided as store credit. Store credit can be used for future purchases on our website."
        },
        {
          title: "6. Missing or Damaged Items",
          body: "To process claims for missing or damaged items:\n- A parcel opening video is mandatory\n- Claims without video evidence may not be accepted\n- Some items may be packed inside other packaging—please check carefully before reporting\nIf a claim is verified:\n- Missing items will be reshipped, or\n- A refund/store credit will be issued for the missing items"
        },
        {
          title: "7. Delivery Issues",
          body: "If the package appears tampered, opened, or incomplete, do not accept delivery. Contact us immediately for assistance. ⚠️ Important: If you accept such a package without notifying us, we may not be able to process your claim."
        },
        {
          title: "8. Exceptions",
          body: "For special cases involving defective or damaged products, please contact us directly. We will assess the situation and provide an appropriate resolution."
        },
        {
          title: "9. Contact Us",
          body: "If you have any questions about this policy, please contact:\nSaana Tuotanto Oy\nEmail: admin@saanatuotanto.com\nWebsite: www.h2o.fi"
        }
      ]
    };

    page.content = newContent;
    page.markModified('content');
    
    // We will clear existing translations so the background script can re-translate with the new content
    page.translations = { en: newContent };
    page.markModified('translations');
    
    await page.save();
    console.log('Refund & Return Policy updated with new content.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateRefundPolicy();
