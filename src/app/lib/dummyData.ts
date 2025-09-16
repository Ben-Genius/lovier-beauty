import heroLashes from "../../../public/images/img-5.png";
import heroNails from "../../../public/images/hero.jpg";
import heroBraids from "../../../public/images/enhanced_image.png";
import h1 from "../../../public/images/h1.jpeg"
import hh2 from "../../../public/images/h2.jpeg";
import hh3 from "../../../public/images/h3.jpeg";
import hh4 from "../../../public/images/h4.jpeg";
import hh5 from "../../../public/images/h5.jpeg";
import hh6 from "../../../public/images/h6.jpeg";
import hh7 from "../../../public/images/h7.jpeg";
import hh8 from "../../../public/images/h8.jpeg";
import ee1 from "../../../public/images/e1.jpeg";
import ee2 from "../../../public/images/e2.jpeg";
import ee3 from "../../../public/images/e3.jpeg";
import ee4 from "../../../public/images/e5.jpeg";
import nn from "../../../public/images/n1.jpeg";
import nn2 from "../../../public/images/n2.jpeg";
import nn3 from "../../../public/images/n3.jpeg";
import nn4 from "../../../public/images/n4.jpeg";
import nn5 from "../../../public/images/n5.jpeg";
import nn6 from "../../../public/images/n6.jpeg";
import nn7 from "../../../public/images/n7.jpeg";
import nn8 from "../../../public/images/n8.jpeg";
import pp1 from "../../../public/images/p1.jpg";
import pp2 from "../../../public/images/p2.jpeg";
import pp3 from "../../../public/images/p3.jpeg";
import pp4 from "../../../public/images/p4.jpeg";
import pp5 from "../../../public/images/p5.jpeg";

const filter = ["All", "Lashes", "Nails", "Braids", "Pedicures", "Piercings"];

export const categories = [
  // Lashes
  {
    id: "classic-lashes",
    title: "Classic Lash Extensions",
    description: "Natural-looking lashes with one extension per natural lash. Perfect for everyday elegance.",
    image: heroLashes,
    price: "From $120",
    duration: "1.5-2 hours",
    category: "Lashes"
  },
  {
    id: "hybrid-lashes",
    title: "Hybrid Lash Extensions",
    description: "The perfect blend of classic and volume techniques for fuller, textured lashes.",
    image: heroLashes,
    price: "From $135",
    duration: "2-2.5 hours",
    category: "Lashes"
  },
  {
    id: "volume-lashes",
    title: "Volume Lash Extensions",
    description: "Dramatic, full lashes using lightweight fans for maximum impact and glamour.",
    image: heroLashes,
    price: "From $150",
    duration: "2-3 hours",
    category: "Lashes",
    featured: true
  },
  {
    id: "lash-refills",
    title: "Lash Extension Refills",
    description: "Maintain your beautiful lashes with regular touch-ups every 2-3 weeks.",
    image: heroLashes,
    price: "From $80",
    duration: "1-1.5 hours",
    category: "Lashes"
  },

  // Nails
  {
    id: "press-on-nails",
    title: "Custom Press-On Nails",
    description: "Instantly gorgeous nails with our handcrafted, reusable press-on sets.",
    image: heroNails,
    price: "From $45",
    duration: "30-45 mins",
    category: "Nails"
  },
  {
    id: "acrylic-nails",
    title: "Acrylic Nail Extensions",
    description: "Durable, long-lasting nails with unlimited design possibilities.",
    image: heroNails,
    price: "From $65",
    duration: "1.5-2 hours",
    category: "Nails",
    featured: true
  },
  {
    id: "gel-nails",
    title: "Gel Manicure",
    description: "Long-lasting, chip-resistant color with a glossy finish that lasts up to 3 weeks.",
    image: heroNails,
    price: "From $55",
    duration: "1-1.5 hours",
    category: "Nails"
  },
  {
    id: "nail-art",
    title: "Custom Nail Art",
    description: "Express your creativity with intricate designs, patterns, and artistic details.",
    image: heroNails,
    price: "From $85",
    duration: "2-3 hours",
    category: "Nails"
  },

  // Braids
  {
    id: "box-braids",
    title: "Box Braids",
    description: "Classic protective styling with neat, square-shaped sections for versatile looks.",
    image: heroBraids,
    price: "From $180",
    duration: "4-6 hours",
    category: "Braids",
    featured: true
  },
  {
    id: "knotless-braids",
    title: "Knotless Braids",
    description: "Gentle on edges with a natural-looking start, perfect for sensitive scalps.",
    image: heroBraids,
    price: "From $200",
    duration: "5-7 hours",
    category: "Braids"
  },
  {
    id: "jungle-braids",
    title: "Jungle Braids",
    description: "Thick, chunky braids that make a bold statement with reduced styling time.",
    image: heroBraids,
    price: "From $150",
    duration: "3-4 hours",
    category: "Braids"
  },
  {
    id: "passion-twists",
    title: "Passion Twists",
    description: "Romantic, bohemian-style twists with beautiful texture and movement.",
    image: heroBraids,
    price: "From $160",
    duration: "4-5 hours",
    category: "Braids"
  },

  // Pedicures
  {
    id: "classic-pedicure",
    title: "Classic Pedicure",
    description: "Essential foot care with nail trimming, cuticle care, and polish application.",
    image: heroNails,
    price: "From $35",
    duration: "45-60 mins",
    category: "Pedicures"
  },
  {
    id: "spa-pedicure",
    title: "Luxury Spa Pedicure",
    description: "Ultimate relaxation with exfoliation, massage, and premium treatments.",
    image: heroNails,
    price: "From $55",
    duration: "60-75 mins",
    category: "Pedicures"
  },
  {
    id: "gel-pedicure",
    title: "Gel Pedicure",
    description: "Long-lasting color for your toes with chip-resistant gel polish.",
    image: heroNails,
    price: "From $45",
    duration: "60 mins",
    category: "Pedicures"
  },

  // Piercings
  {
    id: "ear-piercing",
    title: "Ear Piercing",
    description: "Professional ear piercing with sterile equipment and premium jewelry.",
    image: heroLashes,
    price: "From $40",
    duration: "15-30 mins",
    category: "Piercings"
  },
  {
    id: "nose-piercing",
    title: "Nose Piercing",
    description: "Expert nose piercing services with careful placement and aftercare guidance.",
    image: heroLashes,
    price: "From $60",
    duration: "20-30 mins",
    category: "Piercings"
  },
  {
    id: "body-piercing",
    title: "Body Piercing",
    description: "Safe, professional body piercing with strict hygiene protocols.",
    image: heroLashes,
    price: "From $80",
    duration: "30-45 mins",
    category: "Piercings"
  }
];

