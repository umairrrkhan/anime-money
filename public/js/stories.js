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
        this.setupStoryCards();
        this.setupModalEvents();
    }

    async loadStories() {
        try {
            // Load story data from JSON files
            const storyFiles = [
                'stories/the-last-sakura.json',
                'stories/guardians-path.json',
                'stories/whispers-of-spring.json'
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

    setupStoryCards() {
        const storyCards = document.querySelectorAll('.story-card');
        storyCards.forEach(card => {
            card.addEventListener('click', () => {
                const storyId = card.dataset.story;
                this.openStory(storyId);
            });
        });
    }

    setupModalEvents() {
        const modal = document.getElementById('storyModal');
        const closeBtn = document.getElementById('closeModal');

        closeBtn.addEventListener('click', () => {
            this.closeStory();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeStory();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                this.closeStory();
            }
        });
    }

    openStory(storyId) {
        const story = this.stories[storyId];
        if (!story) return;

        const modal = document.getElementById('storyModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');

        modalTitle.textContent = story.title;
        
        // Create chapter navigation
        let chapterNav = '<div class="mb-6">';
        story.chapters.forEach((chapter, index) => {
            chapterNav += `
                <button class="chapter-btn bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mr-2 mb-2" data-chapter="${index}">
                    ${chapter.title}
                </button>
            `;
        });
        chapterNav += '</div>';
        
        // Display first chapter by default
        let content = chapterNav + story.chapters[0].content;
        
        modalContent.innerHTML = content;
        
        // Add event listeners to chapter buttons
        const chapterButtons = modalContent.querySelectorAll('.chapter-btn');
        chapterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const chapterIndex = parseInt(e.target.dataset.chapter);
                this.openChapter(storyId, chapterIndex);
            });
        });

        modal.classList.remove('hidden');

        // Track reading progress for logged-in users
        if (authManager.currentUser) {
            this.trackReadingProgress(storyId, story);
        }
    }

    openChapter(storyId, chapterIndex) {
        const story = this.stories[storyId];
        if (!story || chapterIndex < 0 || chapterIndex >= story.chapters.length) return;

        const modalContent = document.getElementById('modalContent');
        
        // Create chapter navigation
        let chapterNav = '<div class="mb-6">';
        story.chapters.forEach((chapter, index) => {
            const buttonClass = index === chapterIndex 
                ? 'bg-black text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-black';
                
            chapterNav += `
                <button class="chapter-btn ${buttonClass} font-bold py-2 px-4 rounded mr-2 mb-2" data-chapter="${index}">
                    ${chapter.title}
                </button>
            `;
        });
        chapterNav += '</div>';
        
        // Display selected chapter content
        let content = chapterNav + story.chapters[chapterIndex].content;
        
        modalContent.innerHTML = content;
        
        // Add event listeners to chapter buttons
        const chapterButtons = modalContent.querySelectorAll('.chapter-btn');
        chapterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const newChapterIndex = parseInt(e.target.dataset.chapter);
                this.openChapter(storyId, newChapterIndex);
            });
        });
    }

    closeStory() {
        const modal = document.getElementById('storyModal');
        modal.classList.add('hidden');
    }

    async trackReadingProgress(storyId, story) {
        if (!authManager.currentUser) return;

        try {
            const userRef = doc(db, 'users', authManager.currentUser.uid);
            const progressData = {
                [storyId]: {
                    title: story.title,
                    completedAt: new Date().toISOString(),
                    readTime: story.readTime
                }
            };

            await updateDoc(userRef, {
                readingProgress: progressData,
                totalReadTime: (authManager.userData?.totalReadTime || 0) + story.readTime
            });

            console.log('Reading progress tracked for', story.title);
        } catch (error) {
            console.error('Error tracking reading progress:', error);
        }
    }

    getStoryProgress(userId, storyId) {
        if (!authManager.userData?.readingProgress) return null;
        return authManager.userData.readingProgress[storyId] || null;
    }

    getAllStories() {
        return Object.keys(this.stories).map(id => ({
            id,
            ...this.stories[id]
        }));
    }

    getStoryById(storyId) {
        return this.stories[storyId] || null;
    }
}

// Initialize stories manager
const storiesManager = new StoriesManager();
export default storiesManager;