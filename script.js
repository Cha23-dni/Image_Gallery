const filterContainer = document.querySelector(".gallery-filter"),
      galleryItems = document.querySelectorAll(".gallery-item");

let currentIndex = 0;

filterContainer.addEventListener("click", (event) =>{
    if(event.target.classList.contains("filter-item")){
        filterContainer.querySelector(".active").classList.remove("active");
        event.target.classList.add("active");
        const filterValue = event.target.getAttribute("data-filter");
        galleryItems.forEach((item, index) =>{
            if(item.classList.contains(filterValue) || filterValue === 'all'){
                item.classList.remove("hide");
                item.classList.add("show");
            } else {
                item.classList.remove("show");
                item.classList.add("hide");
            }
        });
    }
});
const searchInput = document.getElementById('search-input');

// Function to filter gallery items based on search input
function filterGallery() {
    const query = searchInput.value.toLowerCase();
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const description = img.getAttribute('data-description').toLowerCase();
        const altText = img.alt.toLowerCase();
        if (description.includes(query) || altText.includes(query)) {
            item.classList.remove('hide');
            item.classList.add('show');
        } else {
            item.classList.remove('show');
            item.classList.add('hide');
        }
    });
}

// Add event listener to search input
searchInput.addEventListener('input', filterGallery);

// Add event listener to gallery filter
filterContainer.addEventListener("click", (event) =>{
    if(event.target.classList.contains("filter-item")){
        filterContainer.querySelector(".active").classList.remove("active");
        event.target.classList.add("active");
        const filterValue = event.target.getAttribute("data-filter");
        galleryItems.forEach((item, index) =>{
            if(item.classList.contains(filterValue) || filterValue === 'all'){
                item.classList.remove("hide");
                item.classList.add("show");
            } else {
                item.classList.remove("show");
                item.classList.add("hide");
            }
        });
        filterGallery(); // Filter items after changing the filter
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Like button functionality
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('liked');
            if (button.classList.contains('liked')) {
                button.innerHTML = '&#10084;'; // Change to heart icon when liked
            } else {
                button.innerHTML = '&#9825;'; // Change back to empty heart icon
            }
        });
    });
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function showLightbox(index) {
    currentIndex = index;
    lightbox.style.display = 'block';
    const selectedImage = galleryItems[currentIndex].querySelector('img');
    lightboxImg.src = selectedImage.src;
    captionText.innerHTML = selectedImage.alt + "<br>" + selectedImage.getAttribute('data-description');
}

function navigateLightbox(step) {
    currentIndex = (currentIndex + step + galleryItems.length) % galleryItems.length;
    showLightbox(currentIndex);
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        showLightbox(index);
    });
});
// Zoom functionality variables
let scale = 1;
const maxScale = 3; // Max zoom scale
const minScale = 0.5; // Min zoom scale
const zoomStep = 0.1;

// Create zoom controls
const zoomControls = document.createElement('div');
zoomControls.className = 'lightbox-zoom-controls';
zoomControls.innerHTML = `
    <span class="zoom-out">-</span>
    <span class="zoom-in">+</span>
`;
lightbox.appendChild(zoomControls);

// Select zoom controls
const zoomInBtn = document.querySelector('.zoom-in');
const zoomOutBtn = document.querySelector('.zoom-out');

// Zoom in function
function zoomIn() {
    if (scale < maxScale) {
        scale += zoomStep;
        applyZoom();
    }
}

// Zoom out function
function zoomOut() {
    if (scale > minScale) {
        scale -= zoomStep;
        applyZoom();
    }
}

// Apply zoom to the lightbox image
function applyZoom() {
    lightboxImg.style.transform = `scale(${scale})`;
}

// Reset zoom when closing the lightbox
document.querySelector('.close').addEventListener('click', function() {
    lightbox.style.display = 'none';
    scale = 1; // Reset scale to 1
    applyZoom(); // Apply reset zoom
});

// Event listeners for zoom controls
zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);


prevBtn.addEventListener('click', function() {
    navigateLightbox(-1);
});

nextBtn.addEventListener('click', function() {
    navigateLightbox(1);
});

document.querySelector('.close').addEventListener('click', function() {
    lightbox.style.display = 'none';
});