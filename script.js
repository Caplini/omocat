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

    localStorage.setItem('birthDate', JSON.stringify({year: birthYear, day: birthDay, month: birthMonth, hour: birthHour}));

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

    // Update statistics
    updateStatistics();
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
        updateStatistics();


        // Update frequently for a smooth flow
        setInterval(updateAgeDisplay, 10);
        setInterval(updateCountdown, 10); // updates every second

    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if the URL includes the resetAge parameter
    if (window.location.search.includes('resetAge=true')) {
        // Clear the birthDate from localStorage
        localStorage.removeItem('birthDate');
        // Redirect user to the main page without the query parameter
        window.location.href = window.location.href.split('?')[0];
    }
});

function openTab(tabName, elmnt) {
    let i, tabcontent, tablinks;
    let ageText = document.getElementById('text');

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablink" and remove the class "active"
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    elmnt.classList.add("active");

    // Hide the "AGE" text if Statistics tab is loaded, otherwise show it.
    if(tabName === 'statistics' || tabName === 'countdown') {
        ageText.style.display = "none";
    } else {
        ageText.style.display = "block";
    }
}

function updateStatistics() {
    const ageInYears = calculateAge();
    
    const averageLifespan = 80;
    const lifeLeft = averageLifespan - ageInYears;
    const lifePercentageLived = (ageInYears / averageLifespan) * 100;

    const hoursPerDay = 24;
    const daysPerYear = 365.25; // considering leap years

    const sleepHoursPerDay = 7;
    const sleepTime = sleepHoursPerDay * ageInYears * daysPerYear;
    const sleepPercentage = (sleepTime / (ageInYears * hoursPerDay * daysPerYear)) * 100;

    const eatHoursPerDay = 1;
    const eatingTime = eatHoursPerDay * ageInYears * daysPerYear;
    const eatingPercentage = (eatingTime / (ageInYears * hoursPerDay * daysPerYear)) * 100;

    const workHoursPerDay = 8;
    const workYears = Math.min(ageInYears, 40); // assuming work/school for max 40 years
    const workTime = workHoursPerDay * workYears * daysPerYear;
    const workPercentage = (workTime / (ageInYears * hoursPerDay * daysPerYear)) * 100;

    document.getElementById("lifeLeft").textContent = lifeLeft.toFixed(2);
    document.getElementById("sleepTime").textContent = sleepTime.toFixed(2) + " hours (" + sleepPercentage.toFixed(2) + "% of your life)";
    document.getElementById("eatingTime").textContent = eatingTime.toFixed(2) + " hours (" + eatingPercentage.toFixed(2) + "% of your life)";
    document.getElementById("workTime").textContent = workTime.toFixed(2) + " hours (" + workPercentage.toFixed(2) + "% of your life)";
    
    // Assuming there's an element in your HTML with ID 'percentageLived' to display the percentage of life lived.
    document.querySelector("#percentageLived span").textContent = lifePercentageLived.toFixed(2) + "%";
}

function updateCountdown() {
    const ageInYears = calculateAge();
    const averageLifespan = 80;

    let ageText = document.getElementById('text');

    const yearsLeft = averageLifespan - ageInYears;
    const daysLeft = (yearsLeft * 365.25); // accounting for leap years
    const hoursLeft = daysLeft * 24;
    const minutesLeft = hoursLeft * 60;
    const secondsLeft = minutesLeft * 60;

    document.getElementById("yearsLeft").textContent = yearsLeft.toFixed(9);
    document.getElementById("daysLeft").textContent = Math.floor(daysLeft);
    document.getElementById("hoursLeft").textContent = Math.floor(hoursLeft);
    document.getElementById("minutesLeft").textContent = Math.floor(minutesLeft);
    document.getElementById("secondsLeft").textContent = secondsLeft.toFixed(1);
}


