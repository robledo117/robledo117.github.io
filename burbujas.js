document.addEventListener("DOMContentLoaded", () => {
    const bubbles = document.querySelectorAll(".bubble");
    const container = document.querySelector(".bubbles-container");

    const bubbleData = Array.from(bubbles).map(bubble => {
        const x = Math.random() * (container.offsetWidth - bubble.offsetWidth);
        const y = Math.random() * (container.offsetHeight - bubble.offsetHeight);
        const dx = (Math.random() - 0.5) * 2;
        const dy = (Math.random() - 0.5) * 2;

        bubble.style.left = `${x}px`;
        bubble.style.top = `${y}px`;

        return { element: bubble, x, y, dx, dy };
    });

    function animate() {
        for (const bubble of bubbleData) {
            bubble.x += bubble.dx;
            bubble.y += bubble.dy;

            // Rebote en bordes horizontales
            if (bubble.x <= 0 || bubble.x + bubble.element.offsetWidth >= container.offsetWidth) {
                bubble.dx *= -1;
            }

            // Rebote en bordes verticales
            if (bubble.y <= 0 || bubble.y + bubble.element.offsetHeight >= container.offsetHeight) {
                bubble.dy *= -1;
            }

            bubble.element.style.left = `${bubble.x}px`;
            bubble.element.style.top = `${bubble.y}px`;
        }

        requestAnimationFrame(animate);
    }

    animate();
});
