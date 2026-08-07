export interface Product {
  brand?: string;
  category: string;
  description?: string;
  price: number;
  rating: number;
  thumbnail: string;
  title: string;
}

interface ProductResponse {
  products: Product[];
}

const API_URL = "https://dummyjson.com/products?limit=100";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Product API request failed: ${response.status}`);
  }

  const { products } = (await response.json()) as ProductResponse;
  return products;
}
