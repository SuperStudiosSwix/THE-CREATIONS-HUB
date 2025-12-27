function createNewCard(titleText, imgSrc, linkUrl = null) {
    const container = document.getElementById("cards");
    const template = document.querySelector('.card');
    const newCard = template.cloneNode(true);
    
    const titleEl = newCard.querySelector('.title') || newCard.querySelector('h2');
    const imgEl = newCard.querySelector('img');

if (titleEl) titleEl.innerHTML = titleText; 
    if (imgEl) imgEl.src = imgSrc;
    if (linkUrl) {
        newCard.style.cursor = "pointer";
        newCard.onclick = function() {
            window.location.href = linkUrl;
        };
    }
    if (titleText.includes('Egg Kreyes Hunt')) {
    newCard.classList.add('Play-Animation');
    }
    
    container.appendChild(newCard);
}
createNewCard("Egg Kreyes Hunt <br> Category: Simulator <br>Creators: <br>Swix,Zrkde,Kreyes,Rollton,Grisha <br> Игра не выйшла!", "IMGs/KreyesHunt.webp"); 
createNewCard("хотите чтобы ваш проект попал на сайт? нажми на картинку и напиште в группу телеграм!", "MsgnPNG.png", "https://t.me/+bYEZR8AmTOtkZjFi");

fetch('storage.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(card => {
            createNewCard(card.title, card.img, card.url);
        });
    });