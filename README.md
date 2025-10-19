# 🌱 EcoTrack - Smart Waste Management System

A modern, intelligent waste reporting and recycling coordination system built with React, TypeScript, and Tailwind CSS. EcoTrack helps cities and communities manage waste more efficiently through citizen reporting and automated pickup scheduling.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git**

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [<repository-url>](https://github.com/Uma-Aditya/EcoTrack-Responsibility-in-Every-Report-Change-in-Every-Action)
   
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to: http://localhost:5173
   ```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking
npm run typecheck
```

## ✨ Key Features

### 🏠 **Citizen Portal**
- **📱 Quick Issue Reporting**: Snap photos and report overflowing bins in seconds
- **📅 Smart Scheduling**: Schedule waste pickups with flexible date/time selection
- **📍 Location Tracking**: Precise GPS-based location reporting
- **📊 Status Tracking**: Real-time updates on report resolution progress

### 👨‍💼 **Admin Dashboard**
- **📈 Real-time Analytics**: Comprehensive statistics and performance metrics
- **📋 Task Management**: Efficient handling of reports and pickup requests
- **🔄 Status Updates**: Quick status changes with visual indicators
- **📱 Mobile Responsive**: Full functionality on all devices

### 🎨 **Modern UI/UX**
- **🌈 Beautiful Design**: Modern gradient backgrounds and glassmorphism effects
- **⚡ Smooth Animations**: Engaging transitions and hover effects
- **📱 Mobile-First**: Responsive design optimized for all screen sizes
- **♿ Accessible**: WCAG compliant with proper contrast and focus states

### 🔧 **Technical Features**
- **⚛️ React 18**: Latest React with hooks and modern patterns
- **📘 TypeScript**: Full type safety and better developer experience
- **🎨 Tailwind CSS**: Utility-first CSS with custom design system
- **🗄️ Supabase Integration**: Real-time database and authentication
- **🔒 Secure Authentication**: JWT-based admin authentication system

## 🏗️ Architecture

### Frontend Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend Integration
- **Supabase** - Database and authentication
- **PostgreSQL** - Data storage
- **Real-time subscriptions** - Live updates

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation component
│   ├── Footer.tsx      # Footer component
│   └── Toast.tsx       # Notification system
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── lib/               # Utilities and configurations
│   └── supabase.ts    # Supabase client setup
├── pages/             # Page components
│   ├── HomePage.tsx   # Landing page
│   ├── ReportPage.tsx # Issue reporting
│   ├── SchedulePage.tsx # Pickup scheduling
│   ├── AdminLoginPage.tsx # Admin authentication
│   └── AdminDashboardPage.tsx # Admin panel
└── App.tsx            # Main application component
```

## 🎯 Core Functionality

### 1. **Issue Reporting System**
- Citizens can report overflowing bins or waste issues
- Photo upload capability for visual evidence
- Automatic location detection
- Real-time status updates

### 2. **Pickup Scheduling**
- Flexible date and time selection
- Multiple waste type support
- Customer information management
- Automated confirmation system

### 3. **Admin Management**
- Comprehensive dashboard with statistics
- Bulk operations for efficiency
- Real-time data updates
- Performance analytics

### 4. **Notification System**
- Toast notifications for user feedback
- Multiple notification types (success, error, warning, info)
- Auto-dismiss with progress indicators
- Smooth animations

## 🎨 Design System

### Color Palette
- **Primary**: Green tones (#22c55e to #14532d)
- **Secondary**: Slate tones (#f8fafc to #0f172a)
- **Accent**: Status colors (yellow, blue, red, green)

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable secondary colors
- **Interactive**: Hover states with color transitions

### Components
- **Cards**: Rounded corners with soft shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Tables**: Responsive with hover effects

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Tailwind Configuration
Custom configuration includes:
- Extended color palette
- Custom animations
- Shadow utilities
- Backdrop blur effects

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🆘 Support

For support and questions:
- **Email**: mohanaditya706@gmail.com
- **Documentation**: [Project Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)

## 🎉 Acknowledgments


- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Database by [Supabase](https://supabase.com/)

---

**EcoTrack** - Making waste management smarter, one report at a time.
