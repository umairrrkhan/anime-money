// Dashboard Module for Anime Wings
import authManager from './auth.js';
import storiesManager from './stories.js';

class DashboardManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupDashboardEvents();
    }

    setupDashboardEvents() {
        // Smooth scroll to dashboard when login button is clicked
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                if (authManager.currentUser) {
                    document.getElementById('dashboardSection').classList.remove('hidden');
                    document.getElementById('dashboardSection').scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Explore stories button
        const exploreBtn = document.querySelector('.explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                document.getElementById('stories').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }

    async updateDashboardStats() {
        if (!authManager.currentUser) return;

        const userData = authManager.userData;
        if (!userData) return;

        // Update reading statistics
        const stats = this.calculateReadingStats(userData);
        this.renderDashboardStats(stats);
    }

    calculateReadingStats(userData) {
        const readingProgress = userData.readingProgress || {};
        const favoriteStories = userData.favoriteStories || [];
        const totalReadTime = userData.totalReadTime || 0;

        return {
            storiesRead: Object.keys(readingProgress).length,
            totalReadTime: totalReadTime,
            favoriteCount: favoriteStories.length,
            genresRead: this.getGenresRead(readingProgress),
            recentStories: this.getRecentStories(readingProgress),
            achievements: this.calculateAchievements(readingProgress, totalReadTime)
        };
    }

    getGenresRead(readingProgress) {
        const genres = new Set();
        Object.values(readingProgress).forEach(story => {
            // In a real app, you'd fetch genre from stories data
            genres.add(story.genre || 'General');
        });
        return Array.from(genres);
    }

    getRecentStories(readingProgress) {
        return Object.entries(readingProgress)
            .sort(([, a], [, b]) => new Date(b.completedAt) - new Date(a.completedAt))
            .slice(0, 3)
            .map(([id, story]) => ({
                id,
                title: story.title,
                completedAt: new Date(story.completedAt).toLocaleDateString(),
                readTime: story.readTime
            }));
    }

    calculateAchievements(readingProgress, totalReadTime) {
        const achievements = [];
        const storiesRead = Object.keys(readingProgress).length;

        if (storiesRead >= 1) {
            achievements.push({
                name: "First Story",
                description: "Read your first micro anime story",
                icon: "📖",
                unlocked: true
            });
        }

        if (storiesRead >= 3) {
            achievements.push({
                name: "Story Explorer",
                description: "Read all available stories",
                icon: "🌟",
                unlocked: true
            });
        }

        if (totalReadTime >= 10) {
            achievements.push({
                name: "Dedicated Reader",
                description: "Accumulate 10+ minutes of reading time",
                icon: "⏰",
                unlocked: true
            });
        }

        return achievements;
    }

    renderDashboardStats(stats) {
        const dashboardContent = document.getElementById('dashboardContent');
        if (!dashboardContent) return;

        dashboardContent.innerHTML = `
            <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl text-white">${authManager.userData?.username?.charAt(0)?.toUpperCase() || '👤'}</span>
                </div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-2">Welcome back, ${authManager.userData?.username || 'Reader'}!</h3>
                <p class="text-gray-600 mb-8">Here's your reading journey so far:</p>
                
                <!-- Stats Grid -->
                <div class="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <div class="text-3xl font-bold text-purple-600">${stats.storiesRead}</div>
                        <div class="text-sm text-gray-600">Stories Read</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <div class="text-3xl font-bold text-pink-600">${stats.totalReadTime} min</div>
                        <div class="text-sm text-gray-600">Total Read Time</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <div class="text-3xl font-bold text-blue-600">${stats.favoriteCount}</div>
                        <div class="text-sm text-gray-600">Favorites</div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <div class="text-3xl font-bold text-green-600">${stats.genresRead.length}</div>
                        <div class="text-sm text-gray-600">Genres Explored</div>
                    </div>
                </div>

                <!-- Recent Activity -->
                ${stats.recentStories.length > 0 ? `
                    <div class="max-w-2xl mx-auto mb-8">
                        <h4 class="text-lg font-semibold text-gray-800 mb-4">Recent Stories</h4>
                        <div class="space-y-3">
                            ${stats.recentStories.map(story => `
                                <div class="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                                    <div>
                                        <h5 class="font-semibold">${story.title}</h5>
                                        <p class="text-sm text-gray-600">Completed on ${story.completedAt}</p>
                                    </div>
                                    <span class="text-sm bg-purple-100 text-purple-600 px-2 py-1 rounded-full">${story.readTime} min</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Achievements -->
                ${stats.achievements.length > 0 ? `
                    <div class="max-w-2xl mx-auto mb-8">
                        <h4 class="text-lg font-semibold text-gray-800 mb-4">Achievements</h4>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                            ${stats.achievements.map(achievement => `
                                <div class="bg-white p-4 rounded-lg shadow text-center">
                                    <div class="text-2xl mb-2">${achievement.icon}</div>
                                    <h5 class="font-semibold text-sm">${achievement.name}</h5>
                                    <p class="text-xs text-gray-600">${achievement.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Continue Reading -->
                <div class="max-w-2xl mx-auto">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Continue Your Journey</h4>
                    <div class="flex justify-center space-x-4">
                        <button onclick="document.getElementById('stories').scrollIntoView({behavior: 'smooth'})" 
                                class="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200">
                            Browse Stories
                        </button>
                        <button onclick="authManager.logoutUser()" 
                                class="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-all duration-200">
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    async addToFavorites(storyId) {
        if (!authManager.currentUser) return;

        try {
            const userRef = doc(db, 'users', authManager.currentUser.uid);
            await updateDoc(userRef, {
                favoriteStories: arrayUnion(storyId)
            });
            
            console.log('Added to favorites:', storyId);
            this.updateDashboardStats();
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    }

    async removeFromFavorites(storyId) {
        if (!authManager.currentUser) return;

        try {
            const userRef = doc(db, 'users', authManager.currentUser.uid);
            const userData = authManager.userData;
            const updatedFavorites = userData.favoriteStories.filter(id => id !== storyId);
            
            await updateDoc(userRef, {
                favoriteStories: updatedFavorites
            });
            
            console.log('Removed from favorites:', storyId);
            this.updateDashboardStats();
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    }

    isFavorite(storyId) {
        if (!authManager.currentUser || !authManager.userData) return false;
        return authManager.userData.favoriteStories?.includes(storyId) || false;
    }
}

// Initialize dashboard manager
const dashboardManager = new DashboardManager();
export default dashboardManager;

// Global function for auth state changes
window.addEventListener('authStateChanged', () => {
    dashboardManager.updateDashboardStats();
});