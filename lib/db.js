import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'data', 'db.json');
let cache = null;

const DESC_EN = {
  m01: 'Signature chicken cooked in a rich Dhaka-style masala.',
  m02: 'Crispy, spicy fried chicken pakora.',
  m03: 'Our special qalfi chicken, house style.',
  m04: 'Four juicy tandoori chicken drumsticks.',
  m05: 'Dry masala chicken platter, perfect for sharing.',
  m06: 'Whole jumbo chicken in our special recipe.',
  m07: 'Chinese-style fried rice with chicken and vegetables.',
  m08: 'Light and flavorful chicken suffoof rice.',
  m09: 'Egg fried rice with a great taste.',
  m10: 'Vegetable rice with fresh vegetables.',
  m11: 'Our special chicken biryani with authentic spices and basmati rice.',
  m12: 'Desi chicken karahi with fresh tomatoes and special masala.',
  m13: 'Desi murgha cooked in the famous Ghaffar Baba style.',
  m14: 'Desi murgha prepared in the Qandhari style.',
  m15: 'Special mutton karahi with prime mutton.',
  m16: 'Rich mutton qorma slow-cooked in yogurt and spices.',
  m17: 'Tender, creamy mutton pasanda.',
  m18: 'Royal-style mutton shahi jahani.',
  m19: 'Mutton cooked with special dustarkhani masala.',
  m20: 'Charred, spicy mutton roast.',
  m21: 'Coal-grilled mutton tikka.',
  m22: 'Buttery roghni naan with sesame seeds.',
  m23: 'Garlic naan with butter and garlic.',
  m24: 'Crispy tandoori paratha.',
  m25: 'Special roghni peeth served with makhan and malai.',
  m26: 'Refreshing mint margarita with fresh lemon.',
  m27: 'Fresh lime with soda or water.',
  m28: 'Coke, Sprite, Fanta and more.',
  m29: 'Special khaman pack drink.',
  m30: '1.5 litre bottle, all flavors.',
  m31: 'Pure mineral water bottle.',
  m32: 'Traditional paya, slow cooked.',
  m33: 'Creamy kheer topped with pistachios.',
};

const CAT_DESC_EN = {
  c1: 'Our signature chicken dishes',
  c2: 'Fried rice & biryani',
  c3: 'Traditional desi chicken dishes',
  c4: 'Special mutton dishes',
  c5: 'Fresh naan & breads',
  c6: 'Cold drinks & desserts',
};

