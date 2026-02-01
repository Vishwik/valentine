
const photos = [
    { src: 'polroid/IMG-20251108-WA0847.jpg', caption: 'My favorite smile.' },
    { src: 'polroid/IMG_20241122_154946.jpg', caption: 'Unforgettable moments.' },
    { src: 'polroid/IMG_20241122_163338_Burst15.jpg', caption: 'Just perfect.' },
    { src: 'polroid/IMG_20250305_124406.jpg', caption: 'Us against the world.' },
    { src: 'polroid/IMG_20250307_170958.jpg', caption: 'So much love here.' },
    { src: 'polroid/IMG_20260127_171818.jpg', caption: 'Cutest human ever.' },
    { src: 'polroid/IMG_20260130_094217.jpg', caption: 'My heart.' },
    { src: 'polroid/IMG_20260131_113006.jpg', caption: 'Cuteee.' },
    { src: 'polroid/Snapchat-1012971494.jpg', caption: 'Holding my world.' },
    { src: 'polroid/Snapchat-1518747732.jpg', caption: 'Just us being us.' },
    { src: 'polroid/Snapchat-578086827.jpg', caption: 'Love this vibe.' },
    { src: 'polroid/Videoshot_20250309_165412.jpg', caption: 'Captured joy.' },
    { src: 'polroid/Videoshot_20250320_230856.jpg', caption: 'Pure happiness.' },
    { src: 'polroid/Videoshot_20251023_152956.jpg', caption: 'Focus on you.' },
    { src: 'polroid/Videoshot_20251023_153014.jpg', caption: 'Forever & always.' },
    { src: 'polroid/Videoshot_20260201_194439.jpg', caption: 'My sunshine.' },
    { src: 'polroid/Videoshot_20260201_194531.jpg', caption: 'Every little thing.' },
    { src: 'polroid/Videoshot_20260201_194738.jpg', caption: 'You complete me.' }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- Selectors ---
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const mainContainer = document.getElementById('mainContainer');
    const celebrationContainer = document.getElementById('celebrationContainer');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const heartsContainer = document.getElementById('heartsContainer');

    let isMusicPlaying = false;

    // --- Interaction: No Button Escapes ---
    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);

    function moveNoButton() {
        if (noBtn.parentNode !== document.body) {
            document.body.appendChild(noBtn);
        }
        const containerRect = mainContainer.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        const safeMargin = 50;
        const maxX = window.innerWidth - btnRect.width - (safeMargin * 2);
        const maxY = window.innerHeight - btnRect.height - (safeMargin * 2);

        const randomX = safeMargin + Math.random() * Math.max(0, maxX);
        const randomY = safeMargin + Math.random() * Math.max(0, maxY);

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';

        const texts = ["Really?", "Think again!", "Too slow!", "Nuh uh!", "Can't catch me!"];
        noBtn.innerText = texts[Math.floor(Math.random() * texts.length)];
    }

    // --- Interaction: Yes Button ---
    yesBtn.addEventListener('click', () => {
        mainContainer.style.opacity = '0';
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';

        setTimeout(() => {
            mainContainer.style.display = 'none';
            noBtn.style.display = 'none';

            celebrationContainer.classList.remove('hidden');
            setTimeout(() => {
                celebrationContainer.classList.add('visible');
            }, 50);

            triggerConfetti();

            if (!isMusicPlaying) {
                bgMusic.play().then(() => {
                    isMusicPlaying = true;
                    musicToggle.innerText = "🎵 Music: On";
                }).catch(e => console.log("Audio play failed", e));
            }
        }, 500);
    });

    // --- Feature: Music Toggle ---
    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.innerText = "🎵 Music: Off";
        } else {
            bgMusic.play();
            musicToggle.innerText = "🎵 Music: On";
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // --- Visual: Floating Hearts Generator ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = ['❤️', '💖', '💕', '🥰', '🌸'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heartsContainer.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 10000);
    }
    setInterval(createHeart, 800);

    // --- Feature: Floating Quotes (Optional enhancement) ---
    const quotes = [
        "Januu = my favorite person ❤️",
        "You're my favorite notification 💌",
        "Better than chocolate 🍫",
        "My 11:11 wish ✨",
        "You + Me = Perfect 💑",
        "I love you Januu! 💕"
    ];

    function showRandomQuote() {
        const quote = document.createElement('div');
        quote.style.position = 'fixed';
        quote.style.bottom = '100px';
        quote.style.right = (Math.random() * 50) + 'px';
        quote.style.background = 'white';
        quote.style.padding = '10px 20px';
        quote.style.borderRadius = '20px';
        quote.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        quote.style.color = '#FF6B81';
        quote.style.fontFamily = "'Nunito', sans-serif";
        quote.style.animation = 'float 3s ease-in-out infinite';
        quote.style.opacity = '0';
        quote.style.transition = 'opacity 1s';
        quote.style.zIndex = '5';

        quote.innerText = quotes[Math.floor(Math.random() * quotes.length)];

        document.body.appendChild(quote);

        setTimeout(() => quote.style.opacity = '0.9', 100);

        setTimeout(() => {
            quote.style.opacity = '0';
            setTimeout(() => quote.remove(), 1000);
        }, 4000);
    }
    setInterval(showRandomQuote, 8000);

    // --- Confetti Logic ---
    window.triggerConfetti = function () {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // --- Feature: Gift Reveal & Envelope Logic ---
    let envelope = null;
    window.initEnvelopeSystem = function () {
        envelope = document.getElementById('envelope');
        const btnOpen = document.getElementById('open');
        const btnReset = document.getElementById('reset');

        if (envelope && !envelope.hasAttribute('listener-added')) {
            envelope.addEventListener('click', openEnvelope);
            envelope.setAttribute('listener-added', 'true');
        }
        if (btnOpen) btnOpen.addEventListener('click', openEnvelope);
        if (btnReset) btnReset.addEventListener('click', closeEnvelope);

        // Modal Logic
        const previewLetter = document.getElementById('previewLetter');
        const readMoreHint = document.querySelector('.read-more-hint');
        const modal = document.getElementById('fullLetterModal');
        const closeModal = document.querySelector('.close-modal');
        const modalOverlay = document.querySelector('.modal-overlay');

        function openModal(e) {
            if (envelope && envelope.classList.contains('open')) {
                e.stopPropagation();
                modal.classList.add('visible');
            }
        }

        if (previewLetter) previewLetter.addEventListener('click', openModal);
        if (readMoreHint) readMoreHint.addEventListener('click', openModal);

        if (closeModal) {
            closeModal.addEventListener('click', () => { modal.classList.remove('visible'); });
        }
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) modal.classList.remove('visible');
            });
        }
    }

    function openEnvelope() {
        if (envelope) {
            if (envelope.classList.contains('open')) {
                // Already open, maybe open modal?
            }
            envelope.classList.add('open');
            envelope.classList.remove('close');
        }
    }

    function closeEnvelope() {
        if (envelope) {
            envelope.classList.add('close');
            envelope.classList.remove('open');
        }
    }

    // --- Feature: Reveal Gift Logic ---
    window.revealGift = function () {
        const giftSection = document.getElementById('giftSection');
        const envelopeArea = document.getElementById('envelope-area');
        giftSection.style.transition = 'opacity 0.5s';
        giftSection.style.opacity = '0';
        setTimeout(() => {
            giftSection.style.display = 'none';
            envelopeArea.style.display = 'block';
            if (window.initEnvelopeSystem) window.initEnvelopeSystem();
        }, 500);
    };

    // --- Feature: Mouse Heart Trail ---
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        createTrailHeart();
    });

    function createTrailHeart() {
        if (Math.random() > 0.3) return;
        const heart = document.createElement('div');
        heart.classList.add('trail-heart');
        heart.innerHTML = '❤️';
        heart.style.left = mouseX + 'px';
        heart.style.top = mouseY + 'px';
        heart.style.fontSize = Math.random() * 10 + 10 + 'px';
        document.body.appendChild(heart);
        setTimeout(() => {
            heart.style.transform = 'translateY(-20px) scale(0)';
            heart.style.opacity = '0';
        }, 50);
        setTimeout(() => { heart.remove(); }, 1000);
    }

    // --- Easter Eggs ---
    let heartClickCount = 0;
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('heart-particle') || e.target.classList.contains('trail-heart')) {
            heartClickCount++;
            if (heartClickCount === 10) {
                showToast('You found my secret. I love you! 🤫❤️');
                heartClickCount = 0;
            }
        }
    });

    function showToast(msg) {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = 'rgba(255, 107, 129, 0.9)';
        toast.style.color = 'white';
        toast.style.padding = '15px 30px';
        toast.style.borderRadius = '30px';
        toast.style.fontFamily = 'Fredoka One';
        toast.style.zIndex = '10000';
        toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        toast.innerHTML = msg;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.transition = 'opacity 1s';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 1000);
        }, 3000);
    }

    let keySequence = [];
    const secretCode = 'januu';
    document.addEventListener('keydown', (e) => {
        keySequence.push(e.key.toLowerCase());
        if (keySequence.length > secretCode.length) keySequence.shift();
        if (keySequence.join('') === secretCode) {
            if (typeof window.triggerConfetti === 'function') window.triggerConfetti();
            showToast('Yay! You typed my favv name! 🎉💖');
            keySequence = [];
        }
    });

    // --- Hug Interaction ---
    window.triggerHug = function () {
        const overlay = document.getElementById('hugOverlay');
        overlay.classList.add('active');
        overlay.onclick = function () { overlay.classList.remove('active'); };
    };

    // 4. Final Screen Heart Rain
    function startHeartRain() {
        const finalScreen = document.getElementById('finalScreen');
        if (!finalScreen) return;

        setInterval(() => {
            if (finalScreen.getBoundingClientRect().top < window.innerHeight) {
                const heart = document.createElement('div');
                heart.classList.add('heart-rain-particle');
                heart.innerHTML = '💖';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDuration = Math.random() * 2 + 3 + 's';
                finalScreen.appendChild(heart);

                setTimeout(() => heart.remove(), 5000);
            }
        }, 300);
    }
    startHeartRain();

    // --- Reasons Machine Logic ---
    const reasons = [
        "Because you make ordinary days feel special.",
        "Because talking to you feels easy.",
        "Because you feel like home.",
        "Because your laugh fixes my mood instantly.",
        "Because you make me feel calm.",
        "Because being with you feels right.",
        "Because you’re my favorite notification.",
        "Because you turn bad days into better ones.",
        "Because you’re beautiful inside and out.",
        "Because you’re patient with me.",
        "Because you show up.",
        "Because you make me feel understood.",
        "Because you’re genuinely you.",
        "Because your happiness matters to me.",
        "Because you make my heart feel safe.",
        "Because life is softer with you.",
        "Because you’re my favorite thought.",
        "Because you make me smile without trying.",
        "Because you feel like someone I want in my life.",
        "Because you’re my comfort person.",
        "Because loving you feels natural.",
        "Because you care, even when you don’t say much."
    ];
    const specialReasons = ["I could do this forever. 🥹💘", "Still not done loving you.", "I don’t run out of reasons.", "You are my favorite everything."];
    let reasonIndex = 0;
    let clickCountRatio = 0;

    const reasonsBtn = document.getElementById('reasonsBtn');
    const reasonsDisplay = document.getElementById('reasonDisplay');
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    shuffleArray(reasons);

    if (reasonsBtn && reasonsDisplay) {
        reasonsBtn.addEventListener('click', (e) => {
            createClickHeart(e.clientX, e.clientY);
            clickCountRatio++;
            let textToShow = '';
            if (clickCountRatio % (Math.floor(Math.random() * 3) + 5) === 0) {
                textToShow = specialReasons[Math.floor(Math.random() * specialReasons.length)];
                reasonsDisplay.style.color = '#FF4765';
            } else {
                textToShow = reasons[reasonIndex];
                reasonIndex = (reasonIndex + 1) % reasons.length;
                const colors = ['#5D4350', '#E60073', '#884DFF', '#FF6B81'];
                reasonsDisplay.style.color = colors[Math.floor(Math.random() * colors.length)];
            }
            reasonsDisplay.classList.remove('visible');
            setTimeout(() => {
                reasonsDisplay.innerText = textToShow;
                reasonsDisplay.classList.add('visible');
            }, 100);
        });
    }
    function createClickHeart(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('click-heart');
        heart.innerText = '💗';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }

    // --- Polaroid Logic ---
    const stackContainer = document.getElementById('polaroidContainer');
    console.log('Polaroid Container:', stackContainer);

    if (stackContainer) {
        console.log('Generating Polaroids...');
        photos.forEach((photo, index) => {
            const frame = document.createElement('div');
            frame.classList.add('polaroid-frame');

            // Random rotation between -10 and 10 deg
            const rotation = Math.random() * 20 - 10;
            frame.style.setProperty('--rotation', rotation + 'deg');
            frame.style.zIndex = index + 1;

            // Stagger position slightly
            const offsetX = Math.random() * 40 - 20;
            const offsetY = Math.random() * 40 - 20;
            frame.style.left = (Math.random() * 50) + 'px'; // Relative to container
            frame.style.top = (Math.random() * 50) + 'px';

            frame.innerHTML = `
                <img src="${photo.src}" class="polaroid-img" alt="Memory" loading="lazy" onerror="this.style.border='5px solid red'; console.error('Failed to load:', '${photo.src}')">
                <div class="polaroid-caption">${photo.caption}</div>
            `;

            stackContainer.appendChild(frame);

            // Double Click to Enlarge
            frame.addEventListener('dblclick', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openPhotoModal(photo.src, photo.caption);
            });

            // Drag Logic
            makeDraggable(frame);
        });
    } else {
        console.error('Polaroid Container NOT FOUND');
    }

    function makeDraggable(element) {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;
        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const style = window.getComputedStyle(element);
            initialLeft = parseFloat(style.left) || 0;
            initialTop = parseFloat(style.top) || 0;
            bringToFront(element);
            element.style.cursor = 'grabbing';
            e.preventDefault();
        });
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            element.style.left = (initialLeft + dx) + 'px';
            element.style.top = (initialTop + dy) + 'px';
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
            element.style.cursor = 'grab';
        });
    }
    let maxZ = 1000;
    function bringToFront(el) {
        maxZ++;
        el.style.zIndex = maxZ;
    }

    // --- Lyrics Sync ---
    const lyricsData = [
        { time: 0.05, text: "I want you to know that I'm never leaving" },
        { time: 3.0, text: "'Cause I'm Mrs. Snow, 'til death we'll be freezing" },
        { time: 6.9, text: "Yeah, you are my home, my home for all seasons" },
        { time: 10.0, text: "So come on, let's go" },
        { time: 13.0, text: "Let's go below zero and hide from the sun" },
        { time: 16.7, text: "I'll love you forever where we'll have some fun" },
        { time: 20.0, text: "Yes, let's hit the North Pole and live happily" },
        { time: 23.5, text: "Please don't cry no tears now, it's Christmas, baby ☃️" }
    ];

    // --- Lyrics Sync Feature & Dual Audio Logic ---
    // bgMusic and musicToggle are already defined at the top
    const snowmanAudio = document.getElementById('snowmanAudio');
    const toggleBtn = document.getElementById('lyricsToggle');
    const lyricsDisplay = document.getElementById('lyricsDisplay');

    // Create Debug Timer Element
    let debugTimer = document.createElement('div');
    debugTimer.id = 'debugTimer';
    debugTimer.style.cssText = "font-size: 10px; color: #ff6b81; opacity: 0.7; margin-top: 5px;";

    // Ensure loop
    if (bgMusic) bgMusic.loop = true;

    let isLyricsActive = false;
    let currentLyricIndex = -1;

    if (toggleBtn && bgMusic && snowmanAudio && lyricsDisplay) {
        toggleBtn.addEventListener('click', () => {
            isLyricsActive = !isLyricsActive;
            toggleBtn.classList.toggle('active');

            if (isLyricsActive) {
                // Enabled: Switch to Snowman
                bgMusic.pause();
                console.log("Adding snowman...");

                snowmanAudio.currentTime = 0;
                snowmanAudio.play().catch(e => console.error(e));

                lyricsDisplay.style.display = 'block';
                // Append timer if missing
                if (!document.getElementById('debugTimer')) lyricsDisplay.appendChild(debugTimer);

                toggleBtn.innerText = "⏹️ Stop Song";
                if (musicToggle) musicToggle.innerText = "🎵 Music: Paused (Lyrics Mode)";
            } else {
                // Disabled: Switch to BG
                snowmanAudio.pause();
                bgMusic.play().catch(e => console.error(e));

                lyricsDisplay.innerHTML = '';
                lyricsDisplay.style.display = 'none';
                toggleBtn.innerText = "🎵 This song reminds me of you";
                if (musicToggle) musicToggle.innerText = "🎵 Music: On";
            }
        });

        snowmanAudio.addEventListener('timeupdate', () => {
            if (!isLyricsActive) return;

            const currentTime = snowmanAudio.currentTime;
            debugTimer.innerText = `Time: ${currentTime.toFixed(1)}s`;

            // Ensure timer is visible
            if (!lyricsDisplay.contains(debugTimer)) lyricsDisplay.appendChild(debugTimer);

            let activeIndex = -1;

            for (let i = 0; i < lyricsData.length; i++) {
                if (currentTime >= lyricsData[i].time) {
                    activeIndex = i;
                } else {
                    break;
                }
            }

            if (activeIndex !== currentLyricIndex) {
                currentLyricIndex = activeIndex;
                if (currentLyricIndex !== -1) {
                    showLyric(lyricsData[currentLyricIndex].text);
                }
            }
        });

        snowmanAudio.addEventListener('ended', () => {
            // Auto revert when done
            isLyricsActive = false;
            toggleBtn.classList.remove('active');
            toggleBtn.innerText = "🎵 This song reminds me of you";
            lyricsDisplay.style.display = 'none';
            bgMusic.play();
            if (musicToggle) musicToggle.innerText = "🎵 Music: On";
        });
    }

    function showLyric(text) {
        // Clear everything but keep the debug timer if we want (actually showLyric clears innerHTML)
        // Let's rebuild carefully
        lyricsDisplay.innerHTML = '';

        const line = document.createElement('div');
        line.classList.add('lyric-line');
        line.innerText = text;

        lyricsDisplay.appendChild(line);
        lyricsDisplay.appendChild(debugTimer); // Re-append timer

        void line.offsetWidth;
        line.classList.add('active');
    }


    // --- Voice Note ---
    const playVoiceBtn = document.getElementById('playVoiceBtn');
    const voiceNoteAudio = document.getElementById('voiceNoteAudio');
    if (playVoiceBtn && voiceNoteAudio) {
        playVoiceBtn.addEventListener('click', () => {
            if (voiceNoteAudio.paused) {
                voiceNoteAudio.play();
                playVoiceBtn.innerHTML = '⏸️ Playing...';
                playVoiceBtn.classList.add('playing');
                if (bgMusic && !bgMusic.paused) bgMusic.pause();
            } else {
                voiceNoteAudio.pause();
                playVoiceBtn.innerHTML = '🎙️ Play my voice';
                playVoiceBtn.classList.remove('playing');
                if (bgMusic) bgMusic.play();
            }
        });
        voiceNoteAudio.addEventListener('ended', () => {
            playVoiceBtn.innerHTML = '🎙️ Play again';
            playVoiceBtn.classList.remove('playing');
            if (bgMusic) bgMusic.play();
        });
    }
});

