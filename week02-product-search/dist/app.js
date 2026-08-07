import { getProducts } from "./api.js";
function getRequiredElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Required page element not found: ${selector}`);
    }
    return element;
}
const elements = {
    searchForm: getRequiredElement("#search-form"),
    searchInput: getRequiredElement("#search-input"),
    categoryFilter: getRequiredElement("#category-filter"),
    sortFilter: getRequiredElement("#sort-filter"),
    results: getRequiredElement("#results"),
    resultCount: getRequiredElement("#result-count"),
    loadingState: getRequiredElement("#loading-state"),
    emptyState: getRequiredElement("#empty-state"),
    errorState: getRequiredElement("#error-state"),
    clearFilters: getRequiredElement("#clear-filters"),
    retryButton: getRequiredElement("#retry-button"),
};
let products = [];
let activeQuery = "";
const formatPrice = (price) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
function showState({ loading = false, empty = false, error = false } = {}) {
    elements.loadingState.classList.toggle("hidden", !loading);
    elements.emptyState.classList.toggle("hidden", !empty);
    elements.errorState.classList.toggle("hidden", !error);
    elements.results.classList.toggle("hidden", loading || empty || error);
}
function formatCategory(category) {
    return category.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
function populateCategories(items) {
    const categories = [...new Set(items.map(({ category }) => category))].sort();
    elements.categoryFilter.innerHTML = '<option value="all">All categories</option>';
    for (const category of categories) {
        const option = new Option(formatCategory(category), category);
        elements.categoryFilter.add(option);
    }
}
function getFilteredProducts() {
    const query = activeQuery.trim().toLowerCase();
    const selectedCategory = elements.categoryFilter.value;
    const sort = elements.sortFilter.value;
    const matchingProducts = products.filter((product) => {
        const { title, brand = "", category, description = "" } = product;
        const searchable = `${title} ${brand} ${category} ${description}`.toLowerCase();
        return (!query || searchable.includes(query)) && (selectedCategory === "all" || category === selectedCategory);
    });
    const sortRules = {
        "price-low": (first, second) => first.price - second.price,
        "price-high": (first, second) => second.price - first.price,
        rating: (first, second) => second.rating - first.rating,
        name: (first, second) => first.title.localeCompare(second.title),
        featured: (first, second) => second.rating - first.rating || first.price - second.price,
    };
    return [...matchingProducts].sort(sortRules[sort]);
}
function productCard(product) {
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
function renderProducts() {
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
function clearFilters() {
    activeQuery = "";
    elements.searchInput.value = "";
    elements.categoryFilter.value = "all";
    elements.sortFilter.value = "featured";
    renderProducts();
}
async function loadProducts() {
    showState({ loading: true });
    elements.resultCount.textContent = "";
    try {
        products = await getProducts();
        populateCategories(products);
        renderProducts();
    }
    catch (error) {
        console.error("Unable to load products", error);
        showState({ error: true });
    }
}
elements.searchForm.addEventListener("submit", (event) => {
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
