// Stories Module for Anime Wings
import authManager from './auth.js';
import { db } from '../src/firebase/config.js';
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

class StoriesManager {
    constructor() {
        this.stories = {
            story1: {
                title: "The Last Sakura",
                author: "Yuki Tanaka",
                genre: "Romance",
                readTime: 5,
                content: `
                    <div class="prose max-w-none">
                        <h2 class="text-3xl font-bold mb-6 text-center">The Last Sakura</h2>
                        <p class="text-lg mb-4">
                            Under the gentle embrace of spring's first warmth, the ancient sakura tree in Hikarimachi Park bloomed for what would be its final season. Every petal that fell carried with it a memory, a whisper of love that had once flourished beneath its branches.
                        </p>
                        <p class="text-lg mb-4">
                            Akira stood beneath the tree, his weathered hands tracing the bark that had witnessed his entire life. Fifty years ago, on this very spot, he had first met Hana. She had been sketching the tree in her notebook, her dark hair catching the golden afternoon light like spun silk.
                        </p>
                        <p class="text-lg mb-4">
                            "Beautiful, isn't it?" she had said, not looking up from her drawing. "They say this tree is over 200 years old. Imagine all the love stories it has seen."
                        </p>
                        <p class="text-lg mb-4">
                            He had been too nervous to speak properly, managing only a nod. But she had smiled at him then, a smile that would become his anchor through decades of storms.
                        </p>
                        <p class="text-lg mb-4">
                            Every spring, they returned to this tree. Through university exams, through his first job, through their wedding, through the birth of their daughter Yuki, through every joy and sorrow that life could offer. The tree became their constant, their witness, their keeper of secrets.
                        </p>
                        <p class="text-lg mb-4">
                            Last year, Hana had been too weak to make the journey. The cancer that had started in her lungs had spread like winter frost, stealing her breath and her strength. But she had made him promise: "Bring me one last blossom, Akira. Just one."
                        </p>
                        <p class="text-lg mb-4">
                            He had broken that promise. She had slipped away during the night, three days before the first buds opened. Now, as the final petals drifted down around him like pink snow, he understood. She hadn't wanted the blossom for herself. She had wanted him to have this moment, this final gift of beauty to carry him through the years ahead.
                        </p>
                        <p class="text-lg mb-4">
                            A soft breeze stirred the branches, and a single perfect petal landed on his palm. It was the color of her favorite lipstick, the shade she had worn on their first date. He closed his fingers around it gently, feeling the weight of every spring they had shared.
                        </p>
                        <p class="text-lg mb-4">
                            "Thank you," he whispered to the tree, to the sky, to the memory of her laughter. "For everything."
                        </p>
                        <p class="text-lg">
                            As the sun set behind the mountains, painting the sky in shades of rose and gold, Akira made his way home. In his pocket, the petal remained, a small pink promise that love, like the sakura, returns in its own perfect time.
                        </p>
                    </div>
                `
            },
            story2: {
                title: "Guardian's Path",
                author: "Kenji Nakamura",
                genre: "Action",
                readTime: 8,
                content: `
                    <div class="prose max-w-none">
                        <h2 class="text-3xl font-bold mb-6 text-center">Guardian's Path</h2>
                        <p class="text-lg mb-4">
                            The spirit realm trembled. For the first time in a thousand years, the barrier between worlds had cracked, and shadows that should have remained forgotten were seeping through like ink in water.
                        </p>
                        <p class="text-lg mb-4">
                            Riku stood at the edge of the floating temple, his katana humming with ancient power. At sixteen, he was the youngest guardian in three centuries, chosen not for his strength, but for his unusual gift: he could see the threads that bound all living things, the invisible connections that made the spirit realm whole.
                        </p>
                        <p class="text-lg mb-4">
                            "The breach grows wider," Master Hiroshi said, his weathered face grave. "The shadow demons grow bolder. They seek the Heartstone, the crystal that maintains the barrier. If they succeed..."
                        </p>
                        <p class="text-lg mb-4">
                            Riku didn't need to hear the rest. He had seen the visions in his dreams: cities crumbling, rivers running black, the living world consumed by chaos. His fingers tightened around his blade.
                        </p>
                        <p class="text-lg mb-4">
                            "I won't let that happen."
                        </p>
                        <p class="text-lg mb-4">
                            The path to the breach wound through the Whispering Woods, where ancient trees spoke in languages older than human memory. The shadows here were different—thicker, more malevolent. They moved with purpose, coalescing into forms that hurt to perceive.
                        </p>
                        <p class="text-lg mb-4">
                            The first demon attacked as he crossed the Crystal Bridge. It came as a wave of pure darkness, tendrils reaching for his throat. Riku's blade sang as he moved, cutting through the shadows with movements his grandfather had taught him. Each strike was precise, guided by the threads he could see glowing in the darkness.
                        </p>
                        <p class="text-lg mb-4">
                            But there were too many. They pressed from all sides, their whispers promising power, promising escape from the burden of guardianship. For a moment, he wavered. What if he just... let go?
                        </p>
                        <p class="text-lg mb-4">
                            Then he saw her—his little sister, Yui, her spirit thread glowing silver in the darkness. She was in the living world, completely unaware of the battle that would determine her fate. The thought of her smile, her laughter, her belief that the world was safe and kind, gave him strength.
                        </p>
                        <p class="text-lg mb-4">
                            "I am Riku," he declared, his voice carrying across the realms. "Son of the guardian line, protector of the balance. By my blood and my blade, I command you: begone!"
                        </p>
                        <p class="text-lg mb-4">
                            Light exploded from his katana, not harsh like fire, but warm like sunrise. The shadows shrieked and recoiled, some dissolving entirely, others fleeing back toward the breach. But Riku knew this was only the beginning.
                        </p>
                        <p class="text-lg mb-4">
                            At the breach itself, he found the source: a shadow lord, ancient and powerful, its form shifting between wolf and smoke. "Young guardian," it hissed, "you fight for a world that doesn't even know you exist. Join us, and rule both realms."
                        </p>
                        <p class="text-lg mb-4">
                            Riku raised his blade. "I don't need them to know. I just need them to be safe."
                        </p>
                        <p class="text-lg mb-4">
                            The battle was fierce. The shadow lord was stronger than any demon he had faced, its attacks coming from impossible angles. But Riku had learned something in his journey: the threads that bound the realms weren't just connections—they were conduits for power.
                        </p>
                        <p class="text-lg mb-4">
                            Drawing on the life force of every tree, every stream, every heartbeat in the living world, he channeled it through his blade. The final strike was blinding, a pure white light that banished the shadow lord back to whatever void it had crawled from.
                        </p>
                        <p class="text-lg mb-4">
                            As the breach sealed, the barrier shimmering back into place, Riku felt the weight of his responsibility settle more heavily on his shoulders. He was sixteen, but he had just saved two worlds. The path ahead would be long, filled with battles he couldn't yet imagine.
                        </p>
                        <p class="text-lg">
                            But as he made his way back to the temple, the threads around him glowing brighter than ever, he smiled. He was exactly where he needed to be. The guardian's path wasn't about glory or recognition—it was about the quiet knowledge that somewhere, his little sister was laughing under a safe sky.
                        </p>
                    </div>
                `
            },
            story3: {
                title: "Whispers of Spring",
                author: "Aiko Sato",
                genre: "Fantasy",
                readTime: 6,
                content: `
                    <div class="prose max-w-none">
                        <h2 class="text-3xl font-bold mb-6 text-center">Whispers of Spring</h2>
                        <p class="text-lg mb-4">
                            The Dream Garden existed in the space between sleeping and waking, where thoughts took root and grew into impossible things. Every spring, for exactly one week, its gates opened to those who believed in magic more than logic.
                        </p>
                        <p class="text-lg mb-4">
                            Mei had found it by accident. At twelve, she had been struggling with her grandmother's death, unable to accept that someone so full of life could simply... stop existing. She had fallen asleep crying in her grandmother's abandoned greenhouse, surrounded by withered plants that no one had remembered to water.
                        </p>
                        <p class="text-lg mb-4">
                            When she woke, the greenhouse was transformed. Vines heavy with star-shaped flowers climbed the walls. Trees grew from seeds to full bloom in the space of a heartbeat. And everywhere, the air shimmered with the sound of whispers—not words exactly, but the feeling of being understood.
                        </p>
                        <p class="text-lg mb-4">
                            "Welcome, dreamer," said a voice like wind through leaves. A woman stood before her, ageless and beautiful, with eyes that held the depth of forests. "Your grandmother spoke of you often."
                        </p>
                        <p class="text-lg mb-4">
                            Mei's heart caught. "You knew Baba?"
                        </p>
                        <p class="text-lg mb-4">
                            "She was the garden's keeper before you. Every generation, one child is chosen—one who sees not just what is, but what could be."
                        </p>
                        <p class="text-lg mb-4">
                            The woman—who introduced herself as Luna, the garden's guardian—led Mei through paths that shifted with her thoughts. Here, memories became flowers: the dandelion that was her first day of school, the rose that was her parents' wedding, the tiny forget-me-nots that were every moment she had shared with her grandmother.
                        </p>
                        <p class="text-lg mb-4">
                            "But they're dying," Mei whispered, touching a rose that was fading to gray. "Everything dies."
                        </p>
                        <p class="text-lg mb-4">
                            Luna's smile was sad and wise. "Not dying. Changing. In the Dream Garden, nothing truly ends—it transforms. Watch."
                        </p>
                        <p class="text-lg mb-4">
                            As the gray rose fell apart, it didn't crumble to dust. Instead, it became a cloud of silver butterflies, each carrying a fragment of memory. They swirled around Mei, and suddenly she was five years old again, sitting on her grandmother's lap as they planted tomato seeds together.
                        </p>
                        <p class="text-lg mb-4">
                            "She's not gone," Luna said softly. "She's just... distributed. Every act of kindness you do, every plant you nurture, every child you teach to believe in magic—that's her, living through you."
                        </p>
                        <p class="text-lg mb-4">
                            Over the next six days, Mei learned the garden's secrets. How to plant dreams that would grow into reality. How to harvest memories that would sustain others through their own winters. How to speak the language of growing things, which was really the language of hope.
                        </p>
                        <p class="text-lg mb-4">
                            On the seventh day, Luna took her to the heart of the garden, where a single tree grew. Its branches held every dream the garden had ever nurtured, its roots reached into both the waking world and the realm of sleep.
                        </p>
                        <p class="text-lg mb-4">
                            "This is your inheritance," Luna said. "But also your responsibility. The garden needs a new keeper, someone who will tend it not just with water and sunlight, but with stories and love."
                        </p>
                        <p class="text-lg mb-4">
                            Mei placed her hand on the tree's trunk, and felt the garden's pulse—slow, steady, eternal. She understood then that her grandmother hadn't left her alone. She had simply passed on the most important gift: the knowledge that magic wasn't something you found in a garden.
                        </p>
                        <p class="text-lg">
                            It was something you grew.
                        </p>
                        <p class="text-lg">
                            As she woke in the greenhouse, the plants around her were green and thriving. On the workbench sat a single seed, glowing softly with its own inner light. Beside it, her grandmother's gardening gloves, worn and familiar.
                        </p>
                        <p class="text-lg">
                            Mei smiled, understanding at last. The Dream Garden wasn't a place you visited. It was a place you carried inside you, blooming with every act of love, every moment of wonder, every whispered hope that spring would always come again.
                        </p>
                    </div>
                `
            }
        };

        this.init();
    }

    init() {
        this.setupStoryCards();
        this.setupModalEvents();
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
        modalContent.innerHTML = story.content;

        modal.classList.remove('hidden');

        // Track reading progress for logged-in users
        if (authManager.currentUser) {
            this.trackReadingProgress(storyId, story);
        }
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