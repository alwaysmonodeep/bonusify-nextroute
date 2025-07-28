// src/data/companies.js
export const companies = [
  {
    id: 1,
    name: "Myntra",
    slug: "myntra",
    logo: "/images/brands/myntra.svg",
    badge: "Sale Live",
    cashback: "7%",
    qty: "Upto",
    type: "Cashback",
    terms: {
      rate: "7%",
      desc: "Cashback on all Orders | 10 times per user in a month",
      conditions: [
        "Only use coupon codes mentioned on CashKaro and mCaffeine website",
        "Cashback applicable on all fashion categories including clothing, footwear, and accessories",
        "Valid for both new and existing users with active CashKaro account",
      ],
      cashbackSlabs: [
        {
          rate: "7%",
          category: "Men's Sports Footwear & Luggage / Travel Accessories",
          maxCashback: "₹21",
        },
        {
          rate: "2.1%",
          category:
            "Fashion and Lifestyle (Bags, Clothing, Footwear, Eyewear, Watches, Lingerie, Accessories and Fashion Jewellery)",
        },
        { rate: "1.4%", category: "Beauty and Personal Care Products" },
      ],
    },
    benefits: [
      {
        image:
          "https://www.dealsshutter.com/uploads/social_images/stores/myntra-social-12-oct-1539335161.png",
        alt: "Free Shipping",
      },
      {
        image:
          "https://cardinsider.com/wp-content/uploads/2024/09/Instant-Discount-on-Myntra-With-Axis-Bank-Credit-Cards.webp",
        alt: "Easy Returns",
      },
      {
        image:
          "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2023/11/myntra-diwali-dhamaka-brings-a-number-of-online-deals-for-dhanteras-shopping-1699281392.jpg",
        alt: "Myntra Insider",
      },
    ],
    timeline: [
      { title: "Cashback tracks in", value: "30", unit: "Days" },
      { title: "Cashback confirms in", value: "70", unit: "Days" },
    ],
  },
  {
    id: 2,
    name: "Flipkart",
    slug: "flipkart",
    logo: "/images/brands/flipkart.png",
    badge: "Sale Live",
    cashback: "3.5%",
    qty: "Upto",
    type: "Cashback",
    terms: {
      rate: "3.5%",
      desc: "Cashback on all Orders | 8 times per user in a month",
      conditions: [
        "Valid only on purchases made through CashKaro links",
        "Cashback applicable on most categories except books and gift cards",
      ],
      cashbackSlabs: [
        {
          rate: "3.5%",
          category:
            "Home Decor, Home Furnishing, Home Improvement, Household Supplies, Kitchen & Dining, Kitchen, Cookware, Pet Supplies, Tools & Hardware",
        },
        {
          rate: "2.8%",
          category:
            "Books & General Merchandise (Beauty, Auto Accessory, Toys, Personal Care, Books & Media, Baby Care, Sports, Food & Nutrition)",
        },
        {
          rate: "2.1%",
          category:
            "Fully Automatic, Front Load, Washing Machine, Clothes Dryer, Dishwasher",
        },
      ],
    },
    benefits: [
      {
        image:
          "https://assets.indiadesire.com/images/Flipkart%20Electronics%20Sale%20may%202023.jpg",
        alt: "Flipkart Electronics Sale",
      },
      {
        image:
          "https://realpricetracker.com/wp-content/uploads/2024/05/flipkart-upcoming-sale-3.jpg",
        alt: "Flipkart Electronics Sale",
      },
      {
        image: "https://pbs.twimg.com/media/E7E888SWUAQFwLY.jpg:large",
        alt: "Flipkart Electronics Sale",
      },
    ],
    timeline: [
      { title: "Cashback tracks in", value: "45", unit: "Days" },
      { title: "Cashback confirms in", value: "90", unit: "Days" },
    ],
  },
  {
    id: 3,
    name: "HDFC Bank",
    slug: "hdfc-bank",
    logo: "/images/brands/hdfc.png",
    cashback: "₹1100",
    type: "Rewards",
    terms: {
      rate: "₹1100",
      desc: "Welcome Bonus on Credit Card | One time per user",
      conditions: [
        "Valid only for new HDFC credit card applications",
        "Welcome bonus credited after first transaction within 90 days",
      ],
      cashbackSlabs: [
        { rate: "₹1100", category: "Welcome Bonus on Credit Card Application" },
      ],
    },
    benefits: [
      {
        image:
          "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/8e8532c4-9454-403c-90d3-038e2031a995/Personal/quick_links/LP_Banner_1000.jpg",
        alt: "Flipkart Electronics Sale",
      },
    ],
    timeline: [
      { title: "Reward tracks in", value: "15", unit: "Days" },
      { title: "Reward confirms in", value: "30", unit: "Days" },
    ],
  },
  {
    id: 4,
    name: "Nykaa",
    slug: "nykaa",
    logo: "/images/brands/nyakaa.svg",
    badge: "50% off",
    cashback: "7%",
    qty: "Upto",
    type: "Cashback",
    terms: {
      rate: "7%",
      desc: "Cashback on all Beauty Orders | 6 times per user in a month",
      conditions: [
        "Valid on beauty and personal care products only",
        "Cashback is applicable only 6 times per month for each user",
      ],
      cashbackSlabs: [
        { rate: "7%", category: "Beauty and Personal Care Products" },
        { rate: "4%", category: "Luxury and Premium Brand Products" },
        { rate: "2%", category: "Fashion and Accessories" },
      ],
    },
    benefits: [
     {
        image:
          "https://images-static.nykaa.com/uploads/0c8cbf60-3604-4953-a21d-e1d861a21d33.jpg?tr=cm-pad_resize,w-600",
        alt: "Flipkart Electronics Sale",
      },
      {
        image:
          "https://shoppinggreedy.com/wp-content/uploads/2025/02/Nykaa-New-User-Offer.jpg",
        alt: "Flipkart Electronics Sale",
      },
      {
        image: "https://images-static.nykaa.com/uploads/579f0ee8-270d-4467-aa25-3517882e9a86.jpg?tr=cm-pad_resize,w-600",
        alt: "Flipkart Electronics Sale",
      },
    ],
    timeline: [
      { title: "Cashback tracks in", value: "60", unit: "Days" },
      { title: "Cashback confirms in", value: "85", unit: "Days" },
    ],
  },
  {
    id: 5,
    name: "Amazon",
    slug: "amazon",
    logo: "/images/brands/amazon.webp",
    badge: "Sale Live",
    cashback: "6%",
    qty: "Upto",
    type: "Reward",
    terms: {
      rate: "6%",
      desc: "Rewards on all Orders | 12 times per user in a month",
      conditions: [
        "Valid on most product categories except gift cards",
        "Amazon Pay balance purchases are not eligible for rewards",
      ],
      cashbackSlabs: [
        { rate: "6%", category: "Electronics and Mobile Phones" },
        { rate: "4%", category: "Fashion, Beauty and Home & Kitchen" },
        { rate: "2.5%", category: "Books, Sports and Automotive" },
        { rate: "1%", category: "Grocery and Amazon Fresh" },
      ],
    },
    benefits: [
      {
        image:
          "https://www.livemint.com/lm-img/img/2024/08/07/original/story_generic_Amazon_freedom_sale_1723020397762.jpg",
        alt: "Flipkart Electronics Sale",
      },
      {
        image:
          "https://asset22.ckassets.com/resources/image/staticpage_images/Grocery-1583490781.jpg",
        alt: "Flipkart Electronics Sale",
      },
      {
        image: "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Fashion/Event/N2GL_sep/Ingress-SEP.jpg",
        alt: "Flipkart Electronics Sale",
      },
    ],
  },
  {
    id: 6,
    name: "Zandu",
    slug: "zandu",
    logo: "/images/brands/zandu.png",
    badge: "Flat 35% Off",
    cashback: "18%",
    qty: "Flat",
    type: "Cashback",
    terms: {
      rate: "18%",
      desc: "Flat Cashback on all Health Products | 3 times per user in a month",
      conditions: [
        "Valid on all Zandu health and wellness products",
        "Prescription medicines require valid prescription for cashback",
      ],
      cashbackSlabs: [
        { rate: "18%", category: "All Zandu Health and Wellness Products" },
      ],
    },
    benefits: [
{
        image:
          "https://zanducare.com/cdn/shop/collections/Zandu_Coupons_and_Offers.png?v=1738235865",
        alt: "Flipkart Electronics Sale",
      },
      {
        image:
          "https://realpricetracker.com/wp-content/uploads/2024/05/flipkart-upcoming-sale-3.jpg",
        alt: "Flipkart Electronics Sale",
      },
      {
        image: "https://pbs.twimg.com/media/E7E888SWUAQFwLY.jpg:large",
        alt: "Flipkart Electronics Sale",
      },
    ],
    timeline: [
      { title: "Cashback tracks in", value: "25", unit: "Days" },
      { title: "Cashback confirms in", value: "45", unit: "Days" },
    ],
  },
  {
    id: 7,
    name: "MakeMyTrip",
    slug: "makemytrip",
    logo: "/images/brands/makemytrip.png",
    cashback: "15%",
    qty: "Flat",
    type: "Cashback",
    terms: {
      rate: "15%",
      desc: "Flat Cashback on all Bookings | 2 times per user in a month",
      conditions: [
        "Valid on flights, hotels, and holiday packages",
        "Cashback confirmation depends on successful trip completion",
      ],
      cashbackSlabs: [
        { rate: "15%", category: "Flights, Hotels, and Holiday Packages" },
      ],
    },
    benefits: [
      {
        image:
          "https://cdn.grabon.in/gograbon/images/web-images/uploads/1737026050815/Make-my-trip-offers.jpg",
        alt: "hdfc offer",
      },
      {
        image:
          "https://www.icicibank.com/content/dam/icicibank/india/managed-assets/images/offer-zone/debit-card/travel-monday-offer-d1.webp",
        alt: "hdfc offer",
      },
      {
        image:
          "https://promos.makemytrip.com/Hotels_product/PhonePe/720x360-Affiliates-banner-1.jpg",
        alt: "hdfc offer",
      },
    ],
    timeline: [
      { title: "Cashback tracks in", value: "10", unit: "Days" },
      { title: "Cashback confirms in", value: "120", unit: "Days" },
    ],
  },
  {
    id: 8,
    name: "boAt",
    slug: "boat",
    logo: "/images/brands/boat.png",
    badge: "Sale Live",
    cashback: "5%",
    qty: "Flat",
    type: "Cashback",
    terms: {
      rate: "5%",
      desc: "Flat Cashback on all Audio Products | 5 times per user in a month",
      conditions: [
        "Valid on all boAt audio and lifestyle products",
        "Flat rate applies on all product categories",
      ],
      cashbackSlabs: [
        { rate: "5%", category: "All boAt Audio and Lifestyle Products" },
      ],
    },
    benefits: [
      {
        image:
          "https://assets.indiadesire.com/images/boat%20lifestyle%20offer%20dec%202021.jpg",
        alt: "boat offer",
      },
      {
        image:
          "https://www.boat-lifestyle.com/cdn/shop/articles/boat.jpg?v=1654852575",
        alt: "hdfc offer",
      },
      {
        image:
          "https://www.boat-lifestyle.com/cdn/shop/files/Artboard_1_cbd1491e-6f5f-4afd-abe4-accc71ecee6c_600x.png?v=1750938655",
        alt: "hdfc offer",
      },
    ],
    timeline: [
      { title: "Cashback tracks in", value: "35", unit: "Days" },
      { title: "Cashback confirms in", value: "55", unit: "Days" },
    ],
  },
  {
    id: 9,
    name: "IndiGo",
    slug: "indigo",
    logo: "/images/brands/indigo.png",
    badge: "30% Off",
    cashback: "₹1000",
    type: "Cashback",
    terms: {
      rate: "₹1000",
      desc: "Fixed Cashback on Flight Bookings | 1 time per user in a month",
      conditions: [
        "Valid on domestic and international flight bookings",
        "Minimum booking value of ₹5000 required",
      ],
      cashbackSlabs: [
        {
          rate: "₹1000",
          category: "Domestic and International Flight Bookings",
          minOrder: "₹5000",
        },
      ],
    },
    benefits: [
      {
        image:
          "https://images.via.com/static/dynimg/search_page/88/normal/1222311154-1222311153_indigo-sale-899-offerjpg.jpg",
        alt: "boat offer",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHErkhb-nUXcLyExTbXgv8S9A_IYZNswXKZg&s",
        alt: "hdfc offer",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbi5dc5DWciVzZOcNzRRiPthmrTA40BeIfAA&s",
        alt: "hdfc offer",
      },
    ],
    timeline: [
      { title: "Cashback tracks in", value: "5", unit: "Days" },
      { title: "Cashback confirms in", value: "180", unit: "Days" },
    ],
  },
  {
    id: 10,
    name: "Levi's",
    slug: "levis",
    logo: "/images/brands/livis.svg",
    badge: "40% Off",
    cashback: "10%",
    qty: "Flat",
    type: "Cashback",
    terms: {
      rate: "10%",
      desc: "Flat Cashback on all Apparel | 4 times per user in a month",
      conditions: [
        "Valid on all Levi's jeans, shirts, and accessories",
        "Sale items and clearance products are eligible for cashback",
      ],
      cashbackSlabs: [
        { rate: "10%", category: "All Levi's Jeans, Shirts, and Accessories" },
      ],
    },
    benefits: [
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_T0QoctvOKVS4dg29f_rTDq6FAHYIxZHtJQ&s",
        alt: "boat offer",
      },
      {
        image:
          "https://cdn.grabon.in/gograbon/images/web-images/uploads/1701936429910/levis-coupon-codes.jpg",
        alt: "hdfc offer",
      },
      {
        image:
          "https://jcpenney.scene7.com/is/image/jcpenneyimages/30-off-levis-b125c9ff-ec7f-4fcd-acdd-0c38ac9e08d6?scl=1&qlt=75",
        alt: "hdfc offer",
      },
    ],
    timeline: [
      { title: "Cashback tracks in", value: "40", unit: "Days" },
      { title: "Cashback confirms in", value: "75", unit: "Days" },
    ],
  },
  {
    id: 11,
    name: "OnePlus",
    slug: "oneplus",
    logo: "/images/brands/oneplus.png",
    badge: "New Launch",
    cashback: "8%",
    qty: "Upto",
    type: "Cashback",
    terms: {
      rate: "8%",
      desc: "Cashback on all Smartphone Orders | 2 times per user in a month",
      conditions: [
        "Valid on OnePlus smartphones and accessories",
        "Pre-order purchases eligible for cashback after product launch",
      ],
      cashbackSlabs: [
        { rate: "8%", category: "OnePlus Smartphones" },
        { rate: "5%", category: "OnePlus Accessories and Audio Products" },
        { rate: "3%", category: "OnePlus Wearables and Smart TVs" },
      ],
    },
    benefits: [
      {
        image:
          "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202409/oneplus-nord-4-5g-16113056-16x9.jpg?VersionId=0FeXoPM7TLc0k74u5jO.8EZcrIg.J12X",
        alt: "boat offer",
      },
    ],
    timeline: [
      { title: "Cashback tracks in", value: "15", unit: "Days" },
      { title: "Cashback confirms in", value: "90", unit: "Days" },
    ],
  },
  {
    id: 12,
    name: "Samsung",
    slug: "samsung",
    logo: "/images/brands/samsung.png",
    badge: "Mega Sale",
    cashback: "12%",
    qty: "Upto",
    type: "Cashback",
    terms: {
      rate: "12%",
      desc: "Cashback on all Electronics | 3 times per user in a month",
      conditions: [
        "Valid on Samsung smartphones, TVs, and home appliances",
        "Corporate bulk orders have different cashback terms",
      ],
      cashbackSlabs: [
        { rate: "12%", category: "Samsung Galaxy Smartphones and Tablets" },
        { rate: "8%", category: "Samsung Smart TVs and Audio Systems" },
        {
          rate: "6%",
          category: "Samsung Home Appliances (Refrigerators, Washing Machines)",
        },
        { rate: "4%", category: "Samsung Accessories and Wearables" },
      ],
    },
    benefits: [
      {
        image:
          "https://img.global.news.samsung.com/in/wp-content/uploads/2022/03/Blue-fest-3000x2000px.jpg",
        alt: "boat offer",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGt8mlZL9xFU7wZ5l2txcqfLSopu-yp5ScGw&s",
        alt: "hdfc offer",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8dSlgGoDEY8wa34pnHMlG2g2dFq7DWIOOOQ&s",
        alt: "hdfc offer",
      },
    ],
    timeline: [
      { title: "Cashback tracks in", value: "25", unit: "Days" },
      { title: "Cashback confirms in", value: "80", unit: "Days" },
    ],
  },
];
