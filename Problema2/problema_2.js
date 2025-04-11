function validateName(name){
    if (!name || typeof name !== 'string') {
        return false;
    }
    return /^[\p{L}\s'-]+$/u.test(name.trim());
}

function validateAge(age){
    if (age == null || isNaN(age) || !Number.isInteger(age)) {
        return false;
    }
    return age >= 1 && age <= 99;
}

function validateBirthdate(dateString) {
    if (!dateString) return false; // Dacă nu există dată

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false; // Verifică dacă data este invalidă (ex: "abc")

    const today = new Date();
    const minDate = new Date(today.getFullYear() - 99, today.getMonth(), today.getDate());

    return date <= today && date >= minDate;
}

function validateAge2(birthdate, age) {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const diffMonths = today.getMonth() - birthDate.getMonth();
    const diffDays = today.getDate() - birthDate.getDate();

    if (diffMonths < 0 || (diffMonths === 0 && today.getDate() < birthDate.getDate())) {
        if(diffDays < 0){
            calculatedAge--;
        }
    }
    return calculatedAge === age;
}

function validateEmail(email){
    if (!email || typeof email !== 'string') {
        return false;
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

document.getElementById("submit").addEventListener("click", function(event) {
    const name = document.getElementById("name").value;
    const birthdate = document.getElementById("birthdate").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;

    let errors = [];
    if (!validateName(name)) {
        errors.push("Invalid name");
        document.getElementById("name").style.borderColor = "red";
    }
    else{
        document.getElementById("name").style.borderColor = "green";
    }

    if(!validateBirthdate(birthdate)){
        errors.push("Invalid birthdate");
        document.getElementById("birthdate").style.borderColor = "red";
    }
    else{
        document.getElementById("birthdate").style.borderColor = "green";
    }

    const ageI = parseInt(age, 10);
    if(!validateAge(ageI)){
        errors.push("Invalid age");
        document.getElementById("age").style.borderColor = "red";
    }
    else{
        document.getElementById("age").style.borderColor = "green";
    }

    if(!validateAge2(birthdate, ageI)){
        errors.push("Age does not match birthdate");
        document.getElementById("age").style.borderColor = "red";
    }
    else{
        document.getElementById("age").style.borderColor = "green";
    }

    if(!validateEmail(email)){
        errors.push("Invalid email");
        document.getElementById("email").style.borderColor = "red";
    }
    else{
        document.getElementById("email").style.borderColor = "green";
    }

    if (errors.length > 0) {
        alert("/n" + errors.join(", "));
    } else {
        alert("Form submitted successfully!");
    }

})

