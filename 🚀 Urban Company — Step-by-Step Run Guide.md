# 🚀 Urban Company — Step-by-Step Run Guide

A full-stack home-services platform with:
- **Frontend**: React (Create React App) → runs on `http://localhost:3000`
- **Backend**: Spring Boot (Java 17 + Maven) → runs on `http://localhost:8080`
- **Database**: MySQL → database name: `urban_company`

---

## ✅ Prerequisites — Install These First

Make sure the following tools are installed before you begin:

| Tool | Version Needed | How to Check |
|------|---------------|--------------|
| **Node.js** | v16 or higher | `node -v` |
| **npm** | v8 or higher | `npm -v` |
| **Java JDK** | 17 | `java -version` |
| **Maven** | 3.6+ | `mvn -v` |
| **MySQL Server** | 8.x | `mysql --version` |

> 💡 **Download Links:**
> - Node.js → https://nodejs.org
> - Java JDK 17 → https://adoptium.net
> - Maven → https://maven.apache.org/download.cgi
> - MySQL → https://dev.mysql.com/downloads/installer/

---

## 🗄️ STEP 1 — Set Up the MySQL Database

1. Open **MySQL Workbench** or **MySQL Command Line Client**
2. Log in with your MySQL root credentials
3. Import the SQL file that is at the root of this project

### Option A — Using MySQL Workbench (Easy GUI way):
1. Open MySQL Workbench
2. Connect to your local server
3. Go to **File → Run SQL Script...**
4. Browse to: `urban_company_db.sql` (in the project root)
5. Click **Run**

### Option B — Using Command Line:
```powershell
mysql -u root -p < "a:\Internship Project -React\urban-company\urban_company_db.sql"
```
Enter your password when prompted.

### ✅ What the SQL file creates:

| Table | Purpose |
|-------|---------|
| `categories` | Service categories (Salon, Cleaning, AC Repair, etc.) |
| `offers` | Promotional offers / banners |
| `services` | Individual services with price & rating |
| `sections` | Grouped service sections |
| `section_services` | Links sections to services |
| `users` | Registered customers |
| `providers` | Service providers |
| `bookings` | Customer bookings |

> ⚠️ **Note:** The script drops and recreates all tables, so it's safe to run multiple times.

---

## ⚙️ STEP 2 — Configure Your MySQL Password in the Backend

Open this file in your editor:
```
backend/src/main/resources/application.properties
```

Check and update the password if yours is different from `root`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/urban_company?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root     ← Change this to YOUR MySQL password
```

> If your MySQL password is **blank/empty**, set: `spring.datasource.password=`

---

## 🖥️ STEP 3 — Run the Backend (Spring Boot)

Open a **new PowerShell / Terminal** window.

Navigate to the backend folder:
```powershell
cd "a:\Internship Project -React\urban-company\backend"
```

Start the Spring Boot application:
```powershell
.\mvnw.cmd spring-boot:run
```

**Wait for this message in the console:**
```
Started UrbanCompanyBackendApplication in X.XXX seconds (process running for X.XXX)
```

✅ Backend API is now live at: **`http://localhost:8080`**

> 🛑 Keep this terminal **open and running**. Do NOT close it.

---

## 🌐 STEP 4 — Run the Frontend (React)

Open a **second new PowerShell / Terminal** window.

Navigate to the project root folder:
```powershell
cd "a:\Internship Project -React\urban-company"
```

**First time only** — Install all dependencies:
```powershell
npm install
```

Start the React development server:
```powershell
npm start
```

**You should see:**
```
Compiled successfully!

You can now view urban-company in the browser.
  Local:  http://localhost:3000
```

✅ Frontend is live at: **`http://localhost:3000`**

> Your browser should open automatically. If it doesn't, manually go to `http://localhost:3000`

---

## 🔄 STEP 5 — Verify Everything Works

Open your browser and go to `http://localhost:3000`

| Check | What to Expect |
|-------|---------------|
| Home page loads | Services, categories, and offers visible ✅ |
| Backend API | `http://localhost:8080` responds ✅ |
| Categories load | Women's Salon, Cleaning, AC Repair, etc. visible ✅ |
| Services load | Cards with prices and ratings appear ✅ |

---

## 🔁 Every Time You Want to Run the Project

You need to start **two things** each session:

### Terminal 1 — Backend:
```powershell
cd "a:\Internship Project -React\urban-company\backend"
.\mvnw.cmd spring-boot:run
```

### Terminal 2 — Frontend:
```powershell
cd "a:\Internship Project -React\urban-company"
npm start
```

---

## 🛑 How to Stop the Servers

- Press **`Ctrl + C`** in the backend terminal to stop Spring Boot
- Press **`Ctrl + C`** in the frontend terminal to stop React

---

## ❗ Common Errors & Quick Fixes

### ❌ `Access denied for user 'root'@'localhost'`
→ Wrong MySQL password in `application.properties`. Update it to your correct password.

### ❌ `Port 8080 already in use`
→ Something else is using port 8080. Kill it:
```powershell
netstat -ano | findstr :8080
taskkill /PID <REPLACE_WITH_PID> /F
```
Then try `.\mvnw.cmd spring-boot:run` again.

### ❌ `Port 3000 already in use`
→ React will ask: *"Would you like to run the app on another port?"* — Press `Y`.

### ❌ React shows blank page / network errors
→ Make sure the backend is running first (`http://localhost:8080`), then refresh the React page.

### ❌ `npm install` fails / node_modules issues
→ Delete and reinstall:
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### ❌ `mvnw.cmd` — Maven download is slow
→ First run downloads all Maven dependencies from the internet. This is normal, wait for it to finish.

### ❌ `java: command not found` or wrong Java version
→ Install **JDK 17** from https://adoptium.net and make sure `JAVA_HOME` is set correctly.

---

## 📁 Project Structure (Quick Reference)

```
urban-company/
│
├── backend/                          ← Spring Boot (Java Backend)
│   ├── src/
│   │   └── main/
│   │       ├── java/com/urbancompany/   ← Java source code
│   │       └── resources/
│   │           └── application.properties  ← ⚠️ DB password here
│   ├── pom.xml                       ← Maven dependencies
│   └── mvnw.cmd                      ← Run backend with this
│
├── src/                              ← React source code
│   ├── components/                   ← UI Components
│   ├── pages/                        ← Page views
│   └── App.js                        ← Main App
│
├── public/                           ← Static assets
├── urban_company_db.sql              ← ⚠️ Run this in MySQL FIRST
├── package.json                      ← Frontend dependencies
└── 🚀 Urban Company — Step-by-Step Run Guide.md  ← You are here
```

---

## 🌐 API Endpoints Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/categories` | GET | All service categories |
| `/api/offers` | GET | All promotional offers |
| `/api/services/most-booked` | GET | Most booked services |
| `/api/sections` | GET | Service sections |
| `/api/users/register` | POST | Register new user |
| `/api/users/login` | POST | User login |
| `/api/bookings` | POST | Create a booking |

---

*Last updated: October 2026*
