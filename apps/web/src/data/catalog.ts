export type Category = "Men" | "Women" | "Kids" | "Sarees" | "Ethnic Wear" | "Footwear";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  discount: number;
  image: string;
  sizes: string[];
  colors: string[];
  material: string;
  fit: string;
  stock: number;
  tags: Array<"trending" | "new" | "bestseller">;
  description: string;
}

export const categoryMeta: Record<Category, { slug: string; icon: string; copy: string }> = {
  Men: { slug: "men", icon: "👔", copy: "Shirts, polos, denim and smart everyday essentials." },
  Women: { slug: "women", icon: "👗", copy: "Contemporary silhouettes, dresses and versatile separates." },
  Kids: { slug: "kids", icon: "🧒", copy: "Comfort-first styles built for everyday movement." },
  Sarees: { slug: "sarees", icon: "🥻", copy: "Festive, tissue, silk and elegant drapes for every occasion." },
  "Ethnic Wear": { slug: "ethnic-wear", icon: "✨", copy: "Kurtas, sets and occasion-ready Indian wear." },
  Footwear: { slug: "footwear", icon: "👟", copy: "Casual, festive and everyday footwear to finish the look." },
};

export const categories = Object.keys(categoryMeta) as Category[];

export const products: Product[] = [
  {
    id: "mens-linen-shirt",
    name: "Premium Linen Shirt",
    category: "Men",
    price: 1899,
    discount: 20,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Ivory", "Sky Blue", "Olive"],
    material: "Linen blend",
    fit: "Regular fit",
    stock: 28,
    tags: ["trending", "bestseller"],
    description: "Breathable linen-blend shirt with a clean collar and relaxed structure for warm-weather dressing."
  },
  {
    id: "mens-polo",
    name: "Textured Polo T-Shirt",
    category: "Men",
    price: 1299,
    discount: 15,
    image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Cream", "Navy"],
    material: "Cotton",
    fit: "Slim fit",
    stock: 42,
    tags: ["new"],
    description: "Soft textured cotton polo designed for polished everyday wear."
  },
  {
    id: "womens-midi-dress",
    name: "Floral Midi Dress",
    category: "Women",
    price: 2299,
    discount: 25,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Rose", "Blue"],
    material: "Viscose",
    fit: "Flowy fit",
    stock: 19,
    tags: ["trending", "new"],
    description: "Fluid midi silhouette with a soft floral print and an easy day-to-evening drape."
  },
  {
    id: "womens-coord-set",
    name: "Minimal Co-ord Set",
    category: "Women",
    price: 2799,
    discount: 10,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sand", "Black"],
    material: "Cotton blend",
    fit: "Relaxed fit",
    stock: 14,
    tags: ["bestseller"],
    description: "A modern two-piece set with relaxed tailoring for effortless styling."
  },
  {
    id: "kids-party-set",
    name: "Kids Celebration Set",
    category: "Kids",
    price: 1499,
    discount: 18,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Peach", "Mint"],
    material: "Cotton blend",
    fit: "Comfort fit",
    stock: 31,
    tags: ["new"],
    description: "Soft celebration-ready set designed to keep children comfortable through long occasions."
  },
  {
    id: "gold-tissue-saree",
    name: "Golden Tissue Saree",
    category: "Sarees",
    price: 3499,
    discount: 12,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
    sizes: ["Free Size"],
    colors: ["Gold", "Champagne"],
    material: "Tissue blend",
    fit: "Free drape",
    stock: 12,
    tags: ["trending", "bestseller"],
    description: "Luminous tissue saree with a refined festive sheen for weddings and special occasions."
  },
  {
    id: "silk-saree",
    name: "Classic Silk Saree",
    category: "Sarees",
    price: 4999,
    discount: 15,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80",
    sizes: ["Free Size"],
    colors: ["Maroon", "Emerald", "Royal Blue"],
    material: "Silk blend",
    fit: "Free drape",
    stock: 9,
    tags: ["new"],
    description: "Traditional silk-inspired weave with rich color and a classic occasion-ready border."
  },
  {
    id: "mens-kurta-set",
    name: "Festive Kurta Set",
    category: "Ethnic Wear",
    price: 3199,
    discount: 20,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Ivory", "Sage", "Navy"],
    material: "Jacquard cotton",
    fit: "Straight fit",
    stock: 22,
    tags: ["trending"],
    description: "Elegant kurta set with subtle texture, tailored for festive and family occasions."
  },
  {
    id: "casual-sneakers",
    name: "Everyday Sneakers",
    category: "Footwear",
    price: 1999,
    discount: 20,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Tan"],
    material: "Synthetic upper",
    fit: "Regular fit",
    stock: 36,
    tags: ["bestseller"],
    description: "Clean everyday sneakers with cushioned support and versatile styling."
  }
];

export function salePrice(product: Product): number {
  return Math.round(product.price * (1 - product.discount / 100));
}

export function categoryFromSlug(slug?: string): Category | undefined {
  return categories.find((category) => categoryMeta[category].slug === slug);
}