export const galleryImages = [
  {
    id: 1,
    src: heroNails,
    category: "Lashes",
    title: "Volume Lash Extensions",
    description: "Dramatic volume lashes for special events",
    featured: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&q=90",
      "https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?w=600&q=90"
    ],
    details: {
      duration: "2 hours",
      priceRange: "$100 - $150"
    }
  },
  {
    id: 2,
    src: "https://loviers-beauty-hub.vercel.app/img-20.png",
    category: "Nails",
    title: "Purple Ombre Acrylics",
    description: "Custom purple gradient with gold accents",
    featured: false,
    additionalImages: [
      "https://loviers-beauty-hub.vercel.app/_vercel/image?url=/img-8.jpeg&w=1536&q=100",
      "https://loviers-beauty-hub.vercel.app/_vercel/image?url=/img-7.jpeg&w=1536&q=100"
    ],
    details: {
      duration: "1.5 hours",
      priceRange: "$50 - $80"
    }
  },
  {
    id: 3,
    src: "https://loviers-beauty-hub.vercel.app/_vercel/image?url=/img-1.jpeg&w=1536&q=100",
    category: "Braids",
    title: "Knotless Box Braids",
    description: "Protective styling with a natural look",
    featured: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1599487488175-d91c6e6c3625?w=600&q=90",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=90"
    ],
    details: {
      duration: "4-6 hours",
      priceRange: "$150 - $250"
    }
  },
  {
    id: 4,
    src: "https://loviers-beauty-hub.vercel.app/img-16.jpeg",
    category: "Lashes",
    title: "Classic Lash Extensions",
    description: "Natural enhancement for everyday beauty",
    featured: false,
    additionalImages: [
      "https://loviers-beauty-hub.vercel.app/img-16.jpeg",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=90"
    ],
    details: {
      duration: "1.5 hours",
      priceRange: "$80 - $120"
    }
  },
  {
    id: 5,
    src: h1,
    category: "Nails",
    title: "Gel Manicure",
    description: "Long-lasting shine with nail art details",
    featured: false,
    additionalImages: [
      "https://loviers-beauty-hub.vercel.app/_vercel/image?url=/img-7.jpeg&w=1536&q=100",
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=90"
    ],
    details: {
      duration: "1 hour",
      priceRange: "$40 - $60"
    }
  },
  {
    id: 6,
    src: hh2,
    category: "Braids",
    title: "Passion Twists",
    description: "Bohemian-style protective twists",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=90",
      "https://images.unsplash.com/photo-1560869713-bf165a6275b3?w=600&q=90"
    ],
    details: {
      duration: "3-5 hours",
      priceRange: "$120 - $200"
    }
  },
  {
    id: 7,
    src: pp1,
    category: "Pedicures",
    title: "Luxury Spa Pedicure",
    description: "Complete foot care with gel polish",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1610992023721-5e6d4a0ed6df?w=600&q=90",
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=90"
    ],
    details: {
      duration: "1 hour",
      priceRange: "$50 - $70"
    }
  },
  {
    id: 8,
    src: ee1,
    category: "Lashes",
    title: "Hybrid Lash Extensions",
    description: "Perfect blend of classic and volume",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=90",
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&q=90"
    ],
    details: {
      duration: "2 hours",
      priceRange: "$90 - $130"
    }
  },
  {
    id: 9,
    src: nn,
    category: "Nails",
    title: "Custom Nail Art",
    description: "Intricate hand-painted designs",
    featured: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=90",
      "https://images.unsplash.com/photo-1593951113818-7e3688b85f75?w=600&q=90"
    ],
    details: {
      duration: "2 hours",
      priceRange: "$60 - $100"
    }
  },
  {
    id: 10,
    src: hh3,
    category: "Braids",
    title: "Jungle Braids",
    description: "Bold, chunky braids for statement style",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1560869713-bf165a6275b3?w=600&q=90",
      "https://images.unsplash.com/photo-1599487488175-d91c6e6c3625?w=600&q=90"
    ],
    details: {
      duration: "4-6 hours",
      priceRange: "$150 - $250"
    }
  },
  {
    id: 11,
    src: pp2,
    category: "Piercings",
    title: "Ear Piercing Collection",
    description: "Professional ear piercing with premium jewelry",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1519686146896-4b5b9f5b9a4b?w=600&q=90",
      "https://images.unsplash.com/photo-1562525506-40e47e3a71e2?w=600&q=90"
    ],
    details: {
      duration: "30 minutes",
      priceRange: "$30 - $60"
    }
  },
  {
    id: 12,
    src: nn2,
    category: "Nails",
    title: "Press-On Nail Set",
    description: "Custom handcrafted press-on nails",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1593951113818-7e3688b85f75?w=600&q=90",
      "https://images.unsplash.com/photo-1610992023721-5e6d4a0ed6df?w=600&q=90"
    ],
    details: {
      duration: "N/A",
      priceRange: "$25 - $50"
    }
  },
  {
    id: 13,
    src: pp3,
    category: "Piercings",
    title: "Nose Piercing",
    description: "Elegant nose piercing with delicate jewelry",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1531891570158-e71b35a485bc?w=600&q=90",
      "https://images.unsplash.com/photo-1562525506-40e47e3a71e2?w=600&q=90"
    ],
    details: {
      duration: "20 minutes",
      priceRange: "$25 - $50"
    }
  },
  {
    id: 14,
    src: nn4,
    category: "Nails",
    title: "French Tip Manicure",
    description: "Classic French tips with a modern twist",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=90",
      "https://images.unsplash.com/photo-1610992023721-5e6d4a0ed6df?w=600&q=90"
    ],
    details: {
      duration: "1 hour",
      priceRange: "$35 - $55"
    }
  },
  {
    id: 15,
    src: hh4,
    category: "Braids",
    title: "Cornrows",
    description: "Traditional cornrows with intricate patterns",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1560869713-bf165a6275b3?w=600&q=90",
      "https://images.unsplash.com/photo-1599487488175-d91c6e6c3625?w=600&q=90"
    ],
    details: {
      duration: "3-5 hours",
      priceRange: "$100 - $180"
    }
  },
  {
    id: 16,
    src: ee2,
    category: "Lashes",
    title: "Mega Volume Lashes",
    description: "Extra-full lash extensions for bold glamour",
    featured: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1620799159799-74d079f3418f?w=600&q=90",
      "https://images.unsplash.com/photo-1620799569697-4e663f44c61b?w=600&q=90"
    ],
    details: {
      duration: "2.5 hours",
      priceRange: "$150 - $200"
    }
  },
  {
    id: 17,
    src: nn3,
    category: "Nails",
    title: "Matte Black Set",
    description: "Edgy matte black nails with silver accents",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1617957741648-538dfd1f0c68?w=600&q=90",
      "https://images.unsplash.com/photo-1621440318003-f474f7a3e8aa?w=600&q=90"
    ],
    details: {
      duration: "1.5 hours",
      priceRange: "$50 - $75"
    }
  },
  {
    id: 18,
    src: hh7,
    category: "Braids",
    title: "Fulani Braids",
    description: "Cultural style with beads and intricate designs",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1621776451861-38a5dce8a9f6?w=600&q=90",
      "https://images.unsplash.com/photo-1621776099453-3bfb66914318?w=600&q=90"
    ],
    details: {
      duration: "5-7 hours",
      priceRange: "$180 - $280"
    }
  },
  {
    id: 19,
    src: nn6,
    category: "Pedicures",
    title: "Gel Pedicure",
    description: "Glossy gel pedicure for weeks of shine",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1621776156091-21e4f8a37f4a?w=600&q=90",
      "https://images.unsplash.com/photo-1598300187589-43e5a2ecbb0d?w=600&q=90"
    ],
    details: {
      duration: "1 hour",
      priceRange: "$55 - $75"
    }
  },
  {
    id: 20,
    src: pp4,
    category: "Piercings",
    title: "Cartilage Piercing",
    description: "Trendy cartilage piercings with minimal pain",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1617042107354-7326dfd2d9ad?w=600&q=90",
      "https://images.unsplash.com/photo-1617042080332-dbe6900b8b5d?w=600&q=90"
    ],
    details: {
      duration: "30 minutes",
      priceRange: "$40 - $70"
    }
  },
  {
    id: 21,
    src: ee4,
    category: "Lashes",
    title: "Wispy Lash Extensions",
    description: "Feathered, soft wispy lashes for a flirty look",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1620807774629-0581e95b1df1?w=600&q=90",
      "https://images.unsplash.com/photo-1620799569697-4e663f44c61b?w=600&q=90"
    ],
    details: {
      duration: "2 hours",
      priceRange: "$100 - $140"
    }
  },
  {
    id: 22,
    src: nn7,
    category: "Nails",
    title: "Chrome Nails",
    description: "High-shine mirror chrome finish",
    featured: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1621440318003-f474f7a3e8aa?w=600&q=90",
      "https://images.unsplash.com/photo-1617957741648-538dfd1f0c68?w=600&q=90"
    ],
    details: {
      duration: "1.5 hours",
      priceRange: "$60 - $85"
    }
  },
  {
    id: 23,
    src: hh5,
    category: "Braids",
    title: "Goddess Braids",
    description: "Large, elegant braids with curly ends",
    featured: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1621776451861-38a5dce8a9f6?w=600&q=90",
      "https://images.unsplash.com/photo-1621776099453-3bfb66914318?w=600&q=90"
    ],
    details: {
      duration: "3-4 hours",
      priceRange: "$120 - $180"
    }
  },
  {
    id: 24,
    src: "https://images.unsplash.com/photo-1621776156091-21e4f8a37f4a?w=600&q=90",
    category: "Pedicures",
    title: "Detox Pedicure",
    description: "Relaxing pedicure with detoxifying soak",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1598300187589-43e5a2ecbb0d?w=600&q=90",
      "https://images.unsplash.com/photo-1621776957861-46a30bb1b9fc?w=600&q=90"
    ],
    details: {
      duration: "1.5 hours",
      priceRange: "$60 - $80"
    }
  },
  {
    id: 25,
    src: "https://images.unsplash.com/photo-1617042375876-bb9d08cce314?w=600&q=90",
    category: "Piercings",
    title: "Septum Piercing",
    description: "Bold and stylish septum piercing option",
    featured: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1617042080332-dbe6900b8b5d?w=600&q=90",
      "https://images.unsplash.com/photo-1617042107354-7326dfd2d9ad?w=600&q=90"
    ],
    details: {
      duration: "20 minutes",
      priceRange: "$50 - $80"
    }
  }
];
