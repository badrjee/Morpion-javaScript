// Utilisation d'une IIFE (Immediately invoked function expression).
(function() {
	// L'objet console permet de sortir des logs et des informations
	// détaillée sur les objets du DOM.
	console.log('Démarrage du Morpion !');

	let Player = function(username, className) {
		this.username = username;
		this.className = className;
		this.score=0
		this.index = null;
		this.getName = function() {
			return this.username;
		};
	};

	var Game = function() {
		this.maxRound=0;
		this.roundCount=0;
		this.turnCount = 0;
        this.listPlayers = [
				new Player("",'cross'),
                new Player("",'circule')
            ]
        this.data =[[],[],[]];
		this.playing = false;
		this.initialize = function() {
			event.preventDefault();
			// Récupérer chaque td de la table et associer
			// une fonction play() sur l'événement 'click'.
			this.maxRound= document.getElementById('nbManche').value;
			this.listPlayers[0].username = document.getElementById('J1').value;
			this.listPlayers[1].username = document.getElementById('J2').value;
			console.log(this.maxRound);
			console.log('init');
			this.roundCount=1;
			this.initializeTurn();
			this.listPlayers[0].score=0;
			this.listPlayers[1].score=0;
			refreshRound();
			refreshScore();
		};

		this.initializeTurn = function() {
		// Récupérer chaque td de la table et associer
			// une fonction play() sur l'événement 'click'.
			this.turnCount++;
			this.playing=true;
			this.turnCount = 0;
			this.data =[[],[],[]];
			var cells = document.querySelectorAll('table.morpion td');
			cells.forEach((cell,index,list) => {
				if(cell.hasChildNodes()){cell.removeChild(cell.childNodes[0])} ;
				cell.addEventListener("click",this.play);
			});
			refreshRound();
			

		};
		
		this.play = function(event){
			if(hyperpion.playing==true){
				let a=null;
				let b=null;
				
				switch (hyperpion.turnCount%2){

					case 0:
					let eTarget = event.target
					let croix=document.createElement('h1');
					croix.className='croix';
					croix.innerHTML='X';
					eTarget.appendChild(croix);
					a=event.path[1].className.charAt(5).valueOf();
					b=event.target.className.charAt(5).valueOf();
					hyperpion.data[a][b] = hyperpion.listPlayers[0];
					break;

					case 1:
					event.target.className+='J2'
					let rond=document.createElement('div');
					rond.className='rond';
					event.target.appendChild(rond);
					a=event.path[1].className.charAt(5).valueOf();
					b=event.target.className.charAt(5).valueOf();
					hyperpion.data[a][b] = hyperpion.listPlayers[1];
					break;
				}
				event.target.removeEventListener("click",hyperpion.play);
				hyperpion.turnCount++;

				var result=checkVictory();
				if(result!=null | hyperpion.turnCount ==9){
					stopGame(result);
				}
			}
			
			if (hyperpion.playing==false){
				
				hyperpion.initialize();
			
			}
			
		}

		function checkVictory(){
			var won=null;
			for(var i=0;i<3;i++){
				if(hyperpion.data[i][0]==hyperpion.data[i][1] && hyperpion.data[i][1]==hyperpion.data[i][2]){
					won=hyperpion.data[i][0];
					break;
				}
				if(hyperpion.data[0][i]==hyperpion.data[1][i] && hyperpion.data[1][i]==hyperpion.data[2][i]){
					won=hyperpion.data[0][i];
					break;
				}
			}
			if(hyperpion.data[0][0]==hyperpion.data[1][1] && hyperpion.data[1][1]==hyperpion.data[2][2]){
				won=hyperpion.data[1][1];
			}	
			if(hyperpion.data[0][2]==hyperpion.data[1][1] && hyperpion.data[1][1]==hyperpion.data[2][0]){
				won=hyperpion.data[0][2];
			}	
			return won
		}


		
		function stopGame(result){
			
			if(result==null){
				setTimeout(function(){alert('Egalité')})
			} else{
				result.score++;
				setTimeout(function(){alert('Le joueur ' + result.username + ' à gagner la manche')})	
			}	
			if(++hyperpion.roundCount>hyperpion.maxRound && hyperpion.listPlayers[0].score !=hyperpion.listPlayers[1].score){endRound()}
			 
			refreshScore();
		}

		function refreshScore(){
			var newScore;
			if(hyperpion.roundCount>hyperpion.maxRound && hyperpion.listPlayers[0].score ==hyperpion.listPlayers[1].score){
				newScore=document.createTextNode("Score : "+ hyperpion.listPlayers[0].username +" " + hyperpion.listPlayers[0].score+" | "+hyperpion.listPlayers[1].username+" "+hyperpion.listPlayers[1].score+" - Mort subite !");
			}else{
				newScore=document.createTextNode("Score : "+ hyperpion.listPlayers[0].username +" " + hyperpion.listPlayers[0].score+" | "+hyperpion.listPlayers[1].username+" "+hyperpion.listPlayers[1].score);
			}
			let oldScore=document.getElementById('score').childNodes[0];
			oldScore.replaceChild(newScore,oldScore.childNodes[0]);
		}

		function refreshRound(){
			let newManche=document.createTextNode("Manche : "+hyperpion.roundCount + "/" + hyperpion.maxRound);
			let oldManche=document.getElementById('manche').childNodes[0];
			oldManche.replaceChild(newManche,oldManche.childNodes[0]);
		}

		function endRound(){
			if(hyperpion.listPlayers[0].score>hyperpion.listPlayers[1].score){
				var winner = hyperpion.listPlayers[0];
			}
			else{var winner = hyperpion.listPlayers[1];}
			
			setTimeout(function(){alert('Le joueur ' + winner.username + ' à gagner la partie')})
			
			hyperpion.playing=false;
			
			setTimeout(function(){alert('merci de REDÉMARER le jeu')})
			
		}

		

	};

    window.hyperpion = new Game();

	
})();
