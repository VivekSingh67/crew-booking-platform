# CrewHub – Modern Film Crew Booking Platform 🎬

CrewHub ek premium aur fully responsive frontend web application hai jise film professionals (Directors, DPs, Editors, etc.) ko dhoondhne aur book karne ke liye banaya gaya hai. Yeh platform modern designs aur smooth user experience provide karta hai.

## ✨ Key Features

- **🚀 Hero Section:** Clean aur modern homepage jahan se user seedha crew browse kar sakte hain.
- **🔍 Advanced Filtering:**
  - Rating based filtering (Minimum & Maximum).
  - Role/Profession based selection.
  - Location based search.
  - Verified profiles filter.
- **📱 Responsive Design:** Mobile-first approach use kiya gaya hai. Dashboard aur Browse pages har screen size par perfect dikhte hain.
- **👤 Detailed Profiles:** Har professional ki expertise, experience, skills, aur projects ki poori jankari.
- **📅 Smart Booking System:**
  - Custom form with validation (Name, Contact, Description, Date).
  - Real-time success toasts using `react-hot-toast`.
  - **Auto-Confirmation Simulation:** Booking hote hi status "Pending" hota hai aur 5 seconds baad system automatically usse "Confirmed" kar deta hai.
- **📊 User Dashboard:**
  - Booking stats overview (Total, Confirmed, Pending).
  - Tab-based navigation (All, Confirmed, Pending, Cancelled).
  - Cancel booking functionality with confirmation dialog.

## 🛠️ Tech Stack

- **Frontend:** React.js (Hooks & Functional Components)
- **Styling:** Tailwind CSS v4 (Glassmorphism & Modern Utilities)
- **Icons:** Lucide React
- **Routing:** React Router Dom v7
- **Notifications:** React Hot Toast
- **State Management:** React Context API

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (Navbar, Card, Modal, etc.)
├── context/          # Booking state management
├── data/             # Mock API / Professional data
├── pages/            # Page layouts (Home, Browse, Profile, Dashboard)
├── App.jsx           # Routing & App Wrapper
└── index.css         # Tailwind & Custom Animations
```

## 🚀 Getting Started

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VivekSingh67/crew-booking-platform.git
   ```

2. **Navigate to the directory:**
   ```bash
   cd "Crew Booking Platform"
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to `http://localhost:5173`

## 📸 Screenshots

*Application features a sleek dark mode with high-quality avatars and micro-animations.*

---

Banaya gaya hai **Vivek Singh** ke dwara. 🎬🎥
