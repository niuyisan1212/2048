function getPosTop(i, j){
	return 20 * (i + 1) + 100 * i;
}

function getPosLeft(i, j){
	return 20 * (j + 1) + 100 * j;
}

function getNumberBackgroundColor(boardValue){
	switch(boardValue){
		case 2: return '#eee4da'; break;
		case 4: return '#ede0c8'; break;
		case 8: return '#f2b179'; break;
		case 16: return '#f59563'; break;
		case 32: return '#f67c5f'; break;
		case 64: return '#f65e3b'; break;
		case 128: return '#edcf72'; break;
		case 256: return '#edcc61'; break;
		case 512: return '#9c0'; break;
		case 1024: return '#33b5e5'; break;
		case 2048: return '#09c'; break;
		case 4096: return '#a6c'; break;
		case 8192: return '#93c'; break;
		default : return '#000';
	}
}

function getNumberColor(boardValue){
	if(boardValue <= 4){
		return '#776e65';
	}
	return '#fff';
}

function noSpace(){
	for(let i = 0; i < 4; i ++){
		for(let j = 0; j < 4; j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}

function noMove(boardArr){
	if(isCanDown(boardArr) || isCanLeft(boardArr) || isCanRight(boardArr) || isCanUp(boardArr)){
		return false;
	}
	return true;
}

function isCanLeft(boardArr){
	/**
	判断是否有格子能左移:
	1.当左边的格子没有值时，可以左移
	2.当左边的格子和当前的格子值相等时，可以左移
	*/
	for(let i = 0; i < 4; i ++){
		for(let j = 1; j < 4; j++){
			//注：此时应先判断当前格子是否有值，只有存在值时才有判断是否能够左移的意义
			if(boardArr[i][j] != 0){
				if(boardArr[i][j-1] == 0 || boardArr[i][j] == boardArr[i][j-1]){
					return true;
				}
			}
		}
	}
	return false;
}

function isCanUp(boardArr){
	/**
	判断是否有格子能上移:
	1.当上边的格子没有值时，可以上移
	2.当上边的格子和当前的格子值相等时，可以上移
	*/
	for(let i = 0; i < 4; i ++){
		for(let j = 1; j < 4; j++){
			//注：此时应先判断当前格子是否有值，只有存在值时才有判断是否能够左移的意义
			if(boardArr[j][i] != 0){
				if(boardArr[j-1][i] == 0 || boardArr[j][i] == boardArr[j-1][i]){
					return true;
				}
			}
		}
	}
	return false;
}

function isCanRight(boardArr){
	for(let i = 0; i < 4; i ++){
		for(let j = 2; j >= 0; j--){
			//注：此时应先判断当前格子是否有值，只有存在值时才有判断是否能够左移的意义
			if(boardArr[i][j] != 0){
				if(boardArr[i][j+1] == 0 || boardArr[i][j] == boardArr[i][j+1]){
					return true;
				}
			}
		}
	}
	return false;
}

function isCanDown(boardArr){
	for(let i = 0; i < 4; i ++){
		for(let j = 2; j >= 0; j--){
			//注：此时应先判断当前格子是否有值，只有存在值时才有判断是否能够左移的意义
			if(boardArr[j][i] != 0){
				if(boardArr[j+1][i] == 0 || boardArr[j][i] == boardArr[j+1][i]){
					return true;
				}
			}
		}
	}
	return false;
}

function hasBarsOnCol(row, col1, col2, boardArr){
	for(let i = col2 + 1; i < col1; i++){
		if(boardArr[row][i] != 0){
			return true;
		}
	}
	return false;
}

function hasBarsOnRow(col, row1, row2, boardArr){
	for(let i = row2 + 1; i < row1; i++){
		if(boardArr[i][col] != 0){
			return true;
		}
	}
	return false;
}

