# Anime Wings 🌸

A modern, high-performance web platform for discovering and reading micro anime stories. Built with 120 FPS smooth animations, glass-morphism design, and Firebase integration.

## ✨ Features

- **📚 Free Micro Anime Stories**: Read beautiful, bite-sized anime narratives without any restrictions
- **⚡ 120 FPS Performance**: Ultra-smooth animations and transitions
- **🔮 Glass-Morphism Design**: Elegant, modern UI with light glass effects
- **👤 User Dashboard**: Track your reading progress and achievements
- **🔐 Firebase Auth**: Secure login/registration system
- **📱 Responsive Design**: Works perfectly on all devices
- **🎯 Reading Progress**: Save your reading history across devices

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Firebase account (for authentication and database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/anime-wings.git
   cd anime-wings
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project called "anime-wings"
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your Firebase configuration

4. **Configure Firebase**
   - Open `src/firebase/config.js`
   - Replace `YOUR_API_KEY_HERE` and `YOUR_APP_ID_HERE` with your actual Firebase credentials

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
anime-wings/
├── public/
│   ├── index.html          # Main landing page
│   ├── css/
│   │   └── styles.css      # Custom styles & 120 FPS animations
│   ├── js/
│   │   ├── auth.js         # Firebase authentication
│   │   ├── stories.js      # Story management & reading
│   │   └── dashboard.js    # User dashboard functionality
│   └── stories/            # Individual story pages
├── src/
│   ├── firebase/
│   │   └── config.js       # Firebase configuration
│   └── utils/
│       └── animations.js     # Animation utilities
├── product.md              # Product documentation
├── package.json            # Dependencies & scripts
└── README.md              # This file
```

## 🎨 Design System

### Colors
- **Background**: Pure white (#FFFFFF)
- **Primary**: Purple gradient (#9333ea → #ec4899)
- **Glass Effect**: White with 10% opacity + blur
- **Text**: Gray-800 (#1f2937)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights (600-700)
- **Body**: Regular weights (400-500)

### Animations
- **Frame Rate**: 120 FPS
- **Duration**: 200-300ms for interactions
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)

## 📖 Available Stories

1. **The Last Sakura** (5 min) - A touching romance about love and loss under cherry blossoms
2. **Guardian's Path** (8 min) - An action fantasy about a young spirit realm protector
3. **Whispers of Spring** (6 min) - A magical fantasy about dreams taking physical form

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

### Adding New Stories

1. Add story content to `public/js/stories.js`
2. Update story card in `public/index.html`
3. Add reading time and genre information

### Firebase Setup Details

1. **Authentication Setup**:
   - Go to Firebase Console → Authentication
   - Enable Email/Password sign-in method
   - Configure authorized domains

2. **Firestore Database**:
   - Create database in production mode
   - Structure: `users/{userId}` documents
   - Fields: email, username, readingProgress, favoriteStories, totalReadTime

3. **Security Rules**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth.uid == userId;
       }
     }
   }
   ```

## 🎯 Performance Optimizations

- **120 FPS Animations**: Hardware-accelerated CSS transforms
- **Lazy Loading**: Images and content load as needed
- **Code Splitting**: Modular JavaScript for faster loading
- **Optimized Images**: SVG icons and compressed assets
- **CDN Integration**: Firebase hosting with global CDN

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TailwindCSS** for the utility-first CSS framework
- **DaisyUI** for beautiful component library
- **Firebase** for authentication and database services
- **Google Fonts** for Inter typography
- **Anime community** for inspiration and stories

## 📞 Support

For support, email support@animewings.com or join our Discord server.

---

Made with ❤️ by the Anime Wings team. Let's spread the magic of micro anime stories! 🌸