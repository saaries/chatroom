// Array of image name
var imgArray = ['1', '2', '3', '4', '5', '6', '7'];

//bind to arrow/button/namebox/message in login webpage
var leftArrow = document.getElementsByClassName('left-arrow')[0];
var rightArrow = document.getElementsByClassName('right-arrow')[0];
var userName = document.getElementsByClassName('user-name')[0];
var loginButton = document.getElementsByClassName('login-button')[0];
var errorMessage = document.getElementsByClassName('error-message')[0];

// Listen to Arrow event
leftArrow.addEventListener('click', function () {
    // Loop the image
    imgArray.unshift(imgArray[imgArray.length - 1]);
    imgArray.pop();
    SwitchImg();
});

rightArrow.addEventListener('click', function () {
    imgArray.push(imgArray[0]);
    imgArray.shift();
    SwitchImg();
});

// Switch image
function SwitchImg() {
    for (var count = 0; count < imgArray.length; count++) {
        document.getElementsByTagName('img')[count].src = 'img/' + imgArray[count] + '.png';
        document.getElementsByTagName('img')[count].alt = imgArray[count] + '.png';
    };
};

// Listen to login Button event
loginButton.addEventListener('click', function () {
    if (userName.value === '') {
        errorMessage.innerHTML = 'Please type in your name';
        errorMessage.style.visibility = 'visible';
    } else if (userName.value.length > 11) {
        errorMessage.innerHTML = 'Name should not over 10 words';
        errorMessage.style.visibility = 'visible';
    } else {
        // use the address link to distinguish the current user & picture
        window.location.href =
            encodeURI('index.html?selectpicture=' + document.getElementsByClassName('p3')[0].alt +
                '&username=' + userName.value);
    }
});

// Listen to login Button event: triggle by press Enter (keyCode 13)
document.onkeydown = function (event) {
    var e = event || window.event;
    if (e && e.keyCode == 13) {
        loginButton.click();
    }
};
