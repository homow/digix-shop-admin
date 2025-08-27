import {showLoader, hideLoader, pushLink} from "@/admin-panel/admin-utils.js";
import {renderAdminPanel} from "@/admin-panel/panel.js";
import {renderLoginAdmin} from "@/admin-panel/login.js";
import {tokenControl} from "@/auth/api-utils.js";
import {checkLoginStatus} from "@/auth/loginStatus.js";

// variables
const loader = document.getElementById("loader")

const renderSPA = {
    "/admin/login": {
        render: renderLoginAdmin,
        title: "صفحه ورود ادمین",
    },
    "/admin/panel": {
        render: renderAdminPanel,
        title: "پنل مدیریت ادمین",
    },
    404: {
        render: (() => {
            document.getElementById("app").innerHTML = `<h1 class="mx-auto text-center">آدرس اشتباهه</h1>`
        }),
        title: 404
    }
}

// router
function router() {
    const path = window.location.pathname;
    const rout = renderSPA[path] || renderSPA[404];
    rout.render()
    document.title = rout.title;
}

// redirect
function redirectAdminPage(route) {
    setTimeout(() => {
        pushLink(`/admin/${route}`)
        showLoader(loader)
        router()
        hideLoader(loader)
    }, 1400)
}

(async () => {
    try {
        const isAccess = await checkLoginStatus() || false;

        if (isAccess) {
            pushLink("/admin/panel")
            router()
        } else {
            tokenControl.removeAccessToken()
            pushLink("/admin/login")
            router()
        }
    } catch (e) {
        console.log(e)
    }
})();

window.addEventListener("popstate", router)
export {redirectAdminPage}