import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { ProductCard } from "../components/product-card.js";
import { AddProductModal } from "../modals/add-product-modal.js";
import {
    addProduct,
    getProducts
} from "../services/product-service.js";

export async function Shop() {
    const page = document.createElement("div");
    page.className = "min-h-screen flex flex-col";

    page.innerHTML = `
        <p class="
            bg-blue-500
            dark:bg-blue-700
            flex
            items-center
            justify-center
            text-sm
            text-white
            py-2
            px-4
            text-center
        ">
            Os melhores livros reunidos em um só lugar &bull; Livraria EntreLinhas
        </p>
    `;

    page.appendChild(Navbar());

    const content = document.createElement("main");

    content.className = `
        flex-1
        bg-gray-100
        dark:bg-gray-900
        py-12
        px-6
        sm:px-10
    `;

    const queryStr = window.location.hash.split("?")[1] || "";
    const params = new URLSearchParams(queryStr);
    let selectedCategory = params.get("category") || "Todos";
    let searchTerm = "";

    content.innerHTML = `
        <div class="max-w-6xl mx-auto">

            <div class="
                mb-8
                flex
                flex-col
                gap-5
                sm:flex-row
                sm:items-end
                sm:justify-between
            ">
                <div>
                    <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
                        Catálogo de Livros
                    </h1>

                    <p class="mt-2 text-gray-500 dark:text-gray-400">
                        Busque por título ou autor, filtre por categoria ou adicione novos livros.
                    </p>
                </div>

                <button
                    type="button"
                    class="
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        bg-blue-600
                        px-5
                        py-3
                        font-semibold
                        text-white
                        shadow-sm
                        transition
                        hover:bg-blue-700
                        sm:w-auto
                    "
                    data-add-product
                >
                    <span class="text-xl leading-none">+</span>
                    Adicionar livro
                </button>
            </div>

            <!-- Busca e Filtro por Categoria -->
            <div class="mb-8 flex flex-col md:flex-row gap-4 justify-between">
                <div class="w-full md:w-80">
                    <label for="search-books" class="sr-only">Buscar livro por título ou autor</label>
                    <input
                        id="search-books"
                        type="search"
                        data-search-input
                        placeholder="Buscar por título ou autor..."
                        class="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div class="flex flex-wrap gap-2" data-category-filters>
                    ${["Todos", "Fantasia", "Romance", "Tecnologia", "Ficção Científica"].map(cat => `
                        <button
                            type="button"
                            data-category="${cat}"
                            class="px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                                selectedCategory === cat
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }"
                        >
                            ${cat}
                        </button>
                    `).join("")}
                </div>
            </div>

            <div
                id="products"
                class="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    gap-6
                "
            >
                <p>Carregando livros...</p>
            </div>

        </div>
    `;

    page.appendChild(content);
    page.appendChild(Footer());

    const productsContainer = content.querySelector("#products");
    const searchInput = content.querySelector("[data-search-input]");
    const categoryButtons = content.querySelectorAll("[data-category]");

    AddProductModal(
        page,
        productsContainer,
        addProduct,
        getProducts
    );

    try {
        const products = await getProducts();

        function renderBooks() {
            const filtered = products.filter(book => {
                const matchCategory = selectedCategory === "Todos" || book.category === selectedCategory;

                const q = searchTerm.toLowerCase();
                const matchSearch = !q ||
                    book.name.toLowerCase().includes(q) ||
                    (book.author || "").toLowerCase().includes(q);

                return matchCategory && matchSearch;
            });

            productsContainer.innerHTML = "";

            if (filtered.length === 0) {
                productsContainer.innerHTML = `
                    <p class="col-span-full text-gray-500 dark:text-gray-400">
                        Nenhum livro encontrado para os filtros selecionados.
                    </p>
                `;
                return;
            }

            filtered.forEach(product => {
                productsContainer.appendChild(ProductCard(product));
            });
        }

        searchInput.addEventListener("input", e => {
            searchTerm = e.target.value.trim();
            renderBooks();
        });

        categoryButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                selectedCategory = btn.dataset.category;
                categoryButtons.forEach(b => {
                    const active = b.dataset.category === selectedCategory;
                    b.className = `px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                        active
                            ? "bg-blue-600 text-white"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`;
                });
                renderBooks();
            });
        });

        renderBooks();

    } catch (error) {
        console.error(error);

        productsContainer.innerHTML = `
            <p class="text-red-500">
                Erro ao carregar os livros.
            </p>
        `;
    }

    return page;
}
