document.addEventListener("DOMContentLoaded", function() {
    const sliderContent = [
        "Echoes",
        "Odyssey",
        "Cracker",
        "Dystopia"
    ];

    const slider = document.querySelector(".slider");
    let activeSlide = 0;
    const imagePath = "./assets/"; // Base path for your images

    document.addEventListener("click", function() {
        const currentSlide = slider.querySelector(".slide:not(.exiting)");
        const slideTheme = activeSlide % 2 ? "dark" : "light";
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

        const newSlide = document.createElement("div");
        newSlide.classList.add("slide");
        newSlide.classList.add(slideTheme);
        newSlide.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

        const newSlideImg1 = document.createElement("div");
        newSlideImg1.className = "slide-img slide-img-1";
        const img1 = document.createElement("img");
        img1.src = `${imagePath}slider-${activeSlide + 1}-1.webp`; // Example: ./assets/slider-1-1.jpg
        img1.style.top = "100%";
        newSlideImg1.appendChild(img1);
        newSlide.appendChild(newSlideImg1);

        const newSlideContent = document.createElement("div");
        newSlideContent.classList.add("slide-content");
        newSlideContent.innerHTML = `<h1>${sliderContent[activeSlide]}</h1>`;
        newSlide.appendChild(newSlideContent);

        const newSlideImg2 = document.createElement("div");
        newSlideImg2.className = "slide-img slide-img-2";
        const img2 = document.createElement("img");
        img2.src = `${imagePath}slider-${activeSlide + 1}-2.webp`; // Example: ./assets/slider-1-2.jpg
        img2.style.top = "100%";
        newSlideImg2.appendChild(img2);
        newSlide.appendChild(newSlideImg2);

        slider.appendChild(newSlide);



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
                removeExtraSlides(slider);
            }
        });

        gsap.to(".slide-content h1", {
            scale: 1,
            duration: 1.5,
            ease: "power4.inOut"
        });
    });

    function removeExtraSlides(container) {
        while (container.children.length > 5) {
            container.removeChild(container.firstChild);
        }
    }
});
