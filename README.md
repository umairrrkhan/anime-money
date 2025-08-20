# Micro Anime 🌸

A modern, high-performance web platform for discovering and reading micro anime stories. Built with smooth animations, clean design, and Firebase integration.

## ✨ Features

- **📚 Free Micro Anime Stories**: Read beautiful, bite-sized anime narratives without any restrictions
- **🔮 Clean Design**: Elegant, modern UI focused on content
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
   git clone https://github.com/your-username/micro-anime.git
   cd micro-anime
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project called "micro-anime"
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database
   - Copy your Firebase configuration

4. **Configure Firebase**
   - Open `public/js/firebase/config.js`
   - Replace the Firebase configuration with your actual credentials

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
anime-project/
├── public/
│   ├── index.html              # Main landing page
│   ├── login.html              # User login page
│   ├── register.html           # User registration page
│   ├── dashboard.html          # User dashboard page
│   ├── assets/                 # Image assets and favicon
│   │   ├── favicon.png         # Site favicon
│   │   └── logo.png            # Site logo
│   ├── css/
│   │   └── styles.css          # Custom styles
│   ├── js/
│   │   ├── auth.js             # Firebase authentication
│   │   ├── stories.js          # Story management
│   │   ├── dashboard.js        # User dashboard functionality
│   │   └── firebase/
│   │       └── config.js       # Firebase configuration
│   ├── stories/                # Story data organized by genre
│   │   ├── Action/             # Action genre stories
│   │   │   ├── beginning-again/
│   │   │   │   ├── cover.png   # Story cover image
│   │   │   │   └── story.json  # Story metadata and content
│   │   │   ├── blade-justice/
│   │   │   │   ├── cover.png
│   │   │   │   └── story.json
│   │   │   └── ...             # Additional Action stories
│   │   ├── Adventure/          # Adventure genre stories
│   │   │   ├── lost-treasure/
│   │   │   │   ├── cover.png
│   │   │   │   └── story.json
│   │   │   └── ...             # Additional Adventure stories
│   │   ├── Dark Romance/       # Dark Romance genre stories
│   │   │   ├── midnight-whispers/
│   │   │   │   ├── cover.png
│   │   │   │   └── story.json
│   │   │   └── ...             # Additional Dark Romance stories
│   │   ├── Fantasy/            # Fantasy genre stories
│   │   │   ├── magical-forest/
│   │   │   │   ├── cover.png
│   │   │   │   └── story.json
│   │   │   └── ...             # Additional Fantasy stories
│   │   ├── Open Minded/        # Open Minded genre stories
│   │   │   ├── mind-expansion/
│   │   │   │   ├── cover.png
│   │   │   │   └── story.json
│   │   │   └── ...             # Additional Open Minded stories
│   │   ├── Romance/            # Romance genre stories
│   │   │   ├── the-last-sakura/
│   │   │   │   ├── cover.png
│   │   │   │   └── story.json
│   │   │   ├── eternal-love/
│   │   │   │   ├── cover.png
│   │   │   │   └── story.json
│   │   │   └── ...             # Additional Romance stories
│   │   ├── Sci-Fi/             # Sci-Fi genre stories
│   │   │   ├── neon-cyber/
│   │   │   │   ├── cover.png
│   │   │   │   └── story.json
│   │   │   └── ...             # Additional Sci-Fi stories
│   │   └── ...                 # Additional genre folders
│   └── story/                  # Story and chapter pages
│       ├── story.html          # Story listing page
│       └── chapter.html        # Individual chapter page
├── src/
│   ├── firebase/
│   │   └── config.js           # Firebase configuration (template)
│   └── utils/
├── product.md                  # Product documentation
├── package.json                # Dependencies & scripts
├── tailwind.config.js          # TailwindCSS configuration
├── firebase.json               # Firebase hosting configuration
├── firestore.rules             # Firestore security rules
├── firestore.indexes.json      # Firestore indexes
└── README.md                   # This file
```

## 🏗️ Current Story Structure

The stories are currently organized by genre in the `public/stories` directory. Each story has its own folder containing:

- `story.json` - Story metadata and content
- `cover.png` - Story cover image

This structure groups all materials related to each story (content, images, etc.) in a single folder, making it easier to manage and understand.

## 🎨 Design System

### Colors
- **Background**: Pure white (#FFFFFF)
- **Text**: Black (#000000)
- **Primary**: Purple (#9333ea)
- **Secondary**: Pink (#ec4899)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights (600-800)
- **Body**: Regular weights (400-500)

## 📖 Available Stories

1. **The Last Sakura** (5 min) - A touching romance about love and loss under cherry blossoms
2. **Guardian's Path** (8 min) - An action fantasy about a young spirit realm protector
3. **Whispers of Spring** (6 min) - A magical fantasy about dreams taking physical form

5. **Ocean's Secret** (9 min) - An underwater adventure mystery
6. **Digital Dreams** (6 min) - A sci-fi story about virtual reality

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build CSS with Tailwind
- `npm start` - Start production server

### Adding New Stories

1. Create a new JSON file in `public/stories/` with the story data
2. Add story assets to the appropriate genre folder in `public/assets/`
3. Update the story listings in `public/index.html`
4. Add reading time and genre information

### Firebase Setup Details

1. **Authentication Setup**:
   - Go to Firebase Console → Authentication
   - Enable Email/Password and Google sign-in methods
   - Configure authorized domains

2. **Firestore Database**:
   - Create database in production mode
   - Structure: `users/{userId}` documents
   - Fields: email, displayName, photoURL, createdAt, readingProgress, favoriteStories, totalReadTime

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

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **TailwindCSS** for the utility-first CSS framework
- **DaisyUI** for beautiful component library
- **Firebase** for authentication and database services
- **Google Fonts** for Inter typography
- **Anime community** for inspiration and stories

## 📞 Support

For support, email support@microanime.com or join our Discord server.

---

Made with ❤️ by the Micro Anime team. Let's spread the magic of micro anime stories! 🌸