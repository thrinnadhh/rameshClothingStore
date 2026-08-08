import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import { categories, categoryFromSlug, categoryMeta, Product, products, salePrice } from "./data/catalog";

type CartLine = { productId: string; quantity: number; size: string };

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.tags[0] && <span className="tag">{product.tags[0]}</span>}
      </Link>
      <div className="product-body">
        <p className="eyebrow">{product.category}</p>
        <Link to={`/product/${product.id}`} className="product-title">{product.name}</Link>
        <div className="price-row">
          <strong>{money.format(salePrice(product))}</strong>
          {product.discount > 0 && <><s>{money.format(product.price)}</s><span>{product.discount}% off</span></>}
        </div>
      </div>
    </motion.article>
  );
}

function ProductRail({ title, items }: { title: string; items: Product[] }) {
  return (
    <section className="section">
      <div className="section-head"><h2>{title}</h2><span>{items.length} styles</span></div>
      <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>
  );
}

function Home() {
  const trending = products.filter((product) => product.tags.includes("trending"));
  const arrivals = products.filter((product) => product.tags.includes("new"));

  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <span className="hero-kicker">Ramesh Clothing Store · New Season</span>
          <h1>Modern Indian style, curated for every day.</h1>
          <p>Shop versatile fashion for men, women and kids—from elevated basics to sarees and festive ethnic wear.</p>
          <div className="hero-actions"><a href="#shop" className="primary-btn">Shop collection</a><Link to="/category/sarees" className="secondary-btn">Explore sarees</Link></div>
        </div>
        <div className="hero-art" aria-label="Fashion collection preview"><span>R</span><p>Ramesh<br/>Clothing</p></div>
      </section>

      <section id="shop" className="shell category-section">
        <div className="section-head"><h2>Shop by category</h2><span>Designed for every occasion</span></div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category} to={`/category/${categoryMeta[category].slug}`} className="category-card">
              <span>{categoryMeta[category].icon}</span><strong>{category}</strong><small>{categoryMeta[category].copy}</small>
            </Link>
          ))}
        </div>
      </section>

      <div className="shell"><ProductRail title="Trending now" items={trending} /><ProductRail title="New arrivals" items={arrivals} /></div>

      <section className="benefits shell">
        <div><strong>Easy exchanges</strong><span>Size exchanges within 7 days</span></div>
        <div><strong>Secure payments</strong><span>Ready for Razorpay integration</span></div>
        <div><strong>India-wide ready</strong><span>Catalog architecture supports shipping zones</span></div>
        <div><strong>Store support</strong><span>Inventory and admin flow included</span></div>
      </section>
    </main>
  );
}

function CategoryPage() {
  const { slug } = useParams();
  const category = categoryFromSlug(slug);
  if (!category) return <Navigate to="/" replace />;
  const items = products.filter((product) => product.category === category);
  return <main className="shell page"><p className="eyebrow">Collection</p><h1>{category}</h1><p className="page-copy">{categoryMeta[category].copy}</p><ProductRail title={`${category} collection`} items={items} /></main>;
}

function ProductPage({ addToCart }: { addToCart: (productId: string, size: string) => void }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [size, setSize] = useState("");
  const [notice, setNotice] = useState("");
  if (!product) return <Navigate to="/" replace />;

  const handleAdd = () => {
    const chosen = size || product.sizes[0];
    addToCart(product.id, chosen);
    setNotice(`Added ${product.name} · ${chosen}`);
  };

  return (
    <main className="shell page product-page">
      <div className="detail-image"><img src={product.image} alt={product.name} /></div>
      <div className="detail-copy">
        <p className="eyebrow">{product.category}</p><h1>{product.name}</h1>
        <div className="detail-price"><strong>{money.format(salePrice(product))}</strong><s>{money.format(product.price)}</s><span>{product.discount}% off</span></div>
        <p>{product.description}</p>
        <dl className="details"><div><dt>Material</dt><dd>{product.material}</dd></div><div><dt>Fit</dt><dd>{product.fit}</dd></div><div><dt>Stock</dt><dd>{product.stock} available</dd></div></dl>
        <div><p className="label">Select size</p><div className="size-row">{product.sizes.map((item) => <button key={item} onClick={() => setSize(item)} className={size === item ? "size active" : "size"}>{item}</button>)}</div></div>
        <div><p className="label">Available colors</p><p className="muted">{product.colors.join(" · ")}</p></div>
        <button onClick={handleAdd} className="primary-btn wide">Add to bag</button>
        {notice && <p className="success">{notice}</p>}
      </div>
    </main>
  );
}

