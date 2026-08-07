import { FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ProductCard } from "./components/ProductCard";
import type { Product } from "./types";

type SortOption = "featured" | "price-low" | "price-high" | "rating" | "name";

const API_URL = "https://dummyjson.com/products?limit=100";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const categories = useMemo(() => [...new Set(products.map((product) => product.category))].sort(), [products]);
  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const searchable = `${product.title} ${product.brand ?? ""} ${product.category} ${product.description ?? ""}`.toLowerCase();
      return (!normalizedQuery || searchable.includes(normalizedQuery)) && (category === "all" || product.category === category);
    });
    const sortRules: Record<SortOption, (first: Product, second: Product) => number> = {
      "price-low": (first, second) => first.price - second.price,
      "price-high": (first, second) => second.price - first.price,
      rating: (first, second) => second.rating - first.rating,
      name: (first, second) => first.title.localeCompare(second.title),
      featured: (first, second) => second.rating - first.rating || first.price - second.price,
    };
    return [...filtered].sort(sortRules[sort]);
  }, [category, products, query, sort]);

  async function loadProducts() {
    setLoading(true); setError(false);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Product request failed");
      const data = (await response.json()) as { products: Product[] };
      setProducts(data.products);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadProducts(); }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); }
  function resetFilters() { setQuery(""); setCategory("all"); setSort("featured"); }

  return <>
    <header><div className="container nav"><a className="brand" href="./">findly<span>.</span></a><p>Week 04 · React + TypeScript</p></div></header>
    <main>
      <section className="hero"><div className="container"><p className="eyebrow">Component first</p><h1>Find the <em>good stuff.</em></h1><p className="intro">A live catalogue rebuilt with React state, typed components, and small reusable pieces.</p>
        <form className="search" onSubmit={handleSubmit}><Input id="product-search" label="Search products" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, brands, or categories" /><Button type="submit">Search →</Button></form>
      </div></section>
      <section className="container catalogue"><div className="heading"><div><p className="eyebrow">Live catalogue</p><h2>Products picked for you</h2></div><p>{visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}</p></div>
        <div className="filters"><label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((item) => <option key={item} value={item}>{item.replaceAll("-", " ")}</option>)}</select></label><label>Sort by<select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Highest rated</option><option value="name">Name: A to Z</option></select></label></div>
        {loading && <div className="state"><span className="spinner" /><p>Finding great products...</p></div>}
        {error && <div className="state"><h3>We couldn't load the catalogue</h3><p>Check your connection and try again.</p><Button onClick={loadProducts}>Try again →</Button></div>}
        {!loading && !error && visibleProducts.length === 0 && <div className="state"><h3>No products found</h3><p>Try another search term or category.</p><Button tone="light" onClick={resetFilters}>Clear filters</Button></div>}
        {!loading && !error && visibleProducts.length > 0 && <div className="grid">{visibleProducts.map((product) => <ProductCard key={`${product.category}-${product.title}`} product={product} />)}</div>}
      </section>
    </main>
    <footer><div className="container"><a className="brand" href="./">findly<span>.</span></a><p>Powered by DummyJSON.</p></div></footer>
  </>;
}
