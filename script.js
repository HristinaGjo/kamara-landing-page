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
            title: "Wasteland",
            images: [
                "./assets/wasteland-1.jpg",
                "./assets/wasteland-2.jpg"
            ]
        }
    ];

    const slider = document.querySelector(".slider");
    let activeSlide = 0;

    function createNewSlide(index) {
        const slideTheme = index % 2  ? "light" : "dark";
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
        newSlideContent.innerHTML = `
            <h1>${slideData.title}</h1>
            <div class="pagination">
                <span class="current-slide">${index + 1}</span>
                <div class="line">
                    <hr/>
                </div>
                <span class="total-slides">${sliderContent.length}</span>
            </div>
        `;
        newSlide.appendChild(newSlideContent);

        const newSlideImg2 = document.createElement("div");
        newSlideImg2.className = "slide-img slide-img-2";
        const img2 = document.createElement("img");
        img2.src = slideData.images[1];
        img2.style.top = "100%";
        newSlideImg2.appendChild(img2);
        newSlide.appendChild(newSlideImg2);

        return newSlide;
    }

    slider.addEventListener("click", function () {
        const currentSlide = slider.querySelector(".slide:not(.exiting)");
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
        slider.appendChild(newSlide);

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
                removeExtraSlide(slider);
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

    function removeExtraSlide(container) {
        while (container.children.length > 4) {
            container.removeChild(container.firstChild);
        }
    }
});