// --- Global Functions (outside DOMContentLoaded) ---
window.showFuture = function (type) {
    const overlay = document.getElementById('promiseOverlay');
    const content = document.getElementById('promiseContent');
    if (!overlay || !content) return;
    content.innerHTML = '';
    if (type === 'dates') {
        content.innerHTML = `
    < h3 style = 'color:#FF6B81; font-family:"Fredoka One"' > Our Standard Date Plan 🗓️💖</h3 >
            <ul class='date-list'>
                <li class='stagger-item d-1'>🍕 Yummy food dates</li>
                <li class='stagger-item d-2'>🌆 Long late night talks</li>
                <li class='stagger-item d-3'>🎥 Movie nights</li>
                <li class='stagger-item d-4'>☕ Random coffee plans</li>
            </ul>
            <div class='stagger-item d-5' style='font-size: 0.9rem; color: #888; margin-bottom: 10px;'>Simple plans, perfect company.</div>
            <div class='promise-footer stagger-item d-long' style='text-shadow: 0 0 10px rgba(255,107,129,0.3);'>“Every date with you is my favorite one.”</div>
`;
    } else if (type === 'laughs') {
        for (let i = 0; i < 20; i++) createLaughEmoji();
        content.innerHTML = `
    < h3 style = 'color:#FF6B81; font-family:"Fredoka One"' > More Laughs < span class='bounce-title' >😂</span ></h3 >
            <p class='float-line d-1'>“Stealing your smile is my favorite habit.”</p>
            <p class='float-line d-2'>“Life’s funnier with you.”</p>
            <p class='float-line d-3'>“You laugh, and my day is fixed.”</p>
            <div class='promise-footer float-line d-4'>I promise to always make you laugh… even on bad days.</div>
            <div class='float-line d-5' style='margin-top:10px; font-size: 0.9rem;'>Your laugh is my favorite sound. 🎶</div>
`;
    } else if (type === 'us') {
        content.innerHTML = `
    < div class='heartbeat-text' >
                <h3 style='color:#FF6B81; font-family:"Fredoka One"'>More Us 💖</h3>
                <p class='heartbeat-line d-1'>More understanding.</p>
                <p class='heartbeat-line d-2'>More support.</p>
                <p class='heartbeat-line d-3'>More love.</p>
                <p class='heartbeat-line d-4 glow-text-sub'>More you & me.</p>
                <br>
                <p class='heartbeat-line d-final'><strong>Not just today. Always.</strong></p>
                <p class='heartbeat-line d-final' style='margin-top:15px; font-size:1.2rem;'>I love you, <span class='glow-name'>Januu</span> 💞</p>
            </div>
`;
    }
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.add('visible'), 10);
};

window.closePromise = function () {
    const overlay = document.getElementById('promiseOverlay');
    if (overlay) {
        overlay.classList.remove('visible');
        setTimeout(() => overlay.classList.add('hidden'), 500);
    }
};

window.openPhotoModal = function (src, caption) {
    const modal = document.getElementById('photoModal');
    const img = document.getElementById('modalImg');
    const cap = document.getElementById('modalCaption');
    if (modal && img && cap) {
        img.src = src;
        cap.innerText = caption;
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('visible'), 10);
    }
}

window.closePhotoModal = function () {
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.classList.remove('visible');
        setTimeout(() => modal.classList.add('hidden'), 400);
    }
}

function createLaughEmoji() {
    const emojis = ['😂', '😆', '💗', '✨', '🤣'];
    const el = document.createElement('div');
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    el.classList.add('laugh-emoji');
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
}

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (typeof window.closePhotoModal === 'function') window.closePhotoModal();
        if (typeof window.closePromise === 'function') window.closePromise();
        const letterModal = document.getElementById('fullLetterModal');
        if (letterModal) letterModal.classList.remove('visible');
        const hugOverlay = document.getElementById('hugOverlay');
        if (hugOverlay) hugOverlay.classList.remove('active');
    }
});

