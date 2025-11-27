const searchButton = document.getElementById('searchButton');
const weatherCard = document.getElementById('weatherCard');
const weatherEmoji = document.getElementById('weatherEmoji');

searchButton.addEventListener('click', () => {
    console.log('Recherche lancée !');
    
    weatherCard.classList.remove('hidden');
});

weatherEmoji.addEventListener('mouseenter', () => {
    weatherEmoji.style.transform = 'scale(1.3)';
});

weatherEmoji.addEventListener('mouseleave', () => {
    weatherEmoji.style.transform = 'scale(1)';
});
