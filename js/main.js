/* ==========================================================================
   INTERACTIVE ENGINE - NavGurukul Impact Report Website
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. STATE & DOM REFERENCES
    // ----------------------------------------------------------------------
    let currentSlide = 1;
    const totalSlides = 10;
    let isScrollMode = false;
    let typingTimer = null;

    // DOM Elements
    const body = document.body;
    const html = document.documentElement;
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const btnSlides = document.getElementById('btn-slides');
    const btnScroll = document.getElementById('btn-scroll');
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const timelineProgress = document.getElementById('timeline-progress');
    const timelineContainer = document.getElementById('timeline-container');
    const btnNotesToggle = document.getElementById('btn-notes-toggle');
    const btnNotesClose = document.getElementById('btn-notes-close');
    const notesDrawer = document.getElementById('notes-drawer');
    const notesContent = document.getElementById('notes-content');

    // Presenter Notes Database (Extracted & Enhanced from pptx)
    const speakerNotes = {
        1: `<h4>📍 Slide 1: Welcome & Landing</h4>
            <ul>
                <li><strong>Core Focus:</strong> Celebrate 1 year of massive building, student learning milestones, and deep personal transformation.</li>
                <li><strong>Context:</strong> Introduce NavGurukul's 2024-25 vision. Highlight that we are "Still Building" and expanding.</li>
                <li><strong>Key talking point:</strong> Focus on the students coding photo. This isn't just an academy; it's a launchpad for lifelong creators.</li>
            </ul>`,
        2: `<h4>📍 Slide 2: Supporting Students in DSA</h4>
            <ul>
                <li><strong>The DSA Philosophy:</strong> We break the fear of data structures and algorithms by integrating it with collaborative gamified platforms (like CodeChef).</li>
                <li><strong>IDE Typing Code Block:</strong> Explain the custom function <code>build_confidence()</code>:
                    <ul>
                        <li>We start with learning, which transitions to practice.</li>
                        <li>We encourage asking, which transitions to understanding.</li>
                        <li>We celebrate failing, which is the only way to grow 🚀.</li>
                    </ul>
                </li>
                <li><strong>Pillars:</strong> Highlight 1-on-1 peer mentoring and classroom problem-solving support.</li>
            </ul>`,
        3: `<h4>📍 Slide 3: Educational Content Creation</h4>
            <ul>
                <li><strong>Anish Jadav Memorial Foundation:</strong> Highlighting our active channel dedicated to democratizing software education.</li>
                <li><strong>Key Live Metrics:</strong> Over <strong>11,920+ views</strong>, <strong>88.9 watch hours</strong>, and growing with <strong>142+ subscribers</strong>!</li>
                <li><strong>Spotlight Feature:</strong> Point out our featured video tutorial: <em>CodeChef 227D - Q2. Bank Glitch</em> by Suraj, showing how we walk students step-by-step through tough algorithm concepts.</li>
                <li><strong>Presenter note:</strong> Mention how the analytics prove that audio/video-driven, highly visual content breaks the traditional text-heavy digital literacy barrier!</li>
            </ul>`,
        4: `<h4>📍 Slide 4: Campus Hackathons</h4>
            <ul>
                <li><strong>Dantewada (Innovation Hub 🔥):</strong> Hailing from remote areas, students built systems overnight, proving talent is universal given opportunity.</li>
                <li><strong>Pune (Mountain Builders ⛰️):</strong> Showcasing campus projects and engineering systems built locally.</li>
                <li><strong>Himachal (Multi-Campus synergy 🤝):</strong> Unifying campuses through joint brainstorming and coding nights.</li>
            </ul>`,
        5: `<h4>📍 Slide 5: Building Campus Learning Systems</h4>
            <ul>
                <li><strong>Learning Dashboards:</strong> Student-made tools tracking problem counts and progression.</li>
                <li><strong>Resolution Systems:</strong> Democratic internal ticket queues where students solve everyday challenges.</li>
                <li><strong>Empowerment:</strong> Highlight that campuses are student-run. Giving administrative authority builds strong leadership.</li>
            </ul>`,
        6: `<h4>📍 Slide 6: Year 1 Done, Next Year!</h4>
            <ul>
                <li><strong>Celebration point:</strong> Year 1 is successfully done! Give a pause for applause here.</li>
                <li><strong>Looking Ahead:</strong> The Next 1 Year will double down on reach. More students, larger campuses, and deeper industry integrations.</li>
                <li><strong>Mantra:</strong> "Bigger Dreams. More Students. More Fun!"</li>
            </ul>`,
        7: `<h4>📍 Slide 7: Structured DSA at Scale</h4>
            <ul>
                <li><strong>The Scale Vision:</strong> "Students teaching students" creates a recursive learning loop where knowledge spreads rapidly.</li>
                <li><strong>Simplified Videos:</strong> Visual, animated, completely zero jargon.</li>
                <li><strong>Easy Concepts:</strong> Deconstructing complex academic heavy-lifting into bite-sized visual workflows.</li>
            </ul>`,
        8: `<h4>📍 Slide 8: Global Hackathon Presence</h4>
            <ul>
                <li><strong>SVG Reach Map:</strong> Point out the pulsing markers on the map:
                    <ul>
                        <li><strong>Pune & Dantewada:</strong> Our core physical campuses.</li>
                        <li><strong>Online:</strong> Digital hackathons joining students from 15+ states.</li>
                        <li><strong>Global:</strong> Collaborative connections competing in international events.</li>
                    </ul>
                </li>
                <li><strong>Pulsers:</strong> Hover over markers to reveal custom stats.</li>
            </ul>`,
        9: `<h4>📍 Slide 9: Creating Go-Getter Students</h4>
            <ul>
                <li><strong>The Four Pillars of Outcomes:</strong>
                    <ul>
                        <li><strong>Get Jobs:</strong> Pushing technical and logical excellence for corporate roles (85% progress).</li>
                        <li><strong>Start Startups:</strong> Turning engineers into builders of custom solutions (70% progress).</li>
                        <li><strong>Build Businesses:</strong> Creating local software services, agencies, and consultancies (75% progress).</li>
                        <li><strong>Take Initiative:</strong> Developing leadership and self-reliance (90% progress).</li>
                    </ul>
                </li>
            </ul>`,
        10: `<h4>📍 Slide 10: Conclusion & Still Building</h4>
             <ul>
                 <li><strong>Summary statements:</strong> Recap the core themes: More Builders. More Confidence. More Opportunities.</li>
                 <li><strong>Closing note:</strong> Reiterate the "Still Building 😊" tagline. We are committed to continuing the hard work in 2024-25.</li>
                 <li>Invite questions and comments from the audience.</li>
             </ul>`
    };

    // ----------------------------------------------------------------------
    // 2. SLIDE NAVIGATION ENGINE (Slideshow Mode)
    // ----------------------------------------------------------------------
    function goToSlide(index) {
        if (isScrollMode) return;
        
        // Boundaries
        if (index < 1) index = 1;
        if (index > totalSlides) index = totalSlides;
        
        currentSlide = index;

        // Reset slide classes
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Activate slide
        const activeSlideElement = document.getElementById(`slide-${currentSlide}`);
        if (activeSlideElement) {
            activeSlideElement.classList.add('active');
            // Scroll slide content to top
            activeSlideElement.scrollTop = 0;
        }

        // Update Timeline progress bar
        const progressPercentage = ((currentSlide - 1) / (totalSlides - 1)) * 100;
        timelineProgress.style.width = `${progressPercentage}%`;

        // Update timeline markers active states
        const markers = document.querySelectorAll('.timeline-marker');
        markers.forEach((marker, idx) => {
            if (idx + 1 <= currentSlide) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });

        // Trigger Animations specific to Slide
        handleSlideTransitions(currentSlide);
        
        // Update Speaker notes
        updateSpeakerNotes(currentSlide);
    }

    function nextSlide() {
        if (currentSlide < totalSlides) {
            goToSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if (currentSlide > 1) {
            goToSlide(currentSlide - 1);
        }
    }

    // Dynamic timeline marker setup
    function setupTimeline() {
        timelineContainer.innerHTML = '<div class="timeline-progress" id="timeline-progress"></div>';
        const dynamicProgress = timelineContainer.querySelector('#timeline-progress');
        
        for (let i = 1; i <= totalSlides; i++) {
            const marker = document.createElement('div');
            marker.className = 'timeline-marker';
            marker.style.left = `${((i - 1) / (totalSlides - 1)) * 100}%`;
            marker.setAttribute('data-target', i);
            marker.title = `Jump to slide ${i}`;
            
            // Timeline marker click jump
            marker.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(i);
            });

            timelineContainer.appendChild(marker);
        }
        
        // Timeline container background click jump
        timelineContainer.addEventListener('click', (e) => {
            const rect = timelineContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const targetSlide = Math.min(totalSlides, Math.max(1, Math.round(percentage * (totalSlides - 1)) + 1));
            goToSlide(targetSlide);
        });
    }

    // ----------------------------------------------------------------------
    // 3. SPECIAL INTERACTIVE BEHAVIORS
    // ----------------------------------------------------------------------
    function handleSlideTransitions(slideIndex) {
        // Clear IDE typing timer on exit
        if (typingTimer) {
            clearInterval(typingTimer);
            typingTimer = null;
        }

        if (slideIndex === 2) {
            // Restart Slide 2 IDE typing animation loop
            runIDETypingAnimation();
        }
    }

    // IDE typing code mockup
    function runIDETypingAnimation() {
        const codeElement = document.getElementById('typing-code');
        const codeString = `def build_confidence():\n    learning = "learn" → "practice"\n    asking = "ask" → "understand"\n    failing = "fail" → "grow 🚀"\n    \n    return learning & asking & failing`;
        
        codeElement.innerHTML = '';
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < codeString.length) {
                const char = codeString.charAt(charIndex);
                if (char === '\n') {
                    codeElement.innerHTML += '<br>';
                } else if (char === ' ') {
                    codeElement.innerHTML += '&nbsp;';
                } else {
                    codeElement.innerHTML += char;
                }
                charIndex++;
                // Random typing rhythm latency (40ms - 80ms)
                setTimeout(typeChar, Math.random() * 40 + 40);
            } else {
                // Formatting syntax highlighting after typing finishes
                formatSyntaxHighlighting(codeElement);
            }
        }
        
        typeChar();
    }

    function formatSyntaxHighlighting(element) {
        let text = element.innerHTML;
        
        // Apply tags to keywords, functions, string and operators
        text = text.replace(/(def|return)/g, '<span class="keyword">$1</span>');
        text = text.replace(/(build_confidence)/g, '<span class="function">$1</span>');
        text = text.replace(/("(learn)"|"(practice)"|"(ask)"|"(understand)"|"(fail)"|"(grow 🚀)")/g, '<span class="string">$1</span>');
        text = text.replace(/(→|&amp;)/g, '<span class="operator">$1</span>');
        
        element.innerHTML = text;
    }

    // ----------------------------------------------------------------------
    // 4. SVG WORLD MAP INTERACTIVE DETAILS
    // ----------------------------------------------------------------------
    const mapHotspots = document.querySelectorAll('.map-hotspot');
    const mapTooltip = document.getElementById('map-tooltip');

    mapHotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseenter', (e) => {
            const infoText = hotspot.getAttribute('data-info');
            mapTooltip.innerHTML = infoText;
            mapTooltip.style.borderColor = getComputedStyle(hotspot.querySelector('.pulse-dot')).fill;
            mapTooltip.style.color = '#fff';
            mapTooltip.style.background = 'rgba(15, 23, 42, 0.85)';
        });

        hotspot.addEventListener('mouseleave', () => {
            mapTooltip.innerHTML = 'Hover over a location marker to explore details!';
            mapTooltip.style.borderColor = 'var(--border-color)';
            mapTooltip.style.color = 'var(--text-secondary)';
            mapTooltip.style.background = 'var(--bg-surface)';
        });
        
        hotspot.addEventListener('click', () => {
            const infoText = hotspot.getAttribute('data-info');
            mapTooltip.innerHTML = `🌟 <strong>Details:</strong> ${infoText}`;
        });
    });

    // ----------------------------------------------------------------------
    // 5. HYBRID MODE TOGGLES (Slides vs Continuous Scroll Report)
    // ----------------------------------------------------------------------
    function setScrollMode(active) {
        isScrollMode = active;
        if (isScrollMode) {
            body.classList.add('scroll-mode');
            btnScroll.classList.add('active');
            btnSlides.classList.remove('active');
            
            // Clean up active styles
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Enable scrolling
            body.style.overflowY = 'auto';
            body.style.height = 'auto';
            
            // Presenter drawer must close
            notesDrawer.classList.remove('open');
            
            // Trigger syntax highlighting on slide 2 permanently for report view
            const codeElement = document.getElementById('typing-code');
            if (codeElement) {
                codeElement.innerHTML = `def build_confidence():\n    learning = "learn" → "practice"\n    asking = "ask" → "understand"\n    failing = "fail" → "grow 🚀"\n    \n    return learning & asking & failing`;
                formatSyntaxHighlighting(codeElement);
            }
        } else {
            body.classList.remove('scroll-mode');
            btnSlides.classList.add('active');
            btnScroll.classList.remove('active');
            
            // Lock scrolling
            body.style.overflow = 'hidden';
            body.style.height = '100vh';
            
            // Go to current slide
            goToSlide(currentSlide);
        }
    }

    btnSlides.addEventListener('click', () => setScrollMode(false));
    btnScroll.addEventListener('click', () => setScrollMode(true));

    // ----------------------------------------------------------------------
    // 6. DYNAMIC PRESENTATION REFERENCE SPEAKERS NOTES
    // ----------------------------------------------------------------------
    function updateSpeakerNotes(slideIndex) {
        const notes = speakerNotes[slideIndex] || '<p>No speaker notes for this slide.</p>';
        notesContent.innerHTML = notes;
    }

    btnNotesToggle.addEventListener('click', () => {
        notesDrawer.classList.toggle('open');
    });

    btnNotesClose.addEventListener('click', () => {
        notesDrawer.classList.remove('open');
    });

    // ----------------------------------------------------------------------
    // 7. GLOBAL THEME MANAGER (Dark & Light Mode Toggle)
    // ----------------------------------------------------------------------
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', targetTheme);
        
        if (targetTheme === 'light') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    themeToggle.addEventListener('click', toggleTheme);

    // ----------------------------------------------------------------------
    // 8. FULLSCREEN MODE ENGINE
    // ----------------------------------------------------------------------
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error enabling fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    btnFullscreen.addEventListener('click', toggleFullscreen);

    // ----------------------------------------------------------------------
    // 9. KEYBOARD & MOBILE ACTION EVENT LISTENERS
    // ----------------------------------------------------------------------
    window.addEventListener('keydown', (e) => {
        if (isScrollMode) return;
        
        switch (e.key) {
            case 'ArrowRight':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'PageUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides);
                break;
        }
    });

    // Mobile touch gestures swipe listeners
    let touchStartX = 0;
    let touchEndX = 0;

    window.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        if (isScrollMode) return;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50; // swipe minimum distance in pixels
        if (touchStartX - touchEndX > threshold) {
            // Swiped Left -> Next Slide
            nextSlide();
        } else if (touchEndX - touchStartX > threshold) {
            // Swiped Right -> Previous Slide
            prevSlide();
        }
    }

    // ----------------------------------------------------------------------
    // 10. INITIALIZATION
    // ----------------------------------------------------------------------
    setupTimeline();
    goToSlide(1);
});
