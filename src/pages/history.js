import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import {
    getHistory,
    getHistoryTotal
} from "../services/history-service.js";

export function History() {
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

    const history = getHistory();
    const total = getHistoryTotal();

    content.innerHTML = `
        <div class="max-w-5xl mx-auto">

            <h1 class="
                text-4xl
                font-bold
                mb-10
                text-gray-900
                dark:text-white
            ">
                Meu histórico de compras
            </h1>

            <div
                id="history-items"
                class="space-y-4"
            >
            </div>

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

                    <span class="text-lg">
                        Total
                    </span>

                    <strong class="text-2xl">
                        R$ ${total.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2
                        })}
                    </strong>

                </div>

            </div>

        </div>
    `;

    page.appendChild(content);
    page.appendChild(Footer());

    const itemsContainer = content.querySelector("#history-items");

    if (history.length === 0) {
        itemsContainer.innerHTML = `
            <div class="
                bg-white
                dark:bg-gray-800
                rounded-xl
                p-10
                text-center
            ">
                <p class="text-gray-500 dark:text-gray-400">
                    Você ainda não fez nenhuma compra.
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
        history.forEach(item => {
            const element = document.createElement("div");

            element.className = `
                bg-white
                dark:bg-gray-800
                rounded-xl
                shadow-sm
                p-5
                flex
                items-center
                justify-between
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

                        <p class="text-gray-500 dark:text-gray-400 text-sm">
                            Quantidade: ${item.quantity}
                            ${item.timestamp ? ` &bull; ${new Date(item.timestamp).toLocaleDateString("pt-BR")}` : ""}
                        </p>
                    </div>

                </div>

                <strong>
                    R$ ${(item.price * item.quantity)
                        .toLocaleString("pt-BR", {
                            minimumFractionDigits: 2
                        })}
                </strong>
            `;

            itemsContainer.appendChild(element);
        });
    }

    return page;
}
