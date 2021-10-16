const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'KopLdmdLNUWATvwQxJdQ2u7UV7S4DWYtKIVtQwr1E2g';
 const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=space`;
// const apiUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&count=${count}`;


// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}
// Helper function to set attributes on dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create elements for links & Photos, add to dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each option in photosArray
    photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_discription);
    // img.setAttribute('title', photo.alt_discription);
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,

    });
    // Event listener, check when eash is finished loading
    img.addEventListener('load', imageLoaded);
    // put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
    })
}

// Get Photos from ubsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    getPhotos();
    ready = false;
}
});

// on load
getPhotos();