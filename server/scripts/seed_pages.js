require('dotenv').config();
const mongoose = require('mongoose');
const PageContent = require('../models/PageContent');

const seedData = [
  {
    page: 'privacy_page',
    content: {
      title: 'Privacy Policy',
      label: 'Legal',
      lastUpdated: 'Last updated: 25-04-2026',
      intro: 'Saana Tuotanto Oy (“Company”, “We”, “Us”, or “Our”) respects your privacy and is committed to protecting your personal data.',
      sections: [
        { title: '1. Information We Collect', body: 'We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.' },
        { title: '2. How We Use Your Information', body: 'We use personal information collected via our website for a variety of business purposes, including providing services, managing accounts, and complying with legal obligations.' },
        { title: '3. Data Controller', body: 'For the purpose of the General Data Protection Regulation (GDPR), the data controller is Saana Tuotanto Oy.' },
        { title: '4. Tracking Technologies', body: 'We use cookies and similar tracking technologies to improve website functionality and analyze usage. You can control cookies through your browser settings.' },
        { title: '5. Your Rights', body: 'You have the right to access, correct, or request deletion of your personal data. Contact us to exercise these rights.' }

      ]
    }
  },
  {
    page: 'terms_page',
    content: {
      title: 'Terms & Conditions',
      label: 'Legal',
      lastUpdated: 'Last updated: 25-04-2026',
      intro: 'Welcome to Saana Tuotanto. By accessing our website, you agree to these terms and conditions.',
      sections: [
        { title: '1. Use of Website', body: 'You agree to use our website only for lawful purposes and in a way that does not infringe the rights of others.' },
        { title: '2. Product Information', body: 'We strive to ensure all product information is accurate. However, we do not warrant that product descriptions or other content are error-free.' },
        { title: '3. Intellectual Property', body: 'All content on this website, including text, graphics, and logos, is the property of Saana Tuotanto Oy.' }
      ]
    }
  },
  {
    page: 'returns_page',
    content: {
      title: 'Returns & Refunds',
      label: 'Service',
      lastUpdated: 'Last updated: 25-04-2026',
      intro: 'We hope you are satisfied with your order. If not, please review our return policy below.',
      sections: [
        { title: '1. Returns', body: 'You may request a return within 7 days of delivery if you received a defective or incorrect product.' },
        { title: '2. Return Conditions', body: 'Items must be unused and in original packaging. A Return Merchandise Authorization (RMA) is required.' },
        { title: '3. Refunds', body: 'Approved returns are provided as store credit, not cash refunds.' }
      ]
    }
  },
  {
    page: 'home_about',
    content: {
      label: 'Our Story',
      title: 'Urban farming,\nrefined for life.',
      body: 'Saana Tuotanto is a Vantaa-based urban farming and lifestyle brand. We believe in the power of locally grown, sustainably crafted products.',
      missionLabel: 'Mission',
      missionText: 'Pure Nordic nature in modern everyday living.',
      visionLabel: 'Vision',
      vision: 'Creating a world where sustainable living is beautiful, accessible, and deeply connected to nature.',
      statVal: '95%',
      statLabel: 'Less water than soil farming',
      cta: 'Our Story'
    }
  },
  {
    page: 'home_categories',
    content: {
      label: 'WHAT WE OFFER',
      title: 'Pure & Premium.'
    }
  },
  {
    page: 'orders_page',
    content: {
      title: 'Order History',
      sub: 'Track and manage your STO purchases.',
      logout: 'Logout',
      customerBadge: 'Customer',
      emptyState: 'You haven\'t placed any orders yet.',
      startShopping: 'Start Shopping',
      orderPrefix: 'Order #',
      trackingLabel: 'Tracking Number:',
      pending: 'Pending',
      qtyLabel: 'Qty:',
      totalLabel: 'Total',
      loading: 'Loading your orders...',
      status_processing: 'Processing',
      status_shipped: 'Shipped',
      status_delivered: 'Delivered'
    }
  },
  {
    page: 'auth_page',
    content: {
      leftTitle: 'Pure living, delivered to you.',
      leftSub: 'Join our community of conscious consumers and experience the purity of Saana Tuotanto.',
      feature1: 'Locally Grown',
      feature2: 'Zero Pesticides',
      feature3: 'Nordic Quality',
      loginTitle: 'Welcome Back',
      loginSub: 'Log in to your STO account.',
      registerTitle: 'Join STO',
      registerSub: 'Create an account to get started.',
      fullName: 'Full Name',
      namePlaceholder: 'Your Name',
      email: 'Email Address',
      emailPlaceholder: 'you@example.com',
      password: 'Password',
      forgotPw: 'Forgot Password?',
      signIn: 'Sign In',
      createAccount: 'Create Account',
      forgotTitle: 'Forgot Password',
      forgotSub: 'Enter your email to receive a reset code.',
      sendCode: 'Send Code',
      backToLogin: 'Back to Login',
      resetTitle: 'Reset Password',
      resetSub: 'Enter the code sent to your email and your new password.',
      otpLabel: '6-Digit Code',
      newPassword: 'New Password',
      resetBtn: 'Reset Password',
      cancel: 'Cancel'
    }
  },
  {
    page: 'feedback_page',
    content: {
      heroLabel: 'Share Your Experience',
      heroTitle: 'We Value Your Feedback',
      heroSub: 'Your thoughts help us grow better microgreens and craft better candles. Every review matters.',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. Aino Mäkinen',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      ratingLabel: 'Overall Rating',
      catLabel: 'Feedback Category',
      msgLabel: 'Your Message',
      msgPlaceholder: 'Tell us about your experience with our products, delivery, or anything else...',
      submit: 'Send Feedback',
      successTitle: 'Thank You!',
      successSub: 'Your feedback has been received. We truly appreciate you taking the time to share your experience — it helps us grow.',
      submitAnother: 'Submit Another',
      backToShop: 'Back to Shop',
      cat1: 'Product Quality',
      cat2: 'Freshness & Packaging',
      cat3: 'Delivery Experience',
      cat4: 'Website Experience',
      cat5: 'Customer Service',
      cat6: 'Other',
      info1Title: 'STO Green',
      info1Desc: 'Share what you think about our microgreens freshness, taste, and packaging.',
      info2Title: 'STO Gold',
      info2Desc: 'Let us know about your candle experience — scent, burn time, or presentation.',
      info3Title: 'Delivery',
      info3Desc: 'Was your order on time and in perfect condition? Tell us how we\'re doing.',
      promiseTitle: 'Our Promise',
      promiseText: 'Every piece of feedback is read by our team and used to improve. We respond to all emails within 48 hours.',
      poor: 'Poor',
      fair: 'Fair',
      good: 'Good',
      veryGood: 'Very Good',
      excellent: 'Excellent',
      errName: 'Name is required.',
      errEmail: 'A valid email is required.',
      errRating: 'Please select a rating.',
      errCat: 'Please choose a category.',
      errMessage: 'Please write at least 10 characters.'
    }
  },
  {
    page: 'faq_page',
    content: {
      title: 'Frequently Asked Questions',
      sub: 'Everything you need to know about Saana Tuotanto and our commitment to pure living.',
      items: [
        { q: 'What is vertical farming?', a: 'Vertical farming is a method of growing crops in stacked layers, often indoors. At STO, we use this technology to control every aspect of the environment, ensuring purity and freshness regardless of the season.' },
        { q: 'How are your microgreens different?', a: 'Our microgreens are grown without soil or pesticides. We use pure water and nutrient-rich solutions in a controlled environment agriculture (CEA) system, resulting in cleaner, more nutrient-dense greens.' },
        { q: 'Do you deliver in Finland?', a: 'Yes, we provide nationwide delivery across Finland for all our products. Microgreens are delivered with special care to maintain their living freshness.' },
        { q: 'Can I contact Saana Tuotanto for bulk or business orders?', a: 'Absolutely. We partner with restaurants, offices, and retailers. Please reach out via our Contact page for wholesale or business inquiries.' }
      ],
      commonTitle: 'Still have questions?',
      commonSub: "We're here to help. Reach out to our team and we'll get back to you shortly."
    }
  },
  {
    page: 'shop_page',
    content: {
      bannerLabel: 'Curated Selection',
      bannerTitle: 'The STO Shop',
      bannerSub: 'Living nutrition and hand-poured Nordic lifestyle essentials.',
      all: 'All',
      resultsCount: 'products',
      noProducts: 'No products found',
      tryAdjust: 'Try adjusting your search or filters to find what you\'re looking for.',
      clearFilters: 'Clear all filters'
    }
  },
  {
    page: 'home_hero',
    content: {
      eyebrow1: 'Saana Tuotanto Oy',
      eyebrow2: 'Finland',
      heading: 'Nature, Refined.',
      sub: 'Locally grown. Sustainably crafted. Designed for modern living.',
      cta1: 'Explore Products',
      cta2: 'Discover Saana Tuotanto',
      scroll: 'Scroll',
      badge1: 'Locally Grown',
      badge2: 'Zero Pesticides',
      badge3: 'Vantaa, Finland',
      badge4: 'Carbon Neutral'
    }
  },
  {
    page: 'home_microgreens',
    content: {
      label: 'FRESH & VIBRANT',
      title: 'Our Microgreens',
      desc: 'Grown sustainably with pure water and meticulous care, our microgreens deliver concentrated nutrition and extraordinary flavor to every meal.',
      img1Alt: 'Fresh Microgreens in Hydroponic Setup',
      img1Label: 'Hydroponic Cultivation',
      img2Alt: 'Harvesting Fresh Microgreens',
      img2Label: 'Fresh Daily Harvest',
      img3Alt: 'Microgreens in a Premium Dish',
      img3Label: 'Culinary Excellence'
    }
  },
  {
    page: 'home_benefits',
    content: {
      title: 'Why Microgreens',
      sub1: 'Small plants.',
      sub2: 'Powerful nutrition.',
      item1Title: 'Nutrient Dense',
      item1Desc: 'Up to 40× more nutrients than mature vegetables. A superfood in every leaf.',
      item2Title: 'Immunity Support',
      item2Desc: 'Rich in antioxidants and vitamins that strengthen your body\'s natural defenses.',
      item3Title: 'Locally Grown',
      item3Desc: 'Harvested within 24 hours of delivery. No long-distance transport, no compromise.',
      item4Title: 'Sustainable Farming',
      item4Desc: 'Indoor vertical farming uses 95% less water and zero pesticides.'
    }
  },
  {
    page: 'home_sustainability',
    content: {
      title: 'Our Commitment',
      sub1: 'Grown with purpose.',
      sub2: 'Delivered with care.',
      desc: 'We operate fully indoors — no seasons, no soil erosion, no harmful chemicals. Our controlled environment agriculture ensures every harvest is consistent, clean, and kind to the planet.',
      stat1Val: '95%',
      stat1Label: 'Less water than traditional farming',
      stat2Val: 'Net Zero',
      stat2Label: 'Carbon footprint',
      stat3Val: '100%',
      stat3Label: 'Pesticide-free guarantee',
      stat4Val: 'Controlled',
      stat4Label: 'indoor farming'
    }
  },
  {
    page: 'home_process',
    content: {
      title: 'The Process',
      sub1: 'From seed to',
      sub2: 'your table.',
      step1Title: 'Grow',
      step1Desc: 'Seeds are planted in our Vantaa vertical farm under precisely controlled light, temperature, and humidity.',
      step2Title: 'Harvest',
      step2Desc: 'Every tray is hand-harvested at peak vitality — the moment nutrients are at their highest.',
      step3Title: 'Pack',
      step3Desc: 'Packed in eco-friendly, fully compostable packaging within hours of harvest.',
      step4Title: 'Deliver',
      step4Desc: 'Delivered fresh to your door within 24 hours. Direct from farm to table.'
    }
  },
  {
    page: 'home_testimonials',
    content: {
      label: 'Trusted by Nordic Households',
      title: 'What our customers say.',
      t1Text: '"The microgreens are unlike anything I\'ve found in supermarkets. Incredibly fresh, vibrant, and I can taste the quality."',
      t1Author: 'Aino Mäkinen',
      t1Loc: 'Helsinki',
      t2Text: '"Saana Tuotanto candles have transformed my home rituals. The Nordic Forest scent is absolutely magical."',
      t2Author: 'Erik Lindström',
      t2Loc: 'Stockholm',
      t3Text: '"Fast delivery, beautiful packaging, and the microgreens have a freshness I\'ve never experienced before."',
      t3Author: 'Liisa Korhonen',
      t3Loc: 'Tampere'
    }
  },
  {
    page: 'home_cta',
    content: {
      title: 'Elevate Your Everyday Essentials.',
      desc: 'Discover our collection — where nature meets refined living.',
      btn1: 'Shop Now',
      btn2: 'Contact Us'
    }
  },
  {
    page: 'footer',
    content: {
      desc: 'Premium urban agriculture designed for modern lifestyle. Stewardship through soil.',
      address: 'Vantaa, Finland',
      businessId: 'Business ID: 3617994-6',
      explore: 'Explore',
      policies: 'Policies',
      newsletterTitle: 'Newsletter',
      newsletterSub: 'Stay updated with STO news and seasonal drops.',
      newsletterPlaceholder: 'Your email',
      copyright: '© 2026 Saana Tuotanto Sustainable Urban Agriculture.',
      privacy: 'Privacy',
      terms: 'Terms',
      shop: 'Shop',
      about: 'About',
      blog: 'Blog',
      feedback: 'Feedback',
      faq: 'FAQ',
      contact: 'Contact',
      termsCond: 'Terms & Conditions',
      privacyPol: 'Privacy Policy',
      refundPol: 'Refund & Return Policy'
    }
  },
  {
    page: 'contact_page',
    content: {
      bannerLabel: 'Contact',
      title: 'Get in Touch',
      sub: 'We\'d love to hear from you. Reach out anytime.',
      infoTitle: 'Let\'s connect.',
      infoBody: 'We\'re a small, passionate team based in Vantaa. Whether you have a question about our products, a wholesale inquiry, or just want to say hello — we\'d love to hear from you.',
      addressLabel: 'Address',
      addressVal: 'Vantaa, Finland',
      emailLabel: 'Email',
      emailVal: 'admin@saana.fi',

      businessIdLabel: 'Business ID',
      businessIdVal: '3617994-6',
      formTitle: 'Send a Message',
      nameLabel: 'Your Name',
      namePlaceholder: 'Your name',
      emailInputLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      msgLabel: 'Message',
      msgPlaceholder: 'How can we help you?',
      sendBtn: 'Send Message',
      successTitle: 'Message sent!',
      successText: 'Thank you for reaching out. We\'ll get back to you within 24–48 hours.',
      sendAnother: 'Send another message'
    }
  },
  {
    page: 'blog_page',
    content: {
      label: 'Health & Lifestyle',
      title: 'The STO Journal',
      sub: 'Science-backed insights on microgreens, nutrition, and the art of mindful Nordic living.',
      filterTitle: 'Filter by Topic',
      all: 'All',
      emptyState: 'No articles found for this topic.',
      readArticle: 'Read Article',
      stayInformed: 'Stay Informed',
      stayInformedSub: 'Get our latest articles on microgreens science, recipes, and Nordic wellness delivered to your inbox.',
      emailPlaceholder: 'Your email address',
      subscribe: 'Subscribe'
    }
  },
  {
    page: 'about_page',
    content: {
      hero: 'Saana Tuotanto Urban Agriculture',
      title: 'We grow food like nature intended.',
      storyLabel: 'Our Story',
      storyTitle: 'Saana Tuotanto Oy',
      p1: 'Saana Tuotanto was born from a simple belief: that what you eat, drink, and breathe should be as pure as the Finnish nature surrounding us. Founded in Vantaa, we set out to redefine urban agriculture — bringing the farm inside, removing every impurity, and delivering living nutrition direct to your door.',
      p2: 'From our microgreens to our hand-poured candles, every product is a reflection of our commitment to sustainability, quality, and the Nordic way of living.',
      valuesLabel: 'STO growing',
      valuesTitle: 'Our Values',
      v1Title: 'Sustainability',
      v1Desc: 'Every decision we make is guided by environmental responsibility.',
      v2Title: 'Urban Innovation',
      v2Desc: 'Bringing cutting-edge vertical farming into city spaces.',
      v3Title: 'Nordic Roots',
      v3Desc: 'Deeply inspired by Finnish nature, simplicity, and sisu spirit.',
      v4Title: 'Uncompromised Quality',
      v4Desc: 'Premium products with no shortcuts, ever.',
      mission: 'Our Mission',
      missionText: 'To bring the purity of Nordic nature into modern everyday living through sustainable, locally produced urban agriculture and lifestyle products.',
      vision: 'Our Vision',
      visionText: 'A world where sustainable living is beautiful, accessible, and deeply connected to the land we share.',
      readyTitle: 'Ready to experience STO?'
    }
  },
  {
    page: 'nav',
    content: { home: 'Home', shop: 'Shop', about: 'About', contact: 'Contact', cart: 'Cart', account: 'Account', language: 'Language', feedback: 'Feedback', blog: 'Blog' }
  },
  {
    page: 'cart',
    content: { title: 'Your Cart', empty: 'Your cart is empty.', emptySub: 'Discover our curated collection of Nordic essentials.', continueShopping: 'Continue Shopping', subtotal: 'Subtotal', shipping: 'Shipping', total: 'Total', checkout: 'Proceed to Checkout', remove: 'Remove', update: 'Update', orderSummary: 'Order Summary', shippingRegion: '(Finland)' }
  },
  {
    page: 'checkout',
    content: { 
      title: 'Checkout', 
      sub: 'Please provide your details to complete the order.', 
      contact: 'Contact Information', 
      email: 'Email Address', 
      shipping: 'Shipping Address', 
      name: 'Full Name', 
      address: 'Address', 
      city: 'City', 
      postal: 'Postal Code', 
      country: 'Country', 
      payment: 'Payment Method', 
      place: 'Complete Purchase', 
      secure: 'Secure SSL Encrypted Checkout', 
      secureDesc: 'Your payment information is processed securely.', 
      summary: 'Order Summary', 
      subtotal: 'Subtotal', 
      shippingFee: 'Shipping (Finland)', 
      qtyLabel: 'Qty',
      countries: ['Finland', 'Sweden', 'Norway', 'Denmark', 'Estonia', 'Germany', 'France', 'UK', 'USA', 'Canada', 'Netherlands', 'Belgium', 'Austria', 'Switzerland', 'Italy', 'Spain', 'Portugal', 'Japan', 'China', 'UAE']
    }
  },
  {
    page: 'products',
    content: {
      label: 'Curated Selection',
      title: 'Featured Products',
      addToCart: 'Add to Cart',
      buyNow: 'Buy Now',
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      outOfStock: 'Out of Stock',
      viewAll: 'View All Products',
      qty: 'Quantity',
      category: 'Category',
      price: 'Price',
      search: 'Search products...',
      filterAll: 'All',
      sort: 'Sort by',
      sortNewest: 'Newest',
      sortPriceLow: 'Price: Low to High',
      sortPriceHigh: 'Price: High to Low'
    }
  },
  {
    page: 'order',
    content: {
      title: 'Order Confirmed!',
      sub: 'Thank you for your purchase.',
      number: 'Order Number',
      customer: 'Customer',
      items: 'Items Ordered',
      total: 'Total',
      status: 'Payment Status',
      paid: 'Paid',
      msg: 'A confirmation email and invoice will be sent to your email address.',
      noOrder: 'No order found.',
      returnShop: 'Return to Shop',
      qtyLabel: 'Qty',
      continueShopping: 'Continue Shopping',
      downloadInvoice: 'Download Invoice'
    }
  },
  {
    page: 'lang',
    content: {
      choose: 'Choose your experience',
      sub: 'Select your preferred language to continue.',
      remember: 'Remember my selection',
      en: 'English',
      fi: 'Suomi',
      sv: 'Svenska',
      enSub: 'International',
      fiSub: 'Finnish',
      svSub: 'Swedish'
    }
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    for (const data of seedData) {
      await PageContent.findOneAndUpdate(
        { page: data.page },
        { content: data.content },
        { upsert: true, new: true }
      );
      console.log(`Seeded page: ${data.page}`);
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
