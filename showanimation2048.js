function showNumberWithAnimation(i, j, number){
	var numberCell = $('#number-cell-' + i + '-' + j);
	numberCell.css({
	    "background-color": getNumberBackgroundColor(number),
	    "color": getNumberColor(number)
	});
	numberCell.text(number);
	numberCell.animate({
	    width: '100px',
	    height: '100px',
		top: getPosTop(i, j),
		left: getPosLeft(i, j)
	}, 50); // 在50ms内CSS过渡到设定值
}

//该函数没有自己独立完成，看的视频，需要多加巩固
//左移动的动画就是把当前位置移动到待填充位置，完成时间200ms
function moveWithAnimation(fromX, fromY, toX, toY){
	var numberCell = $('#number-cell-' + fromX + '-' + fromY);
	numberCell.animate({
		top: getPosTop(toX, toY),
		left: getPosLeft(toX, toY)
	}, 200); // 在200ms内CSS过渡到设定值	
}

function updateScore(newScore){
	$('#score').text(newScore);
}