import { getCartCount } from "../services/cart-service.js";
import { getTheme, toggleTheme } from "../services/theme-service.js";

export function Navbar() {
    const nav = document.createElement("header");
    nav.className = "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors";

    const currentHash = (window.location.hash.replace(/^#/, "").split("?")[0]) || "/";
    const isDark = getTheme() === "dark";
    const cartCount = getCartCount();

    function linkClass(route) {
        return `
            transition-colors
            hover:text-blue-600
            dark:hover:text-blue-400
            ${currentHash === route ? "text-blue-600 dark:text-blue-400 font-bold" : "text-gray-700 dark:text-gray-200"}
        `;
    }

    nav.innerHTML = `
        <div class="
            max-w-6xl
            mx-auto
            px-6
            sm:px-10
            h-20
            flex
            items-center
            justify-between
        ">

            <a
                href="#/"
                data-link
                class="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white"
            >
                <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white text-sm font-extrabold">
                    EL
                </span>
                <span>Entre<span class="text-blue-600 dark:text-blue-400">Linhas</span></span>
            </a>

            <!-- Menu Desktop -->
            <nav aria-label="Menu principal" class="hidden md:flex items-center gap-7 text-sm font-medium">
                <a href="#/" class="${linkClass("/")}" data-link>Início</a>
                <a href="#/shop" class="${linkClass("/shop")}" data-link>Catálogo</a>
                <a href="#/history" class="${linkClass("/history")}" data-link>Histórico</a>
                <a href="#/cart" class="${linkClass("/cart")}" data-link>
                    Carrinho (<span data-cart-count>${cartCount}</span>)
                </a>
                <a href="#/contact" class="${linkClass("/contact")}" data-link>Sobre &amp; Contato</a>
            </nav>

            <div class="flex items-center gap-3">
                <button
                    type="button"
                    data-theme-toggle
                    aria-pressed="${isDark}"
                    title="Alternar tema claro/escuro"
                    class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                    ${isDark ? "☀️ Claro" : "🌙 Escuro"}
                </button>

                <a
                    href="#/account"
                    class="${linkClass("/account")}"
                    data-link
                    title="Conta"
                >
                    <img
                        src="./src/icons/account_circle.svg"
                        alt="Ícone de conta do usuário"
                        class="w-6 h-6 dark:invert"
                    />
                </a>

                <!-- Botão Hambúrguer Mobile -->
                <button
                    type="button"
                    data-menu-toggle
                    aria-expanded="false"
                    aria-controls="mobile-menu"
                    aria-label="Abrir menu de navegação"
                    class="md:hidden p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    ☰
                </button>
            </div>

        </div>

        <!-- Menu Mobile -->
        <nav
            id="mobile-menu"
            aria-label="Menu mobile"
            class="hidden md:hidden border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-3 text-sm font-medium bg-white dark:bg-gray-800"
        >
            <a href="#/" class="block ${linkClass("/")}" data-link>Início</a>
            <a href="#/shop" class="block ${linkClass("/shop")}" data-link>Catálogo</a>
            <a href="#/history" class="block ${linkClass("/history")}" data-link>Histórico</a>
            <a href="#/cart" class="block ${linkClass("/cart")}" data-link>Carrinho (<span data-cart-count-mobile>${cartCount}</span>)</a>
            <a href="#/contact" class="block ${linkClass("/contact")}" data-link>Sobre &amp; Contato</a>
        </nav>
    `;

    const themeButton = nav.querySelector("[data-theme-toggle]");
    themeButton.addEventListener("click", () => {
        const next = toggleTheme();
        const darkNow = next === "dark";
        themeButton.setAttribute("aria-pressed", String(darkNow));
        themeButton.textContent = darkNow ? "☀️ Claro" : "🌙 Escuro";
    });

    const menuButton = nav.querySelector("[data-menu-toggle]");
    const mobileMenu = nav.querySelector("#mobile-menu");
    menuButton.addEventListener("click", () => {
        const isHidden = mobileMenu.classList.toggle("hidden");
        menuButton.setAttribute("aria-expanded", String(!isHidden));
    });

    return nav;
}
