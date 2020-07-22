let vertices = [
  ["A", 1],
  ["B", 2],
  ["C", 2],
];

let edges = [
  ["A", "B"],
  ["B", "C"],
  ["A", "C"],
];

let origin_vertex = "A";

function topologicalSort(vertices, edges, origin_vertex) {
  let nodes = {},
    sorted = [],
    visited = {};

  let totalWeight = 0;

  let Node = function (id) {
    this.id = id;
    this.afters = [];
  };

  let index = null;
  let i = 0;
  while (index === null) {
    if (edges[i][0].indexOf(origin_vertex) !== -1) {
      index = i;
    }
    i++;
  }

  for (let i = index; i < edges.length; i++) {
    let from = edges[i][0],
      to = edges[i][1];
    if (!nodes[from]) nodes[from] = new Node(from);
    if (!nodes[to]) nodes[to] = new Node(to);
    nodes[from].afters.push(to);
  }

  Object.keys(nodes).forEach(function visit(idstr, ancestors) {
    let node = nodes[idstr],
      id = node.id;

    if (visited[idstr]) return;

    if (!Array.isArray(ancestors)) ancestors = [];

    ancestors.push(id);

    visited[idstr] = true;

    node.afters.forEach(function (afterID) {
      if (ancestors.indexOf(afterID) >= 0)
        throw new Error("Closed Chain : " + afterID + " is in " + id);

      visit(
        afterID.toString(),
        ancestors.map(function (v) {
          return v;
        })
      );
    });

    sorted.unshift(id);
  });

  for (let i = 0; i < sorted.length; i++) {
    if (vertices[i][0] === sorted[i]) {
      totalWeight += vertices[i][1];
    }
  }
  return totalWeight;
}

console.log(
  "Total Weight is " + topologicalSort(vertices, edges, origin_vertex)
);
