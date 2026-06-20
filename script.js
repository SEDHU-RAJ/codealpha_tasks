document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let activeImages = [];
    let currentIndex = 0;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
            updateActiveImages();
        });
    });

    function updateActiveImages() {
        activeImages = Array.from(galleryItems).filter(item => !item.classList.contains('hide'));
    }

    function openLightbox(index) {
        currentIndex = index;
        const targetImgSrc = activeImages[currentIndex].querySelector('img').src;
        const targetImgAlt = activeImages[currentIndex].querySelector('img').alt;
        
        lightboxImg.src = targetImgSrc;
        lightboxImg.alt = targetImgAlt;
        lightbox.classList.add('active');
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    function navigateLightbox(direction) {
        if (activeImages.length <= 1) return;
        
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % activeImages.length;
        } else if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length;
        }
        
        lightboxImg.src = activeImages[currentIndex].querySelector('img').src;
        lightboxImg.alt = activeImages[currentIndex].querySelector('img').alt;
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = activeImages.indexOf(item);
            if(index !== -1) openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', () => navigateLightbox('next'));
    prevBtn.addEventListener('click', () => navigateLightbox('prev'));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') navigateLightbox('next');
        if (e.key === 'ArrowLeft') navigateLightbox('prev');
    });

    updateActiveImages();
});