// Authentication Module for Anime Wings
import { auth, db } from '../src/firebase/config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
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
            loginBtn.addEventListener('click', () => this.showAuthModal());
        }

        if (dashboardLoginBtn) {
            dashboardLoginBtn.addEventListener('click', () => this.showAuthModal());
        }
    }

    async registerUser(email, password, username) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create user document in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                username: username,
                createdAt: new Date().toISOString(),
                readingProgress: {},
                favoriteStories: [],
                totalReadTime: 0
            });

            return { success: true, user };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    }

    async loginUser(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    }

    async logoutUser() {
        try {
            await signOut(auth);
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
        const dashboardContent = document.getElementById('dashboardContent');

        if (isLoggedIn) {
            if (loginBtn) {
                loginBtn.textContent = 'Dashboard';
                loginBtn.onclick = () => {
                    document.getElementById('dashboardSection').classList.remove('hidden');
                    document.getElementById('dashboardSection').scrollIntoView({ behavior: 'smooth' });
                };
            }

            if (dashboardSection) {
                dashboardSection.classList.remove('hidden');
                this.renderDashboard();
            }
        } else {
            if (loginBtn) {
                loginBtn.textContent = 'Login';
                loginBtn.onclick = () => this.showAuthModal();
            }

            if (dashboardSection) {
                dashboardSection.classList.add('hidden');
            }
        }
    }

    renderDashboard() {
        const dashboardContent = document.getElementById('dashboardContent');
        if (!dashboardContent || !this.currentUser) return;

        dashboardContent.innerHTML = `
            <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl text-white">${this.userData?.username?.charAt(0)?.toUpperCase() || '👤'}</span>
                </div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Welcome, ${this.userData?.username || 'User'}!</h3>
                <p class="text-gray-600 mb-6">Your reading journey continues...</p>
                
                <div class="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-6">
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <div class="text-3xl font-bold text-purple-600">${Object.keys(this.userData?.readingProgress || {}).length}</div>
                        <div class="text-sm text-gray-600">Stories Read</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <div class="text-3xl font-bold text-pink-600">${this.userData?.totalReadTime || 0} min</div>
                        <div class="text-sm text-gray-600">Total Read Time</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <div class="text-3xl font-bold text-blue-600">${this.userData?.favoriteStories?.length || 0}</div>
                        <div class="text-sm text-gray-600">Favorites</div>
                    </div>
                </div>

                <button onclick="authManager.logoutUser()" class="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-all duration-200">
                    Sign Out
                </button>
            </div>
        `;
    }

    showAuthModal() {
        // Create modal if it doesn't exist
        let modal = document.getElementById('authModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'authModal';
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-2xl p-8 max-w-md w-full">
                    <h2 class="text-2xl font-bold text-center mb-6">Welcome to Anime Wings</h2>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" id="authEmail" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="your@email.com">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input type="password" id="authPassword" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="••••••••">
                        </div>
                        
                        <div id="usernameField" class="hidden">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                            <input type="text" id="authUsername" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Your username">
                        </div>
                        
                        <button id="authSubmit" class="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                            Sign In
                        </button>
                        
                        <button id="authToggle" class="w-full text-center text-purple-600 hover:text-purple-700 text-sm">
                            Don't have an account? Sign up
                        </button>
                    </div>
                    
                    <button id="closeAuthModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            `;
            document.body.appendChild(modal);
            this.setupAuthModalEvents(modal);
        }
        
        modal.classList.remove('hidden');
    }

    setupAuthModalEvents(modal) {
        const emailInput = modal.querySelector('#authEmail');
        const passwordInput = modal.querySelector('#authPassword');
        const usernameInput = modal.querySelector('#authUsername');
        const submitBtn = modal.querySelector('#authSubmit');
        const toggleBtn = modal.querySelector('#authToggle');
        const closeBtn = modal.querySelector('#closeAuthModal');
        const usernameField = modal.querySelector('#usernameField');

        let isLoginMode = true;

        toggleBtn.addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            submitBtn.textContent = isLoginMode ? 'Sign In' : 'Sign Up';
            toggleBtn.textContent = isLoginMode ? "Don't have an account? Sign up" : 'Already have an account? Sign in';
            usernameField.classList.toggle('hidden', isLoginMode);
        });

        submitBtn.addEventListener('click', async () => {
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const username = usernameInput?.value.trim();

            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }

            if (!isLoginMode && !username) {
                alert('Please enter a username');
                return;
            }

            let result;
            if (isLoginMode) {
                result = await this.loginUser(email, password);
            } else {
                result = await this.registerUser(email, password, username);
            }

            if (result.success) {
                modal.classList.add('hidden');
            } else {
                alert(result.error);
            }
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
}

// Initialize auth manager
const authManager = new AuthManager();
export default authManager;