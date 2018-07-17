console.log('Démarrage Morpion !');
let table = document.getElementsByClassName('morpion')[0];
let tour = 0;


//Fonction vérification gagnant


//Fonction Match Nul
let matchNul = document.createElement('div');
matchNul.style.zIndex = '+1';
matchNul.style.position = 'absolute';
matchNul.style.textAlign = 'center';
matchNul.style.width = '200px';
matchNul.style.height = '125px';
matchNul.style.fontSize = '20';
matchNul.innerText = 'MATCH NUL !';
function fMatchNul() {
    if (tour==9) {
        console.log('Match Nul !');
        event.target.appendChild(matchNul);
    };
};

table.addEventListener('click', function(event) {
    let cercle = document.createElement('div');
    cercle.style.height = '70px';
    cercle.style.width = '70px';
    cercle.style.margin = 'auto';
    cercle.style.border = '5px solid blue';
    cercle.style.borderRadius = '50%';

    let croix = document.createElement('h1');
    croix.style.height = '70px';
    croix.style.width = '70px';
    croix.style.margin = 'auto';
    croix.innerText = '<h1>X</h1>';
    croix.style.textAlign = 'center';
    
    
    while(tour<9){ 

        tour=tour+1;    
        console.log('On est dans le while');
        console.log('tour ='+ tour);
        if ((tour%2) != 0) { //Player 1 joue

            console.log('Tour Joueur 1');
            event.target.appendChild(cercle);
            break;
        } else if ((tour%2) == 0){ //Player 2 joue

            console.log('Tour Joueur 2');
            event.target.appendChild(croix);
            break;
        }
        break;
    }
    fMatchNul();
});




// document.querySelectorAll('table morpion td').forEach((cell, index, list) =>{
//     console.log(cell, index, list)
// });
// --> va chercher tous les td de la table de classe 'morion'.
// 
// classlist -> donne un tableau
// classList[0].split('-')[1] -> donne l'indice de la case
