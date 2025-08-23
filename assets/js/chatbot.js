// AI Chatbot Functionality
class AIChatbot {
    constructor() {
        this.isOpen = false;
        this.chatHistory = [];
        this.isTyping = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadChatHistory();
        this.updateQuickActions();
    }

    bindEvents() {
        // Toggle chatbot
        const header = document.querySelector('.chatbot-header');
        if (header) {
            header.addEventListener('click', () => this.toggle());
        }

        // Send message on Enter key
        const input = document.getElementById('chat-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Send button
        const sendBtn = document.getElementById('send-message');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        // Quick action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const question = e.target.getAttribute('data-question');
                if (question) {
                    this.askQuestion(question);
                }
            }
        });
    }

    toggle() {
        const body = document.getElementById('chatbot-body');
        const icon = document.getElementById('chat-icon');
        const closeIcon = document.getElementById('close-icon');
        
        if (this.isOpen) {
            body.style.display = 'none';
            icon.style.display = 'inline-block';
            closeIcon.style.display = 'none';
            this.isOpen = false;
        } else {
            body.style.display = 'block';
            icon.style.display = 'none';
            closeIcon.style.display = 'inline-block';
            this.isOpen = true;
            document.getElementById('chat-input').focus();
        }
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message && !this.isTyping) {
            this.addMessage(message, 'user');
            input.value = '';
            
            // Show typing indicator
            this.showTypingIndicator();
            
            // Generate AI response
            setTimeout(() => {
                this.hideTypingIndicator();
                const response = this.generateAIResponse(message);
                this.addMessage(response, 'bot');
            }, 1000 + Math.random() * 1000); // Random delay for realism
        }
    }

    askQuestion(question) {
        if (!this.isTyping) {
            this.addMessage(question, 'user');
            
            this.showTypingIndicator();
            
            setTimeout(() => {
                this.hideTypingIndicator();
                const response = this.generateAIResponse(question);
                this.addMessage(response, 'bot');
            }, 800 + Math.random() * 800);
        }
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        if (sender === 'user') {
            avatar.innerHTML = '<i class="fas fa-user"></i>';
        } else {
            avatar.innerHTML = '<i class="fas fa-robot"></i>';
        }
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
        
        // Store in history
        this.chatHistory.push({ sender, text, timestamp: new Date() });
        this.saveChatHistory();
    }

    showTypingIndicator() {
        this.isTyping = true;
        const messagesContainer = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator-message';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        const currentPage = window.location.pathname;
        
        // Computer Science responses
        if (message.includes('sorting') || message.includes('algorithm')) {
            return `🔄 <strong>Sorting Algorithms</strong><br><br>
            Here are the main sorting algorithms you should know:<br>
            • <strong>Bubble Sort</strong> - O(n²) time complexity, simple but inefficient<br>
            • <strong>Quick Sort</strong> - O(n log n) average case, very efficient<br>
            • <strong>Merge Sort</strong> - O(n log n) guaranteed, stable sort<br>
            • <strong>Heap Sort</strong> - O(n log n), in-place sorting<br><br>
            Check out our <a href="/computer-science/sorting/" style="color: #3498db;">detailed sorting guide</a> for implementations and examples!`;
        }
        
        if (message.includes('data structure')) {
            return `🏗️ <strong>Data Structures</strong><br><br>
            Essential data structures for algorithms:<br>
            • <strong>Arrays</strong> - Fast access, fixed size<br>
            • <strong>Linked Lists</strong> - Dynamic size, easy insertion/deletion<br>
            • <strong>Stacks & Queues</strong> - LIFO and FIFO operations<br>
            • <strong>Trees</strong> - Binary trees, BST, AVL trees<br>
            • <strong>Graphs</strong> - Adjacency matrix/list representations<br><br>
            Each has specific use cases and trade-offs!`;
        }
        
        if (message.includes('dynamic programming') || message.includes('dp')) {
            return `⚡ <strong>Dynamic Programming</strong><br><br>
            DP is a method for solving complex problems by breaking them down into simpler subproblems:<br><br>
            <strong>Key Concepts:</strong><br>
            • Memoization (top-down)<br>
            • Tabulation (bottom-up)<br>
            • Optimal substructure<br>
            • Overlapping subproblems<br><br>
            <strong>Classic Problems:</strong><br>
            • Fibonacci sequence<br>
            • Longest Common Subsequence<br>
            • Knapsack problem<br>
            • Edit distance<br><br>
            Practice these to master DP!`;
        }
        
        // Language Learning responses
        if (message.includes('english') || message.includes('vocabulary')) {
            return `📚 <strong>English Vocabulary Tips</strong><br><br>
            Here are effective strategies to improve your English vocabulary:<br><br>
            <strong>1. Context Learning</strong><br>
            Learn words in sentences, not in isolation<br><br>
            <strong>2. Spaced Repetition</strong><br>
            Use apps like Anki to review words at optimal intervals<br><br>
            <strong>3. Active Usage</strong><br>
            Try to use new words in your own sentences<br><br>
            <strong>4. Reading</strong><br>
            Read books, articles, and news in English<br><br>
            Check out our <a href="/duolingo/vocabulary/" style="color: #3498db;">vocabulary section</a> for more resources!`;
        }
        
        if (message.includes('grammar') || message.includes('tense')) {
            return `📝 <strong>English Grammar</strong><br><br>
            Key grammar concepts to master:<br><br>
            <strong>Verb Tenses:</strong><br>
            • Present Simple - habits and facts<br>
            • Present Continuous - actions happening now<br>
            • Past Simple - completed actions<br>
            • Future - plans and predictions<br><br>
            <strong>Important Rules:</strong><br>
            • Subject-verb agreement<br>
            • Article usage (a, an, the)<br>
            • Prepositions<br>
            • Word order<br><br>
            Visit our <a href="/duolingo/grammar/" style="color: #3498db;">grammar section</a> for detailed explanations!`;
        }
        
        if (message.includes('study') || message.includes('learning')) {
            return `🎯 <strong>Study Strategies</strong><br><br>
            Effective learning techniques:<br><br>
            <strong>For Algorithms:</strong><br>
            • Practice coding daily<br>
            • Solve problems on LeetCode/HackerRank<br>
            • Implement algorithms from scratch<br>
            • Understand time/space complexity<br><br>
            <strong>For Languages:</strong><br>
            • Immerse yourself in the language<br>
            • Practice speaking regularly<br>
            • Use spaced repetition<br>
            • Learn in context<br><br>
            <strong>General Tips:</strong><br>
            • Set specific goals<br>
            • Track your progress<br>
            • Stay consistent<br>
            • Teach others to reinforce learning`;
        }
        
        // Page-specific responses
        if (currentPage.includes('/computer-science/')) {
            return `💻 <strong>Computer Science Assistant</strong><br><br>
            I see you're exploring Computer Science! I can help you with:<br><br>
            • <strong>Algorithms:</strong> sorting, searching, graph algorithms<br>
            • <strong>Data Structures:</strong> arrays, linked lists, trees, graphs<br>
            • <strong>Problem Solving:</strong> dynamic programming, greedy algorithms<br>
            • <strong>Complexity Analysis:</strong> time and space complexity<br><br>
            What specific topic would you like to learn about?`;
        }
        
        if (currentPage.includes('/duolingo/')) {
            return `🌍 <strong>Language Learning Assistant</strong><br><br>
            I see you're working on languages! I can help you with:<br><br>
            • <strong>Grammar:</strong> verb tenses, sentence structure<br>
            • <strong>Vocabulary:</strong> word building, context learning<br>
            • <strong>Speaking:</strong> pronunciation, conversation skills<br>
            • <strong>Study Methods:</strong> spaced repetition, immersion<br><br>
            Which language or skill would you like to focus on?`;
        }
        
        if (currentPage.includes('/about/')) {
            return `👨‍💻 <strong>About TechGuy</strong><br><br>
            I can tell you about Khoa Cao, a Cloud DevOps Engineer at Accenture:<br><br>
            • <strong>Experience:</strong> 3+ years in cloud and DevOps<br>
            • <strong>Skills:</strong> Serverless, CI/CD, TypeScript, AWS<br>
            • <strong>Current Role:</strong> Working on GenWizard project<br>
            • <strong>Education:</strong> Computer Science from University of Science<br><br>
            Would you like to know more about his technical skills or experience?`;
        }
        
        // Default response
        return `🤖 I'm here to help you learn! I can assist with:<br><br>
        📚 <strong>Computer Science:</strong> algorithms, data structures, problem-solving<br>
        🌍 <strong>Language Learning:</strong> grammar, vocabulary, study tips<br>
        💡 <strong>Learning Strategies:</strong> effective study methods and resources<br><br>
        Try asking me about specific topics like "sorting algorithms", "English grammar", or "study strategies"!`;
    }

    updateQuickActions() {
        const currentPage = window.location.pathname;
        const quickActions = document.querySelector('.quick-actions');
        
        if (quickActions) {
            let buttons = [];
            
            if (currentPage.includes('/computer-science/')) {
                buttons = [
                    { text: 'Sorting Algorithms', question: 'Tell me about sorting algorithms' },
                    { text: 'Data Structures', question: 'Explain data structures' },
                    { text: 'Dynamic Programming', question: 'What is dynamic programming?' }
                ];
            } else if (currentPage.includes('/duolingo/')) {
                buttons = [
                    { text: 'English Grammar', question: 'Help me with English grammar' },
                    { text: 'Vocabulary Tips', question: 'How to improve English vocabulary?' },
                    { text: 'Study Methods', question: 'Best language learning strategies' }
                ];
            } else {
                buttons = [
                    { text: 'Sorting Algorithms', question: 'Tell me about sorting algorithms' },
                    { text: 'English Tips', question: 'How to improve English vocabulary?' },
                    { text: 'Study Tips', question: 'Best study strategies for algorithms' }
                ];
            }
            
            quickActions.innerHTML = buttons.map(btn => 
                `<button class="quick-btn" data-question="${btn.question}">${btn.text}</button>`
            ).join('');
        }
    }

    saveChatHistory() {
        try {
            localStorage.setItem('chatbot_history', JSON.stringify(this.chatHistory.slice(-50))); // Keep last 50 messages
        } catch (e) {
            console.log('Could not save chat history');
        }
    }

    loadChatHistory() {
        try {
            const saved = localStorage.getItem('chatbot_history');
            if (saved) {
                this.chatHistory = JSON.parse(saved);
            }
        } catch (e) {
            console.log('Could not load chat history');
        }
    }

    clearHistory() {
        this.chatHistory = [];
        localStorage.removeItem('chatbot_history');
        const messagesContainer = document.getElementById('chat-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="message bot-message">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>👋 Hi! I'm your AI learning assistant. I can help you with:</p>
                        <ul>
                            <li>📚 Computer Science concepts and algorithms</li>
                            <li>🌍 Language learning tips and grammar</li>
                            <li>💡 Study strategies and resources</li>
                            <li>🎯 Learning path recommendations</li>
                        </ul>
                        <p>What would you like to learn about today?</p>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.chatbot = new AIChatbot();
});

// Global functions for backward compatibility
function toggleChatbot() {
    if (window.chatbot) {
        window.chatbot.toggle();
    }
}

function sendMessage() {
    if (window.chatbot) {
        window.chatbot.sendMessage();
    }
}

function askQuestion(question) {
    if (window.chatbot) {
        window.chatbot.askQuestion(question);
    }
}




