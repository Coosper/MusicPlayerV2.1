function fadeInContent() {
    const content = document.querySelector('.content');
    content.style.opacity = '0';
    content.style.transition = 'opacity 10s'; // Increase the duration to 2 seconds

    window.addEventListener('load', () => {
        content.style.opacity = '1';
    });
}

fadeInContent();