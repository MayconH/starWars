let currentPageUrl = "https://swapi.dev/api/people/"

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert("Erro oa carregar cards");
    }

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadBakcPage);

};


async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; //Limpar os resultados anteriores

    try {
        const reponse = await fetch(url);
        const reponseJson = await reponse.json();

        reponseJson.results.forEach((character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";

            const charactersNameBG = document.createElement("div");
            charactersNameBG.className = "characters-name-bg";

            const charactersName = document.createElement("span");
            charactersName.className = "characters-name";
            charactersName.innerText = `${character.name}`;

            card.appendChild(charactersNameBG);
            charactersNameBG.appendChild(charactersName);
            mainContent.appendChild(card);

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"
                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement("span");
                name.className = "character-details";
                name.innerText = `Nome: ${character.name}`

                const characterheight = document.createElement("span");
                characterheight.className = "character-details";
                characterheight.innerText = `Altura: ${convertHeigth(character.height)}`
                
                const mass = document.createElement("span");
                mass.className = "character-details";
                mass.innerText = `Peso: ${convertMass(character.mass)}`
                
                const eyeColor = document.createElement("span");
                eyeColor.className = "character-details";
                eyeColor.innerText = `Cor dos olhos: ${convertEyerColor(character.eye_color)}`
                
                const birthYear = document.createElement("span");
                birthYear.className = "character-details";
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

                const gender = document.createElement("span");
                gender.className = 'character-details';
                gender.innerText = `Gênero: ${convertGender(character.gender)}`

                const modalContentText = document.createElement("div");
                modalContentText.className = "modal-content-text";
                
                modalContent.appendChild(characterImage);
                modalContentText.appendChild(name);
                modalContentText.appendChild(gender);
                modalContentText.appendChild(characterheight);
                modalContentText.appendChild(mass);
                modalContentText.appendChild(eyeColor);
                modalContentText.appendChild(birthYear);
                modalContent.appendChild(modalContentText);
                
            }
            console.log(convertGender(character.gender))
            
        });
        
        
        
        
        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');
        
        // nextButton.disable = !reponseJson.next;
        // backButton.disable = !reponseJson.previous;
        
        backButton.style.visibility = reponseJson.previous ? "visible" : "hidden";
        nextButton.style.visibility = reponseJson.next ? "visible" : "hidden";

        currentPageUrl = url;

    } catch (eror) {
        alert("Erro ao carregar personagens");
    }
}

async function pag(numberPag){
    try{
        url = `https://swapi.dev/api/people/?page=${numberPag}`
        await loadCharacters(url)
    }catch(error){
        alert("E R R O R")

    }
}

async function loadNextPage() {
    if (!currentPageUrl) return; //se for NULL vai retornar FALSE, porem, "!" nega tornando TRUE

    try {
        const reponse = await fetch(currentPageUrl);
        const reponseJson = await reponse.json();

        await loadCharacters(reponseJson.next)

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar próxima página!!!');
    };

};

async function loadBakcPage() {
    if (!currentPageUrl) return; //se for NULL vai retornar FALSE, porem, "!" nega tornando TRUE

    try {
        const reponse = await fetch(currentPageUrl);
        const reponseJson = await reponse.json();

        await loadCharacters(reponseJson.previous)

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar página anterior!!!');
    };

};

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}


function convertEyerColor(eyeColor) {
    const cores = {
        unknown: "Desconhecido",
        blue: "Azul",
        yellow: "Amarelo",
        red: "Vermelho",
        brown: "Castanho",
        black: "Preto",
        "blue-gray": "Azul cinza",
        orange: "Laranja",
        hazel: "Avela",
        pink: "Rosa",
        "red, blue": "Vermelho & Azul",
        gold: "ouro",
        "green, yellow": "Verde & Amarelo",
        white: "Branco"

    }

    return cores[eyeColor] || eyeColor;
}

function convertHeigth(height){
    parseFloat(height);
 
    if (isNaN(height)){
        return "Desconhecido";
    } else if (height < 100) {
        cm = (height+" cm")
        toString(cm)
        return cm;
    } else{  
        m = (height/100)+" m"
        toString(m)
        return m;
    }
}

function convertMass(mass){
    if(mass == "unknown"){
        return 'Desconhecido';
    } else {
        return mass+" Kg"
    }
}

function convertBirthYear(birthYear){
    if(birthYear == "unknown"){
        return 'Desconhecido';
    } else {
        return birthYear;
    }
}

function convertGender(gender){
    const gener = {
        male: "Masculino",
        female: "Feminino",
        "n/a": "Sem Gênero",
        none: "Sem Gênero",
        hermaphrodite: "Hermafrodita"
    }

    return gener[gender] || gender;
}