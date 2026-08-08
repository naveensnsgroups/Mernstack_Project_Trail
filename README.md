# 🏢 Personal Details Application — MERN Stack

A full-stack **Company Employee Personal Details** management app built with the MERN stack + Tailwind CSS.

## Tech Stack
- **MongoDB Atlas** — Cloud database
- **Express.js** — REST API backend
- **React 18 + Vite** — Frontend
- **Node.js** — Runtime
- **Tailwind CSS** — Styling

## Features
- ✅ Add employee personal details (Create)
- ✅ View all employees in a table (Read)
- ✅ Edit employee details via modal (Update)
- ✅ Delete employee with confirmation (Delete)
- ✅ Department stats dashboard
- ✅ Toast notifications
- ✅ Dark themed premium UI

---

## 🚀 Setup & Run

### 1. MongoDB Atlas Setup
1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Get your connection string
4. Replace in `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/personal_details_db
   ```

### 2. Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## 📁 Project Structure
```
Mernstack_Project_Trail/
├── backend/
│   ├── config/db.js
│   ├── models/Employee.js
│   ├── controllers/employeeController.js
│   ├── routes/employeeRoutes.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PersonalDetailsForm.jsx
│   │   │   ├── EmployeeTable.jsx
│   │   │   ├── EditModal.jsx
│   │   │   └── ConfirmDeleteModal.jsx
│   │   ├── services/api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...
└── README.md
```

## API Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get one employee |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |
