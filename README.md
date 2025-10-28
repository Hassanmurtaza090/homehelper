# HomeHelper Frontend

A modern, responsive on-demand home service management system built with React, TypeScript, and Vite.

## 🚀 Features

- **Multi-role Authentication System**
  - Customer role for booking services
  - Service Provider role for managing jobs
  - Admin role for platform management

- **Modern Tech Stack**
  - React 18 with TypeScript
  - Vite for fast development and building
  - TailwindCSS for responsive styling
  - React Router v6 for routing
  - Context API for state management
  - Axios for API calls

- **User Features**
  - Browse and search services
  - Book services with scheduling
  - View booking history
  - Manage profile

- **Provider Features**
  - Manage job assignments
  - Set availability
  - View customer feedback
  - Track earnings

- **Admin Features**
  - User management
  - Service management
  - Booking oversight
  - Analytics dashboard
  - System settings

## 📁 Project Structure

```
src/
├── assets/          # Images, icons, logos
├── components/      # Reusable UI components
│   ├── ui/         # Base UI components
│   ├── layout/     # Layout components
│   └── shared/     # Feature-specific components
├── pages/          # Role-based pages
│   ├── public/     # Public pages
│   ├── user/       # Customer pages
│   ├── provider/   # Service provider pages
│   └── admin/      # Admin pages
├── context/        # Context providers
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript definitions
├── App.tsx         # Main app component
└── main.tsx        # Application entry point
```

## 🛠 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## 🎨 Design System

- **Color Palette**
  - Primary: #3B82F6 (Blue)
  - Secondary: #10B981 (Green)
  - Accent: #F59E0B (Amber)
  - Neutral: #6B7280 (Gray)

- **Typography**: Inter font family
- **Components**: Modern, clean design with subtle shadows and rounded corners

## 🔐 Authentication

The app includes role-based authentication with the following demo credentials:

- **Customer**: `user@demo.com` / `Demo123!`
- **Provider**: `provider@demo.com` / `Demo123!`
- **Admin**: `admin@demo.com` / `Demo123!`

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## 🔌 API Integration

The application is designed to work with a backend API. Configure the API endpoint in the environment variables:

Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Key Features Implementation

### Context API
- **AuthContext**: Manages user authentication state
- **BookingContext**: Handles booking flow and state

### Protected Routes
- Role-based route protection
- Automatic redirection based on user role

### Reusable Components
- Button, Input, Card, Modal, Table components
- ServiceCard for service display
- StatCard for dashboard statistics
- Responsive Navbar and Footer
- Role-specific Sidebars

### Form Validation
- Email, password, phone validation
- Real-time error feedback
- Custom validation hooks

## 🏗 Future Enhancements

- [ ] Real backend API integration
- [ ] Payment gateway integration
- [ ] Real-time chat support
- [ ] Push notifications
- [ ] Advanced search and filtering
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA) features

## 📝 License

MIT

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Known Issues

- API endpoints currently return mock data
- Some TypeScript warnings in development mode (non-critical)
- Payment processing is not implemented

## 📞 Support

For support, email support@homehelper.com or create an issue in the repository.

---

Built with ❤️ using React + Vite + TypeScript
