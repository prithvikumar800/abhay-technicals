import {
  StorefrontProduct,
  StorefrontCategory,
  StorefrontBrand,
  StorefrontDeviceModel,
  CustomerOrder,
  DeliveryAddress,
} from '../types/index';

export const mockCategories: StorefrontCategory[] = [
  {
    "id": 21,
    "parentId": null,
    "name": "Back Panel",
    "slug": "back-panel",
    "sortOrder": 1,
    "isActive": true,
    "productCount": 425,
    "iconName": "Shield"
  },
  {
    "id": 178,
    "parentId": null,
    "name": "Mobile Batteries",
    "slug": "battery",
    "sortOrder": 2,
    "isActive": true,
    "productCount": 43,
    "iconName": "BatteryCharging"
  },
  {
    "id": 49,
    "parentId": null,
    "name": "Camera Glass",
    "slug": "camera-glass",
    "sortOrder": 3,
    "isActive": true,
    "productCount": 346,
    "iconName": "Camera"
  },
  {
    "id": 18,
    "parentId": null,
    "name": "Charging Connectors",
    "slug": "charging-connectors",
    "sortOrder": 4,
    "isActive": true,
    "productCount": 43,
    "iconName": "Cpu"
  },
  {
    "id": 17,
    "parentId": null,
    "name": "Charging Flex",
    "slug": "charging-flex",
    "sortOrder": 5,
    "isActive": true,
    "productCount": 55,
    "iconName": "Zap"
  },
  {
    "id": 236,
    "parentId": null,
    "name": "Display Connectors",
    "slug": "display-conectors",
    "sortOrder": 6,
    "isActive": true,
    "productCount": 22,
    "iconName": "Grid"
  },
  {
    "id": 167,
    "parentId": null,
    "name": "Fingerprint Sensor",
    "slug": "fingerprint-censor",
    "sortOrder": 7,
    "isActive": true,
    "productCount": 108,
    "iconName": "Fingerprint"
  },
  {
    "id": 26,
    "parentId": null,
    "name": "Keypad LCD",
    "slug": "keypad-lcd",
    "sortOrder": 8,
    "isActive": true,
    "productCount": 45,
    "iconName": "Monitor"
  },
  {
    "id": 32,
    "parentId": null,
    "name": "Main Flex",
    "slug": "main-flex",
    "sortOrder": 9,
    "isActive": true,
    "productCount": 252,
    "iconName": "Share2"
  },
  {
    "id": 25,
    "parentId": null,
    "name": "Microphone",
    "slug": "microphone",
    "sortOrder": 10,
    "isActive": true,
    "productCount": 7,
    "iconName": "Mic"
  },
  {
    "id": 22,
    "parentId": null,
    "name": "Middle Panel",
    "slug": "middle-panel",
    "sortOrder": 11,
    "isActive": true,
    "productCount": 138,
    "iconName": "Layers"
  },
  {
    "id": 24,
    "parentId": null,
    "name": "OCA Touch Glass",
    "slug": "oca-touch-glass",
    "sortOrder": 12,
    "isActive": true,
    "productCount": 27,
    "iconName": "Smartphone"
  },
  {
    "id": 20,
    "parentId": null,
    "name": "On / Off Flex",
    "slug": "on-off-flex",
    "sortOrder": 13,
    "isActive": true,
    "productCount": 401,
    "iconName": "Power"
  },
  {
    "id": 33,
    "parentId": null,
    "name": "Original Charging Flex",
    "slug": "orignal-charging-flex",
    "sortOrder": 14,
    "isActive": true,
    "productCount": 406,
    "iconName": "Sparkles"
  },
  {
    "id": 15,
    "parentId": null,
    "name": "Other Products",
    "slug": "other-products",
    "sortOrder": 15,
    "isActive": true,
    "productCount": 30,
    "iconName": "Package"
  },
  {
    "id": 50,
    "parentId": null,
    "name": "Side Rubber Key",
    "slug": "side-rubber-key",
    "sortOrder": 16,
    "isActive": true,
    "productCount": 138,
    "iconName": "Sliders"
  },
  {
    "id": 35,
    "parentId": null,
    "name": "SIM Holder",
    "slug": "sim-holder",
    "sortOrder": 17,
    "isActive": true,
    "productCount": 61,
    "iconName": "CreditCard"
  },
  {
    "id": 343,
    "parentId": null,
    "name": "Smart Phone",
    "slug": "smart-phone",
    "sortOrder": 18,
    "isActive": true,
    "productCount": 4,
    "iconName": "Smartphone"
  },
  {
    "id": 23,
    "parentId": null,
    "name": "Speaker",
    "slug": "speaker",
    "sortOrder": 19,
    "isActive": true,
    "productCount": 120,
    "iconName": "VolumeX"
  },
  {
    "id": 47,
    "parentId": null,
    "name": "Speaker Grill / Jali",
    "slug": "speaker-jali",
    "sortOrder": 20,
    "isActive": true,
    "productCount": 13,
    "iconName": "Disc"
  },
  {
    "id": 19,
    "parentId": null,
    "name": "Repair Tools",
    "slug": "tools",
    "sortOrder": 21,
    "isActive": true,
    "productCount": 38,
    "iconName": "Wrench"
  },
  {
    "id": 16,
    "parentId": null,
    "name": "Touch Pad",
    "slug": "touch-pad",
    "sortOrder": 22,
    "isActive": true,
    "productCount": 43,
    "iconName": "Tablet"
  },
  {
    "id": 230,
    "parentId": null,
    "name": "Volume Flex",
    "slug": "volume-flex",
    "sortOrder": 23,
    "isActive": true,
    "productCount": 66,
    "iconName": "Volume2"
  }
];

export const mockBrands: StorefrontBrand[] = [
  {
    "id": 1,
    "name": "Vivo",
    "slug": "vivo",
    "logoUrl": "/brands/vivo.svg",
    "isActive": true,
    "modelCount": 49
  },
  {
    "id": 2,
    "name": "Realme",
    "slug": "realme",
    "logoUrl": "/brands/realme.svg",
    "isActive": true,
    "modelCount": 33
  },
  {
    "id": 3,
    "name": "Apple",
    "slug": "apple",
    "logoUrl": "/brands/apple.svg",
    "isActive": true,
    "modelCount": 1
  },
  {
    "id": 4,
    "name": "Oppo",
    "slug": "oppo",
    "logoUrl": "/brands/oppo.svg",
    "isActive": true,
    "modelCount": 61
  },
  {
    "id": 5,
    "name": "Xiaomi",
    "slug": "xiaomi",
    "logoUrl": "/brands/xiaomi.svg",
    "isActive": true,
    "modelCount": 35
  },
  {
    "id": 6,
    "name": "Samsung",
    "slug": "samsung",
    "logoUrl": "/brands/samsung.svg",
    "isActive": true,
    "modelCount": 36
  },
  {
    "id": 7,
    "name": "OnePlus",
    "slug": "oneplus",
    "logoUrl": "/brands/oneplus.svg",
    "isActive": true,
    "modelCount": 9
  },
  {
    "id": 8,
    "name": "Motorola",
    "slug": "motorola",
    "logoUrl": "/brands/motorola.svg",
    "isActive": true,
    "modelCount": 31
  },
  {
    "id": 9,
    "name": "Infinix",
    "slug": "infinix",
    "logoUrl": "/brands/infinix.svg",
    "isActive": true,
    "modelCount": 13
  },
  {
    "id": 10,
    "name": "Poco",
    "slug": "poco",
    "logoUrl": "/brands/poco.svg",
    "isActive": true,
    "modelCount": 6
  },
  {
    "id": 11,
    "name": "Tecno",
    "slug": "tecno",
    "logoUrl": "/brands/tecno.svg",
    "isActive": true,
    "modelCount": 14
  },
  {
    "id": 12,
    "name": "Lava",
    "slug": "lava",
    "logoUrl": "/brands/lava.svg",
    "isActive": true,
    "modelCount": 8
  },
  {
    "id": 13,
    "name": "Itel",
    "slug": "itel",
    "logoUrl": "/brands/itel.svg",
    "isActive": true,
    "modelCount": 8
  },
  {
    "id": 14,
    "name": "Nokia",
    "slug": "nokia",
    "logoUrl": "/brands/nokia.svg",
    "isActive": true,
    "modelCount": 7
  },
  {
    "id": 15,
    "name": "Google Pixel",
    "slug": "google-pixel",
    "logoUrl": "/brands/pixel.svg",
    "isActive": true,
    "modelCount": 0
  }
];

export const mockModels: StorefrontDeviceModel[] = [
  {
    "id": 1,
    "brandId": 6,
    "brandName": "Samsung",
    "name": "Samsung Galaxy A22 5G  Housing with Middle Frame Ring",
    "slug": "samsung-galaxy-a22-5g-housing-with-middle-frame-ring",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 2,
    "brandId": 5,
    "brandName": "Xiaomi",
    "name": "Xiaomi Mi 10 Prime",
    "slug": "mi-10-prime",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 3,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto E13  &#8211; Blue",
    "slug": "moto-e13-8211-blue",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 4,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto E13  &#8211; Black",
    "slug": "moto-e13-8211-black",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 5,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto E13  &#8211; White",
    "slug": "moto-e13-8211-white",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 6,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto G64  &#8211; Purple",
    "slug": "moto-g64-8211-purple",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 7,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto G64  &#8211; Green",
    "slug": "moto-g64-8211-green",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 8,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto G64  &#8211; Blue",
    "slug": "moto-g64-8211-blue",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 9,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto G85  &#8211; Black",
    "slug": "moto-g85-8211-black",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 10,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto G85  &#8211; Red",
    "slug": "moto-g85-8211-red",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 11,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto G85  &#8211; Blue",
    "slug": "moto-g85-8211-blue",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 12,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto G04  &#8211; Green",
    "slug": "moto-g04-8211-green",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 13,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto G04  &#8211; Blue",
    "slug": "moto-g04-8211-blue",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 14,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto G04  &#8211; Red",
    "slug": "moto-g04-8211-red",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 15,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto G04  &#8211; Purple",
    "slug": "moto-g04-8211-purple",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 16,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Moto EDGE 60 Fusition  &#8211; Purple",
    "slug": "moto-edge-60-fusition-8211-purple",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 17,
    "brandId": 5,
    "brandName": "Xiaomi",
    "name": "Xiaomi Force BN63  for Redmi 10 / Mi 10 Prime",
    "slug": "force-bn63-for-redmi-10-mi-10-prime",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 18,
    "brandId": 5,
    "brandName": "Xiaomi",
    "name": "Xiaomi Force BN45  for Mi Note 5 Pro",
    "slug": "force-bn45-for-mi-note-5-pro",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 19,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Force NH50  for Moto G22 / Moto G13 / Moto G53 5G / Moto E13 / Moto E32",
    "slug": "force-nh50-for-moto-g22-moto-g13-moto-g53-5g-moto-e13-moto-e32",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 20,
    "brandId": 5,
    "brandName": "Xiaomi",
    "name": "Xiaomi Force BN4A  for Mi Note 7 / Mi Note 7S / Mi Note 7 Pro",
    "slug": "force-bn4a-for-mi-note-7-mi-note-7s-mi-note-7-pro",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 21,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Force JK50  for Motorola smartphones",
    "slug": "force-jk50-for-motorola-smartphones",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 22,
    "brandId": 1,
    "brandName": "Vivo",
    "name": "Vivo Force B-W3  for Vivo Y22 / Vivo Y22s",
    "slug": "force-b-w3-for-vivo-y22-vivo-y22s",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 23,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Force PC50  for Moto G14 / Moto G54 5G / Moto E14",
    "slug": "force-pc50-for-moto-g14-moto-g54-5g-moto-e14",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 24,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Force NG50  for Moto G71 5G / Moto G62",
    "slug": "force-ng50-for-moto-g71-5g-moto-g62",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 25,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Force NC50  for Moto G41 / Moto G32",
    "slug": "force-nc50-for-moto-g41-moto-g32",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 26,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Force ND50  for Moto G31 / Moto G42 / Moto G62 5G",
    "slug": "force-nd50-for-moto-g31-moto-g42-moto-g62-5g",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 27,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Force NE50  for Moto G52 / Moto G72 / Moto G82 5G",
    "slug": "force-ne50-for-moto-g52-moto-g72-moto-g82-5g",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 28,
    "brandId": 11,
    "brandName": "Tecno",
    "name": "Tecno Force BL-58BT  for Tecno Smartphones",
    "slug": "force-bl-58bt-for-tecno-smartphones",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 29,
    "brandId": 2,
    "brandName": "Realme",
    "name": "Realme Force BLP721  for Realme C2 / Oppo A1k",
    "slug": "force-blp721-for-realme-c2-oppo-a1k",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  },
  {
    "id": 30,
    "brandId": 8,
    "brandName": "Motorola",
    "name": "Motorola Force PC60  for Moto G54 5G / Moto G54 Power",
    "slug": "force-pc60-for-moto-g54-5g-moto-g54-power",
    "releaseYear": 2022,
    "isActive": true,
    "productCount": 1
  }
];

