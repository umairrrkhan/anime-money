// Authentication Module for Anime Wings
import { 
    auth, 
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    doc,
    setDoc,
    getDoc
} from './firebase/config.js';

class AuthManager {
    constructor() {
        this.currentUser = null;
        // Wait for DOM to be loaded before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        // Check authentication state
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                this.currentUser = user;
                await this.loadUserData(user.uid);
                this.updateUI(true);
            } else {
                this.currentUser = null;
                this.updateUI(false);
            }
        });

        // Event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login button in header
        const loginBtn = document.getElementById('loginBtn');
        const dashboardLoginBtn = document.getElementById('dashboardLoginBtn');

        if (loginBtn) {
            console.log('Login button found:', loginBtn);
            loginBtn.addEventListener('click', (e) => {
                // Check if user is logged in by looking at button text
                if (loginBtn.innerHTML.includes('Dashboard')) {
                    // User is logged in, go to dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    // User is not logged in, go to login page
                    console.log('Login button clicked, redirecting to login page');
                    window.location.href = 'login.html';
                }
            });
        }

        if (dashboardLoginBtn) {
            dashboardLoginBtn.addEventListener('click', () => {
                window.location.href = 'login.html';
            });
        }
    }

    async registerUser(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create user document in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                displayName: email.split('@')[0],
                photoURL: null,
                createdAt: new Date().toISOString(),
                readingProgress: {},
                favoriteStories: [],
                totalReadTime: 0
            });

            // Load user data
            await this.loadUserData(user.uid);
            
            return { success: true, user };
        } catch (error) {
            console.error('Registration error:', error);
            let errorMessage = error.message;
            
            // Provide more user-friendly error messages
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered. Please try logging in instead.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters.';
            }
            
            return { success: false, error: errorMessage };
        }
    }

    async loginUser(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Load user data
            await this.loadUserData(userCredential.user.uid);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = error.message;
            
            // Provide more user-friendly error messages
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email. Please check your email or sign up.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            } else if (error.code === 'auth/user-disabled') {
                errorMessage = 'This account has been disabled.';
            }
            
            return { success: false, error: errorMessage };
        }
    }

    async signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            // Check if user exists in our database, if not create them
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (!userDoc.exists()) {
                // Create user document in Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    displayName: user.displayName || user.email.split('@')[0],
                    photoURL: user.photoURL || null,
                    createdAt: new Date().toISOString(),
                    readingProgress: {},
                    favoriteStories: [],
                    totalReadTime: 0
                });
            } else {
                // Update user document with latest info from Google
                await updateDoc(doc(db, 'users', user.uid), {
                    displayName: user.displayName || user.email.split('@')[0],
                    photoURL: user.photoURL || null
                });
            }
            
            // Load user data
            await this.loadUserData(user.uid);
            return { success: true, user };
        } catch (error) {
            console.error('Google sign-in error:', error);
            let errorMessage = error.message;
            
            // Provide more user-friendly error messages
            if (error.code === 'auth/account-exists-with-different-credential') {
                errorMessage = 'An account already exists with this email. Please sign in using your email and password.';
            } else if (error.code === 'auth/popup-blocked') {
                errorMessage = 'Sign-in popup was blocked. Please allow popups for this site.';
            }
            
            return { success: false, error: errorMessage };
        }
    }

    async logoutUser() {
        try {
            await signOut(auth);
            this.currentUser = null;
            this.userData = null;
            this.updateUI(false);
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    }

    async loadUserData(userId) {
        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                this.userData = userDoc.data();
                return this.userData;
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
        return null;
    }

    updateUI(isLoggedIn) {
        const loginBtn = document.getElementById('loginBtn');
        const dashboardSection = document.getElementById('dashboardSection');

        if (isLoggedIn) {
            if (loginBtn) {
                loginBtn.innerHTML = '<i class="fas fa-user mr-2"></i>Dashboard';
            }
        } else {
            if (loginBtn) {
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Login';
            }
        }
    }

    renderDashboard() {
        // Dashboard rendering is now handled in the HTML files
        console.log('Dashboard rendering handled in HTML files');
    }

    showAuthModal() {
        // Redirect to login page instead of showing modal
        window.location.href = 'login.html';
    }
}

// Initialize auth manager
const authManager = new AuthManager();
export default authManager;