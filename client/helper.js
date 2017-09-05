var dragmove = function (d) {
  var x = d3.event.x - 50;
  var y = d3.event.y - 50;
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
  increaseScore();
}

var generateStartAndEnd = () => {
  var random = Math.floor(Math.random() * 4);
  var start, end;
  if (random === 0) {
    //Start top, go bottom. Random X
    start = [Math.random() * boardWidth, 0 - imgSize];
    end = [Math.random() * boardWidth, boardHeight + imgSize];
  } else if (random === 1) {
    //Start left, go right Random Y
    start = [0 - imgSize, Math.random() * boardHeight];
    end = [boardWidth + imgSize, Math.random() * boardHeight];
  } else if (random === 2) {
    //Start bottom, go top Random X
    start = [Math.random() * boardWidth, boardHeight + imgSize];
    end = [Math.random() * boardWidth, 0 - imgSize];
  } else {
    //Start right, go left Random Y
    start = [boardWidth + imgSize, Math.random() * boardHeight];
    end = [0 - imgSize, Math.random() * boardHeight];
  }
  return [start, end];
}

var generateAsteroid = () => {
  var result = {};
  result.startPos, result.endPos = [];

  [result.startPos, result.endPos] = generateStartAndEnd();

  result.size = Math.random() * 1 + 0.5;

  result.speed = 800 + (result.size * 1000);
  return result;
}

var getPos = (d, request) => {
  if (request === 'start') {
    return 'translate(' + d.startPos[0] + ',' + d.startPos[1] + ')';
  } else {
    return 'translate(' + d.endPos[0] + ',' + d.endPos[1] + ')';
  }
};


//Collision detection
var handleMouseOver = (d, i) => {
  sampleData = [];
  collisions += 1;

  if (score > highScore) {
    d3.select('.highscore span').text(score);
    highScore = score;
  }

  //Reset scorescore = 0;
  score = 0;
  d3.select('.current span').text(score);

  d3.select('.collisions span').text(collisions);
  d3.selectAll('.asteroid').remove();
  d3.select('.board .player').attr('transform', 'translate(' + boardWidth/2 + ',' + boardHeight/2 + ')');
};

var increaseScore = () => {
  //scoreTimer = setInterval(() => {
  score += 1;
  d3.select('.current span').text(score);
  //}, 500);
};

var stopIncreasingScore = function() {
  clearInterval(scoreTimer);
};
