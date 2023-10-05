let birthYear, birthMonth, birthDay, birthHour;
window.mode = 'years'; // Default mode

function showAgeInputModal() {
    const modal = document.getElementById('ageInputModal');
    modal.style.display = "block";
}

window.saveBirthData = function() {
    birthYear = document.getElementById('inputYear').value;
    birthDay = document.getElementById('inputDay').value;
    birthMonth = document.getElementById('inputMonth').value;
    birthHour = document.getElementById('inputHour').value;

    localStorage.setItem("birthDate", JSON.stringify({ year: birthYear, day: birthDay, month: birthMonth, hour: birthHour }));

    // Close the modal after saving data
    document.getElementById('ageInputModal').style.display = "none";

    // Update the age display after data input
    updateAgeDisplay();

    // Update frequently for a smooth flow
    setInterval(updateAgeDisplay, 10);
}

function calculateAge() {
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay, birthHour);
    const now = new Date();
    const ageInMilliseconds = now - birthDate;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;
    const ageInYears = ageInDays / 365.25; // Considering leap years

    switch(mode) {
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
        default:
            console.error("Invalid mode provided. Valid modes are: years, days, hours, minutes, seconds.");
            return 0;
    }
}

window.updateAgeDisplay = function() {
    const ageElement = document.getElementById('age');
    const age = calculateAge();
    ageElement.textContent = age.toFixed(9);
}

document.addEventListener('DOMContentLoaded', function() {
    if(!localStorage.getItem("birthDate")) {
        showAgeInputModal();
    } else {
        const storedData = JSON.parse(localStorage.getItem("birthDate"));
        birthYear = storedData.year;
        birthMonth = storedData.month;
        birthDay = storedData.day;
        birthHour = storedData.hour;

        // Update the age display immediately
        updateAgeDisplay();

        // Update frequently for a smooth flow
        setInterval(updateAgeDisplay, 10);
    }
});
