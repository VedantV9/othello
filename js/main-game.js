$(document).ready(function(){
	var blockrow='';
	for(var i=1;i<=8;i++)
	{
		blockrow ='<tr class="othello-board-row">';
		for(var j=1;j<=8;j++)
		{
			blockrow = blockrow + '<td class="othello-board-block" onclick="make_move('+i+','+j+')" >';
			blockrow = blockrow + '<center><div class="" id="block-'+i+'-'+j+'"></div></center>';			
			blockrow = blockrow + '</td>';		
		}	
		blockrow= blockrow + '</tr>';
		document.getElementById('othello-board').innerHTML = document.getElementById('othello-board').innerHTML + blockrow;
	}
	document.getElementById('block-4-4').classList.add("circle-black"); 
	document.getElementById('block-5-5').classList.add("circle-black"); 
	document.getElementById('block-5-4').classList.add("circle-white"); 
	document.getElementById('block-4-5').classList.add("circle-white"); 

});

var chance=1;
var chance_color = ["","circle-black","circle-white","circle-black"];
var player_color = ["","black","white"];
var total_flips = 0; 
var game_board = [
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,1,2,0,0,0,0],
					[0,0,0,0,2,1,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
				];

// 2 = white's chance | 1 = black's chance | black is always first
function make_move(i,j)
{
	var error_msg="";
	if(game_board[i][j]==0)
	{
		if(chance==1)
		{
			document.getElementById("block-"+i+"-"+j).classList.add("circle-black");			
			game_board[i][j]=1;
			if(flip_circles(i,j))
			{
				chance=2;
			}
			else
			{
				game_board[i][j]=0;
				error_msg = "<br/>Warning: " +'There should be atleast one flip!';				
				document.getElementById("block-"+i+"-"+j).classList.remove("circle-black");						
			}	
			display_gameboard();
		}
		else if(chance==2)
		{
			document.getElementById("block-"+i+"-"+j).classList.add("circle-white");			
			game_board[i][j]=2;
			if(flip_circles(i,j))
			{
				chance=1;
			}
			else
			{
				game_board[i][j]=0;
				error_msg = "<br/>Warning: " +'There should be atleast one flip!';				
				document.getElementById("block-"+i+"-"+j).classList.remove("circle-white");						
			}	
			display_gameboard();
		}	
	}
	else
	{
		error_msg="<br/>Warning: " +'you can not move above any piece!';
	}	
	document.getElementById('info-area').innerHTML = '('+player_color[chance]+')'+'Player '+chance+'\'s move' + error_msg;
	count_score();	
}

function flip_circles(x,y)
{
//	document.getElementById("block-"+x+"-"+y).classList.add(chance_color[chance]);
	game_board[x][y]=chance;

	//UP
	flip_direction(x-1,y,-1,0);

	//DOWN
	flip_direction(x+1,y,1,0);

	//RIGHT
	flip_direction(x,y+1,0,1);

	//LEFT
	flip_direction(x,y-1,0,-1);

	//UP RIGHT
	flip_direction(x-1,y+1,-1,1);

	//UP LEFT
	flip_direction(x-1,y-1,-1,-1);

	//DOWN RIGHT
	flip_direction(x+1,y+1,1,1);

	//DOWN LEFT
	flip_direction(x+1,y-1,1,-1);

	if(total_flips==0)
		return false;

	total_flips=0;
	return true;

}

function flip_direction(x,y,i,j)
{
//	console.log('UP checking '+x+","+y+" = " + game_board[x][y]);
	if(game_board[x][y]==chance)
		return true;

	if(game_board[x][y]==0)
		return false;

	if(flip_direction(x+i,y+j,i,j))
	{
		flip(x,y);
		return true;
	}	
	return false;
}

function flip(x,y)
{
		total_flips++;
		game_board[x][y]=chance;

//		console.log('start flipping: '+x+","+y+" | "+document.getElementById("block-"+x+"-"+y).classList);		
		document.getElementById("block-"+x+"-"+y).classList.toggle("circle-black");
		document.getElementById("block-"+x+"-"+y).classList.toggle("circle-white");
//		console.log('start flipping: '+x+","+y+" | "+document.getElementById("block-"+x+"-"+y).classList);		
}

function display_gameboard()
{
	var s = "";
	for(var i=1;i<=8;i++)
	{
		s = s + "\nrow "+i+": ";
		for(var j=1;j<=8;j++)
		{
			s=s+ " " + game_board[i][j];
		}
	}
//	console.log(s);
}
function count_score()
{
	var score_black=0,score_white=0;
	for(var i=1;i<=8;i++)
	{
		for(var j=1;j<=8;j++)
		{
			if(game_board[i][j]==1)
				score_black++;
			else if(game_board[i][j]==2)
				score_white++;
		}
	}
	document.getElementById('player-1-score').innerHTML=score_black;
	document.getElementById('player-2-score').innerHTML=score_white;

	if(score_black==0 || score_white == 0)
		document.getElementById('info-area').innerHTML = 'GAME OVER !!!';

//	console.log(s);
}

