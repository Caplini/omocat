document.addEventListener('DOMContentLoaded', function() {
    // Birthdate details
    const birthYear = 2005;
    const birthMonth = 11; // Note: Months in JavaScript are 0-indexed. So, January is 0 and December is 11.
    const birthDay = 13;
    const birthHour = 16;  // 4pm

    function calculateAge() {
        const birthDate = new Date(birthYear, birthMonth - 1, birthDay, birthHour);
        const now = new Date();
        const ageInMilliseconds = now - birthDate;
        const ageInSeconds = ageInMilliseconds / 1000;
        const ageInMinutes = ageInSeconds / 60;
        const ageInHours = ageInMinutes / 60;
        const ageInDays = ageInHours / 24;
        const ageInYears = ageInDays / 365.25; // Considering leap years

        return ageInYears;
    }

    function updateAgeDisplay() {
        const ageElement = document.getElementById('age');
        const age = calculateAge();

        // Format age with 9 decimal places
        const formattedAge = age.toFixed(9);

        ageElement.textContent = `You are ${formattedAge} years old.`;
    }

    // Update the age display immediately
    updateAgeDisplay();

    // Update every second (to keep the decimals changing)
    setInterval(updateAgeDisplay, 1000);
});
