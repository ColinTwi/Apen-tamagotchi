console.log("test");

// Verschillende schermen 
const startScherm = document.getElementById("startScherm");
const spelContent = document.getElementById("spelContent");
const gameOverScherm = document.getElementById("gameOver");
const herstartKnop = document.getElementById("herstartButton");

gameOverScherm.style.display= "none";
spelContent.style.display = "none";


// Start 
const naamInvoerVeld = document.getElementById("naamInvoer");
const startKnop = document.getElementById("startBTN");
const foutmeldingTekst = document.getElementById("foutmelding");


// Aapje afbeelding met naam
const aapPoppetje = document.getElementById("aapIMG1");
const naamTitel = document.querySelector("h2");


// Knoppen
const voerKnop = document.getElementById("voerBTN");
const drinkKnop = document.getElementById("drinkBTN");
const slaapKnop = document.getElementById("slaapBTN");
const dansKnop = document.getElementById("dansBTN");
const vendingKnop = document.getElementById("vendingBTN");


// levels
let voerLvl;
let energieLvl;
let banaanLvl;
let dorstLvl;
let voerTimer;
let energieTimer;
let dorstTimer;
let jungleJuiceLvl;


// Indicatie van hoeveelheden bananen en jungleJuice
const banaanHoeveelheid = document.getElementById("banaanTekst");
const jungleJuiceHoeveelheid = document.getElementById("drinkTekst");



//Start scherm 
startKnop.addEventListener("click", function() {
    const nieuweNaam = naamInvoerVeld.value

    if(nieuweNaam != ""){
        naamTitel.textContent = nieuweNaam;
        spelContent.style.display = "block";
        startScherm.style.display = "none";
        startSpel();
    }else(foutmeldingTekst.textContent ="Voer naam in");
})

