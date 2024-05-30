console.log("test")


let aapPoppetje = document.getElementById("aapIMG1");
const naamTitel = document.querySelector("h2");

const naamInvoerVeld = document.getElementById("naamInvoer");
const startKnop = document.getElementById("startButton");
const foutmeldingTekst = document.getElementById("foutmelding");

const startScherm = document.getElementById("startScherm");
const spelContent = document.getElementById("spelContent");
const gameOverScherm = document.getElementById("gameOver");
const herstartKnop = document.getElementById("herstartButton");

gameOverScherm.style.display= "none";
spelContent.style.display = "none";

let voerLvl;
let energieLvl;
let banaanLvl;
let voerTimer;
let energieTimer;



//Start scherm 
startKnop.addEventListener("click", function() {
    const nieuweNaam = naamInvoerVeld.value

    if(nieuweNaam !== ""){
        naamTitel.textContent = nieuweNaam 
        spelContent.style.display = "block"
        startScherm.style.display = "none"
        startSpel();
    }else(foutmeldingTekst.textContent ="Voer naam in")
})


function startSpel(){

    // Voer feature 
    voerLvl = 100
    let voerKnop = document.getElementById("voerBTN")
    let voerTekst = document.getElementById("voerScoreTekst")
    let voerProgress = document.getElementById("voerBar")

    voerTekst.textContent = voerLvl
    voerProgress.value = voerLvl;

    voerTimer = setInterval(function() {
        voerLvl -= 1;
        voerTekst.textContent = voerLvl;
        voerProgress.value = voerLvl;
        if(voerLvl <= 0) {
            clearInterval(voerTimer);
            herstart();
            afbeeldingVeranderen();
        }
    },250)
    
    let banaanKnop = document.getElementById("banaanboomImg")

    voerKnop.addEventListener('click', function() {
        if(banaanLvl > 0) {
            voerLvl += 10;
            banaanMinder();
        } 
        if(voerLvl > 100){ 
            voerLvl = 100;
        }

        voerTekst.textContent = voerLvl;
        voerProgress.value = voerLvl;
    
        if(banaanLvl == 0){
        document.getElementById("voerBTN").classList.add("disabled")
        }
    })


    // Energie feature 

    energieLvl = 100
    let energieKnop = document.getElementById("energieBTN")
    let energieTekst = document.getElementById("energieScoreTekst")
    let energieProgress = document.getElementById("energieBar")

    energieTekst.textContent = energieLvl
    energieProgress.value = energieLvl;

    energieTimer = setInterval(function() {
        energieLvl -= 1;
        energieTekst.textContent = energieLvl;
        energieProgress.value = energieLvl;
        
        if(energieLvl <= 0) {
        clearInterval(energieTimer);
        herstart();
        afbeeldingVeranderen();
        }
    },100)
    
    energieKnop.addEventListener('click', function() {
        energieLvl += 10

        if(energieLvl > 100){ 
            energieLvl = 100;
        }
    
        energieTekst.textContent = energieLvl;
        energieProgress.value = energieLvl;
    })


    // banaan feature 
    banaanLvl = 5
    let banaanHoeveelheid = document.getElementById("banaanTekst")
    banaanHoeveelheid.textContent = banaanLvl + " bananen"

    function banaanMinder(){
        banaanLvl -=1
        banaanHoeveelheid.textContent = banaanLvl + " bananen"
    }

    banaanKnop.addEventListener('click', function() {
        banaanLvl += 1;
        banaanHoeveelheid.textContent = banaanLvl + " bananen"
        if(banaanLvl > 0) {
        document.getElementById("voerBTN").classList.remove("disabled")
        }
    })

    
    // dans feature 
    let dansKnop = document.getElementById("dansBTN")

    dansKnop.addEventListener('click', function() {
        aapPoppetje.src = "/eindopdracht/Apen-tamagotchi/images/aapdansje1.png";

        setTimeout(function() {
            aapPoppetje.src = "/eindopdracht/Apen-tamagotchi/images/aapdansje2.png";
        }, 200);

        setTimeout(function() {
            aapPoppetje.src = "/eindopdracht/Apen-tamagotchi/images/monkey1-default.png";
        }, 1000);
    })

}

//afbeelding veranderen
function afbeeldingVeranderen(){
    if(voerLvl < 1 || energieLvl < 1){
        aapPoppetje.src = "/eindopdracht/Apen-tamagotchi/images/aapdood.png"
        titel.textContent = "Dood"
    } else{
        aapPoppetje.src = "/eindopdracht/Apen-tamagotchi/images/monkey1-default.png"
    }
}

// Game over
function herstart(){
        spelContent.style.display = "none";
        gameOver.style.display = "block";
}


// Herstarten 
herstartKnop.addEventListener("click", function() {
   location.reload();
})