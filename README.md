# 🌟 COSC-4353 Volunteer Management System

A modern, responsive web application built for managing volunteer activities and events. This system connects passionate volunteers with meaningful opportunities through an intuitive user interface and powerful management tools.

## ✨ Features

### 👤 **User Management**
- **Secure Authentication** - Login/Signup with form validation
- **Profile Management** - Comprehensive user profiles with skills and availability
- **Password Security** - Regex validation and visibility toggles
- **Real-time Validation** - Live form validation with MUI icons

### 📅 **Event Management**
- **Event Creation** - Admin tools for creating and managing events
- **Skill Matching** - Multi-select skill requirements with checkbox interface
- **Date Selection** - Advanced date picker for event scheduling
- **Volunteer Matching** - Smart matching system for events and volunteers

### 🎨 **Modern UI/UX**
- **Glass Morphism Design** - Beautiful transparent elements with backdrop blur
- **Animated Gradients** - Dynamic background animations
- **Responsive Layout** - Mobile-first design with Tailwind CSS
- **Material Design Icons** - Professional MUI icon integration

## 🚀 Technology Stack

### **Frontend Framework**
- **React 19.1.1** - Latest React with modern features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.1.2** - Ultra-fast build tool and dev server

### **Styling & UI**
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Material-UI 7.3.2** - React component library
- **Custom CSS Animations** - Gradient animations and glass effects

### **Routing & Navigation**
- **React Router DOM 7.9.1** - Client-side routing

### **Development Tools**
- **ESLint** - Code quality and consistency
- **PostCSS & Autoprefixer** - CSS processing
- **SWC** - Fast compilation with Vite

## 📦 Installation & Setup

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone https://github.com/kobetyleryoung/COSC-4353.git

# Navigate to project directory
cd COSC-4353

# Install dependencies
npm install
```

### **Development**
```bash
# Start development server
npm run dev

# The application will be available at http://localhost:5173
```

### **Build for Production**
```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 🎯 Key Features in Detail

### **Authentication System**
- Form validation with regex patterns
- Password strength indicators
- MUI icons for professional appearance
- Real-time validation feedback

### **Event Management**
- Multi-select skill requirements
- Date picker integration
- Admin password demonstration
- Form validation and submission

### **Responsive Design**
- Glass morphism effects
- Animated gradient backgrounds
- Mobile-friendly navigation
- Consistent design language

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue gradient animations
- **Glass Effects**: White transparency overlays
- **Accent**: Custom brand colors defined in Tailwind config

### **Typography**
- **Headings**: Poppins font family
- **Body**: Inter font family
- **Responsive**: Tailwind typography scales

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📝 License

This project is part of COSC-4353 coursework.

## 👥 Team

- **Course**: COSC-4353
- **Focus**: Frontend User Management and Authentication

---

### 🚀 Quick Start

```bash
npm install && npm run dev
```

Visit `http://localhost:5173` to see the application in action!

## 🧪 Mock Data: Volunteer Matching

You can run the volunteer matching UI against static mock data (no backend required).

Enable mock mode by setting a Vite env variable before starting the dev server.

Windows PowerShell example:

```pwsh
$env:VITE_USE_MOCK = "true"; npm run dev
```

Alternatively, create a `.env.local` file in the project root with:

```
VITE_USE_MOCK=true
```

Then start the dev server normally. Disable by removing/unsetting the env variable or setting it to `false` and restarting.
