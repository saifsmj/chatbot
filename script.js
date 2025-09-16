(function () {
    const themeToggleButton = document.getElementById('themeToggle');
    const yearElement = document.getElementById('year');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    const chatForm = document.getElementById('chatForm');
    const chatText = document.getElementById('chatText');
    const chatMessages = document.getElementById('chatMessages');
    const cheerMode = document.getElementById('cheerMode');

    if (yearElement) {
        yearElement.textContent = String(new Date().getFullYear());
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const isLight = document.documentElement.dataset.theme === 'light';
            document.documentElement.dataset.theme = isLight ? 'dark' : 'light';
            themeToggleButton.textContent = isLight ? '🌙' : '☀️';
        });
    }

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = 'Thanks! I will get back to you soon.';
            contactForm.reset();
        });
    }

    function addMessage(text, sender) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble ' + (sender === 'user' ? 'user' : 'bot');
        bubble.innerHTML = text;
        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function randomFrom(list) {
        return list[Math.floor(Math.random() * list.length)];
    }

    const compliments = [
        'You’re doing amazing. Keep going! ✨',
        'Your potential is limitless. 🌟',
        'Small steps make big waves. You got this! 💪',
        'Your effort today is tomorrow’s success. 🚀',
        'Believe in the process, you’re on the right track. 🌈'
    ];

    const jokes = [
        'Why did the developer go broke? Because they used up all their cache. 😄',
        'I would tell you a UDP joke, but you might not get it. 📡',
        'I told my computer I needed a break, and it said “No problem, I’ll go to sleep.” 😴'
    ];

    function makeAnswerCheerful(answer) {
        if (!cheerMode || !cheerMode.checked) return answer;
        const cheer = randomFrom(compliments);
        return answer + '<br><small>' + cheer + '</small>';
    }

    function generateBotResponse(message) {
        const text = message.trim().toLowerCase();

        if (!text) {
            return 'Please type something and press Send.';
        }

        if (/\b(hi|hello|hey|yo|good\s*(morning|afternoon|evening))\b/.test(text)) {
            return makeAnswerCheerful('Hi! How can I help you today?');
        }

        if (/\b(thank(s| you)|appreciate)\b/.test(text)) {
            return makeAnswerCheerful('You’re welcome! Happy to help.');
        }

        if (/\b(joke|funny|laugh)\b/.test(text)) {
            return makeAnswerCheerful(randomFrom(jokes));
        }

        if (/\b(help|how to|guide|steps?)\b/.test(text)) {
            return makeAnswerCheerful('Sure! Give me a bit more detail about what you need help with.');
        }

        if (/\btime\b/.test(text)) {
            return makeAnswerCheerful('It’s ' + new Date().toLocaleTimeString() + ' for me.');
        }

        if (/\b(date|day)\b/.test(text)) {
            return makeAnswerCheerful('Today is ' + new Date().toLocaleDateString());
        }

        if (/\b(bye|goodbye|see ya|see you)\b/.test(text)) {
            return makeAnswerCheerful('Goodbye! I’m cheering for you.');
        }

        return makeAnswerCheerful('I’m not sure yet, but I can help you figure it out. Can you rephrase or add details?');
    }

    function handleSend(message) {
        if (!message) return;
        addMessage(escapeHtml(message), 'user');

        setTimeout(() => {
            const response = generateBotResponse(message);
            addMessage(response, 'bot');
        }, 300);
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    if (chatForm && chatText) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatText.value;
            chatText.value = '';
            handleSend(text);
        });

        chatText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                chatForm.requestSubmit();
            }
        });

        // Seed a friendly greeting
        addMessage(makeAnswerCheerful('Hello! Ask me anything or say “joke” for a laugh.'), 'bot');
    }
})();

