const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// Unsplash API
const count = 30;
const apiKey = 'LRkuKFWBZKXMWgCpc_k-nZmulsVLAhpa85pXNGRYHNo'
const apiUrl = `https://api.unsplash.com/photos/random/
?client_id=${apiKey}&count=${count}`;

// Check i sall images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//Helper function to set attributes on dom elements
function setAttribute(element, attributes) {
    for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
    }
}


// create Elements for links and photos, add to DOM
function displayPhotos() {
    totalImages = photoArray.length;
    // Run function for each object in photosArray
    photoArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank', 
        });
        // Create <img> for photos
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        //Event Listener, cheeck when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, then both inside imgCOntanier element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from unplash api

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos()
    } catch (error) {
        //Catch error here
}
}

//Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    } 
}),

// On Load
getPhotos()