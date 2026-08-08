# 🏢 Personal Details Management Application — MERN Stack

A production-ready **Company Employee Personal Details** management application built with the MERN stack (MongoDB Atlas, Express.js, React, Node.js) and Tailwind CSS.

---

## 🌟 Key Features

- **Multi-Page Navigation**:
  - `/` — Add New Employee Form Page
  - `/records` — Dedicated Employee Records Page with Stat Counters & Actions
- **Full CRUD Operations**:
  - **Create**: Add new employee personal details with client & server-side validation.
  - **Read**: View employee records in a responsive table with department badges & pagination support.
  - **Update**: Edit existing employee details via an accessible modal window.
  - **Delete**: Remove employee record with double-confirmation modal.
- **Security & Quality Highlights**:
  - **Mass Assignment Protection**: Whitelisted request fields (`pickFields`).
  - **NoSQL Injection Prevention**: Integrated `express-mongo-sanitize`.
  - **Rate Limiting**: Integrated `express-rate-limit` (100 req / 15 mins).
  - **Security Headers**: `helmet` HTTP headers protection.
  - **CORS Isolation**: Restricts API access strictly to frontend origin.
  - **Input Validation**: Strict Mongoose schema regex validation for Email, Phone, and Employee ID.
- **UI & Design**:
  - Pure white background design system.
  - Sharp-edged black action buttons (`bg-black text-white`).
  - `Poppins` typography from Google Fonts.
  - Toast notifications powered by `react-hot-toast`.

---

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** — RESTful API Server
- **MongoDB Atlas** — Cloud NoSQL Database (Database: `Code_Migration_HR_Trail`, Collection: `HR`)
- **Mongoose** — ODM for MongoDB with strict schema validation
- **Security**: `helmet`, `cors`, `express-rate-limit`, `express-mongo-sanitize`

### Frontend
- **React 18** — Client-side UI library
- **Vite** — Build tool & development server
- **React Router v6** — Client-side routing
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Minimalist icons
- **Axios** — HTTP client with global response error interceptors

---

## 📁 Project Structure

```
Mernstack_Project_Trail/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/
│   │   └── employeeController.js # Whitelisted CRUD business logic & pagination
│   ├── models/
│   │   └── Employee.js           # Mongoose Schema (Collection: 'HR')
│   ├── routes/
│   │   └── employeeRoutes.js     # Express REST endpoints
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment template for team members
│   ├── package.json              # Express dependencies
│   └── server.js                 # Production Express entry point
│
└── frontend/
    ├── index.html                # Tailwind CDN & Google Fonts Poppins
    ├── package.json              # React dependencies
    └── src/
        ├── App.jsx               # Router shell (/ and /records)
        ├── main.jsx              # React entry point & Toast config
        ├── index.css             # Base CSS resets
        ├── components/
        │   ├── Navbar.jsx        # Navigation header
        │   ├── PersonalDetailsForm.jsx # Add Employee Form
        │   ├── EmployeeTable.jsx # Records Table
        │   ├── EditModal.jsx     # Edit Modal
        │   └── ConfirmDeleteModal.jsx # Delete Confirmation Modal
        ├── pages/
        │   ├── AddEmployeePage.jsx    # Route: /
        │   └── EmployeeRecordsPage.jsx # Route: /records
        └── services/
            └── api.js            # Axios client with interceptor
```

---

## 🚀 Setup & Execution Guide

### 1. Environment Setup

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb+srv://pf01:pf01@productfactory01.tqhycwe.mongodb.net/Code_Migration_HR_Trail?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 2. Start Backend Server

```bash
cd backend
npm install
npm run dev
# Server running at http://localhost:5000
```

### 3. Start Frontend Client

```bash
cd frontend
npm install
npm run dev
# Application running at http://localhost:5173
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description | Request Body / Query | Response |
|---|---|---|---|---|
| **GET** | `/api/employees` | Get all employees | `?page=1&limit=50` | `{ success: true, count, data: [...] }` |
| **GET** | `/api/employees/:id` | Get employee by ID | None | `{ success: true, data: {...} }` |
| **POST** | `/api/employees` | Create new employee | Employee details JSON | `{ success: true, data: {...} }` |
| **PUT** | `/api/employees/:id` | Update employee | Fields to update JSON | `{ success: true, data: {...} }` |
| **DELETE** | `/api/employees/:id` | Delete employee | None | `{ success: true, message: "..." }` |

---

## 🔐 Security Audit Summary

- **0 Hardcoded Secrets**: All DB credentials are stored strictly in `backend/.env`.
- **Git Safety**: `backend/.env` is listed in `.gitignore`.
- **Mass Assignment Safe**: Only whitelisted fields (`fullName`, `employeeId`, `email`, `phone`, `dateOfBirth`, `gender`, `address`, `department`, `position`, `joinDate`) can be saved.
- **NoSQL Injection Safe**: `express-mongo-sanitize` strips operator characters (`$`, `.`).
- **CastError Guard**: `isValidObjectId` checks prevent application crashes on invalid URL parameters.

---

### Author / Organization
**SNS IHUB — Personal Details HR Portal**
