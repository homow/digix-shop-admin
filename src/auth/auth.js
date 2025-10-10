import {rememberControl, tokenControl} from "@/auth/api-utils.js";
import {checkLoginStatus} from "@/auth/loginStatus.js";

// config api url
const baseApiURL = "/api";

// handle error
async function handleApiResponse(res) {
    let data;
    try {
        data = await res.json();
    } catch {
        throw new Error("پاسخ نامعتبر از سرور دریافت شد.");
    }
    if (!res.ok) {
        const message = data?.detail || "خطای ناشناخته از سرور.";
        throw new Error(message);
    }
    return data;
}

// login
async function loginUser(username, password, rememberMe) {
    const res = await fetch(`${baseApiURL}/auth/login/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
    })
    const data = await handleApiResponse(res)
    await tokenControl.setAccessToken(rememberMe, data?.access)
    return data
}

// handle login
async function handleLoginUser(username, password, rememberMe) {
    return await loginUser(username, password, rememberMe)
}

// refresh tokens
async function newRefreshToken() {
    const res = await fetch(`${baseApiURL}/auth/token/refresh/`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
    })
    const data = await handleApiResponse(res);
    await tokenControl.setAccessToken(rememberControl.rememberFlag === "true", data?.access)
    return data
}

// handle refresh token
async function handleNewRefreshToken() {
    return await newRefreshToken()
}

// logout user
async function logOutUser() {
    const accessToken = tokenControl.accessToken
    const res = await fetch(`${baseApiURL}/auth/logout/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
    const data = await handleApiResponse(res);
    tokenControl.removeAccessToken()
    return data
}

// handle log out user
async function handleLogoutUser() {
    const accessIsValid = await checkLoginStatus()
    if (accessIsValid) {
        return await logOutUser()
    } else {
        throw new Error(JSON.stringify(accessIsValid))
    }
}

// get user info
async function getUserInfo() {
    const getAccessToken = tokenControl.accessToken;
    const res = await fetch(`${baseApiURL}/auth/user/`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${getAccessToken}`,
            "Content-Type": "application/json"
        }
    })
    return await handleApiResponse(res)
}

// handle get user info
async function handleGetUserInfo() {
    const accessIsValid = await checkLoginStatus()
    if (accessIsValid) {
        return await getUserInfo()
    } else {
        throw new Error(JSON.stringify(accessIsValid))
    }
}

// create category
async function createCategory(name, slug) {
    const getAccessToken = tokenControl.accessToken;
    const res = await fetch(`${baseApiURL}/categories/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getAccessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, slug})
    })
    return await handleApiResponse(res)
}

// handle create category
async function handleCreateCategory(name, slug) {
    const accessIsValid = await checkLoginStatus()

    if (accessIsValid) {
        return await createCategory(name, slug);
    } else {
        throw new Error(JSON.stringify(accessIsValid))
    }
}

// create tag
async function createTag(name, slug) {
    const getAccessToken = tokenControl.accessToken;
    const res = await fetch(`${baseApiURL}/tags/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${getAccessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, slug})
    });
    return await handleApiResponse(res);
}

// handle create tag
async function handleCreateTag(name) {
    const accessIsValid = await checkLoginStatus()
    if (accessIsValid) {
        return await createTag(name);
    } else {
        throw new Error(JSON.stringify(accessIsValid))
    }
}

// create new product
async function createNewProduct(productData) {
    const gotAccessToken = tokenControl.accessToken;
    const res = await fetch(`${baseApiURL}/products/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${gotAccessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    })
    return await handleApiResponse(res)
}

// handle create new product
async function handleCreateNewProduct(productData) {
    const accessIsValid = await checkLoginStatus()
    if (accessIsValid) {
        return await createNewProduct(productData);
    } else {
        throw new Error(JSON.stringify(accessIsValid))
    }
}

async function addImageToProduct(id, image_url, alt_text) {
    const getAccessToken = tokenControl.accessToken;
    const formData = new FormData();
    formData.append('image_url', image_url);
    formData.append('alt_text', alt_text);

    const res = await fetch(`${baseApiURL}/products/${id}/add_image/`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${getAccessToken}`},
        body: formData
    })
    return await handleApiResponse(res)
}

async function handleAddImageToProduct(id, objectImg) {
    const accessIsValid = await checkLoginStatus()
    if (accessIsValid) {
        return await addImageToProduct(id, objectImg.image_url, objectImg.alt_text);
    } else {
        throw new Error(JSON.stringify(accessIsValid))
    }
}

// get all category
async function getAllCategories() {
    const res = await fetch(`${baseApiURL}/categories/`);
    return await handleApiResponse(res);
}

// get all tags
async function getAllTags() {
    const res = await fetch(`${baseApiURL}/tags/`)
    return await handleApiResponse(res);
}

// get all product
async function getAllProducts() {
    const res = await fetch(`${baseApiURL}/products/`)
    return await handleApiResponse(res);
}

async function editProduct(id) {
    const getAccessToken = tokenControl.accessToken;
    console.log(getAccessToken);
    
    const res = await fetch(`${baseApiURL}/products/${id}/`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${getAccessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Call of Duty Black Ops 6"
        }
    )})

    console.log(res);

    return await handleApiResponse(res)
}

async function handlerEditProduct (id) {
    const accessIsValid = await checkLoginStatus()

    if (accessIsValid) {
        return await editProduct(id)
    } else {
        throw new Error(JSON.stringify(accessIsValid))
    }
}

export {
    handleLoginUser,
    handleGetUserInfo,
    handleNewRefreshToken,
    handleCreateCategory,
    handleLogoutUser,
    handleCreateTag,
    handleCreateNewProduct,
    handleAddImageToProduct,
    getAllTags,
    getAllProducts,
    getAllCategories,
    handlerEditProduct
}
