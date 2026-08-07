const API_URL = "https://dummyjson.com/products?limit=100";
export async function getProducts() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Product API request failed: ${response.status}`);
    }
    const { products } = (await response.json());
    return products;
}
