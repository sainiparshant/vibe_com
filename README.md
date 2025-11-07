# 🛒 VibeCommerce – Full Stack Cart App

A full-stack e-commerce web app built for the **Vibe Commerce assignment**.
Users can browse products, add items to cart, and complete a mock checkout with persistent data in MongoDB.

---

## 📖 Overview

VibeCommerce simulates a mini e-commerce experience with frontend–backend integration.
It uses **Fake Store API** for products, allows adding/removing items to/from cart, and lets users complete a checkout process that generates a mock receipt.

---

## 🧰 Tech Stack

**Frontend:** React, Axios, React Router, Tailwind CSS
**Backend:** Node.js, Express.js, MongoDB (Mongoose)
**API:** Fake Store API
**Database:** MongoDB Atlas

---

## ⚙️ Setup Instructions

### 🖥 Backend Setup

```bash
cd server
npm install
npm run dev
```

Make sure to configure your `.env` file:

```env
PORT=9000
MONGO_URI=your_mongodb_connection_string
```

Server will start on:
👉 `http://localhost:9000`

---

### 💻 Frontend Setup

```bash
cd client
npm install
npm run dev
```

App will run on:
👉 `http://localhost:5173/`

---

## 🧩 Features

✅ Product listing fetched from Fake Store API
✅ Add to Cart & Remove from Cart functionality
✅ Quantity update buttons (+ / -)
✅ Checkout page with form (Name, Email)
✅ Dynamic total price calculation
✅ Mock order receipt after checkout
✅ Persistent data storage (MongoDB)
✅ Proper error handling
✅ Clean, responsive UI with Tailwind CSS

---

## 🚀 API Endpoints

| Method | Endpoint        | Description                 |
| ------ | --------------- | --------------------------- |
| GET    | `/api/products` | Fetch all products          |
| POST   | `/api/cart`     | Add item to cart            |
| GET    | `/api/cart`     | Retrieve all cart items     |
| DELETE | `/api/cart/:id` | Remove item from cart       |
| POST   | `/api/checkout` | Generate mock order receipt |

---

## 🧠 Bonus Implementations

* Mock user persistence in DB
* Centralized error handling
* Modular backend architecture (controllers, routes, models)
* Integrated Fake Store API for real product data

---

## 🖼️ Screenshots

 <img width="956" height="476" alt="{52551BE2-AAEC-4CF2-8901-F34C8C3E94B5}" src="https://github.com/user-attachments/assets/27b8c26f-ed05-409b-9252-eb0c7b9a3443" />
 <img width="960" height="470" alt="{B14DCA4B-ABE0-4B48-94EE-E2770CAC8792}" src="https://github.com/user-attachments/assets/9e96203a-05a4-4b86-aab3-c238ff6f78d4" />
<img width="960" height="447" alt="{CC3FE38A-0DE9-40F2-B980-021AF521B9AE}" src="https://github.com/user-attachments/assets/7031e7f7-47c2-4324-903b-203d1c50269b" />
<img width="955" height="449" alt="{D5D9C1CD-5204-4235-89FD-845A9A1961B4}" src="https://github.com/user-attachments/assets/ec241fb2-4568-4b5a-aac2-3870046f0934" />


---

## 🎥 Demo Video

🎬 [Watch Demo](https://your-demo-link.com)

---

## 🗂️ Folder Structure

```
vibe-commerce/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│
├── README.md
└── .gitignore
```

---

## 👨‍💻 Author

**Parshant Saini**
---

## 🏁 License

This project is open-source and available under the [MIT License](LICENSE).
