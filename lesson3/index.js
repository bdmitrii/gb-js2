const inputString = "И дни ходит Марко, и ночи в лесу над рекою Дунаем, всё ищет, всё стонет: 'Где фея?' Но волны смеются: 'Не знаем'. Но он закричал им: 'Вы лжёте! Вы сами играете с нею!'. I don't know, it's very difficult";

const outputString = inputString.replace(/([\s:])'(.+?)'/gim, '$1\"$2\"');

console.log(outputString);


const name = document.getElementById('input-name');
const email = document.getElementById('input-email');
const phone = document.getElementById('input-phone');

const input = document.querySelector('.input-text');
const output = document.querySelector('.output-text');

input.innerHTML = inputString;
output.innerHTML = outputString;


name.addEventListener('input', (evt) => {
    let regex = new RegExp("^[a-zА-Я]+$", "gmi");
    handler(evt, regex);
});

phone.addEventListener('input', (evt) => {
    let regex = new RegExp("^\+7\(\d{3}\)\d{3}\-\d{4}$", "gmi");
    handler(evt, regex);
});

email.addEventListener('input', (evt) => {
    let regex = new RegExp("^[a-z]+[-.a-z][a-z]+@[a-z]+[.][a-z]+$", "");
    handler(evt, regex);
});

function handler(evt, regex) {
    let input = evt.target;
    let test = regex.test(input.value);
    console.log(test);
    if (test) {
        input.style.outline = '2px solid green';
    }
    else {
        input.style.outline = '2px solid red';
    }
}
