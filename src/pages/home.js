import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { ProductCard } from "../components/product-card.js";
import { getProducts } from "../services/product-service.js";

export async function Home() {
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
    content.className = "flex-1 bg-gray-100 dark:bg-gray-900 py-12 px-6 sm:px-10";

    content.innerHTML = `
        <div class="max-w-6xl mx-auto space-y-12">

            <!-- Banner de Destaque (Livro do Mês) -->
            <section class="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="max-w-xl">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/20 mb-3">
                        Livro do Mês
                    </span>
                    <h1 class="text-3xl sm:text-4xl font-bold">
                        Descubra sua próxima grande leitura na EntreLinhas
                    </h1>
                    <p class="mt-3 text-blue-100">
                        Explore títulos selecionados de Fantasia, Romance, Tecnologia e Ficção Científica com entrega para todo o Brasil.
                    </p>
                    <div class="mt-6 flex flex-wrap gap-3">
                        <a
                            href="#/shop"
                            data-link
                            class="px-5 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50 transition"
                        >
                            Explorar Catálogo
                        </a>
                        <a
                            href="#/book?id=1"
                            data-link
                            class="px-5 py-3 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 transition"
                        >
                            Destaque: O Nome do Vento
                        </a>
                    </div>
                </div>

                <img
                    src="./src/assets/books/book-1.svg"
                    alt="Capa ilustrada do livro em destaque O Nome do Vento"
                    class="w-36 sm:w-44 rounded-lg shadow-lg"
                />
            </section>

            <!-- Atalhos por Categoria -->
            <section>
                <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    Categorias
                </h2>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    ${["Fantasia", "Romance", "Tecnologia", "Ficção Científica"].map(cat => `
                        <a
                            href="#/shop?category=${encodeURIComponent(cat)}"
                            data-link
                            class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition text-center font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            ${cat}
                        </a>
                    `).join("")}
                </div>
            </section>

            <!-- Vitrine com 4 Livros em Destaque -->
            <section>
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                        Destaques da Livraria
                    </h2>
                    <a href="#/shop" data-link class="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Ver todos &rarr;
                    </a>
                </div>

                <div
                    id="featured-products"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <p>Carregando destaques...</p>
                </div>
            </section>

        </div>
    `;

    page.appendChild(content);
    page.appendChild(Footer());

    const featuredContainer = content.querySelector("#featured-products");

    try {
        const products = await getProducts();
        const featured = products.filter(p => p.featured).slice(0, 4);

        featuredContainer.innerHTML = "";
        featured.forEach(book => {
            featuredContainer.appendChild(ProductCard(book));
        });
    } catch (error) {
        featuredContainer.innerHTML = `<p class="text-red-500">Erro ao carregar destaques.</p>`;
    }

    return page;
}
