var mine = [];
const cells = document.querySelectorAll('.cell');


startGame();

function startGame(){
	for(i=0; i<cells.length; i++){
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', onClick, false);
		//console.log(i)
	}
	while(mine.length < 300){
		var a = Math.round(Math.random()*700);
		if(mine.indexOf(a) === -1){
			mine.push(a);
		}
	}
	mine.sort();
	for(i=0; i<cells.length; i++){
		if(mine.indexOf(i) === -1){
			console.log(mine.indexOf(cells[i]));
		}else{
			document.getElementById("."+i).style.backgroundColor = 'pink';
			//cells[i].style.removeProperty('background-color')
		}
	}
	console.log(mine);

	function onClick(square){
		//var isin = mine.indexOf(square.target.id) >=0;
		var thisSquare = square.target.id;
		var isin;
		for(i=0; i<mine.length; i++){
			if(mine[i] == thisSquare){
				console.log('in');
				isin = true;
				break;
			}
		}
		console.log(isin);
		if(isin){
			document.getElementById(square.target.id).style.backgroundColor = 'red';
		}else{
			document.getElementById(square.target.id).style.backgroundColor = 'blue';
		}
	}
}


