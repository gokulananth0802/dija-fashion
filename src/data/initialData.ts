import { Product, CategoryInfo, Review } from '../types';

export const STORE_INFO = {
  name: 'Dija Fashion',
  tagline: "Elegance Redefined • Erode's Trusted Women's Fashion Destination",
  address: '25, Madurai Veeran Kovil Street, KAS Nagar, Karungalpalayam, Erode, Tamil Nadu 638003',
  phone: '+91 63740 52425',
  whatsappNumber: '916374052425',
  instagramHandle: '@dija_fashion_6',
  instagramUrl: 'https://www.instagram.com/dija_fashion_6',
  hours: 'Mon–Sat: 9:30 AM – 8:30 PM',
  googleRating: 5.0,
  googleReviewCount: '500+',
  marketStalls: [
    { day: 'Monday Night', time: '9:30 PM Onwards', location: 'Erode Weekly Pop-Up Market' },
    { day: 'Sunday Market', time: '6:30 PM Onwards', location: 'Karungalpalayam Night Bazaar' }
  ],
  erodePinCodes: ['638001', '638002', '638003', '638004', '638008', '638009', '638011', '638012']
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'All',
    name: 'All Collections',
    nameTamil: 'அனைத்து ஆடைகள்',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400',
    itemCount: 9
  },
  {
    id: 'Kurtis & Sets',
    name: 'Kurtis & Sets',
    nameTamil: 'குர்திகள் & செட்கள்',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400',
    itemCount: 3
  },
  {
    id: 'Sarees',
    name: 'Sarees',
    nameTamil: 'புடவைகள்',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=400',
    itemCount: 2
  },
  {
    id: 'Party Wear',
    name: 'Party Wear',
    nameTamil: 'பார்ட்டி வேர்',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400',
    itemCount: 1
  },
  {
    id: 'Tops & Tunics',
    name: 'Tops & Tunics',
    nameTamil: 'டாப்ஸ் & டியூனிக்ஸ்',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400',
    itemCount: 2
  },
  {
    id: 'Nightwear',
    name: 'Nightwear',
    nameTamil: 'நைட்வேர்',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=400',
    itemCount: 1
  },
  {
    id: 'Wholesale',
    name: 'Wholesale',
    nameTamil: 'மொத்த விற்பனை',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=400',
    itemCount: 2
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'df-101',
    title: 'Royal Organza Anarkali Kurti Set',
    titleTamil: 'ராயல் ஆர்கன்சா அனார்கலி குர்தி செட்',
    category: 'Kurtis & Sets',
    price: 1350,
    mrp: 1899,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
    additionalImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    fabricCare: 'Pure Premium Organza Silk with Cotton Lining. Dry Clean Only.',
    fabricCareTamil: 'தூய ஆர்கன்சா சில்க் பட்டி பருத்தி லைனிங். டிரை கிளீன் செய்ய பரிந்துரைக்கப்படுகிறது.',
    description: 'Elegantly tailored floor-length organza Anarkali flared kurti featuring delicate floral digital prints, hand-beaded neckline, and matching organza dupatta with scalloped borders.',
    descriptionTamil: 'அழகான டிஜிட்டல் பூ அச்சு மற்றும் கழுத்து வேலைப்பாடுகளுடன் கூடிய ஆர்கன்சா அனார்கலி குர்தி மற்றும் துப்பட்டா செட்.',
    tag: 'NEW ARRIVAL',
    inStock: true,
    featured: true,
    color: 'Dusty Rose Pink',
    code: 'DF-ANK-01'
  },
  {
    id: 'df-102',
    title: 'Kanchipuram Soft Silk Saree',
    titleTamil: 'காஞ்சிபுரம் சாஃப்ட் சில்க் புடவை',
    category: 'Sarees',
    price: 1899,
    mrp: 2599,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800',
    sizes: ['Free Size'],
    fabricCare: 'Rich Soft Silk with Zari Woven Border. Includes Running Unstitched Blouse Piece.',
    fabricCareTamil: 'மென்மையான பட்டு ஜரி பார்டர் கொண்டது. ஜாக்கெட் துணி இணைக்கப்பட்டுள்ளது.',
    description: 'Exquisite Emerald Green soft silk saree adorned with intricate traditional gold zari weave, peacock motifs on pallu, and heavy borders perfect for temple wear and family celebrations.',
    descriptionTamil: 'மரகத பச்சை வண்ண சாஃப்ட் சில்க் புடவை, பாரம்பரிய தங்கம் ஜரி வேலைப்பாட்டுடன் கூடியது.',
    tag: 'BESTSELLER',
    inStock: true,
    featured: true,
    color: 'Deep Emerald Green',
    code: 'DF-SAR-02'
  },
  {
    id: 'df-103',
    title: 'Festive Designer Velvet Lehenga',
    titleTamil: 'ஃபெஸ்டிவ் டிசைனர் வெல்வெட் லெஹங்கா',
    category: 'Party Wear',
    price: 2999,
    mrp: 4299,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
    fabricCare: 'Heavy Micro Velvet with Zardozi Work & Net Dupatta. Professional Dry Clean.',
    fabricCareTamil: 'ஹெவி மைக்ரோ வெல்வெட் ஜர்தோசி வேலைப்பாடு. உலர் சுத்திகரிப்பு மட்டுமே.',
    description: 'Breathtaking Wine Maroon designer velvet lehenga set embellished with intricate zari embroidery, sequin work, and a matching embellished blouse and net dupatta.',
    descriptionTamil: 'பாரம்பரிய திருமண விழாக்களுக்கு உகந்த ரிச் வெல்வெட் லெஹங்கா செட்.',
    tag: 'LIMITED STOCK',
    inStock: true,
    featured: true,
    color: 'Wine Maroon',
    code: 'DF-LHG-03'
  },
  {
    id: 'df-104',
    title: 'Cotton Dailywear Floral Peplum Top',
    titleTamil: 'காட்டன் தினசரி பூக்கள் பிரிண்ட் டாப்',
    category: 'Tops & Tunics',
    price: 499,
    mrp: 799,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabricCare: '100% Pure Breathable South Cotton. Gentle Hand Wash or Machine Wash.',
    fabricCareTamil: '100% தூய பருத்தி துணி. கைகளால் அல்லது வாஷிங் மெஷினில் துவைக்கலாம்.',
    description: 'Ultra-comfortable Jaipuri indigo floral printed peplum top with V-neckline and elasticated cuff sleeves. Breathable and stylish for daily college, office, and market outings.',
    descriptionTamil: 'தினசரி பயன்பாட்டிற்கு ஏற்ற காற்றோட்டமான தூய காட்டன் பெப்லம் டாப்.',
    tag: 'NEW ARRIVAL',
    inStock: true,
    color: 'Indigo Blue Floral',
    code: 'DF-TOP-04'
  },
  {
    id: 'df-105',
    title: 'Mulberry Silk Nightwear Lounge Set',
    titleTamil: 'மல்பெரி சில்க் நைட்வேர் செட்',
    category: 'Nightwear',
    price: 750,
    mrp: 1199,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=800',
    sizes: ['M', 'L', 'XL', 'XXL'],
    fabricCare: 'Soft Satin Mulberry Finish. Gentle Cold Water Wash.',
    fabricCareTamil: 'மென்மையான சாடின் துணி. குளிர்ந்த நீரில் மெதுவாக துவைக்கவும்.',
    description: 'Luxurious button-down collar nightwear shirt and elastic waist pyjama combo with contrast piping. Unbeatable skin comfort and elegant sheen.',
    descriptionTamil: 'சொகுசான மென்மையான சாடின் நைட்வேர் ஷர்ட் மற்றும் பைஜாமா செட்.',
    tag: 'BESTSELLER',
    inStock: true,
    color: 'Blush Rose Gold',
    code: 'DF-NGT-05'
  },
  {
    id: 'df-106',
    title: 'Lucknowi Chikankari Georgette Kurti Set',
    titleTamil: 'லக்னோவி சிக்கன்காரி ஜார்ஜெட் குர்தி செட்',
    category: 'Kurtis & Sets',
    price: 1150,
    mrp: 1599,
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabricCare: 'Fox Georgette with Hand-Embroidered Threadwork & Matching Inner Cotton Top.',
    fabricCareTamil: 'கைவேலைப்பாடு செய்யப்பட்ட சிக்கன்காரி நூல்வேலைப்பாடு கொண்டது.',
    description: 'Authentic Lucknow-style hand chikankari embroidered georgette straight kurti paired with cotton palazzo and matching inner. Soft pastel hues for elegant casual wear.',
    descriptionTamil: 'கைத்தறி லக்னோவி நூல் தையல் வேலைப்பாடு கொண்ட நேர்த்தியான குர்தி.',
    tag: 'BESTSELLER',
    inStock: true,
    color: 'Sky Blue & White',
    code: 'DF-CHK-06'
  },
  {
    id: 'df-107',
    title: 'Bandhani Print Cotton Silk Saree',
    titleTamil: 'பந்தனி அச்சு காட்டன் சில்க் புடவை',
    category: 'Wholesale',
    price: 1299,
    mrp: 1799,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
    sizes: ['Free Size'],
    fabricCare: 'Cotton Silk Blend with Foil Print Border. Mild Shampoo Wash.',
    fabricCareTamil: 'காட்டன் சில்க் புடவை பந்தனி டிசைனுடன் கூடியது.',
    description: 'Traditional Gujarati Bandhani tie-and-dye printed saree with rich zari woven border. Available for retail purchase as well as bulk wholesale orders at special tier pricing.',
    descriptionTamil: 'பாரம்பரிய பந்தனி அச்சு கொண்ட புடவை. மொத்த வியாபார ஆர்டர்களுக்கும் கிடைக்கும்.',
    tag: 'WHOLESALE AVAILABLE',
    inStock: true,
    color: 'Rani Pink & Gold',
    code: 'DF-BAN-07'
  },
  {
    id: 'df-108',
    title: 'Rayon Printed Tunics Combo Set (2 Pcs)',
    titleTamil: 'ரேயான் பிரிண்டட் டியூனிக் காம்போ (2 துண்டுகள்)',
    category: 'Tops & Tunics',
    price: 899,
    mrp: 1299,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    sizes: ['M', 'L', 'XL', 'XXL'],
    fabricCare: '14Kg Heavy Premium Rayon. Easy Machine Wash.',
    fabricCareTamil: 'உயர்தர மென்மையான ரேயான் துணி. எளிதில் துவைக்கலாம்.',
    description: 'Combo pack of 2 stylish flared rayon tunics featuring vibrant traditional ethnic prints and comfortable wooden button details. Unbeatable value pack!',
    descriptionTamil: 'இரண்டு ரேயான் டியூனிக்குகள் அடங்கிய காம்போ செட். சிறந்த விலை மதிப்பு.',
    tag: 'HOT SALE',
    inStock: true,
    color: 'Multicolor Pack',
    code: 'DF-CMB-08'
  },
  {
    id: 'df-109',
    title: 'Handloom Tussar Linen Saree',
    titleTamil: 'கைத்தறி துசார் லைனன் புடவை',
    category: 'Sarees',
    price: 1650,
    mrp: 2200,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800',
    sizes: ['Free Size'],
    fabricCare: 'Pure Handloom Organic Linen Tussar. Dry Wash First Recommended.',
    fabricCareTamil: 'இயற்கை கைத்தறி துசார் லைனன் பட்டு. முதல் முறை உலர் துவைப்பு நலம்.',
    description: 'Classy handloom linen tussar saree with subtle contrast tassels and running designer blouse piece. Breathable, lightweight, and perfect for working women and official gatherings.',
    descriptionTamil: 'அலுவலகம் மற்றும் விழாக்களுக்கு ஏற்ற மெல்லிய எடை கொண்ட கைத்தறி புடவை.',
    tag: 'NEW ARRIVAL',
    inStock: true,
    color: 'Mustard Gold & Cream',
    code: 'DF-LIN-09'
  }
];

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Priya S.',
    location: 'Karungalpalayam, Erode',
    rating: 5,
    comment: 'Amazing collection of Organza Anarkalis and Sarees! Quality is top notch and prices start right at ₹380. Same day local delivery in KAS Nagar was so helpful!',
    date: '2 days ago',
    verifiedBuyer: true,
    productName: 'Royal Organza Anarkali Kurti Set'
  },
  {
    id: 'rev-2',
    author: 'Kavitha R.',
    location: 'Perundurai Road, Erode',
    rating: 5,
    comment: 'Visited their pop-up market stall on Sunday evening. Bought 3 dailywear tops for office. Very friendly staff and genuine prices. Highly recommended boutique in Erode!',
    date: '1 week ago',
    verifiedBuyer: true,
    productName: 'Cotton Dailywear Floral Peplum Top'
  },
  {
    id: 'rev-3',
    author: 'Deepa M.',
    location: 'Surampatti, Erode',
    rating: 5,
    comment: 'Ordered soft silk saree on WhatsApp. They sent live video preview before dispatching. Delivered to my doorstep within 3 hours! Exceptional customer service.',
    date: '2 weeks ago',
    verifiedBuyer: true,
    productName: 'Kanchipuram Soft Silk Saree'
  },
  {
    id: 'rev-4',
    author: 'Shalini K.',
    location: 'Bhavani, Tamil Nadu',
    rating: 5,
    comment: 'Best wholesale options for resellers. I bought 10 pieces of Bandhani printed sarees. Fabric is super soft and my customers loved it!',
    date: '3 weeks ago',
    verifiedBuyer: true,
    productName: 'Bandhani Print Cotton Silk Saree'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'insta-1',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400',
    likes: '482',
    caption: '✨ New Anarkali arrivals dropping today at Dija Fashion! Swipe for details.'
  },
  {
    id: 'insta-2',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=400',
    likes: '620',
    caption: '💚 Traditional Emerald Soft Silk saree for festive celebrations.'
  },
  {
    id: 'insta-3',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400',
    likes: '389',
    caption: '👑 Wine Maroon velvet lehenga collection now live!'
  },
  {
    id: 'insta-4',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400',
    likes: '295',
    caption: '☀️ Dailywear cotton peplum tops starting ₹499 only.'
  },
  {
    id: 'insta-5',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=400',
    likes: '512',
    caption: '🌸 Lucknowi Chikankari pastel vibes for summer weddings.'
  },
  {
    id: 'insta-6',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=400',
    likes: '410',
    caption: '🛍️ Visit us at Karungalpalayam, Erode or DM us to order on WhatsApp!'
  }
];
