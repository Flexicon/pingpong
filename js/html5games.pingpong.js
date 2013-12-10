var KEY = {
	UP : 38,
	DOWN : 40,
	W : 87,
	S : 83
}

var pingpong = {
	scoreA : 0,
	scoreB : 0
};
pingpong.pressedKeys = [];
pingpong.ball = {
	speed : 5,
	x : 190,
	y : 90,
	directionX : 1,
	directionY : 1
};

// Main function
$(function() {
	// set interval to call gameloop every 30 milliseconds
	pingpong.timer = setInterval(gameloop, 30);
	// markdown the key pressed and add it to the array
	$(document).keydown(function(e) {
		pingpong.pressedKeys[e.which] = true;
	});
	$(document).keyup(function(e) {
		pingpong.pressedKeys[e.which] = false;
	});
});

function gameloop() {
	movePaddles();
	moveBall();
}

function movePaddles() {
	// Paddle B
	if(pingpong.pressedKeys[KEY.UP]) {
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top", top-5);
	}
	if(pingpong.pressedKeys[KEY.DOWN]) {
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top", top+5);
	}
	// Paddle A
	if(pingpong.pressedKeys[KEY.W]) {
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top", top-5);
	}
	if(pingpong.pressedKeys[KEY.S]) {
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top", top+5);
	}
}

function moveBall() {
	var playgroundHeight = parseInt($("#playground").height());
	var playgroundWidth = parseInt($("#playground").width());
	var ball = pingpong.ball;
	// Check edges of playground
	// Check bottom edge
	if(ball.y + ball.speed*ball.directionY > playgroundHeight - 20) {
		ball.directionY = -1;
	}
	// Check top edge
	if(ball.y + ball.speed*ball.directionY < 0) {
		ball.directionY = 1;
	}
	// Check right edge
	if(ball.x +ball.speed*ball.directionX > playgroundWidth - 20) {
		// player B lost.
		pingpong.scoreA++;
		if(pingpong.scoreA >= 10){
			clearInterval(pingpong.timer);
			$("#winText").html("Player A wins!");
		}
		$("#scoreA").html(pingpong.scoreA);
		// reset the ball;
		ball.x = 240;
		ball.y = 90;
		$("#ball").css({
			"left": ball.x,
			"top" : ball.y
		});
		ball.directionX = -1;
	}
	// Check left edge
	if(ball.x + ball.speed*ball.directionX < 0) {
		// player A lost.
		pingpong.scoreB++;
		if(pingpong.scoreB >= 10) {
			clearInterval(pingpong.timer);
			$("#winText").html("Player B wins!");
		}
		$("#scoreB").html(pingpong.scoreB);
		// reset the ball;
		ball.x = 140;
		ball.y = 90;
		$("#ball").css({
			"left": ball.x,
			"top" : ball.y
		});
		ball.directionX = 1;
	}
	ball.y += ball.speed*ball.directionY;
	ball.x += ball.speed*ball.directionX;

	// Check left paddle
	var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
	var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
	var paddleAYTop = parseInt($("#paddleA").css("top"));

	if(ball.x + ball.speed*ball.directionX < paddleAX && !(ball.x < paddleAX)) {
		if(ball.y + ball.speed*ball.directionY <= paddleAYBottom &&
			ball.y + ball.speed*ball.directionY >= paddleAYTop - 10) {
			ball.directionX = 1;
		}
	}
	// Check right paddle
	var paddleBX = parseInt($("#paddleB").css("left"));
	var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
	var paddleBYTop = parseInt($("#paddleB").css("top"));

	if(ball.x + ball.speed*ball.directionX > paddleBX - 20 && !(ball.x > paddleBX)) {
		if(ball.y + ball.speed*ball.directionY <= paddleBYBottom &&
			ball.y + ball.speed*ball.directionY >= paddleBYTop - 10) {
			ball.directionX = -1;
		}
	}

	// After all collision detection
	// Move the ball
	$("#ball").css({
		"top" : ball.y,
		"left" : ball.x
	});
}