import {handleCreateCategory, handleCreateTag, getAllCategories, getAllTags, handleCreateNewProduct, handleAddImageToProduct, handlerEditProduct} from "@/auth/auth.js";
import {serverDisconnect, tokenControl} from "@/auth/api-utils.js";
import {formatToPrice} from "@/utils.js"
import {themeControl} from "@/ui/utils-ui.js";

const renderAdminPanel = () => {
    const app = document.getElementById("app")
    const getAccessToken = tokenControl.accessToken

    if (getAccessToken) {
        app.innerHTML = `<section id="admin-panel">
<header class="border-b border-gray-500 py-4">
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
<section id="panel">
<div class="container">
  <div class="text-center mb-4">
    <h1 class="mx-auto">
        پنل مدیریت
    </h1>
    <h2 id="session"></h2>
  </div>
  <div class="flex flex-col items-center gap-4">
<!-- add category -->
  <form id="create-category-form" class="w-full max-w-200 bg-card-bg p-4 rounded shadow">
    <h2 class="text-lg font-bold my-4 text-center">افزودن دسته‌بندی جدید</h2>
    <h3 data-success-message class="my-4 text-green-800 dark:text-green-600 mx-auto text-center"></h3>

    <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
      <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">نام دسته‌بندی</span>
      <input type="text" id="category-name" class="w-8/10 input-field border border-sub-text rounded p-2 placeholder:text-sm" placeholder="مثلاً کتاب" required />
    </label>
    <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
      <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">شناسه کوتاه (slug)</span>
      <input type="text" id="category-slug" class="w-8/10 input-field border border-sub-text rounded p-2 placeholder:text-sm" placeholder="مثلاً book" required />
    </label>
    <p data-error-message class="text-red-700 dark:text-red-500"></p>
    <button type="submit" class="primary-btn w-full">اضافه کردن دسته‌بندی</button>
  </form>
  
<!-- add tags -->
  <form id="create-tag-form" class="w-full max-w-200 bg-card-bg p-4 rounded shadow mt-8">
  <h2 class="text-lg font-bold mb-4 text-center">افزودن برچسب جدید</h2>
  <h3 data-success-message class="my-4 text-green-800 dark:text-green-600 mx-auto text-center"></h3>

  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">نام برچسب</span>
    <input type="text" id="tag-name" class="w-8/10 input-field border border-sub-text rounded p-2 placeholder:text-sm" placeholder="مثلاً تخیلی" required />
  </label>
  <p data-error-message class="text-red-700 dark:text-red-500"></p>
  <button type="submit" class="primary-btn w-full">اضافه کردن برچسب</button>
</form>

<!-- create new product -->
<form id="create-product-form" class="w-full max-w-200 bg-card-bg p-4 rounded shadow mt-8">
  <h2 class="text-lg font-bold mb-4 text-center">افزودن محصول جدید</h2>
  <h3 data-success-message class="my-4 text-green-800 dark:text-green-600 mx-auto text-center"></h3>

  <!-- product name -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">نام محصول</span>
    <input type="text" id="product-name" class="w-8/10 input-field border border-sub-text rounded p-2 placeholder:text-sm" placeholder="مثلاً کتاب افسانه‌ای" required />
  </label>
 <!-- product slug -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">slug</span>
    <input type="text" id="product-slug" class="w-8/10 input-field border border-sub-text rounded p-2 placeholder:text-sm" placeholder="مثلاً fantasy-book" required />
  </label>

  <!-- description -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">توضیحات</span>
    <textarea id="product-description" class="w-8/10 input-field border border-sub-text rounded p-2 placeholder:text-sm" placeholder="توضیح کوتاه درباره محصول" required></textarea>
  </label>

  <!-- price -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">قیمت (تومان)</span>
    <input type="text" id="product-price" class="w-8/10 input-field border border-sub-text rounded p-2 placeholder:text-sm" placeholder="مثلاً 12,0000" required min="0" dir="rtl"/>
  </label>
  
  <!-- discount_percent -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">تخفیف (درصد)</span>
    <input type="number" id="discount-percent" class="w-8/10 input-field border border-sub-text rounded p-2 placeholder:text-sm"  placeholder="مثلاً 20" dir="rtl"/>
  </label>

  <!-- inventory -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">موجودی</span>
    <input type="number" id="product-inventory" class="w-8/10 input-field border border-sub-text rounded p-2 placeholder:text-sm" placeholder="مثلاً 10" required min="0" />
  </label>

  <!-- category -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">دسته‌بندی</span>
    <select id="product-category" class="w-8/10 input-field border border-sub-text rounded p-2" required>
      <option class="bg-custom-bg text-custom-text" value="">انتخاب دسته‌بندی</option>
    </select>
  </label>

  <!-- tags -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">برچسب‌ها</span>
    <select id="product-tags" multiple class="w-8/10 input-field border border-sub-text rounded p-2"></select>
  </label>

  <p data-error-message class="my-8 text-center font-bold text-red-700 dark:text-red-500"></p>
  <button type="submit" class="primary-btn w-full">اضافه کردن محصول</button>
</form>

<!-- add image to product -->
<form id="add-image-form" class="w-full max-w-200 bg-card-bg p-4 rounded shadow mt-4">
  <h3 class="text-md font-bold mb-4 text-center">اضافه کردن تصویر</h3>
  <h3 data-success-message class="my-4 text-green-800 dark:text-green-600 mx-auto text-center"></h3>
  
  <h5 class="mt-8">لیست تصاویر</h5>
  <ul id="images-list" class="mt-4 mb-8 space-y-1 divide-y-2 border-2 p-2 rounded-sm"></ul>

  <!-- src -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">مسیر تصویر</span>
    <input dir="ltr" type="text" id="image-src" class="w-8/10 input-field border border-sub-text rounded p-2 placeholder:text-sm" placeholder="مثلاً E:\\Users\\Pictures\\img.jpg" required />
  </label>

  <!-- alt_text -->
  <label class="mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">توضیح تصویر</span>
    <input dir="ltr" type="text" id="image-alt" class="w-8/10 input-field border border-sub-text rounded p-2 placeholder:text-sm" placeholder="مثلاً تصویر کالاف دیوتی 6" />
  </label>

  <p data-error-message class="my-4 text-center font-bold text-red-700 dark:text-red-500"></p>
  <button type="submit" class="primary-btn w-full">اضافه کردن به لیست</button>

<label class="mt-8 mb-4 flex flex-col sm:flex-row items-center justify-between">
    <span class="text-sub-text max-sm:w-8/10 max-sm:text-right inline-block mb-2">آیدی محصول</span>
    <input dir="ltr" type="number" id="product-id-image" class="w-8/10 input-field border border-sub-text rounded p-2 placeholder:text-sm" min="1" placeholder="مثال: 1"/>
</label>
  <!-- دکمه ارسال همه تصاویر -->
  <button type="button" id="submit-images" class="secondary-btn w-full mt-4">ارسال همه تصاویر</button>
</form>

</div>
</div>
</section>
</section>`
        bindEvent()
    } else {
        app.innerHTML = `<div class="flex justify-center items-center flex-col gap-8">
    <h2 class="mx-auto text-center">هنوز وارد نشدید، لطفا ابتدا وارد شوید</h2>
    <a data-spa-account-links href="/account/login" class="primary-btn">ورود</a>
</div>`
    }
}