//Start het spel met alle features er in
function startSpel(){

    // Banaan feature 
    banaanLvl = 5;
    function updateBanaanTekst() {
        banaanHoeveelheid.textContent = "Banaantjes: " + banaanLvl;
    }
    updateBanaanTekst();

    function banaanMinder(){
        banaanLvl -=1;
        updateBanaanTekst();
    }


    // Bron: https://chatgpt.com/share/24c776ee-9d47-4d3c-adbe-7bd993d4f7df
    function genereerBanaan(){
        const banaanContainer = document.getElementById("banaanContainer");
        const banaan = document.createElement("img");
        banaan.src="images/banaanCollectable.png";
        banaan.className = "banaan";
        let x = Math.random() * (banaanContainer.clientWidth - 30);
        let y = Math.random() * (banaanContainer.clientHeight - 30);
        banaan.style.left = x + "px";
        banaan.style.top = y + "px";

        banaan.addEventListener("click", function(){
            banaanLvl += 1;
            updateBanaanTekst();
            banaan.remove();
            if(banaanLvl > 0) {
                document.getElementById("voerBTN").classList.remove("disabled");
            }
        })

        banaanContainer.appendChild(banaan);
    }

    setInterval(genereerBanaan, 2000);
    //------


    // Voer feature 
    voerLvl = 100;
    const voerTekst = document.getElementById("voerScoreTekst");
    const voerProgress = document.getElementById("voerBar");

    function updateVoerTekst() {
        voerTekst.textContent = voerLvl;
        voerProgress.value = voerLvl;
    }

    voerTimer = setInterval(function() {
        voerLvl -= 1;
        updateVoerTekst();
        if(voerLvl <= 0) {
            clearInterval(voerTimer);
            afbeeldingVeranderen();
        }
    },400)
    

    voerKnop.addEventListener('click', function() {
        if(banaanLvl > 0) {
            voerLvl += 10;
            banaanMinder();
        } 
        if(voerLvl > 100){ 
            voerLvl = 100;
        }
        updateVoerTekst();
    
        if(banaanLvl == 0){
        document.getElementById("voerBTN").classList.add("disabled");
        }
    })


    // dorst feature 
    dorstLvl = 100;
    const dorstTekst = document.getElementById("dorstScoreTekst");
    const dorstProgress = document.getElementById("dorstBar");

    function updateJungleJuiceTekst() {
        jungleJuiceHoeveelheid.textContent = "JungleJuice: " + jungleJuiceLvl;
    }

    function dorstUpdate(){
        dorstTekst.textContent = dorstLvl;
        dorstProgress.value = dorstLvl;
    }

    function jungleJuiceMinder(){
        jungleJuiceLvl -=1;
        updateJungleJuiceTekst();
    }

    dorstTimer = setInterval(function() {
        dorstLvl -= 1;
        dorstUpdate();
        if(dorstLvl <= 0) {
            clearInterval(dorstTimer);
            afbeeldingVeranderen();
        }
    },600)
    
    drinkKnop.addEventListener('click', function() {
        if(jungleJuiceLvl > 0) {
            dorstLvl += 20;
            jungleJuiceMinder();
        } 
        if(dorstLvl > 100){ 
            dorstLvl = 100;
        }
        dorstUpdate();
    
        if(jungleJuiceLvl == 0){
        document.getElementById("drinkBTN").classList.add("disabled");
        }
    })

        
    //vending
    jungleJuiceLvl = 5;
    
    updateJungleJuiceTekst();
    
    vendingKnop.addEventListener("click", function(){
        if(banaanLvl >= 3){
            banaanLvl -= 3;
            updateJungleJuiceTekst();
            jungleJuiceLvl += 1;
            updateJungleJuiceTekst();
            updateBanaanTekst();
        }
        if(jungleJuiceLvl > 0) {
                document.getElementById("drinkBTN").classList.remove("disabled");
        }
    })


    // Slaap feature 
    energieLvl = 100;
    const energieTekst = document.getElementById("energieScoreTekst");
    const energieProgress = document.getElementById("energieBar");

    energieTekst.textContent = energieLvl;
    energieProgress.value = energieLvl;

    energieTimer = setInterval(function() {
        energieLvl -= 1;
        energieTekst.textContent = energieLvl;
        energieProgress.value = energieLvl;
        
        if(energieLvl <= 0) {
        clearInterval(energieTimer);
        afbeeldingVeranderen();
        }
    },1000)
    
    slaapKnop.addEventListener('click', function() {
        energieLvl += 20;
        if(energieLvl > 100){ 
            energieLvl = 100;
        }
        energieTekst.textContent = energieLvl;
        energieProgress.value = energieLvl;
        setTimeout(function() {
            aapPoppetje.src = "images/aapsjeSlaap.png";
        }, 250);

        setTimeout(function() {
            aapPoppetje.src = "images/monkey1-default.png";
        }, 5000);
    })

    
    // Dans feature 
    // Bron muziek: https://youtu.be/IxvrYXtSiFg?si=9phha9YyyW9oQE2s
    // Bron tutorial: https://stackoverflow.com/questions/9419263/how-to-play-audio
    dansKnop.addEventListener('click', function() {
        function muziek(){
            let muziek = new Audio("muziek/FunkyDiscoCopyrightFreeMusic.mp3");
            muziek.play();
        }
        muziek()
        aapPoppetje.src = "images/aapdansje0.png";

        setTimeout(function() {
            aapPoppetje.src = "images/aapdansje1.png";
        }, 1200);

        setTimeout(function() {
            aapPoppetje.src = "images/aapdansje2.png";
        }, 2200);

        setTimeout(function() {
            aapPoppetje.src = "images/aapdansje3.png";
        }, 3200);

        setTimeout(function() {
            aapPoppetje.src = "images/monkey1-default.png";
        }, 4400);
    })
    //--------


    //afbeelding veranderen
    function afbeeldingVeranderen(){
        if(voerLvl < 1 || energieLvl < 1){
            aapPoppetje.src = "images/aapdood.png"
            setTimeout(function(){
            herstart();
        }, 800);
    } else{
        aapPoppetje.src = "images/monkey1-default.png";
    }}


}




// Game over
// Bron display: https://www.w3schools.com/jsref/prop_style_display.asp
function herstart(){
        spelContent.style.display = "none";
        gameOver.style.display = "block";
}


// Herstarten 
// Bron : https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
herstartKnop.addEventListener("click", function() {
   location.reload();
})

