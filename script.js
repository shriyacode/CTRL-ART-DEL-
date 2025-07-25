document.addEventListener('DOMContentLoaded', () => {

    // --- Master Image Data ---
    // Thumbnails renamed 11-20 (clean filenames)
    const thumbnailImages = [];
    for (let i = 11; i <= 20; i++) {
        thumbnailImages.push(`thumbnail/${i}.jpg`);
    }

    // Use thumbnail as first image in carousel, then add any detail images (if you want to add more, update here)
    const masterPaintingData = [
        {
            src: thumbnailImages[0], // Corresponds to thumbnail/11.jpg
            title: 'Falling Radiance',
            description: 'Capturing the soft descent of light, a gentle glow on canvas.',
            detailImages: [thumbnailImages[0]]
        },
        {
            src: thumbnailImages[8], // Corresponds to thumbnail/19.jpg
            title: 'Ancient Stillness', //
            description: 'Timeless peace, a moment suspended in eternal quiet.',
            detailImages: [thumbnailImages[8]]
        },
        {
            src: thumbnailImages[3], // Corresponds to thumbnail/14.jpg
            title: 'Nonchalance', //
            description: 'Effortless elegance in every stroke, a serene indifference.',
            detailImages: [thumbnailImages[3]]
        },
        {
            src: thumbnailImages[4], // Corresponds to thumbnail/15.jpg
            title: 'Dusk Whispers', //
            description: 'The hushed tones of twilight, secrets carried on a gentle breeze.',
            detailImages: [thumbnailImages[4]]
        },
        {
            src: thumbnailImages[5], // Corresponds to thumbnail/16.jpg
            title: 'Inner Glow', //
            description: 'Radiant warmth from within, a light that illuminates the soul.',
            detailImages: [thumbnailImages[5]]
        },
        {
            src: thumbnailImages[6], // Corresponds to thumbnail/17.jpg
            title: 'Royal Bloom', //
            description: ' Majestic blossoms unfurling, a symbol of dignified beauty.',
            detailImages: [thumbnailImages[6]]
        },
        {
            src: thumbnailImages[7], // Corresponds to thumbnail/18.jpg (assuming this is 18 as it's missing from your list)
            title: 'Starlit Reverie',
            description: 'Dreaming under a canopy of stars, celestial inspiration.',
            detailImages: [thumbnailImages[7]]
        },
        {
            src: thumbnailImages[1], // Corresponds to thumbnail/12.jpg
            title: 'Timeless Roots', //
            description: 'Connecting to origins, strength drawn from enduring foundations.',
            detailImages: [thumbnailImages[1]]
        },
        {
            src: thumbnailImages[2], // Corresponds to thumbnail/13.jpg
            title: 'Nature Drift', // **This is now at index 8**
            description: 'Flowing organic forms, a serene journey through natural landscapes.',
            detailImages: [thumbnailImages[2]]
        },
        {
            src: thumbnailImages[9], // Corresponds to thumbnail/20.jpg (assuming this is 20 as 19 is used, and 10th item)
            title: 'Life Goal',
            description: 'A vibrant vision of aspiration, the pursuit of ultimate purpose.',
            detailImages: [thumbnailImages[9]]
        }
    ];

    // --- Background Auto-Scrolling Gallery Logic ---
    const backgroundGalleryContainer = document.getElementById('background-gallery-container');
    const backgroundGalleryGrid = document.getElementById('background-gallery-grid');
    let bgScrollPosition = 0;
    const bgScrollSpeed = 2.5;
    let bgAnimationFrameId;

    // Background images renamed 1-7
    const backgroundGalleryImages = [];
    for (let i = 1; i <= 7; i++) {
        backgroundGalleryImages.push(`images/${i}.jpg`);
    }

    // Duplicate images multiple times for infinite loop effect
    const bgDuplicatedPaintingData = [];
    for (let i = 0; i < 5; i++) {
        bgDuplicatedPaintingData.push(...backgroundGalleryImages);
    }

    const createBackgroundGalleryItem = (src) => {
        const item = document.createElement('div');
        item.classList.add('background-gallery-item');
        item.innerHTML = `<img src="${src}" alt="Artwork">`;
        return item;
    };

    bgDuplicatedPaintingData.forEach(src => {
        backgroundGalleryGrid.appendChild(createBackgroundGalleryItem(src));
    });

    const bgGalleryItems = Array.from(backgroundGalleryGrid.children);

    const updateBackgroundGallery = () => {
        bgScrollPosition += bgScrollSpeed;

        const containerWidth = backgroundGalleryContainer.offsetWidth;
        const firstItemWidth = bgGalleryItems[0] ? bgGalleryItems[0].offsetWidth : 0;
        const gapWidth = 30; // CSS gap between gallery items
        const totalWidthOfOneSet = backgroundGalleryImages.length * (firstItemWidth + gapWidth);

        if (bgScrollPosition >= totalWidthOfOneSet) {
            bgScrollPosition -= totalWidthOfOneSet;
        }

        backgroundGalleryGrid.style.transform = `translateX(-${bgScrollPosition}px)`;

        const containerCenter = backgroundGalleryContainer.getBoundingClientRect().left + containerWidth / 2;
        let closestBgItem = null;
        let minBgDistance = Infinity;

        bgGalleryItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(containerCenter - itemCenter);

            if (distance < minBgDistance) {
                minBgDistance = distance;
                closestBgItem = item;
            }
        });

        if (closestBgItem) {
            bgGalleryItems.forEach(item => item.classList.remove('is-active'));
            closestBgItem.classList.add('is-active');
        }

        bgAnimationFrameId = requestAnimationFrame(updateBackgroundGallery);
    };

    bgAnimationFrameId = requestAnimationFrame(updateBackgroundGallery);

    // --- Main Gallery Grid Generation ---
    const mainGalleryGrid = document.getElementById('main-gallery-grid');
    // Change this to target 'Nature Drift' which is at index 8 in the updated masterPaintingData
    const featuredPaintingData = masterPaintingData[8]; // Changed from [3] to [8]

    const createMainGalleryItem = (painting, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('main-gallery-item');
        const img = document.createElement('img');
        img.src = painting.src;
        img.alt = painting.title;
        img.style.objectFit = 'cover';
        galleryItem.appendChild(img);
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.innerHTML = `<h3>${painting.title}</h3><p>${painting.description}</p>`;
        galleryItem.appendChild(overlay);
        galleryItem.dataset.paintingIndex = index;
        return galleryItem;
    };

    // Add featured painting first
    const mainFeaturedArt = createMainGalleryItem(featuredPaintingData, 8); // Pass index 8 for Nature Drift
    mainFeaturedArt.classList.add('main-featured-masonry');
    mainGalleryGrid.appendChild(mainFeaturedArt);

    // Add rest of paintings (excluding featured)
    // Adjust reorderedIndexes to exclude Nature Drift (index 8) and add it to the beginning if desired,
    // or just ensure it's not duplicated. Since it's added manually as featured, remove 8 from this list.
    const reorderedIndexes = [9, 0, 1, 2, 3, 4, 5, 6, 7]; // Removed index 8 (Nature Drift) and added 3 back
    reorderedIndexes.forEach(idx => {
        const item = createMainGalleryItem(masterPaintingData[idx], idx);
        mainGalleryGrid.appendChild(item);
    });

    // --- Scroll Animations ---
    const scrollAnimationOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, scrollAnimationOptions);

    // Observe the hero title
    document.querySelector('.hero-title') && scrollObserver.observe(document.querySelector('.hero-title'));

    document.querySelectorAll('.section-title').forEach(title => {
        scrollObserver.observe(title);
    });
    document.querySelector('.about-content') && scrollObserver.observe(document.querySelector('.about-content'));
    document.querySelector('.instagram-button') && scrollObserver.observe(document.querySelector('.instagram-button'));

    const allGalleryItems = document.querySelectorAll('.main-gallery-item');
    allGalleryItems.forEach((item, index) => {
        const itemObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }, index * 100);
                }
            });
        }, { ...scrollAnimationOptions, threshold: 0.1 });
        itemObserver.observe(item);
    });

    // --- Lightbox & Carousel ---
    const lightbox = document.getElementById('lightbox');
    const closeButton = lightbox.querySelector('.close-button');
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrevBtn = document.getElementById('carousel-prev');
    const carouselNextBtn = document.getElementById('carousel-next');
    const carouselDotsContainer = document.getElementById('carousel-dots');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');

    let currentCarouselIndex = 0;
    let currentPaintingDetailImages = [];

    const showImageInCarousel = (index) => {
        const itemWidth = carouselTrack.children[0] ? carouselTrack.children[0].offsetWidth : 0;
        carouselTrack.style.transform = `translateX(-${index * itemWidth}px)`;
        Array.from(carouselDotsContainer.children).forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };

    const navigateCarousel = (direction) => {
        currentCarouselIndex += direction;
        if (currentCarouselIndex < 0) currentCarouselIndex = currentPaintingDetailImages.length - 1;
        else if (currentCarouselIndex >= currentPaintingDetailImages.length) currentCarouselIndex = 0;
        showImageInCarousel(currentCarouselIndex);
    };

    carouselPrevBtn.addEventListener('click', () => navigateCarousel(-1));
    carouselNextBtn.addEventListener('click', () => navigateCarousel(1));

    mainGalleryGrid.addEventListener('click', (e) => {
        const clickedItem = e.target.closest('.main-gallery-item');
        if (clickedItem) {
            const paintingIndex = parseInt(clickedItem.dataset.paintingIndex);
            const painting = masterPaintingData[paintingIndex];
            if (painting && painting.detailImages && painting.detailImages.length > 0) {
                currentPaintingDetailImages = painting.detailImages;
                currentCarouselIndex = 0;
                carouselTrack.innerHTML = '';
                carouselDotsContainer.innerHTML = '';
                currentPaintingDetailImages.forEach((src, index) => {
                    const carouselItem = document.createElement('div');
                    carouselItem.classList.add('carousel-item');
                    carouselItem.innerHTML = `<img src="${src}" alt="${painting.title} - ${index + 1}">`;
                    carouselTrack.appendChild(carouselItem);
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    dot.addEventListener('click', () => {
                        currentCarouselIndex = index;
                        showImageInCarousel(currentCarouselIndex);
                    });
                    carouselDotsContainer.appendChild(dot);
                });
                lightboxTitle.textContent = painting.title;
                lightboxDescription.textContent = painting.description;
                showImageInCarousel(currentCarouselIndex);
                lightbox.classList.add('active');
            }
        }
    });

    closeButton.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', e => {
        if (e.target.id === 'lightbox') {
            lightbox.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') navigateCarousel(-1);
            else if (e.key === 'ArrowRight') navigateCarousel(1);
            else if (e.key === 'Escape') lightbox.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (lightbox.classList.contains('active')) {
            showImageInCarousel(currentCarouselIndex);
        }
    });
});