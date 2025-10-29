document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.main-content section');
    const navLinks = document.querySelectorAll('.top-nav a');
    const headerElement = document.getElementById('top');
    const backgroundImg = document.querySelector('.profile-background-visual .background-img');
    const backgroundOverlay = document.querySelector('.profile-background-visual .background-overlay');
    const profileHandle = document.querySelector('.profile-handle');
    const entranceOverlay = document.getElementById('entrance-overlay');

    const rotatingTexts = ["IT Support", "Web Developer", "Trainer", "Network Support & Troubleshooting"];
    let currentTextIndex = 0;

    const getCssVar = (varName) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(varName));
    const fadeStartScroll = getCssVar('--fade-start-scroll');
    const fadeEndScroll = getCssVar('--fade-end-scroll');
    const navHeight = getCssVar('--nav-height');

    const getScrollOffset = () => {
        return navHeight;
    };

    const setActiveLink = () => {
        let currentActiveSectionId = null;
        const scrollY = window.pageYOffset;
        const offsetThreshold = getScrollOffset();

        const headerBottom = headerElement.offsetHeight - navHeight;
        if (scrollY < headerBottom) {
            currentActiveSectionId = 'top';
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const sectionTop = section.getBoundingClientRect().top + scrollY;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollY + offsetThreshold >= sectionTop && scrollY + offsetThreshold < sectionBottom) {
                    currentActiveSectionId = section.id;
                    break;
                }
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkTargetId = link.getAttribute('href').substring(1);

            if (linkTargetId === currentActiveSectionId) {
                link.classList.add('active');
            }
        });
    };

    const handleHeaderScroll = () => {
        const scrollY = window.pageYOffset;

        let opacityFactor = 1;
        if (scrollY > fadeStartScroll) {
            opacityFactor = 1 - (scrollY - fadeStartScroll) / (fadeEndScroll - fadeStartScroll);
            if (opacityFactor < 0) opacityFactor = 0;
        } else {
            opacityFactor = 1;
        }

        backgroundImg.style.opacity = opacityFactor;
        backgroundOverlay.style.opacity = opacityFactor;
    };

    const animateText = () => {
        profileHandle.style.opacity = 0;
        setTimeout(() => {
            currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;
            profileHandle.textContent = rotatingTexts[currentTextIndex];
            profileHandle.style.opacity = 1;
        }, 500);
    };

    // Entrance animation logic
    setTimeout(() => {
        entranceOverlay.classList.add('fade-out');
    }, 2000);

    // Fade in sections on scroll
    const fadeInSections = document.querySelectorAll('.main-content section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeInSections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    window.addEventListener('scroll', () => {
        setActiveLink();
        handleHeaderScroll();
    });

    // Initial calls
    setActiveLink();
    handleHeaderScroll();
    animateText();

    setInterval(animateText, 2000);
});
