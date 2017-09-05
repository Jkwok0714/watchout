// start slingin' some d3 here.
/* Fail attempt
d3.select('.board').selectAll('div').data([150, 10, 170]).enter()
  .append('svg').style("border", "1px solid black")
  .attr('width', 50).attr('height', 50)
  .attr('x', (d) => d).attr('y', (d) => d);
  //.style('position', 'absolute');
*/


var sampleData = [];
var boardHeight = 500;
var boardWidth = 700;
var imgSize = 50;
var maxAsteroidsOnField = 7;

var highScore = 0, collisions = 0, score = 0;
var scoreTimer;

var container = d3.select('.board').append('svg').attr('width', boardWidth).attr('height', boardHeight)
.style('border', '1px solid yellow').attr('class', 'gameBoard');

var drag = d3.behavior.drag()
.on("drag", dragmove);

function dragmove(d) {
  var x = d3.event.x - 50;
  var y = d3.event.y - 50;
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}

var player = container.append('svg:image').attr('xlink:href', 'falcon.png')
  .attr('height', imgSize * 1.5).attr('width', imgSize * 1.5).attr('class', 'player')
  .attr('transform', 'translate(' + boardWidth/2 + ',' + boardHeight/2 + ')')
  .call(drag);









var generateStartAndEnd = function() {
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

var generateAsteroid = function() {
  var result = {};
  result.startPos, result.endPos = [];

  [result.startPos, result.endPos] = generateStartAndEnd();
  return result;
}

var getPos = function(d, request) {
  if (request === 'start') {
    return 'translate(' + d.startPos[0] + ',' + d.startPos[1] + ')';
  } else {
    return 'translate(' + d.endPos[0] + ',' + d.endPos[1] + ')';
  }
};


//Collision detection
var handleMouseOver = function(d, i) {
  sampleData = [];
  collisions += 1;
  d3.select('.collisions span').text(collisions);
  d3.selectAll('.asteroid').remove();
  //window.alert('Mouse over!');
};

var increaseScore = function() {
  //scoreTimer = setInterval(() => {
  score += 5;
  d3.select('.current span').text(score);
  //}, 500);
};

var stopIncreasingScore = function() {
  clearInterval(scoreTimer);
};




var runAsteroidSpawner = function() {
  if (sampleData.length <= maxAsteroidsOnField) {
    sampleData.push(generateAsteroid());
  }

  d3.select('.board svg').on('mouseenter', increaseScore);

  console.log('Called asteroid spawners with', sampleData.length,'asteroids.');
  var asteroids = container.selectAll('image').data(sampleData);
  asteroids.enter()
    .append('svg:image').attr('xlink:href', 'asteroid.png')
    .attr('height', imgSize).attr('width', imgSize).attr('class', 'asteroid').on('mouseover', handleMouseOver)
    .attr('transform', (d) => getPos(d, 'start'))
    .transition().duration(1600).ease('linear')
    .attr('transform', (d) => getPos(d, 'end')).remove();

  // asteroids.exit().remove();



  if (sampleData.length >= maxAsteroidsOnField) {
    console.log('Over max asteroids!');
    sampleData.shift();
    console.log('Popped. New length', sampleData.length);
  }

  // if () {
  //   score += 10;
  //   d3.select('.current span').text(score);
  // }
  increaseScore();

  setTimeout(runAsteroidSpawner, 500);
}

runAsteroidSpawner();
//.attr('x', (d) => d).attr('y', (d) => Math.random() * d);
