document.addEventListener("DOMContentLoaded", function () {
    const sliderContent = [
        {
            title: "Echoes",
            images: [
                "./assets/echoes-1.jpg",
                "./assets/echoes-2.jpg"
            ]
        },
        {
            title: "Odyssey",
            images: [
                "./assets/odyssey-1.jpg",
                "./assets/odyssey-2.jpg"
            ]
        },
        {
            title: "Cracker",
            images: [
                "./assets/cracker-1.jpg",
                "./assets/cracker-2.jpg"
            ]
        },
        {
            title: "Dystopia",
            images: [
                "./assets/wasteland-1.jpg",
                "./assets/wasteland-2.jpg"
            ]
        }
    ];

    let activeSlide = 0;

    function createNewSlide(index) {
        const slideTheme = index % 2 ? "light" : "dark";
        const slideData = sliderContent[index];

        const newSlide = document.createElement("div");
        newSlide.classList.add("slide");
        newSlide.classList.add(slideTheme);
        newSlide.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

        const newSlideImg1 = document.createElement("div");
        newSlideImg1.className = "slide-img slide-img-1";
        const img1 = document.createElement("img");
        img1.src = slideData.images[0];
        img1.style.top = "100%";
        newSlideImg1.appendChild(img1);
        newSlide.appendChild(newSlideImg1);

        const newSlideContent = document.createElement("div");
        newSlideContent.classList.add("slide-content");
        newSlideContent.innerHTML = `<h1>${slideData.title}</h1>`;
        newSlide.appendChild(newSlideContent);

        const newSlideImg2 = document.createElement("div");
        newSlideImg2.className = "slide-img slide-img-2";
        const img2 = document.createElement("img");
        img2.src = slideData.images[1];
        img2.style.top = "100%";
        newSlideImg2.appendChild(img2);
        newSlide.appendChild(newSlideImg2);

        // Add pagination element
        const pagination = document.createElement("div");
        pagination.classList.add("pagination");
        pagination.innerHTML = `
            <span class="current-slide">${index + 1}</span>
            <div class="line"><hr/></div>
            <span class="total-slides">${sliderContent.length}</span>
        `;
        newSlide.appendChild(pagination);

        return newSlide;
    }

    function initializeSlider() {
        const mainContent = document.getElementById("main-content");

        const initialSlide = createNewSlide(activeSlide);
        mainContent.appendChild(initialSlide);

        const img1 = initialSlide.querySelector(".slide-img-1 img");
        const img2 = initialSlide.querySelector(".slide-img-2 img");

        gsap.to(initialSlide, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "power4.inOut",
            onStart: () => {
                gsap.to([img1, img2], {
                    top: "50%",
                    duration: 1.5,
                    ease: "power4.inOut"
                });
            }
        });

        gsap.fromTo(initialSlide.querySelector("h1"), {
            scale: 1.5
        }, {
            scale: 1,
            duration: 1.5,
            ease: "power4.inOut"
        });
    }

    function showMainContent() {
        const preloader = document.getElementById("preloader");
        const mainContent = document.getElementById("main-content");

        // Animate out the preloader
        gsap.to(preloader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                preloader.style.display = "none";
                gsap.to(mainContent, {
                    opacity: 1,
                    duration: 0.5,
                    onStart: () => {
                        mainContent.classList.remove("hidden");
                    },
                    onComplete: initializeSlider // Initialize slider after main content is fully visible
                });
            }
        });
    }

    function simulateLoading() {
        let percentage = 0;
        const loadingText = document.getElementById("loading-text");

        const loadingInterval = setInterval(() => {
            percentage += 1;
            loadingText.textContent = `${percentage}%`;

            if (percentage >= 100) {
                clearInterval(loadingInterval);
                showMainContent();
            }
        }, 10); // Adjust this value for faster or slower loading simulation
    }

    simulateLoading();

    // Slider functionality
    document.addEventListener("click", function () {
        const mainContent = document.getElementById("main-content");
        const currentSlide = mainContent.querySelector(".slide:not(.exiting)");
        activeSlide = (activeSlide + 1) % sliderContent.length;

        if (currentSlide) {
            const existingImgs = currentSlide.querySelectorAll("img");
            gsap.to(existingImgs, {
                top: "0%",
                duration: 1.5,
                ease: "power4.inOut"
            });
            currentSlide.classList.add("exiting");
        }

        const newSlide = createNewSlide(activeSlide);
        mainContent.appendChild(newSlide);

        const [img1, img2] = newSlide.querySelectorAll("img");
        gsap.to(newSlide, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "power4.inOut",
            onStart: () => {
                gsap.to([img1, img2], {
                    top: "50%",
                    duration: 1.5,
                    ease: "power4.inOut"
                });
            },
            onComplete: () => {
                removeExtraSlide(mainContent);
            }
        });

        gsap.fromTo(newSlide.querySelector("h1"), {
            scale: 1.5
        }, {
            scale: 1,
            duration: 1.5,
            ease: "power4.inOut"
        });
    });

});
