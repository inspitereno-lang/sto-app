/**
 * STO Database Seed Script
 * 
 * Seeds MongoDB with all existing product data, categories, blogs, and admin user.
 * Run: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Blog = require('./models/Blog');
const Order = require('./models/Order');

const ADMIN_USER = {
  username: 'admin',
  email: 'admin@saana.fi',

  password: 'admin123',
  role: 'admin',
};

const CUSTOMERS = [
  {
    username: 'aino_makinen',
    email: 'aino@example.com',
    password: 'password123',
    role: 'user',
  },
  {
    username: 'erik_lindstrom',
    email: 'erik@example.com',
    password: 'password123',
    role: 'user',
  },
  {
    username: 'liisa_korhonen',
    email: 'liisa@example.com',
    password: 'password123',
    role: 'user',
  }
];


const CATEGORIES = [
  {
    name: 'Saana Tuotanto Green',
    slug: 'microgreens',
    description: 'Living nutrition from Vantaa\'s vertical farms.',
    icon: '🌱',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
    color: '#1B3A2D',
    link: '/shop?cat=microgreens',
    isActive: true,
  },
  {
    name: 'Saana Tuotanto Gold',
    slug: 'candles',
    description: 'Hand-poured Nordic luxury for mindful moments.',
    icon: '🕯️',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
    color: '#2D2218',
    link: '/shop?cat=candles',
    isActive: true,
  },
];

const PRODUCTS = [
  // STO GREEN (MICROGREENS)
  {
    name: 'Nordic Pea Shoots',
    category: 'microgreens',
    price: 12.00,
    stock: 34,
    stockStatus: 'instock',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
      'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=600&q=80',
      'https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=600&q=80',
    ],
    shortDescription: 'Crisp, sweet pea shoots harvested at peak vitality. Delicate crunch and tender pea taste.',
    description: 'Our Nordic Pea Shoots are cultivated in our climate-controlled vertical laboratory. Each harvest contains maximum nutrient density without pesticides or synthetic fertilizers.',
    nutrition: ['Vitamin C', 'High Fiber', 'Locally Grown'],
    flavorNotes: 'Early spring meadow, sweet garden pea, lingering nutty finish.',
    isNew: true,
    isFeatured: true,
  },
  {
    name: 'Sunflower Microgreens',
    category: 'microgreens',
    price: 10.00,
    stock: 28,
    stockStatus: 'instock',
    image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=600&q=80',
      'https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=600&q=80',
    ],
    shortDescription: 'Nutty, rich sunflower shoots. Perfect for salads and sandwiches.',
    description: 'Rich in healthy fats and protein. Our sunflower microgreens have a satisfying crunch and subtle nutty flavor.',
    nutrition: ['Vitamin E', 'Protein', 'Healthy Fats'],
    flavorNotes: 'Warm nutty, subtle sweetness, earthy undertones.',
    isNew: false,
    isFeatured: true,
  },
  {
    name: 'Radish Microgreens',
    category: 'microgreens',
    price: 9.00,
    stock: 4,
    stockStatus: 'lowstock',
    image: 'https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?w=600&q=80',
    ],
    shortDescription: 'Spicy, vibrant radish microgreens. Adds bold flavor to any dish.',
    description: 'Fiery and peppery, our radish microgreens add a bold kick to salads, bowls, and sushi platters.',
    nutrition: ['Vitamin C', 'Antioxidants', 'Anti-inflammatory'],
    flavorNotes: 'Peppery spice, mustard heat, clean finish.',
    isNew: false,
    isFeatured: false,
  },
  {
    name: 'Artisan Microgreens Kit',
    category: 'microgreens',
    price: 28.00,
    stock: 12,
    stockStatus: 'instock',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
    ],
    shortDescription: 'Variety pack — monthly subscription. Curated selection of 4 premium microgreen varieties.',
    description: 'A premium gift set featuring our four most popular microgreens. Perfect for home chefs and wellness enthusiasts.',
    nutrition: ['Multi-vitamin', 'Enzyme-rich', 'Antioxidants'],
    flavorNotes: 'Varied — from sweet pea to peppery radish.',
    isNew: true,
    isFeatured: true,
  },
  {
    name: 'Broccoli Microgreens',
    category: 'microgreens',
    price: 11.00,
    stock: 0,
    stockStatus: 'outofstock',
    image: 'https://images.unsplash.com/photo-1593280359364-8044e03fbc46?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1593280359364-8044e03fbc46?w=600&q=80',
    ],
    shortDescription: 'Superfood broccoli sprouts. Highest sulforaphane content of any microgreen.',
    description: 'Known for their exceptional sulforaphane content, our broccoli microgreens are a nutritional powerhouse.',
    nutrition: ['Sulforaphane', 'Vitamin K', 'Calcium'],
    flavorNotes: 'Mild broccoli, slightly bitter, clean.',
    isNew: false,
    isFeatured: false,
  },
  // STO GOLD (CANDLES)
  {
    name: 'Nordic Forest Candle',
    category: 'candles',
    price: 38.00,
    stock: 22,
    stockStatus: 'instock',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80',
    ],
    shortDescription: 'Deep pine, birch bark, and forest earth. 60-hour burn time.',
    description: 'Hand-poured in Helsinki using organic soy wax, cotton wick, and pure Nordic essential oils. A sensory walk through Finnish forest.',
    nutrition: ['Soy Wax', 'Cotton Wick', '60h Burn'],
    flavorNotes: 'Pine, birch, moss, earth.',
    isNew: false,
    isFeatured: true,
  },
  {
    name: 'Midnight Sauna Candle',
    category: 'candles',
    price: 42.00,
    stock: 8,
    stockStatus: 'lowstock',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80',
    ],
    shortDescription: 'Warm birch steam and smoked cedar. Inspired by Finnish sauna culture.',
    description: 'Capture the essence of midnight sauna ritual. Warm, woody, and meditative. Our most beloved seasonal scent.',
    nutrition: ['Organic Soy', 'Lead-free Wick', '55h Burn'],
    flavorNotes: 'Birch steam, cedar smoke, amber warmth.',
    isNew: true,
    isFeatured: true,
  },
  {
    name: 'Arctic Light Candle',
    category: 'candles',
    price: 35.00,
    stock: 30,
    stockStatus: 'instock',
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&q=80',
    ],
    shortDescription: 'Clean white musk, icy bergamot, and pale birch. Bright and airy.',
    description: 'Inspired by the crisp Finnish winter light. Fresh, clean, and luminous. Perfect for minimalist Nordic spaces.',
    nutrition: ['Natural Fragrance', 'Vegan Wax', '65h Burn'],
    flavorNotes: 'Bergamot, white musk, birch, clean air.',
    isNew: false,
    isFeatured: false,
  },
];

const BLOGS = [
  {
    slug: 'microgreens-40x-more-nutritious',
    title: 'Why Microgreens Are 40× More Nutritious Than Mature Vegetables',
    category: 'Nutrition Science',
    tags: ['Science'],
    readTime: '5 min read',
    date: 'April 2025',
    excerpt:
      'Research from the USDA and University of Maryland reveals that microgreens pack a stunning nutritional punch — up to 40 times the vitamins and antioxidants of their fully grown counterparts.',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=1200&q=80',
    color: '#1B3A2D',
    content: `Microgreens are young vegetable greens harvested just after the first true leaves have developed. But don't let their small size fool you — these tiny plants are nutritional powerhouses that dwarf their mature counterparts in concentration of nutrients.

**The Science Behind the Numbers**

A landmark study published in the *Journal of Agricultural and Food Chemistry* found that microgreens contain up to 40 times higher levels of vital nutrients compared to mature leaves of the same plant. For red cabbage microgreens alone, researchers measured vitamin C concentrations 6 times higher, vitamin K levels 69 times higher, and vitamin E concentrations 40 times higher than in the mature vegetable.

**Why Does This Happen?**

The secret lies in the cotyledon stage — the developmental phase when the first seed leaves emerge. During this phase, the plant is still drawing on the dense nutritional reserves packed into the seed, while simultaneously beginning photosynthesis. This creates an extraordinary window of maximum nutrient density that lasts only 7–14 days.

**What Nutrients Are We Talking About?**

Depending on the variety, microgreens are rich in:
- **Vitamin C** — immune defense and collagen synthesis
- **Vitamin K** — bone health and blood coagulation
- **Vitamin E** — antioxidant protection of cell membranes
- **Beta-carotene** — vision and skin health
- **Sulforaphane** — particularly in broccoli microgreens, linked to cancer prevention

**Practical Impact on Your Daily Diet**

A single handful of STO Green pea shoot microgreens added to your morning salad or smoothie delivers a nutrient density equivalent to consuming several cups of mature greens. This makes them an incredibly efficient tool for wellness — particularly valuable for those with limited appetite, children, or anyone optimizing their nutritional intake.

The Nordic approach to food has always emphasized quality over quantity, and microgreens embody that philosophy perfectly: small in portion, extraordinary in impact.`,
    status: 'Published'
  },
  {
    slug: 'microgreens-immunity',
    title: 'Microgreens & Immunity: How Your Plate Can Strengthen Your Defenses',
    category: 'Wellness',
    tags: ['Health'],
    readTime: '4 min read',
    date: 'March 2025',
    excerpt:
      "Your immune system is only as strong as the nutrients you feed it. Discover how the antioxidant-rich profile of microgreens supports your body's natural defenses year-round.",
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
    color: '#2C3E20',
    content: `The immune system is a complex network of cells, tissues, and organs that work together to defend the body against harmful pathogens. What many people don't realize is that nutrition plays a foundational role in how effectively this network operates — and microgreens offer one of the most concentrated sources of immune-supporting nutrients available.

**Antioxidants: The Frontline Defense**

Microgreens are extraordinarily rich in antioxidants — compounds that neutralize free radicals before they damage cells and trigger inflammation. Sunflower microgreens contain particularly high levels of vitamin E, a fat-soluble antioxidant that protects the membranes of immune cells from oxidative stress.

Radish microgreens, such as our STO Green Radish variety, contain glucosinolates that are metabolized into isothiocyanates — potent anti-inflammatory compounds that help regulate immune response pathways.

**Vitamin C and Immune Cell Production**

Vitamin C is perhaps the most well-known immune nutrient. It stimulates the production and function of white blood cells, particularly lymphocytes and phagocytes, which help protect the body against infection. Pea shoot microgreens are an excellent source, providing concentrated vitamin C without the sugar load of citrus fruits.

**The Gut-Immune Connection**

Approximately 70% of the immune system resides in the gut — in the form of gut-associated lymphoid tissue (GALT). The dietary fiber in microgreens feeds beneficial gut bacteria, which in turn support immune regulation. A diverse, healthy gut microbiome is one of the strongest predictors of robust immune function.

**Seasonal Eating in the Finnish Climate**

Finland's long, dark winters present a particular challenge for immune health — reduced sunlight limits vitamin D synthesis, and cold temperatures drive people indoors where airborne pathogens spread more easily. Supplementing your winter diet with fresh, locally grown STO Green microgreens provides a concentrated source of nutrients that help bridge the nutritional gaps created by seasonal variation.

Adding even a small portion of mixed microgreens to your daily meals throughout the winter months is a simple, evidence-based strategy for supporting your immune system when it needs it most.`,
    status: 'Published'
  },
  {
    slug: 'inside-our-vertical-farm',
    title: 'From Seed to Plate: Inside Our Helsinki Vertical Farm',
    category: 'Behind the Scenes',
    tags: ['Our Process'],
    readTime: '6 min read',
    date: 'February 2025',
    excerpt:
      "Step inside STO's climate-controlled vertical growing facility and discover how we go from seed to harvest in 7–14 days, without soil, pesticides, or seasonal limitations.",
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80',
    color: '#1C2A1E',
    content: `Urban vertical farming represents one of the most significant shifts in food production of the 21st century. Rather than relying on vast horizontal fields exposed to weather, soil conditions, and seasonal cycles, vertical farms stack growing trays in climate-controlled indoor environments where every variable — light, temperature, humidity, CO₂ concentration — is precisely managed.

**Why We Chose the Indoor Vertical Model**

Helsinki's climate is magnificent, but it's not forgiving for year-round outdoor cultivation. With growing seasons limited to roughly May through September, outdoor farming in Finland cannot meet demand for fresh produce during the long Nordic winter. Indoor vertical farming eliminates this constraint entirely.

At STO's growing facility in Vantaa, we produce fresh microgreens every week of the year — regardless of whether it's -20°C outside or a warm summer afternoon. This means you receive the same extraordinary freshness and nutritional quality in January as in July.

**The Growing Cycle: Day by Day**

*Days 1–2: Seeding*
Organic, non-GMO seeds are spread evenly across our growing trays at carefully calibrated densities. Each variety — pea, sunflower, radish, broccoli — has its own optimal seeding density that balances yield with air circulation and quality.

*Days 2–5: Blackout Germination*
Trays are stacked and covered to simulate the darkness of being underground. This encourages the seeds to focus energy on developing strong root systems. The process also results in longer, more tender stems.

*Days 5–14: Growth Under Full-Spectrum LED*
Once germination is complete, trays are moved under our custom full-spectrum LED arrays. The light spectrum is tuned to mimic the optimal wavelengths for photosynthesis while minimizing heat output. The controlled environment accelerates growth to a fraction of the time required for outdoor cultivation.

*Day 7–14: Harvest*
Each variety is harvested at its specific optimal point — the cotyledon stage when nutrient density peaks. Our team hand-harvests every tray with ceramic scissors, ensuring a clean cut that preserves freshness and shelf life.

**Water: 95% Less Than Traditional Farming**

One of the most compelling environmental advantages of our system is water efficiency. Our recirculating hydroponic system uses up to 95% less water than conventional soil farming for equivalent yields. The water is filtered, pH-adjusted, and nutrient-enriched, then returned to the system — a closed loop that minimizes waste.

**From Harvest to Your Door in 24 Hours**

Every order is packed within hours of harvest and dispatched for next-day delivery across the Helsinki metropolitan area. This 24-hour farm-to-table window is something no supermarket supply chain can match — and it's the reason our microgreens taste unlike anything you'll find on a store shelf.`,
    status: 'Published'
  },
  {
    slug: 'sulforaphane-broccoli-microgreens',
    title: 'Sulforaphane: The Compound in Broccoli Microgreens That Scientists Are Excited About',
    category: 'Nutrition Science',
    tags: ['Science'],
    readTime: '5 min read',
    date: 'January 2025',
    excerpt:
      "Sulforaphane — found in extraordinary concentrations in broccoli microgreens — is one of the most studied phytochemicals in nutritional medicine. Here's what the research says.",
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=1200&q=80',
    color: '#1A2F35',
    content: `Of all the bioactive compounds found in the plant kingdom, few have attracted as much scientific attention in recent years as sulforaphane. This naturally occurring isothiocyanate — found in cruciferous vegetables and in exceptionally high concentrations in broccoli microgreens — has been the subject of hundreds of peer-reviewed studies investigating its potential role in cancer prevention, brain health, cardiovascular protection, and anti-aging.

**What Is Sulforaphane?**

Sulforaphane is not present in broccoli seeds or sprouts in its active form. Instead, it exists as a precursor called glucoraphanin. When broccoli plant tissue is damaged — by chewing, cutting, or processing — an enzyme called myrosinase is released. This enzyme converts glucoraphanin into sulforaphane through a chemical reaction that occurs within seconds.

This is why freshly harvested, raw broccoli microgreens deliver far more sulforaphane than cooked broccoli — heat deactivates myrosinase. Our STO Green Broccoli Microgreens, consumed raw and fresh, are one of the most bioavailable sources of sulforaphane available.

**The Research: What We Know**

*Cancer Research*
Research from Johns Hopkins University — where sulforaphane was first isolated in 1992 — found that broccoli sprouts contain 10–100 times more sulforaphane precursors than mature broccoli. Sulforaphane activates Nrf2, a transcription factor that upregulates the production of antioxidant and detoxification enzymes in cells.

*Brain Health*
A 2017 study published in *Translational Psychiatry* found that sulforaphane supplementation improved working memory and social cognition in young men with autism spectrum disorder. Other studies are investigating its potential role in schizophrenia and neurodegenerative diseases.

*Cardiovascular Protection*
Sulforaphane has been shown to reduce arterial inflammation, improve blood pressure regulation, and reduce levels of oxidized LDL cholesterol — three of the primary drivers of cardiovascular disease.

*Blood Sugar Regulation*
A study in *Science Translational Medicine* found that sulforaphane-rich broccoli extract significantly reduced fasting blood glucose in obese patients with type 2 diabetes, with an effect comparable to the commonly prescribed drug metformin.

**How to Maximize Sulforaphane Intake**

- Eat broccoli microgreens raw — cooking destroys myrosinase
- Add to salads, grain bowls, or smoothies right before consumption
- Pair with mustard seeds, which contain their own myrosinase and can boost sulforaphane production from cooked cruciferous vegetables

Our STO Green Broccoli Microgreens are grown to maximize glucoraphanin content, harvested at the optimal stage, and delivered fresh within 24 hours — ensuring you receive the maximum therapeutic benefit from this extraordinary compound.`,
    status: 'Published'
  },
  {
    slug: 'microgreens-vs-sprouts',
    title: "Microgreens vs Sprouts: What's the Difference and Which is Better?",
    category: "Beginner's Guide",
    tags: ['Guide'],
    readTime: '3 min read',
    date: 'December 2024',
    excerpt:
      "Both sprouts and microgreens come from seeds, but they're very different in terms of growth stage, nutrition, food safety, and culinary application. Here's what you need to know.",
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=1200&q=80',
    color: '#2A2018',
    content: `When customers first discover microgreens, one of the most common questions we hear is: "What's the difference between microgreens and sprouts? Aren't they basically the same thing?"

The short answer: no. While both start from seeds, they are fundamentally different products in terms of how they're grown, their nutritional profile, food safety considerations, and how they're best used in cooking.

**Sprouts: The Germination Stage**

Sprouts are germinated seeds — typically eaten root, seed, and all — that are harvested just 2–7 days after germination begins. They are grown in water, without soil or a growing medium, in humid and dark conditions.

Because sprouts are grown in warm, moist environments with minimal airflow, they have historically been associated with a higher risk of bacterial contamination (E. coli, Salmonella), which is why health authorities recommend that immunocompromised individuals avoid raw sprouts.

**Microgreens: The Cotyledon Stage**

Microgreens are harvested later in the growth cycle — 7–21 days after germination, depending on the variety — at the point when the first true leaves have just emerged. They are grown in a growing medium (soil or hydroponic substrate), in light, with good airflow.

This growing environment significantly reduces the risk of bacterial contamination compared to sprouts. Microgreens are cut above the growing medium at harvest, so only the stem and leaves are consumed.

**Nutritional Comparison**

Both sprouts and microgreens are nutritionally dense, but the evidence suggests microgreens have an advantage in certain key nutrients. A USDA-funded study found that microgreens of most species tested had significantly higher concentrations of vitamins C, E, and K, as well as carotenoids, than their mature counterparts.

Sprouts do have advantages in certain enzyme content and digestibility, particularly for those following raw food diets.

**Culinary Applications**

*Sprouts* are delicate, mild in flavor, and work well in:
- Sandwiches and wraps
- Asian salads
- Light soups

*Microgreens* are more intense in flavor, with distinct variety-specific taste profiles, and shine in:
- Gourmet salads and grain bowls
- Garnishes for fine dining plating
- Smoothies and cold-pressed juices
- Avocado toast and Nordic-style open sandwiches

**Our Recommendation**

For maximum nutritional benefit and culinary versatility, microgreens are the superior choice for most home cooks and health-conscious consumers. Their flavor complexity, safety profile, and extraordinary nutrient density make them one of the most valuable additions you can make to your daily diet.

Start with our STO Green Nordic Pea Shoots for a mild, sweet introduction to the world of microgreens, then explore the bolder, peppery character of our Radish variety once your palate is accustomed to these living greens.`,
    status: 'Published'
  },
];

async function seed() {
  try {
    console.log('🌱 Starting STO database seed...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Blog.deleteMany({});
    await Order.deleteMany({});
    console.log('   Done.\n');

    // Seed admin user
    console.log('👤 Creating admin user...');
    const admin = await User.create(ADMIN_USER);
    console.log(`   Admin created: ${admin.username} / password: admin123\n`);

    // Seed customers
    console.log('👥 Creating sample customers...');
    const customers = await User.insertMany(CUSTOMERS);
    customers.forEach(c => console.log(`   ✅ ${c.username} (${c.email})`));
    console.log(`   ${customers.length} customers created.\n`);

    // Seed categories
    console.log('📁 Seeding categories...');
    const cats = await Category.insertMany(CATEGORIES);
    cats.forEach(c => console.log(`   ✅ ${c.name} (${c.slug})`));
    console.log(`   ${cats.length} categories seeded.\n`);

    // Seed products
    console.log('📦 Seeding products...');
    const prods = await Product.insertMany(PRODUCTS);
    prods.forEach(p => console.log(`   ✅ ${p.name} — €${p.price}`));
    console.log(`   ${prods.length} products seeded.\n`);

    // Seed blogs
    console.log('📝 Seeding blogs...');
    const blogs = await Blog.insertMany(BLOGS);
    blogs.forEach(b => console.log(`   ✅ ${b.title} [${b.status}]`));
    console.log(`   ${blogs.length} blogs seeded.\n`);

    // Seed orders
    console.log('🛒 Seeding orders...');
    const sampleOrders = [
      {
        user: customers[0]._id,
        items: [
          {
            product: prods[0]._id,
            name: prods[0].name,
            quantity: 2,
            price: prods[0].price,
            image: prods[0].image
          }
        ],
        totalAmount: prods[0].price * 2,
        status: 'delivered',
        shippingAddress: {
          fullName: 'Aino Mäkinen',
          address: 'Keskuskatu 1',
          city: 'Helsinki',
          postalCode: '00100',
          country: 'Finland',
          phone: '0401234567'
        }
      },
      {
        user: customers[1]._id,
        items: [
          {
            product: prods[5]._id,
            name: prods[5].name,
            quantity: 1,
            price: prods[5].price,
            image: prods[5].image
          },
          {
            product: prods[6]._id,
            name: prods[6].name,
            quantity: 1,
            price: prods[6].price,
            image: prods[6].image
          }
        ],
        totalAmount: prods[5].price + prods[6].price,
        status: 'processing',
        shippingAddress: {
          fullName: 'Erik Lindström',
          address: 'Mannerheimintie 10',
          city: 'Helsinki',
          postalCode: '00100',
          country: 'Finland',
          phone: '0509876543'
        }
      },
      {
        user: customers[2]._id,
        items: [
          {
            product: prods[1]._id,
            name: prods[1].name,
            quantity: 3,
            price: prods[1].price,
            image: prods[1].image
          }
        ],
        totalAmount: prods[1].price * 3,
        status: 'shipped',
        shippingAddress: {
          fullName: 'Liisa Korhonen',
          address: 'Aleksanterinkatu 5',
          city: 'Tampere',
          postalCode: '33100',
          country: 'Finland',
          phone: '0456789012'
        }
      }
    ];

    const orders = await Order.insertMany(sampleOrders);
    console.log(`   ${orders.length} orders seeded.\n`);

    console.log('═══════════════════════════════════════════');
    console.log('🎉 STO Database seeded successfully!');
    console.log('═══════════════════════════════════════════');
    console.log(`\n📊 Summary:`);
    console.log(`   👤 Admin users: 1`);
    console.log(`   👥 Customers: ${customers.length}`);
    console.log(`   📁 Categories: ${cats.length}`);
    console.log(`   📦 Products: ${prods.length}`);
    console.log(`   📝 Blogs: ${blogs.length}`);
    console.log(`   🛒 Orders: ${orders.length}`);
    console.log(`\n🔑 Admin Login:`);
    console.log(`   Username: admin`);
    console.log(`   Password: admin123`);
    console.log(`\n🔗 Login URL: http://localhost:5173/admin/login`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seed();
