import { Home } from "./pages/home.js";
import { Shop } from "./pages/shop.js";
import { BookDetails } from "./pages/book-details.js";
import { Cart } from "./pages/cart.js";
import { History } from "./pages/history.js";
import { Contact } from "./pages/contact.js";
import { Account } from "./pages/account.js";

const routes = {
    "/": Home,
    "/shop": Shop,
    "/book": BookDetails,
    "/cart": Cart,
    "/history": History,
    "/contact": Contact,
    "/account": Account
};

async function router() {
    const content = document.querySelector(".content");
    const rawHash = window.location.hash.replace(/^#/, "") || "/";
    const path = rawHash.split("?")[0] || "/";

    const page = routes[path] || routes["/"];

    content.innerHTML = "";

    try {
        const pageElement = await page();

        content.appendChild(pageElement);

    } catch (error) {
        console.error(error);

        content.innerHTML = `
            <div class="p-10">
                <h1 class="text-2xl font-bold">
                    Erro ao carregar a página
                </h1>

                <p class="mt-2 text-gray-600 dark:text-gray-400">
                    ${error.message}
                </p>
            </div>
        `;
    }
}

document.addEventListener("click", event => {
    const link = event.target.closest("[data-link]");

    if (!link) {
        return;
    }

    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
        event.preventDefault();
        if (window.location.hash === href) {
            router();
        } else {
            window.location.hash = href;
        }
    }
});

window.addEventListener("hashchange", router);

router();
