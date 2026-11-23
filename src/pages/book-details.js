import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { getProductById } from "../services/product-service.js";
import { addToCart, getCartCount } from "../services/cart-service.js";

export async function BookDetails() {
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

    const queryStr = window.location.hash.split("?")[1] || "";
    const params = new URLSearchParams(queryStr);
    const id = params.get("id");
    const book = await getProductById(id);

    if (!book) {
        content.innerHTML = `
            <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-10 text-center shadow-sm">
                <h1 class="text-2xl font-bold">Livro não encontrado</h1>
                <a href="#/shop" data-link class="inline-block mt-4 text-blue-600 dark:text-blue-400 font-semibold">
                    &larr; Voltar ao catálogo
                </a>
            </div>
        `;
        page.appendChild(content);
        page.appendChild(Footer());
        return page;
    }

    content.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <a href="#/shop" data-link class="inline-block mb-6 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                &larr; Voltar ao catálogo
            </a>

            <article class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
                <div class="md:col-span-5 bg-gray-50 dark:bg-gray-700/50 p-8 flex items-center justify-center">
                    <img
                        src="${book.image}"
                        alt="Capa ampliada do livro ${book.name}"
                        class="max-h-80 w-auto object-contain rounded-lg shadow"
                        onerror="this.onerror=null; this.src='./src/assets/books/book-1.svg';"
                    />
                </div>

                <div class="md:col-span-7 p-8 flex flex-col justify-between">
                    <div>
                        <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/70 dark:text-blue-200">
                            ${book.category || "Geral"}
                        </span>

                        <h1 class="text-3xl font-bold mt-3 text-gray-900 dark:text-white">
                            ${book.name}
                        </h1>

                        <p class="text-gray-600 dark:text-gray-300 font-medium mt-1">
                            Autor: ${book.author || "Autor não informado"}
                        </p>

                        <h2 class="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-5">
                            Sinopse
                        </h2>
                        <p class="text-gray-600 dark:text-gray-300 mt-1.5 leading-relaxed">
                            ${book.description}
                        </p>

                        <div class="mt-6 grid grid-cols-3 gap-3 text-sm border-t border-b border-gray-200 dark:border-gray-700 py-4">
                            <div>
                                <span class="block text-gray-400 text-xs">Editora</span>
                                <strong>${book.publisher || "EntreLinhas"}</strong>
                            </div>
                            <div>
                                <span class="block text-gray-400 text-xs">Ano</span>
                                <strong>${book.year || 2024}</strong>
                            </div>
                            <div>
                                <span class="block text-gray-400 text-xs">Páginas</span>
                                <strong>${book.pages || 300}</strong>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex items-center justify-between gap-4">
                        <strong class="text-2xl font-bold text-gray-900 dark:text-white">
                            R$ ${Number(book.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </strong>

                        <button
                            type="button"
                            data-add-cart
                            class="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Adicionar ao carrinho
                        </button>
                    </div>
                </div>
            </article>
        </div>
    `;

    page.appendChild(content);
    page.appendChild(Footer());

    const addBtn = content.querySelector("[data-add-cart]");
    addBtn.addEventListener("click", () => {
        addToCart(book);
        const count = getCartCount();
        document.querySelectorAll("[data-cart-count], [data-cart-count-mobile]").forEach(el => {
            el.textContent = count;
        });
        addBtn.textContent = "Adicionado!";
        setTimeout(() => {
            addBtn.textContent = "Adicionar ao carrinho";
        }, 1000);
    });

    return page;
}
