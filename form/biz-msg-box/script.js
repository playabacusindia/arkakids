// bottom menu icons start
var callCont = document.querySelector(".call-container");
var telegramCont = document.querySelector(".telegram-container");
var emailCont = document.querySelector(".email-container");
var urlCont = document.querySelector(".url-container");

function comeFromBlock(containerName) {
    setTimeout(function () {
        containerName.style.display = "flex";
        containerName.style.transform = "scale(.3) rotateZ(360deg)";

    }, 500);
    setTimeout(function () {
        containerName.style.transform = "scale(.8) rotateZ(0deg)";
        containerName.style.opacity = "1";
    }, 1000);
}

// comeFromBlock(telegramCont);
comeFromBlock(callCont);
// comeFromBlock(urlCont);
comeFromBlock(emailCont);
// bottom menu icons end

// country select start
function toggleCon() {
    document.querySelector(`#country-select`).querySelector(".dropdown").classList.toggle(`active`);
    document.querySelector(`#country-select`).querySelector(".val").classList.toggle(`active`);
}
function fetchCountryData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            callback(data);
        }
    };
    xhr.open('GET', 'https://arkakids.com/form/tele-abacus/database/all.json', true);
    xhr.send();
}
function populateSelect() {
    fetchCountryData(function (countries) {
        var select = document.getElementById('country-select').querySelector(".dropdown").querySelector(".items");
        countries.forEach(function (country) {
            if (country.idd.suffixes) {
                var option = document.createElement('div');
                if (country.idd.suffixes.length == 1) {
                    option.innerHTML = `<img src="${country.flags.png}"> <span>${country.name.common} (${country.idd.root + country.idd.suffixes[0]})</span>`;
                    option.setAttribute('data-flag', country.flags.png);
                    option.setAttribute('data-name', country.idd.root + country.idd.suffixes);
                    option.addEventListener('click', () => {
                        document.getElementById('country-select').querySelector(".val").innerHTML = `<img src="${country.flags.png}">` + country.idd.root + country.idd.suffixes[0];
                        document.getElementById('country-select').querySelector(".val").dataset.value = country.idd.root + country.idd.suffixes[0];
                        toggleCon();
                    })
                } else {
                    option.innerHTML = `<img src="${country.flags.png}"> <span>${country.name.common} (${country.idd.root})</span>`;
                    option.setAttribute('data-flag', country.flags.png);
                    option.setAttribute('data-name', country.idd.root + country.idd.suffixes);
                    option.addEventListener('click', () => {
                        document.getElementById('country-select').querySelector(".val").innerHTML = `<img src="${country.flags.png}">` + country.idd.root;
                        document.getElementById('country-select').querySelector(".val").dataset.value = country.idd.root;
                        toggleCon();
                    })
                }
                select.prepend(option);
            }
        });

        const containerDiv = document.getElementById('country-select').querySelector(".dropdown");
        let divs = containerDiv.querySelectorAll('.items div');

        document.getElementById('searchInput').addEventListener('input', function () {
            let searchText = document.getElementById('searchInput').value.toLowerCase();
            divs.forEach(div => {
                console.log(div)
                let divText = div.querySelector("span").textContent.toLowerCase();
                console.log(divText)
                if (divText.includes(searchText)) {
                    div.classList.remove('hidden');
                    div.style.display = 'flex'; // Show the matched div
                    containerDiv.scrollTo(0, div.offsetTop); // Scroll to the matched div
                } else {
                    div.classList.add('hidden');
                    div.style.display = 'none'; // Hide the unmatched div
                }
            });
        });


    });



}
populateSelect();

// country select end


// form box start

function msgBox() {
    document.querySelector("#tele-chatbox-unique").classList.toggle("active");
}

// Inquiry Chips selection logic
document.querySelectorAll('.inquiry-chip').forEach(chip => {
    chip.addEventListener('click', function () {
        // Remove selected class from all chips
        document.querySelectorAll('.inquiry-chip').forEach(c => c.classList.remove('selected'));
        // Add selected class to clicked chip
        this.classList.add('selected');
        // Check the radio input inside
        const radio = this.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
        }
    });
});

window.onload = function () {
    sendUserDataToServer();
    if (localStorage.getItem("customer-name") && localStorage.getItem("customer-number")) {
        document.querySelector("#tele-name").value = localStorage.getItem("customer-name");
        document.querySelector("#tele-phone").value = localStorage.getItem("customer-number");
    }
};

