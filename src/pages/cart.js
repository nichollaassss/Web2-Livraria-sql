import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import {
    getCart,
    getCartTotal,
    addToCart,
    clearCart,
    removeFromCart,
    deleteFromCart
} from "../services/cart-service.js";
import { addToHistory } from "../services/history-service.js";

export function Cart() {
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

    const cart = getCart();
    const total = getCartTotal();

    content.innerHTML = `
        <div class="max-w-5xl mx-auto">

            <h1 class="
                text-4xl
                font-bold
                mb-10
                text-gray-900
                dark:text-white
            ">
                Meu carrinho
            </h1>

            <div
                id="cart-items"
                class="space-y-4"
            >
            </div>

            ${cart.length > 0 ? `
                <div class="
                    mt-8
                    bg-white
                    dark:bg-gray-800
                    rounded-xl
                    shadow-sm
                    p-6
                ">
                    <div class="
                        flex
                        justify-between
                        items-center
                    ">
                        <span class="text-lg font-semibold">
                            Total da compra
                        </span>

                        <strong class="text-2xl">
                            R$ ${total.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2
                            })}
                        </strong>
                    </div>

                    <button
                        type="button"
                        class="
                            w-full
                            mt-6
                            py-3
                            rounded-lg
                            bg-blue-600
                            text-white
                            font-semibold
                            hover:bg-blue-700
                            transition
                        "
                        data-buy
                    >
                        Finalizar Compra
                    </button>
                </div>
            ` : ""}

        </div>
    `;

    page.appendChild(content);
    page.appendChild(Footer());

    const itemsContainer = content.querySelector("#cart-items");

    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="
                bg-white
                dark:bg-gray-800
                rounded-xl
                p-10
                text-center
            ">
                <p class="text-gray-500 dark:text-gray-400">
                    Seu carrinho está vazio.
                </p>

                <a
                    href="#/shop"
                    data-link
                    class="
                        inline-block
                        mt-4
                        text-blue-600
                        dark:text-blue-400
                        font-semibold
                    "
                >
                    Ir para o Catálogo
                </a>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const element = document.createElement("div");

            element.className = `
                bg-white
                dark:bg-gray-800
                rounded-xl
                shadow-sm
                p-5
                flex
                flex-col
                sm:flex-row
                items-start
                sm:items-center
                justify-between
                gap-4
            `;

            element.innerHTML = `
                <div class="flex items-center gap-5">

                    <img
                        src="${item.image}"
                        alt="Capa do livro ${item.name}"
                        class="
                            w-20
                            h-24
                            object-contain
                        "
                    />

                    <div>
                        <h2 class="font-bold text-lg text-gray-900 dark:text-white">
                            ${item.name}
                        </h2>

                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Preço unitário: R$ ${Number(item.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>

                        <div class="mt-2 flex items-center gap-2">
                            <button
                                type="button"
                                data-dec
                                aria-label="Diminuir quantidade"
                                class="w-7 h-7 rounded border border-gray-300 dark:border-gray-600 font-bold hover:bg-gray-100 dark:hover:bg-gray-700"
                            >-</button>
                            <span class="px-2 font-semibold">${item.quantity}</span>
                            <button
                                type="button"
                                data-inc
                                aria-label="Aumentar quantidade"
                                class="w-7 h-7 rounded border border-gray-300 dark:border-gray-600 font-bold hover:bg-gray-100 dark:hover:bg-gray-700"
                            >+</button>
                        </div>
                    </div>

                </div>

                <div class="flex min-w-28 flex-col items-end gap-2 self-end sm:self-center">
                    <span class="text-xs text-gray-500 dark:text-gray-400">Subtotal</span>
                    <strong>
                        R$ ${(item.price * item.quantity)
                            .toLocaleString("pt-BR", {
                                minimumFractionDigits: 2
                            })}
                    </strong>

                    <button
                        type="button"
                        class="
                            bg-red-500
                            text-white
                            text-sm
                            py-1.5
                            px-3.5
                            rounded-lg
                            hover:bg-red-600
                        "
                        data-remove
                    >
                        Remover
                    </button>
                </div>
            `;

            itemsContainer.appendChild(element);

            element.querySelector("[data-inc]").addEventListener("click", () => {
                addToCart(item);
                page.replaceWith(Cart());
            });

            element.querySelector("[data-dec]").addEventListener("click", () => {
                removeFromCart(item);
                page.replaceWith(Cart());
            });

            element.querySelector("[data-remove]").addEventListener("click", () => {
                deleteFromCart(item.id);
                page.replaceWith(Cart());
            });
        });

        const buttonBuy = page.querySelector("[data-buy]");
        buttonBuy.addEventListener("click", () => {
            addToHistory(cart);
            buttonBuy.textContent = "Compra realizada!";

            setTimeout(() => {
                clearCart();
                page.replaceWith(Cart());
            }, 800);
        });
    }

    return page;
}
