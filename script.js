document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", function () {
        let scrollPos = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            if (scrollPos > section.offsetTop) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }
        });
    });

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    });
});