// Dashboard Module for Anime Wings
import authManager from './auth.js';
import storiesManager from './stories.js';

class DashboardManager {
    constructor() {
        this.init();
    }

    init() {
        // Dashboard functionality can be added here
        // For now, we'll just make sure the dashboard is properly initialized
        console.log('Dashboard Manager initialized');
    }
}

// Initialize dashboard manager
const dashboardManager = new DashboardManager();
export default dashboardManager;