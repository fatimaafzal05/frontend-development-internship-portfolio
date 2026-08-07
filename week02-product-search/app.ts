import { getProducts, type Product } from "./api.js";

type SortOption = "featured" | "price-low" | "price-high" | "rating" | "name";

interface DisplayState {
  empty?: boolean;
  error?: boolean;
  loading?: boolean;
}

function getRequiredElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Required page element not found: ${selector}`);
  }

  return element;
}

const elements = {
  searchForm: getRequiredElement<HTMLFormElement>("#search-form"),
  searchInput: getRequiredElement<HTMLInputElement>("#search-input"),
  categoryFilter: getRequiredElement<HTMLSelectElement>("#category-filter"),
  sortFilter: getRequiredElement<HTMLSelectElement>("#sort-filter"),
  results: getRequiredElement<HTMLDivElement>("#results"),
  resultCount: getRequiredElement<HTMLParagraphElement>("#result-count"),
  loadingState: getRequiredElement<HTMLDivElement>("#loading-state"),
  emptyState: getRequiredElement<HTMLElement>("#empty-state"),
  errorState: getRequiredElement<HTMLElement>("#error-state"),
  clearFilters: getRequiredElement<HTMLButtonElement>("#clear-filters"),
  retryButton: getRequiredElement<HTMLButtonElement>("#retry-button"),
};

let products: Product[] = [];
let activeQuery = "";

const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

function showState({ loading = false, empty = false, error = false }: DisplayState = {}): void {
  elements.loadingState.classList.toggle("hidden", !loading);
  elements.emptyState.classList.toggle("hidden", !empty);
  elements.errorState.classList.toggle("hidden", !error);
  elements.results.classList.toggle("hidden", loading || empty || error);
}

function formatCategory(category: string): string {
  return category.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function populateCategories(items: Product[]): void {
  const categories = [...new Set(items.map(({ category }) => category))].sort();
  elements.categoryFilter.innerHTML = '<option value="all">All categories</option>';

  for (const category of categories) {
    const option = new Option(formatCategory(category), category);
    elements.categoryFilter.add(option);
  }
}

function getFilteredProducts(): Product[] {
  const query = activeQuery.trim().toLowerCase();
  const selectedCategory = elements.categoryFilter.value;
  const sort = elements.sortFilter.value as SortOption;

  const matchingProducts = products.filter((product) => {
    const { title, brand = "", category, description = "" } = product;
    const searchable = `${title} ${brand} ${category} ${description}`.toLowerCase();
    return (!query || searchable.includes(query)) && (selectedCategory === "all" || category === selectedCategory);
  });

  const sortRules: Record<SortOption, (first: Product, second: Product) => number> = {
    "price-low": (first, second) => first.price - second.price,
    "price-high": (first, second) => second.price - first.price,
    rating: (first, second) => second.rating - first.rating,
    name: (first, second) => first.title.localeCompare(second.title),
    featured: (first, second) => second.rating - first.rating || first.price - second.price,
  };

  return [...matchingProducts].sort(sortRules[sort]);
}

function productCard(product: Product): string {
  const { title, brand = "Independent maker", thumbnail, price, rating, category } = product;

  return `
    <article class="product-card">
      <div class="product-image-wrap">
        <img src="${thumbnail}" alt="${title}" loading="lazy" />
        <span class="category-tag">${category.replaceAll("-", " ")}</span>
      </div>
      <div class="product-info">
        <p class="product-brand">${brand}</p>
        <h3>${title}</h3>
        <div class="product-meta">
          <strong>${formatPrice(price)}</strong>
          <span aria-label="Rated ${rating} out of 5">★ ${rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  `;
}

function renderProducts(): void {
  const visibleProducts = getFilteredProducts();
  elements.resultCount.textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? "product" : "products"}`;

  if (visibleProducts.length === 0) {
    elements.results.innerHTML = "";
    showState({ empty: true });
    return;
  }

  elements.results.innerHTML = visibleProducts.map(productCard).join("");
  showState();
}

function clearFilters(): void {
  activeQuery = "";
  elements.searchInput.value = "";
  elements.categoryFilter.value = "all";
  elements.sortFilter.value = "featured";
  renderProducts();
}

async function loadProducts(): Promise<void> {
  showState({ loading: true });
  elements.resultCount.textContent = "";

  try {
    products = await getProducts();
    populateCategories(products);
    renderProducts();
  } catch (error: unknown) {
    console.error("Unable to load products", error);
    showState({ error: true });
  }
}

elements.searchForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  activeQuery = elements.searchInput.value;
  renderProducts();
});

elements.searchInput.addEventListener("input", () => {
  activeQuery = elements.searchInput.value;
  renderProducts();
});

elements.categoryFilter.addEventListener("change", renderProducts);
elements.sortFilter.addEventListener("change", renderProducts);
elements.clearFilters.addEventListener("click", clearFilters);
elements.retryButton.addEventListener("click", loadProducts);

void loadProducts();