function seed() {
  const now = Date.now();
  const data = {
    settings: {
      nameUr: 'العزيز ریسٹورنٹ',
      nameEn: 'Al Aziz Restaurant',
      tagline: 'اصلی ذائقہ، ہماری پہچان',
      location: 'Sahiwal, Pakistan',
      address: 'Street # 2, Near Al Aziz Restaurant, Sahiwal, Punjab, Pakistan',
      phone: '0319 6526413',
      eta: '35 - 45 min',
      deliveryFee: 50,
      freeDeliveryAbove: 1500,
      discountPercent: 10,
      discountNote: 'تمام آرڈرز پر',
      promoTitle: 'اصل ذائقہ اب آپ کے قریب',
      promoTitleEn: 'Authentic taste, now near you',
      discountNoteEn: 'on all orders',
      admin: { username: 'admin', password: 'admin123' },
    },
    categories: [
      { id: 'c1', ur: 'چکن اسپیشل', en: 'Chicken Special', desc: 'ہمارے خصوصی چکن ڈشز', image: '/img/chicken-special.jpg' },
      { id: 'c2', ur: 'رائس', en: 'Rice', desc: 'فرائیڈ رائس اور بریانی', image: '/img/rice.jpg' },
      { id: 'c3', ur: 'اسپیشل دیسی مرغہ', en: 'Sp. Desi Murgha', desc: 'دیسی مرغ کے لازوابال پکوان', image: '/img/desi.jpg' },
      { id: 'c4', ur: 'اسپیشل مٹن', en: 'Special Mutton', desc: 'مٹن کی خصوصی اقسام', image: '/img/mutton-special.jpg' },
      { id: 'c5', ur: 'تندور', en: 'Tandoor', desc: 'تازہ نان اور روٹیاں', image: '/img/tandoor.jpg' },
      { id: 'c6', ur: 'کولڈ ڈرنک', en: 'Cold Drinks', desc: 'ٹھنڈے مشروبات اور میٹھے', image: '/img/mint.jpg' },
    ],
    menu: [
      // ---- Chicken Special ----
      { id: 'm01', catId: 'c1', nameUr: 'چکن ڈھاکا', nameEn: 'Chicken Dhaka', desc: 'خاص مسالوں سے تیار کردہ مزیدار چکن ڈھاکا۔', price: 1050, options: [], rating: 4.6, reviews: 120, image: '/img/chicken-special.jpg', stock: 15, available: true, recipe: { chicken: 0.8 } },
      { id: 'm02', catId: 'c1', nameUr: 'چکن پکڑہ', nameEn: 'Chicken Pakora', desc: 'کراری اور مسالیدار چکن پکڑہ۔', price: 1400, options: [{ label: 'Half', price: 700 }, { label: 'Full', price: 1400 }], rating: 4.5, reviews: 95, image: '/img/chicken-special.jpg', stock: 20, available: true, recipe: { chicken: 0.5 } },
      { id: 'm03', catId: 'c1', nameUr: 'پیزا قلفی چکن', nameEn: 'Pizza Qalfi Chicken', desc: 'ہمارے خاص انداز میں تیار کردہ قلفی چکن۔', price: 1050, options: [], rating: 4.4, reviews: 80, image: '/img/chicken-special.jpg', stock: 15, available: true, recipe: { chicken: 0.7 } },
      { id: 'm04', catId: 'c1', nameUr: 'ڈرم اسٹک 4 پیس', nameEn: 'Drumsticks (4 pcs)', desc: 'تندوری مسالیدار چکن ڈرم اسٹک، 4 پیس۔', price: 950, options: [], rating: 4.7, reviews: 140, image: '/img/chicken-special.jpg', stock: 25, available: true, recipe: { chicken: 0.6 } },
      { id: 'm05', catId: 'c1', nameUr: 'چکن پلیٹر ڈرائی', nameEn: 'Chicken Platter Dry', desc: 'خشک مسالیدار چکن پلیٹر، خاندان کے لیے۔', price: 1500, options: [{ label: 'Half', price: 800 }, { label: 'Full', price: 1500 }], rating: 4.6, reviews: 110, image: '/img/chicken-special.jpg', stock: 12, available: true, recipe: { chicken: 0.9 } },
      { id: 'm06', catId: 'c1', nameUr: 'جمبو چکن', nameEn: 'Jumbo Chicken', desc: 'بڑا جمبو چکن، خصوصی ترکیب سے تیار۔', price: 1399, options: [], rating: 4.5, reviews: 90, image: '/img/chicken-special.jpg', stock: 10, available: true, recipe: { chicken: 1.2 } },
      // ---- Rice ----
      { id: 'm07', catId: 'c2', nameUr: 'چکن فرائیڈ رائس', nameEn: 'Chicken Fried Rice', desc: 'چکن اور سبزیوں کے ساتھ چینی طرز کی فرائیڈ رائس۔', price: 800, options: [], rating: 4.4, reviews: 85, image: '/img/rice.jpg', stock: 25, available: true, recipe: { rice: 0.3, chicken: 0.2 } },
      { id: 'm08', catId: 'c2', nameUr: 'چکن سفوف رائس', nameEn: 'Chicken Suffoof Rice', desc: 'ہلکی اور لذیذ چکن سفوف رائس۔', price: 800, options: [], rating: 4.3, reviews: 60, image: '/img/rice.jpg', stock: 25, available: true, recipe: { rice: 0.3, chicken: 0.2 } },
      { id: 'm09', catId: 'c2', nameUr: 'ایگ فرائیڈ رائس', nameEn: 'Egg Fried Rice', desc: 'انڈے کے ساتھ خوش ذائقہ فرائیڈ رائس۔', price: 750, options: [], rating: 4.2, reviews: 55, image: '/img/rice.jpg', stock: 25, available: true, recipe: { rice: 0.3 } },
      { id: 'm10', catId: 'c2', nameUr: 'ویجیٹیبل رائس', nameEn: 'Vegetable Rice', desc: 'تازہ سبزیوں کے ساتھ ویجیٹیبل رائس۔', price: 750, options: [], rating: 4.2, reviews: 50, image: '/img/rice.jpg', stock: 25, available: true, recipe: { rice: 0.3 } },
      { id: 'm11', catId: 'c2', nameUr: 'چکن بریانی', nameEn: 'Chicken Biryani', desc: 'خاص مصالحوں اور اصلی چاولوں سے تیار ہماری اسپیشل چکن بریانی۔', price: 600, options: [], rating: 4.8, reviews: 230, image: '/img/biryani.jpg', stock: 40, available: true, recipe: { rice: 0.25, chicken: 0.25, spices: 0.02 } },
      // ---- Sp. Desi Murgha ----
      { id: 'm12', catId: 'c3', nameUr: 'اعزیزی اسپیشل دیسی مرغ کڑاہی', nameEn: 'Azizi Special Desi Murgh Karahi', desc: 'دیسی مرغ کی خصوصی کڑاہی، اصلی ٹماٹر اور مصالحوں کے ساتھ۔', price: 3700, options: [{ label: 'Half', price: 1900 }, { label: 'Full', price: 3700 }], rating: 4.8, reviews: 160, image: '/img/desi.jpg', stock: 10, available: true, recipe: { chicken: 1.2, tomato: 0.4, oil: 0.15 } },
      { id: 'm13', catId: 'c3', nameUr: 'اسپیشل دیسی مرغ غفار بابا', nameEn: 'Special Desi Murgh Ghaffar Baba', desc: 'غفار بابا اسپیشل ترکیب والا دیسی مرغ۔', price: 3700, options: [{ label: 'Half', price: 1900 }, { label: 'Full', price: 3700 }], rating: 4.7, reviews: 130, image: '/img/desi.jpg', stock: 10, available: true, recipe: { chicken: 1.2 } },
      { id: 'm14', catId: 'c3', nameUr: 'اسپیشل دیسی مرغ قندھاری', nameEn: 'Special Desi Murgh Qandhari', desc: 'قندھاری انداز میں تیار کردہ لذیذ دیسی مرغ۔', price: 3900, options: [{ label: 'Half', price: 2000 }, { label: 'Full', price: 3900 }], rating: 4.7, reviews: 120, image: '/img/desi.jpg', stock: 10, available: true, recipe: { chicken: 1.2 } },
      // ---- Special Mutton ----
      { id: 'm15', catId: 'c4', nameUr: 'اعزیزی اسپیشل مٹن کڑاہی', nameEn: 'Azizi Special Mutton Karahi', desc: 'اصلی مٹن سے تیار کردہ خصوصی کڑاہی۔', price: 3700, options: [{ label: 'Half', price: 1900 }, { label: 'Full', price: 3700 }], rating: 4.8, reviews: 170, image: '/img/mutton-special.jpg', stock: 12, available: true, recipe: { mutton: 1.0, tomato: 0.4, oil: 0.15 } },
      { id: 'm16', catId: 'c4', nameUr: 'اسپیشل مٹن قورمہ', nameEn: 'Special Mutton Qorma', desc: 'دہی اور مصالحوں میں پکا ہوا خاص مٹن قورمہ۔', price: 3900, options: [{ label: 'Half', price: 2000 }, { label: 'Full', price: 3900 }], rating: 4.7, reviews: 140, image: '/img/mutton-special.jpg', stock: 12, available: true, recipe: { mutton: 1.0, yogurt: 0.3 } },
      { id: 'm17', catId: 'c4', nameUr: 'مٹن پسندہ', nameEn: 'Mutton Pasanda', desc: 'نرم اور ملائی دار مٹن پسندہ۔', price: 3900, options: [{ label: 'Half', price: 2000 }, { label: 'Full', price: 3900 }], rating: 4.6, reviews: 100, image: '/img/mutton-special.jpg', stock: 10, available: true, recipe: { mutton: 1.0, yogurt: 0.3 } },
      { id: 'm18', catId: 'c4', nameUr: 'مٹن شاہی جہانی', nameEn: 'Mutton Shahi Jahani', desc: 'شاہی انداز میں تیار کردہ مٹن۔', price: 3800, options: [{ label: 'Half', price: 1950 }, { label: 'Full', price: 3800 }], rating: 4.6, reviews: 95, image: '/img/mutton-special.jpg', stock: 10, available: true, recipe: { mutton: 1.0 } },
      { id: 'm19', catId: 'c4', nameUr: 'مٹن دسترخانی', nameEn: 'Mutton Dastarkhani', desc: 'دسترخانی مخصوص مصالحے والا مٹن۔', price: 3800, options: [{ label: 'Half', price: 1950 }, { label: 'Full', price: 3800 }], rating: 4.5, reviews: 85, image: '/img/mutton-special.jpg', stock: 10, available: true, recipe: { mutton: 1.0 } },
      { id: 'm20', catId: 'c4', nameUr: 'مٹن روسٹ', nameEn: 'Mutton Roast', desc: 'تندوری مسالیدار مٹن روسٹ۔', price: 3800, options: [{ label: 'Half', price: 1950 }, { label: 'Full', price: 3800 }], rating: 4.6, reviews: 90, image: '/img/mutton-special.jpg', stock: 10, available: true, recipe: { mutton: 1.0 } },
      { id: 'm21', catId: 'c4', nameUr: 'مٹن تکہ', nameEn: 'Mutton Tikka', desc: 'کوئلوں پر پکا ہوا مزیدار مٹن تکہ۔', price: 3800, options: [{ label: 'Half', price: 1950 }, { label: 'Full', price: 3800 }], rating: 4.7, reviews: 110, image: '/img/mutton-special.jpg', stock: 12, available: true, recipe: { mutton: 1.0 } },
      // ---- Tandoor ----
      { id: 'm22', catId: 'c5', nameUr: 'اسپیشل روغنی نان', nameEn: 'Special Roghni Naan', desc: 'مکھن اور تل والا خوشبودار روغنی نان۔', price: 70, options: [], rating: 4.7, reviews: 210, image: '/img/tandoor.jpg', stock: 80, available: true, recipe: { flour: 0.12, milk: 0.05 } },
      { id: 'm23', catId: 'c5', nameUr: 'گارلک نان', nameEn: 'Garlic Naan', desc: 'لہسن اور مکھن والا گارلک نان۔', price: 100, options: [], rating: 4.6, reviews: 150, image: '/img/tandoor.jpg', stock: 60, available: true, recipe: { flour: 0.12 } },
      { id: 'm24', catId: 'c5', nameUr: 'تندوری پراٹھا', nameEn: 'Tandoori Paratha', desc: 'تندور میں پکا ہوا کرارا پراٹھا۔', price: 90, options: [], rating: 4.5, reviews: 120, image: '/img/tandoor.jpg', stock: 60, available: true, recipe: { flour: 0.15 } },
      { id: 'm25', catId: 'c5', nameUr: 'روغنی پیٹھ (مکھن، ملائی)', nameEn: 'Roghni Peeth (Makhan, Malai)', desc: 'مکھن اور ملائی کے ساتھ خاص روغنی پیٹھ۔', price: 150, options: [], rating: 4.6, reviews: 90, image: '/img/tandoor.jpg', stock: 40, available: true, recipe: { flour: 0.15, milk: 0.1 } },
      // ---- Cold Drinks & Desserts ----
      { id: 'm26', catId: 'c6', nameUr: 'اعزیزی اسپیشل منٹ مارگریٹا', nameEn: 'Azizi Special Mint Margarita', desc: 'تازہ پودینہ اور لیموں سے بنی ٹھنڈی مارگریٹا۔', price: 200, options: [], rating: 4.7, reviews: 130, image: '/img/mint.jpg', stock: 40, available: true },
      { id: 'm27', catId: 'c6', nameUr: 'فریش لائم', nameEn: 'Fresh Lime', desc: 'تازہ لیموں کا رس، سودا یا پانی کے ساتھ۔', price: 150, options: [], rating: 4.5, reviews: 90, image: '/img/mint.jpg', stock: 50, available: true },
      { id: 'm28', catId: 'c6', nameUr: 'ریگولر ڈرنک', nameEn: 'Regular Drink', desc: 'کوک، سپرائیٹ، فینٹا وغیرہ۔', price: 70, options: [], rating: 4.3, reviews: 60, image: '/img/mint.jpg', stock: 100, available: true },
      { id: 'm29', catId: 'c6', nameUr: 'خامن پیک', nameEn: 'Khaman Pack', desc: 'خاص خامن پیک ڈرنک۔', price: 120, options: [], rating: 4.4, reviews: 40, image: '/img/mint.jpg', stock: 50, available: true },
      { id: 'm30', catId: 'c6', nameUr: '1.5 لیٹر ڈرنک', nameEn: '1.5 Litre Drink', desc: '1.5 لیٹر بوتل، تمام فلیورز۔', price: 210, options: [], rating: 4.4, reviews: 50, image: '/img/mint.jpg', stock: 60, available: true },
      { id: 'm31', catId: 'c6', nameUr: '1.5 لیٹر منرل واٹر', nameEn: '1.5 Litre Mineral Water', desc: 'خالص منرل واٹر بوتل۔', price: 120, options: [], rating: 4.5, reviews: 40, image: '/img/mint.jpg', stock: 80, available: true },
      { id: 'm32', catId: 'c6', nameUr: 'اسپیشل پاے', nameEn: 'Special Paya', desc: 'سری پائے، دیرینہ روایتی ناشتہ۔', price: 100, options: [], rating: 4.6, reviews: 110, image: '/img/desi.jpg', stock: 30, available: true, recipe: { mutton: 0.2 } },
      { id: 'm33', catId: 'c6', nameUr: 'اسپیشل کھیر', nameEn: 'Special Kheer', desc: 'دودھ اور پستہ سے تیار کردہ خاص کھیر۔', price: 200, options: [], rating: 4.7, reviews: 120, image: '/img/kheer.jpg', stock: 30, available: true, recipe: { milk: 0.3, rice: 0.1 } },
    ],
    inventory: [
      { id: 'rice', name: 'Basmati Rice', unit: 'kg', stock: 42, low: 10, cost: 550 },
      { id: 'chicken', name: 'Chicken / Desi Murgha', unit: 'kg', stock: 35, low: 8, cost: 650 },
      { id: 'mutton', name: 'Mutton', unit: 'kg', stock: 22, low: 6, cost: 1400 },
      { id: 'flour', name: 'Wheat Flour', unit: 'kg', stock: 30, low: 8, cost: 120 },
      { id: 'yogurt', name: 'Yogurt', unit: 'kg', stock: 12, low: 4, cost: 300 },
      { id: 'tomato', name: 'Tomatoes', unit: 'kg', stock: 6, low: 5, cost: 180 },
      { id: 'spices', name: 'Special Masala', unit: 'kg', stock: 7, low: 2, cost: 1200 },
      { id: 'milk', name: 'Fresh Milk', unit: 'L', stock: 25, low: 8, cost: 220 },
      { id: 'oil', name: 'Cooking Oil', unit: 'L', stock: 14, low: 5, cost: 550 },
    ],
    staff: [
      { id: 's1', name: 'Muhammad Ali', role: 'Head Chef', phone: '0300-1234567', salary: 45000, status: 'On Duty', joined: '2021-05-10' },
      { id: 's2', name: 'Bilal Ahmed', role: 'BBQ Chef', phone: '0301-2345678', salary: 38000, status: 'On Duty', joined: '2022-02-01' },
      { id: 's3', name: 'Ayesha Bibi', role: 'Kitchen Helper', phone: '0302-3456789', salary: 25000, status: 'Off Duty', joined: '2023-08-15' },
      { id: 's4', name: 'Usman Tariq', role: 'Delivery Rider', phone: '0303-4567890', salary: 30000, status: 'On Duty', joined: '2023-01-20' },
      { id: 's5', name: 'Fatima Noor', role: 'Cashier', phone: '0304-5678901', salary: 28000, status: 'On Duty', joined: '2024-04-01' },
    ],
    orders: [
      {
        id: 'AGH2356',
        items: [
          { menuId: 'm11', nameUr: 'چکن بریانی', nameEn: 'Chicken Biryani', image: '/img/biryani.jpg', qty: 1, price: 600, option: '' },
          { menuId: 'm22', nameUr: 'اسپیشل روغنی نان', nameEn: 'Special Roghni Naan', image: '/img/tandoor.jpg', qty: 2, price: 70, option: '' },
          { menuId: 'm26', nameUr: 'اعزیزی اسپیشل منٹ مارگریٹا', nameEn: 'Azizi Special Mint Margarita', image: '/img/mint.jpg', qty: 1, price: 200, option: '' },
        ],
        customer: { name: 'Ali Raza', phone: '0304 6721962', address: 'Street # 2, Near Al-Ghazi Hotel, Sahiwal, Punjab, Pakistan' },
        payment: 'cod', subtotal: 940, deliveryFee: 50, total: 990,
        status: 'preparing',
        timeline: { placed: now - 40 * 60000, confirmed: now - 32 * 60000, preparing: now - 20 * 60000 },
        createdAt: now - 40 * 60000,
      },
      {
        id: 'AGH2341',
        items: [
          { menuId: 'm15', nameUr: 'اعزیزی اسپیشل مٹن کڑاہی', nameEn: 'Azizi Special Mutton Karahi', image: '/img/mutton-special.jpg', qty: 1, price: 1900, option: 'Half' },
          { menuId: 'm23', nameUr: 'گارلک نان', nameEn: 'Garlic Naan', image: '/img/tandoor.jpg', qty: 2, price: 100, option: '' },
        ],
        customer: { name: 'Sana Khan', phone: '0312 5557788', address: 'House 14, Model Town, Sahiwal' },
        payment: 'cash', subtotal: 2100, deliveryFee: 0, total: 2100,
        status: 'delivered',
        timeline: { placed: now - 86400000, confirmed: now - 86400000 + 5 * 60000, preparing: now - 86400000 + 12 * 60000, delivery: now - 86400000 + 25 * 60000, delivered: now - 86400000 + 45 * 60000 },
        createdAt: now - 86400000,
      },
    ],
  };
  data.menu = data.menu.map((m) => ({ ...m, descEn: DESC_EN[m.id] || '' }));
  data.categories = data.categories.map((c) => ({ ...c, descEn: CAT_DESC_EN[c.id] || '' }));
  return data;
}

function persist() {
  try {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(cache, null, 2), 'utf8');
  } catch (e) {
    // Read-only filesystem (e.g. Vercel serverless) — keep data in memory only.
  }
}

export function readDB() {
  if (cache) return cache;
  try {
    cache = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch (e) {
    cache = seed();
    persist();
  }
  return cache;
}

export function writeDB() {
  persist();
}
