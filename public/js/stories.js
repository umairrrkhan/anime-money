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
            // Load story data from JSON files
            const storyFiles = [
                'stories/the-last-sakura.json',
                'stories/guardians-path.json',
                'stories/whispers-of-spring.json',
                'stories/moonlit-serenade.json',
                'stories/oceans-secret.json',
                'stories/digital-dreams.json'
            ];
            
            for (const file of storyFiles) {
                const response = await fetch(file);
                const storyData = await response.json();
                this.stories[storyData.id] = storyData;
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
                resultsHTML += `
                    <a href="story/story.html?id=${story.id}" class="block p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                                <img src="assets/${story.id}.png" alt="${story.title}" class="w-full h-full object-cover" onerror="this.src='assets/logo.png'">
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
}

// Initialize stories manager
const storiesManager = new StoriesManager();
export default storiesManager;