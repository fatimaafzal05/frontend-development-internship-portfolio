import { Badge } from "./Badge";
import type { Product } from "../types";

type ProductCardProps = { product: Product };

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function ProductCard({ product }: ProductCardProps) {
  const { title, brand = "Independent maker", thumbnail, price, rating, category } = product;

  return (
    <article className="product-card">
      <div className="product-image"><img src={thumbnail} alt={title} loading="lazy" /><Badge>{category.replaceAll("-", " ")}</Badge></div>
      <div className="product-info"><p>{brand}</p><h3>{title}</h3><div><strong>{currency.format(price)}</strong><span aria-label={`Rated ${rating} out of 5`}>★ {rating.toFixed(1)}</span></div></div>
    </article>
  );
}