export const mockProducts: StorefrontProduct[] = [
  {
    "id": "22770",
    "sku": "AT-WC-22770",
    "slug": "samsung-galaxy-a22-5g-back-panel-housing-with-middle-frame-ring",
    "title": "Samsung Galaxy A22 5G Back Panel Housing with Middle Frame Ring",
    "description": "Samsung Galaxy A22 5G Back Panel Housing with Middle Frame Ring high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 19902,
      "name": "Samsung Galaxy A22 5G  Housing with Middle Frame Ring",
      "slug": "samsung-galaxy-a22-5g-housing-with-middle-frame-ring"
    },
    "retailPrice": 180,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/05/A22-5G-ring.png"
    ],
    "compatibleModels": [
      {
        "id": 19902,
        "name": "Samsung Galaxy A22 5G  Housing with Middle Frame Ring",
        "brandName": "Samsung",
        "slug": "samsung-galaxy-a22-5g-housing-with-middle-frame-ring"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-22770-1",
        "minQuantity": 5,
        "tierPrice": 171
      },
      {
        "id": "wt-22770-2",
        "minQuantity": 10,
        "tierPrice": 162
      },
      {
        "id": "wt-22770-3",
        "minQuantity": 50,
        "tierPrice": 153
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "20534",
    "sku": "AT-WC-20534",
    "slug": "mi-10-prime-back-panel",
    "title": "Mi 10 Prime Back Panel",
    "description": "Mi 10 Prime Back Panel high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 37966,
      "name": "Xiaomi Mi 10 Prime",
      "slug": "mi-10-prime"
    },
    "retailPrice": 130,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/10-prime.jpg"
    ],
    "compatibleModels": [
      {
        "id": 37966,
        "name": "Xiaomi Mi 10 Prime",
        "brandName": "Xiaomi",
        "slug": "mi-10-prime"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20534-1",
        "minQuantity": 5,
        "tierPrice": 123.5
      },
      {
        "id": "wt-20534-2",
        "minQuantity": 10,
        "tierPrice": 117
      },
      {
        "id": "wt-20534-3",
        "minQuantity": 50,
        "tierPrice": 110.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "20409",
    "sku": "AT-WC-20409",
    "slug": "moto-e13-back-panel-blue",
    "title": "Moto E13 Back Panel &#8211; Blue",
    "description": "Moto E13 Back Panel &#8211; Blue high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 82279,
      "name": "Motorola Moto E13  &#8211; Blue",
      "slug": "moto-e13-8211-blue"
    },
    "retailPrice": 130,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/E-13-blue.jpg"
    ],
    "compatibleModels": [
      {
        "id": 82279,
        "name": "Motorola Moto E13  &#8211; Blue",
        "brandName": "Motorola",
        "slug": "moto-e13-8211-blue"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20409-1",
        "minQuantity": 5,
        "tierPrice": 123.5
      },
      {
        "id": "wt-20409-2",
        "minQuantity": 10,
        "tierPrice": 117
      },
      {
        "id": "wt-20409-3",
        "minQuantity": 50,
        "tierPrice": 110.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "20408",
    "sku": "AT-WC-20408",
    "slug": "moto-e13-back-panel-black",
    "title": "Moto E13 Back Panel &#8211; Black",
    "description": "Moto E13 Back Panel &#8211; Black high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 72032,
      "name": "Motorola Moto E13  &#8211; Black",
      "slug": "moto-e13-8211-black"
    },
    "retailPrice": 130,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/E-13.jpg"
    ],
    "compatibleModels": [
      {
        "id": 72032,
        "name": "Motorola Moto E13  &#8211; Black",
        "brandName": "Motorola",
        "slug": "moto-e13-8211-black"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20408-1",
        "minQuantity": 5,
        "tierPrice": 123.5
      },
      {
        "id": "wt-20408-2",
        "minQuantity": 10,
        "tierPrice": 117
      },
      {
        "id": "wt-20408-3",
        "minQuantity": 50,
        "tierPrice": 110.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "20407",
    "sku": "AT-WC-20407",
    "slug": "moto-e13-back-panel-white",
    "title": "Moto E13 Back Panel &#8211; White",
    "description": "Moto E13 Back Panel &#8211; White high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 61618,
      "name": "Motorola Moto E13  &#8211; White",
      "slug": "moto-e13-8211-white"
    },
    "retailPrice": 130,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/E-13-white.jpg"
    ],
    "compatibleModels": [
      {
        "id": 61618,
        "name": "Motorola Moto E13  &#8211; White",
        "brandName": "Motorola",
        "slug": "moto-e13-8211-white"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20407-1",
        "minQuantity": 5,
        "tierPrice": 123.5
      },
      {
        "id": "wt-20407-2",
        "minQuantity": 10,
        "tierPrice": 117
      },
      {
        "id": "wt-20407-3",
        "minQuantity": 50,
        "tierPrice": 110.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "20406",
    "sku": "AT-WC-20406",
    "slug": "moto-g64-back-panel-purple",
    "title": "Moto G64 Back Panel &#8211; Purple",
    "description": "Moto G64 Back Panel &#8211; Purple high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 89929,
      "name": "Motorola Moto G64  &#8211; Purple",
      "slug": "moto-g64-8211-purple"
    },
    "retailPrice": 140,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/G64.png"
    ],
    "compatibleModels": [
      {
        "id": 89929,
        "name": "Motorola Moto G64  &#8211; Purple",
        "brandName": "Motorola",
        "slug": "moto-g64-8211-purple"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20406-1",
        "minQuantity": 5,
        "tierPrice": 133
      },
      {
        "id": "wt-20406-2",
        "minQuantity": 10,
        "tierPrice": 126
      },
      {
        "id": "wt-20406-3",
        "minQuantity": 50,
        "tierPrice": 119
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "20405",
    "sku": "AT-WC-20405",
    "slug": "moto-g64-back-panel-green",
    "title": "Moto G64 Back Panel &#8211; Green",
    "description": "Moto G64 Back Panel &#8211; Green high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 59272,
      "name": "Motorola Moto G64  &#8211; Green",
      "slug": "moto-g64-8211-green"
    },
    "retailPrice": 140,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/G64-Green.png"
    ],
    "compatibleModels": [
      {
        "id": 59272,
        "name": "Motorola Moto G64  &#8211; Green",
        "brandName": "Motorola",
        "slug": "moto-g64-8211-green"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20405-1",
        "minQuantity": 5,
        "tierPrice": 133
      },
      {
        "id": "wt-20405-2",
        "minQuantity": 10,
        "tierPrice": 126
      },
      {
        "id": "wt-20405-3",
        "minQuantity": 50,
        "tierPrice": 119
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "20404",
    "sku": "AT-WC-20404",
    "slug": "moto-g64-back-panel-blue",
    "title": "Moto G64 Back Panel &#8211; Blue",
    "description": "Moto G64 Back Panel &#8211; Blue high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 8433,
      "name": "Motorola Moto G64  &#8211; Blue",
      "slug": "moto-g64-8211-blue"
    },
    "retailPrice": 140,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/G64-blue.png"
    ],
    "compatibleModels": [
      {
        "id": 8433,
        "name": "Motorola Moto G64  &#8211; Blue",
        "brandName": "Motorola",
        "slug": "moto-g64-8211-blue"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20404-1",
        "minQuantity": 5,
        "tierPrice": 133
      },
      {
        "id": "wt-20404-2",
        "minQuantity": 10,
        "tierPrice": 126
      },
      {
        "id": "wt-20404-3",
        "minQuantity": 50,
        "tierPrice": 119
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "20403",
    "sku": "AT-WC-20403",
    "slug": "moto-g85-back-panel-black",
    "title": "Moto G85 Back Panel &#8211; Black",
    "description": "Moto G85 Back Panel &#8211; Black high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 10632,
      "name": "Motorola Moto G85  &#8211; Black",
      "slug": "moto-g85-8211-black"
    },
    "retailPrice": 220,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/G85-black.jpg"
    ],
    "compatibleModels": [
      {
        "id": 10632,
        "name": "Motorola Moto G85  &#8211; Black",
        "brandName": "Motorola",
        "slug": "moto-g85-8211-black"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20403-1",
        "minQuantity": 5,
        "tierPrice": 209
      },
      {
        "id": "wt-20403-2",
        "minQuantity": 10,
        "tierPrice": 198
      },
      {
        "id": "wt-20403-3",
        "minQuantity": 50,
        "tierPrice": 187
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "20402",
    "sku": "AT-WC-20402",
    "slug": "moto-g85-back-panel-red",
    "title": "Moto G85 Back Panel &#8211; Red",
    "description": "Moto G85 Back Panel &#8211; Red high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 90483,
      "name": "Motorola Moto G85  &#8211; Red",
      "slug": "moto-g85-8211-red"
    },
    "retailPrice": 220,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/G85-red.png"
    ],
    "compatibleModels": [
      {
        "id": 90483,
        "name": "Motorola Moto G85  &#8211; Red",
        "brandName": "Motorola",
        "slug": "moto-g85-8211-red"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20402-1",
        "minQuantity": 5,
        "tierPrice": 209
      },
      {
        "id": "wt-20402-2",
        "minQuantity": 10,
        "tierPrice": 198
      },
      {
        "id": "wt-20402-3",
        "minQuantity": 50,
        "tierPrice": 187
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "20401",
    "sku": "AT-WC-20401",
    "slug": "moto-g85-back-panel-blue",
    "title": "Moto G85 Back Panel &#8211; Blue",
    "description": "Moto G85 Back Panel &#8211; Blue high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 22968,
      "name": "Motorola Moto G85  &#8211; Blue",
      "slug": "moto-g85-8211-blue"
    },
    "retailPrice": 220,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/G85-blue.jpg"
    ],
    "compatibleModels": [
      {
        "id": 22968,
        "name": "Motorola Moto G85  &#8211; Blue",
        "brandName": "Motorola",
        "slug": "moto-g85-8211-blue"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20401-1",
        "minQuantity": 5,
        "tierPrice": 209
      },
      {
        "id": "wt-20401-2",
        "minQuantity": 10,
        "tierPrice": 198
      },
      {
        "id": "wt-20401-3",
        "minQuantity": 50,
        "tierPrice": 187
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "20400",
    "sku": "AT-WC-20400",
    "slug": "moto-g04-back-panel-green",
    "title": "Moto G04 Back Panel &#8211; Green",
    "description": "Moto G04 Back Panel &#8211; Green high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 8721,
      "name": "Motorola Moto G04  &#8211; Green",
      "slug": "moto-g04-8211-green"
    },
    "retailPrice": 130,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/G04-green.jpg"
    ],
    "compatibleModels": [
      {
        "id": 8721,
        "name": "Motorola Moto G04  &#8211; Green",
        "brandName": "Motorola",
        "slug": "moto-g04-8211-green"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20400-1",
        "minQuantity": 5,
        "tierPrice": 123.5
      },
      {
        "id": "wt-20400-2",
        "minQuantity": 10,
        "tierPrice": 117
      },
      {
        "id": "wt-20400-3",
        "minQuantity": 50,
        "tierPrice": 110.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "20399",
    "sku": "AT-WC-20399",
    "slug": "moto-g04-back-panel-blue",
    "title": "Moto G04 Back Panel &#8211; Blue",
    "description": "Moto G04 Back Panel &#8211; Blue high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 26537,
      "name": "Motorola Moto G04  &#8211; Blue",
      "slug": "moto-g04-8211-blue"
    },
    "retailPrice": 130,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/G04-blue.jpg"
    ],
    "compatibleModels": [
      {
        "id": 26537,
        "name": "Motorola Moto G04  &#8211; Blue",
        "brandName": "Motorola",
        "slug": "moto-g04-8211-blue"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20399-1",
        "minQuantity": 5,
        "tierPrice": 123.5
      },
      {
        "id": "wt-20399-2",
        "minQuantity": 10,
        "tierPrice": 117
      },
      {
        "id": "wt-20399-3",
        "minQuantity": 50,
        "tierPrice": 110.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "20398",
    "sku": "AT-WC-20398",
    "slug": "moto-g04-back-panel-red",
    "title": "Moto G04 Back Panel &#8211; Red",
    "description": "Moto G04 Back Panel &#8211; Red high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 37338,
      "name": "Motorola Moto G04  &#8211; Red",
      "slug": "moto-g04-8211-red"
    },
    "retailPrice": 130,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/G04-Red.jpg"
    ],
    "compatibleModels": [
      {
        "id": 37338,
        "name": "Motorola Moto G04  &#8211; Red",
        "brandName": "Motorola",
        "slug": "moto-g04-8211-red"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20398-1",
        "minQuantity": 5,
        "tierPrice": 123.5
      },
      {
        "id": "wt-20398-2",
        "minQuantity": 10,
        "tierPrice": 117
      },
      {
        "id": "wt-20398-3",
        "minQuantity": 50,
        "tierPrice": 110.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "20397",
    "sku": "AT-WC-20397",
    "slug": "moto-g04-back-panel-purple",
    "title": "Moto G04 Back Panel &#8211; Purple",
    "description": "Moto G04 Back Panel &#8211; Purple high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 34213,
      "name": "Motorola Moto G04  &#8211; Purple",
      "slug": "moto-g04-8211-purple"
    },
    "retailPrice": 130,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/G04-black.jpg"
    ],
    "compatibleModels": [
      {
        "id": 34213,
        "name": "Motorola Moto G04  &#8211; Purple",
        "brandName": "Motorola",
        "slug": "moto-g04-8211-purple"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20397-1",
        "minQuantity": 5,
        "tierPrice": 123.5
      },
      {
        "id": "wt-20397-2",
        "minQuantity": 10,
        "tierPrice": 117
      },
      {
        "id": "wt-20397-3",
        "minQuantity": 50,
        "tierPrice": 110.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "20396",
    "sku": "AT-WC-20396",
    "slug": "moto-edge-60-fusition-back-panel-purple",
    "title": "Moto EDGE 60 Fusition Back Panel &#8211; Purple",
    "description": "Moto EDGE 60 Fusition Back Panel &#8211; Purple high quality mobile spare part.",
    "category": {
      "id": 21,
      "name": "Back Panel",
      "slug": "back-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 849,
      "name": "Motorola Moto EDGE 60 Fusition  &#8211; Purple",
      "slug": "moto-edge-60-fusition-8211-purple"
    },
    "retailPrice": 240,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/EDGE-60-fusition-blue.png"
    ],
    "compatibleModels": [
      {
        "id": 849,
        "name": "Motorola Moto EDGE 60 Fusition  &#8211; Purple",
        "brandName": "Motorola",
        "slug": "moto-edge-60-fusition-8211-purple"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20396-1",
        "minQuantity": 5,
        "tierPrice": 228
      },
      {
        "id": "wt-20396-2",
        "minQuantity": 10,
        "tierPrice": 216
      },
      {
        "id": "wt-20396-3",
        "minQuantity": 50,
        "tierPrice": 204
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "21503",
    "sku": "AT-WC-21503",
    "slug": "force-bn63-battery-for-redmi-10-mi-10-prime",
    "title": "Force BN63 Battery for Redmi 10 / Mi 10 Prime",
    "description": "Force BN63 Battery for Redmi 10 / Mi 10 Prime high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 36788,
      "name": "Xiaomi Force BN63  for Redmi 10 / Mi 10 Prime",
      "slug": "force-bn63-for-redmi-10-mi-10-prime"
    },
    "retailPrice": 525,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/BN-63.jpg"
    ],
    "compatibleModels": [
      {
        "id": 36788,
        "name": "Xiaomi Force BN63  for Redmi 10 / Mi 10 Prime",
        "brandName": "Xiaomi",
        "slug": "force-bn63-for-redmi-10-mi-10-prime"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21503-1",
        "minQuantity": 5,
        "tierPrice": 498.75
      },
      {
        "id": "wt-21503-2",
        "minQuantity": 10,
        "tierPrice": 472.5
      },
      {
        "id": "wt-21503-3",
        "minQuantity": 50,
        "tierPrice": 446.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "21502",
    "sku": "AT-WC-21502",
    "slug": "force-bn45-battery-for-mi-note-5-pro",
    "title": "Force BN45 Battery for Mi Note 5 Pro",
    "description": "Force BN45 Battery for Mi Note 5 Pro high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 65011,
      "name": "Xiaomi Force BN45  for Mi Note 5 Pro",
      "slug": "force-bn45-for-mi-note-5-pro"
    },
    "retailPrice": 450,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/BN45.jpg"
    ],
    "compatibleModels": [
      {
        "id": 65011,
        "name": "Xiaomi Force BN45  for Mi Note 5 Pro",
        "brandName": "Xiaomi",
        "slug": "force-bn45-for-mi-note-5-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21502-1",
        "minQuantity": 5,
        "tierPrice": 427.5
      },
      {
        "id": "wt-21502-2",
        "minQuantity": 10,
        "tierPrice": 405
      },
      {
        "id": "wt-21502-3",
        "minQuantity": 50,
        "tierPrice": 382.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "21501",
    "sku": "AT-WC-21501",
    "slug": "force-nh50-battery-for-moto-g22-moto-g13-moto-g53-5g-moto-e13-moto-e32",
    "title": "Force NH50 Battery for Moto G22 / Moto G13 / Moto G53 5G / Moto E13 / Moto E32",
    "description": "Force NH50 Battery for Moto G22 / Moto G13 / Moto G53 5G / Moto E13 / Moto E32 high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 44918,
      "name": "Motorola Force NH50  for Moto G22 / Moto G13 / Moto G53 5G / Moto E13 / Moto E32",
      "slug": "force-nh50-for-moto-g22-moto-g13-moto-g53-5g-moto-e13-moto-e32"
    },
    "retailPrice": 505,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/NH-50.jpg"
    ],
    "compatibleModels": [
      {
        "id": 44918,
        "name": "Motorola Force NH50  for Moto G22 / Moto G13 / Moto G53 5G / Moto E13 / Moto E32",
        "brandName": "Motorola",
        "slug": "force-nh50-for-moto-g22-moto-g13-moto-g53-5g-moto-e13-moto-e32"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21501-1",
        "minQuantity": 5,
        "tierPrice": 479.75
      },
      {
        "id": "wt-21501-2",
        "minQuantity": 10,
        "tierPrice": 454.5
      },
      {
        "id": "wt-21501-3",
        "minQuantity": 50,
        "tierPrice": 429.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "21494",
    "sku": "AT-WC-21494",
    "slug": "force-bn4a-battery-for-mi-note-7-mi-note-7s-mi-note-7-pro",
    "title": "Force BN4A Battery for Mi Note 7 / Mi Note 7S / Mi Note 7 Pro",
    "description": "Force BN4A Battery for Mi Note 7 / Mi Note 7S / Mi Note 7 Pro high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 91273,
      "name": "Xiaomi Force BN4A  for Mi Note 7 / Mi Note 7S / Mi Note 7 Pro",
      "slug": "force-bn4a-for-mi-note-7-mi-note-7s-mi-note-7-pro"
    },
    "retailPrice": 450,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/BN-4A.jpg"
    ],
    "compatibleModels": [
      {
        "id": 91273,
        "name": "Xiaomi Force BN4A  for Mi Note 7 / Mi Note 7S / Mi Note 7 Pro",
        "brandName": "Xiaomi",
        "slug": "force-bn4a-for-mi-note-7-mi-note-7s-mi-note-7-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21494-1",
        "minQuantity": 5,
        "tierPrice": 427.5
      },
      {
        "id": "wt-21494-2",
        "minQuantity": 10,
        "tierPrice": 405
      },
      {
        "id": "wt-21494-3",
        "minQuantity": 50,
        "tierPrice": 382.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "21492",
    "sku": "AT-WC-21492",
    "slug": "force-jk50-battery-for-motorola-smartphones",
    "title": "Force JK50 Battery for Motorola smartphones",
    "description": "Force JK50 Battery for Motorola smartphones high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 56651,
      "name": "Motorola Force JK50  for Motorola smartphones",
      "slug": "force-jk50-for-motorola-smartphones"
    },
    "retailPrice": 490,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/JK-50.jpg"
    ],
    "compatibleModels": [
      {
        "id": 56651,
        "name": "Motorola Force JK50  for Motorola smartphones",
        "brandName": "Motorola",
        "slug": "force-jk50-for-motorola-smartphones"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21492-1",
        "minQuantity": 5,
        "tierPrice": 465.5
      },
      {
        "id": "wt-21492-2",
        "minQuantity": 10,
        "tierPrice": 441
      },
      {
        "id": "wt-21492-3",
        "minQuantity": 50,
        "tierPrice": 416.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "21493",
    "sku": "AT-WC-21493",
    "slug": "force-b-w3-battery-for-vivo-y22-vivo-y22s-2",
    "title": "Force B-W3 Battery for Vivo Y22 / Vivo Y22s",
    "description": "Force B-W3 Battery for Vivo Y22 / Vivo Y22s high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 29589,
      "name": "Vivo Force B-W3  for Vivo Y22 / Vivo Y22s",
      "slug": "force-b-w3-for-vivo-y22-vivo-y22s"
    },
    "retailPrice": 490,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/B-W3.jpg"
    ],
    "compatibleModels": [
      {
        "id": 29589,
        "name": "Vivo Force B-W3  for Vivo Y22 / Vivo Y22s",
        "brandName": "Vivo",
        "slug": "force-b-w3-for-vivo-y22-vivo-y22s"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21493-1",
        "minQuantity": 5,
        "tierPrice": 465.5
      },
      {
        "id": "wt-21493-2",
        "minQuantity": 10,
        "tierPrice": 441
      },
      {
        "id": "wt-21493-3",
        "minQuantity": 50,
        "tierPrice": 416.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "21486",
    "sku": "AT-WC-21486",
    "slug": "force-b-w3-battery-for-vivo-y22-vivo-y22s",
    "title": "Force PC50 Battery for Moto G14 / Moto G54 5G / Moto E14",
    "description": "Force PC50 Battery for Moto G14 / Moto G54 5G / Moto E14 high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 66985,
      "name": "Motorola Force PC50  for Moto G14 / Moto G54 5G / Moto E14",
      "slug": "force-pc50-for-moto-g14-moto-g54-5g-moto-e14"
    },
    "retailPrice": 505,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/PC-50.jpg"
    ],
    "compatibleModels": [
      {
        "id": 66985,
        "name": "Motorola Force PC50  for Moto G14 / Moto G54 5G / Moto E14",
        "brandName": "Motorola",
        "slug": "force-pc50-for-moto-g14-moto-g54-5g-moto-e14"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21486-1",
        "minQuantity": 5,
        "tierPrice": 479.75
      },
      {
        "id": "wt-21486-2",
        "minQuantity": 10,
        "tierPrice": 454.5
      },
      {
        "id": "wt-21486-3",
        "minQuantity": 50,
        "tierPrice": 429.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "21490",
    "sku": "AT-WC-21490",
    "slug": "force-ng50-battery-for-moto-g71-5g-moto-g62-2",
    "title": "Force NG50 Battery for Moto G71 5G / Moto G62",
    "description": "Force NG50 Battery for Moto G71 5G / Moto G62 high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 87271,
      "name": "Motorola Force NG50  for Moto G71 5G / Moto G62",
      "slug": "force-ng50-for-moto-g71-5g-moto-g62"
    },
    "retailPrice": 490,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/NG-50.jpg"
    ],
    "compatibleModels": [
      {
        "id": 87271,
        "name": "Motorola Force NG50  for Moto G71 5G / Moto G62",
        "brandName": "Motorola",
        "slug": "force-ng50-for-moto-g71-5g-moto-g62"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21490-1",
        "minQuantity": 5,
        "tierPrice": 465.5
      },
      {
        "id": "wt-21490-2",
        "minQuantity": 10,
        "tierPrice": 441
      },
      {
        "id": "wt-21490-3",
        "minQuantity": 50,
        "tierPrice": 416.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "21485",
    "sku": "AT-WC-21485",
    "slug": "force-ng50-battery-for-moto-g71-5g-moto-g62",
    "title": "Force NC50 Battery for Moto G41 / Moto G32",
    "description": "Force NC50 Battery for Moto G41 / Moto G32 high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 70814,
      "name": "Motorola Force NC50  for Moto G41 / Moto G32",
      "slug": "force-nc50-for-moto-g41-moto-g32"
    },
    "retailPrice": 490,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/NC-50.jpg"
    ],
    "compatibleModels": [
      {
        "id": 70814,
        "name": "Motorola Force NC50  for Moto G41 / Moto G32",
        "brandName": "Motorola",
        "slug": "force-nc50-for-moto-g41-moto-g32"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21485-1",
        "minQuantity": 5,
        "tierPrice": 465.5
      },
      {
        "id": "wt-21485-2",
        "minQuantity": 10,
        "tierPrice": 441
      },
      {
        "id": "wt-21485-3",
        "minQuantity": 50,
        "tierPrice": 416.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "21489",
    "sku": "AT-WC-21489",
    "slug": "force-nd50-battery-for-moto-g31-moto-g42-moto-g62-5g",
    "title": "Force ND50 Battery for Moto G31 / Moto G42 / Moto G62 5G",
    "description": "Force ND50 Battery for Moto G31 / Moto G42 / Moto G62 5G high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 14674,
      "name": "Motorola Force ND50  for Moto G31 / Moto G42 / Moto G62 5G",
      "slug": "force-nd50-for-moto-g31-moto-g42-moto-g62-5g"
    },
    "retailPrice": 505,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/ND-50.jpg"
    ],
    "compatibleModels": [
      {
        "id": 14674,
        "name": "Motorola Force ND50  for Moto G31 / Moto G42 / Moto G62 5G",
        "brandName": "Motorola",
        "slug": "force-nd50-for-moto-g31-moto-g42-moto-g62-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21489-1",
        "minQuantity": 5,
        "tierPrice": 479.75
      },
      {
        "id": "wt-21489-2",
        "minQuantity": 10,
        "tierPrice": 454.5
      },
      {
        "id": "wt-21489-3",
        "minQuantity": 50,
        "tierPrice": 429.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "21483",
    "sku": "AT-WC-21483",
    "slug": "force-ne50-battery-for-moto-g52-moto-g72-moto-g82-5g",
    "title": "Force NE50 Battery for Moto G52 / Moto G72 / Moto G82 5G",
    "description": "Force NE50 Battery for Moto G52 / Moto G72 / Moto G82 5G high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 79502,
      "name": "Motorola Force NE50  for Moto G52 / Moto G72 / Moto G82 5G",
      "slug": "force-ne50-for-moto-g52-moto-g72-moto-g82-5g"
    },
    "retailPrice": 505,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/NE-50.jpg"
    ],
    "compatibleModels": [
      {
        "id": 79502,
        "name": "Motorola Force NE50  for Moto G52 / Moto G72 / Moto G82 5G",
        "brandName": "Motorola",
        "slug": "force-ne50-for-moto-g52-moto-g72-moto-g82-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21483-1",
        "minQuantity": 5,
        "tierPrice": 479.75
      },
      {
        "id": "wt-21483-2",
        "minQuantity": 10,
        "tierPrice": 454.5
      },
      {
        "id": "wt-21483-3",
        "minQuantity": 50,
        "tierPrice": 429.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "21477",
    "sku": "AT-WC-21477",
    "slug": "force-bl-58bt-battery-for-tecno-smartphones",
    "title": "Force BL-58BT Battery for Tecno Smartphones",
    "description": "Force BL-58BT Battery for Tecno Smartphones high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 20199,
      "name": "Tecno Force BL-58BT  for Tecno Smartphones",
      "slug": "force-bl-58bt-for-tecno-smartphones"
    },
    "retailPrice": 505,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/58-BT.jpg"
    ],
    "compatibleModels": [
      {
        "id": 20199,
        "name": "Tecno Force BL-58BT  for Tecno Smartphones",
        "brandName": "Tecno",
        "slug": "force-bl-58bt-for-tecno-smartphones"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21477-1",
        "minQuantity": 5,
        "tierPrice": 479.75
      },
      {
        "id": "wt-21477-2",
        "minQuantity": 10,
        "tierPrice": 454.5
      },
      {
        "id": "wt-21477-3",
        "minQuantity": 50,
        "tierPrice": 429.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "21476",
    "sku": "AT-WC-21476",
    "slug": "force-blp721-battery-for-realme-c2-oppo-a1k",
    "title": "Force BLP721 Battery for Realme C2 / Oppo A1k",
    "description": "Force BLP721 Battery for Realme C2 / Oppo A1k high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 29862,
      "name": "Realme Force BLP721  for Realme C2 / Oppo A1k",
      "slug": "force-blp721-for-realme-c2-oppo-a1k"
    },
    "retailPrice": 470,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/BLP-721.jpg"
    ],
    "compatibleModels": [
      {
        "id": 29862,
        "name": "Realme Force BLP721  for Realme C2 / Oppo A1k",
        "brandName": "Realme",
        "slug": "force-blp721-for-realme-c2-oppo-a1k"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21476-1",
        "minQuantity": 5,
        "tierPrice": 446.5
      },
      {
        "id": "wt-21476-2",
        "minQuantity": 10,
        "tierPrice": 423
      },
      {
        "id": "wt-21476-3",
        "minQuantity": 50,
        "tierPrice": 399.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "21461",
    "sku": "AT-WC-21461",
    "slug": "force-pc60-battery-for-moto-g54-5g-moto-g54-power",
    "title": "Force PC60 Battery for Moto G54 5G / Moto G54 Power",
    "description": "Force PC60 Battery for Moto G54 5G / Moto G54 Power high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 33990,
      "name": "Motorola Force PC60  for Moto G54 5G / Moto G54 Power",
      "slug": "force-pc60-for-moto-g54-5g-moto-g54-power"
    },
    "retailPrice": 525,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/PC-60.jpg"
    ],
    "compatibleModels": [
      {
        "id": 33990,
        "name": "Motorola Force PC60  for Moto G54 5G / Moto G54 Power",
        "brandName": "Motorola",
        "slug": "force-pc60-for-moto-g54-5g-moto-g54-power"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21461-1",
        "minQuantity": 5,
        "tierPrice": 498.75
      },
      {
        "id": "wt-21461-2",
        "minQuantity": 10,
        "tierPrice": 472.5
      },
      {
        "id": "wt-21461-3",
        "minQuantity": 50,
        "tierPrice": 446.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "19788",
    "sku": "AT-WC-19788",
    "slug": "bn5r-battery-for-redmi-a3-new-poco-c61-mi-a3x",
    "title": "BN5R Battery For Redmi A3 New , Poco C61 , Mi A3X",
    "description": "BN5R Battery For Redmi A3 New , Poco C61 , Mi A3X high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 10,
      "name": "Poco",
      "slug": "poco"
    },
    "model": {
      "id": 27737,
      "name": "Poco BN5R  For Redmi A3 New , Poco C61 , Mi A3X",
      "slug": "bn5r-for-redmi-a3-new-poco-c61-mi-a3x"
    },
    "retailPrice": 505,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/08/BN5R.png"
    ],
    "compatibleModels": [
      {
        "id": 27737,
        "name": "Poco BN5R  For Redmi A3 New , Poco C61 , Mi A3X",
        "brandName": "Poco",
        "slug": "bn5r-for-redmi-a3-new-poco-c61-mi-a3x"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19788-1",
        "minQuantity": 5,
        "tierPrice": 479.75
      },
      {
        "id": "wt-19788-2",
        "minQuantity": 10,
        "tierPrice": 454.5
      },
      {
        "id": "wt-19788-3",
        "minQuantity": 50,
        "tierPrice": 429.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "19808",
    "sku": "AT-WC-19808",
    "slug": "blp-877-battery-for-realme-8i-realme-8-c30-c31-c33-c35",
    "title": "BLP &#8211; 877 Battery For Realme 8i , Realme 8 , C30 , C31 , C33 , C35",
    "description": "BLP &#8211; 877 Battery For Realme 8i , Realme 8 , C30 , C31 , C33 , C35 high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 21026,
      "name": "Realme BLP &#8211; 877  For Realme 8i , Realme 8 , C30 , C31 , C33 , C35",
      "slug": "blp-8211-877-for-realme-8i-realme-8-c30-c31-c33-c35"
    },
    "retailPrice": 0,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "/images/cat-display.jpg"
    ],
    "compatibleModels": [
      {
        "id": 21026,
        "name": "Realme BLP &#8211; 877  For Realme 8i , Realme 8 , C30 , C31 , C33 , C35",
        "brandName": "Realme",
        "slug": "blp-8211-877-for-realme-8i-realme-8-c30-c31-c33-c35"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19808-1",
        "minQuantity": 5,
        "tierPrice": 0
      },
      {
        "id": "wt-19808-2",
        "minQuantity": 10,
        "tierPrice": 0
      },
      {
        "id": "wt-19808-3",
        "minQuantity": 50,
        "tierPrice": 0
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "19787",
    "sku": "AT-WC-19787",
    "slug": "b-o8-battery-for-vivo-y52s-y31-2021-y51-2020-y31s-y53s-y72",
    "title": "B &#8211; O8 Battery For Vivo Y52S , Y31 (2021) , Y51 (2020) , Y31S , Y53S , Y72",
    "description": "B &#8211; O8 Battery For Vivo Y52S , Y31 (2021) , Y51 (2020) , Y31S , Y53S , Y72 high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 61572,
      "name": "Vivo B &#8211; O8  For Vivo Y52S , Y31 (2021) , Y51 (2020) , Y31S , Y53S , Y72",
      "slug": "b-8211-o8-for-vivo-y52s-y31-2021-y51-2020-y31s-y53s-y72"
    },
    "retailPrice": 505,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/08/B-O8.png"
    ],
    "compatibleModels": [
      {
        "id": 61572,
        "name": "Vivo B &#8211; O8  For Vivo Y52S , Y31 (2021) , Y51 (2020) , Y31S , Y53S , Y72",
        "brandName": "Vivo",
        "slug": "b-8211-o8-for-vivo-y52s-y31-2021-y51-2020-y31s-y53s-y72"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19787-1",
        "minQuantity": 5,
        "tierPrice": 479.75
      },
      {
        "id": "wt-19787-2",
        "minQuantity": 10,
        "tierPrice": 454.5
      },
      {
        "id": "wt-19787-3",
        "minQuantity": 50,
        "tierPrice": 429.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "19786",
    "sku": "AT-WC-19786",
    "slug": "b-w1-battery-for-vivo-y02-y35-t2x",
    "title": "B &#8211; W1 Battery For Vivo Y02 , Y35 , T2X",
    "description": "B &#8211; W1 Battery For Vivo Y02 , Y35 , T2X high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 20566,
      "name": "Vivo B &#8211; W1  For Vivo Y02 , Y35 , T2X",
      "slug": "b-8211-w1-for-vivo-y02-y35-t2x"
    },
    "retailPrice": 495,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/08/B-W1.png"
    ],
    "compatibleModels": [
      {
        "id": 20566,
        "name": "Vivo B &#8211; W1  For Vivo Y02 , Y35 , T2X",
        "brandName": "Vivo",
        "slug": "b-8211-w1-for-vivo-y02-y35-t2x"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19786-1",
        "minQuantity": 5,
        "tierPrice": 470.25
      },
      {
        "id": "wt-19786-2",
        "minQuantity": 10,
        "tierPrice": 445.5
      },
      {
        "id": "wt-19786-3",
        "minQuantity": 50,
        "tierPrice": 420.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "19785",
    "sku": "AT-WC-19785",
    "slug": "blp-a17-battery-for-realme-c53-c67-c65-realme-12-5g-realme-12x-narzo-n53",
    "title": "BLP &#8211; A17 Battery For Realme C53 , C67 , C65 , Realme 12 5G , Realme 12X , Narzo N53",
    "description": "BLP &#8211; A17 Battery For Realme C53 , C67 , C65 , Realme 12 5G , Realme 12X , Narzo N53 high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 63088,
      "name": "Realme BLP &#8211; A17  For Realme C53 , C67 , C65 , Realme 12 5G , Realme 12X , Narzo N53",
      "slug": "blp-8211-a17-for-realme-c53-c67-c65-realme-12-5g-realme-12x-narzo-n53"
    },
    "retailPrice": 580,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/08/Blp-A17.png"
    ],
    "compatibleModels": [
      {
        "id": 63088,
        "name": "Realme BLP &#8211; A17  For Realme C53 , C67 , C65 , Realme 12 5G , Realme 12X , Narzo N53",
        "brandName": "Realme",
        "slug": "blp-8211-a17-for-realme-c53-c67-c65-realme-12-5g-realme-12x-narzo-n53"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19785-1",
        "minQuantity": 5,
        "tierPrice": 551
      },
      {
        "id": "wt-19785-2",
        "minQuantity": 10,
        "tierPrice": 522
      },
      {
        "id": "wt-19785-3",
        "minQuantity": 50,
        "tierPrice": 493
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "19252",
    "sku": "AT-WC-19252",
    "slug": "bn-37-battery-for-redmi-6-redmi-6a",
    "title": "BN 37 Battery For Redmi 6 , Redmi 6A",
    "description": "BN 37 Battery For Redmi 6 , Redmi 6A high quality mobile spare part.",
    "category": {
      "id": 178,
      "name": "Mobile Batteries",
      "slug": "battery"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 74525,
      "name": "Xiaomi BN 37  For Redmi 6 , Redmi 6A",
      "slug": "bn-37-for-redmi-6-redmi-6a"
    },
    "retailPrice": 390,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/bn-37.png"
    ],
    "compatibleModels": [
      {
        "id": 74525,
        "name": "Xiaomi BN 37  For Redmi 6 , Redmi 6A",
        "brandName": "Xiaomi",
        "slug": "bn-37-for-redmi-6-redmi-6a"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19252-1",
        "minQuantity": 5,
        "tierPrice": 370.5
      },
      {
        "id": "wt-19252-2",
        "minQuantity": 10,
        "tierPrice": 351
      },
      {
        "id": "wt-19252-3",
        "minQuantity": 50,
        "tierPrice": 331.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "20602",
    "sku": "AT-WC-20602",
    "slug": "vivo-y53-2020-camera-glass",
    "title": "Vivo Y53 2020 Camera Glass",
    "description": "Vivo Y53 2020 Camera Glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 30537,
      "name": "Vivo Y53 2020",
      "slug": "vivo-y53-2020"
    },
    "retailPrice": 15,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/Y53-new.png"
    ],
    "compatibleModels": [
      {
        "id": 30537,
        "name": "Vivo Y53 2020",
        "brandName": "Vivo",
        "slug": "vivo-y53-2020"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20602-1",
        "minQuantity": 5,
        "tierPrice": 14.25
      },
      {
        "id": "wt-20602-2",
        "minQuantity": 10,
        "tierPrice": 13.5
      },
      {
        "id": "wt-20602-3",
        "minQuantity": 50,
        "tierPrice": 12.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "20517",
    "sku": "AT-WC-20517",
    "slug": "mi-a3-new-poco-c61-with-frame",
    "title": "Mi A3 New / Poco C61 With Frame",
    "description": "Mi A3 New / Poco C61 With Frame high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 10,
      "name": "Poco",
      "slug": "poco"
    },
    "model": {
      "id": 15624,
      "name": "Poco Mi A3 New / Poco C61 With Frame",
      "slug": "mi-a3-new-poco-c61-with-frame"
    },
    "retailPrice": 60,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/A3-new-C61.png"
    ],
    "compatibleModels": [
      {
        "id": 15624,
        "name": "Poco Mi A3 New / Poco C61 With Frame",
        "brandName": "Poco",
        "slug": "mi-a3-new-poco-c61-with-frame"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20517-1",
        "minQuantity": 5,
        "tierPrice": 57
      },
      {
        "id": "wt-20517-2",
        "minQuantity": 10,
        "tierPrice": 54
      },
      {
        "id": "wt-20517-3",
        "minQuantity": 50,
        "tierPrice": 51
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "20494",
    "sku": "AT-WC-20494",
    "slug": "mi-note12-5g-camera-glass",
    "title": "Mi Note12 5G Camera glass",
    "description": "Mi Note12 5G Camera glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 72605,
      "name": "Xiaomi Mi Note12 5G",
      "slug": "mi-note12-5g"
    },
    "retailPrice": 15,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/note-12-4g.jpg"
    ],
    "compatibleModels": [
      {
        "id": 72605,
        "name": "Xiaomi Mi Note12 5G",
        "brandName": "Xiaomi",
        "slug": "mi-note12-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20494-1",
        "minQuantity": 5,
        "tierPrice": 14.25
      },
      {
        "id": "wt-20494-2",
        "minQuantity": 10,
        "tierPrice": 13.5
      },
      {
        "id": "wt-20494-3",
        "minQuantity": 50,
        "tierPrice": 12.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "20493",
    "sku": "AT-WC-20493",
    "slug": "vivo-v21e-5g-display-conector",
    "title": "Vivo V21e 5G Camera glass",
    "description": "Vivo V21e 5G Camera glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 47885,
      "name": "Vivo V21e 5G",
      "slug": "vivo-v21e-5g"
    },
    "retailPrice": 15,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/v21e-5g.jpg"
    ],
    "compatibleModels": [
      {
        "id": 47885,
        "name": "Vivo V21e 5G",
        "brandName": "Vivo",
        "slug": "vivo-v21e-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20493-1",
        "minQuantity": 5,
        "tierPrice": 14.25
      },
      {
        "id": "wt-20493-2",
        "minQuantity": 10,
        "tierPrice": 13.5
      },
      {
        "id": "wt-20493-3",
        "minQuantity": 50,
        "tierPrice": 12.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "20492",
    "sku": "AT-WC-20492",
    "slug": "realme-2-display-conector",
    "title": "Realme 2 Camera glass",
    "description": "Realme 2 Camera glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 39782,
      "name": "Realme 2",
      "slug": "realme-2"
    },
    "retailPrice": 10,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/realme-c2.webp"
    ],
    "compatibleModels": [
      {
        "id": 39782,
        "name": "Realme 2",
        "brandName": "Realme",
        "slug": "realme-2"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20492-1",
        "minQuantity": 5,
        "tierPrice": 9.5
      },
      {
        "id": "wt-20492-2",
        "minQuantity": 10,
        "tierPrice": 9
      },
      {
        "id": "wt-20492-3",
        "minQuantity": 50,
        "tierPrice": 8.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "16610",
    "sku": "AT-WC-16610",
    "slug": "poco-c61-outer-camera-glass",
    "title": "Poco C61 Outer Camera glass",
    "description": "Poco C61 Outer Camera glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 10,
      "name": "Poco",
      "slug": "poco"
    },
    "model": {
      "id": 26345,
      "name": "Poco C61 Outer",
      "slug": "poco-c61-outer"
    },
    "retailPrice": 15,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/Poco-C61.webp"
    ],
    "compatibleModels": [
      {
        "id": 26345,
        "name": "Poco C61 Outer",
        "brandName": "Poco",
        "slug": "poco-c61-outer"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16610-1",
        "minQuantity": 5,
        "tierPrice": 14.25
      },
      {
        "id": "wt-16610-2",
        "minQuantity": 10,
        "tierPrice": 13.5
      },
      {
        "id": "wt-16610-3",
        "minQuantity": 50,
        "tierPrice": 12.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "16611",
    "sku": "AT-WC-16611",
    "slug": "mi-a3-new-outer-camera-glass",
    "title": "Mi A3 New Outer Camera glass",
    "description": "Mi A3 New Outer Camera glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 81984,
      "name": "Xiaomi Mi A3 New Outer",
      "slug": "mi-a3-new-outer"
    },
    "retailPrice": 15,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/A3-Pro.webp"
    ],
    "compatibleModels": [
      {
        "id": 81984,
        "name": "Xiaomi Mi A3 New Outer",
        "brandName": "Xiaomi",
        "slug": "mi-a3-new-outer"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16611-1",
        "minQuantity": 5,
        "tierPrice": 14.25
      },
      {
        "id": "wt-16611-2",
        "minQuantity": 10,
        "tierPrice": 13.5
      },
      {
        "id": "wt-16611-3",
        "minQuantity": 50,
        "tierPrice": 12.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "15620",
    "sku": "AT-WC-15620",
    "slug": "infinix-note-12-5g-camera-glass",
    "title": "Infinix Note 12 5G Camera glass",
    "description": "Infinix Note 12 5G Camera glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 39420,
      "name": "Infinix Note 12 5G",
      "slug": "infinix-note-12-5g"
    },
    "retailPrice": 13,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/04/inf-note-12.webp"
    ],
    "compatibleModels": [
      {
        "id": 39420,
        "name": "Infinix Note 12 5G",
        "brandName": "Infinix",
        "slug": "infinix-note-12-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-15620-1",
        "minQuantity": 5,
        "tierPrice": 12.35
      },
      {
        "id": "wt-15620-2",
        "minQuantity": 10,
        "tierPrice": 11.7
      },
      {
        "id": "wt-15620-3",
        "minQuantity": 50,
        "tierPrice": 11.05
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "14915",
    "sku": "AT-WC-14915",
    "slug": "tecno-kg6-camera-glass",
    "title": "Tecno KG6 Camera glass",
    "description": "Tecno KG6 Camera glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 66645,
      "name": "Tecno KG6",
      "slug": "tecno-kg6"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/Vivo-V7.webp"
    ],
    "compatibleModels": [
      {
        "id": 66645,
        "name": "Tecno KG6",
        "brandName": "Tecno",
        "slug": "tecno-kg6"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14915-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-14915-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-14915-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "14914",
    "sku": "AT-WC-14914",
    "slug": "moto-g7-power-camera-glass",
    "title": "Moto G7 Power Camera glass",
    "description": "Moto G7 Power Camera glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 92813,
      "name": "Motorola Moto G7 Power",
      "slug": "moto-g7-power"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/g7-power.jpg"
    ],
    "compatibleModels": [
      {
        "id": 92813,
        "name": "Motorola Moto G7 Power",
        "brandName": "Motorola",
        "slug": "moto-g7-power"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14914-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-14914-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-14914-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "14913",
    "sku": "AT-WC-14913",
    "slug": "moto-g52-camera-glass",
    "title": "Moto G52 Camera glass",
    "description": "Moto G52 Camera glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 58483,
      "name": "Motorola Moto G52",
      "slug": "moto-g52"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/g52.jpg"
    ],
    "compatibleModels": [
      {
        "id": 58483,
        "name": "Motorola Moto G52",
        "brandName": "Motorola",
        "slug": "moto-g52"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14913-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-14913-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-14913-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "14385",
    "sku": "AT-WC-14385",
    "slug": "mi-9-power-outer-camera-glass",
    "title": "MI 9 Power Outer Camera Glass",
    "description": "MI 9 Power Outer Camera Glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 69023,
      "name": "Xiaomi MI 9 Power Outer",
      "slug": "mi-9-power-outer"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/9-power-outer.jpg"
    ],
    "compatibleModels": [
      {
        "id": 69023,
        "name": "Xiaomi MI 9 Power Outer",
        "brandName": "Xiaomi",
        "slug": "mi-9-power-outer"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14385-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-14385-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-14385-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "14267",
    "sku": "AT-WC-14267",
    "slug": "moto-e40-camera-glass",
    "title": "Moto E40 Camera Glass",
    "description": "Moto E40 Camera Glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 12477,
      "name": "Motorola Moto E40",
      "slug": "moto-e40"
    },
    "retailPrice": 15,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/e40.webp"
    ],
    "compatibleModels": [
      {
        "id": 12477,
        "name": "Motorola Moto E40",
        "brandName": "Motorola",
        "slug": "moto-e40"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14267-1",
        "minQuantity": 5,
        "tierPrice": 14.25
      },
      {
        "id": "wt-14267-2",
        "minQuantity": 10,
        "tierPrice": 13.5
      },
      {
        "id": "wt-14267-3",
        "minQuantity": 50,
        "tierPrice": 12.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "14266",
    "sku": "AT-WC-14266",
    "slug": "realme-c31-camera-glass",
    "title": "Realme C31 Camera Glass",
    "description": "Realme C31 Camera Glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 80129,
      "name": "Realme C31",
      "slug": "realme-c31"
    },
    "retailPrice": 14,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/c31.webp"
    ],
    "compatibleModels": [
      {
        "id": 80129,
        "name": "Realme C31",
        "brandName": "Realme",
        "slug": "realme-c31"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14266-1",
        "minQuantity": 5,
        "tierPrice": 13.3
      },
      {
        "id": "wt-14266-2",
        "minQuantity": 10,
        "tierPrice": 12.6
      },
      {
        "id": "wt-14266-3",
        "minQuantity": 50,
        "tierPrice": 11.9
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "14265",
    "sku": "AT-WC-14265",
    "slug": "mi-13c-5g-camera-glass",
    "title": "Mi 13C 5G Camera Glass",
    "description": "Mi 13C 5G Camera Glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 24106,
      "name": "Xiaomi Mi 13C 5G",
      "slug": "mi-13c-5g"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/13c-5g.jpg"
    ],
    "compatibleModels": [
      {
        "id": 24106,
        "name": "Xiaomi Mi 13C 5G",
        "brandName": "Xiaomi",
        "slug": "mi-13c-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14265-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-14265-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-14265-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "14264",
    "sku": "AT-WC-14264",
    "slug": "samsung-m20-camera-glass-2",
    "title": "Samsung M20 Camera Glass",
    "description": "Samsung M20 Camera Glass high quality mobile spare part.",
    "category": {
      "id": 49,
      "name": "Camera Glass",
      "slug": "camera-glass"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 17810,
      "name": "Samsung M20",
      "slug": "samsung-m20"
    },
    "retailPrice": 9,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/m20.jpg"
    ],
    "compatibleModels": [
      {
        "id": 17810,
        "name": "Samsung M20",
        "brandName": "Samsung",
        "slug": "samsung-m20"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14264-1",
        "minQuantity": 5,
        "tierPrice": 8.55
      },
      {
        "id": "wt-14264-2",
        "minQuantity": 10,
        "tierPrice": 8.1
      },
      {
        "id": "wt-14264-3",
        "minQuantity": 50,
        "tierPrice": 7.65
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "19585",
    "sku": "AT-WC-19585",
    "slug": "keypaid-phone-type-c-16-pin-l7-ver-2",
    "title": "Keypaid Phone Type C 16 pin L7 Ver. 2",
    "description": "Keypaid Phone Type C 16 pin L7 Ver. 2 high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": null,
    "model": null,
    "retailPrice": 6,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/08/L7-Ver.-2-.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-19585-1",
        "minQuantity": 5,
        "tierPrice": 5.7
      },
      {
        "id": "wt-19585-2",
        "minQuantity": 10,
        "tierPrice": 5.4
      },
      {
        "id": "wt-19585-3",
        "minQuantity": 50,
        "tierPrice": 5.1
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "19576",
    "sku": "AT-WC-19576",
    "slug": "keypaid-phone-type-c-16-pin-l6-ver-2",
    "title": "Keypaid Phone Type C 16 pin L6 Ver. 2",
    "description": "Keypaid Phone Type C 16 pin L6 Ver. 2 high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": null,
    "model": null,
    "retailPrice": 6,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/08/L6-ver.-2.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-19576-1",
        "minQuantity": 5,
        "tierPrice": 5.7
      },
      {
        "id": "wt-19576-2",
        "minQuantity": 10,
        "tierPrice": 5.4
      },
      {
        "id": "wt-19576-3",
        "minQuantity": 50,
        "tierPrice": 5.1
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "19577",
    "sku": "AT-WC-19577",
    "slug": "keypaid-phone-type-c-16-pin-l6-ver-1",
    "title": "Keypaid Phone Type C 16 pin L6 Ver. 1",
    "description": "Keypaid Phone Type C 16 pin L6 Ver. 1 high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 7,
      "name": "OnePlus",
      "slug": "oneplus"
    },
    "model": {
      "id": 31744,
      "name": "OnePlus Keypaid Phone Type C 16 pin L6 Ver. 1",
      "slug": "keypaid-phone-type-c-16-pin-l6-ver-1"
    },
    "retailPrice": 6,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/08/L6-Ver.-1.png"
    ],
    "compatibleModels": [
      {
        "id": 31744,
        "name": "OnePlus Keypaid Phone Type C 16 pin L6 Ver. 1",
        "brandName": "OnePlus",
        "slug": "keypaid-phone-type-c-16-pin-l6-ver-1"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19577-1",
        "minQuantity": 5,
        "tierPrice": 5.7
      },
      {
        "id": "wt-19577-2",
        "minQuantity": 10,
        "tierPrice": 5.4
      },
      {
        "id": "wt-19577-3",
        "minQuantity": 50,
        "tierPrice": 5.1
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "19579",
    "sku": "AT-WC-19579",
    "slug": "keypaid-phone-type-c-16-pin-l7-ver-1",
    "title": "Keypaid Phone Type C 16 pin L7 Ver. 1",
    "description": "Keypaid Phone Type C 16 pin L7 Ver. 1 high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 7,
      "name": "OnePlus",
      "slug": "oneplus"
    },
    "model": {
      "id": 19822,
      "name": "OnePlus Keypaid Phone Type C 16 pin L7 Ver. 1",
      "slug": "keypaid-phone-type-c-16-pin-l7-ver-1"
    },
    "retailPrice": 6,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/08/L7-ver.-1.png"
    ],
    "compatibleModels": [
      {
        "id": 19822,
        "name": "OnePlus Keypaid Phone Type C 16 pin L7 Ver. 1",
        "brandName": "OnePlus",
        "slug": "keypaid-phone-type-c-16-pin-l7-ver-1"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19579-1",
        "minQuantity": 5,
        "tierPrice": 5.7
      },
      {
        "id": "wt-19579-2",
        "minQuantity": 10,
        "tierPrice": 5.4
      },
      {
        "id": "wt-19579-3",
        "minQuantity": 50,
        "tierPrice": 5.1
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "15797",
    "sku": "AT-WC-15797",
    "slug": "samsung-a20-18-pin-charging-conector",
    "title": "Samsung A20 18 Pin Charging Conector",
    "description": "Samsung A20 18 Pin Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 41461,
      "name": "Samsung A20 18 Pin Charging Conector",
      "slug": "samsung-a20-18-pin-charging-conector"
    },
    "retailPrice": 8,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/A20-18-pin.webp"
    ],
    "compatibleModels": [
      {
        "id": 41461,
        "name": "Samsung A20 18 Pin Charging Conector",
        "brandName": "Samsung",
        "slug": "samsung-a20-18-pin-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-15797-1",
        "minQuantity": 5,
        "tierPrice": 7.6
      },
      {
        "id": "wt-15797-2",
        "minQuantity": 10,
        "tierPrice": 7.2
      },
      {
        "id": "wt-15797-3",
        "minQuantity": 50,
        "tierPrice": 6.8
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "14851",
    "sku": "AT-WC-14851",
    "slug": "oppo-reno-9-charging-conector",
    "title": "Oppo Reno 9 Charging Conector",
    "description": "Oppo Reno 9 Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 37616,
      "name": "Oppo Reno 9 Charging Conector",
      "slug": "oppo-reno-9-charging-conector"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/Reno_9-removebg-preview-1.png"
    ],
    "compatibleModels": [
      {
        "id": 37616,
        "name": "Oppo Reno 9 Charging Conector",
        "brandName": "Oppo",
        "slug": "oppo-reno-9-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14851-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-14851-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-14851-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "14850",
    "sku": "AT-WC-14850",
    "slug": "samsung-x200-charging-conector",
    "title": "Samsung X200 Charging Conector",
    "description": "Samsung X200 Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 93206,
      "name": "Samsung X200 Charging Conector",
      "slug": "samsung-x200-charging-conector"
    },
    "retailPrice": 32,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/X200-removebg-preview-1.png"
    ],
    "compatibleModels": [
      {
        "id": 93206,
        "name": "Samsung X200 Charging Conector",
        "brandName": "Samsung",
        "slug": "samsung-x200-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14850-1",
        "minQuantity": 5,
        "tierPrice": 30.4
      },
      {
        "id": "wt-14850-2",
        "minQuantity": 10,
        "tierPrice": 28.8
      },
      {
        "id": "wt-14850-3",
        "minQuantity": 50,
        "tierPrice": 27.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "14849",
    "sku": "AT-WC-14849",
    "slug": "oppo-reno-12-charging-conector",
    "title": "Oppo Reno 12 Charging Conector",
    "description": "Oppo Reno 12 Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 70383,
      "name": "Oppo Reno 12 Charging Conector",
      "slug": "oppo-reno-12-charging-conector"
    },
    "retailPrice": 35,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/Reno_12-removebg-preview-1.png"
    ],
    "compatibleModels": [
      {
        "id": 70383,
        "name": "Oppo Reno 12 Charging Conector",
        "brandName": "Oppo",
        "slug": "oppo-reno-12-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14849-1",
        "minQuantity": 5,
        "tierPrice": 33.25
      },
      {
        "id": "wt-14849-2",
        "minQuantity": 10,
        "tierPrice": 31.5
      },
      {
        "id": "wt-14849-3",
        "minQuantity": 50,
        "tierPrice": 29.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "14848",
    "sku": "AT-WC-14848",
    "slug": "vivo-y78-charging-conector",
    "title": "Vivo Y78 Charging Conector",
    "description": "Vivo Y78 Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 4269,
      "name": "Vivo Y78 Charging Conector",
      "slug": "vivo-y78-charging-conector"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/Y78__1_-removebg-preview-1.png"
    ],
    "compatibleModels": [
      {
        "id": 4269,
        "name": "Vivo Y78 Charging Conector",
        "brandName": "Vivo",
        "slug": "vivo-y78-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14848-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-14848-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-14848-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "14847",
    "sku": "AT-WC-14847",
    "slug": "oppo-reno-1-charging-conector",
    "title": "Oppo Reno 1 Charging Conector",
    "description": "Oppo Reno 1 Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 7517,
      "name": "Oppo Reno 1 Charging Conector",
      "slug": "oppo-reno-1-charging-conector"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/Reno_1-removebg-preview-1.png"
    ],
    "compatibleModels": [
      {
        "id": 7517,
        "name": "Oppo Reno 1 Charging Conector",
        "brandName": "Oppo",
        "slug": "oppo-reno-1-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14847-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-14847-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-14847-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "14846",
    "sku": "AT-WC-14846",
    "slug": "mi-12-charging-conector",
    "title": "Mi 12 Charging Conector",
    "description": "Mi 12 Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 9292,
      "name": "Xiaomi Mi 12 Charging Conector",
      "slug": "mi-12-charging-conector"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/Mi_12-removebg-preview-1.png"
    ],
    "compatibleModels": [
      {
        "id": 9292,
        "name": "Xiaomi Mi 12 Charging Conector",
        "brandName": "Xiaomi",
        "slug": "mi-12-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14846-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-14846-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-14846-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "14845",
    "sku": "AT-WC-14845",
    "slug": "oppo-reno-2-charging-conector",
    "title": "Oppo Reno 2 Charging Conector",
    "description": "Oppo Reno 2 Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 53809,
      "name": "Oppo Reno 2 Charging Conector",
      "slug": "oppo-reno-2-charging-conector"
    },
    "retailPrice": 15,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/Reno_2-removebg-preview-1.png"
    ],
    "compatibleModels": [
      {
        "id": 53809,
        "name": "Oppo Reno 2 Charging Conector",
        "brandName": "Oppo",
        "slug": "oppo-reno-2-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14845-1",
        "minQuantity": 5,
        "tierPrice": 14.25
      },
      {
        "id": "wt-14845-2",
        "minQuantity": 10,
        "tierPrice": 13.5
      },
      {
        "id": "wt-14845-3",
        "minQuantity": 50,
        "tierPrice": 12.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "14852",
    "sku": "AT-WC-14852",
    "slug": "oppo-a52-charging-conector",
    "title": "Oppo A52 Charging Conector",
    "description": "Oppo A52 Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 52712,
      "name": "Oppo A52 Charging Conector",
      "slug": "oppo-a52-charging-conector"
    },
    "retailPrice": 8,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/oppo_A52-removebg-preview-1.png"
    ],
    "compatibleModels": [
      {
        "id": 52712,
        "name": "Oppo A52 Charging Conector",
        "brandName": "Oppo",
        "slug": "oppo-a52-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14852-1",
        "minQuantity": 5,
        "tierPrice": 7.6
      },
      {
        "id": "wt-14852-2",
        "minQuantity": 10,
        "tierPrice": 7.2
      },
      {
        "id": "wt-14852-3",
        "minQuantity": 50,
        "tierPrice": 6.8
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "11740",
    "sku": "AT-WC-11740",
    "slug": "vivo-y50-charging-conector",
    "title": "Vivo Y50 Charging Conector",
    "description": "Vivo Y50 Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 73336,
      "name": "Vivo Y50 Charging Conector",
      "slug": "vivo-y50-charging-conector"
    },
    "retailPrice": 18,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/y50.jpg"
    ],
    "compatibleModels": [
      {
        "id": 73336,
        "name": "Vivo Y50 Charging Conector",
        "brandName": "Vivo",
        "slug": "vivo-y50-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11740-1",
        "minQuantity": 5,
        "tierPrice": 17.1
      },
      {
        "id": "wt-11740-2",
        "minQuantity": 10,
        "tierPrice": 16.2
      },
      {
        "id": "wt-11740-3",
        "minQuantity": 50,
        "tierPrice": 15.3
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "4526",
    "sku": "AT-WC-4526",
    "slug": "itel-jio-charging-conector",
    "title": "Itel Jio Charging Conector",
    "description": "Itel Jio Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 13,
      "name": "Itel",
      "slug": "itel"
    },
    "model": {
      "id": 55254,
      "name": "Itel Jio Charging Conector",
      "slug": "itel-jio-charging-conector"
    },
    "retailPrice": 1.5,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/12/itel-1-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 55254,
        "name": "Itel Jio Charging Conector",
        "brandName": "Itel",
        "slug": "itel-jio-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-4526-1",
        "minQuantity": 5,
        "tierPrice": 1.42
      },
      {
        "id": "wt-4526-2",
        "minQuantity": 10,
        "tierPrice": 1.35
      },
      {
        "id": "wt-4526-3",
        "minQuantity": 50,
        "tierPrice": 1.27
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "4525",
    "sku": "AT-WC-4525",
    "slug": "realme-6-charging-conector",
    "title": "Realme 6 Charging Conector",
    "description": "Realme 6 Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 86324,
      "name": "Realme 6 Charging Conector",
      "slug": "realme-6-charging-conector"
    },
    "retailPrice": 9,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/12/Realme-6-cc.png"
    ],
    "compatibleModels": [
      {
        "id": 86324,
        "name": "Realme 6 Charging Conector",
        "brandName": "Realme",
        "slug": "realme-6-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-4525-1",
        "minQuantity": 5,
        "tierPrice": 8.55
      },
      {
        "id": "wt-4525-2",
        "minQuantity": 10,
        "tierPrice": 8.1
      },
      {
        "id": "wt-4525-3",
        "minQuantity": 50,
        "tierPrice": 7.65
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "4414",
    "sku": "AT-WC-4414",
    "slug": "vivo-y21-new-charging-conector",
    "title": "Vivo Y21 New Charging Conector",
    "description": "Vivo Y21 New Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 65630,
      "name": "Vivo Y21 New Charging Conector",
      "slug": "vivo-y21-new-charging-conector"
    },
    "retailPrice": 25,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/12/Photo-from-abhaytecnicals.jpg"
    ],
    "compatibleModels": [
      {
        "id": 65630,
        "name": "Vivo Y21 New Charging Conector",
        "brandName": "Vivo",
        "slug": "vivo-y21-new-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-4414-1",
        "minQuantity": 5,
        "tierPrice": 23.75
      },
      {
        "id": "wt-4414-2",
        "minQuantity": 10,
        "tierPrice": 22.5
      },
      {
        "id": "wt-4414-3",
        "minQuantity": 50,
        "tierPrice": 21.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "4358",
    "sku": "AT-WC-4358",
    "slug": "oppo-a37-charging-conector",
    "title": "Oppo A37 Charging Conector",
    "description": "Oppo A37 Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 65,
      "name": "Oppo A37 Charging Conector",
      "slug": "oppo-a37-charging-conector"
    },
    "retailPrice": 3,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/12/a37-cc.jpg"
    ],
    "compatibleModels": [
      {
        "id": 65,
        "name": "Oppo A37 Charging Conector",
        "brandName": "Oppo",
        "slug": "oppo-a37-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-4358-1",
        "minQuantity": 5,
        "tierPrice": 2.85
      },
      {
        "id": "wt-4358-2",
        "minQuantity": 10,
        "tierPrice": 2.7
      },
      {
        "id": "wt-4358-3",
        "minQuantity": 50,
        "tierPrice": 2.55
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "2207",
    "sku": "AT-WC-2207",
    "slug": "mi-9a-charging-conector",
    "title": "Mi 9A Charging Conector",
    "description": "Mi 9A Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 23967,
      "name": "Xiaomi Mi 9A Charging Conector",
      "slug": "mi-9a-charging-conector"
    },
    "retailPrice": 2.6,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/02/9a_cc-removebg.jpg"
    ],
    "compatibleModels": [
      {
        "id": 23967,
        "name": "Xiaomi Mi 9A Charging Conector",
        "brandName": "Xiaomi",
        "slug": "mi-9a-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2207-1",
        "minQuantity": 5,
        "tierPrice": 2.47
      },
      {
        "id": "wt-2207-2",
        "minQuantity": 10,
        "tierPrice": 2.34
      },
      {
        "id": "wt-2207-3",
        "minQuantity": 50,
        "tierPrice": 2.21
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "811",
    "sku": "AT-WC-811",
    "slug": "vivo-y53-charging-conector",
    "title": "Vivo Y53 Charging Conector",
    "description": "Vivo Y53 Charging Conector high quality mobile spare part.",
    "category": {
      "id": 18,
      "name": "Charging Connectors",
      "slug": "charging-connectors"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 26551,
      "name": "Vivo Y53 Charging Conector",
      "slug": "vivo-y53-charging-conector"
    },
    "retailPrice": 2.8,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/y53-2.jpg"
    ],
    "compatibleModels": [
      {
        "id": 26551,
        "name": "Vivo Y53 Charging Conector",
        "brandName": "Vivo",
        "slug": "vivo-y53-charging-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-811-1",
        "minQuantity": 5,
        "tierPrice": 2.66
      },
      {
        "id": "wt-811-2",
        "minQuantity": 10,
        "tierPrice": 2.52
      },
      {
        "id": "wt-811-3",
        "minQuantity": 50,
        "tierPrice": 2.38
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "5522",
    "sku": "AT-WC-5522",
    "slug": "tecno-in3-charging-flex",
    "title": "Tecno In3 Charging Flex",
    "description": "Tecno In3 Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 57563,
      "name": "Tecno In3",
      "slug": "tecno-in3"
    },
    "retailPrice": 60,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/02/i3.jpg"
    ],
    "compatibleModels": [
      {
        "id": 57563,
        "name": "Tecno In3",
        "brandName": "Tecno",
        "slug": "tecno-in3"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-5522-1",
        "minQuantity": 5,
        "tierPrice": 57
      },
      {
        "id": "wt-5522-2",
        "minQuantity": 10,
        "tierPrice": 54
      },
      {
        "id": "wt-5522-3",
        "minQuantity": 50,
        "tierPrice": 51
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "5530",
    "sku": "AT-WC-5530",
    "slug": "itel-a41-charging-flex",
    "title": "Itel A41 Charging Flex",
    "description": "Itel A41 Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 13,
      "name": "Itel",
      "slug": "itel"
    },
    "model": {
      "id": 27029,
      "name": "Itel A41",
      "slug": "itel-a41"
    },
    "retailPrice": 55,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/02/a41.jpg"
    ],
    "compatibleModels": [
      {
        "id": 27029,
        "name": "Itel A41",
        "brandName": "Itel",
        "slug": "itel-a41"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-5530-1",
        "minQuantity": 5,
        "tierPrice": 52.25
      },
      {
        "id": "wt-5530-2",
        "minQuantity": 10,
        "tierPrice": 49.5
      },
      {
        "id": "wt-5530-3",
        "minQuantity": 50,
        "tierPrice": 46.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "5516",
    "sku": "AT-WC-5516",
    "slug": "honor-8x-charging-flex",
    "title": "Honor 8X Charging Flex",
    "description": "Honor 8X Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": null,
    "model": null,
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/02/Honor-8x.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-5516-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-5516-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-5516-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "5507",
    "sku": "AT-WC-5507",
    "slug": "realme-8-pro-charging-flex",
    "title": "Realme 8 Pro Charging Flex",
    "description": "Realme 8 Pro Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 41001,
      "name": "Realme 8 Pro",
      "slug": "realme-8-pro"
    },
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/02/realme-8-pro.jpg"
    ],
    "compatibleModels": [
      {
        "id": 41001,
        "name": "Realme 8 Pro",
        "brandName": "Realme",
        "slug": "realme-8-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-5507-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-5507-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-5507-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "5505",
    "sku": "AT-WC-5505",
    "slug": "oppo-f5-charging-flex",
    "title": "Oppo F5 Charging Flex",
    "description": "Oppo F5 Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 60510,
      "name": "Oppo F5",
      "slug": "oppo-f5"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/02/F5.jpg"
    ],
    "compatibleModels": [
      {
        "id": 60510,
        "name": "Oppo F5",
        "brandName": "Oppo",
        "slug": "oppo-f5"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-5505-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-5505-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-5505-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "5467",
    "sku": "AT-WC-5467",
    "slug": "oppo-f15-charging-flex",
    "title": "Oppo F15 Charging Flex",
    "description": "Oppo F15 Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 28933,
      "name": "Oppo F15",
      "slug": "oppo-f15"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/02/f15.jpg"
    ],
    "compatibleModels": [
      {
        "id": 28933,
        "name": "Oppo F15",
        "brandName": "Oppo",
        "slug": "oppo-f15"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-5467-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-5467-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-5467-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "3182",
    "sku": "AT-WC-3182",
    "slug": "vivo-y31-2020-cc-flex",
    "title": "Vivo Y31 2020 Cc Flex",
    "description": "Vivo Y31 2020 Cc Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 22758,
      "name": "Vivo Y31 2020 Cc Flex",
      "slug": "vivo-y31-2020-cc-flex"
    },
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/y31-2020.webp"
    ],
    "compatibleModels": [
      {
        "id": 22758,
        "name": "Vivo Y31 2020 Cc Flex",
        "brandName": "Vivo",
        "slug": "vivo-y31-2020-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3182-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-3182-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-3182-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "3181",
    "sku": "AT-WC-3181",
    "slug": "vivo-v15-pro-cc-flex",
    "title": "Vivo V15 pro Cc Flex",
    "description": "Vivo V15 pro Cc Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 4066,
      "name": "Vivo V15 pro Cc Flex",
      "slug": "vivo-v15-pro-cc-flex"
    },
    "retailPrice": 170,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/v15-pro.webp"
    ],
    "compatibleModels": [
      {
        "id": 4066,
        "name": "Vivo V15 pro Cc Flex",
        "brandName": "Vivo",
        "slug": "vivo-v15-pro-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3181-1",
        "minQuantity": 5,
        "tierPrice": 161.5
      },
      {
        "id": "wt-3181-2",
        "minQuantity": 10,
        "tierPrice": 153
      },
      {
        "id": "wt-3181-3",
        "minQuantity": 50,
        "tierPrice": 144.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "3178",
    "sku": "AT-WC-3178",
    "slug": "realme-1-cc-flex",
    "title": "Realme 1 Cc Flex",
    "description": "Realme 1 Cc Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 27316,
      "name": "Realme 1 Cc Flex",
      "slug": "realme-1-cc-flex"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/realme-1.webp"
    ],
    "compatibleModels": [
      {
        "id": 27316,
        "name": "Realme 1 Cc Flex",
        "brandName": "Realme",
        "slug": "realme-1-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3178-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-3178-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-3178-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "3174",
    "sku": "AT-WC-3174",
    "slug": "oppo-f17-pro-cc-flex",
    "title": "Oppo F17 Pro Cc Flex",
    "description": "Oppo F17 Pro Cc Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 36612,
      "name": "Oppo F17 Pro Cc Flex",
      "slug": "oppo-f17-pro-cc-flex"
    },
    "retailPrice": 95,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/f17-pro.jpg"
    ],
    "compatibleModels": [
      {
        "id": 36612,
        "name": "Oppo F17 Pro Cc Flex",
        "brandName": "Oppo",
        "slug": "oppo-f17-pro-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3174-1",
        "minQuantity": 5,
        "tierPrice": 90.25
      },
      {
        "id": "wt-3174-2",
        "minQuantity": 10,
        "tierPrice": 85.5
      },
      {
        "id": "wt-3174-3",
        "minQuantity": 50,
        "tierPrice": 80.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "3107",
    "sku": "AT-WC-3107",
    "slug": "lava-z61-charging-flex",
    "title": "Lava Z61 Charging Flex",
    "description": "Lava Z61 Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 12,
      "name": "Lava",
      "slug": "lava"
    },
    "model": {
      "id": 92305,
      "name": "Lava Z61",
      "slug": "lava-z61"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/z61.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/z61.jpg"
    ],
    "compatibleModels": [
      {
        "id": 92305,
        "name": "Lava Z61",
        "brandName": "Lava",
        "slug": "lava-z61"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3107-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-3107-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-3107-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "444",
    "sku": "AT-WC-444",
    "slug": "nokia-6-1-charging-flex-2",
    "title": "Nokia 6.1+ Charging Flex",
    "description": "Nokia 6.1+ Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 14,
      "name": "Nokia",
      "slug": "nokia"
    },
    "model": {
      "id": 61966,
      "name": "Nokia 6.1+",
      "slug": "nokia-6-1"
    },
    "retailPrice": 60,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/6.1.webp"
    ],
    "compatibleModels": [
      {
        "id": 61966,
        "name": "Nokia 6.1+",
        "brandName": "Nokia",
        "slug": "nokia-6-1"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-444-1",
        "minQuantity": 5,
        "tierPrice": 57
      },
      {
        "id": "wt-444-2",
        "minQuantity": 10,
        "tierPrice": 54
      },
      {
        "id": "wt-444-3",
        "minQuantity": 50,
        "tierPrice": 51
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "349",
    "sku": "AT-WC-349",
    "slug": "mi-a3-charging-flex",
    "title": "Mi A3 Charging Flex",
    "description": "Mi A3 Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 21662,
      "name": "Xiaomi Mi A3",
      "slug": "mi-a3"
    },
    "retailPrice": 55,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/a3-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 21662,
        "name": "Xiaomi Mi A3",
        "brandName": "Xiaomi",
        "slug": "mi-a3"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-349-1",
        "minQuantity": 5,
        "tierPrice": 52.25
      },
      {
        "id": "wt-349-2",
        "minQuantity": 10,
        "tierPrice": 49.5
      },
      {
        "id": "wt-349-3",
        "minQuantity": 50,
        "tierPrice": 46.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "434",
    "sku": "AT-WC-434",
    "slug": "nokia-7-charging-flex",
    "title": "Nokia 7 Charging Flex",
    "description": "Nokia 7 Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 14,
      "name": "Nokia",
      "slug": "nokia"
    },
    "model": {
      "id": 73015,
      "name": "Nokia 7",
      "slug": "nokia-7"
    },
    "retailPrice": 70,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/nokia-7.jpg"
    ],
    "compatibleModels": [
      {
        "id": 73015,
        "name": "Nokia 7",
        "brandName": "Nokia",
        "slug": "nokia-7"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-434-1",
        "minQuantity": 5,
        "tierPrice": 66.5
      },
      {
        "id": "wt-434-2",
        "minQuantity": 10,
        "tierPrice": 63
      },
      {
        "id": "wt-434-3",
        "minQuantity": 50,
        "tierPrice": 59.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "435",
    "sku": "AT-WC-435",
    "slug": "vivo-y21l-charging-flex",
    "title": "Vivo Y21L Charging Flex",
    "description": "Vivo Y21L Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 36830,
      "name": "Vivo Y21L",
      "slug": "vivo-y21l"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/y21l.jpg"
    ],
    "compatibleModels": [
      {
        "id": 36830,
        "name": "Vivo Y21L",
        "brandName": "Vivo",
        "slug": "vivo-y21l"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-435-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-435-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-435-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "436",
    "sku": "AT-WC-436",
    "slug": "oppo-f1s-charging-flex",
    "title": "Oppo F1S Charging Flex",
    "description": "Oppo F1S Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 31598,
      "name": "Oppo F1S",
      "slug": "oppo-f1s"
    },
    "retailPrice": 45,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/f1s.jpg"
    ],
    "compatibleModels": [
      {
        "id": 31598,
        "name": "Oppo F1S",
        "brandName": "Oppo",
        "slug": "oppo-f1s"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-436-1",
        "minQuantity": 5,
        "tierPrice": 42.75
      },
      {
        "id": "wt-436-2",
        "minQuantity": 10,
        "tierPrice": 40.5
      },
      {
        "id": "wt-436-3",
        "minQuantity": 50,
        "tierPrice": 38.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "438",
    "sku": "AT-WC-438",
    "slug": "tecno-hot-9-charging-flex",
    "title": "Tecno HOT 9 Charging Flex",
    "description": "Tecno HOT 9 Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 52568,
      "name": "Tecno HOT 9",
      "slug": "tecno-hot-9"
    },
    "retailPrice": 55,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/hot-9.jpg"
    ],
    "compatibleModels": [
      {
        "id": 52568,
        "name": "Tecno HOT 9",
        "brandName": "Tecno",
        "slug": "tecno-hot-9"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-438-1",
        "minQuantity": 5,
        "tierPrice": 52.25
      },
      {
        "id": "wt-438-2",
        "minQuantity": 10,
        "tierPrice": 49.5
      },
      {
        "id": "wt-438-3",
        "minQuantity": 50,
        "tierPrice": 46.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "439",
    "sku": "AT-WC-439",
    "slug": "mi-a1-charging-flex",
    "title": "Mi A1 Charging Flex",
    "description": "Mi A1 Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 43872,
      "name": "Xiaomi Mi A1",
      "slug": "mi-a1"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/a1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 43872,
        "name": "Xiaomi Mi A1",
        "brandName": "Xiaomi",
        "slug": "mi-a1"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-439-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-439-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-439-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "418",
    "sku": "AT-WC-418",
    "slug": "tecno-kc1-charging-flex",
    "title": "Tecno KC1 Charging Flex",
    "description": "Tecno KC1 Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 90929,
      "name": "Tecno KC1",
      "slug": "tecno-kc1"
    },
    "retailPrice": 55,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/kc1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 90929,
        "name": "Tecno KC1",
        "brandName": "Tecno",
        "slug": "tecno-kc1"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-418-1",
        "minQuantity": 5,
        "tierPrice": 52.25
      },
      {
        "id": "wt-418-2",
        "minQuantity": 10,
        "tierPrice": 49.5
      },
      {
        "id": "wt-418-3",
        "minQuantity": 50,
        "tierPrice": 46.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "419",
    "sku": "AT-WC-419",
    "slug": "nokia-2-2-charging-flex",
    "title": "Nokia 2.2 Charging Flex",
    "description": "Nokia 2.2 Charging Flex high quality mobile spare part.",
    "category": {
      "id": 17,
      "name": "Charging Flex",
      "slug": "charging-flex"
    },
    "brand": {
      "id": 14,
      "name": "Nokia",
      "slug": "nokia"
    },
    "model": {
      "id": 74435,
      "name": "Nokia 2.2",
      "slug": "nokia-2-2"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/nokia-2.2.jpg"
    ],
    "compatibleModels": [
      {
        "id": 74435,
        "name": "Nokia 2.2",
        "brandName": "Nokia",
        "slug": "nokia-2-2"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-419-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-419-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-419-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "15271",
    "sku": "AT-WC-15271",
    "slug": "vivo-y20-display-conector",
    "title": "Vivo Y20  Display Conector",
    "description": "Vivo Y20  Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 34494,
      "name": "Vivo Y20   Conector",
      "slug": "vivo-y20-conector"
    },
    "retailPrice": 25,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/Y20.jpg"
    ],
    "compatibleModels": [
      {
        "id": 34494,
        "name": "Vivo Y20   Conector",
        "brandName": "Vivo",
        "slug": "vivo-y20-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-15271-1",
        "minQuantity": 5,
        "tierPrice": 23.75
      },
      {
        "id": "wt-15271-2",
        "minQuantity": 10,
        "tierPrice": 22.5
      },
      {
        "id": "wt-15271-3",
        "minQuantity": 50,
        "tierPrice": 21.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "11862",
    "sku": "AT-WC-11862",
    "slug": "oppo-f5-f9-display-conector",
    "title": "Oppo F5 / F9 Display Conector",
    "description": "Oppo F5 / F9 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 81998,
      "name": "Oppo F5 / F9  Conector",
      "slug": "oppo-f5-f9-conector"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/f5-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 81998,
        "name": "Oppo F5 / F9  Conector",
        "brandName": "Oppo",
        "slug": "oppo-f5-f9-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11862-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-11862-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-11862-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "11861",
    "sku": "AT-WC-11861",
    "slug": "vivo-y66-display-conector",
    "title": "Vivo Y66 Display Conector",
    "description": "Vivo Y66 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 23285,
      "name": "Vivo Y66  Conector",
      "slug": "vivo-y66-conector"
    },
    "retailPrice": 25,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/y66.webp"
    ],
    "compatibleModels": [
      {
        "id": 23285,
        "name": "Vivo Y66  Conector",
        "brandName": "Vivo",
        "slug": "vivo-y66-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11861-1",
        "minQuantity": 5,
        "tierPrice": 23.75
      },
      {
        "id": "wt-11861-2",
        "minQuantity": 10,
        "tierPrice": 22.5
      },
      {
        "id": "wt-11861-3",
        "minQuantity": 50,
        "tierPrice": 21.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "11860",
    "sku": "AT-WC-11860",
    "slug": "oppo-a33-old-display-conector",
    "title": "Oppo A33 old Display Conector",
    "description": "Oppo A33 old Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 23786,
      "name": "Oppo A33 old  Conector",
      "slug": "oppo-a33-old-conector"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/a33-a37.jpg"
    ],
    "compatibleModels": [
      {
        "id": 23786,
        "name": "Oppo A33 old  Conector",
        "brandName": "Oppo",
        "slug": "oppo-a33-old-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11860-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-11860-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-11860-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "11859",
    "sku": "AT-WC-11859",
    "slug": "vivo-v3-max-display-conector",
    "title": "Vivo V3 Max Display Conector",
    "description": "Vivo V3 Max Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 33775,
      "name": "Vivo V3 Max  Conector",
      "slug": "vivo-v3-max-conector"
    },
    "retailPrice": 25,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/v3-max.jpg"
    ],
    "compatibleModels": [
      {
        "id": 33775,
        "name": "Vivo V3 Max  Conector",
        "brandName": "Vivo",
        "slug": "vivo-v3-max-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11859-1",
        "minQuantity": 5,
        "tierPrice": 23.75
      },
      {
        "id": "wt-11859-2",
        "minQuantity": 10,
        "tierPrice": 22.5
      },
      {
        "id": "wt-11859-3",
        "minQuantity": 50,
        "tierPrice": 21.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "11858",
    "sku": "AT-WC-11858",
    "slug": "samsung-j2-display-conector",
    "title": "Samsung J2 Display Conector",
    "description": "Samsung J2 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 21489,
      "name": "Samsung J2  Conector",
      "slug": "samsung-j2-conector"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/j2.jpg"
    ],
    "compatibleModels": [
      {
        "id": 21489,
        "name": "Samsung J2  Conector",
        "brandName": "Samsung",
        "slug": "samsung-j2-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11858-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-11858-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-11858-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "11857",
    "sku": "AT-WC-11857",
    "slug": "vivo-v20-display-conector",
    "title": "Vivo v20 Display Conector",
    "description": "Vivo v20 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 49786,
      "name": "Vivo v20  Conector",
      "slug": "vivo-v20-conector"
    },
    "retailPrice": 25,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/v20.jpg"
    ],
    "compatibleModels": [
      {
        "id": 49786,
        "name": "Vivo v20  Conector",
        "brandName": "Vivo",
        "slug": "vivo-v20-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11857-1",
        "minQuantity": 5,
        "tierPrice": 23.75
      },
      {
        "id": "wt-11857-2",
        "minQuantity": 10,
        "tierPrice": 22.5
      },
      {
        "id": "wt-11857-3",
        "minQuantity": 50,
        "tierPrice": 21.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "11855",
    "sku": "AT-WC-11855",
    "slug": "oppo-f11-display-conector",
    "title": "Oppo F11 Display Conector",
    "description": "Oppo F11 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 17014,
      "name": "Oppo F11  Conector",
      "slug": "oppo-f11-conector"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/f11-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 17014,
        "name": "Oppo F11  Conector",
        "brandName": "Oppo",
        "slug": "oppo-f11-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11855-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-11855-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-11855-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "11854",
    "sku": "AT-WC-11854",
    "slug": "realme-5-display-conector",
    "title": "Realme 5 Display Conector",
    "description": "Realme 5 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 98356,
      "name": "Realme 5  Conector",
      "slug": "realme-5-conector"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/realme-5-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 98356,
        "name": "Realme 5  Conector",
        "brandName": "Realme",
        "slug": "realme-5-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11854-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-11854-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-11854-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "11851",
    "sku": "AT-WC-11851",
    "slug": "realme-6-display-conector",
    "title": "Realme 6 Display Conector",
    "description": "Realme 6 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 99042,
      "name": "Realme 6  Conector",
      "slug": "realme-6-conector"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/realme-6-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 99042,
        "name": "Realme 6  Conector",
        "brandName": "Realme",
        "slug": "realme-6-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11851-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-11851-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-11851-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "11847",
    "sku": "AT-WC-11847",
    "slug": "oppo-a53-display-conector",
    "title": "Oppo A53 Display Conector",
    "description": "Oppo A53 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 31982,
      "name": "Oppo A53  Conector",
      "slug": "oppo-a53-conector"
    },
    "retailPrice": 25,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/a53.webp"
    ],
    "compatibleModels": [
      {
        "id": 31982,
        "name": "Oppo A53  Conector",
        "brandName": "Oppo",
        "slug": "oppo-a53-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11847-1",
        "minQuantity": 5,
        "tierPrice": 23.75
      },
      {
        "id": "wt-11847-2",
        "minQuantity": 10,
        "tierPrice": 22.5
      },
      {
        "id": "wt-11847-3",
        "minQuantity": 50,
        "tierPrice": 21.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "11846",
    "sku": "AT-WC-11846",
    "slug": "mi-note-5-display-conector",
    "title": "Mi Note 5 Display Conector",
    "description": "Mi Note 5 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 81168,
      "name": "Xiaomi Mi Note 5  Conector",
      "slug": "mi-note-5-conector"
    },
    "retailPrice": 25,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/note-5.webp"
    ],
    "compatibleModels": [
      {
        "id": 81168,
        "name": "Xiaomi Mi Note 5  Conector",
        "brandName": "Xiaomi",
        "slug": "mi-note-5-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11846-1",
        "minQuantity": 5,
        "tierPrice": 23.75
      },
      {
        "id": "wt-11846-2",
        "minQuantity": 10,
        "tierPrice": 22.5
      },
      {
        "id": "wt-11846-3",
        "minQuantity": 50,
        "tierPrice": 21.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "11845",
    "sku": "AT-WC-11845",
    "slug": "samsung-a32-display-conector",
    "title": "Samsung A32 Display Conector",
    "description": "Samsung A32 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 69531,
      "name": "Samsung A32  Conector",
      "slug": "samsung-a32-conector"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/a32.jpg"
    ],
    "compatibleModels": [
      {
        "id": 69531,
        "name": "Samsung A32  Conector",
        "brandName": "Samsung",
        "slug": "samsung-a32-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11845-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-11845-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-11845-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "11844",
    "sku": "AT-WC-11844",
    "slug": "mi-7a-display-conector",
    "title": "Mi 7A Display Conector",
    "description": "Mi 7A Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 95128,
      "name": "Xiaomi Mi 7A  Conector",
      "slug": "mi-7a-conector"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/7a.jpg"
    ],
    "compatibleModels": [
      {
        "id": 95128,
        "name": "Xiaomi Mi 7A  Conector",
        "brandName": "Xiaomi",
        "slug": "mi-7a-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11844-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-11844-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-11844-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "11842",
    "sku": "AT-WC-11842",
    "slug": "poco-x3",
    "title": "Poco x3 Display Conector",
    "description": "Poco x3 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 10,
      "name": "Poco",
      "slug": "poco"
    },
    "model": {
      "id": 49936,
      "name": "Poco x3  Conector",
      "slug": "poco-x3-conector"
    },
    "retailPrice": 25,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/x3.webp"
    ],
    "compatibleModels": [
      {
        "id": 49936,
        "name": "Poco x3  Conector",
        "brandName": "Poco",
        "slug": "poco-x3-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11842-1",
        "minQuantity": 5,
        "tierPrice": 23.75
      },
      {
        "id": "wt-11842-2",
        "minQuantity": 10,
        "tierPrice": 22.5
      },
      {
        "id": "wt-11842-3",
        "minQuantity": 50,
        "tierPrice": 21.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "11841",
    "sku": "AT-WC-11841",
    "slug": "samsung-a30-display-conector",
    "title": "Samsung A30 Display Conector",
    "description": "Samsung A30 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 32501,
      "name": "Samsung A30  Conector",
      "slug": "samsung-a30-conector"
    },
    "retailPrice": 25,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/a30.jpg"
    ],
    "compatibleModels": [
      {
        "id": 32501,
        "name": "Samsung A30  Conector",
        "brandName": "Samsung",
        "slug": "samsung-a30-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11841-1",
        "minQuantity": 5,
        "tierPrice": 23.75
      },
      {
        "id": "wt-11841-2",
        "minQuantity": 10,
        "tierPrice": 22.5
      },
      {
        "id": "wt-11841-3",
        "minQuantity": 50,
        "tierPrice": 21.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "11840",
    "sku": "AT-WC-11840",
    "slug": "samsung-m32-display-conector",
    "title": "Samsung M32 Display Conector",
    "description": "Samsung M32 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 14501,
      "name": "Samsung M32  Conector",
      "slug": "samsung-m32-conector"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/m32-2.jpg"
    ],
    "compatibleModels": [
      {
        "id": 14501,
        "name": "Samsung M32  Conector",
        "brandName": "Samsung",
        "slug": "samsung-m32-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11840-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-11840-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-11840-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "11813",
    "sku": "AT-WC-11813",
    "slug": "vivo-y55-display-conector",
    "title": "Vivo Y55 Display Conector",
    "description": "Vivo Y55 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 82405,
      "name": "Vivo Y55  Conector",
      "slug": "vivo-y55-conector"
    },
    "retailPrice": 22,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/y55.jpg"
    ],
    "compatibleModels": [
      {
        "id": 82405,
        "name": "Vivo Y55  Conector",
        "brandName": "Vivo",
        "slug": "vivo-y55-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11813-1",
        "minQuantity": 5,
        "tierPrice": 20.9
      },
      {
        "id": "wt-11813-2",
        "minQuantity": 10,
        "tierPrice": 19.8
      },
      {
        "id": "wt-11813-3",
        "minQuantity": 50,
        "tierPrice": 18.7
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "11812",
    "sku": "AT-WC-11812",
    "slug": "mi-7-y3-display-conector",
    "title": "Mi 7 / Y3 Display Conector",
    "description": "Mi 7 / Y3 Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 76285,
      "name": "Xiaomi Mi 7 / Y3  Conector",
      "slug": "mi-7-y3-conector"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/mi-7.jpg"
    ],
    "compatibleModels": [
      {
        "id": 76285,
        "name": "Xiaomi Mi 7 / Y3  Conector",
        "brandName": "Xiaomi",
        "slug": "mi-7-y3-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11812-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-11812-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-11812-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "11811",
    "sku": "AT-WC-11811",
    "slug": "oppo-a1k-display-conector",
    "title": "Oppo A1k Display Conector",
    "description": "Oppo A1k Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 91276,
      "name": "Oppo A1k  Conector",
      "slug": "oppo-a1k-conector"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/a1k-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 91276,
        "name": "Oppo A1k  Conector",
        "brandName": "Oppo",
        "slug": "oppo-a1k-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11811-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-11811-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-11811-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "11809",
    "sku": "AT-WC-11809",
    "slug": "mi-8a-display-conector",
    "title": "Mi 8A Display Conector",
    "description": "Mi 8A Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 87497,
      "name": "Xiaomi Mi 8A  Conector",
      "slug": "mi-8a-conector"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/8a.jpg"
    ],
    "compatibleModels": [
      {
        "id": 87497,
        "name": "Xiaomi Mi 8A  Conector",
        "brandName": "Xiaomi",
        "slug": "mi-8a-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11809-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-11809-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-11809-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "11807",
    "sku": "AT-WC-11807",
    "slug": "mi-5a-display-conector",
    "title": "Mi 5A Display Conector",
    "description": "Mi 5A Display Conector high quality mobile spare part.",
    "category": {
      "id": 236,
      "name": "Display Connectors",
      "slug": "display-conectors"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 74234,
      "name": "Xiaomi Mi 5A  Conector",
      "slug": "mi-5a-conector"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/5a.jpg"
    ],
    "compatibleModels": [
      {
        "id": 74234,
        "name": "Xiaomi Mi 5A  Conector",
        "brandName": "Xiaomi",
        "slug": "mi-5a-conector"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11807-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-11807-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-11807-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "20520",
    "sku": "AT-WC-20520",
    "slug": "oppo-a5-2020-a9-2020-finger-sensor",
    "title": "Oppo A5 (2020) / A9 (2020) Finger Sensor",
    "description": "Oppo A5 (2020) / A9 (2020) Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 2583,
      "name": "Oppo A5 (2020) / A9 (2020) Finger Sensor",
      "slug": "oppo-a5-2020-a9-2020-finger-sensor"
    },
    "retailPrice": 180,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/A5-2020.png"
    ],
    "compatibleModels": [
      {
        "id": 2583,
        "name": "Oppo A5 (2020) / A9 (2020) Finger Sensor",
        "brandName": "Oppo",
        "slug": "oppo-a5-2020-a9-2020-finger-sensor"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20520-1",
        "minQuantity": 5,
        "tierPrice": 171
      },
      {
        "id": "wt-20520-2",
        "minQuantity": 10,
        "tierPrice": 162
      },
      {
        "id": "wt-20520-3",
        "minQuantity": 50,
        "tierPrice": 153
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "19525",
    "sku": "AT-WC-19525",
    "slug": "samsung-a06-finger-sensor-100-working",
    "title": "Samsung A06 Finger Sensor 100% Working",
    "description": "Samsung A06 Finger Sensor 100% Working high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 74326,
      "name": "Samsung A06 Finger Sensor 100% Working",
      "slug": "samsung-a06-finger-sensor-100-working"
    },
    "retailPrice": 220,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/1000225411.png"
    ],
    "compatibleModels": [
      {
        "id": 74326,
        "name": "Samsung A06 Finger Sensor 100% Working",
        "brandName": "Samsung",
        "slug": "samsung-a06-finger-sensor-100-working"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19525-1",
        "minQuantity": 5,
        "tierPrice": 209
      },
      {
        "id": "wt-19525-2",
        "minQuantity": 10,
        "tierPrice": 198
      },
      {
        "id": "wt-19525-3",
        "minQuantity": 50,
        "tierPrice": 187
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "18485",
    "sku": "AT-WC-18485",
    "slug": "infinix-smart-8-hd-finger-sensor",
    "title": "Infinix Smart 8 HD Finger Sensor",
    "description": "Infinix Smart 8 HD Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 76273,
      "name": "Infinix Smart 8 HD Finger Sensor",
      "slug": "infinix-smart-8-hd-finger-sensor"
    },
    "retailPrice": 180,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/fingerprint_sensor_flex_cable_for_infinix_smart_8_black_by_maxbhi_com_98764.jpg"
    ],
    "compatibleModels": [
      {
        "id": 76273,
        "name": "Infinix Smart 8 HD Finger Sensor",
        "brandName": "Infinix",
        "slug": "infinix-smart-8-hd-finger-sensor"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18485-1",
        "minQuantity": 5,
        "tierPrice": 171
      },
      {
        "id": "wt-18485-2",
        "minQuantity": 10,
        "tierPrice": 162
      },
      {
        "id": "wt-18485-3",
        "minQuantity": 50,
        "tierPrice": 153
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "18218",
    "sku": "AT-WC-18218",
    "slug": "vivo-y28-new-y17s-finger-sensor",
    "title": "Vivo Y28 New &#8211; Y17S Finger Sensor",
    "description": "Vivo Y28 New &#8211; Y17S Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 43075,
      "name": "Vivo Y28 New &#8211; Y17S Finger Sensor",
      "slug": "vivo-y28-new-8211-y17s-finger-sensor"
    },
    "retailPrice": 180,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/Y28-NEW.jpg"
    ],
    "compatibleModels": [
      {
        "id": 43075,
        "name": "Vivo Y28 New &#8211; Y17S Finger Sensor",
        "brandName": "Vivo",
        "slug": "vivo-y28-new-8211-y17s-finger-sensor"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18218-1",
        "minQuantity": 5,
        "tierPrice": 171
      },
      {
        "id": "wt-18218-2",
        "minQuantity": 10,
        "tierPrice": 162
      },
      {
        "id": "wt-18218-3",
        "minQuantity": 50,
        "tierPrice": 153
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "18217",
    "sku": "AT-WC-18217",
    "slug": "vivo-t2x-finger-sensor",
    "title": "Vivo T2X Finger Sensor",
    "description": "Vivo T2X Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 75789,
      "name": "Vivo T2X Finger Sensor",
      "slug": "vivo-t2x-finger-sensor"
    },
    "retailPrice": 150,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/T2x.jpg"
    ],
    "compatibleModels": [
      {
        "id": 75789,
        "name": "Vivo T2X Finger Sensor",
        "brandName": "Vivo",
        "slug": "vivo-t2x-finger-sensor"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18217-1",
        "minQuantity": 5,
        "tierPrice": 142.5
      },
      {
        "id": "wt-18217-2",
        "minQuantity": 10,
        "tierPrice": 135
      },
      {
        "id": "wt-18217-3",
        "minQuantity": 50,
        "tierPrice": 127.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "17541",
    "sku": "AT-WC-17541",
    "slug": "for-iphone-6g-finger-sensor",
    "title": "For IPhone 6G Finger Sensor",
    "description": "For IPhone 6G Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 3,
      "name": "Apple",
      "slug": "apple"
    },
    "model": {
      "id": 60192,
      "name": "Apple For IPhone 6G Finger Sensor",
      "slug": "for-iphone-6g-finger-sensor"
    },
    "retailPrice": 115,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/6g.webp"
    ],
    "compatibleModels": [
      {
        "id": 60192,
        "name": "Apple For IPhone 6G Finger Sensor",
        "brandName": "Apple",
        "slug": "for-iphone-6g-finger-sensor"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17541-1",
        "minQuantity": 5,
        "tierPrice": 109.25
      },
      {
        "id": "wt-17541-2",
        "minQuantity": 10,
        "tierPrice": 103.5
      },
      {
        "id": "wt-17541-3",
        "minQuantity": 50,
        "tierPrice": 97.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "16686",
    "sku": "AT-WC-16686",
    "slug": "nokia-5-1-finger-sensor",
    "title": "Nokia 5.1+ Finger Sensor",
    "description": "Nokia 5.1+ Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 14,
      "name": "Nokia",
      "slug": "nokia"
    },
    "model": {
      "id": 32456,
      "name": "Nokia 5.1+ Finger Sensor",
      "slug": "nokia-5-1-finger-sensor"
    },
    "retailPrice": 190,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/nokia-5.1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 32456,
        "name": "Nokia 5.1+ Finger Sensor",
        "brandName": "Nokia",
        "slug": "nokia-5-1-finger-sensor"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16686-1",
        "minQuantity": 5,
        "tierPrice": 180.5
      },
      {
        "id": "wt-16686-2",
        "minQuantity": 10,
        "tierPrice": 171
      },
      {
        "id": "wt-16686-3",
        "minQuantity": 50,
        "tierPrice": 161.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "16685",
    "sku": "AT-WC-16685",
    "slug": "mi-11i-finger-sensor",
    "title": "Mi 11i Finger Sensor",
    "description": "Mi 11i Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 35800,
      "name": "Xiaomi Mi 11i Finger Sensor",
      "slug": "mi-11i-finger-sensor"
    },
    "retailPrice": 240,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/mi-11i.jpg"
    ],
    "compatibleModels": [
      {
        "id": 35800,
        "name": "Xiaomi Mi 11i Finger Sensor",
        "brandName": "Xiaomi",
        "slug": "mi-11i-finger-sensor"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16685-1",
        "minQuantity": 5,
        "tierPrice": 228
      },
      {
        "id": "wt-16685-2",
        "minQuantity": 10,
        "tierPrice": 216
      },
      {
        "id": "wt-16685-3",
        "minQuantity": 50,
        "tierPrice": 204
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "16616",
    "sku": "AT-WC-16616",
    "slug": "oppo-a12-finger-sensor",
    "title": "Oppo A12 Finger Sensor",
    "description": "Oppo A12 Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 5423,
      "name": "Oppo A12 Finger Sensor",
      "slug": "oppo-a12-finger-sensor"
    },
    "retailPrice": 120,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/Oppo-A12.webp"
    ],
    "compatibleModels": [
      {
        "id": 5423,
        "name": "Oppo A12 Finger Sensor",
        "brandName": "Oppo",
        "slug": "oppo-a12-finger-sensor"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16616-1",
        "minQuantity": 5,
        "tierPrice": 114
      },
      {
        "id": "wt-16616-2",
        "minQuantity": 10,
        "tierPrice": 108
      },
      {
        "id": "wt-16616-3",
        "minQuantity": 50,
        "tierPrice": 102
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "14933",
    "sku": "AT-WC-14933",
    "slug": "one-5-finger-sensor",
    "title": "One + 5 Finger Sensor",
    "description": "One + 5 Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": null,
    "model": null,
    "retailPrice": 220,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/15-finger-Copy.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-14933-1",
        "minQuantity": 5,
        "tierPrice": 209
      },
      {
        "id": "wt-14933-2",
        "minQuantity": 10,
        "tierPrice": 198
      },
      {
        "id": "wt-14933-3",
        "minQuantity": 50,
        "tierPrice": 187
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "14872",
    "sku": "AT-WC-14872",
    "slug": "one-5t-finger-sensor",
    "title": "One + 5T  Finger Sensor",
    "description": "One + 5T  Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": null,
    "model": null,
    "retailPrice": 200,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/15T.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-14872-1",
        "minQuantity": 5,
        "tierPrice": 190
      },
      {
        "id": "wt-14872-2",
        "minQuantity": 10,
        "tierPrice": 180
      },
      {
        "id": "wt-14872-3",
        "minQuantity": 50,
        "tierPrice": 170
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "14388",
    "sku": "AT-WC-14388",
    "slug": "mi-11-lite-finger-sensor-100-working",
    "title": "Mi 11 Lite Finger Sensor 100% Working",
    "description": "Mi 11 Lite Finger Sensor 100% Working high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 78401,
      "name": "Xiaomi Mi 11 Lite Finger Sensor 100% Working",
      "slug": "mi-11-lite-finger-sensor-100-working"
    },
    "retailPrice": 220,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/mi-11-lite.jpg"
    ],
    "compatibleModels": [
      {
        "id": 78401,
        "name": "Xiaomi Mi 11 Lite Finger Sensor 100% Working",
        "brandName": "Xiaomi",
        "slug": "mi-11-lite-finger-sensor-100-working"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14388-1",
        "minQuantity": 5,
        "tierPrice": 209
      },
      {
        "id": "wt-14388-2",
        "minQuantity": 10,
        "tierPrice": 198
      },
      {
        "id": "wt-14388-3",
        "minQuantity": 50,
        "tierPrice": 187
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "14387",
    "sku": "AT-WC-14387",
    "slug": "mi-11-lite-finger-sensor",
    "title": "Mi 11 Lite Finger Sensor",
    "description": "Mi 11 Lite Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 90253,
      "name": "Xiaomi Mi 11 Lite Finger Sensor",
      "slug": "mi-11-lite-finger-sensor"
    },
    "retailPrice": 95,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/mi-11-lite.jpg"
    ],
    "compatibleModels": [
      {
        "id": 90253,
        "name": "Xiaomi Mi 11 Lite Finger Sensor",
        "brandName": "Xiaomi",
        "slug": "mi-11-lite-finger-sensor"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14387-1",
        "minQuantity": 5,
        "tierPrice": 90.25
      },
      {
        "id": "wt-14387-2",
        "minQuantity": 10,
        "tierPrice": 85.5
      },
      {
        "id": "wt-14387-3",
        "minQuantity": 50,
        "tierPrice": 80.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "13587",
    "sku": "AT-WC-13587",
    "slug": "moto-g40-finger-sensor",
    "title": "Moto G40 Finger Sensor",
    "description": "Moto G40 Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 92166,
      "name": "Motorola Moto G40 Finger Sensor",
      "slug": "moto-g40-finger-sensor"
    },
    "retailPrice": 160,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/G40.png"
    ],
    "compatibleModels": [
      {
        "id": 92166,
        "name": "Motorola Moto G40 Finger Sensor",
        "brandName": "Motorola",
        "slug": "moto-g40-finger-sensor"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-13587-1",
        "minQuantity": 5,
        "tierPrice": 152
      },
      {
        "id": "wt-13587-2",
        "minQuantity": 10,
        "tierPrice": 144
      },
      {
        "id": "wt-13587-3",
        "minQuantity": 50,
        "tierPrice": 136
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "12804",
    "sku": "AT-WC-12804",
    "slug": "poco-m6-pro-finger-sensor",
    "title": "Poco M6 Pro Finger Sensor",
    "description": "Poco M6 Pro Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 10,
      "name": "Poco",
      "slug": "poco"
    },
    "model": {
      "id": 85010,
      "name": "Poco M6 Pro Finger Sensor",
      "slug": "poco-m6-pro-finger-sensor"
    },
    "retailPrice": 180,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/poco-m6-pro-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 85010,
        "name": "Poco M6 Pro Finger Sensor",
        "brandName": "Poco",
        "slug": "poco-m6-pro-finger-sensor"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-12804-1",
        "minQuantity": 5,
        "tierPrice": 171
      },
      {
        "id": "wt-12804-2",
        "minQuantity": 10,
        "tierPrice": 162
      },
      {
        "id": "wt-12804-3",
        "minQuantity": 50,
        "tierPrice": 153
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "12803",
    "sku": "AT-WC-12803",
    "slug": "vivo-y18-y03-finger-sensor",
    "title": "Vivo Y18 / Y03 Finger Sensor",
    "description": "Vivo Y18 / Y03 Finger Sensor high quality mobile spare part.",
    "category": {
      "id": 167,
      "name": "Fingerprint Sensor",
      "slug": "fingerprint-censor"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 42616,
      "name": "Vivo Y18 / Y03 Finger Sensor",
      "slug": "vivo-y18-y03-finger-sensor"
    },
    "retailPrice": 170,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/y03-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 42616,
        "name": "Vivo Y18 / Y03 Finger Sensor",
        "brandName": "Vivo",
        "slug": "vivo-y18-y03-finger-sensor"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-12803-1",
        "minQuantity": 5,
        "tierPrice": 161.5
      },
      {
        "id": "wt-12803-2",
        "minQuantity": 10,
        "tierPrice": 153
      },
      {
        "id": "wt-12803-3",
        "minQuantity": 50,
        "tierPrice": 144.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "20526",
    "sku": "AT-WC-20526",
    "slug": "kechaoda-14-pin-2-4-l-c-d",
    "title": "Kechaoda 14 Pin 2.4 L.C.D.",
    "description": "Kechaoda 14 Pin 2.4 L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": null,
    "model": null,
    "retailPrice": 100,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/14-Pin-2.4.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-20526-1",
        "minQuantity": 5,
        "tierPrice": 95
      },
      {
        "id": "wt-20526-2",
        "minQuantity": 10,
        "tierPrice": 90
      },
      {
        "id": "wt-20526-3",
        "minQuantity": 50,
        "tierPrice": 85
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "20525",
    "sku": "AT-WC-20525",
    "slug": "lava-a5-24-pin-2-4-l-c-d",
    "title": "Lava A5 24 Pin 2.4 L.C.D.",
    "description": "Lava A5 24 Pin 2.4 L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": {
      "id": 12,
      "name": "Lava",
      "slug": "lava"
    },
    "model": {
      "id": 50312,
      "name": "Lava A5 24 Pin 2.4 .",
      "slug": "lava-a5-24-pin-2-4"
    },
    "retailPrice": 105,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/24-Pin-2.4-2.png"
    ],
    "compatibleModels": [
      {
        "id": 50312,
        "name": "Lava A5 24 Pin 2.4 .",
        "brandName": "Lava",
        "slug": "lava-a5-24-pin-2-4"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20525-1",
        "minQuantity": 5,
        "tierPrice": 99.75
      },
      {
        "id": "wt-20525-2",
        "minQuantity": 10,
        "tierPrice": 94.5
      },
      {
        "id": "wt-20525-3",
        "minQuantity": 50,
        "tierPrice": 89.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "20524",
    "sku": "AT-WC-20524",
    "slug": "jio-17-pin-1-8-l-c-d",
    "title": "Jio 17 Pin 1.8 L.C.D.",
    "description": "Jio 17 Pin 1.8 L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": {
      "id": 7,
      "name": "OnePlus",
      "slug": "oneplus"
    },
    "model": {
      "id": 72415,
      "name": "OnePlus Jio 17 Pin 1.8 .",
      "slug": "jio-17-pin-1-8"
    },
    "retailPrice": 70,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/Jio-17-Pin.png"
    ],
    "compatibleModels": [
      {
        "id": 72415,
        "name": "OnePlus Jio 17 Pin 1.8 .",
        "brandName": "OnePlus",
        "slug": "jio-17-pin-1-8"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20524-1",
        "minQuantity": 5,
        "tierPrice": 66.5
      },
      {
        "id": "wt-20524-2",
        "minQuantity": 10,
        "tierPrice": 63
      },
      {
        "id": "wt-20524-3",
        "minQuantity": 50,
        "tierPrice": 59.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "20464",
    "sku": "AT-WC-20464",
    "slug": "40-power-l-c-d",
    "title": "KTT 40 Power L.C.D.",
    "description": "KTT 40 Power L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": null,
    "model": null,
    "retailPrice": 100,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/40-Power-1.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-20464-1",
        "minQuantity": 5,
        "tierPrice": 95
      },
      {
        "id": "wt-20464-2",
        "minQuantity": 10,
        "tierPrice": 90
      },
      {
        "id": "wt-20464-3",
        "minQuantity": 50,
        "tierPrice": 85
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "19521",
    "sku": "AT-WC-19521",
    "slug": "itel-24-in-2-4-size-l-c-d",
    "title": "Itel 24 in 2.4 Size L.C.D.",
    "description": "Itel 24 in 2.4 Size L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": {
      "id": 13,
      "name": "Itel",
      "slug": "itel"
    },
    "model": {
      "id": 77458,
      "name": "Itel 24 in 2.4 Size .",
      "slug": "itel-24-in-2-4-size"
    },
    "retailPrice": 100,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/itel-24-pin.png"
    ],
    "compatibleModels": [
      {
        "id": 77458,
        "name": "Itel 24 in 2.4 Size .",
        "brandName": "Itel",
        "slug": "itel-24-in-2-4-size"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19521-1",
        "minQuantity": 5,
        "tierPrice": 95
      },
      {
        "id": "wt-19521-2",
        "minQuantity": 10,
        "tierPrice": 90
      },
      {
        "id": "wt-19521-3",
        "minQuantity": 50,
        "tierPrice": 85
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "18537",
    "sku": "AT-WC-18537",
    "slug": "jio-bharat-15-pin-1-8-size-l-c-d",
    "title": "Jio Bharat 15 Pin 1.8 Size L.C.D.",
    "description": "Jio Bharat 15 Pin 1.8 Size L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": {
      "id": 7,
      "name": "OnePlus",
      "slug": "oneplus"
    },
    "model": {
      "id": 61465,
      "name": "OnePlus Jio Bharat 15 Pin 1.8 Size .",
      "slug": "jio-bharat-15-pin-1-8-size"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/jio_bharat_15_pin_1.8-removebg-preview.png"
    ],
    "compatibleModels": [
      {
        "id": 61465,
        "name": "OnePlus Jio Bharat 15 Pin 1.8 Size .",
        "brandName": "OnePlus",
        "slug": "jio-bharat-15-pin-1-8-size"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18537-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-18537-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-18537-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "18536",
    "sku": "AT-WC-18536",
    "slug": "jio-bharat-24-pin-2-4-size-l-c-d",
    "title": "Jio Bharat 24 Pin 2.4 Size L.C.D.",
    "description": "Jio Bharat 24 Pin 2.4 Size L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": null,
    "model": null,
    "retailPrice": 100,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/jio_24_pin_2.4-removebg-preview.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-18536-1",
        "minQuantity": 5,
        "tierPrice": 95
      },
      {
        "id": "wt-18536-2",
        "minQuantity": 10,
        "tierPrice": 90
      },
      {
        "id": "wt-18536-3",
        "minQuantity": 50,
        "tierPrice": 85
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "18535",
    "sku": "AT-WC-18535",
    "slug": "cellcor-11-pin-1-8-size-l-c-d",
    "title": "Cellcor 11 Pin 1.8 Size L.C.D.",
    "description": "Cellcor 11 Pin 1.8 Size L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": {
      "id": 7,
      "name": "OnePlus",
      "slug": "oneplus"
    },
    "model": {
      "id": 46514,
      "name": "OnePlus Cellcor 11 Pin 1.8 Size .",
      "slug": "cellcor-11-pin-1-8-size"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/celcor_11_pin_1.8-removebg-preview.png"
    ],
    "compatibleModels": [
      {
        "id": 46514,
        "name": "OnePlus Cellcor 11 Pin 1.8 Size .",
        "brandName": "OnePlus",
        "slug": "cellcor-11-pin-1-8-size"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18535-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-18535-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-18535-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "17838",
    "sku": "AT-WC-17838",
    "slug": "itel-15-pin-2-4-size-l-c-d",
    "title": "Itel 15 Pin 2.4 Size L.C.D.",
    "description": "Itel 15 Pin 2.4 Size L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": {
      "id": 13,
      "name": "Itel",
      "slug": "itel"
    },
    "model": {
      "id": 4220,
      "name": "Itel 15 Pin 2.4 Size .",
      "slug": "itel-15-pin-2-4-size"
    },
    "retailPrice": 105,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/cellcor_14_pin_1.8-removebg-preview.png"
    ],
    "compatibleModels": [
      {
        "id": 4220,
        "name": "Itel 15 Pin 2.4 Size .",
        "brandName": "Itel",
        "slug": "itel-15-pin-2-4-size"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17838-1",
        "minQuantity": 5,
        "tierPrice": 99.75
      },
      {
        "id": "wt-17838-2",
        "minQuantity": 10,
        "tierPrice": 94.5
      },
      {
        "id": "wt-17838-3",
        "minQuantity": 50,
        "tierPrice": 89.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "17704",
    "sku": "AT-WC-17704",
    "slug": "lava-15-pin-2-0-size-l-c-d",
    "title": "Lava 15 Pin 2.0 size L.C.d.",
    "description": "Lava 15 Pin 2.0 size L.C.d. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": {
      "id": 12,
      "name": "Lava",
      "slug": "lava"
    },
    "model": {
      "id": 78929,
      "name": "Lava 15 Pin 2.0 size .",
      "slug": "lava-15-pin-2-0-size"
    },
    "retailPrice": 95,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/lava-15-pin-2.0-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 78929,
        "name": "Lava 15 Pin 2.0 size .",
        "brandName": "Lava",
        "slug": "lava-15-pin-2-0-size"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17704-1",
        "minQuantity": 5,
        "tierPrice": 90.25
      },
      {
        "id": "wt-17704-2",
        "minQuantity": 10,
        "tierPrice": 85.5
      },
      {
        "id": "wt-17704-3",
        "minQuantity": 50,
        "tierPrice": 80.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "16630",
    "sku": "AT-WC-16630",
    "slug": "nokia-37-pin-2-4-size-l-c-d",
    "title": "Nokia 37 Pin 2.4 Size L.C.D",
    "description": "Nokia 37 Pin 2.4 Size L.C.D high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": {
      "id": 14,
      "name": "Nokia",
      "slug": "nokia"
    },
    "model": {
      "id": 2701,
      "name": "Nokia 37 Pin 2.4 Size",
      "slug": "nokia-37-pin-2-4-size"
    },
    "retailPrice": 100,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/WhatsApp_Image_2025-05-11_at_11.03.42_AM__1_-removebg-preview.png"
    ],
    "compatibleModels": [
      {
        "id": 2701,
        "name": "Nokia 37 Pin 2.4 Size",
        "brandName": "Nokia",
        "slug": "nokia-37-pin-2-4-size"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16630-1",
        "minQuantity": 5,
        "tierPrice": 95
      },
      {
        "id": "wt-16630-2",
        "minQuantity": 10,
        "tierPrice": 90
      },
      {
        "id": "wt-16630-3",
        "minQuantity": 50,
        "tierPrice": 85
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "16259",
    "sku": "AT-WC-16259",
    "slug": "nokia-16-pin-2-0-l-c-d",
    "title": "Nokia 16 Pin 2.0 L.C.D.",
    "description": "Nokia 16 Pin 2.0 L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": {
      "id": 14,
      "name": "Nokia",
      "slug": "nokia"
    },
    "model": {
      "id": 58003,
      "name": "Nokia 16 Pin 2.0 .",
      "slug": "nokia-16-pin-2-0"
    },
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/nokia-16-pin-2.0-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 58003,
        "name": "Nokia 16 Pin 2.0 .",
        "brandName": "Nokia",
        "slug": "nokia-16-pin-2-0"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16259-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-16259-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-16259-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "16256",
    "sku": "AT-WC-16256",
    "slug": "micromaxx-16-pin-l-c-d",
    "title": "Micromaxx 16 Pin L.C.D.",
    "description": "Micromaxx 16 Pin L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": null,
    "model": null,
    "retailPrice": 105,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/mmx-16-pin-2.4-scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-16256-1",
        "minQuantity": 5,
        "tierPrice": 99.75
      },
      {
        "id": "wt-16256-2",
        "minQuantity": 10,
        "tierPrice": 94.5
      },
      {
        "id": "wt-16256-3",
        "minQuantity": 50,
        "tierPrice": 89.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "16255",
    "sku": "AT-WC-16255",
    "slug": "benco-14-pin-l-c-d",
    "title": "Benco 14 Pin L.C.D.",
    "description": "Benco 14 Pin L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": null,
    "model": null,
    "retailPrice": 105,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/cellcar-14-pin-2.4-scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-16255-1",
        "minQuantity": 5,
        "tierPrice": 99.75
      },
      {
        "id": "wt-16255-2",
        "minQuantity": 10,
        "tierPrice": 94.5
      },
      {
        "id": "wt-16255-3",
        "minQuantity": 50,
        "tierPrice": 89.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "15328",
    "sku": "AT-WC-15328",
    "slug": "for-lava-15-pin-2-8-l-c-d",
    "title": "For Itel 15 Pin 2.8 L.C.D",
    "description": "For Itel 15 Pin 2.8 L.C.D high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": {
      "id": 13,
      "name": "Itel",
      "slug": "itel"
    },
    "model": {
      "id": 9295,
      "name": "Itel For Itel 15 Pin 2.8",
      "slug": "for-itel-15-pin-2-8"
    },
    "retailPrice": 135,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/cellcor_14_pin_1.8-removebg-preview.png"
    ],
    "compatibleModels": [
      {
        "id": 9295,
        "name": "Itel For Itel 15 Pin 2.8",
        "brandName": "Itel",
        "slug": "for-itel-15-pin-2-8"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-15328-1",
        "minQuantity": 5,
        "tierPrice": 128.25
      },
      {
        "id": "wt-15328-2",
        "minQuantity": 10,
        "tierPrice": 121.5
      },
      {
        "id": "wt-15328-3",
        "minQuantity": 50,
        "tierPrice": 114.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "15327",
    "sku": "AT-WC-15327",
    "slug": "for-cellcor-14-pin-2-4-l-c-d",
    "title": "For Cellcor 14 Pin 2.4 L.C.D",
    "description": "For Cellcor 14 Pin 2.4 L.C.D high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": null,
    "model": null,
    "retailPrice": 105,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/lava-15-pin-2.8.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15327-1",
        "minQuantity": 5,
        "tierPrice": 99.75
      },
      {
        "id": "wt-15327-2",
        "minQuantity": 10,
        "tierPrice": 94.5
      },
      {
        "id": "wt-15327-3",
        "minQuantity": 50,
        "tierPrice": 89.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "15006",
    "sku": "AT-WC-15006",
    "slug": "lava-18-pin-2-8-size-l-c-d",
    "title": "Lava 18 pin 2.8 size L.C.D.",
    "description": "Lava 18 pin 2.8 size L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": {
      "id": 12,
      "name": "Lava",
      "slug": "lava"
    },
    "model": {
      "id": 88391,
      "name": "Lava 18 pin 2.8 size .",
      "slug": "lava-18-pin-2-8-size"
    },
    "retailPrice": 125,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/IMG20250310122327-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 88391,
        "name": "Lava 18 pin 2.8 size .",
        "brandName": "Lava",
        "slug": "lava-18-pin-2-8-size"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-15006-1",
        "minQuantity": 5,
        "tierPrice": 118.75
      },
      {
        "id": "wt-15006-2",
        "minQuantity": 10,
        "tierPrice": 112.5
      },
      {
        "id": "wt-15006-3",
        "minQuantity": 50,
        "tierPrice": 106.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "14485",
    "sku": "AT-WC-14485",
    "slug": "nokia-130-16-pin-2-4-l-c-d",
    "title": "Nokia 130 16 Pin 2.4 L.C.D.",
    "description": "Nokia 130 16 Pin 2.4 L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": {
      "id": 14,
      "name": "Nokia",
      "slug": "nokia"
    },
    "model": {
      "id": 79945,
      "name": "Nokia 130 16 Pin 2.4 .",
      "slug": "nokia-130-16-pin-2-4"
    },
    "retailPrice": 105,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/Nokia-130-16-pin-2.4-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 79945,
        "name": "Nokia 130 16 Pin 2.4 .",
        "brandName": "Nokia",
        "slug": "nokia-130-16-pin-2-4"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14485-1",
        "minQuantity": 5,
        "tierPrice": 99.75
      },
      {
        "id": "wt-14485-2",
        "minQuantity": 10,
        "tierPrice": 94.5
      },
      {
        "id": "wt-14485-3",
        "minQuantity": 50,
        "tierPrice": 89.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "14484",
    "sku": "AT-WC-14484",
    "slug": "cellcor-16-pin-2-8-size-l-c-d",
    "title": "For Cellcor 16 pin 2.8 Size L.C.D.",
    "description": "For Cellcor 16 pin 2.8 Size L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": null,
    "model": null,
    "retailPrice": 135,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/Cellcor-16-pin-.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-14484-1",
        "minQuantity": 5,
        "tierPrice": 128.25
      },
      {
        "id": "wt-14484-2",
        "minQuantity": 10,
        "tierPrice": 121.5
      },
      {
        "id": "wt-14484-3",
        "minQuantity": 50,
        "tierPrice": 114.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "13416",
    "sku": "AT-WC-13416",
    "slug": "for-jio-bharat-20-pin-2-4-size-l-c-d",
    "title": "For Jio Bharat 20 pin 2.4 size L.C.D.",
    "description": "For Jio Bharat 20 pin 2.4 size L.C.D. high quality mobile spare part.",
    "category": {
      "id": 26,
      "name": "Keypad LCD",
      "slug": "keypad-lcd"
    },
    "brand": null,
    "model": null,
    "retailPrice": 100,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/jio-bharat-20-pin-2.4-scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13416-1",
        "minQuantity": 5,
        "tierPrice": 95
      },
      {
        "id": "wt-13416-2",
        "minQuantity": 10,
        "tierPrice": 90
      },
      {
        "id": "wt-13416-3",
        "minQuantity": 50,
        "tierPrice": 85
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "20609",
    "sku": "AT-WC-20609",
    "slug": "realme-c67-5g-main-flex",
    "title": "Realme C67 5G Main Flex",
    "description": "Realme C67 5G Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 18500,
      "name": "Realme C67 5G",
      "slug": "realme-c67-5g"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/C67-5G.png"
    ],
    "compatibleModels": [
      {
        "id": 18500,
        "name": "Realme C67 5G",
        "brandName": "Realme",
        "slug": "realme-c67-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20609-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-20609-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-20609-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "20491",
    "sku": "AT-WC-20491",
    "slug": "1nord-ce4-main-flex",
    "title": "1+Nord CE4 Main Flex",
    "description": "1+Nord CE4 Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 7,
      "name": "OnePlus",
      "slug": "oneplus"
    },
    "model": {
      "id": 63542,
      "name": "OnePlus 1+Nord CE4",
      "slug": "1-nord-ce4"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/ce4-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 63542,
        "name": "OnePlus 1+Nord CE4",
        "brandName": "OnePlus",
        "slug": "1-nord-ce4"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20491-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-20491-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-20491-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "19523",
    "sku": "AT-WC-19523",
    "slug": "vivo-s1-l-c-d-flex",
    "title": "Vivo S1 L.C.D. Flex",
    "description": "Vivo S1 L.C.D. Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 49014,
      "name": "Vivo S1 . Flex",
      "slug": "vivo-s1-flex"
    },
    "retailPrice": 70,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/s1.png"
    ],
    "compatibleModels": [
      {
        "id": 49014,
        "name": "Vivo S1 . Flex",
        "brandName": "Vivo",
        "slug": "vivo-s1-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19523-1",
        "minQuantity": 5,
        "tierPrice": 66.5
      },
      {
        "id": "wt-19523-2",
        "minQuantity": 10,
        "tierPrice": 63
      },
      {
        "id": "wt-19523-3",
        "minQuantity": 50,
        "tierPrice": 59.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "18611",
    "sku": "AT-WC-18611",
    "slug": "lava-z3-main-flex",
    "title": "Lava Z3 Main Flex",
    "description": "Lava Z3 Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 12,
      "name": "Lava",
      "slug": "lava"
    },
    "model": {
      "id": 27936,
      "name": "Lava Z3",
      "slug": "lava-z3"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/z3.webp"
    ],
    "compatibleModels": [
      {
        "id": 27936,
        "name": "Lava Z3",
        "brandName": "Lava",
        "slug": "lava-z3"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18611-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-18611-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-18611-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "18610",
    "sku": "AT-WC-18610",
    "slug": "lava-yuwa-pro-main-flex",
    "title": "Lava Yuwa Pro Main Flex",
    "description": "Lava Yuwa Pro Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 12,
      "name": "Lava",
      "slug": "lava"
    },
    "model": {
      "id": 30728,
      "name": "Lava Yuwa Pro",
      "slug": "lava-yuwa-pro"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/yuwa-pro.webp"
    ],
    "compatibleModels": [
      {
        "id": 30728,
        "name": "Lava Yuwa Pro",
        "brandName": "Lava",
        "slug": "lava-yuwa-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18610-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-18610-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-18610-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "18220",
    "sku": "AT-WC-18220",
    "slug": "one-10r-main-flex",
    "title": "One +10R Main Flex",
    "description": "One +10R Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": null,
    "model": null,
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/1-10R.webp"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-18220-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-18220-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-18220-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "18219",
    "sku": "AT-WC-18219",
    "slug": "realme-7-pro-main-flex-2",
    "title": "Realme 7 Pro L.C.D. Flex",
    "description": "Realme 7 Pro L.C.D. Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 59067,
      "name": "Realme 7 Pro . Flex",
      "slug": "realme-7-pro-flex"
    },
    "retailPrice": 80,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/R-7-PRO.jpg"
    ],
    "compatibleModels": [
      {
        "id": 59067,
        "name": "Realme 7 Pro . Flex",
        "brandName": "Realme",
        "slug": "realme-7-pro-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18219-1",
        "minQuantity": 5,
        "tierPrice": 76
      },
      {
        "id": "wt-18219-2",
        "minQuantity": 10,
        "tierPrice": 72
      },
      {
        "id": "wt-18219-3",
        "minQuantity": 50,
        "tierPrice": 68
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "17707",
    "sku": "AT-WC-17707",
    "slug": "oppo-reno-7-5g-sim-flex",
    "title": "Oppo Reno 7 5G Sim Flex",
    "description": "Oppo Reno 7 5G Sim Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 97897,
      "name": "Oppo Reno 7 5G Sim Flex",
      "slug": "oppo-reno-7-5g-sim-flex"
    },
    "retailPrice": 140,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/RENO-7-SIM-FLEX.webp"
    ],
    "compatibleModels": [
      {
        "id": 97897,
        "name": "Oppo Reno 7 5G Sim Flex",
        "brandName": "Oppo",
        "slug": "oppo-reno-7-5g-sim-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17707-1",
        "minQuantity": 5,
        "tierPrice": 133
      },
      {
        "id": "wt-17707-2",
        "minQuantity": 10,
        "tierPrice": 126
      },
      {
        "id": "wt-17707-3",
        "minQuantity": 50,
        "tierPrice": 119
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "17542",
    "sku": "AT-WC-17542",
    "slug": "moto-g34-main-flex",
    "title": "Moto G34 Main Flex",
    "description": "Moto G34 Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 52927,
      "name": "Motorola Moto G34",
      "slug": "moto-g34"
    },
    "retailPrice": 80,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/g34.jpg"
    ],
    "compatibleModels": [
      {
        "id": 52927,
        "name": "Motorola Moto G34",
        "brandName": "Motorola",
        "slug": "moto-g34"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17542-1",
        "minQuantity": 5,
        "tierPrice": 76
      },
      {
        "id": "wt-17542-2",
        "minQuantity": 10,
        "tierPrice": 72
      },
      {
        "id": "wt-17542-3",
        "minQuantity": 50,
        "tierPrice": 68
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "17212",
    "sku": "AT-WC-17212",
    "slug": "infinix-hot-9-main-flex",
    "title": "Infinix Hot 9 Main Flex",
    "description": "Infinix Hot 9 Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 56962,
      "name": "Infinix Hot 9",
      "slug": "infinix-hot-9"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/hot-9.jpg"
    ],
    "compatibleModels": [
      {
        "id": 56962,
        "name": "Infinix Hot 9",
        "brandName": "Infinix",
        "slug": "infinix-hot-9"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17212-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-17212-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-17212-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "17002",
    "sku": "AT-WC-17002",
    "slug": "samsung-m15-5g-main-flex",
    "title": "Samsung M15 5G Main Flex",
    "description": "Samsung M15 5G Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 32499,
      "name": "Samsung M15 5G",
      "slug": "samsung-m15-5g"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/Sam-M15.webp"
    ],
    "compatibleModels": [
      {
        "id": 32499,
        "name": "Samsung M15 5G",
        "brandName": "Samsung",
        "slug": "samsung-m15-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17002-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-17002-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-17002-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "17001",
    "sku": "AT-WC-17001",
    "slug": "infinix-hot-30-5g-main-flex",
    "title": "Infinix Hot 30 5G Main Flex",
    "description": "Infinix Hot 30 5G Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 64864,
      "name": "Infinix Hot 30 5G",
      "slug": "infinix-hot-30-5g"
    },
    "retailPrice": 55,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/hot-30-5g.webp"
    ],
    "compatibleModels": [
      {
        "id": 64864,
        "name": "Infinix Hot 30 5G",
        "brandName": "Infinix",
        "slug": "infinix-hot-30-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17001-1",
        "minQuantity": 5,
        "tierPrice": 52.25
      },
      {
        "id": "wt-17001-2",
        "minQuantity": 10,
        "tierPrice": 49.5
      },
      {
        "id": "wt-17001-3",
        "minQuantity": 50,
        "tierPrice": 46.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "17000",
    "sku": "AT-WC-17000",
    "slug": "pcoco-x2-main-flex",
    "title": "Pcoco X2 Main Flex",
    "description": "Pcoco X2 Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": null,
    "model": null,
    "retailPrice": 50,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/X2.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-17000-1",
        "minQuantity": 5,
        "tierPrice": 47.5
      },
      {
        "id": "wt-17000-2",
        "minQuantity": 10,
        "tierPrice": 45
      },
      {
        "id": "wt-17000-3",
        "minQuantity": 50,
        "tierPrice": 42.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "16999",
    "sku": "AT-WC-16999",
    "slug": "oppo-f27-pro-main-flex",
    "title": "Oppo F27 Pro Main Flex",
    "description": "Oppo F27 Pro Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 45054,
      "name": "Oppo F27 Pro",
      "slug": "oppo-f27-pro"
    },
    "retailPrice": 60,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/f27-pro.webp"
    ],
    "compatibleModels": [
      {
        "id": 45054,
        "name": "Oppo F27 Pro",
        "brandName": "Oppo",
        "slug": "oppo-f27-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16999-1",
        "minQuantity": 5,
        "tierPrice": 57
      },
      {
        "id": "wt-16999-2",
        "minQuantity": 10,
        "tierPrice": 54
      },
      {
        "id": "wt-16999-3",
        "minQuantity": 50,
        "tierPrice": 51
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "16694",
    "sku": "AT-WC-16694",
    "slug": "honor-8c-main-flex",
    "title": "Honor 8C Main Flex",
    "description": "Honor 8C Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": null,
    "model": null,
    "retailPrice": 55,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/Honor-8C--scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-16694-1",
        "minQuantity": 5,
        "tierPrice": 52.25
      },
      {
        "id": "wt-16694-2",
        "minQuantity": 10,
        "tierPrice": 49.5
      },
      {
        "id": "wt-16694-3",
        "minQuantity": 50,
        "tierPrice": 46.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "16693",
    "sku": "AT-WC-16693",
    "slug": "realme-7-main-flex",
    "title": "Realme 7 Main Flex",
    "description": "Realme 7 Main Flex high quality mobile spare part.",
    "category": {
      "id": 32,
      "name": "Main Flex",
      "slug": "main-flex"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 64341,
      "name": "Realme 7",
      "slug": "realme-7"
    },
    "retailPrice": 55,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/realme-7.jpg"
    ],
    "compatibleModels": [
      {
        "id": 64341,
        "name": "Realme 7",
        "brandName": "Realme",
        "slug": "realme-7"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16693-1",
        "minQuantity": 5,
        "tierPrice": 52.25
      },
      {
        "id": "wt-16693-2",
        "minQuantity": 10,
        "tierPrice": 49.5
      },
      {
        "id": "wt-16693-3",
        "minQuantity": 50,
        "tierPrice": 46.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "15253",
    "sku": "AT-WC-15253",
    "slug": "one-5-mic",
    "title": "One + 5 Mic",
    "description": "One + 5 Mic high quality mobile spare part.",
    "category": {
      "id": 25,
      "name": "Microphone",
      "slug": "microphone"
    },
    "brand": null,
    "model": null,
    "retailPrice": 110,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/15-mic.webp"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15253-1",
        "minQuantity": 5,
        "tierPrice": 104.5
      },
      {
        "id": "wt-15253-2",
        "minQuantity": 10,
        "tierPrice": 99
      },
      {
        "id": "wt-15253-3",
        "minQuantity": 50,
        "tierPrice": 93.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "12811",
    "sku": "AT-WC-12811",
    "slug": "jio-next-6-pin-mic",
    "title": "Jio Next 6 Pin Mic",
    "description": "Jio Next 6 Pin Mic high quality mobile spare part.",
    "category": {
      "id": 25,
      "name": "Microphone",
      "slug": "microphone"
    },
    "brand": null,
    "model": null,
    "retailPrice": 10,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/jio-6-pin.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-12811-1",
        "minQuantity": 5,
        "tierPrice": 9.5
      },
      {
        "id": "wt-12811-2",
        "minQuantity": 10,
        "tierPrice": 9
      },
      {
        "id": "wt-12811-3",
        "minQuantity": 50,
        "tierPrice": 8.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "3939",
    "sku": "AT-WC-3939",
    "slug": "samsung-b310-mic-refresh",
    "title": "Samsung B310 Mic Refresh",
    "description": "Samsung B310 Mic Refresh high quality mobile spare part.",
    "category": {
      "id": 25,
      "name": "Microphone",
      "slug": "microphone"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 92587,
      "name": "Samsung B310 Mic",
      "slug": "samsung-b310-mic"
    },
    "retailPrice": 6,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/09/b310__2_-removebg-preview.png"
    ],
    "compatibleModels": [
      {
        "id": 92587,
        "name": "Samsung B310 Mic",
        "brandName": "Samsung",
        "slug": "samsung-b310-mic"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3939-1",
        "minQuantity": 5,
        "tierPrice": 5.7
      },
      {
        "id": "wt-3939-2",
        "minQuantity": 10,
        "tierPrice": 5.4
      },
      {
        "id": "wt-3939-3",
        "minQuantity": 50,
        "tierPrice": 5.1
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "1033",
    "sku": "AT-WC-1033",
    "slug": "jio-4-pin-mic",
    "title": "Jio 4 pin mic",
    "description": "Jio 4 pin mic high quality mobile spare part.",
    "category": {
      "id": 25,
      "name": "Microphone",
      "slug": "microphone"
    },
    "brand": null,
    "model": null,
    "retailPrice": 11,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/jio-4-pin.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-1033-1",
        "minQuantity": 5,
        "tierPrice": 10.45
      },
      {
        "id": "wt-1033-2",
        "minQuantity": 10,
        "tierPrice": 9.9
      },
      {
        "id": "wt-1033-3",
        "minQuantity": 50,
        "tierPrice": 9.35
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "1032",
    "sku": "AT-WC-1032",
    "slug": "samsung-j2-mic",
    "title": "Samsung j2 mic",
    "description": "Samsung j2 mic high quality mobile spare part.",
    "category": {
      "id": 25,
      "name": "Microphone",
      "slug": "microphone"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 41653,
      "name": "Samsung j2 mic",
      "slug": "samsung-j2-mic"
    },
    "retailPrice": 10,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/j2-mic.jpg"
    ],
    "compatibleModels": [
      {
        "id": 41653,
        "name": "Samsung j2 mic",
        "brandName": "Samsung",
        "slug": "samsung-j2-mic"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-1032-1",
        "minQuantity": 5,
        "tierPrice": 9.5
      },
      {
        "id": "wt-1032-2",
        "minQuantity": 10,
        "tierPrice": 9
      },
      {
        "id": "wt-1032-3",
        "minQuantity": 50,
        "tierPrice": 8.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "1031",
    "sku": "AT-WC-1031",
    "slug": "jio-5-pin-mic",
    "title": "jio 5 pin mic",
    "description": "jio 5 pin mic high quality mobile spare part.",
    "category": {
      "id": 25,
      "name": "Microphone",
      "slug": "microphone"
    },
    "brand": null,
    "model": null,
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/jio-5-pin.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-1031-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-1031-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-1031-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "1030",
    "sku": "AT-WC-1030",
    "slug": "universol-mic",
    "title": "universol mic",
    "description": "universol mic high quality mobile spare part.",
    "category": {
      "id": 25,
      "name": "Microphone",
      "slug": "microphone"
    },
    "brand": null,
    "model": null,
    "retailPrice": 2.1,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/chaina-mic.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-1030-1",
        "minQuantity": 5,
        "tierPrice": 1.99
      },
      {
        "id": "wt-1030-2",
        "minQuantity": 10,
        "tierPrice": 1.89
      },
      {
        "id": "wt-1030-3",
        "minQuantity": 50,
        "tierPrice": 1.78
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "21454",
    "sku": "AT-WC-21454",
    "slug": "realme-11-pro-plus-middle-panel",
    "title": "Realme 11 pro Plus Middle panel",
    "description": "Realme 11 pro Plus Middle panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 83786,
      "name": "Realme 11 pro Plus",
      "slug": "realme-11-pro-plus"
    },
    "retailPrice": 300,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/realme-11-pro.jpg"
    ],
    "compatibleModels": [
      {
        "id": 83786,
        "name": "Realme 11 pro Plus",
        "brandName": "Realme",
        "slug": "realme-11-pro-plus"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21454-1",
        "minQuantity": 5,
        "tierPrice": 285
      },
      {
        "id": "wt-21454-2",
        "minQuantity": 10,
        "tierPrice": 270
      },
      {
        "id": "wt-21454-3",
        "minQuantity": 50,
        "tierPrice": 255
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "19529",
    "sku": "AT-WC-19529",
    "slug": "vivo-v15-middil-panel",
    "title": "Vivo V15 Middle Panel",
    "description": "Vivo V15 Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 5614,
      "name": "Vivo V15",
      "slug": "vivo-v15"
    },
    "retailPrice": 300,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/V15.png"
    ],
    "compatibleModels": [
      {
        "id": 5614,
        "name": "Vivo V15",
        "brandName": "Vivo",
        "slug": "vivo-v15"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19529-1",
        "minQuantity": 5,
        "tierPrice": 285
      },
      {
        "id": "wt-19529-2",
        "minQuantity": 10,
        "tierPrice": 270
      },
      {
        "id": "wt-19529-3",
        "minQuantity": 50,
        "tierPrice": 255
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "19528",
    "sku": "AT-WC-19528",
    "slug": "mi-10i-middil-panel",
    "title": "Mi 10i Middle Panel",
    "description": "Mi 10i Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 49414,
      "name": "Xiaomi Mi 10i",
      "slug": "mi-10i"
    },
    "retailPrice": 380,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/mi-10i.png"
    ],
    "compatibleModels": [
      {
        "id": 49414,
        "name": "Xiaomi Mi 10i",
        "brandName": "Xiaomi",
        "slug": "mi-10i"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19528-1",
        "minQuantity": 5,
        "tierPrice": 361
      },
      {
        "id": "wt-19528-2",
        "minQuantity": 10,
        "tierPrice": 342
      },
      {
        "id": "wt-19528-3",
        "minQuantity": 50,
        "tierPrice": 323
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "19527",
    "sku": "AT-WC-19527",
    "slug": "lava-z3-middil-panel",
    "title": "Lava Z3 Middle Panel",
    "description": "Lava Z3 Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": {
      "id": 12,
      "name": "Lava",
      "slug": "lava"
    },
    "model": {
      "id": 49055,
      "name": "Lava Z3",
      "slug": "lava-z3"
    },
    "retailPrice": 100,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/z3.png"
    ],
    "compatibleModels": [
      {
        "id": 49055,
        "name": "Lava Z3",
        "brandName": "Lava",
        "slug": "lava-z3"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19527-1",
        "minQuantity": 5,
        "tierPrice": 95
      },
      {
        "id": "wt-19527-2",
        "minQuantity": 10,
        "tierPrice": 90
      },
      {
        "id": "wt-19527-3",
        "minQuantity": 50,
        "tierPrice": 85
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "19140",
    "sku": "AT-WC-19140",
    "slug": "vivo-v19e-middil-panel",
    "title": "Vivo V19E Middle Panell",
    "description": "Vivo V19E Middle Panell high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 44538,
      "name": "Vivo V19E l",
      "slug": "vivo-v19e-l"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/y19E.png"
    ],
    "compatibleModels": [
      {
        "id": 44538,
        "name": "Vivo V19E l",
        "brandName": "Vivo",
        "slug": "vivo-v19e-l"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19140-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-19140-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-19140-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "19139",
    "sku": "AT-WC-19139",
    "slug": "moto-g04-middil-panel",
    "title": "Moto G04 Middle Panel",
    "description": "Moto G04 Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 40309,
      "name": "Motorola Moto G04",
      "slug": "moto-g04"
    },
    "retailPrice": 120,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/moto-g04.png"
    ],
    "compatibleModels": [
      {
        "id": 40309,
        "name": "Motorola Moto G04",
        "brandName": "Motorola",
        "slug": "moto-g04"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19139-1",
        "minQuantity": 5,
        "tierPrice": 114
      },
      {
        "id": "wt-19139-2",
        "minQuantity": 10,
        "tierPrice": 108
      },
      {
        "id": "wt-19139-3",
        "minQuantity": 50,
        "tierPrice": 102
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "18689",
    "sku": "AT-WC-18689",
    "slug": "oppo-a31-2020-middil-panel",
    "title": "Oppo A31 2020 Middle Panel",
    "description": "Oppo A31 2020 Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 94720,
      "name": "Oppo A31 2020",
      "slug": "oppo-a31-2020"
    },
    "retailPrice": 70,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/lcd_frame_middle_chassis_for_oppo_a31_2020_black_by_maxbhi_com_44240.jpg"
    ],
    "compatibleModels": [
      {
        "id": 94720,
        "name": "Oppo A31 2020",
        "brandName": "Oppo",
        "slug": "oppo-a31-2020"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18689-1",
        "minQuantity": 5,
        "tierPrice": 66.5
      },
      {
        "id": "wt-18689-2",
        "minQuantity": 10,
        "tierPrice": 63
      },
      {
        "id": "wt-18689-3",
        "minQuantity": 50,
        "tierPrice": 59.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "18571",
    "sku": "AT-WC-18571",
    "slug": "vivo-t3-lite-y18-y03-y28s-middil-panel",
    "title": "Vivo T3 Lite / Y18 / Y03 / Y28s Middle Panel",
    "description": "Vivo T3 Lite / Y18 / Y03 / Y28s Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 44647,
      "name": "Vivo T3 Lite / Y18 / Y03 / Y28s",
      "slug": "vivo-t3-lite-y18-y03-y28s"
    },
    "retailPrice": 70,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/t3_lite-removebg-preview.png"
    ],
    "compatibleModels": [
      {
        "id": 44647,
        "name": "Vivo T3 Lite / Y18 / Y03 / Y28s",
        "brandName": "Vivo",
        "slug": "vivo-t3-lite-y18-y03-y28s"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18571-1",
        "minQuantity": 5,
        "tierPrice": 66.5
      },
      {
        "id": "wt-18571-2",
        "minQuantity": 10,
        "tierPrice": 63
      },
      {
        "id": "wt-18571-3",
        "minQuantity": 50,
        "tierPrice": 59.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "18570",
    "sku": "AT-WC-18570",
    "slug": "benco-y50-pro-middil-panel",
    "title": "Benco Y50 Pro Middle Panel",
    "description": "Benco Y50 Pro Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": null,
    "model": null,
    "retailPrice": 130,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/Benco_Y50_Pro-removebg-preview.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-18570-1",
        "minQuantity": 5,
        "tierPrice": 123.5
      },
      {
        "id": "wt-18570-2",
        "minQuantity": 10,
        "tierPrice": 117
      },
      {
        "id": "wt-18570-3",
        "minQuantity": 50,
        "tierPrice": 110.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "18569",
    "sku": "AT-WC-18569",
    "slug": "18569",
    "title": "Benco Y40 Middle Panel",
    "description": "Benco Y40 Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": null,
    "model": null,
    "retailPrice": 140,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/Benco_Y40-removebg-preview.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-18569-1",
        "minQuantity": 5,
        "tierPrice": 133
      },
      {
        "id": "wt-18569-2",
        "minQuantity": 10,
        "tierPrice": 126
      },
      {
        "id": "wt-18569-3",
        "minQuantity": 50,
        "tierPrice": 119
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "18568",
    "sku": "AT-WC-18568",
    "slug": "benco-v82-middil-panel",
    "title": "Benco V82 Middle Panel",
    "description": "Benco V82 Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": null,
    "model": null,
    "retailPrice": 130,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/Benco_V82-removebg-preview.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-18568-1",
        "minQuantity": 5,
        "tierPrice": 123.5
      },
      {
        "id": "wt-18568-2",
        "minQuantity": 10,
        "tierPrice": 117
      },
      {
        "id": "wt-18568-3",
        "minQuantity": 50,
        "tierPrice": 110.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "18574",
    "sku": "AT-WC-18574",
    "slug": "benco-s1-middil-panel",
    "title": "Benco S1 Middle Panel",
    "description": "Benco S1 Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": null,
    "model": null,
    "retailPrice": 190,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/Benco_S1-removebg-preview-copy.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-18574-1",
        "minQuantity": 5,
        "tierPrice": 180.5
      },
      {
        "id": "wt-18574-2",
        "minQuantity": 10,
        "tierPrice": 171
      },
      {
        "id": "wt-18574-3",
        "minQuantity": 50,
        "tierPrice": 161.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "18566",
    "sku": "AT-WC-18566",
    "slug": "benco-s1-pro-middil-panel",
    "title": "Benco S1 Pro Middle Panel",
    "description": "Benco S1 Pro Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": null,
    "model": null,
    "retailPrice": 190,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/Benco_S1_Pro-removebg-preview.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-18566-1",
        "minQuantity": 5,
        "tierPrice": 180.5
      },
      {
        "id": "wt-18566-2",
        "minQuantity": 10,
        "tierPrice": 171
      },
      {
        "id": "wt-18566-3",
        "minQuantity": 50,
        "tierPrice": 161.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "18565",
    "sku": "AT-WC-18565",
    "slug": "moto-g72-middil-panel",
    "title": "Moto G72 Middle Panel",
    "description": "Moto G72 Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 26435,
      "name": "Motorola Moto G72",
      "slug": "moto-g72"
    },
    "retailPrice": 110,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/g72.webp"
    ],
    "compatibleModels": [
      {
        "id": 26435,
        "name": "Motorola Moto G72",
        "brandName": "Motorola",
        "slug": "moto-g72"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18565-1",
        "minQuantity": 5,
        "tierPrice": 104.5
      },
      {
        "id": "wt-18565-2",
        "minQuantity": 10,
        "tierPrice": 99
      },
      {
        "id": "wt-18565-3",
        "minQuantity": 50,
        "tierPrice": 93.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "17356",
    "sku": "AT-WC-17356",
    "slug": "infinix-smart-8-x6525-middil-panel",
    "title": "Infinix Smart 8 X6525 Middle Panel",
    "description": "Infinix Smart 8 X6525 Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 88518,
      "name": "Infinix Smart 8 X6525",
      "slug": "infinix-smart-8-x6525"
    },
    "retailPrice": 80,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/x6525.webp"
    ],
    "compatibleModels": [
      {
        "id": 88518,
        "name": "Infinix Smart 8 X6525",
        "brandName": "Infinix",
        "slug": "infinix-smart-8-x6525"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17356-1",
        "minQuantity": 5,
        "tierPrice": 76
      },
      {
        "id": "wt-17356-2",
        "minQuantity": 10,
        "tierPrice": 72
      },
      {
        "id": "wt-17356-3",
        "minQuantity": 50,
        "tierPrice": 68
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "16956",
    "sku": "AT-WC-16956",
    "slug": "vivo-t2-pro-middil-panel",
    "title": "Vivo T2 Pro Middle Panel",
    "description": "Vivo T2 Pro Middle Panel high quality mobile spare part.",
    "category": {
      "id": 22,
      "name": "Middle Panel",
      "slug": "middle-panel"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 36967,
      "name": "Vivo T2 Pro",
      "slug": "vivo-t2-pro"
    },
    "retailPrice": 450,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/t2-pro-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 36967,
        "name": "Vivo T2 Pro",
        "brandName": "Vivo",
        "slug": "vivo-t2-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16956-1",
        "minQuantity": 5,
        "tierPrice": 427.5
      },
      {
        "id": "wt-16956-2",
        "minQuantity": 10,
        "tierPrice": 405
      },
      {
        "id": "wt-16956-3",
        "minQuantity": 50,
        "tierPrice": 382.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "3848",
    "sku": "AT-WC-3848",
    "slug": "oppo-f17-pro-oca-touch-glass",
    "title": "Oppo F17 Pro Oca Touch Glass",
    "description": "Oppo F17 Pro Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 80822,
      "name": "Oppo F17 Pro",
      "slug": "oppo-f17-pro"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/08/f17-pro.jpg"
    ],
    "compatibleModels": [
      {
        "id": 80822,
        "name": "Oppo F17 Pro",
        "brandName": "Oppo",
        "slug": "oppo-f17-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3848-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-3848-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-3848-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "3838",
    "sku": "AT-WC-3838",
    "slug": "realme-1-oppo-f5-oca-touch-glass",
    "title": "Realme 1 / Oppo F5 Oca Touch Glass",
    "description": "Realme 1 / Oppo F5 Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 36649,
      "name": "Realme 1 / Oppo F5",
      "slug": "realme-1-oppo-f5"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/08/realme-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 36649,
        "name": "Realme 1 / Oppo F5",
        "brandName": "Realme",
        "slug": "realme-1-oppo-f5"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3838-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-3838-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-3838-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "3837",
    "sku": "AT-WC-3837",
    "slug": "oppo-f3-oca-touch-glass",
    "title": "Oppo F3 Oca Touch Glass",
    "description": "Oppo F3 Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 45705,
      "name": "Oppo F3",
      "slug": "oppo-f3"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/08/f3.jpg"
    ],
    "compatibleModels": [
      {
        "id": 45705,
        "name": "Oppo F3",
        "brandName": "Oppo",
        "slug": "oppo-f3"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3837-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-3837-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-3837-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "3834",
    "sku": "AT-WC-3834",
    "slug": "infinix-hot-11s-oca-touch-glass",
    "title": "Infinix Hot 11s Oca Touch Glass",
    "description": "Infinix Hot 11s Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 15239,
      "name": "Infinix Hot 11s",
      "slug": "infinix-hot-11s"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/08/hot-12-play.jpg"
    ],
    "compatibleModels": [
      {
        "id": 15239,
        "name": "Infinix Hot 11s",
        "brandName": "Infinix",
        "slug": "infinix-hot-11s"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3834-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-3834-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-3834-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "3833",
    "sku": "AT-WC-3833",
    "slug": "infinix-hot-12-pro-oca-touch-glass",
    "title": "Infinix Hot 12 Pro Oca Touch Glass",
    "description": "Infinix Hot 12 Pro Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 27119,
      "name": "Infinix Hot 12 Pro",
      "slug": "infinix-hot-12-pro"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/08/hot-12-pro.webp"
    ],
    "compatibleModels": [
      {
        "id": 27119,
        "name": "Infinix Hot 12 Pro",
        "brandName": "Infinix",
        "slug": "infinix-hot-12-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3833-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-3833-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-3833-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "3259",
    "sku": "AT-WC-3259",
    "slug": "realme-xt-oca-touch-glass",
    "title": "Realme XT Oca Touch Glass",
    "description": "Realme XT Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 82463,
      "name": "Realme XT",
      "slug": "realme-xt"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/xt.webp"
    ],
    "compatibleModels": [
      {
        "id": 82463,
        "name": "Realme XT",
        "brandName": "Realme",
        "slug": "realme-xt"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3259-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-3259-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-3259-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "3250",
    "sku": "AT-WC-3250",
    "slug": "mi-a2-oca-touch-glass",
    "title": "Mi A2 Oca Touch Glass",
    "description": "Mi A2 Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 52039,
      "name": "Xiaomi Mi A2",
      "slug": "mi-a2"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/mi-a2.jpg"
    ],
    "compatibleModels": [
      {
        "id": 52039,
        "name": "Xiaomi Mi A2",
        "brandName": "Xiaomi",
        "slug": "mi-a2"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3250-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-3250-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-3250-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "3232",
    "sku": "AT-WC-3232",
    "slug": "samsung-m20-oca-touch-glass",
    "title": "Samsung M20 OCA Touch Glass",
    "description": "Samsung M20 OCA Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 48876,
      "name": "Samsung M20",
      "slug": "samsung-m20"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/m20-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 48876,
        "name": "Samsung M20",
        "brandName": "Samsung",
        "slug": "samsung-m20"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3232-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-3232-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-3232-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "3230",
    "sku": "AT-WC-3230",
    "slug": "samsung-j4-oca-touch-glass",
    "title": "Samsung J4+ OCA Touch Glass",
    "description": "Samsung J4+ OCA Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 63625,
      "name": "Samsung J4+",
      "slug": "samsung-j4"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/j4.jpg"
    ],
    "compatibleModels": [
      {
        "id": 63625,
        "name": "Samsung J4+",
        "brandName": "Samsung",
        "slug": "samsung-j4"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3230-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-3230-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-3230-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "3229",
    "sku": "AT-WC-3229",
    "slug": "vivo-s1-oca-touch-glass",
    "title": "Vivo S1 OCA Touch Glass",
    "description": "Vivo S1 OCA Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 46097,
      "name": "Vivo S1",
      "slug": "vivo-s1"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/s1-oca.jpg"
    ],
    "compatibleModels": [
      {
        "id": 46097,
        "name": "Vivo S1",
        "brandName": "Vivo",
        "slug": "vivo-s1"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3229-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-3229-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-3229-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "3228",
    "sku": "AT-WC-3228",
    "slug": "vivo-v15-oca-touch-glass",
    "title": "Vivo V15 OCA Touch Glass",
    "description": "Vivo V15 OCA Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 28722,
      "name": "Vivo V15",
      "slug": "vivo-v15"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/v15.jpg"
    ],
    "compatibleModels": [
      {
        "id": 28722,
        "name": "Vivo V15",
        "brandName": "Vivo",
        "slug": "vivo-v15"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3228-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-3228-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-3228-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "3193",
    "sku": "AT-WC-3193",
    "slug": "infinix-hot-11-oca-touch-glass",
    "title": "Infinix Hot 11 OCA Touch Glass",
    "description": "Infinix Hot 11 OCA Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 94766,
      "name": "Infinix Hot 11",
      "slug": "infinix-hot-11"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/07/hot-11.jpg"
    ],
    "compatibleModels": [
      {
        "id": 94766,
        "name": "Infinix Hot 11",
        "brandName": "Infinix",
        "slug": "infinix-hot-11"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-3193-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-3193-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-3193-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "2705",
    "sku": "AT-WC-2705",
    "slug": "tecno-spark-7-oca-glass",
    "title": "Tecno spark 7 Oca Glass",
    "description": "Tecno spark 7 Oca Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 9705,
      "name": "Tecno spark 7 Oca Glass",
      "slug": "tecno-spark-7-oca-glass"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/06/tecno-spark-7.jpg"
    ],
    "compatibleModels": [
      {
        "id": 9705,
        "name": "Tecno spark 7 Oca Glass",
        "brandName": "Tecno",
        "slug": "tecno-spark-7-oca-glass"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2705-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-2705-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-2705-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "2704",
    "sku": "AT-WC-2704",
    "slug": "sumsung-m11-oca-glass",
    "title": "Sumsung M11 Oca Glass",
    "description": "Sumsung M11 Oca Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": null,
    "model": null,
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/06/m11.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-2704-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-2704-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-2704-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "2703",
    "sku": "AT-WC-2703",
    "slug": "samsung-j6-oca-glass",
    "title": "Samsung J6 Oca Glass",
    "description": "Samsung J6 Oca Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 27669,
      "name": "Samsung J6 Oca Glass",
      "slug": "samsung-j6-oca-glass"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/02/samsung-j6.jpg"
    ],
    "compatibleModels": [
      {
        "id": 27669,
        "name": "Samsung J6 Oca Glass",
        "brandName": "Samsung",
        "slug": "samsung-j6-oca-glass"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2703-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-2703-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-2703-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "2260",
    "sku": "AT-WC-2260",
    "slug": "samaung-a21s-oca-touch-glass",
    "title": "Samaung A21S Oca Touch Glass",
    "description": "Samaung A21S Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": null,
    "model": null,
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/02/A21S.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-2260-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-2260-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-2260-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "2259",
    "sku": "AT-WC-2259",
    "slug": "samsung-j8-oca-touch-glass",
    "title": "Samsung J8 Oca Touch Glass",
    "description": "Samsung J8 Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 49778,
      "name": "Samsung J8",
      "slug": "samsung-j8"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/02/j8.jpg"
    ],
    "compatibleModels": [
      {
        "id": 49778,
        "name": "Samsung J8",
        "brandName": "Samsung",
        "slug": "samsung-j8"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2259-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-2259-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-2259-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "2243",
    "sku": "AT-WC-2243",
    "slug": "samsung-a2-core-oca-touch-glass",
    "title": "Samsung A2 Core Oca Touch Glass",
    "description": "Samsung A2 Core Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 50243,
      "name": "Samsung A2 Core",
      "slug": "samsung-a2-core"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/02/a2-core.jpg"
    ],
    "compatibleModels": [
      {
        "id": 50243,
        "name": "Samsung A2 Core",
        "brandName": "Samsung",
        "slug": "samsung-a2-core"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2243-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-2243-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-2243-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "2237",
    "sku": "AT-WC-2237",
    "slug": "samsung-a20s-oca-touch-glass",
    "title": "Samsung A20s Oca Touch Glass",
    "description": "Samsung A20s Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 43935,
      "name": "Samsung A20s",
      "slug": "samsung-a20s"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/02/a20s.jpg"
    ],
    "compatibleModels": [
      {
        "id": 43935,
        "name": "Samsung A20s",
        "brandName": "Samsung",
        "slug": "samsung-a20s"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2237-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-2237-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-2237-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "2234",
    "sku": "AT-WC-2234",
    "slug": "samsung-j5-prime-oca-touch-glass",
    "title": "Samsung J5 prime Oca Touch Glass",
    "description": "Samsung J5 prime Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 80897,
      "name": "Samsung J5 prime",
      "slug": "samsung-j5-prime"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/02/J5-PRIME.jpg"
    ],
    "compatibleModels": [
      {
        "id": 80897,
        "name": "Samsung J5 prime",
        "brandName": "Samsung",
        "slug": "samsung-j5-prime"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2234-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-2234-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-2234-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "1577",
    "sku": "AT-WC-1577",
    "slug": "mi-note-6-pro-oca-touch-glass",
    "title": "Mi NOTE 6 Pro OCA Touch glass",
    "description": "Mi NOTE 6 Pro OCA Touch glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 48049,
      "name": "Xiaomi Mi NOTE 6 Pro",
      "slug": "mi-note-6-pro"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/NOTE-6-PRO-5.jpg"
    ],
    "compatibleModels": [
      {
        "id": 48049,
        "name": "Xiaomi Mi NOTE 6 Pro",
        "brandName": "Xiaomi",
        "slug": "mi-note-6-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-1577-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-1577-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-1577-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "1579",
    "sku": "AT-WC-1579",
    "slug": "vivo-v11-pro-oca-touch-glass",
    "title": "Vivo V11 Pro OCA Touch glass",
    "description": "Vivo V11 Pro OCA Touch glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 8641,
      "name": "Vivo V11 Pro",
      "slug": "vivo-v11-pro"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/v11-pro-2.jpg"
    ],
    "compatibleModels": [
      {
        "id": 8641,
        "name": "Vivo V11 Pro",
        "brandName": "Vivo",
        "slug": "vivo-v11-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-1579-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-1579-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-1579-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "1582",
    "sku": "AT-WC-1582",
    "slug": "samsung-a10s-oca-touch-glass",
    "title": "Samsung A10s OCA Touch glass",
    "description": "Samsung A10s OCA Touch glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 3296,
      "name": "Samsung A10s",
      "slug": "samsung-a10s"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/a10s-2.jpg"
    ],
    "compatibleModels": [
      {
        "id": 3296,
        "name": "Samsung A10s",
        "brandName": "Samsung",
        "slug": "samsung-a10s"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-1582-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-1582-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-1582-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "1587",
    "sku": "AT-WC-1587",
    "slug": "vivo-y71-oca-touch-glass",
    "title": "Vivo Y71 Oca Touch Glass",
    "description": "Vivo Y71 Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 44032,
      "name": "Vivo Y71",
      "slug": "vivo-y71"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/Y71-7.jpg"
    ],
    "compatibleModels": [
      {
        "id": 44032,
        "name": "Vivo Y71",
        "brandName": "Vivo",
        "slug": "vivo-y71"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-1587-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-1587-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-1587-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "1560",
    "sku": "AT-WC-1560",
    "slug": "vivo-v9-oca-touch-glass",
    "title": "Vivo V9 Oca Touch Glass",
    "description": "Vivo V9 Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 89831,
      "name": "Vivo V9",
      "slug": "vivo-v9"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/v9-3.jpg"
    ],
    "compatibleModels": [
      {
        "id": 89831,
        "name": "Vivo V9",
        "brandName": "Vivo",
        "slug": "vivo-v9"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-1560-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-1560-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-1560-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "1491",
    "sku": "AT-WC-1491",
    "slug": "infinix-hot-8-oca-touch-glass",
    "title": "Infinix Hot 8 Oca Touch Glass",
    "description": "Infinix Hot 8 Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 42282,
      "name": "Infinix Hot 8",
      "slug": "infinix-hot-8"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/hot-8-2.jpg"
    ],
    "compatibleModels": [
      {
        "id": 42282,
        "name": "Infinix Hot 8",
        "brandName": "Infinix",
        "slug": "infinix-hot-8"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-1491-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-1491-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-1491-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "1479",
    "sku": "AT-WC-1479",
    "slug": "moto-one-power-oca-touch-glass",
    "title": "Moto One Power Oca Touch Glass",
    "description": "Moto One Power Oca Touch Glass high quality mobile spare part.",
    "category": {
      "id": 24,
      "name": "OCA Touch Glass",
      "slug": "oca-touch-glass"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 64559,
      "name": "Motorola Moto One Power",
      "slug": "moto-one-power"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/one-power-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 64559,
        "name": "Motorola Moto One Power",
        "brandName": "Motorola",
        "slug": "moto-one-power"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-1479-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-1479-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-1479-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "22118",
    "sku": "AT-WC-22118",
    "slug": "moto-g35-side-rubber-key",
    "title": "Moto G35 Side Rubber Key",
    "description": "Moto G35 Side Rubber Key high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 8,
      "name": "Motorola",
      "slug": "motorola"
    },
    "model": {
      "id": 53243,
      "name": "Motorola Moto G35",
      "slug": "moto-g35"
    },
    "retailPrice": 15,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/G35.png"
    ],
    "compatibleModels": [
      {
        "id": 53243,
        "name": "Motorola Moto G35",
        "brandName": "Motorola",
        "slug": "moto-g35"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-22118-1",
        "minQuantity": 5,
        "tierPrice": 14.25
      },
      {
        "id": "wt-22118-2",
        "minQuantity": 10,
        "tierPrice": 13.5
      },
      {
        "id": "wt-22118-3",
        "minQuantity": 50,
        "tierPrice": 12.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "21658",
    "sku": "AT-WC-21658",
    "slug": "vivo-y28-4g-on-off-flex",
    "title": "Vivo Y28 4G on/off Flex",
    "description": "Vivo Y28 4G on/off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 67087,
      "name": "Vivo Y28 4G on/off Flex",
      "slug": "vivo-y28-4g-on-off-flex"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/01/y28-4g.png"
    ],
    "compatibleModels": [
      {
        "id": 67087,
        "name": "Vivo Y28 4G on/off Flex",
        "brandName": "Vivo",
        "slug": "vivo-y28-4g-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-21658-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-21658-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-21658-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "20714",
    "sku": "AT-WC-20714",
    "slug": "oppo-a74-5g-on-off-flex",
    "title": "Oppo A74 5G On/Off Flex",
    "description": "Oppo A74 5G On/Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 34188,
      "name": "Oppo A74 5G On/Off Flex",
      "slug": "oppo-a74-5g-on-off-flex"
    },
    "retailPrice": 13,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/A74-5G.png"
    ],
    "compatibleModels": [
      {
        "id": 34188,
        "name": "Oppo A74 5G On/Off Flex",
        "brandName": "Oppo",
        "slug": "oppo-a74-5g-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20714-1",
        "minQuantity": 5,
        "tierPrice": 12.35
      },
      {
        "id": "wt-20714-2",
        "minQuantity": 10,
        "tierPrice": 11.7
      },
      {
        "id": "wt-20714-3",
        "minQuantity": 50,
        "tierPrice": 11.05
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "20713",
    "sku": "AT-WC-20713",
    "slug": "oppo-f21-pro-4g-on-off-flex",
    "title": "Oppo F21 Pro 4G On/Off Flex",
    "description": "Oppo F21 Pro 4G On/Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 47677,
      "name": "Oppo F21 Pro 4G On/Off Flex",
      "slug": "oppo-f21-pro-4g-on-off-flex"
    },
    "retailPrice": 13,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/F21-Pro-4G.png"
    ],
    "compatibleModels": [
      {
        "id": 47677,
        "name": "Oppo F21 Pro 4G On/Off Flex",
        "brandName": "Oppo",
        "slug": "oppo-f21-pro-4g-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20713-1",
        "minQuantity": 5,
        "tierPrice": 12.35
      },
      {
        "id": "wt-20713-2",
        "minQuantity": 10,
        "tierPrice": 11.7
      },
      {
        "id": "wt-20713-3",
        "minQuantity": 50,
        "tierPrice": 11.05
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "20710",
    "sku": "AT-WC-20710",
    "slug": "honor-9x-on-off-flex",
    "title": "Honor 9X On/Off Flex",
    "description": "Honor 9X On/Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": null,
    "model": null,
    "retailPrice": 17,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/9X.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-20710-1",
        "minQuantity": 5,
        "tierPrice": 16.15
      },
      {
        "id": "wt-20710-2",
        "minQuantity": 10,
        "tierPrice": 15.3
      },
      {
        "id": "wt-20710-3",
        "minQuantity": 50,
        "tierPrice": 14.45
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "20711",
    "sku": "AT-WC-20711",
    "slug": "oppo-a18-new-on-off-flex",
    "title": "Oppo A18 New On/Off Flex",
    "description": "Oppo A18 New On/Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 11458,
      "name": "Oppo A18 New On/Off Flex",
      "slug": "oppo-a18-new-on-off-flex"
    },
    "retailPrice": 18,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/A18-new.png"
    ],
    "compatibleModels": [
      {
        "id": 11458,
        "name": "Oppo A18 New On/Off Flex",
        "brandName": "Oppo",
        "slug": "oppo-a18-new-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20711-1",
        "minQuantity": 5,
        "tierPrice": 17.1
      },
      {
        "id": "wt-20711-2",
        "minQuantity": 10,
        "tierPrice": 16.2
      },
      {
        "id": "wt-20711-3",
        "minQuantity": 50,
        "tierPrice": 15.3
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "20712",
    "sku": "AT-WC-20712",
    "slug": "mi-note-11-pro-on-off-flex-2",
    "title": "Mi Note 11 Pro+ On/Off Flex",
    "description": "Mi Note 11 Pro+ On/Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 26010,
      "name": "Xiaomi Mi Note 11 Pro+ On/Off Flex",
      "slug": "mi-note-11-pro-on-off-flex"
    },
    "retailPrice": 18,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/12/Note-11-pro.png"
    ],
    "compatibleModels": [
      {
        "id": 26010,
        "name": "Xiaomi Mi Note 11 Pro+ On/Off Flex",
        "brandName": "Xiaomi",
        "slug": "mi-note-11-pro-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20712-1",
        "minQuantity": 5,
        "tierPrice": 17.1
      },
      {
        "id": "wt-20712-2",
        "minQuantity": 10,
        "tierPrice": 16.2
      },
      {
        "id": "wt-20712-3",
        "minQuantity": 50,
        "tierPrice": 15.3
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "19845",
    "sku": "AT-WC-19845",
    "slug": "oneplus-8-on-off",
    "title": "OnePlus 8 On/Off",
    "description": "OnePlus 8 On/Off high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 7,
      "name": "OnePlus",
      "slug": "oneplus"
    },
    "model": {
      "id": 26171,
      "name": "OnePlus 8 On/Off",
      "slug": "oneplus-8-on-off"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/1-8.png"
    ],
    "compatibleModels": [
      {
        "id": 26171,
        "name": "OnePlus 8 On/Off",
        "brandName": "OnePlus",
        "slug": "oneplus-8-on-off"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19845-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-19845-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-19845-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "19844",
    "sku": "AT-WC-19844",
    "slug": "oppo-a96-on-off-flex",
    "title": "Oppo A96 On/Off Flex",
    "description": "Oppo A96 On/Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 92701,
      "name": "Oppo A96 On/Off Flex",
      "slug": "oppo-a96-on-off-flex"
    },
    "retailPrice": 13,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/Op-A96.jpg"
    ],
    "compatibleModels": [
      {
        "id": 92701,
        "name": "Oppo A96 On/Off Flex",
        "brandName": "Oppo",
        "slug": "oppo-a96-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19844-1",
        "minQuantity": 5,
        "tierPrice": 12.35
      },
      {
        "id": "wt-19844-2",
        "minQuantity": 10,
        "tierPrice": 11.7
      },
      {
        "id": "wt-19844-3",
        "minQuantity": 50,
        "tierPrice": 11.05
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "19843",
    "sku": "AT-WC-19843",
    "slug": "oppo-a7-on-off-flex",
    "title": "Oppo A7 On/Off Flex",
    "description": "Oppo A7 On/Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 49759,
      "name": "Oppo A7 On/Off Flex",
      "slug": "oppo-a7-on-off-flex"
    },
    "retailPrice": 13,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/11/op-A7.jpg"
    ],
    "compatibleModels": [
      {
        "id": 49759,
        "name": "Oppo A7 On/Off Flex",
        "brandName": "Oppo",
        "slug": "oppo-a7-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19843-1",
        "minQuantity": 5,
        "tierPrice": 12.35
      },
      {
        "id": "wt-19843-2",
        "minQuantity": 10,
        "tierPrice": 11.7
      },
      {
        "id": "wt-19843-3",
        "minQuantity": 50,
        "tierPrice": 11.05
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "19526",
    "sku": "AT-WC-19526",
    "slug": "mi-note-10-5g-on-off-flex",
    "title": "Mi Note 10 5G On/Off Flex",
    "description": "Mi Note 10 5G On/Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 94281,
      "name": "Xiaomi Mi Note 10 5G On/Off Flex",
      "slug": "mi-note-10-5g-on-off-flex"
    },
    "retailPrice": 17,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/note-10-5g.png"
    ],
    "compatibleModels": [
      {
        "id": 94281,
        "name": "Xiaomi Mi Note 10 5G On/Off Flex",
        "brandName": "Xiaomi",
        "slug": "mi-note-10-5g-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19526-1",
        "minQuantity": 5,
        "tierPrice": 16.15
      },
      {
        "id": "wt-19526-2",
        "minQuantity": 10,
        "tierPrice": 15.3
      },
      {
        "id": "wt-19526-3",
        "minQuantity": 50,
        "tierPrice": 14.45
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "19190",
    "sku": "AT-WC-19190",
    "slug": "oppo-a54-4g-on-off-flex",
    "title": "Oppo A54 4g On/Off Flex",
    "description": "Oppo A54 4g On/Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 66710,
      "name": "Oppo A54 4g On/Off Flex",
      "slug": "oppo-a54-4g-on-off-flex"
    },
    "retailPrice": 13,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/a54-4g.png"
    ],
    "compatibleModels": [
      {
        "id": 66710,
        "name": "Oppo A54 4g On/Off Flex",
        "brandName": "Oppo",
        "slug": "oppo-a54-4g-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19190-1",
        "minQuantity": 5,
        "tierPrice": 12.35
      },
      {
        "id": "wt-19190-2",
        "minQuantity": 10,
        "tierPrice": 11.7
      },
      {
        "id": "wt-19190-3",
        "minQuantity": 50,
        "tierPrice": 11.05
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "18216",
    "sku": "AT-WC-18216",
    "slug": "oppo-a11x-on-off-flex",
    "title": "Oppo A11X On/Off Flex",
    "description": "Oppo A11X On/Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 89657,
      "name": "Oppo A11X On/Off Flex",
      "slug": "oppo-a11x-on-off-flex"
    },
    "retailPrice": 15,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/A11x.webp"
    ],
    "compatibleModels": [
      {
        "id": 89657,
        "name": "Oppo A11X On/Off Flex",
        "brandName": "Oppo",
        "slug": "oppo-a11x-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18216-1",
        "minQuantity": 5,
        "tierPrice": 14.25
      },
      {
        "id": "wt-18216-2",
        "minQuantity": 10,
        "tierPrice": 13.5
      },
      {
        "id": "wt-18216-3",
        "minQuantity": 50,
        "tierPrice": 12.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "17546",
    "sku": "AT-WC-17546",
    "slug": "oppo-a3x-on-off-flex",
    "title": "Oppo A3X On/Off Flex",
    "description": "Oppo A3X On/Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 76423,
      "name": "Oppo A3X On/Off Flex",
      "slug": "oppo-a3x-on-off-flex"
    },
    "retailPrice": 18,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/a3x.jpg"
    ],
    "compatibleModels": [
      {
        "id": 76423,
        "name": "Oppo A3X On/Off Flex",
        "brandName": "Oppo",
        "slug": "oppo-a3x-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17546-1",
        "minQuantity": 5,
        "tierPrice": 17.1
      },
      {
        "id": "wt-17546-2",
        "minQuantity": 10,
        "tierPrice": 16.2
      },
      {
        "id": "wt-17546-3",
        "minQuantity": 50,
        "tierPrice": 15.3
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "17209",
    "sku": "AT-WC-17209",
    "slug": "tecno-pop-5-pro-on-off-flex",
    "title": "Tecno Pop 5 Pro On Off Flex",
    "description": "Tecno Pop 5 Pro On Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 58751,
      "name": "Tecno Pop 5 Pro On Off Flex",
      "slug": "tecno-pop-5-pro-on-off-flex"
    },
    "retailPrice": 18,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/pop-5-pro-scaled.jpeg"
    ],
    "compatibleModels": [
      {
        "id": 58751,
        "name": "Tecno Pop 5 Pro On Off Flex",
        "brandName": "Tecno",
        "slug": "tecno-pop-5-pro-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17209-1",
        "minQuantity": 5,
        "tierPrice": 17.1
      },
      {
        "id": "wt-17209-2",
        "minQuantity": 10,
        "tierPrice": 16.2
      },
      {
        "id": "wt-17209-3",
        "minQuantity": 50,
        "tierPrice": 15.3
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "16671",
    "sku": "AT-WC-16671",
    "slug": "vivo-nex-on-off-flex",
    "title": "Vivo Nex On Off Flex",
    "description": "Vivo Nex On Off Flex high quality mobile spare part.",
    "category": {
      "id": 20,
      "name": "On / Off Flex",
      "slug": "on-off-flex"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 70995,
      "name": "Vivo Nex On Off Flex",
      "slug": "vivo-nex-on-off-flex"
    },
    "retailPrice": 22,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/vivo-nex.jpg"
    ],
    "compatibleModels": [
      {
        "id": 70995,
        "name": "Vivo Nex On Off Flex",
        "brandName": "Vivo",
        "slug": "vivo-nex-on-off-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16671-1",
        "minQuantity": 5,
        "tierPrice": 20.9
      },
      {
        "id": "wt-16671-2",
        "minQuantity": 10,
        "tierPrice": 19.8
      },
      {
        "id": "wt-16671-3",
        "minQuantity": 50,
        "tierPrice": 18.7
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "20049",
    "sku": "AT-WC-20049",
    "slug": "itel-p55-og-cc-flex",
    "title": "Itel P55 Og CC Flex",
    "description": "Itel P55 Og CC Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 13,
      "name": "Itel",
      "slug": "itel"
    },
    "model": {
      "id": 67909,
      "name": "Itel P55 Og CC Flex",
      "slug": "itel-p55-og-cc-flex"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/08/itel-p55-1.png"
    ],
    "compatibleModels": [
      {
        "id": 67909,
        "name": "Itel P55 Og CC Flex",
        "brandName": "Itel",
        "slug": "itel-p55-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20049-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-20049-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-20049-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "20048",
    "sku": "AT-WC-20048",
    "slug": "vivo-v7-og-cc-flex",
    "title": "Vivo V7+ Og CC Flex",
    "description": "Vivo V7+ Og CC Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 35219,
      "name": "Vivo V7+ Og CC Flex",
      "slug": "vivo-v7-og-cc-flex"
    },
    "retailPrice": 80,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/08/v7.png"
    ],
    "compatibleModels": [
      {
        "id": 35219,
        "name": "Vivo V7+ Og CC Flex",
        "brandName": "Vivo",
        "slug": "vivo-v7-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20048-1",
        "minQuantity": 5,
        "tierPrice": 76
      },
      {
        "id": "wt-20048-2",
        "minQuantity": 10,
        "tierPrice": 72
      },
      {
        "id": "wt-20048-3",
        "minQuantity": 50,
        "tierPrice": 68
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "20047",
    "sku": "AT-WC-20047",
    "slug": "realme-9-pro-og-cc-flex",
    "title": "Realme 9 Pro Og CC Flex",
    "description": "Realme 9 Pro Og CC Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 2869,
      "name": "Realme 9 Pro Og CC Flex",
      "slug": "realme-9-pro-og-cc-flex"
    },
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/08/Realme-9-Pro-1.png"
    ],
    "compatibleModels": [
      {
        "id": 2869,
        "name": "Realme 9 Pro Og CC Flex",
        "brandName": "Realme",
        "slug": "realme-9-pro-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-20047-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-20047-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-20047-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "20045",
    "sku": "AT-WC-20045",
    "slug": "smart-8-og-cc-flex",
    "title": "Smart 8 Og CC Flex",
    "description": "Smart 8 Og CC Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": null,
    "model": null,
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/08/smart-8.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-20045-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-20045-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-20045-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "20046",
    "sku": "AT-WC-20046",
    "slug": "one-plus-6-og-cc-flex",
    "title": "One Plus 6 Og CC Flex",
    "description": "One Plus 6 Og CC Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": null,
    "model": null,
    "retailPrice": 110,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/12/16.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-20046-1",
        "minQuantity": 5,
        "tierPrice": 104.5
      },
      {
        "id": "wt-20046-2",
        "minQuantity": 10,
        "tierPrice": 99
      },
      {
        "id": "wt-20046-3",
        "minQuantity": 50,
        "tierPrice": 93.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "20044",
    "sku": "AT-WC-20044",
    "slug": "smart-7-hd-og-cc-flex",
    "title": "Smart 7 HD Og CC Flex",
    "description": "Smart 7 HD Og CC Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": null,
    "model": null,
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/08/smart-7-hd.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-20044-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-20044-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-20044-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "19524",
    "sku": "AT-WC-19524",
    "slug": "itel-vision-5-og-cc-flex",
    "title": "Itel Vision 5 Og CC Flex",
    "description": "Itel Vision 5 Og CC Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 13,
      "name": "Itel",
      "slug": "itel"
    },
    "model": {
      "id": 95100,
      "name": "Itel Vision 5 Og CC Flex",
      "slug": "itel-vision-5-og-cc-flex"
    },
    "retailPrice": 100,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/vision-5.png"
    ],
    "compatibleModels": [
      {
        "id": 95100,
        "name": "Itel Vision 5 Og CC Flex",
        "brandName": "Itel",
        "slug": "itel-vision-5-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19524-1",
        "minQuantity": 5,
        "tierPrice": 95
      },
      {
        "id": "wt-19524-2",
        "minQuantity": 10,
        "tierPrice": 90
      },
      {
        "id": "wt-19524-3",
        "minQuantity": 50,
        "tierPrice": 85
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "19189",
    "sku": "AT-WC-19189",
    "slug": "samsung-m32-4g-og-cc-flex",
    "title": "Samsung M32 4G Og Cc Flex",
    "description": "Samsung M32 4G Og Cc Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 9991,
      "name": "Samsung M32 4G Og Cc Flex",
      "slug": "samsung-m32-4g-og-cc-flex"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/m32-4g.png"
    ],
    "compatibleModels": [
      {
        "id": 9991,
        "name": "Samsung M32 4G Og Cc Flex",
        "brandName": "Samsung",
        "slug": "samsung-m32-4g-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19189-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-19189-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-19189-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "18619",
    "sku": "AT-WC-18619",
    "slug": "infinix-pop-5-pro-og-cc-flex",
    "title": "Infinix Pop 5 Pro Og Cc Flex",
    "description": "Infinix Pop 5 Pro Og Cc Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 12425,
      "name": "Infinix Pop 5 Pro Og Cc Flex",
      "slug": "infinix-pop-5-pro-og-cc-flex"
    },
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/pop-5-pro.jpg"
    ],
    "compatibleModels": [
      {
        "id": 12425,
        "name": "Infinix Pop 5 Pro Og Cc Flex",
        "brandName": "Infinix",
        "slug": "infinix-pop-5-pro-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18619-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-18619-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-18619-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "18215",
    "sku": "AT-WC-18215",
    "slug": "realme-narzo-60x-og-cc-flex",
    "title": "Realme Narzo 60x Og Cc Flex",
    "description": "Realme Narzo 60x Og Cc Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 17221,
      "name": "Realme Narzo 60x Og Cc Flex",
      "slug": "realme-narzo-60x-og-cc-flex"
    },
    "retailPrice": 95,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/narzo-60x.webp"
    ],
    "compatibleModels": [
      {
        "id": 17221,
        "name": "Realme Narzo 60x Og Cc Flex",
        "brandName": "Realme",
        "slug": "realme-narzo-60x-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18215-1",
        "minQuantity": 5,
        "tierPrice": 90.25
      },
      {
        "id": "wt-18215-2",
        "minQuantity": 10,
        "tierPrice": 85.5
      },
      {
        "id": "wt-18215-3",
        "minQuantity": 50,
        "tierPrice": 80.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "18204",
    "sku": "AT-WC-18204",
    "slug": "tecno-spark-go-2022-og-cc-flex",
    "title": "Tecno Spark Go 2022 Og Cc Flex",
    "description": "Tecno Spark Go 2022 Og Cc Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 89182,
      "name": "Tecno Spark Go 2022 Og Cc Flex",
      "slug": "tecno-spark-go-2022-og-cc-flex"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/Tecno-Spark-Go-2022.webp"
    ],
    "compatibleModels": [
      {
        "id": 89182,
        "name": "Tecno Spark Go 2022 Og Cc Flex",
        "brandName": "Tecno",
        "slug": "tecno-spark-go-2022-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18204-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-18204-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-18204-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "18203",
    "sku": "AT-WC-18203",
    "slug": "mi-13c-5g-og-cc-flex",
    "title": "Mi 13C 5G Og Cc Flex",
    "description": "Mi 13C 5G Og Cc Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 41675,
      "name": "Xiaomi Mi 13C 5G Og Cc Flex",
      "slug": "mi-13c-5g-og-cc-flex"
    },
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/mi-13C-5G.jpg"
    ],
    "compatibleModels": [
      {
        "id": 41675,
        "name": "Xiaomi Mi 13C 5G Og Cc Flex",
        "brandName": "Xiaomi",
        "slug": "mi-13c-5g-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18203-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-18203-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-18203-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "17543",
    "sku": "AT-WC-17543",
    "slug": "poco-c51-og-cc-flex",
    "title": "Poco C51 Og Cc Flex",
    "description": "Poco C51 Og Cc Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 10,
      "name": "Poco",
      "slug": "poco"
    },
    "model": {
      "id": 27069,
      "name": "Poco C51 Og Cc Flex",
      "slug": "poco-c51-og-cc-flex"
    },
    "retailPrice": 80,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/c51.jpg"
    ],
    "compatibleModels": [
      {
        "id": 27069,
        "name": "Poco C51 Og Cc Flex",
        "brandName": "Poco",
        "slug": "poco-c51-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17543-1",
        "minQuantity": 5,
        "tierPrice": 76
      },
      {
        "id": "wt-17543-2",
        "minQuantity": 10,
        "tierPrice": 72
      },
      {
        "id": "wt-17543-3",
        "minQuantity": 50,
        "tierPrice": 68
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "17544",
    "sku": "AT-WC-17544",
    "slug": "for-lava-yuwa-pro-og-cc-flex",
    "title": "For Lava Yuwa Pro Og Cc Flex",
    "description": "For Lava Yuwa Pro Og Cc Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 12,
      "name": "Lava",
      "slug": "lava"
    },
    "model": {
      "id": 15776,
      "name": "Lava For Lava Yuwa Pro Og Cc Flex",
      "slug": "for-lava-yuwa-pro-og-cc-flex"
    },
    "retailPrice": 95,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/yuwa-pro-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 15776,
        "name": "Lava For Lava Yuwa Pro Og Cc Flex",
        "brandName": "Lava",
        "slug": "for-lava-yuwa-pro-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17544-1",
        "minQuantity": 5,
        "tierPrice": 90.25
      },
      {
        "id": "wt-17544-2",
        "minQuantity": 10,
        "tierPrice": 85.5
      },
      {
        "id": "wt-17544-3",
        "minQuantity": 50,
        "tierPrice": 80.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "17009",
    "sku": "AT-WC-17009",
    "slug": "realme-7-pro-og-cc-flex",
    "title": "Realme 7 Pro Og Cc Flex",
    "description": "Realme 7 Pro Og Cc Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 13955,
      "name": "Realme 7 Pro Og Cc Flex",
      "slug": "realme-7-pro-og-cc-flex"
    },
    "retailPrice": 120,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/08/R-7pro-1.png"
    ],
    "compatibleModels": [
      {
        "id": 13955,
        "name": "Realme 7 Pro Og Cc Flex",
        "brandName": "Realme",
        "slug": "realme-7-pro-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17009-1",
        "minQuantity": 5,
        "tierPrice": 114
      },
      {
        "id": "wt-17009-2",
        "minQuantity": 10,
        "tierPrice": 108
      },
      {
        "id": "wt-17009-3",
        "minQuantity": 50,
        "tierPrice": 102
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "16690",
    "sku": "AT-WC-16690",
    "slug": "oppo-reno-7-5g-og-cc-flex",
    "title": "Oppo Reno 7 5G Og Cc Flex",
    "description": "Oppo Reno 7 5G Og Cc Flex high quality mobile spare part.",
    "category": {
      "id": 33,
      "name": "Original Charging Flex",
      "slug": "orignal-charging-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 15980,
      "name": "Oppo Reno 7 5G Og Cc Flex",
      "slug": "oppo-reno-7-5g-og-cc-flex"
    },
    "retailPrice": 130,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/reno-7-5g.jpg"
    ],
    "compatibleModels": [
      {
        "id": 15980,
        "name": "Oppo Reno 7 5G Og Cc Flex",
        "brandName": "Oppo",
        "slug": "oppo-reno-7-5g-og-cc-flex"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16690-1",
        "minQuantity": 5,
        "tierPrice": 123.5
      },
      {
        "id": "wt-16690-2",
        "minQuantity": 10,
        "tierPrice": 117
      },
      {
        "id": "wt-16690-3",
        "minQuantity": 50,
        "tierPrice": 110.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "18623",
    "sku": "AT-WC-18623",
    "slug": "front-camera-dust-proof-sponge",
    "title": "Front Camera Dust Proof Sponge",
    "description": "Front Camera Dust Proof Sponge high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 10,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/OEJpTIKlJHkr17viXPA.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/camera_safty_rubber_ring__1_-removebg-preview.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-18623-1",
        "minQuantity": 5,
        "tierPrice": 9.5
      },
      {
        "id": "wt-18623-2",
        "minQuantity": 10,
        "tierPrice": 9
      },
      {
        "id": "wt-18623-3",
        "minQuantity": 50,
        "tierPrice": 8.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "18529",
    "sku": "AT-WC-18529",
    "slug": "samsung-7262-power-switch",
    "title": "Samsung 7262 Power Switch",
    "description": "Samsung 7262 Power Switch high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 21336,
      "name": "Samsung 7262 Power Switch",
      "slug": "samsung-7262-power-switch"
    },
    "retailPrice": 5,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/7262-removebg-preview.png"
    ],
    "compatibleModels": [
      {
        "id": 21336,
        "name": "Samsung 7262 Power Switch",
        "brandName": "Samsung",
        "slug": "samsung-7262-power-switch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18529-1",
        "minQuantity": 5,
        "tierPrice": 4.75
      },
      {
        "id": "wt-18529-2",
        "minQuantity": 10,
        "tierPrice": 4.5
      },
      {
        "id": "wt-18529-3",
        "minQuantity": 50,
        "tierPrice": 4.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "18528",
    "sku": "AT-WC-18528",
    "slug": "samsung-j2-power-switch",
    "title": "Samsung J2 Power Switch",
    "description": "Samsung J2 Power Switch high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 93878,
      "name": "Samsung J2 Power Switch",
      "slug": "samsung-j2-power-switch"
    },
    "retailPrice": 5,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/j2-switch.jpg"
    ],
    "compatibleModels": [
      {
        "id": 93878,
        "name": "Samsung J2 Power Switch",
        "brandName": "Samsung",
        "slug": "samsung-j2-power-switch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18528-1",
        "minQuantity": 5,
        "tierPrice": 4.75
      },
      {
        "id": "wt-18528-2",
        "minQuantity": 10,
        "tierPrice": 4.5
      },
      {
        "id": "wt-18528-3",
        "minQuantity": 50,
        "tierPrice": 4.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "18527",
    "sku": "AT-WC-18527",
    "slug": "4-pin-switch-small",
    "title": "4 Pin Switch Small",
    "description": "4 Pin Switch Small high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 4,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/vkG0mxtq-800-800-700x700-removebg-preview.png"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-18527-1",
        "minQuantity": 5,
        "tierPrice": 3.8
      },
      {
        "id": "wt-18527-2",
        "minQuantity": 10,
        "tierPrice": 3.6
      },
      {
        "id": "wt-18527-3",
        "minQuantity": 50,
        "tierPrice": 3.4
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "18526",
    "sku": "AT-WC-18526",
    "slug": "2-pin-switch-small",
    "title": "2 Pin Switch Small",
    "description": "2 Pin Switch Small high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 4,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/2-pin-mini.webp"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-18526-1",
        "minQuantity": 5,
        "tierPrice": 3.8
      },
      {
        "id": "wt-18526-2",
        "minQuantity": 10,
        "tierPrice": 3.6
      },
      {
        "id": "wt-18526-3",
        "minQuantity": 50,
        "tierPrice": 3.4
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "16698",
    "sku": "AT-WC-16698",
    "slug": "samsung-a12-power-key-bracket",
    "title": "Samsung A12 Power Key Bracket",
    "description": "Samsung A12 Power Key Bracket high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 70893,
      "name": "Samsung A12 Power Key Bracket",
      "slug": "samsung-a12-power-key-bracket"
    },
    "retailPrice": 25,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/Sam-A12-Bracket.jpg"
    ],
    "compatibleModels": [
      {
        "id": 70893,
        "name": "Samsung A12 Power Key Bracket",
        "brandName": "Samsung",
        "slug": "samsung-a12-power-key-bracket"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16698-1",
        "minQuantity": 5,
        "tierPrice": 23.75
      },
      {
        "id": "wt-16698-2",
        "minQuantity": 10,
        "tierPrice": 22.5
      },
      {
        "id": "wt-16698-3",
        "minQuantity": 50,
        "tierPrice": 21.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "15136",
    "sku": "AT-WC-15136",
    "slug": "sim-ejector-pin",
    "title": "sim ejector pin",
    "description": "sim ejector pin high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 1.5,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/pin.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15136-1",
        "minQuantity": 5,
        "tierPrice": 1.42
      },
      {
        "id": "wt-15136-2",
        "minQuantity": 10,
        "tierPrice": 1.35
      },
      {
        "id": "wt-15136-3",
        "minQuantity": 50,
        "tierPrice": 1.27
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "15046",
    "sku": "AT-WC-15046",
    "slug": "13-6-cm-network-wire",
    "title": "13.6 CM NETWORK WIRE",
    "description": "13.6 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-11.44.59-AM.jpeg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15046-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15046-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15046-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "15045",
    "sku": "AT-WC-15045",
    "slug": "16-6-cm-network-wire",
    "title": "16.6 CM NETWORK WIRE",
    "description": "16.6 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-11.54.09-AM.jpeg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15045-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15045-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15045-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "15044",
    "sku": "AT-WC-15044",
    "slug": "15-6-cm-network-wire",
    "title": "15.6 CM NETWORK WIRE",
    "description": "15.6 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-11.37.40-AM.jpeg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15044-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15044-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15044-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "15043",
    "sku": "AT-WC-15043",
    "slug": "17-cm-network-wire",
    "title": "17 CM NETWORK WIRE",
    "description": "17 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-11.15.31-AM.jpeg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15043-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15043-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15043-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "15042",
    "sku": "AT-WC-15042",
    "slug": "12-9-cm-network-wire",
    "title": "12.9 CM NETWORK WIRE",
    "description": "12.9 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-11.43.05-AM.jpeg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15042-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15042-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15042-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "15041",
    "sku": "AT-WC-15041",
    "slug": "9-7-cm-network-wire",
    "title": "9.7 CM NETWORK WIRE",
    "description": "9.7 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-11.47.54-AM.jpeg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15041-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15041-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15041-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "15040",
    "sku": "AT-WC-15040",
    "slug": "11-2-cm-network-wire",
    "title": "11.2 CM NETWORK WIRE",
    "description": "11.2 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": {
      "id": 7,
      "name": "OnePlus",
      "slug": "oneplus"
    },
    "model": {
      "id": 87612,
      "name": "OnePlus 11.2 CM NETWORK WIRE",
      "slug": "11-2-cm-network-wire"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-11.41.22-AM.jpeg"
    ],
    "compatibleModels": [
      {
        "id": 87612,
        "name": "OnePlus 11.2 CM NETWORK WIRE",
        "brandName": "OnePlus",
        "slug": "11-2-cm-network-wire"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-15040-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15040-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15040-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "15039",
    "sku": "AT-WC-15039",
    "slug": "15-cm-network-wire",
    "title": "15 CM NETWORK WIRE",
    "description": "15 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-12.10.15-PM.jpeg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15039-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15039-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15039-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "15013",
    "sku": "AT-WC-15013",
    "slug": "12-5-cm-network-wire",
    "title": "12.5 CM NETWORK WIRE",
    "description": "12.5 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-12.07.28-PM.jpeg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15013-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15013-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15013-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "15012",
    "sku": "AT-WC-15012",
    "slug": "14-6-cm-network-wire",
    "title": "14.6 CM NETWORK WIRE",
    "description": "14.6 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-12.04.10-PM.jpeg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15012-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15012-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15012-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "15020",
    "sku": "AT-WC-15020",
    "slug": "14-5-cm-network-wire",
    "title": "14.5 CM NETWORK WIRE",
    "description": "14.5 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-11.34.23-AM.jpeg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15020-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15020-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15020-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "15019",
    "sku": "AT-WC-15019",
    "slug": "12-6-cm-network-wire",
    "title": "12.6 CM NETWORK WIRE",
    "description": "12.6 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-11.25.27-AM.jpeg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15019-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15019-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15019-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "15018",
    "sku": "AT-WC-15018",
    "slug": "13-9-cm-network-wire",
    "title": "13.9 CM NETWORK WIRE",
    "description": "13.9 CM NETWORK WIRE high quality mobile spare part.",
    "category": {
      "id": 15,
      "name": "Other Products",
      "slug": "other-products"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-12-at-11.51.34-AM.jpeg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-15018-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-15018-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-15018-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "23748",
    "sku": "AT-WC-23748",
    "slug": "oppo-reno-8-pro-side-key-button-set",
    "title": "Oppo Reno 8 Pro Side Key Button Set",
    "description": "Oppo Reno 8 Pro Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 57422,
      "name": "Oppo Reno 8 Pro",
      "slug": "oppo-reno-8-pro"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Reno-8-pro.png"
    ],
    "compatibleModels": [
      {
        "id": 57422,
        "name": "Oppo Reno 8 Pro",
        "brandName": "Oppo",
        "slug": "oppo-reno-8-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23748-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23748-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23748-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "23747",
    "sku": "AT-WC-23747",
    "slug": "oppo-reno-8-side-key-button-set",
    "title": "Oppo Reno 8 Side Key Button Set",
    "description": "Oppo Reno 8 Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 67179,
      "name": "Oppo Reno 8",
      "slug": "oppo-reno-8"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Reno-8.png"
    ],
    "compatibleModels": [
      {
        "id": 67179,
        "name": "Oppo Reno 8",
        "brandName": "Oppo",
        "slug": "oppo-reno-8"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23747-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23747-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23747-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "23746",
    "sku": "AT-WC-23746",
    "slug": "oppo-a74-side-key-button-set",
    "title": "Oppo A74 Side Key Button Set",
    "description": "Oppo A74 Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 17975,
      "name": "Oppo A74",
      "slug": "oppo-a74"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/A74.png"
    ],
    "compatibleModels": [
      {
        "id": 17975,
        "name": "Oppo A74",
        "brandName": "Oppo",
        "slug": "oppo-a74"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23746-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23746-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23746-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "23745",
    "sku": "AT-WC-23745",
    "slug": "oppo-f29-5g-side-key-button-set",
    "title": "Oppo F29 5G Side Key Button Set",
    "description": "Oppo F29 5G Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 4683,
      "name": "Oppo F29 5G",
      "slug": "oppo-f29-5g"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "/images/cat-display.jpg"
    ],
    "compatibleModels": [
      {
        "id": 4683,
        "name": "Oppo F29 5G",
        "brandName": "Oppo",
        "slug": "oppo-f29-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23745-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23745-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23745-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "23744",
    "sku": "AT-WC-23744",
    "slug": "oppo-k12x-side-key-button-set",
    "title": "Oppo K12x Side Key Button Set",
    "description": "Oppo K12x Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 12839,
      "name": "Oppo K12x",
      "slug": "oppo-k12x"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/K12X.png"
    ],
    "compatibleModels": [
      {
        "id": 12839,
        "name": "Oppo K12x",
        "brandName": "Oppo",
        "slug": "oppo-k12x"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23744-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23744-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23744-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "23743",
    "sku": "AT-WC-23743",
    "slug": "oppo-a52-side-key-button-set",
    "title": "Oppo A52 Side Key Button Set",
    "description": "Oppo A52 Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 24036,
      "name": "Oppo A52",
      "slug": "oppo-a52"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Oppo-A52.png"
    ],
    "compatibleModels": [
      {
        "id": 24036,
        "name": "Oppo A52",
        "brandName": "Oppo",
        "slug": "oppo-a52"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23743-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23743-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23743-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "23740",
    "sku": "AT-WC-23740",
    "slug": "oppo-reno-5-pro-side-key-button-set",
    "title": "Oppo Reno 5 Pro Side Key Button Set",
    "description": "Oppo Reno 5 Pro Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 73460,
      "name": "Oppo Reno 5 Pro",
      "slug": "oppo-reno-5-pro"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Reno-5-Pro-5G.png"
    ],
    "compatibleModels": [
      {
        "id": 73460,
        "name": "Oppo Reno 5 Pro",
        "brandName": "Oppo",
        "slug": "oppo-reno-5-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23740-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23740-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23740-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "23742",
    "sku": "AT-WC-23742",
    "slug": "oppo-reno-7-side-key-button-set",
    "title": "Oppo Reno 7 Side Key Button Set",
    "description": "Oppo Reno 7 Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 90424,
      "name": "Oppo Reno 7",
      "slug": "oppo-reno-7"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Reno-7.png"
    ],
    "compatibleModels": [
      {
        "id": 90424,
        "name": "Oppo Reno 7",
        "brandName": "Oppo",
        "slug": "oppo-reno-7"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23742-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23742-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23742-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "23741",
    "sku": "AT-WC-23741",
    "slug": "oppo-f21-pro-side-key-button-set",
    "title": "Oppo F21 Pro Side Key Button Set",
    "description": "Oppo F21 Pro Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 77997,
      "name": "Oppo F21 Pro",
      "slug": "oppo-f21-pro"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/F21-Pro-5G.png"
    ],
    "compatibleModels": [
      {
        "id": 77997,
        "name": "Oppo F21 Pro",
        "brandName": "Oppo",
        "slug": "oppo-f21-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23741-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23741-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23741-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "23735",
    "sku": "AT-WC-23735",
    "slug": "jiophone-next-side-key-button-set",
    "title": "JioPhone Next Side Key Button Set",
    "description": "JioPhone Next Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": null,
    "model": null,
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/jio-next.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-23735-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23735-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23735-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "23734",
    "sku": "AT-WC-23734",
    "slug": "oppo-reno-2-side-key-button-set",
    "title": "Oppo Reno 2 Side Key Button Set",
    "description": "Oppo Reno 2 Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 42205,
      "name": "Oppo Reno 2",
      "slug": "oppo-reno-2"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Reno-2.jpg"
    ],
    "compatibleModels": [
      {
        "id": 42205,
        "name": "Oppo Reno 2",
        "brandName": "Oppo",
        "slug": "oppo-reno-2"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23734-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23734-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23734-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "23733",
    "sku": "AT-WC-23733",
    "slug": "oppo-reno-11-pro-side-key-button-set",
    "title": "Oppo Reno 11 Pro Side Key Button Set",
    "description": "Oppo Reno 11 Pro Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 32829,
      "name": "Oppo Reno 11 Pro",
      "slug": "oppo-reno-11-pro"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/reno-11-pro.jpg"
    ],
    "compatibleModels": [
      {
        "id": 32829,
        "name": "Oppo Reno 11 Pro",
        "brandName": "Oppo",
        "slug": "oppo-reno-11-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23733-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23733-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23733-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "23732",
    "sku": "AT-WC-23732",
    "slug": "oppo-reno-10-side-key-button-set",
    "title": "Oppo Reno 10 Side Key Button Set",
    "description": "Oppo Reno 10 Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 37620,
      "name": "Oppo Reno 10",
      "slug": "oppo-reno-10"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Reno-10.jpg"
    ],
    "compatibleModels": [
      {
        "id": 37620,
        "name": "Oppo Reno 10",
        "brandName": "Oppo",
        "slug": "oppo-reno-10"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23732-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23732-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23732-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "23731",
    "sku": "AT-WC-23731",
    "slug": "oppo-reno-4-pro-side-key-button-set",
    "title": "Oppo Reno 4 Pro Side Key Button Set",
    "description": "Oppo Reno 4 Pro Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 28701,
      "name": "Oppo Reno 4 Pro",
      "slug": "oppo-reno-4-pro"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Reno-4-pro.jpg"
    ],
    "compatibleModels": [
      {
        "id": 28701,
        "name": "Oppo Reno 4 Pro",
        "brandName": "Oppo",
        "slug": "oppo-reno-4-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23731-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23731-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23731-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "23730",
    "sku": "AT-WC-23730",
    "slug": "oppo-reno-5-side-key-button-set",
    "title": "Oppo Reno 5 Side Key Button Set",
    "description": "Oppo Reno 5 Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 87714,
      "name": "Oppo Reno 5",
      "slug": "oppo-reno-5"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Reno-5.jpg"
    ],
    "compatibleModels": [
      {
        "id": 87714,
        "name": "Oppo Reno 5",
        "brandName": "Oppo",
        "slug": "oppo-reno-5"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23730-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23730-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23730-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "23729",
    "sku": "AT-WC-23729",
    "slug": "oppo-f25-pro-side-key-button-set",
    "title": "Oppo F25 Pro Side Key Button Set",
    "description": "Oppo F25 Pro Side Key Button Set high quality mobile spare part.",
    "category": {
      "id": 50,
      "name": "Side Rubber Key",
      "slug": "side-rubber-key"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 81342,
      "name": "Oppo F25 Pro",
      "slug": "oppo-f25-pro"
    },
    "retailPrice": 20,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/f25-pro.jpg"
    ],
    "compatibleModels": [
      {
        "id": 81342,
        "name": "Oppo F25 Pro",
        "brandName": "Oppo",
        "slug": "oppo-f25-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23729-1",
        "minQuantity": 5,
        "tierPrice": 19
      },
      {
        "id": "wt-23729-2",
        "minQuantity": 10,
        "tierPrice": 18
      },
      {
        "id": "wt-23729-3",
        "minQuantity": 50,
        "tierPrice": 17
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "19522",
    "sku": "AT-WC-19522",
    "slug": "samsung-a12-sim-holder",
    "title": "Samsung A12 Sim Holder",
    "description": "Samsung A12 Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 81653,
      "name": "Samsung A12",
      "slug": "samsung-a12"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/sam.-A12.png"
    ],
    "compatibleModels": [
      {
        "id": 81653,
        "name": "Samsung A12",
        "brandName": "Samsung",
        "slug": "samsung-a12"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19522-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-19522-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-19522-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "18222",
    "sku": "AT-WC-18222",
    "slug": "oppo-reno-8-5g-sim-holder",
    "title": "Oppo Reno 8 (5G) Sim Holder",
    "description": "Oppo Reno 8 (5G) Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 93786,
      "name": "Oppo Reno 8 (5G)",
      "slug": "oppo-reno-8-5g"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/06/RENO-8-5G.webp"
    ],
    "compatibleModels": [
      {
        "id": 93786,
        "name": "Oppo Reno 8 (5G)",
        "brandName": "Oppo",
        "slug": "oppo-reno-8-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18222-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-18222-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-18222-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "16992",
    "sku": "AT-WC-16992",
    "slug": "infinix-note-12-5g-sim-holder",
    "title": "Infinix Note 12 5G Sim Holder",
    "description": "Infinix Note 12 5G Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 75482,
      "name": "Infinix Note 12 5G",
      "slug": "infinix-note-12-5g"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/inf-note-12-5g.jpg"
    ],
    "compatibleModels": [
      {
        "id": 75482,
        "name": "Infinix Note 12 5G",
        "brandName": "Infinix",
        "slug": "infinix-note-12-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16992-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-16992-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-16992-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "16993",
    "sku": "AT-WC-16993",
    "slug": "realme-13-pro-sim-holder",
    "title": "Realme 13 Pro + Sim Holder",
    "description": "Realme 13 Pro + Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 86583,
      "name": "Realme 13 Pro +",
      "slug": "realme-13-pro"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/R-13pro.jpg"
    ],
    "compatibleModels": [
      {
        "id": 86583,
        "name": "Realme 13 Pro +",
        "brandName": "Realme",
        "slug": "realme-13-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16993-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-16993-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-16993-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "16614",
    "sku": "AT-WC-16614",
    "slug": "infinix-hot-11-sim-holder",
    "title": "Infinix Hot 11 Sim Holder",
    "description": "Infinix Hot 11 Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 8826,
      "name": "Infinix Hot 11",
      "slug": "infinix-hot-11"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/Hot-11.webp"
    ],
    "compatibleModels": [
      {
        "id": 8826,
        "name": "Infinix Hot 11",
        "brandName": "Infinix",
        "slug": "infinix-hot-11"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16614-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-16614-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-16614-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "15621",
    "sku": "AT-WC-15621",
    "slug": "infinix-note12-sim-holder",
    "title": "Infinix Note12 Sim Holder",
    "description": "Infinix Note12 Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": {
      "id": 9,
      "name": "Infinix",
      "slug": "infinix"
    },
    "model": {
      "id": 44039,
      "name": "Infinix Note12",
      "slug": "infinix-note12"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/04/inf-note-12.jpg"
    ],
    "compatibleModels": [
      {
        "id": 44039,
        "name": "Infinix Note12",
        "brandName": "Infinix",
        "slug": "infinix-note12"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-15621-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-15621-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-15621-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "14970",
    "sku": "AT-WC-14970",
    "slug": "smart-7-sim-holder",
    "title": "Smart 7  Sim Holder",
    "description": "Smart 7  Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": null,
    "model": null,
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/smart-7.webp"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-14970-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-14970-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-14970-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "14968",
    "sku": "AT-WC-14968",
    "slug": "vivo-t3x-sim-holder",
    "title": "Vivo T3X Sim Holder",
    "description": "Vivo T3X Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 12785,
      "name": "Vivo T3X",
      "slug": "vivo-t3x"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/vivo-T3X.webp"
    ],
    "compatibleModels": [
      {
        "id": 12785,
        "name": "Vivo T3X",
        "brandName": "Vivo",
        "slug": "vivo-t3x"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14968-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-14968-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-14968-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "14683",
    "sku": "AT-WC-14683",
    "slug": "tecno-spark-10-5g-sim-holder",
    "title": "Tecno Spark 10 5G Sim Holder",
    "description": "Tecno Spark 10 5G Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 71374,
      "name": "Tecno Spark 10 5G",
      "slug": "tecno-spark-10-5g"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/spark-10-5g.webp"
    ],
    "compatibleModels": [
      {
        "id": 71374,
        "name": "Tecno Spark 10 5G",
        "brandName": "Tecno",
        "slug": "tecno-spark-10-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14683-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-14683-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-14683-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "14682",
    "sku": "AT-WC-14682",
    "slug": "tecno-spark-10-4g-sim-holder",
    "title": "Tecno Spark 10 4G Sim Holder",
    "description": "Tecno Spark 10 4G Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 95222,
      "name": "Tecno Spark 10 4G",
      "slug": "tecno-spark-10-4g"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/spark-10-4g.webp"
    ],
    "compatibleModels": [
      {
        "id": 95222,
        "name": "Tecno Spark 10 4G",
        "brandName": "Tecno",
        "slug": "tecno-spark-10-4g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14682-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-14682-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-14682-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "11886",
    "sku": "AT-WC-11886",
    "slug": "realme-c25y-sim-holder",
    "title": "Realme C25Y Sim Holder",
    "description": "Realme C25Y Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 59498,
      "name": "Realme C25Y",
      "slug": "realme-c25y"
    },
    "retailPrice": 25,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/c25y.jpg"
    ],
    "compatibleModels": [
      {
        "id": 59498,
        "name": "Realme C25Y",
        "brandName": "Realme",
        "slug": "realme-c25y"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11886-1",
        "minQuantity": 5,
        "tierPrice": 23.75
      },
      {
        "id": "wt-11886-2",
        "minQuantity": 10,
        "tierPrice": 22.5
      },
      {
        "id": "wt-11886-3",
        "minQuantity": 50,
        "tierPrice": 21.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "10511",
    "sku": "AT-WC-10511",
    "slug": "samsung-a02s-sim-holder",
    "title": "Samsung A02S Sim Holder",
    "description": "Samsung A02S Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 52400,
      "name": "Samsung A02S",
      "slug": "samsung-a02s"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/11/a02s.jpg"
    ],
    "compatibleModels": [
      {
        "id": 52400,
        "name": "Samsung A02S",
        "brandName": "Samsung",
        "slug": "samsung-a02s"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-10511-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-10511-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-10511-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "10505",
    "sku": "AT-WC-10505",
    "slug": "jio-f220-sim-open-port",
    "title": "Jio F320 Sim Open Port",
    "description": "Jio F320 Sim Open Port high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": null,
    "model": null,
    "retailPrice": 8,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/11/jio-220.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-10505-1",
        "minQuantity": 5,
        "tierPrice": 7.6
      },
      {
        "id": "wt-10505-2",
        "minQuantity": 10,
        "tierPrice": 7.2
      },
      {
        "id": "wt-10505-3",
        "minQuantity": 50,
        "tierPrice": 6.8
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "10504",
    "sku": "AT-WC-10504",
    "slug": "jio-f120-sim-port",
    "title": "Jio F120 Sim Port",
    "description": "Jio F120 Sim Port high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": null,
    "model": null,
    "retailPrice": 8,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/11/jio-f120.webp"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-10504-1",
        "minQuantity": 5,
        "tierPrice": 7.6
      },
      {
        "id": "wt-10504-2",
        "minQuantity": 10,
        "tierPrice": 7.2
      },
      {
        "id": "wt-10504-3",
        "minQuantity": 50,
        "tierPrice": 6.8
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "10503",
    "sku": "AT-WC-10503",
    "slug": "jio-f90-sim-port",
    "title": "Jio F90 Sim Port",
    "description": "Jio F90 Sim Port high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": null,
    "model": null,
    "retailPrice": 8,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/11/jio-f90.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-10503-1",
        "minQuantity": 5,
        "tierPrice": 7.6
      },
      {
        "id": "wt-10503-2",
        "minQuantity": 10,
        "tierPrice": 7.2
      },
      {
        "id": "wt-10503-3",
        "minQuantity": 50,
        "tierPrice": 6.8
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "8698",
    "sku": "AT-WC-8698",
    "slug": "vivo-v5-sim-holder",
    "title": "Vivo V5 Sim Holder",
    "description": "Vivo V5 Sim Holder high quality mobile spare part.",
    "category": {
      "id": 35,
      "name": "SIM Holder",
      "slug": "sim-holder"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 41894,
      "name": "Vivo V5",
      "slug": "vivo-v5"
    },
    "retailPrice": 30,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/09/v5.jpg"
    ],
    "compatibleModels": [
      {
        "id": 41894,
        "name": "Vivo V5",
        "brandName": "Vivo",
        "slug": "vivo-v5"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-8698-1",
        "minQuantity": 5,
        "tierPrice": 28.5
      },
      {
        "id": "wt-8698-2",
        "minQuantity": 10,
        "tierPrice": 27
      },
      {
        "id": "wt-8698-3",
        "minQuantity": 50,
        "tierPrice": 25.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "23825",
    "sku": "AT-WC-23825",
    "slug": "realme-p4-lite-mosaic-green-ram-4-gb-rom-64-gb",
    "title": "Realme P4 Lite (Mosaic Green) Ram 4 Gb Rom 64 Gb",
    "description": "Realme P4 Lite (Mosaic Green) Ram 4 Gb Rom 64 Gb high quality mobile spare part.",
    "category": {
      "id": 343,
      "name": "Smart Phone",
      "slug": "smart-phone"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 74521,
      "name": "Realme P4 Lite (Mosaic Green) Ram 4 Gb Rom 64 Gb",
      "slug": "realme-p4-lite-mosaic-green-ram-4-gb-rom-64-gb"
    },
    "retailPrice": 28999,
    "salePrice": 15499,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p-4-lite-green.avif",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-4.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-3.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-6.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-7.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-8.jpg"
    ],
    "compatibleModels": [
      {
        "id": 74521,
        "name": "Realme P4 Lite (Mosaic Green) Ram 4 Gb Rom 64 Gb",
        "brandName": "Realme",
        "slug": "realme-p4-lite-mosaic-green-ram-4-gb-rom-64-gb"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23825-1",
        "minQuantity": 5,
        "tierPrice": 14724.05
      },
      {
        "id": "wt-23825-2",
        "minQuantity": 10,
        "tierPrice": 13949.1
      },
      {
        "id": "wt-23825-3",
        "minQuantity": 50,
        "tierPrice": 13174.15
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "23813",
    "sku": "AT-WC-23813",
    "slug": "realme-p4-lite-mosaic-blue-ram-4-gb-rom-64-gb",
    "title": "Realme P4 Lite (Mosaic blue) Ram 4 Gb Rom 64 Gb",
    "description": "Realme P4 Lite (Mosaic blue) Ram 4 Gb Rom 64 Gb high quality mobile spare part.",
    "category": {
      "id": 343,
      "name": "Smart Phone",
      "slug": "smart-phone"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 73366,
      "name": "Realme P4 Lite (Mosaic blue) Ram 4 Gb Rom 64 Gb",
      "slug": "realme-p4-lite-mosaic-blue-ram-4-gb-rom-64-gb"
    },
    "retailPrice": 28999,
    "salePrice": 15499,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-o.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-1.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-2.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-3.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-4.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-8.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-6.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/p4-lite-5.jpg"
    ],
    "compatibleModels": [
      {
        "id": 73366,
        "name": "Realme P4 Lite (Mosaic blue) Ram 4 Gb Rom 64 Gb",
        "brandName": "Realme",
        "slug": "realme-p4-lite-mosaic-blue-ram-4-gb-rom-64-gb"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23813-1",
        "minQuantity": 5,
        "tierPrice": 14724.05
      },
      {
        "id": "wt-23813-2",
        "minQuantity": 10,
        "tierPrice": 13949.1
      },
      {
        "id": "wt-23813-3",
        "minQuantity": 50,
        "tierPrice": 13174.15
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "23778",
    "sku": "AT-WC-23778",
    "slug": "vivo-y11-5g-cosmic-gold-4gb-ram-64gb-storage",
    "title": "Vivo Y11 5G (Cosmic Gold, 4GB RAM, 64GB Storage)",
    "description": "Vivo Y11 5G (Cosmic Gold, 4GB RAM, 64GB Storage) high quality mobile spare part.",
    "category": {
      "id": 343,
      "name": "Smart Phone",
      "slug": "smart-phone"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 33157,
      "name": "Vivo Y11 5G (Cosmic Gold, 4GB RAM, 64GB Storage)",
      "slug": "vivo-y11-5g-cosmic-gold-4gb-ram-64gb-storage"
    },
    "retailPrice": 39999,
    "salePrice": 16999,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/y11-cosmic-gold.webp",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Y11-cosmic-gold-6.webp",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Y11-cosmic-gold-3.webp",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Y11-cosmic-gold-4.webp",
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/Y11-cosmic-gold-5.webp"
    ],
    "compatibleModels": [
      {
        "id": 33157,
        "name": "Vivo Y11 5G (Cosmic Gold, 4GB RAM, 64GB Storage)",
        "brandName": "Vivo",
        "slug": "vivo-y11-5g-cosmic-gold-4gb-ram-64gb-storage"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23778-1",
        "minQuantity": 5,
        "tierPrice": 16149.05
      },
      {
        "id": "wt-23778-2",
        "minQuantity": 10,
        "tierPrice": 15299.1
      },
      {
        "id": "wt-23778-3",
        "minQuantity": 50,
        "tierPrice": 14449.15
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "23775",
    "sku": "AT-WC-23775",
    "slug": "vivo-y11-5g-mystic-blue-4gb-ram-64gb-storage",
    "title": "Vivo Y11 5G (Mystic Blue, 4GB RAM, 64GB Storage)",
    "description": "Vivo Y11 5G (Mystic Blue, 4GB RAM, 64GB Storage) high quality mobile spare part.",
    "category": {
      "id": 343,
      "name": "Smart Phone",
      "slug": "smart-phone"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 58518,
      "name": "Vivo Y11 5G (Mystic Blue, 4GB RAM, 64GB Storage)",
      "slug": "vivo-y11-5g-mystic-blue-4gb-ram-64gb-storage"
    },
    "retailPrice": 39999,
    "salePrice": 16999,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2026/08/y11-blue2.avif"
    ],
    "compatibleModels": [
      {
        "id": 58518,
        "name": "Vivo Y11 5G (Mystic Blue, 4GB RAM, 64GB Storage)",
        "brandName": "Vivo",
        "slug": "vivo-y11-5g-mystic-blue-4gb-ram-64gb-storage"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-23775-1",
        "minQuantity": 5,
        "tierPrice": 16149.05
      },
      {
        "id": "wt-23775-2",
        "minQuantity": 10,
        "tierPrice": 15299.1
      },
      {
        "id": "wt-23775-3",
        "minQuantity": 50,
        "tierPrice": 14449.15
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "19193",
    "sku": "AT-WC-19193",
    "slug": "realme-11x-ringer-box",
    "title": "Realme 11X Ringer Box",
    "description": "Realme 11X Ringer Box high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 97816,
      "name": "Realme 11X Ringer Box",
      "slug": "realme-11x-ringer-box"
    },
    "retailPrice": 80,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/realme-11x-5g.png"
    ],
    "compatibleModels": [
      {
        "id": 97816,
        "name": "Realme 11X Ringer Box",
        "brandName": "Realme",
        "slug": "realme-11x-ringer-box"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19193-1",
        "minQuantity": 5,
        "tierPrice": 76
      },
      {
        "id": "wt-19193-2",
        "minQuantity": 10,
        "tierPrice": 72
      },
      {
        "id": "wt-19193-3",
        "minQuantity": 50,
        "tierPrice": 68
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "18620",
    "sku": "AT-WC-18620",
    "slug": "vivo-v29e-ringer-box",
    "title": "Vivo V29E Ringer Box",
    "description": "Vivo V29E Ringer Box high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 32853,
      "name": "Vivo V29E Ringer Box",
      "slug": "vivo-v29e-ringer-box"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/v29e.jpg"
    ],
    "compatibleModels": [
      {
        "id": 32853,
        "name": "Vivo V29E Ringer Box",
        "brandName": "Vivo",
        "slug": "vivo-v29e-ringer-box"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18620-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-18620-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-18620-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "17245",
    "sku": "AT-WC-17245",
    "slug": "oppo-a3x-ringer-box",
    "title": "Oppo A3x Ringer Box",
    "description": "Oppo A3x Ringer Box high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 5195,
      "name": "Oppo A3x Ringer Box",
      "slug": "oppo-a3x-ringer-box"
    },
    "retailPrice": 80,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-30-at-2.36.53-PM.jpeg"
    ],
    "compatibleModels": [
      {
        "id": 5195,
        "name": "Oppo A3x Ringer Box",
        "brandName": "Oppo",
        "slug": "oppo-a3x-ringer-box"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17245-1",
        "minQuantity": 5,
        "tierPrice": 76
      },
      {
        "id": "wt-17245-2",
        "minQuantity": 10,
        "tierPrice": 72
      },
      {
        "id": "wt-17245-3",
        "minQuantity": 50,
        "tierPrice": 68
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "17007",
    "sku": "AT-WC-17007",
    "slug": "realme-c65-5g-ringer-box",
    "title": "Realme C65 5G Ringer Box",
    "description": "Realme C65 5G Ringer Box high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 3837,
      "name": "Realme C65 5G Ringer Box",
      "slug": "realme-c65-5g-ringer-box"
    },
    "retailPrice": 95,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/Realme-C65-5g.webp"
    ],
    "compatibleModels": [
      {
        "id": 3837,
        "name": "Realme C65 5G Ringer Box",
        "brandName": "Realme",
        "slug": "realme-c65-5g-ringer-box"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-17007-1",
        "minQuantity": 5,
        "tierPrice": 90.25
      },
      {
        "id": "wt-17007-2",
        "minQuantity": 10,
        "tierPrice": 85.5
      },
      {
        "id": "wt-17007-3",
        "minQuantity": 50,
        "tierPrice": 80.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "16697",
    "sku": "AT-WC-16697",
    "slug": "mi-9-power-ear-spk",
    "title": "Mi 9 Power Ear Spk",
    "description": "Mi 9 Power Ear Spk high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 94250,
      "name": "Xiaomi Mi 9 Power Ear Spk",
      "slug": "mi-9-power-ear-spk"
    },
    "retailPrice": 25,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/9-power.jpg"
    ],
    "compatibleModels": [
      {
        "id": 94250,
        "name": "Xiaomi Mi 9 Power Ear Spk",
        "brandName": "Xiaomi",
        "slug": "mi-9-power-ear-spk"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16697-1",
        "minQuantity": 5,
        "tierPrice": 23.75
      },
      {
        "id": "wt-16697-2",
        "minQuantity": 10,
        "tierPrice": 22.5
      },
      {
        "id": "wt-16697-3",
        "minQuantity": 50,
        "tierPrice": 21.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "16696",
    "sku": "AT-WC-16696",
    "slug": "oppo-reno-8-ringer-box",
    "title": "Oppo Reno 8 Ringer Box",
    "description": "Oppo Reno 8 Ringer Box high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 23635,
      "name": "Oppo Reno 8 Ringer Box",
      "slug": "oppo-reno-8-ringer-box"
    },
    "retailPrice": 80,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/reno-8-5g.jpg"
    ],
    "compatibleModels": [
      {
        "id": 23635,
        "name": "Oppo Reno 8 Ringer Box",
        "brandName": "Oppo",
        "slug": "oppo-reno-8-ringer-box"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16696-1",
        "minQuantity": 5,
        "tierPrice": 76
      },
      {
        "id": "wt-16696-2",
        "minQuantity": 10,
        "tierPrice": 72
      },
      {
        "id": "wt-16696-3",
        "minQuantity": 50,
        "tierPrice": 68
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "16615",
    "sku": "AT-WC-16615",
    "slug": "samsung-m52-ringer-set",
    "title": "Samsung M52 Ringer Set",
    "description": "Samsung M52 Ringer Set high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 24208,
      "name": "Samsung M52 Ringer Set",
      "slug": "samsung-m52-ringer-set"
    },
    "retailPrice": 80,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/05/Sam-M52.jpg"
    ],
    "compatibleModels": [
      {
        "id": 24208,
        "name": "Samsung M52 Ringer Set",
        "brandName": "Samsung",
        "slug": "samsung-m52-ringer-set"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-16615-1",
        "minQuantity": 5,
        "tierPrice": 76
      },
      {
        "id": "wt-16615-2",
        "minQuantity": 10,
        "tierPrice": 72
      },
      {
        "id": "wt-16615-3",
        "minQuantity": 50,
        "tierPrice": 68
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "15623",
    "sku": "AT-WC-15623",
    "slug": "realme-11-pro-ringer-box",
    "title": "Realme 11 Pro Ringer Set",
    "description": "Realme 11 Pro Ringer Set high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 78069,
      "name": "Realme 11 Pro Ringer Set",
      "slug": "realme-11-pro-ringer-set"
    },
    "retailPrice": 80,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/04/11-pro.webp"
    ],
    "compatibleModels": [
      {
        "id": 78069,
        "name": "Realme 11 Pro Ringer Set",
        "brandName": "Realme",
        "slug": "realme-11-pro-ringer-set"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-15623-1",
        "minQuantity": 5,
        "tierPrice": 76
      },
      {
        "id": "wt-15623-2",
        "minQuantity": 10,
        "tierPrice": 72
      },
      {
        "id": "wt-15623-3",
        "minQuantity": 50,
        "tierPrice": 68
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "14991",
    "sku": "AT-WC-14991",
    "slug": "one-5-ringer-set",
    "title": "One +5  Ringer set",
    "description": "One +5  Ringer set high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": null,
    "model": null,
    "retailPrice": 120,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/15.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-14991-1",
        "minQuantity": 5,
        "tierPrice": 114
      },
      {
        "id": "wt-14991-2",
        "minQuantity": 10,
        "tierPrice": 108
      },
      {
        "id": "wt-14991-3",
        "minQuantity": 50,
        "tierPrice": 102
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "14993",
    "sku": "AT-WC-14993",
    "slug": "mi-12-5g-ringer-set",
    "title": "Mi 12 5G Ringer set",
    "description": "Mi 12 5G Ringer set high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 22840,
      "name": "Xiaomi Mi 12 5G Ringer set",
      "slug": "mi-12-5g-ringer-set"
    },
    "retailPrice": 100,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/Mi-12-5G.jpg"
    ],
    "compatibleModels": [
      {
        "id": 22840,
        "name": "Xiaomi Mi 12 5G Ringer set",
        "brandName": "Xiaomi",
        "slug": "mi-12-5g-ringer-set"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14993-1",
        "minQuantity": 5,
        "tierPrice": 95
      },
      {
        "id": "wt-14993-2",
        "minQuantity": 10,
        "tierPrice": 90
      },
      {
        "id": "wt-14993-3",
        "minQuantity": 50,
        "tierPrice": 85
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "12808",
    "sku": "AT-WC-12808",
    "slug": "vivo-y16-ringer-box",
    "title": "Vivo Y16 Ringer Box",
    "description": "Vivo Y16 Ringer Box high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 32445,
      "name": "Vivo Y16 Ringer Box",
      "slug": "vivo-y16-ringer-box"
    },
    "retailPrice": 70,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/y16-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 32445,
        "name": "Vivo Y16 Ringer Box",
        "brandName": "Vivo",
        "slug": "vivo-y16-ringer-box"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-12808-1",
        "minQuantity": 5,
        "tierPrice": 66.5
      },
      {
        "id": "wt-12808-2",
        "minQuantity": 10,
        "tierPrice": 63
      },
      {
        "id": "wt-12808-3",
        "minQuantity": 50,
        "tierPrice": 59.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "12807",
    "sku": "AT-WC-12807",
    "slug": "realme-c67-ringer-box",
    "title": "Realme C67 Ringer Box",
    "description": "Realme C67 Ringer Box high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 94636,
      "name": "Realme C67 Ringer Box",
      "slug": "realme-c67-ringer-box"
    },
    "retailPrice": 110,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/r-c67.jpg"
    ],
    "compatibleModels": [
      {
        "id": 94636,
        "name": "Realme C67 Ringer Box",
        "brandName": "Realme",
        "slug": "realme-c67-ringer-box"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-12807-1",
        "minQuantity": 5,
        "tierPrice": 104.5
      },
      {
        "id": "wt-12807-2",
        "minQuantity": 10,
        "tierPrice": 99
      },
      {
        "id": "wt-12807-3",
        "minQuantity": 50,
        "tierPrice": 93.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "11890",
    "sku": "AT-WC-11890",
    "slug": "narzo-50a-ringer-box",
    "title": "Narzo 50A Ringer Box",
    "description": "Narzo 50A Ringer Box high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": null,
    "model": null,
    "retailPrice": 70,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/narzo-50a.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-11890-1",
        "minQuantity": 5,
        "tierPrice": 66.5
      },
      {
        "id": "wt-11890-2",
        "minQuantity": 10,
        "tierPrice": 63
      },
      {
        "id": "wt-11890-3",
        "minQuantity": 50,
        "tierPrice": 59.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "9826",
    "sku": "AT-WC-9826",
    "slug": "tecno-bb4k-ringer-set",
    "title": "Tecno BB4K Ringer set",
    "description": "Tecno BB4K Ringer set high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 30120,
      "name": "Tecno BB4K Ringer set",
      "slug": "tecno-bb4k-ringer-set"
    },
    "retailPrice": 70,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/10/bb4k.webp"
    ],
    "compatibleModels": [
      {
        "id": 30120,
        "name": "Tecno BB4K Ringer set",
        "brandName": "Tecno",
        "slug": "tecno-bb4k-ringer-set"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-9826-1",
        "minQuantity": 5,
        "tierPrice": 66.5
      },
      {
        "id": "wt-9826-2",
        "minQuantity": 10,
        "tierPrice": 63
      },
      {
        "id": "wt-9826-3",
        "minQuantity": 50,
        "tierPrice": 59.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 17
  },
  {
    "id": "9825",
    "sku": "AT-WC-9825",
    "slug": "oppo-f17-ringer-set",
    "title": "Oppo F17 Ringer set",
    "description": "Oppo F17 Ringer set high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 79422,
      "name": "Oppo F17 Ringer set",
      "slug": "oppo-f17-ringer-set"
    },
    "retailPrice": 80,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/10/f17-ringer-box.jpg"
    ],
    "compatibleModels": [
      {
        "id": 79422,
        "name": "Oppo F17 Ringer set",
        "brandName": "Oppo",
        "slug": "oppo-f17-ringer-set"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-9825-1",
        "minQuantity": 5,
        "tierPrice": 76
      },
      {
        "id": "wt-9825-2",
        "minQuantity": 10,
        "tierPrice": 72
      },
      {
        "id": "wt-9825-3",
        "minQuantity": 50,
        "tierPrice": 68
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "9824",
    "sku": "AT-WC-9824",
    "slug": "vivo-y75-5g-ringer-set",
    "title": "Vivo Y75 (5G) Ringer set",
    "description": "Vivo Y75 (5G) Ringer set high quality mobile spare part.",
    "category": {
      "id": 23,
      "name": "Speaker",
      "slug": "speaker"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 23216,
      "name": "Vivo Y75 (5G) Ringer set",
      "slug": "vivo-y75-5g-ringer-set"
    },
    "retailPrice": 120,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/10/y75-5g.jpg"
    ],
    "compatibleModels": [
      {
        "id": 23216,
        "name": "Vivo Y75 (5G) Ringer set",
        "brandName": "Vivo",
        "slug": "vivo-y75-5g-ringer-set"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-9824-1",
        "minQuantity": 5,
        "tierPrice": 114
      },
      {
        "id": "wt-9824-2",
        "minQuantity": 10,
        "tierPrice": 108
      },
      {
        "id": "wt-9824-3",
        "minQuantity": 50,
        "tierPrice": 102
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "19197",
    "sku": "AT-WC-19197",
    "slug": "samsung-j2-ringer",
    "title": "Samsung J2 Ringer",
    "description": "Samsung J2 Ringer high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 45002,
      "name": "Samsung J2 Ringer",
      "slug": "samsung-j2-ringer"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/j2.png"
    ],
    "compatibleModels": [
      {
        "id": 45002,
        "name": "Samsung J2 Ringer",
        "brandName": "Samsung",
        "slug": "samsung-j2-ringer"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19197-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-19197-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-19197-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "6970",
    "sku": "AT-WC-6970",
    "slug": "oppo-a53-realme-7i-spk-jali",
    "title": "Oppo A53 / Realme 7i Spk Jali",
    "description": "Oppo A53 / Realme 7i Spk Jali high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 95517,
      "name": "Realme Oppo A53 / Realme 7i Spk Jali",
      "slug": "oppo-a53-realme-7i-spk-jali"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/05/a53-spk.jpg"
    ],
    "compatibleModels": [
      {
        "id": 95517,
        "name": "Realme Oppo A53 / Realme 7i Spk Jali",
        "brandName": "Realme",
        "slug": "oppo-a53-realme-7i-spk-jali"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-6970-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-6970-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-6970-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "6969",
    "sku": "AT-WC-6969",
    "slug": "realme-c11-spk-jali",
    "title": "Realme C11 Spk Jali",
    "description": "Realme C11 Spk Jali high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 36895,
      "name": "Realme C11 Spk Jali",
      "slug": "realme-c11-spk-jali"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/05/a53-spk.jpg"
    ],
    "compatibleModels": [
      {
        "id": 36895,
        "name": "Realme C11 Spk Jali",
        "brandName": "Realme",
        "slug": "realme-c11-spk-jali"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-6969-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-6969-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-6969-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "6968",
    "sku": "AT-WC-6968",
    "slug": "realme-c2-a1k-spk-jali",
    "title": "Realme C2 \\ A1K Spk Jali",
    "description": "Realme C2 \\ A1K Spk Jali high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 10788,
      "name": "Realme C2 \\ A1K Spk Jali",
      "slug": "realme-c2-a1k-spk-jali"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/05/a1k.jpg"
    ],
    "compatibleModels": [
      {
        "id": 10788,
        "name": "Realme C2 \\ A1K Spk Jali",
        "brandName": "Realme",
        "slug": "realme-c2-a1k-spk-jali"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-6968-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-6968-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-6968-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "2605",
    "sku": "AT-WC-2605",
    "slug": "mi-note-7-spk-jaly",
    "title": "Mi Note 7 Spk Jaly",
    "description": "Mi Note 7 Spk Jaly high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 29527,
      "name": "Xiaomi Mi Note 7 Spk Jaly",
      "slug": "mi-note-7-spk-jaly"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/05/Note-7-spk-jali.jpg"
    ],
    "compatibleModels": [
      {
        "id": 29527,
        "name": "Xiaomi Mi Note 7 Spk Jaly",
        "brandName": "Xiaomi",
        "slug": "mi-note-7-spk-jaly"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2605-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-2605-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-2605-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "2603",
    "sku": "AT-WC-2603",
    "slug": "vivo-y12-spk-jaly",
    "title": "Vivo Y12 Spk jaly",
    "description": "Vivo Y12 Spk jaly high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 57017,
      "name": "Vivo Y12 Spk jaly",
      "slug": "vivo-y12-spk-jaly"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/05/Y12.jpg"
    ],
    "compatibleModels": [
      {
        "id": 57017,
        "name": "Vivo Y12 Spk jaly",
        "brandName": "Vivo",
        "slug": "vivo-y12-spk-jaly"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2603-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-2603-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-2603-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "2601",
    "sku": "AT-WC-2601",
    "slug": "vivo-y20-spk-jaly",
    "title": "Vivo y20 spk jaly",
    "description": "Vivo y20 spk jaly high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 50119,
      "name": "Vivo y20 spk jaly",
      "slug": "vivo-y20-spk-jaly"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/05/y20.jpg"
    ],
    "compatibleModels": [
      {
        "id": 50119,
        "name": "Vivo y20 spk jaly",
        "brandName": "Vivo",
        "slug": "vivo-y20-spk-jaly"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2601-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-2601-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-2601-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "2598",
    "sku": "AT-WC-2598",
    "slug": "universol-spk-jaly",
    "title": "universol spk jaly",
    "description": "universol spk jaly high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": null,
    "model": null,
    "retailPrice": 2,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/05/uni-spk-jali-scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-2598-1",
        "minQuantity": 5,
        "tierPrice": 1.9
      },
      {
        "id": "wt-2598-2",
        "minQuantity": 10,
        "tierPrice": 1.8
      },
      {
        "id": "wt-2598-3",
        "minQuantity": 50,
        "tierPrice": 1.7
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "2502",
    "sku": "AT-WC-2502",
    "slug": "redmi-8a-spk-jali",
    "title": "Redmi 8A Spk Jali",
    "description": "Redmi 8A Spk Jali high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 70262,
      "name": "Xiaomi Redmi 8A Spk Jali",
      "slug": "redmi-8a-spk-jali"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/04/spk5-scaled-e1766140306966.jpg"
    ],
    "compatibleModels": [
      {
        "id": 70262,
        "name": "Xiaomi Redmi 8A Spk Jali",
        "brandName": "Xiaomi",
        "slug": "redmi-8a-spk-jali"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2502-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-2502-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-2502-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "2497",
    "sku": "AT-WC-2497",
    "slug": "vivo-y91-spk-jali",
    "title": "Vivo Y91 Spk Jali",
    "description": "Vivo Y91 Spk Jali high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 13584,
      "name": "Vivo Y91 Spk Jali",
      "slug": "vivo-y91-spk-jali"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/04/spk4-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 13584,
        "name": "Vivo Y91 Spk Jali",
        "brandName": "Vivo",
        "slug": "vivo-y91-spk-jali"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2497-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-2497-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-2497-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "2496",
    "sku": "AT-WC-2496",
    "slug": "redmi-9a-spk-jali",
    "title": "Redmi 9A spk jali",
    "description": "Redmi 9A spk jali high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 72106,
      "name": "Xiaomi Redmi 9A spk jali",
      "slug": "redmi-9a-spk-jali"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/04/spk3-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 72106,
        "name": "Xiaomi Redmi 9A spk jali",
        "brandName": "Xiaomi",
        "slug": "redmi-9a-spk-jali"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2496-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-2496-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-2496-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "2495",
    "sku": "AT-WC-2495",
    "slug": "oppo-a37-spk-jali",
    "title": "Oppo A37 Spk Jali",
    "description": "Oppo A37 Spk Jali high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 99572,
      "name": "Oppo A37 Spk Jali",
      "slug": "oppo-a37-spk-jali"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/04/spk2-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 99572,
        "name": "Oppo A37 Spk Jali",
        "brandName": "Oppo",
        "slug": "oppo-a37-spk-jali"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2495-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-2495-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-2495-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "2492",
    "sku": "AT-WC-2492",
    "slug": "oppo-a5s-spk-jali",
    "title": "Oppo A5S Spk jali",
    "description": "Oppo A5S Spk jali high quality mobile spare part.",
    "category": {
      "id": 47,
      "name": "Speaker Grill / Jali",
      "slug": "speaker-jali"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 65161,
      "name": "Oppo A5S Spk jali",
      "slug": "oppo-a5s-spk-jali"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/04/spk1-scaled.jpg"
    ],
    "compatibleModels": [
      {
        "id": 65161,
        "name": "Oppo A5S Spk jali",
        "brandName": "Oppo",
        "slug": "oppo-a5s-spk-jali"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2492-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-2492-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-2492-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "18622",
    "sku": "AT-WC-18622",
    "slug": "t12-skussoldring-iron-bit",
    "title": "T12 &#8211; SKUSSoldring Iron bit",
    "description": "T12 &#8211; SKUSSoldring Iron bit high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 180,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/T12-SKUS-BIT.webp"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-18622-1",
        "minQuantity": 5,
        "tierPrice": 171
      },
      {
        "id": "wt-18622-2",
        "minQuantity": 10,
        "tierPrice": 162
      },
      {
        "id": "wt-18622-3",
        "minQuantity": 50,
        "tierPrice": 153
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "14526",
    "sku": "AT-WC-14526",
    "slug": "sunshine-ss-304q-6-port-usb-smart-lightning-charger-with-qc-3-0-port",
    "title": "Sunshine SS-304Q 6 Port USB Smart Lightning Charger With QC 3.0 Port",
    "description": "Sunshine SS-304Q 6 Port USB Smart Lightning Charger With QC 3.0 Port high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 950,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/ss-304q-550x550-1.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-14526-1",
        "minQuantity": 5,
        "tierPrice": 902.5
      },
      {
        "id": "wt-14526-2",
        "minQuantity": 10,
        "tierPrice": 855
      },
      {
        "id": "wt-14526-3",
        "minQuantity": 50,
        "tierPrice": 807.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "13555",
    "sku": "AT-WC-13555",
    "slug": "4-pin-auto-cut-smd-element",
    "title": "4 Pin Auto Cut SMD Element",
    "description": "4 Pin Auto Cut SMD Element high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 120,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/31UmWlNvFIL.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/4-pin-eliment-scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13555-1",
        "minQuantity": 5,
        "tierPrice": 114
      },
      {
        "id": "wt-13555-2",
        "minQuantity": 10,
        "tierPrice": 108
      },
      {
        "id": "wt-13555-3",
        "minQuantity": 50,
        "tierPrice": 102
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "13541",
    "sku": "AT-WC-13541",
    "slug": "2-pin-smd-element",
    "title": "2 Pin SMD Element",
    "description": "2 Pin SMD Element high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 60,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/2-pin-eliment-scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13541-1",
        "minQuantity": 5,
        "tierPrice": 57
      },
      {
        "id": "wt-13541-2",
        "minQuantity": 10,
        "tierPrice": 54
      },
      {
        "id": "wt-13541-3",
        "minQuantity": 50,
        "tierPrice": 51
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "13542",
    "sku": "AT-WC-13542",
    "slug": "mechanic-hk5090",
    "title": "Mechanic HK5090 Non dust Cloths",
    "description": "Mechanic HK5090 Non dust Cloths high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/Cloth-scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13542-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-13542-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-13542-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "13552",
    "sku": "AT-WC-13552",
    "slug": "koocu-ic-opener-tool",
    "title": "Koocu Ic Opener Tool",
    "description": "Koocu Ic Opener Tool high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 300,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/ic-tool-scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13552-1",
        "minQuantity": 5,
        "tierPrice": 285
      },
      {
        "id": "wt-13552-2",
        "minQuantity": 10,
        "tierPrice": 270
      },
      {
        "id": "wt-13552-3",
        "minQuantity": 50,
        "tierPrice": 255
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "13553",
    "sku": "AT-WC-13553",
    "slug": "double-head-anti-static-cleaning-brush",
    "title": "Double Head Anti-Static Cleaning Brush",
    "description": "Double Head Anti-Static Cleaning Brush high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/brush-bs-02-1-550x550-1.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/brus-scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13553-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-13553-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-13553-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "13545",
    "sku": "AT-WC-13545",
    "slug": "mechenic-183c-og-ppd-pest",
    "title": "Mechenic 183C Og PPD Pest",
    "description": "Mechenic 183C Og PPD Pest high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 180,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/ppd.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13545-1",
        "minQuantity": 5,
        "tierPrice": 171
      },
      {
        "id": "wt-13545-2",
        "minQuantity": 10,
        "tierPrice": 162
      },
      {
        "id": "wt-13545-3",
        "minQuantity": 50,
        "tierPrice": 153
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "13546",
    "sku": "AT-WC-13546",
    "slug": "mechanic-sak-11-high-quality-smd-tweezer",
    "title": "MECHANIC SAK-11 High Quality SMD Tweezer",
    "description": "MECHANIC SAK-11 High Quality SMD Tweezer high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": {
      "id": 7,
      "name": "OnePlus",
      "slug": "oneplus"
    },
    "model": {
      "id": 4654,
      "name": "OnePlus MECHANIC SAK-11 High Quality SMD Tweezer",
      "slug": "mechanic-sak-11-high-quality-smd-tweezer"
    },
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/SAK-11-scaled.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/mechanic-sak-11-1-550x550-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 4654,
        "name": "OnePlus MECHANIC SAK-11 High Quality SMD Tweezer",
        "brandName": "OnePlus",
        "slug": "mechanic-sak-11-high-quality-smd-tweezer"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-13546-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-13546-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-13546-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "13547",
    "sku": "AT-WC-13547",
    "slug": "mechanic-sak-15-high-quality-smd-tweezer",
    "title": "MECHANIC SAK-15 High Quality SMD Tweezer",
    "description": "MECHANIC SAK-15 High Quality SMD Tweezer\n\nFeature \n\nStainless Steel Curved Nose Tweezers Anti-static Precision Tweezers for PCB Link Bridges\nIt can be for phone motherboard and PCB link jump cable repair.\nStainless Steel Anti-Acid Tweezers Fine Point Curved Tweezers Tool for Precision Point Phone Repair ESD Work.\n\n\nPackage Content*\n1x MECHANIC SAK-15 High Quality SMD Tweezer",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/SAK-15--scaled.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/mechanic-sak-15-1-550x550-1.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13547-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-13547-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-13547-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "13548",
    "sku": "AT-WC-13548",
    "slug": "tiger-06-nipper",
    "title": "Tiger 06 Nipper",
    "description": "Tiger 06 Nipper high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 75,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/Tiger-06-niper-scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13548-1",
        "minQuantity": 5,
        "tierPrice": 71.25
      },
      {
        "id": "wt-13548-2",
        "minQuantity": 10,
        "tierPrice": 67.5
      },
      {
        "id": "wt-13548-3",
        "minQuantity": 50,
        "tierPrice": 63.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 12
  },
  {
    "id": "13538",
    "sku": "AT-WC-13538",
    "slug": "tiger-07-nipper",
    "title": "Tiger 07 Nipper",
    "description": "Tiger 07 Nipper high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 45,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/Tiger-07--scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13538-1",
        "minQuantity": 5,
        "tierPrice": 42.75
      },
      {
        "id": "wt-13538-2",
        "minQuantity": 10,
        "tierPrice": 40.5
      },
      {
        "id": "wt-13538-3",
        "minQuantity": 50,
        "tierPrice": 38.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "13537",
    "sku": "AT-WC-13537",
    "slug": "mechanic-ip-15-boot-cable",
    "title": "Mechanic IP 15 Boot Cable",
    "description": "Mechanic IP 15 Boot Cable high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 1000,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/boot-cable-scaled.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/boot-cable-2.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13537-1",
        "minQuantity": 5,
        "tierPrice": 950
      },
      {
        "id": "wt-13537-2",
        "minQuantity": 10,
        "tierPrice": 900
      },
      {
        "id": "wt-13537-3",
        "minQuantity": 50,
        "tierPrice": 850
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "13523",
    "sku": "AT-WC-13523",
    "slug": "koocu-6-port-kc-328-charger",
    "title": "Koocu 6 port KC 328 Charger",
    "description": "Koocu 6 port KC 328 Charger high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 1100,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/koocu-6-port-scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13523-1",
        "minQuantity": 5,
        "tierPrice": 1045
      },
      {
        "id": "wt-13523-2",
        "minQuantity": 10,
        "tierPrice": 990
      },
      {
        "id": "wt-13523-3",
        "minQuantity": 50,
        "tierPrice": 935
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "13511",
    "sku": "AT-WC-13511",
    "slug": "sunshine-g21-combo-pesting-black-glue",
    "title": "Sunshine G21 Combo Pesting Black Glue",
    "description": "Sunshine G21 Combo Pesting Black Glue high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 75,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/g21-scaled.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-13511-1",
        "minQuantity": 5,
        "tierPrice": 71.25
      },
      {
        "id": "wt-13511-2",
        "minQuantity": 10,
        "tierPrice": 67.5
      },
      {
        "id": "wt-13511-3",
        "minQuantity": 50,
        "tierPrice": 63.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "12822",
    "sku": "AT-WC-12822",
    "slug": "t12d-soldering-iron-station",
    "title": "T12D+ Soldering Iron Station",
    "description": "T12D+ Soldering Iron Station high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 1599,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/iron.webp"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-12822-1",
        "minQuantity": 5,
        "tierPrice": 1519.05
      },
      {
        "id": "wt-12822-2",
        "minQuantity": 10,
        "tierPrice": 1439.1
      },
      {
        "id": "wt-12822-3",
        "minQuantity": 50,
        "tierPrice": 1359.15
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "11882",
    "sku": "AT-WC-11882",
    "slug": "mega-universal-stencil",
    "title": "Mega Universal stencil",
    "description": "Mega Universal stencil high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 300,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/mega-idia.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-11882-1",
        "minQuantity": 5,
        "tierPrice": 285
      },
      {
        "id": "wt-11882-2",
        "minQuantity": 10,
        "tierPrice": 270
      },
      {
        "id": "wt-11882-3",
        "minQuantity": 50,
        "tierPrice": 255
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "11883",
    "sku": "AT-WC-11883",
    "slug": "koocu-universal-stencil",
    "title": "Koocu Universal stencil",
    "description": "Koocu Universal stencil high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 245,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/koocu.webp"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-11883-1",
        "minQuantity": 5,
        "tierPrice": 232.75
      },
      {
        "id": "wt-11883-2",
        "minQuantity": 10,
        "tierPrice": 220.5
      },
      {
        "id": "wt-11883-3",
        "minQuantity": 50,
        "tierPrice": 208.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "11686",
    "sku": "AT-WC-11686",
    "slug": "relife-rosine-flex",
    "title": "Relife Rosine Flex",
    "description": "Relife Rosine Flex high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 35,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/rosin.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-11686-1",
        "minQuantity": 5,
        "tierPrice": 33.25
      },
      {
        "id": "wt-11686-2",
        "minQuantity": 10,
        "tierPrice": 31.5
      },
      {
        "id": "wt-11686-3",
        "minQuantity": 50,
        "tierPrice": 29.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "10540",
    "sku": "AT-WC-10540",
    "slug": "koocu-kc-599a-soldering-iron-bit-cleaner",
    "title": "Koocu KC-599A Soldering Iron Bit Cleaner",
    "description": "Koocu KC-599A Soldering Iron Bit Cleaner high quality mobile spare part.",
    "category": {
      "id": 19,
      "name": "Repair Tools",
      "slug": "tools"
    },
    "brand": null,
    "model": null,
    "retailPrice": 150,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/11/koocu.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-10540-1",
        "minQuantity": 5,
        "tierPrice": 142.5
      },
      {
        "id": "wt-10540-2",
        "minQuantity": 10,
        "tierPrice": 135
      },
      {
        "id": "wt-10540-3",
        "minQuantity": 50,
        "tierPrice": 127.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "2731",
    "sku": "AT-WC-2731",
    "slug": "honor-y5-2020-touch",
    "title": "Honor Y5 (2020) Touch",
    "description": "Honor Y5 (2020) Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": null,
    "model": null,
    "retailPrice": 110,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/06/y5-2020.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-2731-1",
        "minQuantity": 5,
        "tierPrice": 104.5
      },
      {
        "id": "wt-2731-2",
        "minQuantity": 10,
        "tierPrice": 99
      },
      {
        "id": "wt-2731-3",
        "minQuantity": 50,
        "tierPrice": 93.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "2730",
    "sku": "AT-WC-2730",
    "slug": "comio-c2-touch",
    "title": "Comio C2 Touch",
    "description": "Comio C2 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": null,
    "model": null,
    "retailPrice": 120,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/06/comio-c2.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-2730-1",
        "minQuantity": 5,
        "tierPrice": 114
      },
      {
        "id": "wt-2730-2",
        "minQuantity": 10,
        "tierPrice": 108
      },
      {
        "id": "wt-2730-3",
        "minQuantity": 50,
        "tierPrice": 102
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "2572",
    "sku": "AT-WC-2572",
    "slug": "itel-a23-pro-touch",
    "title": "Itel A23 Pro Touch",
    "description": "Itel A23 Pro Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 13,
      "name": "Itel",
      "slug": "itel"
    },
    "model": {
      "id": 52313,
      "name": "Itel A23 Pro Touch",
      "slug": "itel-a23-pro-touch"
    },
    "retailPrice": 120,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/05/a23-pro.jpg"
    ],
    "compatibleModels": [
      {
        "id": 52313,
        "name": "Itel A23 Pro Touch",
        "brandName": "Itel",
        "slug": "itel-a23-pro-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-2572-1",
        "minQuantity": 5,
        "tierPrice": 114
      },
      {
        "id": "wt-2572-2",
        "minQuantity": 10,
        "tierPrice": 108
      },
      {
        "id": "wt-2572-3",
        "minQuantity": 50,
        "tierPrice": 102
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "732",
    "sku": "AT-WC-732",
    "slug": "vivo-y55-touch",
    "title": "Vivo Y55 Touch",
    "description": "Vivo Y55 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 60548,
      "name": "Vivo Y55 Touch",
      "slug": "vivo-y55-touch"
    },
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/Y55-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 60548,
        "name": "Vivo Y55 Touch",
        "brandName": "Vivo",
        "slug": "vivo-y55-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-732-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-732-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-732-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "731",
    "sku": "AT-WC-731",
    "slug": "vivo-y66-touch",
    "title": "Vivo Y66 Touch",
    "description": "Vivo Y66 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 30408,
      "name": "Vivo Y66 Touch",
      "slug": "vivo-y66-touch"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/Y66-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 30408,
        "name": "Vivo Y66 Touch",
        "brandName": "Vivo",
        "slug": "vivo-y66-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-731-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-731-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-731-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 14
  },
  {
    "id": "730",
    "sku": "AT-WC-730",
    "slug": "vivo-y69-touch",
    "title": "Vivo Y69 Touch",
    "description": "Vivo Y69 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 48851,
      "name": "Vivo Y69 Touch",
      "slug": "vivo-y69-touch"
    },
    "retailPrice": 85,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/Y69.jpg",
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/Y69.jpg"
    ],
    "compatibleModels": [
      {
        "id": 48851,
        "name": "Vivo Y69 Touch",
        "brandName": "Vivo",
        "slug": "vivo-y69-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-730-1",
        "minQuantity": 5,
        "tierPrice": 80.75
      },
      {
        "id": "wt-730-2",
        "minQuantity": 10,
        "tierPrice": 76.5
      },
      {
        "id": "wt-730-3",
        "minQuantity": 50,
        "tierPrice": 72.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "717",
    "sku": "AT-WC-717",
    "slug": "vivo-y53-touch",
    "title": "Vivo Y53 Touch",
    "description": "Vivo Y53 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 22062,
      "name": "Vivo Y53 Touch",
      "slug": "vivo-y53-touch"
    },
    "retailPrice": 65,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/Y53-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 22062,
        "name": "Vivo Y53 Touch",
        "brandName": "Vivo",
        "slug": "vivo-y53-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-717-1",
        "minQuantity": 5,
        "tierPrice": 61.75
      },
      {
        "id": "wt-717-2",
        "minQuantity": 10,
        "tierPrice": 58.5
      },
      {
        "id": "wt-717-3",
        "minQuantity": 50,
        "tierPrice": 55.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 9
  },
  {
    "id": "719",
    "sku": "AT-WC-719",
    "slug": "vivo-y51-touch",
    "title": "Vivo Y51 Touch",
    "description": "Vivo Y51 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 93555,
      "name": "Vivo Y51 Touch",
      "slug": "vivo-y51-touch"
    },
    "retailPrice": 80,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/Y51.jpg"
    ],
    "compatibleModels": [
      {
        "id": 93555,
        "name": "Vivo Y51 Touch",
        "brandName": "Vivo",
        "slug": "vivo-y51-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-719-1",
        "minQuantity": 5,
        "tierPrice": 76
      },
      {
        "id": "wt-719-2",
        "minQuantity": 10,
        "tierPrice": 72
      },
      {
        "id": "wt-719-3",
        "minQuantity": 50,
        "tierPrice": 68
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "696",
    "sku": "AT-WC-696",
    "slug": "vivo-v5-touch",
    "title": "Vivo V5 Touch",
    "description": "Vivo V5 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 1,
      "name": "Vivo",
      "slug": "vivo"
    },
    "model": {
      "id": 35416,
      "name": "Vivo V5 Touch",
      "slug": "vivo-v5-touch"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/V5-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 35416,
        "name": "Vivo V5 Touch",
        "brandName": "Vivo",
        "slug": "vivo-v5-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-696-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-696-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-696-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "698",
    "sku": "AT-WC-698",
    "slug": "tecno-kc-1-touch",
    "title": "Tecno KC 1 Touch",
    "description": "Tecno KC 1 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 6256,
      "name": "Tecno KC 1 Touch",
      "slug": "tecno-kc-1-touch"
    },
    "retailPrice": 125,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/KC1-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 6256,
        "name": "Tecno KC 1 Touch",
        "brandName": "Tecno",
        "slug": "tecno-kc-1-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-698-1",
        "minQuantity": 5,
        "tierPrice": 118.75
      },
      {
        "id": "wt-698-2",
        "minQuantity": 10,
        "tierPrice": 112.5
      },
      {
        "id": "wt-698-3",
        "minQuantity": 50,
        "tierPrice": 106.25
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "699",
    "sku": "AT-WC-699",
    "slug": "tecno-in-1-touch",
    "title": "Tecno In 1 Touch",
    "description": "Tecno In 1 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 79472,
      "name": "Tecno In 1 Touch",
      "slug": "tecno-in-1-touch"
    },
    "retailPrice": 120,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/IN1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 79472,
        "name": "Tecno In 1 Touch",
        "brandName": "Tecno",
        "slug": "tecno-in-1-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-699-1",
        "minQuantity": 5,
        "tierPrice": 114
      },
      {
        "id": "wt-699-2",
        "minQuantity": 10,
        "tierPrice": 108
      },
      {
        "id": "wt-699-3",
        "minQuantity": 50,
        "tierPrice": 102
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "700",
    "sku": "AT-WC-700",
    "slug": "tecno-in-2-touch",
    "title": "Tecno In 2 Touch",
    "description": "Tecno In 2 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 11,
      "name": "Tecno",
      "slug": "tecno"
    },
    "model": {
      "id": 38611,
      "name": "Tecno In 2 Touch",
      "slug": "tecno-in-2-touch"
    },
    "retailPrice": 120,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/IN2.jpg"
    ],
    "compatibleModels": [
      {
        "id": 38611,
        "name": "Tecno In 2 Touch",
        "brandName": "Tecno",
        "slug": "tecno-in-2-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-700-1",
        "minQuantity": 5,
        "tierPrice": 114
      },
      {
        "id": "wt-700-2",
        "minQuantity": 10,
        "tierPrice": 108
      },
      {
        "id": "wt-700-3",
        "minQuantity": 50,
        "tierPrice": 102
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "702",
    "sku": "AT-WC-702",
    "slug": "samsung-on-5-touch",
    "title": "Samsung On 5 Touch",
    "description": "Samsung On 5 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 79138,
      "name": "Samsung On 5 Touch",
      "slug": "samsung-on-5-touch"
    },
    "retailPrice": 110,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/ON5.jpg"
    ],
    "compatibleModels": [
      {
        "id": 79138,
        "name": "Samsung On 5 Touch",
        "brandName": "Samsung",
        "slug": "samsung-on-5-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-702-1",
        "minQuantity": 5,
        "tierPrice": 104.5
      },
      {
        "id": "wt-702-2",
        "minQuantity": 10,
        "tierPrice": 99
      },
      {
        "id": "wt-702-3",
        "minQuantity": 50,
        "tierPrice": 93.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "704",
    "sku": "AT-WC-704",
    "slug": "samsung-j8-touch",
    "title": "Samsung J8 Touch",
    "description": "Samsung J8 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 98936,
      "name": "Samsung J8 Touch",
      "slug": "samsung-j8-touch"
    },
    "retailPrice": 130,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/J8.jpg"
    ],
    "compatibleModels": [
      {
        "id": 98936,
        "name": "Samsung J8 Touch",
        "brandName": "Samsung",
        "slug": "samsung-j8-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-704-1",
        "minQuantity": 5,
        "tierPrice": 123.5
      },
      {
        "id": "wt-704-2",
        "minQuantity": 10,
        "tierPrice": 117
      },
      {
        "id": "wt-704-3",
        "minQuantity": 50,
        "tierPrice": 110.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "705",
    "sku": "AT-WC-705",
    "slug": "samsung-j710-touch",
    "title": "Samsung J710 Touch",
    "description": "Samsung J710 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 81289,
      "name": "Samsung J710 Touch",
      "slug": "samsung-j710-touch"
    },
    "retailPrice": 140,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/J710.jpg"
    ],
    "compatibleModels": [
      {
        "id": 81289,
        "name": "Samsung J710 Touch",
        "brandName": "Samsung",
        "slug": "samsung-j710-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-705-1",
        "minQuantity": 5,
        "tierPrice": 133
      },
      {
        "id": "wt-705-2",
        "minQuantity": 10,
        "tierPrice": 126
      },
      {
        "id": "wt-705-3",
        "minQuantity": 50,
        "tierPrice": 119
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "706",
    "sku": "AT-WC-706",
    "slug": "samsung-j7-touch",
    "title": "Samsung J7 Touch",
    "description": "Samsung J7 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 27412,
      "name": "Samsung J7 Touch",
      "slug": "samsung-j7-touch"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/J7.jpg"
    ],
    "compatibleModels": [
      {
        "id": 27412,
        "name": "Samsung J7 Touch",
        "brandName": "Samsung",
        "slug": "samsung-j7-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-706-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-706-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-706-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "707",
    "sku": "AT-WC-707",
    "slug": "samsung-j7-pro-touch",
    "title": "Samsung J7 pro Touch",
    "description": "Samsung J7 pro Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 54224,
      "name": "Samsung J7 pro Touch",
      "slug": "samsung-j7-pro-touch"
    },
    "retailPrice": 120,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/J7-PRO.jpg"
    ],
    "compatibleModels": [
      {
        "id": 54224,
        "name": "Samsung J7 pro Touch",
        "brandName": "Samsung",
        "slug": "samsung-j7-pro-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-707-1",
        "minQuantity": 5,
        "tierPrice": 114
      },
      {
        "id": "wt-707-2",
        "minQuantity": 10,
        "tierPrice": 108
      },
      {
        "id": "wt-707-3",
        "minQuantity": 50,
        "tierPrice": 102
      }
    ],
    "rating": 4.8,
    "reviewCount": 8
  },
  {
    "id": "676",
    "sku": "AT-WC-676",
    "slug": "samsung-j6-touch",
    "title": "Samsung J6 Touch",
    "description": "Samsung J6 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 31565,
      "name": "Samsung J6 Touch",
      "slug": "samsung-j6-touch"
    },
    "retailPrice": 120,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/J6.jpg"
    ],
    "compatibleModels": [
      {
        "id": 31565,
        "name": "Samsung J6 Touch",
        "brandName": "Samsung",
        "slug": "samsung-j6-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-676-1",
        "minQuantity": 5,
        "tierPrice": 114
      },
      {
        "id": "wt-676-2",
        "minQuantity": 10,
        "tierPrice": 108
      },
      {
        "id": "wt-676-3",
        "minQuantity": 50,
        "tierPrice": 102
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "678",
    "sku": "AT-WC-678",
    "slug": "samsung-g530-touch",
    "title": "Samsung G530 Touch",
    "description": "Samsung G530 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 73010,
      "name": "Samsung G530 Touch",
      "slug": "samsung-g530-touch"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/G530.jpg"
    ],
    "compatibleModels": [
      {
        "id": 73010,
        "name": "Samsung G530 Touch",
        "brandName": "Samsung",
        "slug": "samsung-g530-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-678-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-678-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-678-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 4
  },
  {
    "id": "679",
    "sku": "AT-WC-679",
    "slug": "samsung-g532-touch",
    "title": "Samsung G532 Touch",
    "description": "Samsung G532 Touch high quality mobile spare part.",
    "category": {
      "id": 16,
      "name": "Touch Pad",
      "slug": "touch-pad"
    },
    "brand": {
      "id": 6,
      "name": "Samsung",
      "slug": "samsung"
    },
    "model": {
      "id": 32460,
      "name": "Samsung G532 Touch",
      "slug": "samsung-g532-touch"
    },
    "retailPrice": 90,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2023/01/G532.jpg"
    ],
    "compatibleModels": [
      {
        "id": 32460,
        "name": "Samsung G532 Touch",
        "brandName": "Samsung",
        "slug": "samsung-g532-touch"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-679-1",
        "minQuantity": 5,
        "tierPrice": 85.5
      },
      {
        "id": "wt-679-2",
        "minQuantity": 10,
        "tierPrice": 81
      },
      {
        "id": "wt-679-3",
        "minQuantity": 50,
        "tierPrice": 76.5
      }
    ],
    "rating": 4.8,
    "reviewCount": 15
  },
  {
    "id": "19195",
    "sku": "AT-WC-19195",
    "slug": "realme-2-volume-flex",
    "title": "Realme 2 Volume Flex",
    "description": "Realme 2 Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 28496,
      "name": "Realme 2",
      "slug": "realme-2"
    },
    "retailPrice": 12,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/realme-2.png"
    ],
    "compatibleModels": [
      {
        "id": 28496,
        "name": "Realme 2",
        "brandName": "Realme",
        "slug": "realme-2"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-19195-1",
        "minQuantity": 5,
        "tierPrice": 11.4
      },
      {
        "id": "wt-19195-2",
        "minQuantity": 10,
        "tierPrice": 10.8
      },
      {
        "id": "wt-19195-3",
        "minQuantity": 50,
        "tierPrice": 10.2
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "18618",
    "sku": "AT-WC-18618",
    "slug": "oppo-k1-volume-flex",
    "title": "Oppo K1 Volume Flex",
    "description": "Oppo K1 Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 19588,
      "name": "Oppo K1",
      "slug": "oppo-k1"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/07/k1-removebg-preview.png"
    ],
    "compatibleModels": [
      {
        "id": 19588,
        "name": "Oppo K1",
        "brandName": "Oppo",
        "slug": "oppo-k1"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-18618-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-18618-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-18618-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "14967",
    "sku": "AT-WC-14967",
    "slug": "oppo-a57-old-volume-flex",
    "title": "Oppo A57 Old Volume Flex",
    "description": "Oppo A57 Old Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 74921,
      "name": "Oppo A57 Old",
      "slug": "oppo-a57-old"
    },
    "retailPrice": 15,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/03/a57-old.webp"
    ],
    "compatibleModels": [
      {
        "id": 74921,
        "name": "Oppo A57 Old",
        "brandName": "Oppo",
        "slug": "oppo-a57-old"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14967-1",
        "minQuantity": 5,
        "tierPrice": 14.25
      },
      {
        "id": "wt-14967-2",
        "minQuantity": 10,
        "tierPrice": 13.5
      },
      {
        "id": "wt-14967-3",
        "minQuantity": 50,
        "tierPrice": 12.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 16
  },
  {
    "id": "14399",
    "sku": "AT-WC-14399",
    "slug": "oppo-a55-5g-volume-flex",
    "title": "Oppo A55 5G Volume Flex",
    "description": "Oppo A55 5G Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 52195,
      "name": "Oppo A55 5G",
      "slug": "oppo-a55-5g"
    },
    "retailPrice": 15,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/a55-5g.jpg"
    ],
    "compatibleModels": [
      {
        "id": 52195,
        "name": "Oppo A55 5G",
        "brandName": "Oppo",
        "slug": "oppo-a55-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14399-1",
        "minQuantity": 5,
        "tierPrice": 14.25
      },
      {
        "id": "wt-14399-2",
        "minQuantity": 10,
        "tierPrice": 13.5
      },
      {
        "id": "wt-14399-3",
        "minQuantity": 50,
        "tierPrice": 12.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "14389",
    "sku": "AT-WC-14389",
    "slug": "oppo-a55-4g-a54-volume-flex",
    "title": "Oppo A55 4G / A54 Volume Flex",
    "description": "Oppo A55 4G / A54 Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 86037,
      "name": "Oppo A55 4G / A54",
      "slug": "oppo-a55-4g-a54"
    },
    "retailPrice": 15,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/02/a55-4g.webp"
    ],
    "compatibleModels": [
      {
        "id": 86037,
        "name": "Oppo A55 4G / A54",
        "brandName": "Oppo",
        "slug": "oppo-a55-4g-a54"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-14389-1",
        "minQuantity": 5,
        "tierPrice": 14.25
      },
      {
        "id": "wt-14389-2",
        "minQuantity": 10,
        "tierPrice": 13.5
      },
      {
        "id": "wt-14389-3",
        "minQuantity": 50,
        "tierPrice": 12.75
      }
    ],
    "rating": 4.8,
    "reviewCount": 13
  },
  {
    "id": "12810",
    "sku": "AT-WC-12810",
    "slug": "mi-11-lite-volume-flex",
    "title": "Mi 11 Lite Volume Flex",
    "description": "Mi 11 Lite Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 80265,
      "name": "Xiaomi Mi 11 Lite",
      "slug": "mi-11-lite"
    },
    "retailPrice": 18,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2025/01/11-lite.jpg"
    ],
    "compatibleModels": [
      {
        "id": 80265,
        "name": "Xiaomi Mi 11 Lite",
        "brandName": "Xiaomi",
        "slug": "mi-11-lite"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-12810-1",
        "minQuantity": 5,
        "tierPrice": 17.1
      },
      {
        "id": "wt-12810-2",
        "minQuantity": 10,
        "tierPrice": 16.2
      },
      {
        "id": "wt-12810-3",
        "minQuantity": 50,
        "tierPrice": 15.3
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "11505",
    "sku": "AT-WC-11505",
    "slug": "oppo-a3s-volume-flex",
    "title": "Oppo A3s Volume Flex",
    "description": "Oppo A3s Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 79590,
      "name": "Oppo A3s",
      "slug": "oppo-a3s"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/a3s-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 79590,
        "name": "Oppo A3s",
        "brandName": "Oppo",
        "slug": "oppo-a3s"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11505-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-11505-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-11505-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "11504",
    "sku": "AT-WC-11504",
    "slug": "oppo-a78-5g-volume-flex",
    "title": "Oppo A78  5G Volume Flex",
    "description": "Oppo A78  5G Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 55150,
      "name": "Oppo A78  5G",
      "slug": "oppo-a78-5g"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/a78-5g-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 55150,
        "name": "Oppo A78  5G",
        "brandName": "Oppo",
        "slug": "oppo-a78-5g"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11504-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-11504-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-11504-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 5
  },
  {
    "id": "11503",
    "sku": "AT-WC-11503",
    "slug": "oppo-a33-new-volume-flex",
    "title": "Oppo A33 New Volume Flex",
    "description": "Oppo A33 New Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 85992,
      "name": "Oppo A33 New",
      "slug": "oppo-a33-new"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/a33-new-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 85992,
        "name": "Oppo A33 New",
        "brandName": "Oppo",
        "slug": "oppo-a33-new"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11503-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-11503-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-11503-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 10
  },
  {
    "id": "11502",
    "sku": "AT-WC-11502",
    "slug": "oppo-a83-volume-flex",
    "title": "Oppo A83 Volume Flex",
    "description": "Oppo A83 Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 92205,
      "name": "Oppo A83",
      "slug": "oppo-a83"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/a83-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 92205,
        "name": "Oppo A83",
        "brandName": "Oppo",
        "slug": "oppo-a83"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11502-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-11502-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-11502-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "11501",
    "sku": "AT-WC-11501",
    "slug": "oppo-a71-volume-flex",
    "title": "Oppo A71 Volume Flex",
    "description": "Oppo A71 Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 4,
      "name": "Oppo",
      "slug": "oppo"
    },
    "model": {
      "id": 32599,
      "name": "Oppo A71",
      "slug": "oppo-a71"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/a71.jpg"
    ],
    "compatibleModels": [
      {
        "id": 32599,
        "name": "Oppo A71",
        "brandName": "Oppo",
        "slug": "oppo-a71"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11501-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-11501-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-11501-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "11477",
    "sku": "AT-WC-11477",
    "slug": "one-ce2-5g-volume-flex",
    "title": "One + CE2 5G Volume Flex",
    "description": "One + CE2 5G Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": null,
    "model": null,
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/1-ce2.jpg"
    ],
    "compatibleModels": [],
    "wholesaleTiers": [
      {
        "id": "wt-11477-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-11477-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-11477-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  },
  {
    "id": "11473",
    "sku": "AT-WC-11473",
    "slug": "mi-11x-volume-flex",
    "title": "Mi 11X Volume Flex",
    "description": "Mi 11X Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 155,
      "name": "Xiaomi Mi 11X",
      "slug": "mi-11x"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/11x.jpg"
    ],
    "compatibleModels": [
      {
        "id": 155,
        "name": "Xiaomi Mi 11X",
        "brandName": "Xiaomi",
        "slug": "mi-11x"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11473-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-11473-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-11473-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 6
  },
  {
    "id": "11474",
    "sku": "AT-WC-11474",
    "slug": "mi-11t-mi-11t-pro-volume-flex",
    "title": "Mi 11T / Mi 11T Pro Volume Flex",
    "description": "Mi 11T / Mi 11T Pro Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 5,
      "name": "Xiaomi",
      "slug": "xiaomi"
    },
    "model": {
      "id": 1011,
      "name": "Xiaomi Mi 11T / Mi 11T Pro",
      "slug": "mi-11t-mi-11t-pro"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/mi-11t-pro.jpg"
    ],
    "compatibleModels": [
      {
        "id": 1011,
        "name": "Xiaomi Mi 11T / Mi 11T Pro",
        "brandName": "Xiaomi",
        "slug": "mi-11t-mi-11t-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11474-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-11474-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-11474-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 3
  },
  {
    "id": "11470",
    "sku": "AT-WC-11470",
    "slug": "realme-1-volume-flex",
    "title": "Realme 1 Volume Flex",
    "description": "Realme 1 Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 39833,
      "name": "Realme 1",
      "slug": "realme-1"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/realme-1.jpg"
    ],
    "compatibleModels": [
      {
        "id": 39833,
        "name": "Realme 1",
        "brandName": "Realme",
        "slug": "realme-1"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11470-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-11470-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-11470-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 11
  },
  {
    "id": "11467",
    "sku": "AT-WC-11467",
    "slug": "realme-6-pro-volume-flex",
    "title": "Realme 6 Pro Volume Flex",
    "description": "Realme 6 Pro Volume Flex high quality mobile spare part.",
    "category": {
      "id": 230,
      "name": "Volume Flex",
      "slug": "volume-flex"
    },
    "brand": {
      "id": 2,
      "name": "Realme",
      "slug": "realme"
    },
    "model": {
      "id": 70370,
      "name": "Realme 6 Pro",
      "slug": "realme-6-pro"
    },
    "retailPrice": 16,
    "salePrice": null,
    "stockQty": 50,
    "minOrderQty": 1,
    "weightGrams": 50,
    "qualityGrade": "Original Quality",
    "isActive": true,
    "images": [
      "https://abhaytechnicals.com/wp-content/uploads/2024/12/realme-6-pro.jpg"
    ],
    "compatibleModels": [
      {
        "id": 70370,
        "name": "Realme 6 Pro",
        "brandName": "Realme",
        "slug": "realme-6-pro"
      }
    ],
    "wholesaleTiers": [
      {
        "id": "wt-11467-1",
        "minQuantity": 5,
        "tierPrice": 15.2
      },
      {
        "id": "wt-11467-2",
        "minQuantity": 10,
        "tierPrice": 14.4
      },
      {
        "id": "wt-11467-3",
        "minQuantity": 50,
        "tierPrice": 13.6
      }
    ],
    "rating": 4.8,
    "reviewCount": 7
  }
];

export const mockOrders: CustomerOrder[] = [
  {
    id: 'ord-1001',
    orderNumber: 'AT-2026-90412',
    createdAt: '2026-09-24T14:32:00Z',
    totalAmount: 1850.0,
    subtotal: 1750.0,
    shippingFee: 100.0,
    paymentStatus: 'PAID',
    orderStatus: 'SHIPPED',
    awbCode: 'DEL-984128941',
    courier: 'Delhivery Surface',
    items: [
      {
        sku: 'AT-WC-128',
        productTitle: 'Vivo Y83 Charging Flex',
        quantity: 10,
        unitPrice: 50.0,
        totalPrice: 500.0,
        tierApplied: '10+ Pcs Wholesale',
      },
    ],
    shippingAddress: {
      name: 'Abhay Mobile Repairing Center',
      phone: '+91 98765 43210',
      addressLine1: 'Shop #12, Ground Floor, Central Electronics Complex',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302001',
      gstin: '08AAAAA0000A1Z5',
    },
  },
];

export const mockAddresses: DeliveryAddress[] = [
  {
    id: 'addr-1',
    name: 'Abhay Mobile Repairing Center',
    phone: '+91 98765 43210',
    addressLine1: 'Shop #12, Ground Floor, Central Electronics Complex',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001',
    isDefault: true,
  },
];

export const mockSavedAddresses: DeliveryAddress[] = mockAddresses;