const bindEvent = () => {
    const root = document.documentElement
    const themeWrapper = document.getElementById("theme")
    const createFormCategory = document.getElementById("create-category-form");
    const createTagForm = document.getElementById("create-tag-form");
    const priceInput = document.getElementById("product-price");
    const createProductForm = document.getElementById("create-product-form");
    const addImageForm = document.getElementById("add-image-form");
    const imagesListEl = document.getElementById("images-list");
    const submitImagesBtn = document.getElementById("submit-images");

    // theme control
    themeControl.setTheme(themeWrapper, root);
    themeWrapper.addEventListener("click", themeControl.changeThemeHandler.bind(null, root));

    // add category
    createFormCategory.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("category-name").value.trim();
        const slug = document.getElementById("category-slug").value.trim();
        const successMessage = e.currentTarget.querySelector("[data-success-message]")
        const textError = e.currentTarget.querySelector("[data-error-message]")

        if (!name || !slug) {
            textError.textContent = "لطفاً هر دو فیلد را پر کنید.";
            return;
        }

        try {
            await handleCreateCategory(name, slug);
            successMessage.textContent = "دسته بندی با موفقیت اضافه شد"
            textError.textContent = "";
            createFormCategory.reset();
        } catch (err) {
            successMessage.textContent = ""
            if (err instanceof TypeError) {
                serverDisconnect(textError)
            } else {
                textError.textContent = err.message;
            }
        }
    });

    // add tags
    createTagForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("tag-name").value.trim().replace(" ", "_");
        const successMessage = e.currentTarget.querySelector("[data-success-message]");
        const textError = e.currentTarget.querySelector("[data-error-message]");

        if (!name) {
            textError.textContent = "لطفاً هر دو فیلد را پر کنید.";
            return;
        }

        try {
            const res = await handleCreateTag(name);
            successMessage.textContent = "برچسب با موفقیت اضافه شد";
            textError.textContent = "";
            createTagForm.reset();
        } catch (err) {
            successMessage.textContent = "";
            if (err instanceof TypeError) {
                serverDisconnect(textError);
            } else {
                textError.textContent = err.message;
            }
        }
    });

    // get all categories
    (async () => {
        const selectProductCategory = document.getElementById("product-category");

        try {
            const res = await getAllCategories();
            addAllCategoriesToDOM(res)
        } catch (e) {
            console.log(e)
            if (e instanceof TypeError) {
                console.log("server not response: ", e)
            } else {
                console.error(e);
            }
        }

        function addAllCategoriesToDOM(categories) {
            const fragment = document.createDocumentFragment();
            categories.forEach(category => {
                const option = document.createElement("option");
                option.className = "bg-custom-bg text-custom-text"
                option.value = category.id;
                option.dataset.categorySlug = category.slug;
                option.textContent = category.name;
                fragment.appendChild(option);
            })
            selectProductCategory.appendChild(fragment);
        }
    })();

    // get all tags
    (async () => {
        const selectProductTags = document.getElementById("product-tags");

        try {
            const res = await getAllTags();
            addAllTagsToDOM(res)
        } catch (e) {
            if (e instanceof TypeError) {
                console.log("server not response: ", e);
            } else {
                console.error(e);
            }
        }

        function addAllTagsToDOM(tags) {
            const fragment = document.createDocumentFragment();
            tags.forEach(tag => {
                const option = document.createElement("option");
                option.className = "text-custom-text"
                option.value = tag.id;
                option.textContent = tag.name;
                fragment.appendChild(option);
            })
            selectProductTags.appendChild(fragment);
        }
    })()

    // when typing price, add comma between number in debounce function
    function debounce(callback, delay = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => callback(...args), delay);
        };
    }

    // format number
    const handlePriceInput = debounce(() => {
        const value = priceInput.value.trim();
        priceInput.value = formatToPrice(value);
    }, 400);
    priceInput.addEventListener("input", handlePriceInput);

    // create new product
    createProductForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("product-name").value.trim();
        const slug = document.getElementById("product-slug").value.trim();
        const description = document.getElementById("product-description").value.trim();
        const priceRaw = document.getElementById("product-price").value.replace(/\D/g, ""); // just get numbers
        let discount_percent = document.getElementById("discount-percent").value.trim();
        const stock = Number(document.getElementById("product-inventory").value);
        const categoryField = document.getElementById("product-category").selectedOptions[0]
        const category = Number(categoryField.value);
        const tagsSelect = document.getElementById("product-tags").selectedOptions;
        const selectedTags = Array.from(tagsSelect).map(opt => Number(opt.value));
        const successMessage = createProductForm.querySelector("[data-success-message]");
        const errorMessage = createProductForm.querySelector("[data-error-message]");

        if (!name || !slug || !description || !priceRaw || !stock || !category) {
            errorMessage.textContent = "لطفاً همه فیلدهای ضروری را پر کنید.";
            successMessage.textContent = "";
            return;
        }

        if (discount_percent > 100) {
            errorMessage.textContent = "درصد تخفیف باید بین ۰ تا ۱۰۰ باشد.";
            return;
        } else if (discount_percent < 0) {
            discount_percent = 0
        }

        const productData = {
            name,
            slug,
            description,
            price: Number(priceRaw),
            discount_percent,
            stock,
            category,
            tags: selectedTags,
        };

        try {
            await handleCreateNewProduct(productData);
            successMessage.textContent = "محصول با موفقیت اضافه شد!";
            errorMessage.textContent = "";
            createProductForm.reset();
        } catch (err) {
            successMessage.textContent = "";
            if (err instanceof TypeError) {
                serverDisconnect(errorMessage);
            } else {
                console.error("❌ خطا:", err);
                errorMessage.textContent = err.message;
            }
        }
    })

    // add image to product
    const productImagesArray = [];
    const src = document.getElementById("image-src");
    const alt = document.getElementById("image-alt");
    const successMessage = addImageForm.querySelector("[data-success-message]");
    const errorMessage = addImageForm.querySelector("[data-error-message]");
    const productID = document.getElementById("product-id-image");

    addImageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const srcValue = src.value.trim();
        const altValue = alt.value.trim();

        if (!srcValue) {
            errorMessage.textContent = "لطفا تصویر را وارد کنید";
            return;
        }

        // create object image
        const imageObj = {
            image_url: srcValue,
            alt_text: altValue
        };

        // add to array
        productImagesArray.push(imageObj);

        // show list of image
        const li = document.createElement("li");
        li.textContent = `src: ${srcValue}, alt: ${altValue}`;
        imagesListEl.appendChild(li);
        src.value = ""
        alt.value = ""
    });

    // send image list
    submitImagesBtn.addEventListener("click", async () => {
        const id = productID.value.trim();

        if (productImagesArray.length === 0) {
            errorMessage.textContent = "لیست تصاویر خالی است";
            return;
        } else if (id < 0 || !id) {
            console.log(id)
            errorMessage.textContent = "آیدی صحیح وارد کنید"
            return;
        }

        try {
            for (const img of productImagesArray) {
                await handleAddImageToProduct(id, img)
            }

            successMessage.textContent = "تصاویر با موفقیت اضافه شد";
            productImagesArray.length = 0;
            imagesListEl.innerHTML = "";
            addImageForm.reset();
        } catch (err) {
            console.error(err);
            errorMessage.textContent = "خطا در ارسال تصویر";
        }
    });
}

export {renderAdminPanel}
