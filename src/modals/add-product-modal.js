import { ProductCard } from "../components/product-card.js";

export function AddProductModal(page, productsContainer, addProduct, getProducts) {
    const modal = document.createElement("div");

    modal.innerHTML = `
        <div
            class="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 p-4"
            data-product-modal
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-product-title"
        >
            <div class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white dark:bg-gray-800 p-6 shadow-2xl">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <h2 id="add-product-title" class="text-2xl font-bold text-gray-900 dark:text-white">
                            Adicionar livro
                        </h2>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Preencha os dados para cadastrar um novo livro no catálogo.
                        </p>
                    </div>

                    <button
                        type="button"
                        class="text-2xl leading-none text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        data-close-modal
                        aria-label="Fechar"
                    >
                        &times;
                    </button>
                </div>

                <form class="mt-6 space-y-4" data-product-form>
                    <div>
                        <label for="product-name" class="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Título do livro
                        </label>
                        <input
                            id="product-name"
                            name="name"
                            type="text"
                            minlength="2"
                            required
                            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 outline-none focus:border-blue-500"
                        >
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label for="product-author" class="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Autor
                            </label>
                            <input
                                id="product-author"
                                name="author"
                                type="text"
                                minlength="2"
                                required
                                class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 outline-none focus:border-blue-500"
                            >
                        </div>

                        <div>
                            <label for="product-category" class="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Categoria
                            </label>
                            <select
                                id="product-category"
                                name="category"
                                class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 outline-none focus:border-blue-500"
                            >
                                <option value="Fantasia">Fantasia</option>
                                <option value="Romance">Romance</option>
                                <option value="Tecnologia">Tecnologia</option>
                                <option value="Ficção Científica">Ficção Científica</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label for="product-description" class="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Sinopse
                        </label>
                        <textarea
                            id="product-description"
                            name="description"
                            rows="3"
                            minlength="5"
                            required
                            class="w-full resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 outline-none focus:border-blue-500"
                        ></textarea>
                    </div>

                    <div>
                        <label for="product-price" class="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Preço (R$)
                        </label>
                        <input
                            id="product-price"
                            name="price"
                            type="number"
                            min="0.01"
                            step="0.01"
                            required
                            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 outline-none focus:border-blue-500"
                        >
                    </div>

                    <div>
                        <label for="product-image" class="mb-1 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                            URL da capa (opcional)
                        </label>
                        <input
                            id="product-image"
                            name="image"
                            type="text"
                            placeholder="./src/assets/books/book-1.svg"
                            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 outline-none focus:border-blue-500"
                        >
                    </div>

                    <p class="hidden rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" data-form-error></p>

                    <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            class="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                            data-close-modal
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition"
                        >
                            Salvar livro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    page.appendChild(modal);

    const modalElement = modal.querySelector("[data-product-modal]");
    const form = modal.querySelector("[data-product-form]");
    const formError = modal.querySelector("[data-form-error]");
    const addProductButton = page.querySelector("[data-add-product]");

    function closeModal() {
        modalElement.classList.add("hidden");
        modalElement.classList.remove("flex");
        form.reset();
        formError.classList.add("hidden");
    }

    addProductButton.addEventListener("click", () => {
        modalElement.classList.remove("hidden");
        modalElement.classList.add("flex");
        form.querySelector("input").focus();
    });

    modal.querySelectorAll("[data-close-modal]")
        .forEach(button => button.addEventListener("click", closeModal));

    modalElement.addEventListener("click", event => {
        if (event.target === modalElement) {
            closeModal();
        }
    });

    form.addEventListener("submit", async event => {
        event.preventDefault();
        formError.classList.add("hidden");

        if (!form.reportValidity()) {
            return;
        }

        const formData = new FormData(form);
        const price = Number(formData.get("price"));

        if (!Number.isFinite(price) || price <= 0) {
            formError.textContent = "Informe um preço válido maior que zero.";
            formError.classList.remove("hidden");
            return;
        }

        const imageInput = String(formData.get("image") || "").trim();
        const product = {
            name: formData.get("name").trim(),
            author: formData.get("author").trim(),
            category: formData.get("category"),
            publisher: "Edição Independente",
            year: 2026,
            pages: 280,
            description: formData.get("description").trim(),
            price,
            image: imageInput || "./src/assets/books/book-1.svg"
        };

        try {
            const savedProduct = await addProduct(product);
            productsContainer.appendChild(ProductCard(savedProduct));
            closeModal();
        } catch (err) {
            formError.textContent = err.message;
            formError.classList.remove("hidden");
        }
    });
}
