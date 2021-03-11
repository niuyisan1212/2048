var board = new Array();
var score = 0;
var hasConflicted = new Array();

$(document).ready(function(){
	newgame();
});

function newgame(){
	//初始化棋盘
	init();
	//随机在两个格子中生成数字
	generatorOneNumber();
	generatorOneNumber();
}

function init(){
	for(let i = 0; i < 4; i++){
		for(let j = 0; j < 4; j++){
			var gridCell = $('#grid-cell-' + i + '-' + j);
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
		}
	}
	
	for(let i = 0; i < 4; i ++){
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(let j = 0; j < 4; j++){
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}
	updataBoardView();
	score = 0;
	updateScore(score);
}

function updataBoardView(){
	//删除之前的nember-cell元素
	$('.number-cell').remove();
	
	var gridContainer = $('#grid-container');
	
	for(let i = 0; i < 4; i ++){
		for(let j = 0; j < 4; j++){
			hasConflicted[i][j] = false;
			gridContainer.append('<div class="number-cell" id="number-cell-' + i + '-' + j +'"></div>');
			var numberCell = $('#number-cell-' + i + '-' + j);
			if(board[i][j] == 0){
				numberCell.css({
					"width": "0px",
					"height": "0px",
				    "top": getPosTop(i, j) + 50,
				    "left": getPosLeft(i, j) + 50
				});
			}else{
				numberCell.css({
					"width": "100px",
					"height": "100px",
				    "top": getPosTop(i, j),
				    "background-color": getNumberBackgroundColor(board[i][j]),
				    "left": getPosLeft(i, j),
				    "color": getNumberColor(board[i][j])
				});
				numberCell.text(board[i][j]);
			}
		}
	}
}

function generatorOneNumber(){
	if(noSpace(board)){
		return false;
	}
	//生成一个随机坐标
	var randomX = parseInt(Math.floor(Math.random() * 4));
	var randomY = parseInt(Math.floor(Math.random() * 4));
	while(true){
		//判断随机坐标位置上是否有数字
		if(board[randomX][randomY] == 0){
			break;
		}
		randomX = parseInt(Math.floor(Math.random() * 4));
		randomY = parseInt(Math.floor(Math.random() * 4));
	}
	//生成一个随机数(2或4)
	var randomNumber = Math.random() > 0.5 ? 2 : 4;
	//将随机数放入随机坐标中(实现一个动画效果)
	//没有及时修改board的值，导致出现刷新十次左右后会出现只有一个格子有值的bug(因为不修改board的值，
	//第二次生成随机坐标时如果和第一次的坐标相同会认为第一个生成的坐标没有值，第一个坐标值就会被覆盖)
	board[randomX][randomY] = randomNumber;
	showNumberWithAnimation(randomX, randomY, randomNumber);
	return true;
}

function moveLeft(){
	for(let i = 0; i < 4; i ++){
		for(let j = 1; j < 4; j++){
			if(board[i][j] != 0){
				for(let k = 0; k < j; k++){
					/**
					判断当前格子是否能左移:
					1.当左边的格子没有值时，且当前格子和待填充格子之间没有障碍物时，可以直接左移
					2.当左边的格子和当前的格子值相等时，且当前格子和待填充格子之间没有障碍物时，左移且数值相加
					*/
					if(board[i][k] == 0 && !hasBarsOnCol(i, j, k, board)){
						board[i][k] = board[i][j];
						board[i][j] = 0;
						moveWithAnimation(i, j, i, k);
						//此处要加上continue跳出本次循环
						continue;
					}else if(!hasBarsOnCol(i, j, k, board) && board[i][j] == board[i][k] && !hasConflicted[i][k]){
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						hasConflicted[i][k] = true;
						updateScore(score);
						moveWithAnimation(i, j, i, k);
						continue;
					}
				}
			}
		}
	}
	//延迟200ms后执行更新页面操作，否则动画效果出不来
	setTimeout('updataBoardView()',200);
}

function moveUp(){
	for(let i = 0; i < 4; i ++){
		for(let j = 1; j < 4; j++){
			if(board[j][i] != 0){
				for(let k = 0; k < j; k++){
					if(board[k][i] == 0 && !hasBarsOnRow(i, j, k, board)){
						board[k][i] = board[j][i];
						board[j][i] = 0;
						moveWithAnimation(j, i, k, i);
						//此处要加上continue跳出本次循环
						continue;
					}else if(!hasBarsOnRow(i, j, k, board) && board[j][i] == board[k][i] && !hasConflicted[k][i]){
						board[k][i] += board[j][i];
						board[j][i] = 0;
						score += board[k][i];
						hasConflicted[k][i] = true;
						updateScore(score);
						moveWithAnimation(j, i, k, i);
						continue;
					}
				}
			}
		}
	}
	//延迟200ms后执行更新页面操作，否则动画效果出不来
	setTimeout('updataBoardView()',200);
}

function moveRight(){
	for(let i = 0; i < 4; i ++){
		for(let j = 2; j >= 0; j--){
			if(board[i][j] != 0){
				for(let k = 3; k > j; k--){
					if(board[i][k] == 0 && !hasBarsOnCol(i, k, j, board)){
						board[i][k] = board[i][j];
						board[i][j] = 0;
						moveWithAnimation(i, j, i, k);
						//此处要加上continue跳出本次循环
						continue;
					}else if(!hasBarsOnCol(i, k, j, board) && board[i][j] == board[i][k] && !hasConflicted[i][k]){
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						hasConflicted[i][k] = true;
						updateScore(score);
						moveWithAnimation(i, j, i, k);
						continue;
					}
				}
			}
		}
	}
	//延迟200ms后执行更新页面操作，否则动画效果出不来
	setTimeout('updataBoardView()',200);
}

function moveDown(){
	for(let i = 0; i < 4; i ++){
		for(let j = 2; j >= 0; j--){
			if(board[j][i] != 0){
				for(let k = 3; k > j; k--){
					if(board[k][i] == 0 && !hasBarsOnRow(i, k, j, board)){
						board[k][i] = board[j][i];
						board[j][i] = 0;
						moveWithAnimation(j, i, k, i);
						//此处要加上continue跳出本次循环
						continue;
					}else if(!hasBarsOnRow(i, k, j, board) && board[j][i] == board[k][i] && !hasConflicted[k][i]){
						board[k][i] += board[j][i];
						board[j][i] = 0;
						score += board[k][i];
						hasConflicted[k][i] = true;
						updateScore(score);
						moveWithAnimation(j, i, k, i);
						continue;
					}
				}
			}
		}
	}
	//延迟200ms后执行更新页面操作，否则动画效果出不来
	setTimeout('updataBoardView()',200);
}

function isGameOver(){
	if(noSpace() && noMove(board)){
		gameOver();
	}
}

function gameOver(){
	alert("游戏结束，你的得分为" + score);
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37:
			//left
			if(isCanLeft(board)){
				moveLeft();
				setTimeout('generatorOneNumber()',210);
				setTimeout('isGameOver()',270);
			}
			break;
		case 38:
		    //up
			if(isCanUp(board)){
				moveUp();
				setTimeout('generatorOneNumber()',210);
				setTimeout('isGameOver()',270);
			}
		    break;
		case 39:
		    //right
			if(isCanRight(board)){
				moveRight();
				setTimeout('generatorOneNumber()',210);
			    setTimeout('isGameOver()',270);
			}
			break;
		case 40:
		    //down
			if(isCanDown(board)){
				moveDown();
				setTimeout('generatorOneNumber()',210);
			    setTimeout('isGameOver()',270);
			}
			break;
		default:
			break;
	}
});

