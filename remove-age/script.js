document.addEventListener('DOMContentLoaded', function() {
    // If the URL ends with /remove-age, clear the stored birth data
    if (window.location.href.endsWith('/remove-age')) {
        localStorage.removeItem("birthDate");
        alert('Your age data has been removed. You can now enter it again.');
        
        // Redirect to the main page or root directory
        window.location.href = '/';
        return; // Ensure the rest of the code doesn't run after redirecting
    }

    // ... [Rest of your code]
});