function CartPage({ cart, setCart }: { cart: CartLine[]; setCart: (cart: CartLine[]) => void }) {
  const lines = cart.map((line) => ({ ...line, product: products.find((product) => product.id === line.productId)! })).filter((line) => line.product);
  const total = lines.reduce((sum, line) => sum + salePrice(line.product) * line.quantity, 0);

  const changeQty = (index: number, delta: number) => {
    const next = cart.map((line, i) => i === index ? { ...line, quantity: Math.max(1, line.quantity + delta) } : line);
    setCart(next);
  };

  const remove = (index: number) => setCart(cart.filter((_, i) => i !== index));

  return (
    <main className="shell page"><p className="eyebrow">Shopping bag</p><h1>Your cart</h1>
      {lines.length === 0 ? <div className="empty"><h2>Your bag is empty</h2><p>Add a few styles to start your order.</p><Link to="/" className="primary-btn">Continue shopping</Link></div> : (
        <div className="cart-layout"><div className="cart-list">{lines.map((line, index) => <article className="cart-line" key={`${line.productId}-${line.size}-${index}`}><img src={line.product.image} alt={line.product.name}/><div><strong>{line.product.name}</strong><span>Size {line.size}</span><span>{money.format(salePrice(line.product))}</span><div className="qty"><button onClick={() => changeQty(index, -1)}>−</button><b>{line.quantity}</b><button onClick={() => changeQty(index, 1)}>+</button><button className="remove" onClick={() => remove(index)}>Remove</button></div></div></article>)}</div><aside className="summary"><h2>Order summary</h2><p><span>Subtotal</span><strong>{money.format(total)}</strong></p><p><span>Delivery</span><strong>Calculated at checkout</strong></p><hr/><p className="total"><span>Total</span><strong>{money.format(total)}</strong></p><button className="primary-btn wide">Proceed to checkout</button></aside></div>
      )}
    </main>
  );
}

function AdminPage() {
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStock = products.filter((product) => product.stock < 15);
  return <main className="shell page"><p className="eyebrow">Store administration</p><h1>Inventory dashboard</h1><div className="metric-grid"><div><span>Products</span><strong>{products.length}</strong></div><div><span>Total stock</span><strong>{totalStock}</strong></div><div><span>Low stock SKUs</span><strong>{lowStock.length}</strong></div><div><span>Categories</span><strong>{categories.length}</strong></div></div><section className="admin-table"><div className="section-head"><h2>Catalog health</h2><span>Clothing-specific inventory</span></div>{products.map((product) => <div className="admin-row" key={product.id}><span>{product.name}</span><span>{product.category}</span><span>{product.sizes.join(", ")}</span><strong className={product.stock < 15 ? "low" : ""}>{product.stock} in stock</strong></div>)}</section></main>;
}

function Navbar({ cartCount }: { cartCount: number }) {
  return <header className="nav"><div className="shell nav-inner"><Link to="/" className="brand"><span>R</span><div><strong>Ramesh</strong><small>Clothing Store</small></div></Link><nav><Link to="/category/men">Men</Link><Link to="/category/women">Women</Link><Link to="/category/sarees">Sarees</Link><Link to="/category/ethnic-wear">Ethnic</Link></nav><div className="nav-actions"><Link to="/admin">Admin</Link><Link to="/cart" className="bag">Bag <b>{cartCount}</b></Link></div></div></header>;
}

export default function App() {
  const [cart, setCartState] = useState<CartLine[]>(() => {
    try { return JSON.parse(localStorage.getItem("ramesh-cart") ?? "[]") as CartLine[]; } catch { return []; }
  });

  const setCart = (next: CartLine[]) => setCartState(next);
  useEffect(() => { localStorage.setItem("ramesh-cart", JSON.stringify(cart)); }, [cart]);

  const addToCart = (productId: string, size: string) => {
    setCartState((current) => {
      const match = current.findIndex((line) => line.productId === productId && line.size === size);
      if (match < 0) return [...current, { productId, size, quantity: 1 }];
      return current.map((line, index) => index === match ? { ...line, quantity: line.quantity + 1 } : line);
    });
  };

  const cartCount = useMemo(() => cart.reduce((sum, line) => sum + line.quantity, 0), [cart]);

  return <><Navbar cartCount={cartCount}/><AnimatePresence mode="wait"><Routes><Route path="/" element={<Home/>}/><Route path="/category/:slug" element={<CategoryPage/>}/><Route path="/product/:id" element={<ProductPage addToCart={addToCart}/>}/><Route path="/cart" element={<CartPage cart={cart} setCart={setCart}/>}/><Route path="/admin" element={<AdminPage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></AnimatePresence><footer className="footer"><div className="shell"><strong>Ramesh Clothing Store</strong><span>Fashion storefront foundation · India</span></div></footer></>;
}
