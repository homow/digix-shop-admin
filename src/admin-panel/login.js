import {serverDisconnect} from "@/auth/api-utils.js";
import {handleGetUserInfo, handleLoginUser, handleLogoutUser} from "@/auth/auth.js";
import {redirectAdminPage} from "@/index.js";
import {themeControl} from "@/ui/utils-ui.js";

const renderLoginAdmin = () => {
    const app = document.getElementById('app');
    app.innerHTML = `<section id="login" class="flex items-center justify-center h-screen">
<header class="py-4 fixed top-0 left-0 right-0">
        <div class="container flex justify-between items-center">
            <ul class="flex justify-center items-center gap-4">
                <li>
                    <a target="_blank" href="http://localhost:3000/" class="text-custom-subtext hover:text-menu-link-hover transition-all duration-250">صفحه اصلی</a>
                </li>
                <li>
                    <a target="_blank" href="http://localhost:3000/shop/" class="max-md:py-4 max-md:pl-4 text-custom-subtext hover:text-menu-link-hover transition-all duration-250">
                        فروشگاه
                    </a>
                </li>
                <li id="theme" class="cursor-pointer bg-primary-button-bg text-primary-button-text rounded-full p-1">
                    <svg data-icon-theme="dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
                    </svg>
                    <svg data-icon-theme="light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 hidden">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
                    </svg>
                </li>
            </ul>
        </div>
    </header>
<section id="login" class="max-w-200 w-full flex items-center justify-center px-4 bg-custom-bg text-custom-text">
        <div class="w-full max-w-md space-y-8">
            <div class="text-center">
                <h2>فرم لاگین</h2>
                <p data-success-login-message class="my-8 text-green-800 dark:text-green-600"></p>
            </div>

            <form id="login-form" class="space-y-10 bg-content-bg shadow-lg rounded-xl p-6 border border-custom-border">
                <div>
                    <label for="username" dir="ltr" class="block text-sm font-medium text-custom-text">نام کاربری</label>
                    <input placeholder="نام کاربری" dir="ltr" id="username" name="username" type="text" required class="mt-1 block w-full rounded-md border-custom-border bg-white border border-b-gray-400 p-2 text-black shadow-sm focus:border-primary focus:ring-primary"/>
                </div>

                <div class="relative">
                    <label for="password" dir="ltr" class="block text-sm font-medium text-custom-text">رمز عبور</label>
                    <input placeholder="رمز عبور" dir="ltr" id="password" name="password" type="password" required class="mt-1 block w-full rounded-md border-custom-border text-black bg-white border border-b-gray-400 p-2 pr-10 shadow-sm focus:border-primary focus:ring-primary"/>
                    <button type="button" class="absolute pt-5 inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-primary focus:outline-none" data-toggle-password data-target="password" aria-label="نمایش رمز عبور" aria-pressed="false" title="نمایش رمز عبور">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-eye>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-eye-off>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.634 6.634A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.379 5.255"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18"/>
                        </svg>
                    </button>
                </div>

                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" id="remember-me" class="peer hidden"/>
                    <span class="w-5 h-5 flex items-center justify-center border border-custom-text rounded bg-white peer-checked:bg-green-700 peer-checked:border-custom-text transition-all duration-200">
                        <svg class="w-4 h-4 text-white peer-checked:block hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                    </span>
                    <span class="text-sm text-custom-subtext">منو بخاطر بسپار</span>
                </label>

                <div>
                    <p data-error-message-login data-error-message class="text-red-700 dark:text-red-500"></p>
                </div>

                <button type="submit" class="primary-btn w-full">
                    ورود
                </button>
            </form>
        </div>
    </section>
</section>`

    bindEvent()
}

const bindEvent = () => {
    const root = document.documentElement
    const themeWrapper = document.getElementById("theme")
    const loginForm = document.getElementById('login-form')

    // theme control
    themeControl.setTheme(themeWrapper, root);
    themeWrapper.addEventListener("click", themeControl.changeThemeHandler.bind(null, root));

    // show and hide password
    showHidePassword()


    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const loginData = getLoginData()
        loginData.textError.innerHTML = "";

        (async () => {

            try {
                await handleLoginUser(loginData.username, loginData.password, loginData.rememberMe);

                const userInfo = await handleGetUserInfo();

                if (userInfo?.is_superuser) {
                    loginData.textError.innerHTML = ""
                    loginData.successMessage.textContent = "لاگین موفقیت آمیز بود"
                    redirectAdminPage("panel")
                } else {
                    await handleLogoutUser()
                    loginData.textError.textContent = "شما اجازه دسترسی به این بخش را ندارید."
                }
            } catch (e) {
                catchLoginError(e, loginData.textError)
            }
        })();
    });
}

const showHidePassword = () => {
    document.querySelectorAll("[data-toggle-password]").forEach((btn) => {
        const targetId = btn.getAttribute("data-target");
        const input = document.getElementById(targetId);
        if (!input) return;

        const eye = btn.querySelector("[data-eye]");
        const eyeOff = btn.querySelector("[data-eye-off]");

        btn.addEventListener("mousedown", (e) => e.preventDefault());

        btn.addEventListener("click", () => {
            const show = input.type === "password";
            input.type = show ? "text" : "password";

            if (eye && eyeOff) {
                eye.classList.toggle("hidden", show);
                eyeOff.classList.toggle("hidden", !show);
            }

            btn.setAttribute("aria-pressed", show ? "true" : "false");
            const label = show ? "مخفی کردن رمز عبور" : "نمایش رمز عبور";
            btn.setAttribute("aria-label", label);
            btn.setAttribute("title", label);
        });
    });
}

function getLoginData() {
    const textError = document.querySelector("[data-error-message-login]")
    const successMessage = document.querySelector("[data-success-login-message]")
    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value.trim()
    const rememberMe = document.getElementById('remember-me').checked
    return {username, password, rememberMe, textError, successMessage};
}

function catchLoginError(e, elem) {
    if (e instanceof TypeError || e.status === 500) {
        serverDisconnect(elem)
    } else {
        try {
            const errObj = JSON.parse(e.message);
            if (errObj.detail) {
                elem.textContent = errObj.detail;
            } else {
                elem.textContent = "رمز یا نام کاربری اشتباه است.";
            }
        } catch {
            elem.textContent = e.message;
        }
    }
}

export {renderLoginAdmin}