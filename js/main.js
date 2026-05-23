/* ==========================================================================
   INTERACTIVE ENGINE - NavGurukul Impact Report Website
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. STATE & DOM REFERENCES
    // ----------------------------------------------------------------------
    let currentSlide = 1;
    const totalSlides = 12;
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
        5: `<h4>📍 Slide 5: Samadhan Campus Issue Tracker App</h4>
            <ul>
                <li><strong>The Product:</strong> Highlight that Samadhan was fully engineered and designed by our students to run the campus.</li>
                <li><strong>Dynamic Demonstration:</strong> Direct attention to the three mobile screens playing real app screen recordings:
                    <ul>
                        <li><strong>Screen 1 (Issue List):</strong> Shows reported issues, category badges, and detail logs.</li>
                        <li><strong>Screen 2 (Creating Tickets):</strong> Shows how quickly and easily a student can file a campus bug.</li>
                        <li><strong>Screen 3 (Resolution Pipeline):</strong> Real-time pipeline to assign and close tickets in minutes.</li>
                    </ul>
                </li>
                <li><strong>Leadership Outcome:</strong> Giving administrative keys and coding ownership transforms students into capable builders!</li>
            </ul>`,
        6: `<h4>📍 Slide 6: Campus Pulse Dashboard</h4>
            <ul>
                <li><strong>The Product:</strong> Show the live website <code>https://residentialpulse.navgurukul.org/</code>.</li>
                <li><strong>Dynamic Controls:</strong> Toggle between campuses (Pune, Dantewada, Dharamshala, Bengaluru) and months (March, April, May 2026) to see how the metrics animate.</li>
                <li><strong>Key Indicators:</strong> Highlight student happiness, academics, meals rating, and facility uptime.</li>
                <li><strong>Value:</strong> Complete transparency of campus operations, driven directly by student entries and feedback.</li>
            </ul>`,
        7: `<h4>📍 Slide 7: AI Learning Labs — Ella & Zoe</h4>
            <ul>
                <li><strong>The Initiative:</strong> AI Learning Labs is building custom models and language learning agents for kids from vernacular mediums.</li>
                <li><strong>Ella App:</strong> AI-powered English learning app. Mention the link <code>https://ella.navgurukul.org/</code> for students to download the APK.</li>
                <li><strong>Zoe AI Assistant:</strong> Explain that Zoe (live at <code>https://zoe.zuvy.org/</code>) conducts voice and chat assessments to understand the student's level and guide them interactively.</li>
                <li><strong>Interactive chat box:</strong> Direct the audience's attention to the simulated chat on the screen and trigger a chip options demo!</li>
            </ul>`,
        8: `<h4>📍 Slide 8: Year 1 Done, Next Year!</h4>
            <ul>
                <li><strong>Celebration point:</strong> Year 1 is successfully done! Give a pause for applause here.</li>
                <li><strong>Looking Ahead:</strong> The Next 1 Year will double down on reach. More students, larger campuses, and deeper industry integrations.</li>
                <li><strong>Mantra:</strong> "Bigger Dreams. More Students. More Fun!"</li>
            </ul>`,
        9: `<h4>📍 Slide 9: Structured DSA at Scale</h4>
            <ul>
                <li><strong>The Scale Vision:</strong> "Students teaching students" creates a recursive learning loop where knowledge spreads rapidly.</li>
                <li><strong>Simplified Videos:</strong> Visual, animated, completely zero jargon.</li>
                <li><strong>Easy Concepts:</strong> Deconstructing complex academic heavy-lifting into bite-sized visual workflows.</li>
            </ul>`,
        10: `<h4>📍 Slide 10: Global Hackathon Presence</h4>
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
        11: `<h4>📍 Slide 11: Creating Go-Getter Students</h4>
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
        12: `<h4>📍 Slide 12: Conclusion & Still Building</h4>
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
    // 9.5. CAMPUS PULSE DASHBOARD INTERACTION (Slide 6)
    // ----------------------------------------------------------------------
    const pulseData = {
        pune: {
            mar24: { happiness: "8.7 / 10", academics: "82%", meals: "4.2 / 5.0", facilities: "90%", summary: "March 2024 Summary: Transitioned to new classrooms. Internet had brief downtime. 3 code contests completed." },
            oct24: { happiness: "9.0 / 10", academics: "85%", meals: "4.4 / 5.0", facilities: "94%", summary: "October 2024 Summary: Improved electricity backup installed. New coding bootcamp launched. Peer learning sessions up by 20%." },
            may25: { happiness: "9.2 / 10", academics: "88%", meals: "4.5 / 5.0", facilities: "96%", summary: "May 2025 Summary: Excellent internet stability. Meals rated highly with student-led menu adjustments. 5 students completed advanced DSA modules." }
        },
        dantewada: {
            mar24: { happiness: "8.9 / 10", academics: "80%", meals: "4.5 / 5.0", facilities: "88%", summary: "March 2024 Summary: Tribal innovation projects launched. Solar backup system operational. Meals highly appreciated." },
            oct24: { happiness: "9.1 / 10", academics: "84%", meals: "4.6 / 5.0", facilities: "90%", summary: "October 2024 Summary: 24-hour hackathon successfully organized. Student council elections completed. Minor water supply maintenance." },
            may25: { happiness: "9.3 / 10", academics: "89%", meals: "4.7 / 5.0", facilities: "92%", summary: "May 2025 Summary: Excellent student feedback. 10 new learners started React framework projects. Water and internet stable." }
        },
        dharamshala: {
            mar24: { happiness: "9.0 / 10", academics: "86%", meals: "4.0 / 5.0", facilities: "95%", summary: "March 2024 Summary: Cool mountain weather kept energy high. Focus on database courses. Internet speed upgraded to 100 Mbps." },
            oct24: { happiness: "9.1 / 10", academics: "88%", meals: "4.2 / 5.0", facilities: "96%", summary: "October 2024 Summary: Cleanliness drive organized. Outdoor group learning sessions. Academic speed is optimal." },
            may25: { happiness: "9.4 / 10", academics: "91%", meals: "4.4 / 5.0", facilities: "98%", summary: "May 2025 Summary: 98% internet uptime. Students launched two public web apps. Kitchen menu revised with summer cooling drinks." }
        },
        bengaluru: {
            mar24: { happiness: "8.6 / 10", academics: "85%", meals: "4.1 / 5.0", facilities: "92%", summary: "March 2024 Summary: Campus expansion completed. Commenced tech mentorship with corporate volunteers. Heavy emphasis on project work." },
            oct24: { happiness: "8.8 / 10", academics: "87%", meals: "4.2 / 5.0", facilities: "93%", summary: "October 2024 Summary: Mock interview prep launched. Uptime remains stable. Meal feedback reviewed for regional diversity." },
            may25: { happiness: "9.0 / 10", academics: "90%", meals: "4.4 / 5.0", facilities: "95%", summary: "May 2025 Summary: 5 students placed in local startups. New node.js syllabus introduced. Student happiness at record high." }
        }
    };

    const monthFormatNames = {
        mar24: "Mar 2024",
        oct24: "Oct 2024",
        may25: "May 2025"
    };

    let selectedCampus = 'pune';
    let selectedMonth = 'may25';

    function updatePulseDashboard() {
        const data = pulseData[selectedCampus][selectedMonth];
        if (!data) return;

        // Update Text
        const happinessEl = document.getElementById('val-happiness');
        const academicsEl = document.getElementById('val-academics');
        const mealsEl = document.getElementById('val-meals');
        const facilitiesEl = document.getElementById('val-facilities');
        const summaryEl = document.getElementById('dashboard-summary');
        const displayEl = document.getElementById('dashboard-campus-display');

        if (happinessEl) happinessEl.innerText = data.happiness;
        if (academicsEl) academicsEl.innerText = data.academics;
        if (mealsEl) mealsEl.innerText = data.meals;
        if (facilitiesEl) facilitiesEl.innerText = data.facilities;
        if (summaryEl) summaryEl.innerHTML = `<strong>${monthFormatNames[selectedMonth]} Summary:</strong> ${data.summary.split(': ')[1]}`;
        if (displayEl) displayEl.innerText = `${selectedCampus.charAt(0).toUpperCase() + selectedCampus.slice(1)} - ${monthFormatNames[selectedMonth]}`;

        // Update Progress Bars
        const happinessPercent = parseFloat(data.happiness.split(' ')[0]) * 10;
        const academicsPercent = parseInt(data.academics);
        const mealsPercent = parseFloat(data.meals.split(' ')[0]) * 20;
        const facilitiesPercent = parseInt(data.facilities);

        const barHappiness = document.getElementById('bar-happiness');
        const barAcademics = document.getElementById('bar-academics');
        const barMeals = document.getElementById('bar-meals');
        const barFacilities = document.getElementById('bar-facilities');

        if (barHappiness) barHappiness.style.width = `${happinessPercent}%`;
        if (barAcademics) barAcademics.style.width = `${academicsPercent}%`;
        if (barMeals) barMeals.style.width = `${mealsPercent}%`;
        if (barFacilities) barFacilities.style.width = `${facilitiesPercent}%`;
    }

    function initPulseControls() {
        const campusBtns = document.querySelectorAll('.campus-sel-btn');
        campusBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                campusBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedCampus = btn.getAttribute('data-campus');
                updatePulseDashboard();
            });
        });

        const monthBtns = document.querySelectorAll('.month-sel-btn');
        monthBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                monthBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedMonth = btn.getAttribute('data-month');
                updatePulseDashboard();
            });
        });
        
        updatePulseDashboard();
    }

    // ----------------------------------------------------------------------
    // 9.6. AI LABS CHAT SIMULATOR (Slide 7)
    // ----------------------------------------------------------------------
    const chatMessages = document.getElementById('chat-messages-container');
    const chatChipsContainer = document.getElementById('chat-chips');

    const conversationFlow = {
        start: {
            chips: [
                { text: "Beginner coder 💻", response: "I am a beginner and just started coding!", next: "beginner" },
                { text: "Built simple apps 🚀", response: "I built a couple of simple apps already.", next: "experienced" },
                { text: "Algorithm lover 🧠", response: "I enjoy solving math and algorithm puzzles.", next: "algorithm" }
            ]
        },
        beginner: {
            reply: "That is wonderful! Coding is like a superpower. Let's write a simple sentence to describe your daily schedule at campus.",
            chips: [
                { text: "I practice coding daily. 💻", response: "I wake up early and practice coding daily.", next: "final" },
                { text: "I attend DSA sessions. 🧠", response: "I attend interactive DSA sessions after breakfast.", next: "final" }
            ]
        },
        experienced: {
            reply: "Impressive! What technologies or tools did you use to build them? Tell me in English!",
            chips: [
                { text: "Python & HTML/CSS 🛠️", response: "I used Python for backend logic and HTML/CSS for layouts.", next: "final" },
                { text: "Mobile UI & APIs 📱", response: "I designed responsive mobile interfaces and simple API routes.", next: "final" }
            ]
        },
        algorithm: {
            reply: "Ah, an analytical mind! How do you feel when you solve a hard logic problem? Let's describe that feeling in English.",
            chips: [
                { text: "Proud & excited! 😄", response: "I feel very proud and excited!", next: "final" },
                { text: "Motivated for more! 🔥", response: "I feel motivated to solve even more complex puzzles.", next: "final" }
            ]
        },
        final: {
            reply: "Awesome job! Your sentence structure is excellent. Keep talking and practicing. Try the live Ella app or chat with me anytime!",
            chips: [
                { text: "Restart conversation 🔄", response: "Let's start over!", next: "start" },
                { text: "Tell me a joke! 😄", response: "Tell me a joke, Zoe!", next: "joke" }
            ]
        },
        joke: {
            reply: "Why did the computer go to the doctor? ... Because it had a virus! 💻😄",
            chips: [
                { text: "Restart conversation 🔄", response: "Let's start over!", next: "start" }
            ]
        }
    };

    function appendChatMessage(sender, text) {
        if (!chatMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.innerHTML = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function renderChatChips(flowKey) {
        if (!chatChipsContainer) return;
        chatChipsContainer.innerHTML = '';
        
        const flow = conversationFlow[flowKey];
        if (!flow || !flow.chips) return;

        flow.chips.forEach(chip => {
            const btn = document.createElement('button');
            btn.className = 'chat-chip';
            btn.innerText = chip.text;
            btn.addEventListener('click', () => {
                // 1. Append User Message
                appendChatMessage('user', chip.response);
                
                // 2. Clear Chips
                chatChipsContainer.innerHTML = '';
                
                // 3. Show Bot Typing Indicator
                const typingDiv = document.createElement('div');
                typingDiv.className = 'chat-msg bot typing-msg';
                typingDiv.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
                chatMessages.appendChild(typingDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // 4. Trigger Bot Response
                setTimeout(() => {
                    // Remove typing indicator
                    const typingIndicator = chatMessages.querySelector('.typing-msg');
                    if (typingIndicator) typingIndicator.remove();

                    if (chip.next === 'start') {
                        // Reset conversation
                        chatMessages.innerHTML = `<div class="chat-msg bot">Hello! I am Zoe, your English learning companion. Let's start! How would you describe your coding journey so far?</div>`;
                        renderChatChips('start');
                    } else {
                        const nextFlow = conversationFlow[chip.next];
                        appendChatMessage('bot', nextFlow.reply);
                        renderChatChips(chip.next);
                    }
                }, 1200);
            });
            chatChipsContainer.appendChild(btn);
        });
    }

    function initChatControls() {
        renderChatChips('start');
    }

    // ----------------------------------------------------------------------
    // 10. INITIALIZATION
    // ----------------------------------------------------------------------
    initPulseControls();
    initChatControls();
    setupTimeline();
    goToSlide(1);
});
