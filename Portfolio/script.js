document.addEventListener("DOMContentLoaded", function () {
    // Function to reset animations for a specific container
    function resetAnimations(container) {
        const nameSpans = container.querySelectorAll(".name span");
        const designationSpans = container.querySelectorAll(".designation span");

        nameSpans.forEach(span => span.style.opacity = 0);
        designationSpans.forEach(span => span.style.opacity = 0);

        // Trigger reflow to restart animations
        void container.offsetWidth;

        nameSpans.forEach((span, index) => {
            span.style.animationDelay = `${0.5 + index * 0.5}s`;
        });

        designationSpans.forEach((span, index) => {
            span.style.animationDelay = `${8.5 + index * 0.5}s`;
        });
    }

    // Create an observer instance
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the container is in view, reset its animations
                resetAnimations(entry.target);
                // Unobserve the container to prevent unnecessary checks
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    // Get all containers with the class "container"
    const containers = document.querySelectorAll('.container');

    // Observe each container
    containers.forEach(container => {
        observer.observe(container);
    });

    // Function to reveal image when it comes into view
    function revealImage(container) {
        const introImage = container.querySelector('.intro-image img');
        introImage.classList.add('reveal');
    }

    // Create another observer for revealing images
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the container is in view, reveal its image
                revealImage(entry.target);
                // Unobserve the container to prevent unnecessary checks
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    // Get all containers with the class "container1"
    const imageContainers = document.querySelectorAll('.container1');

    // Observe each container for image reveal
    imageContainers.forEach(container => {
        imageObserver.observe(container);
    });
});
