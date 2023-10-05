document.addEventListener('DOMContentLoaded', function() {

    let birthYear, birthMonth, birthDay, birthHour;

    if(!localStorage.getItem("birthDate")) {
        birthYear = prompt("Enter your birth year:");
        birthMonth = prompt("Enter your birth month (1-12):");
        birthDay = prompt("Enter your birth day (1-31):");
        birthHour = prompt("Enter your birth hour (0-23):");

        localStorage.setItem("birthDate", JSON.stringify({ year: birthYear, month: birthMonth, day: birthDay, hour: birthHour }));
    } else {
        const storedData = JSON.parse(localStorage.getItem("birthDate"));
        birthYear = storedData.year;
        birthMonth = storedData.month;
        birthDay = storedData.day;
        birthHour = storedData.hour;
    }

    function calculateAge(format = 'years') {
        const birthDate = new Date(birthYear, birthMonth - 1, birthDay, birthHour);
        const now = new Date();
        const ageInMilliseconds = now - birthDate;
        const ageInSeconds = ageInMilliseconds / 1000;
        const ageInMinutes = ageInSeconds / 60;
        const ageInHours = ageInMinutes / 60;
        const ageInDays = ageInHours / 24;
        const ageInYears = ageInDays / 365.25; // Considering leap years

        switch(format) {
            case 'years':
                return ageInYears;
            case 'days':
                return ageInDays;
            case 'hours':
                return ageInHours;
            case 'minutes':
                return ageInMinutes;
            case 'seconds':
                return ageInSeconds;
        }
    }

    window.updateAgeDisplay = function() {
        const ageElement = document.getElementById('age');
        const timeFormat = document.getElementById('timeFormat').value;
        const age = calculateAge(timeFormat);

        ageElement.textContent = age.toFixed(9);
    }

    // Update the age display immediately
    updateAgeDisplay();

    // Update frequently for a smooth flow
    setInterval(updateAgeDisplay, 10);
});
