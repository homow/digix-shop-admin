const showLoader = (loader) => {
    if (loader) loader.style.display = "flex"
}

const hideLoader = (loader) => {
    if (loader) setTimeout(() => loader.style.display = "none", 500)
}

const pushLink = (link) => {
    history.pushState(null, null, link)
}

export {showLoader, hideLoader, pushLink}