function sendUserDataToServer() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var locationInfo = JSON.parse(xhr.responseText);
            console.log(locationInfo);
            let ipAddress = locationInfo.ip;
            let city = locationInfo.city;
            let region = locationInfo.region;
            let host = window.location.href;
            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;
            let screenResolution = screenWidth + "x" + screenHeight;
            saveUserDataLocally(ipAddress, host, screenResolution, city, region);
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            let ipAddress = "unknown";
            let city = "unknown";
            let region = "unknown";
            let host = window.location.href;
            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;
            let screenResolution = screenWidth + "x" + screenHeight;
            saveUserDataLocally(ipAddress, host, screenResolution, city, region);
        }
    };
    xhr.open('GET', `https://arkakids.com/form/tele-abacus/get-location.php`, true);
    xhr.send();
}

function saveUserDataLocally(ipAddress, host, screenResolution, city, region) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("ipAddress", ipAddress);
        localStorage.setItem("host", host);
        localStorage.setItem("screenResolution", screenResolution);
        localStorage.setItem("city", city);
        localStorage.setItem("region", region);
    } else {
        console.error("localStorage is not supported");
    }
}

function saveCustomerDataLocally(customerName, customerNumber) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("customer-name", customerName);
        localStorage.setItem("customer-number", customerNumber);
    } else {
        console.error("localStorage is not supported");
    }
}

function limitLetters(textarea, maxLetters) {
    const currentText = textarea.value;
    if (currentText.length > maxLetters) {
        textarea.value = currentText.substring(0, maxLetters);
        alert("You can only enter up to " + maxLetters + " characters.");
    }
    const counter = document.getElementById("wordCountMsg");
    if (counter) {
        counter.textContent = `${textarea.value.length} / ${maxLetters} letters`;
    }
}

document.querySelector('#sendBtn').addEventListener('click', function (e) {
    e.preventDefault();
    var photoUrl = 'https://placehold.co/600x400/white/black/png';
    let selectedValue = document.querySelector('.inquiry-chip input[name="inquiry_type"]:checked')?.value;
    let name = document.querySelector("#tele-name").value.trim();
    let frontPhoneElement = document.querySelector(".val");
    let frontPhone = frontPhoneElement?.dataset?.value?.trim() || '';
    let phone = document.querySelector("#tele-phone").value.trim();
    let email = document.querySelector("#tele-email").value.trim();
    let location = document.querySelector("#tele-location").value.trim();
    let msg = document.querySelector('#message').value.trim();

    let ipAddress = localStorage.getItem("ipAddress");
    let host = localStorage.getItem("host");
    let screenResolution = localStorage.getItem("screenResolution");
    let city = localStorage.getItem("city");
    let region = localStorage.getItem("region");

    let message = `Hi, You've got a new inquiry from Arka Kids:

    Type: ${selectedValue}
    Name: ${name}
    Email: ${email}
    Location: ${location}
    Phone: ${frontPhone}${phone}
    Message: ${msg}

    --- Browser Information ---
    City: ${city}
    Region: ${region}
    IP Address: ${ipAddress}
    From URL: ${host}
    Screen: ${screenResolution}`;

    if (name === "" || phone === "" || msg === "" || email === "" || location === "" || selectedValue === undefined) {
        alert("Please fill in all fields and select an inquiry type.");
    } else if (!/^\d{10,}$/.test(phone)) {
        alert("Please enter a valid number.");
    } else {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
        } else {
            document.querySelector('#sendBtn').classList.add("active");
            document.querySelector('#sendBtn').disabled = true;

            fetch('https://arkakids.com/form/tele-abacus/tele-chatbox.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'photo_url=' + encodeURIComponent(photoUrl) + '&message=' + encodeURIComponent(message),
            }).then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            }).then(function (data) {
                alert('Enquiry sent successfully!');
                window.location.href = "https://arkakids.com/";
            }).catch(function (error) {
                console.error('There was a problem with your fetch operation:', error);
                alert('Failed to send enquiry. Please try again.');
                document.querySelector('#sendBtn').classList.remove("active");
                document.querySelector('#sendBtn').disabled = false;
            });
        }
    }
});


// form box end

