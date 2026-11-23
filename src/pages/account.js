import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";

export function Account() {
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

    content.innerHTML = `
        <div class="max-w-3xl mx-auto">

            <h1 class="
                text-4xl
                font-bold
                mb-8
                text-gray-900
                dark:text-white
            ">
                Conta
            </h1>

            <div class="
                bg-white
                dark:bg-gray-800
                rounded-xl
                shadow-sm
                overflow-hidden
            ">

                <ul>

                    <li>
                        <a
                            href="#/history"
                            data-link
                            class="
                                block
                                w-full
                                text-left
                                px-6
                                py-5
                                hover:bg-gray-50
                                dark:hover:bg-gray-700
                                transition
                                border-b
                                border-gray-200
                                dark:border-gray-700
                            "
                        >
                            Meus Pedidos
                        </a>
                    </li>

                    <li>
                        <a
                            href="#/contact"
                            data-link
                            class="
                                block
                                w-full
                                text-left
                                px-6
                                py-5
                                hover:bg-gray-50
                                dark:hover:bg-gray-700
                                transition
                            "
                        >
                            Atendimento &amp; Contato
                        </a>
                    </li>

                </ul>

            </div>

        </div>
    `;

    page.appendChild(content);
    page.appendChild(Footer());

    return page;
}
