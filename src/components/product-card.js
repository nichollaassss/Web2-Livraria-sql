import { addToCart, getCartCount } from "../services/cart-service.js";

export function ProductCard(product) {
    const card = document.createElement("article");

    card.className = `
        bg-white
        dark:bg-gray-800
        rounded-xl
        shadow-sm
        overflow-hidden
        flex
        flex-col
        transition
        hover:shadow-lg
        fade-in
    `;

    card.innerHTML = `
        <a
            href="#/book?id=${product.id}"
            data-link
            class="
                h-56
                w-full
                bg-gray-50
                dark:bg-gray-700/50
                p-4
                flex
                items-center
                justify-center
                relative
                overflow-hidden
            "
        >
            <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/70 dark:text-blue-200">
                ${product.category || "Geral"}
            </span>

            <img
                src="${product.image}"
                alt="Capa do livro ${product.name}"
                loading="lazy"
                decoding="async"
                class="
                    max-h-full
                    max-w-full
                    w-auto
                    h-auto
                    object-contain
                    transition-transform
                    duration-300
                    hover:scale-105
                "
                onerror="this.onerror=null; this.src='./src/assets/books/book-1.svg';"
            />
        </a>

        <div class="p-5 flex flex-col flex-1">

            <span class="text-xs text-gray-500 dark:text-gray-400">
                ${product.author || "Autor desconhecido"}
            </span>

            <h3 class="text-lg font-bold line-clamp-1 mt-0.5 text-gray-900 dark:text-white">
                <a href="#/book?id=${product.id}" data-link class="hover:text-blue-600 dark:hover:text-blue-400">
                    ${product.name}
                </a>
            </h3>

            <p class="
                text-gray-500
                dark:text-gray-300
                text-sm
                mt-2
                flex-1
                line-clamp-2
            ">
                ${product.description}
            </p>

            <div class="
                flex
                items-center
                justify-between
                gap-2
                mt-5
            ">

                <span class="text-lg font-bold text-gray-900 dark:text-white">
                    R$ ${Number(product.price).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2
                    })}
                </span>

                <div class="flex items-center gap-2">
                    <a
                        href="#/book?id=${product.id}"
                        data-link
                        class="
                            px-3
                            py-2
                            rounded-lg
                            border
                            border-gray-300
                            dark:border-gray-600
                            text-xs
                            font-medium
                            text-gray-700
                            dark:text-gray-200
                            hover:bg-gray-100
                            dark:hover:bg-gray-700
                            transition
                        "
                    >
                        Detalhes
                    </a>

                    <button
                        type="button"
                        class="
                            px-3.5
                            py-2
                            rounded-lg
                            bg-blue-600
                            text-white
                            text-sm
                            font-medium
                            hover:bg-blue-700
                            transition
                        "
                        data-add-cart
                    >
                        Adicionar ao carrinho
                    </button>
                </div>

            </div>

        </div>
    `;

    const button = card.querySelector("[data-add-cart]");
    button.addEventListener("click", () => {
        addToCart(product);

        const count = getCartCount();
        document.querySelectorAll("[data-cart-count], [data-cart-count-mobile]").forEach(el => {
            el.textContent = count;
        });

        button.textContent = "Adicionado!";

        setTimeout(() => {
            button.textContent = "Adicionar ao carrinho";
        }, 1000);
    });

    return card;
}
