const API_URL = "/api/livros";

export async function getProducts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Não foi possível carregar os livros do banco de dados MySQL.");
    }

    return await response.json();
}

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/${Number(id)}`);

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error("Erro ao buscar os detalhes do livro no banco de dados.");
    }

    return await response.json();
}

export async function addProduct(product) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao cadastrar o livro no MySQL.");
    }

    return await response.json();
}
