// Utilisation d'une IIFE (Immediately-Invoked Function Expression)

(function() {
    console.log('Démarrage Morpion !');
    let table = document.getElementsByClassName('morpion')[0];


    let Player = function(username, className) {
        this.username = username;
        this.className = className;
        this.index = null;
        this.getName = function() {
            return this.username;
        };
    };

    let Game = function() {
        this.turnCount = 0;
        this.players = [
            new Player(prompt('Pseudo du Joueur 1 : '), 'cercle'),
            new Player(prompt('Pseudo du Joueur 2 : '), 'croix')
        ];
        this.data = [
            [], [], []
        ];
        this.playing = false;

        this.initialize = function() {
            //Récupérer pour chaque th de la table et associer une fonction play() sur l'évenement 'click'.
            
            console.log('Game initialisée, Bonne Partie !');
            let cell = document.getElementsByTagName('td')[0];
            
            document.querySelectorAll('table.morpion td').forEach((cell, index, list) =>{
                console.log(cell, index, list)
                cell.addEventListener('click',this.play);

            });
       
        };  

        this.play = function(result){

            if (result !== null || Morpion.turnCount===9) {
                Morpion.stopGame(result);
            };
            let cercle = document.createElement('div');
            cercle.style.height = '70px';
            cercle.style.width = '70px';
            cercle.style.margin = 'auto';
            cercle.style.border = '5px solid blue';
            cercle.style.borderRadius = '50%';

            let croix = document.createElement('h1');
            croix.style.height = '100%';
            croix.style.width = '100%';
            croix.style.margin = 'auto';
            croix.style.padding = 'auto';
            croix.innerText = 'X';
            croix.style.textAlign = 'center';  
            
            let currentPlayer = Morpion.players[Morpion.turnCount % 2];

            let clickedCell = event.target || event.currentTarget;
            console.log('Le joueur %s a joué dans la cellule :', currentPlayer.getName(), clickedCell);
            
            ++Morpion.turnCount;    
            console.log('turnCount ='+ Morpion.turnCount);
            if ((Morpion.turnCount%2) !== 0) { //Player 1 joue
                console.log('Tour du Joueur :'+ currentPlayer.getName());
                clickedCell.appendChild(cercle);
                console.log(currentPlayer);
                a=event.path[1].classList[0].split('=')[1];
                console.log('a='+a);
                b=clickedCell.classList[0].split('-')[1];
                console.log('b='+b);
                Morpion.data[a][b] = currentPlayer.username;
                console.log(Morpion.data);
                
            } else if ((Morpion.turnCount%2) === 0){ //Player 2 joue
                console.log('Tour du Joueur :'+ currentPlayer.getName());
                clickedCell.appendChild(croix);  
                console.log(currentPlayer);
                a=event.path[1].classList[0].split('=')[1];
                console.log('a='+a);
                b=clickedCell.classList[0].split('-')[1];
                console.log('b='+b);
                Morpion.data[a][b] = currentPlayer.username;
                console.log(Morpion.data);                           
   
            };
            // console.log(Morpion.currentPlayer)
            // a=event.path[1].classList[0].split('=')[1];
            // console.log('a='+a);
            // b=clickedCell.classList[0].split('-')[1];
            // console.log('b='+b);
            // Morpion.data[a][b] = Morpion.currentPlayer.username;
            // console.log(Morpion.data);
            clickedCell.removeEventListener('click', Morpion.play);
            Morpion.checkVictoire();
            
        };

        this.checkVictoire = function(){
            console.log('On est dans checkVictoire');
            console.log(Morpion.data[0][0] + Morpion.data[1][0] + Morpion.data[2][0]);
            let result = null;
            for (let i=0;i<3;i++){
                console.log('boucle for');
                if(Morpion.data[i][0]!==undefined && Morpion.data[i][0]===Morpion.data[i][1] && Morpion.data[i][1]===Morpion.data[i][2] && Morpion.data !== 'undefined') {
                    console.log('valeurs identiques sur la ligne');
                    result=Morpion.data[i][0];
                    console.log('result= ' +result);
                } else if (Morpion.data[0][i]!==undefined && Morpion.data[0][i]===Morpion.data[1][i] && Morpion.data[1][i]===Morpion.data[2][i] && Morpion.data !== 'undefined') {
                    console.log('valeurs identiques sur la colonne');
                    result=Morpion.data[0][i];
                    console.log('result= ' +result);
                } else if (Morpion.data[1][1]!==undefined && Morpion.data[0][0]===Morpion.data[1][1] && Morpion.data[1][1]===Morpion.data[2][2] || Morpion.data[0][2]===Morpion.data[1][1] && Morpion.data[1][1]===Morpion.data[2][0] && Morpion.data !== 'undefined') {
                    console.log('valeurs identiques sur la diagonale');
                    result=Morpion.data[1][1];
                    console.log('result= ' +result);
                };
                return result;
            };
        };

        this.stopGame = function(result) {
            let matchNul = document.createElement('div');
            matchNul.style.zIndex = '+1';
            matchNul.style.position = 'absolute';
            matchNul.style.textAlign = 'center';
            matchNul.style.width = '200px';
            matchNul.style.height = '125px';
            matchNul.style.fontSize = '20';
            matchNul.innerText = 'MATCH NUL !';

            let vainqueur = document.createElement('div');
            vainqueur.style.zIndex = '+1';
            vainqueur.style.position = 'absolute';
            vainqueur.style.textAlign = 'center';
            vainqueur.style.width = '200px';
            vainqueur.style.height = '125px';
            vainqueur.style.fontSize = '20';
            vainqueur.innerText = 'Gagnant : '+result+'. Felicitations !';

            if(result===null) {
                console.log('match nul !');
                event.path[2].appendChild(matchNul);
             
            } else {
                console.log('Nous avons un gagnant');
                console.log('winner : '+result);
                event.path[2].appendChild(vainqueur);
                
            };
            return null;
        };
    };
    window.Morpion = new Game();
})();
