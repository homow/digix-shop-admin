
🛠️ Admin Panel — مدیریت فروشگاه Shop

پنل مدیریت پروژه‌ی فروشگاهی [Shop](https://github.com/DanialKK/shop) برای کنترل کامل محصولات، دسته‌بندی‌ها، سفارش‌ها و کاربران. این پنل به‌صورت مستقل توسعه داده شده و از API ریپوی اصلی استفاده می‌کند.

---

## 📦 ساختار پروژه
````
digix-shop-admin/  
├── src/  
│   ├── auth/              # مدیریت توکن و وضعیت ورود  
│   ├── admin-panel/       # صفحات و کامپوننت‌های پنل  
│   └── ui/                # استایل های پروژه  
├── index.html             # نقطه ورود  
├── vite.config.js         # تنظیمات Vite و پراکسی 
├── README.md            
---
````
## 🚀 راه‌اندازی سریع

🔹 کلون پروژه:

```bash
git clone https://github.com/homow/digix-shop-admin.git
```

🔹 نصب وابستگی‌ها:

```bash
cd digix-shop-admin
npm install
```

🔹 اجرای پروژه:

```bash
npm run dev
```

📡 اجرا روی: `http://localhost:3008`  
🔗 درخواست‌های `/api` به صورت پراکسی به `http://127.0.0.1:8000` هدایت می‌شوند (بک‌اند Shop)

---

## ⚙️ تکنولوژی‌های استفاده‌شده

- **JavaScript (Vanilla)**
- **Vite** برای توسعه سریع و بیلد بهینه
- **Tailwind CSS v4** با پیکربندی بدون فایل
- **JWT Authorization** برای ارتباط امن با بک‌اند
- **Fetch API** برای ارتباط با API ریپوی اصلی
- **ساختار ماژولار** با تفکیک کامل صفحات و توابع

---

## 🧠 قابلیت‌ها

- ورود و خروج با JWT
- مشاهده و مدیریت محصولات
- افزودن تصویر به محصولات
- مدیریت دسته‌بندی‌ها و تگ‌ها
- مشاهده سفارش‌ها و آیتم‌های سفارش
- امتیازدهی و بررسی محصولات

---

## 📌 نکات مهم توسعه

- برنچ اصلی: `main`
- برنچ فعال توسعه: `development`
- برای فیچرهای جدید، از `feature/...` استفاده کنید
- قبل از push، حتماً `development` را sync کنید
- بعد از اتمام فیچر، PR بزنید به `development`
- انتشار نهایی فقط از `main` انجام می‌شود

---

## 👨‍💻 توسعه‌دهنده‌ها

- GitHub: [@homow](https://github.com/homow)
- GitHub: [@DanialKK](https://github.com/DanialKK)

Made with ❤️ by Homow & DanialKK — Clean, Modular, and Admin-Friendly