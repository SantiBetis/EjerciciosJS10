
const pubkey = 'b90bc92ee6e7a47e814d53c702af909a';  
const pvtkey = '468e12607553f762a0a8526d7725d83eb371353e'; 

const generateHash = () => {
    const ts = Date.now();
    const hash = CryptoJS.MD5(ts + pvtkey + pubkey).toString(); 
    return { ts, hash };
};


document.getElementById('fetch-characters').addEventListener('click', () => {
    const { ts, hash } = generateHash(); 
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${pubkey}&hash=${hash}&nameStartsWith=Hulk&orderBy=name&limit=15`; 

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data); 
            displayCards(data.data.results, 'personaje'); 
        })
        .catch(error => {
            console.error('Error obteniendo personajes:', error); 
        });
});


document.getElementById('fetch-comics').addEventListener('click', async () => {
    const { ts, hash } = generateHash(); 
    const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${pubkey}&hash=${hash}&titleStartsWith=Ave&orderBy=title&limit=15`; 

    try {
        const response = await fetch(url); 
        const data = await response.json(); 
        console.log(data);
        displayCards(data.data.results, 'comic'); 
    } catch (error) {
        console.error('Error obteniendo cómics:', error); 
    }
});

function displayCards(items, type) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; 

    items.forEach(item => {
        const card = document.createElement('DIV');
        card.classList.add('card');

        const title = type === 'personaje' ? item.name : item.title; 
        const imageUrl = `${item.thumbnail.path}.${item.thumbnail.extension}`; 

        card.innerHTML = `
            <img src="${imageUrl}" alt="${title}">
            <h3>${title}</h3>
        `;

        container.appendChild(card);
    });
}