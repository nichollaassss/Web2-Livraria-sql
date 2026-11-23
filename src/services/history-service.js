const HISTORY_KEY = "history";

export function getHistory() {
    const history = localStorage.getItem(HISTORY_KEY);

    return history ? JSON.parse(history) : [];
}

export function addToHistory(cart) {
    const history = getHistory();

    history.push(
        ...cart.map(item => ({
            ...item,
            timestamp: new Date().toISOString()
        }))
    );

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistoryTotal() {
    const history = getHistory();

    return history.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}
