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

window.alert('Keep dragging the Millenium Falcon to increase score. Game over when cursor hits asteroids!');

var container = d3.select('.board').append('svg').attr('width', boardWidth).attr('height', boardHeight)
.style('border', '1px solid yellow').attr('class', 'gameBoard');

var drag = d3.behavior.drag()
.on("drag", dragmove);

var player = container.append('svg:image').attr('xlink:href', 'falcon.png')
  .attr('height', imgSize * 1.5).attr('width', imgSize * 1.5).attr('class', 'player')
  .attr('transform', 'translate(' + boardWidth/2 + ',' + boardHeight/2 + ')')
  .call(drag);


var runAsteroidSpawner = function() {
  if (sampleData.length <= maxAsteroidsOnField) {
    sampleData.push(generateAsteroid());
  }

  d3.select('.board svg').on('mouseenter', increaseScore);

  console.log('Called asteroid spawners with', sampleData.length,'asteroids.');
  var asteroids = container.selectAll('image').data(sampleData);
  asteroids.enter()
    .append('svg:image').attr('xlink:href', 'asteroid.png')
    .attr('height', (d) => d.size * imgSize).attr('width', (d) => d.size * imgSize).attr('class', 'asteroid').on('mouseover', handleMouseOver)
    .attr('transform', (d) => getPos(d, 'start'))
    .transition().duration((d) => d.speed).ease('linear')
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
  // increaseScore();

  setTimeout(runAsteroidSpawner, 500);
}

runAsteroidSpawner();
//.attr('x', (d) => d).attr('y', (d) => Math.random() * d);
