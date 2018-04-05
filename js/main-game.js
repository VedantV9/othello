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
var possible_chance_color = ["","circle-black-light","circle-white-light","circle-black-light"];
var game_over=0;
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

var total_possible_flips=0;

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
		total_possible_chances();
	
	}
	else
	{
		error_msg="<br/>Warning: " +'you can not move above any piece!';
	}

	$("#info-area").fadeToggle(200);
	document.getElementById('info-area').innerHTML = '<div style="padding:2px;background-color:'+player_color[chance]+';width:2vw;height:2vw;border-radius:500px;border:2px solid #000;"></div>'+'Player '+chance+'\'s move' + error_msg;
	$("#info-area").fadeToggle(200);		
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

	if(score_black==0 || score_white == 0 || game_over==1)
	{
		if(game_over==1 && score_black+score_white<64 && chance==1)
		{
			game_over=2;
			chance=2;
			document.getElementById('info-area').innerHTML = 'No possible move for BLACK<br/>white moves again!!';
		}	
		else if(game_over==1 && score_black+score_white<64 && chance==2)
		{
			game_over=2;
			chance=1;
			document.getElementById('info-area').innerHTML = 'No possible move for BLACK<br/>white moves again!!';
		}	
		else if(score_black>score_white)
			document.getElementById('info-area').innerHTML = 'GAME OVER !!!<br/>BLACK wins!!';
		else if(score_black<score_white)
			document.getElementById('info-area').innerHTML = 'GAME OVER !!!<br/>WHITE wins!!';
		else
			document.getElementById('info-area').innerHTML = 'GAME OVER !!!<br/>match DRAW!!';

	}
	if(game_over==-1)
		document.getElementById('info-area').innerHTML = 'GAME OVER !!!<br/>No possible move!!';



//	console.log(s);
}

function total_possible_chances()
{
	var game_possible =0 ;
	for(var i=1;i<=8;i++)
	{
		for(var j=1;j<=8;j++)
		{

				document.getElementById("block-"+i+"-"+j).classList.remove('circle-black-light');
				document.getElementById("block-"+i+"-"+j).classList.remove('circle-white-light');
			if(game_board[i][j]==0)
			{
				if(possible_chances(i,j))
				{
					game_possible++;
				}

			}
					
//			console.log('BOARD CHECK AT '+i+'-'+j+' total_possible_flips VAL = '+total_possible_flips);
		}
	}
	if(game_possible==0)
	{
		if(game_over!=2)
		game_over=1;
		else if(game_over==2) game_over=-1;			
	}

}

function possible_chances(x,y)
{
//console.log('checking @ '+x+'-'+y)

	total_possible_flips=0;
//	console.log('INSIDE LOOP AT '+x+'-'+y+' total_possible_flips VAL = '+total_possible_flips);

	//UP
	possible_flip_direction(x-1,y,-1,0);
	if(total_possible_flips>0)
	{
		console.log('possible to move on'+x+'-'+y);
				document.getElementById("block-"+x+"-"+y).classList.toggle(possible_chance_color[chance]);
		return true;
	}	

	//DOWN
	possible_flip_direction(x+1,y,1,0);
	if(total_possible_flips>0)
	{
		console.log('possible to move on'+x+'-'+y)
				document.getElementById("block-"+x+"-"+y).classList.toggle(possible_chance_color[chance]);
		return true;
	}	

	//RIGHT
	possible_flip_direction(x,y+1,0,1);
	if(total_possible_flips>0)
	{
		console.log('possible to move on'+x+'-'+y)
				document.getElementById("block-"+x+"-"+y).classList.toggle(possible_chance_color[chance]);
		return true;
	}	

	//LEFT
	possible_flip_direction(x,y-1,0,-1);
	if(total_possible_flips>0)
	{
		console.log('possible to move on'+x+'-'+y)
				document.getElementById("block-"+x+"-"+y).classList.toggle(possible_chance_color[chance]);
		return true;
	}	

	//UP RIGHT
	possible_flip_direction(x-1,y+1,-1,1);
	if(total_possible_flips>0)
	{
		console.log('possible to move on'+x+'-'+y)
				document.getElementById("block-"+x+"-"+y).classList.toggle(possible_chance_color[chance]);
		return true;
	}	

	//UP LEFT
	possible_flip_direction(x-1,y-1,-1,-1);
	if(total_possible_flips>0)
	{
		console.log('possible to move on'+x+'-'+y)
				document.getElementById("block-"+x+"-"+y).classList.toggle(possible_chance_color[chance]);
		return true;
	}	

	//DOWN RIGHT
	possible_flip_direction(x+1,y+1,1,1);
	if(total_possible_flips>0)
	{
		console.log('possible to move on'+x+'-'+y)
				document.getElementById("block-"+x+"-"+y).classList.toggle(possible_chance_color[chance]);
		return true;
	}	

	//DOWN LEFT
	possible_flip_direction(x+1,y-1,1,-1);
	if(total_possible_flips>0)
	{
		console.log('possible to move on'+x+'-'+y)
				document.getElementById("block-"+x+"-"+y).classList.toggle(possible_chance_color[chance]);
		return true;
	}	

		return false;
}

function possible_flip_direction(x,y,i,j)
{
//	console.log('checking '+x+","+y+" = " + game_board[x][y]);
	if(game_board[x][y]==chance)
		return true;

	if(game_board[x][y]==0)
		return false;

	if(possible_flip_direction(x+i,y+j,i,j))
	{
		total_possible_flips++;
		return true;
	}	

	return false;
}
