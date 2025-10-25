# 🖥️ KioskApp

A full-screen **Electron-based desktop kiosk application** built using **HTML, CSS, and JavaScript**.  
It provides a minimal, distraction-free interface with one-click PDF generation and a custom desktop icon for Windows.

---

## 🚀 Features
- 🪟 Full-screen kiosk mode  
- ⚙️ Custom Windows desktop icon  
- 🎨 Clean dark-themed interface  
- 🧩 Lightweight and easy to set up  

---

## 🛠️ Installation, Running & Building

Copy and paste the following commands in your terminal 👇

```bash
# Clone the repository
git clone https://github.com/Aakash-15/KioskApp.git
cd KioskApp

# Install dependencies
npm install

# Run the app
npm start

# (Optional) Build a standalone Windows executable
npx electron-packager . KioskApp --platform=win32 --arch=x64 --overwrite --icon=kiosk_icon.ico


## The build will appear inside:

KioskApp-win32-x64/


