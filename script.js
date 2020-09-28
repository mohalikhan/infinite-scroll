const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];
let isInitialLoad = true

// Unsplash API
let initialCount = 5;
// Normally, don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
let apiKey = '2DIdOkFKtNUfJ3m6imTSO8ITmhzWxwm-11KgcLvtbog';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

const updateAPIURLWithNewCount = (picCount) => {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// Check if all image were loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        imagesLoaded = 0;
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}
// Helper Function to Set Attributes on DOM Elements
const setAttribute = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links and Photos, Add to DOM
const displayPhotos = () => {
    totalImages = photoArray.length;
    // Run function for each object in photoArray
    photoArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Crate <img> for photo
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unplash API
const getPhotos = async () => {
   try {
       const response = await fetch(apiUrl);
       photoArray = await response.json();
       displayPhotos();
       if (isInitialLoad) { 
        updateAPIURLWithNewCount(30) 
        isInitialLoad = false 
      }
   } catch(error) {
       // Catch error here
   } 
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});



// On Load
getPhotos();