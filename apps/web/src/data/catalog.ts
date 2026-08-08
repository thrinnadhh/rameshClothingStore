export type Category = "Men" | "Women" | "Kids" | "Sarees" | "Ethnic Wear" | "Footwear";

export type ProductTag =
  | "trending"
  | "new"
  | "bestseller"
  | "premium"
  | "quick-sale"
  | "top-pick"
  | "offer";

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
  tags: ProductTag[];
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
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=82",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Ivory", "Sky Blue", "Olive"],
    material: "Linen blend",
    fit: "Regular fit",
    stock: 28,
    tags: ["trending", "bestseller", "top-pick"],
    description: "Breathable linen-blend shirt with a clean collar and relaxed structure for warm-weather dressing."
  },
  {
    id: "mens-polo",
    name: "Textured Polo T-Shirt",
    category: "Men",
    price: 1299,
    discount: 15,
    image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=900&q=82",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Cream", "Navy"],
    material: "Cotton",
    fit: "Slim fit",
    stock: 42,
    tags: ["new", "top-pick"],
    description: "Soft textured cotton polo designed for polished everyday wear."
  },
  {
    id: "mens-overshirt",
    name: "Utility Overshirt",
    category: "Men",
    price: 2199,
    discount: 25,
    image: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=82",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Stone", "Olive", "Black"],
    material: "Cotton twill",
    fit: "Relaxed fit",
    stock: 18,
    tags: ["new", "trending", "quick-sale"],
    description: "A structured yet relaxed overshirt made for layering through changing seasons."
  },
  {
    id: "mens-denim",
    name: "Clean Straight Denim",
    category: "Men",
    price: 2299,
    discount: 30,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=82",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Indigo", "Mid Blue"],
    material: "Cotton denim",
    fit: "Straight fit",
    stock: 26,
    tags: ["quick-sale", "bestseller", "offer"],
    description: "Versatile straight-leg denim with a clean wash and dependable everyday structure."
  },
  {
    id: "womens-midi-dress",
    name: "Floral Midi Dress",
    category: "Women",
    price: 2299,
    discount: 25,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=82",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Rose", "Blue"],
    material: "Viscose",
    fit: "Flowy fit",
    stock: 19,
    tags: ["trending", "new", "top-pick"],
    description: "Fluid midi silhouette with a soft floral print and an easy day-to-evening drape."
  },
  {
    id: "womens-coord-set",
    name: "Minimal Co-ord Set",
    category: "Women",
    price: 2799,
    discount: 10,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=82",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sand", "Black"],
    material: "Cotton blend",
    fit: "Relaxed fit",
    stock: 14,
    tags: ["bestseller", "premium"],
    description: "A modern two-piece set with relaxed tailoring for effortless styling."
  },
  {
    id: "womens-satin-dress",
    name: "Satin Evening Dress",
    category: "Women",
    price: 3299,
    discount: 18,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=82",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Wine", "Midnight", "Champagne"],
    material: "Satin",
    fit: "Bias cut",
    stock: 11,
    tags: ["premium", "new", "top-pick"],
    description: "A fluid satin dress with a graceful bias cut designed for refined evening dressing."
  },
  {
    id: "womens-cotton-shirt",
    name: "Relaxed Cotton Shirt",
    category: "Women",
    price: 1499,
    discount: 20,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=82",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Blue Stripe", "Sage"],
    material: "Cotton",
    fit: "Relaxed fit",
    stock: 34,
    tags: ["quick-sale", "trending", "offer"],
    description: "A breathable relaxed shirt for layering, workdays and understated everyday styling."
  },
  {
    id: "kids-party-set",
    name: "Kids Celebration Set",
    category: "Kids",
    price: 1499,
    discount: 18,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=82",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Peach", "Mint"],
    material: "Cotton blend",
    fit: "Comfort fit",
    stock: 31,
    tags: ["new", "top-pick"],
    description: "Soft celebration-ready set designed to keep children comfortable through long occasions."
  },
  {
    id: "kids-denim-set",
    name: "Kids Weekend Denim Set",
    category: "Kids",
    price: 1799,
    discount: 25,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=82",
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    colors: ["Denim Blue", "Light Wash"],
    material: "Soft denim",
    fit: "Easy fit",
    stock: 24,
    tags: ["trending", "quick-sale"],
    description: "Soft denim separates with easy movement and playful weekend styling."
  },
  {
    id: "kids-printed-dress",
    name: "Printed Twirl Dress",
    category: "Kids",
    price: 1299,
    discount: 15,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=82",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Lilac", "Sunshine"],
    material: "Cotton",
    fit: "A-line",
    stock: 29,
    tags: ["new", "bestseller"],
    description: "A light cotton dress with a twirl-friendly shape and cheerful print."
  },
  {
    id: "gold-tissue-saree",
    name: "Golden Tissue Saree",
    category: "Sarees",
    price: 3499,
    discount: 12,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=82",
    sizes: ["Free Size"],
    colors: ["Gold", "Champagne"],
    material: "Tissue blend",
    fit: "Free drape",
    stock: 12,
    tags: ["trending", "bestseller", "premium", "top-pick"],
    description: "Luminous tissue saree with a refined festive sheen for weddings and special occasions."
  },
  {
    id: "silk-saree",
    name: "Classic Silk Saree",
    category: "Sarees",
    price: 4999,
    discount: 15,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=82",
    sizes: ["Free Size"],
    colors: ["Maroon", "Emerald", "Royal Blue"],
    material: "Silk blend",
    fit: "Free drape",
    stock: 9,
    tags: ["new", "premium", "top-pick"],
    description: "Traditional silk-inspired weave with rich color and a classic occasion-ready border."
  },
  {
    id: "organza-saree",
    name: "Embroidered Organza Saree",
    category: "Sarees",
    price: 4299,
    discount: 20,
    image: "https://images.unsplash.com/photo-1610189012906-4f3520b4c8f5?auto=format&fit=crop&w=900&q=82",
    sizes: ["Free Size"],
    colors: ["Blush", "Ivory", "Powder Blue"],
    material: "Organza",
    fit: "Free drape",
    stock: 15,
    tags: ["premium", "trending", "new"],
    description: "Light organza drape with delicate embroidery and a contemporary festive finish."
  },
  {
    id: "printed-saree",
    name: "Everyday Printed Saree",
    category: "Sarees",
    price: 1899,
    discount: 30,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=82",
    sizes: ["Free Size"],
    colors: ["Indigo", "Rust", "Green"],
    material: "Viscose blend",
    fit: "Free drape",
    stock: 32,
    tags: ["quick-sale", "offer", "bestseller"],
    description: "An easy-flow printed saree designed for everyday elegance and low-effort styling."
  },
  {
    id: "mens-kurta-set",
    name: "Festive Kurta Set",
    category: "Ethnic Wear",
    price: 3199,
    discount: 20,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=82",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Ivory", "Sage", "Navy"],
    material: "Jacquard cotton",
    fit: "Straight fit",
    stock: 22,
    tags: ["trending", "premium", "top-pick"],
    description: "Elegant kurta set with subtle texture, tailored for festive and family occasions."
  },
  {
    id: "womens-anarkali",
    name: "Embroidered Anarkali Set",
    category: "Ethnic Wear",
    price: 3899,
    discount: 18,
    image: "https://images.unsplash.com/photo-1583391733975-daa2ec98a1f6?auto=format&fit=crop&w=900&q=82",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Wine", "Emerald", "Ivory"],
    material: "Chanderi blend",
    fit: "Flared fit",
    stock: 13,
    tags: ["premium", "new", "trending"],
    description: "A graceful Anarkali set with light embroidery and a polished celebration-ready silhouette."
  },
  {
    id: "womens-kurta-set",
    name: "Everyday Cotton Kurta Set",
    category: "Ethnic Wear",
    price: 2199,
    discount: 25,
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=900&q=82",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Indigo", "Rose", "Mustard"],
    material: "Cotton",
    fit: "Straight fit",
    stock: 38,
    tags: ["quick-sale", "bestseller", "offer"],
    description: "A breathable cotton kurta set for workdays, casual plans and easy festive dressing."
  },
  {
    id: "nehru-jacket-set",
    name: "Nehru Jacket Kurta Set",
    category: "Ethnic Wear",
    price: 4599,
    discount: 15,
    image: "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=900&q=82",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory-Gold", "Navy", "Maroon"],
    material: "Jacquard blend",
    fit: "Tailored fit",
    stock: 10,
    tags: ["premium", "top-pick"],
    description: "A tailored kurta and Nehru jacket pairing created for weddings and formal celebrations."
  },
  {
    id: "casual-sneakers",
    name: "Everyday Sneakers",
    category: "Footwear",
    price: 1999,
    discount: 20,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=82",
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Tan"],
    material: "Synthetic upper",
    fit: "Regular fit",
    stock: 36,
    tags: ["bestseller", "top-pick"],
    description: "Clean everyday sneakers with cushioned support and versatile styling."
  },
  {
    id: "leather-loafers",
    name: "Classic Penny Loafers",
    category: "Footwear",
    price: 2599,
    discount: 25,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=82",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Tan", "Black"],
    material: "Faux leather",
    fit: "Regular fit",
    stock: 17,
    tags: ["premium", "trending"],
    description: "Refined penny loafers designed to move easily between workwear and occasion dressing."
  },
  {
    id: "womens-heels",
    name: "Minimal Block Heels",
    category: "Footwear",
    price: 1899,
    discount: 30,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=82",
    sizes: ["4", "5", "6", "7", "8"],
    colors: ["Nude", "Black", "Gold"],
    material: "Synthetic",
    fit: "Comfort block heel",
    stock: 21,
    tags: ["quick-sale", "new", "offer"],
    description: "A clean block heel with balanced height for festive looks and evening plans."
  },
  {
    id: "ethnic-juttis",
    name: "Embroidered Festive Juttis",
    category: "Footwear",
    price: 1499,
    discount: 20,
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=82",
    sizes: ["4", "5", "6", "7", "8", "9"],
    colors: ["Gold", "Maroon", "Ivory"],
    material: "Textile upper",
    fit: "Comfort fit",
    stock: 25,
    tags: ["trending", "top-pick"],
    description: "Lightly embroidered juttis that add a festive finish without sacrificing comfort."
  },
  {
    id: "womens-wide-leg",
    name: "Tailored Wide-Leg Trousers",
    category: "Women",
    price: 1899,
    discount: 22,
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&w=900&q=82",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Stone", "Chocolate"],
    material: "Viscose blend",
    fit: "Wide leg",
    stock: 27,
    tags: ["new", "trending", "top-pick"],
    description: "Fluid wide-leg trousers with a clean waistband and modern tailored drape."
  }
];

export function salePrice(product: Product): number {
  return Math.round(product.price * (1 - product.discount / 100));
}

export function categoryFromSlug(slug?: string): Category | undefined {
  return categories.find((category) => categoryMeta[category].slug === slug);
}
