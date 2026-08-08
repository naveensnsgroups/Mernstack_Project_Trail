# 🏢 Enterprise HR Personal Details System — MERN Stack

An enterprise-grade, production-ready **HR Personal Details Management System** built with the **MERN Stack** (MongoDB Atlas, Express.js, React 18, Node.js), **Tailwind CSS**, and **Zod** schema validation.

Developed for **SNS IHUB**.

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Architecture & System Flow](#-architecture--system-flow)
- [Key Features](#-key-features)
- [Real-Time Input Transformations & UX](#-real-time-input-transformations--ux)
- [Dual-Layer Zod Validation Schema](#-dual-layer-zod-validation-schema)
- [Tech Stack & Dependencies](#-tech-stack--dependencies)
- [Directory Structure](#-directory-structure)
- [Installation & Setup Guide](#-installation--setup-guide)
- [Environment Configuration](#-environment-configuration)
- [RESTful API Reference](#-restful-api-reference)
- [Security & OWASP Best Practices](#-security--owasp-best-practices)
- [License](#-license)

---

## 🌐 Overview

The **HR Personal Details System** is designed for modern corporate environments to seamlessly onboard employees, track employee information across departments, and enforce company-specific data governance rules (e.g. `@snsgroups.com` email domain restrictions and `EMP` formatted employee IDs).

It features a **pure white design system**, **sharp-cornered black action controls**, **Poppins typography**, and responsive layouts.

---

## 🏗 Architecture & System Flow

```
                                  +-----------------------+
                                  |     Browser / Client  |
                                  | (React 18 + Vite SPA) |
                                  +-----------+-----------+
                                              |
                                              |  HTTP / REST (Axios + Zod)
                                              v
                                  +-----------+-----------+
                                  |     Express Server    |
                                  | (Helmet, CORS, Rate)  |
                                  +-----------+-----------+
                                              |
                                              |  Zod Validation Middleware
                                              v
                                  +-----------+-----------+
                                  |  Employee Controller  |
                                  | (Field Whitelisting)  |
                                  +-----------+-----------+
                                              |
                                              |  Mongoose ODM
                                              v
                                  +-----------+-----------+
                                  |     MongoDB Atlas     |
                                  | (DB: Code_Migration...|
                                  |  Collection: HR)      |
                                  +-----------------------+
```

---

## ✨ Key Features

- **Multi-Page Client Navigation** (`react-router-dom` v6):
  - `/` — Add New Employee Registration Page.
  - `/records` — Employee Records Dashboard with live statistics and CRUD operations.
- **Full CRUD Functionality**:
  - **Create**: Register new employee personal details.
  - **Read**: View employee records in a responsive table with department badges & pagination.
  - **Update**: Edit existing employee details via an accessible modal.
  - **Delete**: Double-confirmation deletion modal with auto-focused cancel safety button.
- **Interactive Department Analytics**:
  - Live counters for Total Employees, IT Department, HR Department, and Other Departments.
- **Accessibility & UX**:
  - ARIA attributes (`aria-label`, `aria-modal`, `role="dialog"`).
  - Modal keyboard listeners (`Escape` key closes modals).
  - Toast feedback via `react-hot-toast`.

---

## ⚡ Real-Time Input Transformations & UX

The application enforces real-time input formatting as the user types:

| Field | Real-Time Input Transformation | Formatting Rules |
|---|---|---|
| **Full Name\*** | Letters & Single Spaces Only | Blocks numbers & symbols; collapses consecutive spaces into a single space. |
| **Employee ID\*** | Auto-Uppercase (`EMP001`) | Converts typed letters to uppercase automatically; blocks special characters. |
| **Email Address\*** | Domain Restriction (`@snsgroups.com`) | Auto-converts to lowercase; strictly requires `@snsgroups.com` domain. |
| **Phone Number\*** | 10-Digit Restrict + Country Flag | Displays **🇮🇳 +91** badge inside input; strictly caps length at 10 numeric digits. |

---

## 🛡 Dual-Layer Zod Validation Schema

Validation is performed on **both client (React)** and **server (Express Middleware)** using **Zod**:

### Validation Rules Matrix

| Field | Type | Required | Validation Rule | Zod Error Message |
|---|---|---|---|---|
| `fullName` | `string` | Yes | `^[A-Za-z\s]+$` | *Only letters and spaces allowed (no numbers or special characters)* |
| `employeeId` | `string` | Yes | `^EMP\d+$` | *Must start with capital EMP followed by numbers (e.g. EMP001)* |
| `email` | `string` | Yes | `^[a-z0-9._%+-]+@snsgroups\.com$` | *Must be a valid email ending with @snsgroups.com* |
| `phone` | `string` | Yes | `^\d{10}$` | *Phone number must be exactly 10 digits* |
| `department` | `enum` | No | `IT, HR, Finance, Marketing, Operations, Sales, Admin, Other` | *Invalid department option* |
| `gender` | `enum` | No | `Male, Female, Other` | *Invalid gender option* |

---

## 🛠 Tech Stack & Dependencies

### Frontend (`frontend/package.json`)
- **Framework**: React 18.3 + Vite 5
- **Routing**: `react-router-dom` v6.24
- **Schema Validation**: `zod` v3.23
- **Styling**: Tailwind CSS + Google Fonts (`Poppins`)
- **HTTP Client**: Axios v1.7 (with response interceptors)
- **Icons**: Lucide React v0.395
- **Toasts**: `react-hot-toast` v2.4

### Backend (`backend/package.json`)
- **Runtime**: Node.js v22
- **Server Framework**: Express.js v4.19
- **Database**: MongoDB Atlas via Mongoose v8.4
- **Schema Validation**: `zod` v3.23
- **Security Middleware**: `helmet` v7.1, `cors` v2.8, `express-rate-limit` v7.3, `express-mongo-sanitize` v2.2

---

## 📁 Directory Structure

```
Mernstack_Project_Trail/
├── backend/
│   ├── config/
│   │   └── db.js                   # MongoDB Atlas connection setup
│   ├── controllers/
│   │   └── employeeController.js   # Whitelisted RESTful CRUD logic
│   ├── middleware/
│   │   └── validateEmployee.js     # Zod Express payload validator
│   ├── models/
│   │   └── Employee.js             # Mongoose Schema (Collection: 'HR')
│   ├── routes/
│   │   └── employeeRoutes.js       # API endpoint route mapping
│   ├── .env                        # Environment secret configuration
│   ├── .env.example                # Secret template for developers
│   ├── package.json                # Server dependencies
│   └── server.js                   # Production Express entry point
│
└── frontend/
    ├── index.html                  # Entry HTML with Tailwind CDN & Poppins font
    ├── package.json                # Client dependencies
    └── src/
        ├── App.jsx                 # Router shell (/ and /records)
        ├── main.jsx                # React root entry & Toast styling
        ├── index.css               # Base CSS resets
        ├── components/
        │   ├── Navbar.jsx          # Navigation header component
        │   ├── PersonalDetailsForm.jsx # Add Employee Form
        │   ├── EmployeeTable.jsx   # Employee Records Table
        │   ├── EditModal.jsx       # Modal for updating employee details
        │   └── ConfirmDeleteModal.jsx # Deletion confirmation modal
        ├── pages/
        │   ├── AddEmployeePage.jsx    # Route: /
        │   └── EmployeeRecordsPage.jsx # Route: /records
        ├── services/
        │   └── api.js              # Axios instance with global interceptor
        └── utils/
            └── employeeSchema.js   # Frontend Zod validation helper
```

---

## 🚀 Installation & Setup Guide

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- MongoDB Atlas Cluster Account

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (Express, Mongoose, Zod, Helmet, etc.)
npm install

# Start development server
npm run dev
```
*Backend server will start at `http://localhost:5000`*

---

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (React, React Router, Zod, Axios, etc.)
npm install

# Start Vite development server
npm run dev
```
*Frontend client will start at `http://localhost:5173`*

---

## ⚙️ Environment Configuration

Create a `.env` file in `backend/.env`:

```env
# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://pf01:pf01@productfactory01.tqhycwe.mongodb.net/Code_Migration_HR_Trail?retryWrites=true&w=majority

# Express Server Port
PORT=5000

# Environment Mode
NODE_ENV=development

# Frontend Allowed Origin (CORS Isolation)
CLIENT_URL=http://localhost:5173
```

---

## 📡 RESTful API Reference

| Method | Endpoint | Description | Request Body / Params | Status Codes |
|---|---|---|---|---|
| **GET** | `/api/employees` | Get all employees (paginated) | Query: `?page=1&limit=50` | `200 OK` |
| **GET** | `/api/employees/:id` | Get single employee by ID | Params: `:id` (Mongo ObjectId) | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **POST** | `/api/employees` | Create new employee | Body: `Employee JSON Payload` | `201 Created`, `400 Bad Request`, `409 Conflict` |
| **PUT** | `/api/employees/:id` | Update existing employee | Body: `Updated JSON Payload` | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/api/employees/:id` | Delete employee record | Params: `:id` | `200 OK`, `400 Bad Request`, `404 Not Found` |

---

## 🔒 Security & OWASP Best Practices

1. **Zero Hardcoded Secrets**: Connection strings are isolated in `backend/.env` (ignored via `.gitignore`).
2. **Mass Assignment Guard**: `pickFields()` whitelist in controller prevents injection of unauthorized database fields.
3. **NoSQL Injection Guard**: `express-mongo-sanitize` strips operator characters (`$`, `.`).
4. **DoS Protection**: `express-rate-limit` limits traffic to 100 requests / 15 minutes per IP.
5. **Security Headers**: `helmet()` masks server signatures and mitigates XSS/clickjacking attacks.
6. **CastError Guard**: `isValidObjectId()` prevents internal server crashes on invalid URL parameters.

---

## 📄 License & Brand

**Built for SNS IHUB**  
*HR Personal Details Portal — All Rights Reserved.*
