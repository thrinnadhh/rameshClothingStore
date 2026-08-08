import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import {
  categories,
  categoryFromSlug,
  categoryMeta,
  Product,
  products,
  salePrice,
} from "./data/catalog";

type CartLine = { productId: string; quantity: number; size: string };

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <div className="product-badges">
          {product.tags.slice(0, 2).map((tag) => (
            <span className={`tag tag-${tag}`} key={tag}>
              {tag.replace("-", " ")}
            </span>
          ))}
        </div>
        {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
      </Link>
      <div className="product-body">
        <p className="eyebrow">{product.category}</p>
        <Link to={`/product/${product.id}`} className="product-title">
          {product.name}
        </Link>
        <p className="product-meta">{product.material} · {product.fit}</p>
        <div className="price-row">
          <strong>{money.format(salePrice(product))}</strong>
          {product.discount > 0 && (
            <>
              <s>{money.format(product.price)}</s>
              <span>{product.discount}% off</span>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProductRail({
  kicker,
  title,
  description,
  items,
  action,
  tone = "default",
}: {
  kicker?: string;
  title: string;
  description?: string;
  items: Product[];
  action?: JSX.Element;
  tone?: "default" | "cream" | "dark";
}) {
  return (
    <section className={`merch-section tone-${tone}`}>
      <div className="section-head">
        <div>
          {kicker && <p className="section-kicker">{kicker}</p>}
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action ?? <span>{items.length} styles</span>}
      </div>
      <div className="product-grid">
        {items.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}

function OfferStrip() {
  const offers = [
    { badge: "WELCOME10", title: "New customer offer", copy: "Get 10% off on your first order.", note: "Min. order ₹999" },
    { badge: "FESTIVE20", title: "Festive edit", copy: "Extra 20% on selected ethnic wear.", note: "Limited period" },
    { badge: "SAREE15", title: "Saree special", copy: "Save 15% on occasion-ready drapes.", note: "Selected styles" },
  ];

  return (
    <section className="shell offer-section">
      <div className="section-head">
        <div>
          <p className="section-kicker">Savings worth styling</p>
          <h2>Discount offers</h2>
        </div>
        <span>Use at checkout</span>
      </div>
      <div className="offer-grid">
        {offers.map((offer) => (
          <article key={offer.badge} className="offer-card">
            <span className="offer-code">{offer.badge}</span>
            <h3>{offer.title}</h3>
            <p>{offer.copy}</p>
            <small>{offer.note}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function EditorialBanner() {
  return (
    <section className="shell editorial">
      <div className="editorial-image">
        <img
          src="https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?auto=format&fit=crop&w=1600&q=85"
          alt="Premium Indian fashion collection"
          loading="lazy"
        />
      </div>
      <div className="editorial-copy">
        <p className="section-kicker">The premium edit</p>
        <h2>Made for celebrations. Styled for now.</h2>
        <p>
          Elevated sarees, refined kurta sets and statement occasion pieces chosen for
          weddings, festivals and memorable evenings.
        </p>
        <div className="hero-actions">
          <Link to="/category/sarees" className="primary-btn">Shop sarees</Link>
          <Link to="/category/ethnic-wear" className="text-link">Explore ethnic wear →</Link>
        </div>
      </div>
    </section>
  );
}

function QuickSale({ items }: { items: Product[] }) {
  return (
    <section className="quick-sale">
      <div className="shell quick-sale-inner">
        <div className="quick-sale-copy">
          <p className="section-kicker light">48-hour edit</p>
          <h2>Quick Sale</h2>
          <p>Fast-moving styles with sharper prices. Selected pieces up to 45% off.</p>
          <div className="sale-stats">
            <div><strong>48</strong><span>Hours only</span></div>
            <div><strong>45%</strong><span>Max savings</span></div>
            <div><strong>24h</strong><span>Dispatch ready</span></div>
          </div>
        </div>
        <div className="quick-sale-products">
          {items.slice(0, 3).map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="sale-tile">
              <img src={product.image} alt={product.name} loading="lazy" />
              <div>
                <span>{product.discount}% OFF</span>
                <strong>{product.name}</strong>
                <small>{money.format(salePrice(product))}</small>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  const arrivals = products.filter((p) => p.tags.includes("new")).slice(0, 8);
  const premium = products.filter((p) => p.tags.includes("premium")).slice(0, 8);
  const topPicks = products.filter((p) => p.tags.includes("top-pick") || p.tags.includes("bestseller")).slice(0, 8);
  const trending = products.filter((p) => p.tags.includes("trending")).slice(0, 8);
  const quickSale = products.filter((p) => p.tags.includes("quick-sale")).slice(0, 8);
  const under1999 = products.filter((p) => salePrice(p) < 2000).slice(0, 8);

  return (
    <main className="home-page">
      <section className="announcement">
        <div className="shell announcement-inner">
          <span>Free delivery above ₹1,499</span>
          <b>NEW SEASON · NEW STYLES</b>
          <span>Easy 7-day size exchange</span>
        </div>
      </section>

      <section className="hero shell">
        <div className="hero-copy">
          <span className="hero-kicker">Ramesh Clothing Store · Autumn / Festive 2026</span>
          <h1>Style that feels <em>distinctly yours.</em></h1>
          <p>
            Discover everyday essentials, premium occasion wear and modern Indian classics
            curated for men, women and kids.
          </p>
          <div className="hero-actions">
            <a href="#shop" className="primary-btn inverse">Shop new collection</a>
            <Link to="/category/sarees" className="secondary-btn">Explore sarees</Link>
          </div>
          <div className="hero-proof">
            <div><strong>500+</strong><span>Curated styles</span></div>
            <div><strong>4.8/5</strong><span>Customer rating</span></div>
            <div><strong>7 Days</strong><span>Easy exchange</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <img
            className="hero-main-image"
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
            alt="Ramesh Clothing premium fashion"
          />
          <div className="hero-float-card">
            <small>Editor's pick</small>
            <strong>Festive Elegance</strong>
            <span>From ₹2,499</span>
          </div>
        </div>
      </section>

      <section id="shop" className="shell category-section">
        <div className="section-head">
          <div>
            <p className="section-kicker">Find your wardrobe</p>
            <h2>Shop by category</h2>
          </div>
          <span>Designed for every occasion</span>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category} to={`/category/${categoryMeta[category].slug}`} className={`category-card category-${categoryMeta[category].slug}`}>
              <div className="category-icon">{categoryMeta[category].icon}</div>
              <strong>{category}</strong>
              <small>{categoryMeta[category].copy}</small>
              <span className="category-arrow">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="shell">
        <ProductRail
          kicker="Just dropped"
          title="New arrivals"
          description="Fresh silhouettes and seasonal pieces added this week."
          items={arrivals}
          action={<a href="#shop" className="text-link">View collection →</a>}
        />
      </div>

      <EditorialBanner />

      <div className="shell">
        <ProductRail
          kicker="Elevated craftsmanship"
          title="Premium designs"
          description="Rich fabrics, refined finishing and statement-making details."
          items={premium}
          tone="cream"
        />
      </div>

      <OfferStrip />

      <div className="shell">
        <ProductRail
          kicker="Chosen for you"
          title="Top picks"
          description="The pieces customers are returning for."
          items={topPicks}
        />
      </div>

      <QuickSale items={quickSale} />

      <div className="shell">
        <ProductRail
          kicker="Most wanted"
          title="Trending now"
          description="Styles getting the most attention right now."
          items={trending}
        />

        <section className="occasion-grid">
          <Link to="/category/men" className="occasion-card occasion-men">
            <span>Men's edit</span><h3>Work to weekend</h3><p>Clean shirts, polos, denim and layers.</p><b>Shop men →</b>
          </Link>
          <Link to="/category/women" className="occasion-card occasion-women">
            <span>Women's edit</span><h3>Modern everyday</h3><p>Dresses, co-ords and effortless separates.</p><b>Shop women →</b>
          </Link>
          <Link to="/category/ethnic-wear" className="occasion-card occasion-ethnic">
            <span>Celebration edit</span><h3>Festive favourites</h3><p>Kurtas, sets and elegant Indian dressing.</p><b>Shop ethnic →</b>
          </Link>
        </section>

        <ProductRail
          kicker="Smart shopping"
          title="Style under ₹1,999"
          description="High-impact wardrobe additions without stretching the budget."
          items={under1999}
        />
      </div>

      <section className="brand-story">
        <div className="shell brand-story-inner">
          <div>
            <p className="section-kicker light">Ramesh Clothing Store</p>
            <h2>Designed around real wardrobes.</h2>
          </div>
          <p>
            We bring together modern silhouettes, Indian occasion wear and practical everyday
            styles in one curated store—so discovering your next look feels simpler.
          </p>
          <Link to="/category/women" className="secondary-btn">Discover the collection</Link>
        </div>
      </section>

      <section className="benefits shell">
        <div><span className="benefit-icon">↺</span><strong>Easy exchanges</strong><span>Size exchanges within 7 days</span></div>
        <div><span className="benefit-icon">◆</span><strong>Quality checked</strong><span>Curated fabrics and finishing</span></div>
        <div><span className="benefit-icon">₹</span><strong>Secure payments</strong><span>Ready for Razorpay checkout</span></div>
        <div><span className="benefit-icon">✦</span><strong>New styles weekly</strong><span>Fresh drops across categories</span></div>
      </section>

      <section className="newsletter shell">
        <div>
          <p className="section-kicker">Private access</p>
          <h2>Be first to know what's next.</h2>
          <p>New drops, limited offers and premium collection launches.</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="newsletter-form">
          <input type="email" placeholder="Enter your email address" aria-label="Email address" />
          <button className="primary-btn" type="submit">Join the list</button>
        </form>
      </section>
    </main>
  );
}

function CategoryPage() {
  const { slug } = useParams();
  const category = categoryFromSlug(slug);
  if (!category) return <Navigate to="/" replace />;
  const items = products.filter((product) => product.category === category);
  return (
    <main className="shell page">
      <p className="eyebrow">Collection</p>
      <h1>{category}</h1>
      <p className="page-copy">{categoryMeta[category].copy}</p>
      <ProductRail title={`${category} collection`} items={items} />
    </main>
  );
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
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <div className="detail-price">
          <strong>{money.format(salePrice(product))}</strong>
          {product.discount > 0 && <><s>{money.format(product.price)}</s><span>{product.discount}% off</span></>}
        </div>
        <p>{product.description}</p>
        <dl className="details">
          <div><dt>Material</dt><dd>{product.material}</dd></div>
          <div><dt>Fit</dt><dd>{product.fit}</dd></div>
          <div><dt>Stock</dt><dd>{product.stock} available</dd></div>
        </dl>
        <div><p className="label">Select size</p><div className="size-row">{product.sizes.map((item) => <button type="button" key={item} onClick={() => setSize(item)} className={size === item ? "size active" : "size"}>{item}</button>)}</div></div>
        <div><p className="label">Available colors</p><p className="muted">{product.colors.join(" · ")}</p></div>
        <button type="button" onClick={handleAdd} className="primary-btn wide">Add to bag</button>
        {notice && <p className="success">{notice}</p>}
      </div>
    </main>
  );
}

function CartPage({ cart, setCart }: { cart: CartLine[]; setCart: (cart: CartLine[]) => void }) {
  const lines = cart.map((line) => ({ ...line, product: products.find((product) => product.id === line.productId)! })).filter((line) => line.product);
  const total = lines.reduce((sum, line) => sum + salePrice(line.product) * line.quantity, 0);

  const changeQty = (index: number, delta: number) => {
    setCart(cart.map((line, i) => i === index ? { ...line, quantity: Math.max(1, line.quantity + delta) } : line));
  };
  const remove = (index: number) => setCart(cart.filter((_, i) => i !== index));

  return (
    <main className="shell page">
      <p className="eyebrow">Shopping bag</p><h1>Your cart</h1>
      {lines.length === 0 ? (
        <div className="empty"><h2>Your bag is empty</h2><p>Add a few styles to start your order.</p><Link to="/" className="primary-btn">Continue shopping</Link></div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {lines.map((line, index) => (
              <article className="cart-line" key={`${line.productId}-${line.size}-${index}`}>
                <img src={line.product.image} alt={line.product.name}/>
                <div><strong>{line.product.name}</strong><span>Size {line.size}</span><span>{money.format(salePrice(line.product))}</span>
                  <div className="qty"><button type="button" onClick={() => changeQty(index, -1)}>−</button><b>{line.quantity}</b><button type="button" onClick={() => changeQty(index, 1)}>+</button><button type="button" className="remove" onClick={() => remove(index)}>Remove</button></div>
                </div>
              </article>
            ))}
          </div>
          <aside className="summary"><h2>Order summary</h2><p><span>Subtotal</span><strong>{money.format(total)}</strong></p><p><span>Delivery</span><strong>Calculated at checkout</strong></p><hr/><p className="total"><span>Total</span><strong>{money.format(total)}</strong></p><button type="button" className="primary-btn wide">Proceed to checkout</button></aside>
        </div>
      )}
    </main>
  );
}

function AdminPage() {
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStock = products.filter((product) => product.stock < 15);
  return (
    <main className="shell page">
      <p className="eyebrow">Store administration</p><h1>Inventory dashboard</h1>
      <div className="metric-grid"><div><span>Products</span><strong>{products.length}</strong></div><div><span>Total stock</span><strong>{totalStock}</strong></div><div><span>Low stock SKUs</span><strong>{lowStock.length}</strong></div><div><span>Categories</span><strong>{categories.length}</strong></div></div>
      <section className="admin-table"><div className="section-head"><h2>Catalog health</h2><span>Clothing-specific inventory</span></div>{products.map((product) => <div className="admin-row" key={product.id}><span>{product.name}</span><span>{product.category}</span><span>{product.sizes.join(", ")}</span><strong className={product.stock < 15 ? "low" : ""}>{product.stock} in stock</strong></div>)}</section>
    </main>
  );
}

function Navbar({ cartCount }: { cartCount: number }) {
  return (
    <>
      <header className="nav">
        <div className="shell nav-inner">
          <Link to="/" className="brand"><span>R</span><div><strong>Ramesh</strong><small>Clothing Store</small></div></Link>
          <nav className="desktop-nav">
            <Link to="/category/men">Men</Link>
            <Link to="/category/women">Women</Link>
            <Link to="/category/kids">Kids</Link>
            <Link to="/category/sarees">Sarees</Link>
            <Link to="/category/ethnic-wear">Ethnic</Link>
            <Link to="/category/footwear">Footwear</Link>
          </nav>
          <div className="nav-actions"><Link className="admin-link" to="/admin">Admin</Link><Link to="/cart" className="bag">Bag <b>{cartCount}</b></Link></div>
        </div>
      </header>
      <nav className="mobile-dock" aria-label="Mobile navigation">
        <Link to="/"><span>⌂</span><small>Home</small></Link>
        <Link to="/category/men"><span>♙</span><small>Men</small></Link>
        <Link to="/category/women"><span>♕</span><small>Women</small></Link>
        <Link to="/category/sarees"><span>✦</span><small>Sarees</small></Link>
        <Link to="/cart" className="mobile-bag"><span>▣</span><small>Bag</small><b>{cartCount}</b></Link>
      </nav>
    </>
  );
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

  return (
    <>
      <Navbar cartCount={cartCount}/>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/category/:slug" element={<CategoryPage/>}/>
          <Route path="/product/:id" element={<ProductPage addToCart={addToCart}/>}/>
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart}/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </AnimatePresence>
      <footer className="footer">
        <div className="shell footer-grid">
          <div><Link to="/" className="brand footer-brand"><span>R</span><div><strong>Ramesh</strong><small>Clothing Store</small></div></Link><p>Modern fashion, Indian occasion wear and everyday essentials.</p></div>
          <div><strong>Shop</strong><Link to="/category/men">Men</Link><Link to="/category/women">Women</Link><Link to="/category/sarees">Sarees</Link></div>
          <div><strong>Discover</strong><Link to="/category/ethnic-wear">Ethnic wear</Link><Link to="/category/kids">Kids</Link><Link to="/category/footwear">Footwear</Link></div>
          <div><strong>Customer care</strong><span>Easy exchanges</span><span>Secure payments</span><span>India-wide delivery ready</span></div>
        </div>
        <div className="shell footer-bottom"><span>© 2026 Ramesh Clothing Store</span><span>Made for modern Indian wardrobes.</span></div>
      </footer>
    </>
  );
}
