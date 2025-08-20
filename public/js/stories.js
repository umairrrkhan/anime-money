// Stories Module for Anime Wings
import authManager from './auth.js';
import { 
    db,
    doc,
    updateDoc,
    arrayUnion,
    setDoc,
    getDoc
} from './firebase/config.js';

class StoriesManager {
    constructor() {
        this.stories = {};
        this.init();
    }

    async init() {
        await this.loadStories();
        this.setupSearch();
    }

    async loadStories() {
        try {
            // Define the genre folders
            const genres = ['Action', 'Adventure', 'Dark Romance', 'Fantasy', 'Open Minded', 'Romance', 'Sci-Fi'];
            
            // Known story IDs for each genre (in a real app, this would be dynamic)
            const storyIdsByGenre = {
                'Action': ['beginning-again', 'blade-justice', 'guardians-path', 'neon-warrior', 'new-beginnings', 'shadow-strike', 'storm-breaker', 'warriors-quest'],
                'Adventure': ['lost-treasure', 'quest-for-the-crystal', 'the-explorer', 'treasure-hunt'],
                'Dark Romance': ['midnight-whispers', 'forbidden-desire', 'dark-hearts', 'twilight-love'],
                'Fantasy': ['magical-forest', 'dragon-whisperer', 'crystal-chronicles', 'enchanted-grove'],
                'Open Minded': ['mind-expansion', 'consciousness-shift', 'quantum-leap'],
                'Romance': ['eternal-love', 'forbidden-love', 'heart-of-gold', 'star-crossed', 'love-beyond-time', 'dreams-of-you', 'secret-admirer', 'the-last-sakura'],
                'Sci-Fi': ['neon-cyber', 'time-traveler', 'space-odyssey', 'robot-rebellion']
            };
            
            // Load story data from JSON files in genre folders
            for (const genre of genres) {
                const storyIds = storyIdsByGenre[genre] || [];
                
                for (const storyId of storyIds) {
                    try {
                        const response = await fetch(`stories/${genre}/${storyId}/story.json`);
                        if (response.ok) {
                            const storyData = await response.json();
                            // Add genre and path information to story data
                            storyData.genre = genre;
                            storyData.folderPath = `stories/${genre}/${storyId}`;
                            this.stories[storyData.id] = storyData;
                        }
                    } catch (error) {
                        console.warn(`Could not load story ${storyId} in genre ${genre}:`, error);
                    }
                }
            }
        } catch (error) {
            console.error('Error loading stories:', error);
        }
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        const searchForm = document.getElementById('searchForm');
        
        if (!searchInput || !searchResults || !searchForm) return;
        
        // Add event listener for input
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim().toLowerCase();
            
            if (searchTerm.length >= 3) {
                this.showSearchResults(searchTerm);
            } else {
                searchResults.classList.add('hidden');
            }
        });
        
        // Add event listener for form submission
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                this.showSearchResults(searchTerm);
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
    }

    showSearchResults(searchTerm) {
        const searchResults = document.getElementById('searchResults');
        
        // Filter stories based on search term
        const matchingStories = Object.values(this.stories).filter(story => 
            story.title.toLowerCase().includes(searchTerm) ||
            story.author.toLowerCase().includes(searchTerm) ||
            story.genre.toLowerCase().includes(searchTerm)
        );
        
        if (matchingStories.length > 0) {
            // Create HTML for search results
            let resultsHTML = '';
            matchingStories.slice(0, 6).forEach(story => {
                // Get the correct image path
                const imagePath = story.folderPath ? `${story.folderPath}/cover.png` : 'assets/logo.png';
                
                resultsHTML += `
                    <a href="story/story.html?id=${story.id}" class="block p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                                <img src="${imagePath}" alt="${story.title}" class="w-full h-full object-cover" onerror="this.src='assets/logo.png'">
                            </div>
                            <div class="flex-1 min-w-0">
                                <h4 class="font-semibold text-black truncate">${story.title}</h4>
                                <p class="text-sm text-gray-600 truncate">${story.author}</p>
                            </div>
                        </div>
                    </a>
                `;
            });
            
            searchResults.innerHTML = resultsHTML;
            searchResults.classList.remove('hidden');
        } else {
            searchResults.innerHTML = '<div class="p-3 text-gray-500">No stories found</div>';
            searchResults.classList.remove('hidden');
        }
    }

    getStoryById(storyId) {
        return this.stories[storyId] || null;
    }
    
    // Get the cover image path for a story
    getCoverImagePath(storyId) {
        const story = this.stories[storyId];
        if (story && story.folderPath) {
            return `${story.folderPath}/cover.png`;
        }
        return 'assets/logo.png';
    }
    
    // Get the banner image path for a story
    getBannerImagePath(storyId) {
        const story = this.stories[storyId];
        if (story && story.folderPath) {
            // Try banner first, fallback to cover if banner doesn't exist
            return `${story.folderPath}/baner.png`;
        }
        return 'assets/logo.png';
    }
}

// Initialize stories manager
const storiesManager = new StoriesManager();
export default storiesManager;