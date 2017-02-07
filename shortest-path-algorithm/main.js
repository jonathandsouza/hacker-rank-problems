/**
 * Basic priority queue implementation. If a better priority queue is wanted/needed,
 * this code works with the implementation in google's closure library (https://code.google.com/p/closure-library/).
 * Use goog.require('goog.structs.PriorityQueue'); and new goog.structs.PriorityQueue()
 */
function PriorityQueue () {
	this._nodes = [];

	this.enqueue = function (priority, key) {
		this._nodes.push({key: key, priority: priority });
		this.sort();
	}
	this.dequeue = function () {
		return this._nodes.shift().key;
	}
	this.sort = function () {
		this._nodes.sort(function (a, b) {
			return a.priority - b.priority;
		});
	}
	this.isEmpty = function () {
		return !this._nodes.length;
	}
}

/**
 * Pathfinding starts here
 */
function Graph(){
	var INFINITY = 1/0;
	this.vertices = {};

	this.addVertex = function(name, edges){
		this.vertices[name] = edges;
	}

	this.shortestPath = function (start, finish) {
		var nodes = new PriorityQueue(),
			distances = {},
			previous = {},
			path = [],
			smallest, vertex, neighbor, alt,result;

		for(vertex in this.vertices) {
			if(vertex === start) {
				distances[vertex] = 0;
				nodes.enqueue(0, vertex);
			}
			else {
				distances[vertex] = INFINITY;
				nodes.enqueue(INFINITY, vertex);
			}

			previous[vertex] = null;
		}

		while(!nodes.isEmpty()) {
			smallest = nodes.dequeue();

			if(smallest === finish) {
				path;

				while(previous[smallest]) {
					path.push(smallest);
					smallest = previous[smallest];
				}

				break;
			}

			if(!smallest || distances[smallest] === INFINITY){
				continue;
			}

			for(neighbor in this.vertices[smallest]) {
				alt = distances[smallest] + this.vertices[smallest][neighbor];

				if(alt < distances[neighbor]) {
					distances[neighbor] = alt;
					previous[neighbor] = smallest;

					nodes.enqueue(alt, neighbor);
				}
			}
		}

		console.log(result);
		return path;
	}
}

var g = new Graph();

// g.addVertex('0', {3: 0});
// g.addVertex('1', {});
// g.addVertex('2', {5: 0});
// g.addVertex('3', {0:0,4:1,6:1});
// g.addVertex('4', {3: 1,5:1,7:1});
// g.addVertex('5', {2:0,8:1,4:1});
// g.addVertex('6', {3: 1, 7: 0});
// g.addVertex('7', {6: 0, 4: 1,8:1});
// g.addVertex('8', {5:1,7:1});


g.addVertex('0', {1: 0});
g.addVertex('1', {});
g.addVertex('2', {5: 0});
g.addVertex('3', {0:0,4:1,6:1});
g.addVertex('4', {3: 1,5:1,7:1});
g.addVertex('5', {2:0,8:1,4:1});

// Log test, with the addition of reversing the path and prepending the first node so it's more readable
console.log(g.shortestPath('0', '8').concat(['0']).reverse());/**
 * Created by Jonathan on 21-10-2016.
 */


/*


 .X.X......X
 .X*.X.XXX.X
 .XX.X.XM...
 ......XXXX.

     0     1     2     3     4     5     6     7     8
 0 [ X,    X,    X,    0,    X,    X,    X,    X,    X ]
 1 [ X,    X,    X,    X,    X,    X,    X,    X,    X ]
 2 [ X,    X,    X,    X,    X,    0,    X,    X,    X ]
 3 [ 0,    X,    X,    X, 	 1,    X, 	 1,    X, 	 X ]
 4 [ X,    X, 	 X,    1,    X,    1,    X,    1,    X ]
 5 [ X,    X,    0,    X,    1,    X,    X,    X,    1 ]
 6 [ X,    X,    X,    0,    X,    X,    X,    0,    X ]
 7 [ X,    X,    X,    X,    1,    X,    0,    X,    1 ]
 8 [ X,    X,    X,    X,    X,    0,    X,    0,    X ]


 * . M
 . X .


 */
