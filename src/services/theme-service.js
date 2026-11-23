const THEME_KEY = "theme";

export function getTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
}

export function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    const theme = isDark ? "dark" : "light";
    localStorage.setItem(THEME_KEY, theme);
    return theme;
}
