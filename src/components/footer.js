export function Footer() {
    const footer = document.createElement("footer");
    footer.className = "bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm transition-colors";

    footer.innerHTML = `
        <div class="max-w-6xl mx-auto px-6 sm:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="text-center md:text-left">
                <p class="font-bold text-gray-900 dark:text-white">Livraria EntreLinhas</p>
                <p class="mt-1">Rua das Letras, 420 — Centro, São Paulo - SP</p>
            </div>

            <div class="flex items-center gap-5">
                <a href="#/shop" data-link class="hover:text-blue-600 dark:hover:text-blue-400 transition">Catálogo</a>
                <a href="#/contact" data-link class="hover:text-blue-600 dark:hover:text-blue-400 transition">Contato</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600 dark:hover:text-blue-400 transition">Instagram</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="hover:text-blue-600 dark:hover:text-blue-400 transition">GitHub</a>
            </div>

            <p class="text-xs text-center md:text-right">
                &copy; 2026 Livraria EntreLinhas. Todos os direitos reservados.
            </p>
        </div>
    `;

    return footer;
}
