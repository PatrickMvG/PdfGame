const dieListe = document.querySelector("#dieliste")
const dieListe2 = document.querySelector("#dieliste2")
const dieListe3 = document.querySelector("#dieliste3")
const dieListe4 = document.querySelector("#dieliste4")
const dieListe5 = document.querySelector("#dieliste5")
const dieListe6 = document.querySelector("#dieliste6")

let budget = 5000

const systeme = [
    { name: "Sauerstoffversorgung", status: "kritisch", energieverbrauch: 80, reparaturkosten: 1200 },
    { name: "Kantine", status: "normal", energieverbrauch: 30, reparaturkosten: 100 },
    { name: "Antrieb", status: "kritisch", energieverbrauch: 95, reparaturkosten: 3000 },
    { name: "Kommunikation", status: "gestört", energieverbrauch: 40, reparaturkosten: 800 },
    { name: "Wasserversorgung", status: "gestört", energieverbrauch: 50, reparaturkosten: 900 },
    { name: "Beleuchtung", status: "normal", energieverbrauch: 10, reparaturkosten: 150 },
    { name: "Lichtgeschwindigkeit", status: "kritisch", energieverbrauch: 95, reparaturkosten: 4000 },
    { name: "Musik", status: "normal", energieverbrauch: 5, reparaturkosten: 30 }
];


for (let i = 0; i < systeme.length; i++) {
    const system = systeme[i]
    const newLi = document.createElement("li")
    const statusSpan = document.createElement("span")
    const newButton = document.createElement("button")
    newButton.textContent = "Reparatur"
    newButton.style.fontSize = "2vw"
    newButton.style.fontWeight = "800"
    newButton.style.border = "none"
    newButton.style.borderRadius = "50px"
    newLi.style.listStyleType = "none"

    statusSpan.textContent = system.status

    if (system.status === "kritisch") {
        newLi.style.background = "black"
        newLi.style.color = "white"
        statusSpan.style.color = "red"
    } else if (system.status === "gestört") {
        newLi.style.background = "rgb(50, 50, 50)"
        newLi.style.color = "white"
        statusSpan.style.color = "orange"
    } else {
        newLi.style.background = "aquamarine"
        statusSpan.style.color = "black"
    }
    newLi.append(`${i + 1}. ${system.name}\n Status:`, statusSpan, `\nKosten: ${system.reparaturkosten}`, " ")

    newButton.addEventListener("click", (event) => {
        event.stopPropagation()

        if (system.status === "normal") {
            return;
        }
        if (budget >= system.reparaturkosten) {
            system.status = "normal"
            budget -= system.reparaturkosten

            statusSpan.textContent = "normal"

            newLi.style.color = "black"
            statusSpan.style.color = "black";
            newLi.style.background = "aquamarine";

            dieListe5.textContent = ""
            anzahlJederArt(systeme)
            dieListe2.textContent = ""
            renderProblemSysteme(systeme)
            
            dieListe6.textContent = ""
            budgetF(budget)
        } else {
            alert("Du hast zu wenig Geld")
        }

    })

    newLi.append(newButton)
    dieListe.append(newLi)

}

for (const system of systeme.filter((ele) => ele.status === "kritisch")) {
    const newLi = document.createElement("li")

    const statusSpan = document.createElement("strong")
    statusSpan.textContent = system.status

    newLi.append(`${system.name}\n  Status:`, statusSpan)
    statusSpan.style.background = "green"
    newLi.style.background = "green"
    newLi.style.listStyleType = "none"
    newLi.style.color = "red"
    dieListe2.append(newLi)
}

function gesamtbudget(systeme) {
    const gesamtbudget = systeme.reduce((summe, preis) => summe + preis.reparaturkosten, 0)
    const newLi = document.createElement("li")
    newLi.textContent = `Gesamtkosten: ${gesamtbudget}€`
    newLi.style.listStyleType = "none"
    newLi.style.fontSize = "2vw"
    dieListe3.append(newLi)
}
gesamtbudget(systeme)

for (const symstem of systeme.map(sys => `${sys.name}: ${sys.energieverbrauch} kwH`)) {
    const newLi = document.createElement("li")
    newLi.textContent = symstem
    newLi.style.listStyleType = "none"
    newLi.style.background = "lightblue"
    newLi.style.border = "1px solid black"
    dieListe4.append(newLi)
}

function anzahlJederArt(liste) {
    const anzahl = liste.reduce((erg, sys) => {
        const zustand = sys.status
        erg[zustand] = (erg[zustand] || 0) + 1
        return erg
    }, {})

    for (const zustand in anzahl) {
        const newLi = document.createElement("li")
        newLi.textContent = `${zustand}: ${anzahl[zustand]}`
        newLi.style.listStyleType = "none"
        newLi.style.fontSize = "2vw"
        dieListe5.append(newLi)
    }
}
function renderProblemSysteme(systeme) {
    dieListe2.textContent = "";
    for (const system of systeme.filter((ele) => ele.status === "kritisch")) {
        const newLi = document.createElement("li");
        const statusSpan = document.createElement("strong");
        statusSpan.textContent = system.status;

        newLi.append(`${system.name}\n  Status:`, statusSpan);
        statusSpan.style.background = "green";
        newLi.style.background = "green";
        newLi.style.listStyleType = "none";
        newLi.style.color = "red";
        dieListe2.append(newLi);
    }
}

function budgetF(budget) {
    const newLi = document.createElement("li")
    newLi.textContent = `Aktuelles budget: ${budget}€`
    if(budget > 1000)
        newLi.style.listStyleType = "'👌'"
    else
        newLi.style.listStyleType = "'😒'"
    dieListe6.append(newLi)
}


anzahlJederArt(systeme)
renderProblemSysteme(systeme)
budgetF(budget)