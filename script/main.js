const form = document.querySelector('form');
//  MENU BURGER
const links = document.querySelectorAll('nav li');

menu_burger.addEventListener('click', () => {
    nav.classList.toggle("active")
} );


links.forEach((link) => {
link.addEventListener('click', () => {
    nav.classList.remove("active");
});
})


const modaleContainer = document.querySelector('.modaleInscription');
const iconeFermer = document.querySelector('.form__btnFermer');
const iconeFermerDeux = document.querySelector('.form__btnFermerDeux');
const modaleRemerciementContainer = document.querySelector('.modaleInscriptionValidee');
const btnFermer = document.querySelector('.btnFermer'); 
const boutonSInscrire = document.querySelector('.btnInscription');
const boutonSInscrireDeux = document.querySelector('.btnInscriptionDeux');




boutonSInscrire.addEventListener("click", () => {
    modaleContainer.style.display = "block";
});

iconeFermer.addEventListener("click", (event) => {
    event.preventDefault();
    form.reset();
    modaleContainer.style.display = "none";
});    

iconeFermerDeux.addEventListener("click", () => {
    modaleRemerciementContainer.style.display = "none";
});

btnFermer.addEventListener("click", () => {
    modaleRemerciementContainer.style.display = "none";
});

boutonSInscrireDeux.addEventListener('click', () => {
    modaleContainer.style.display = "block";
});


// script qui gère le formulaire

// Les fonctions de vérification
function verifierVille (ville) {
    for (let i = 0; i < ville.length;i++) {
        if (ville[i].checked) {
            erreurVille.textContent = "";
            return true;
        }
    }
    erreurVille.textContent = "Vous devez choisir une ville";
    return false;
}

function verifierEmail (e_mail) {
    let regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
    if (regex.test(e_mail)) {
        erreurEmail.textContent = "";
        return true;
    }
    erreurEmail.textContent = "Veuillez saisir un email valide";
    return false;
}

function verifierChaineDeCaracteres(chaine, type) {
    let regex = new RegExp("^[a-zA-Z]{3,}$");
    if (regex.test(chaine.trim())) {
        if (type === "prenom") {
            erreurPrenom.textContent = "";
        } else if (type === "nom") {
            erreurNom.textContent = "";
        }    
        return true;
    }
    if (type === "prenom") {
        erreurPrenom.textContent = "Veuillez saisir un prénom de 3 caractères et ne contenant pas de chiffre";
    } else if (type === "nom") {
        erreurNom.textContent = "Veuillez saisir un nom de 3 caractères et ne contenant pas de chiffre";
    }
    return false;
}

function verifierConditions (conditionApprouvees) {
    if (conditionApprouvees.checked) {
        erreurCondition.textContent = "";
        return true;
    }
    erreurCondition.textContent = "Vous devez accepter les conditions d'utilisations";
    return false;
}

function nombreTournoisValide (nombre) {
    let regex = new RegExp("^[0-9]{1,3}$");
    if (regex.test(nombre)) {
        erreurNbreTournoi.textContent = "";
        return true;
    }
    erreurNbreTournoi.textContent = "Veuillez saisir un nombre de tournois valide";
    return false;
}

function differenceEnAnnees(dateParametre) {
    const dateActuelle = new Date();
    const dateFournie = new Date(dateParametre);
    const differenceEnMillisecondes = dateActuelle - dateFournie;
    const differenceEnAnnees = differenceEnMillisecondes / (1000 * 60 * 60 * 24 * 365);
  
    return Math.floor(differenceEnAnnees);
  }
  
function validerDate (date) {
    let ageDuCandidat = differenceEnAnnees(date);
    if (ageDuCandidat < 0) {
        erreurBirthday.textContent = "Veuillez saisir une date valide";
        return false;  
    } else if(ageDuCandidat > 16) {
        erreurBirthday.textContent = "";
        return true;
    } else {
        erreurBirthday.textContent = "Vous devez avoir au minimum 16 ans";
        return false;
  
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;
    const villes = document.querySelectorAll('input[type="radio"]');
    const birthday = document.getElementById("birthday").value;
    const nbreTournois = document.getElementById("nbreTournoi").value;
    const conditions = document.getElementById("conditions");

    // Les variables string
    let erreurPrenom = document.getElementById("erreurPrenom");
    let erreurNom = document.getElementById("erreurNom");
    let erreurEmail = document.getElementById("erreurEmail");
    let erreurBirthday = document.getElementById("erreurBirthday");
    let erreurNbreTournoi = document.getElementById("erreurNbreTournoi");
    let erreurVille = document.getElementById("erreurVille");
    let erreurCondition = document.getElementById("erreurCondition");

    // les variables booleens
    let formulaireValide = false;
    let nomValide = false;
    let prenomValide = false;
    let emailValide = false;
    let villeChoisie = false;
    let birthdayValide = false;
    let nbreTournoisValide = false;
    let conditionsAcceptees = false;
    
    nomValide = verifierChaineDeCaracteres(nom, "nom");
    prenomValide = verifierChaineDeCaracteres(prenom, "prenom");
    emailValide = verifierEmail(email);
    villeChoisie = verifierVille(villes);
    nbreTournoisValide = nombreTournoisValide(nbreTournois);
    conditionsAcceptees = verifierConditions(conditions);
    birthdayValide = validerDate(birthday);
    formulaireValide = nomValide && prenomValide && emailValide && villeChoisie && nbreTournoisValide && conditionsAcceptees;

    if (formulaireValide) {
        form.reset();
        modaleRemerciementContainer.style.display = "block";
        modaleContainer.style.display = "none"; 
        
    } 
});    