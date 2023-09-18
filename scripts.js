window.onload = function() {
    setTimeout(function() {
        let loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {  // Ensure the element exists
            loadingScreen.style.opacity = "0";
            setTimeout(function() {
                loadingScreen.style.display = "none";
            }, 1000);
        }
    }, 2000); // Shows the loading screen for 2 seconds
};
