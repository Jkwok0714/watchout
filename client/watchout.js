// start slingin' some d3 here.
/* Fail attempt
d3.select('.board').selectAll('div').data([150, 10, 170]).enter()
  .append('svg').style("border", "1px solid black")
  .attr('width', 50).attr('height', 50)
  .attr('x', (d) => d).attr('y', (d) => d);
  //.style('position', 'absolute');
*/


var sampleData = [100, 72, 200, 417];
var boardHeight = 500;
var boardWidth = 700;
var imgSize = 50;
var startPositions = ['top', 'left', 'bottom', 'right'];


var container = d3.select('.board').append('svg').attr('width', boardWidth).attr('height', boardHeight)
  .style('border', '1px solid yellow').attr('class', 'gameBoard');

var getPos = function(d) {
  return 'translate(' + Math.random() * boardWidth + ',' + (Math.random() * d) + ')';
};

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

var asteroids = container.selectAll('image').data(sampleData).enter()
  .append('svg:image').attr('xlink:href', 'asteroid.png').attr('height', imgSize).attr('width', imgSize)
  .transition().duration(3000)
  .attr('transform', (d) => getPos(d));
  //.attr('x', (d) => d).attr('y', (d) => Math.random() * d);

var generateAsteroid = function() {
  var result = {};
  result.startPos, result.endPos = [];

  [result.startPos, result.endPos] = generateStartAndEnd();

}
