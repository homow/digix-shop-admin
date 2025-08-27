const themeControl = {
    changeThemeHandler: (root, event) => {
        const theme = JSON.parse(localStorage.getItem("theme")) === "dark" ? "light" : "dark";
        localStorage.setItem("theme", JSON.stringify(theme));
        themeControl.setTheme(event.currentTarget, root);
    },
    setTheme: (wrapper, root) => {
        const theme = JSON.parse(localStorage.getItem("theme")) === "dark" ? "dark" : "light";
        root.classList.toggle("dark", theme === "dark");
        wrapper.querySelector("[data-icon-theme=dark]").classList.toggle("hidden", theme === "light");
        wrapper.querySelector("[data-icon-theme=light]").classList.toggle("hidden", theme === "dark");
    },
};

export {themeControl};