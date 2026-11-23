import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";

export function Contact() {
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
        <div class="max-w-4xl mx-auto space-y-8">

            <section class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                    Sobre a Livraria EntreLinhas
                </h1>
                <p class="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                    A Livraria EntreLinhas nasceu com o objetivo de conectar leitores a obras marcantes de fantasia, romance, ficção científica e tecnologia, oferecendo uma experiência de navegação simples, rápida e acessível em qualquer dispositivo.
                </p>
            </section>

            <section class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Fale Conosco
                </h2>

                <form class="space-y-4" data-contact-form novalidate>
                    <div>
                        <label for="contact-name" class="block text-sm font-semibold mb-1">Nome</label>
                        <input
                            id="contact-name"
                            name="name"
                            type="text"
                            required
                            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label for="contact-email" class="block text-sm font-semibold mb-1">E-mail</label>
                        <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label for="contact-subject" class="block text-sm font-semibold mb-1">Assunto</label>
                        <select
                            id="contact-subject"
                            name="subject"
                            required
                            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:border-blue-500"
                        >
                            <option value="">Selecione um assunto</option>
                            <option value="Dúvida sobre livro">Dúvida sobre livro</option>
                            <option value="Pedido e entrega">Pedido e entrega</option>
                            <option value="Sugestão de título">Sugestão de título</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>

                    <div>
                        <label for="contact-message" class="block text-sm font-semibold mb-1">Mensagem</label>
                        <textarea
                            id="contact-message"
                            name="message"
                            rows="4"
                            required
                            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:border-blue-500"
                        ></textarea>
                    </div>

                    <p data-feedback class="hidden rounded-lg px-4 py-3 text-sm font-medium"></p>

                    <button
                        type="submit"
                        class="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Enviar Mensagem
                    </button>
                </form>
            </section>

        </div>
    `;

    page.appendChild(content);
    page.appendChild(Footer());

    const form = content.querySelector("[data-contact-form]");
    const feedback = content.querySelector("[data-feedback]");

    form.addEventListener("submit", e => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const subject = String(formData.get("subject") || "").trim();
        const message = String(formData.get("message") || "").trim();
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (name.length < 2 || !emailValid || !subject || message.length < 5) {
            feedback.textContent = "Por favor, preencha nome, e-mail válido, assunto e uma mensagem com pelo menos 5 caracteres.";
            feedback.className = "rounded-lg px-4 py-3 text-sm font-medium bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
            return;
        }

        feedback.textContent = `Obrigado, ${name}! Sua mensagem sobre "${subject}" foi enviada com sucesso.`;
        feedback.className = "rounded-lg px-4 py-3 text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
        form.reset();
    });

    return page;
}
