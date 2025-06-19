# 📋 TaskFlow - Full-Stack Task Manager

A modern, feature-rich task management application built with the MERN stack. TaskFlow helps you organize your tasks efficiently with a beautiful, responsive interface and robust backend functionality.

![TaskFlow Dashboard](https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=600&fit=crop&crop=center)

## ✨ Features

### 🎯 Core Functionality

- **Task Management**: Create, read, update, and delete tasks
- **Task Status**: Mark tasks as complete or incomplete
- **Priority Levels**: Set task priorities (Low, Medium, High)
- **Task Filtering**: Filter by status and priority
- **Task Sorting**: Sort by date, title, or priority
- **Real-time Stats**: Track completion progress

### 🔐 Authentication & Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Protected Routes**: Route guards for authenticated pages
- **Form Validation**: Client and server-side validation

### 🎨 User Experience

- **Responsive Design**: Mobile-first, works on all devices
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Smooth Animations**: Delightful micro-interactions
- **Error Handling**: Comprehensive error messaging
- **Loading States**: Visual feedback for all operations

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Context API** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **Vite** - Fast build tool

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd TaskFlow
   ```

2. **Install dependencies**

   Backend:

   ```bash
   cd backend
   npm install
   ```

   Frontend:

   ```bash
   cd frontend
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the backend directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   ```

4. **Start the application**

   Backend (Terminal 1):

   ```bash
   cd backend
   npm run dev
   ```

   Frontend (Terminal 2):

   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
TaskFlow/
├── backend/
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication middleware
│   │   └── errorHandler.js  # Global error handling
│   ├── models/
│   │   ├── User.js          # User schema and methods
│   │   └── Task.js          # Task schema and validation
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── tasks.js         # Task CRUD routes
│   ├── server.js            # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── context/         # React Context providers
│   │   ├── pages/           # Main page components
│   │   ├── services/        # API service layer
│   │   └── App.jsx          # Main application component
│   ├── public/
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Tasks

- `GET /api/tasks` - Get all user tasks (with filtering)
- `POST /api/tasks` - Create new task (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `PATCH /api/tasks/:id/toggle` - Toggle task status (protected)

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds for password security
- **Input Validation**: Server-side validation using express-validator
- **Protected Routes**: Middleware to protect authenticated endpoints
- **CORS Configuration**: Properly configured cross-origin requests
- **Error Handling**: Secure error messages without sensitive data exposure

## 🎨 Design System

### Colors

- **Primary**: Blue (`#3B82F6`)
- **Success**: Green (`#10B981`)
- **Warning**: Amber (`#F59E0B`)
- **Error**: Red (`#EF4444`)
- **Neutral**: Gray shades

### Typography

- **Font Family**: System fonts for optimal performance
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Line Heights**: 1.5 for body text, 1.2 for headings

### Spacing

- **8px Grid System**: Consistent spacing throughout the application
- **Responsive Breakpoints**: Mobile-first approach with sm, md, lg, xl breakpoints

## 🔄 State Management

The application uses React Context API for state management:

- **AuthContext**: Manages user authentication state and methods
- **TaskContext**: Handles task data, CRUD operations, and filtering

## 📈 Performance Optimizations

- **Code Splitting**: React lazy loading for route components
- **Memoization**: React.memo and useMemo for expensive operations
- **Optimized Images**: Properly sized and compressed images
- **Database Indexing**: MongoDB indexes for efficient queries
- **Request Optimization**: Debounced search and filtering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the development team.

---

Made with ❤️ by the TaskFlow Team
