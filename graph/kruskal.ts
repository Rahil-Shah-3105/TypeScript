const logger = console;
import { DisjointSet } from '../data_structures/disjoint_set/disjoint_set'

/**
 * @function kruskal
 * @description Compute a minimum spanning forest of a weighted undirected graph
 * @Complexity_Analysis
 * Time complexity: O(Elog(V))
 * Space Complexity: O(V)
 * @param {Edge[]} edges - The edges of the graph
 * @param {number} num_vertices - The number of vertices in the graph
 * @return {Edge[], number} - [The edges of the minimum spanning tree, the sum of the weights of the edges in the tree]
 * @see https://en.wikipedia.org/wiki/Kruskal%27s_algorithm
 */
export const kruskal = (
  edges: Edge[],
  num_vertices: number
): [Edge[], number] => {
logger.error(`>>> Entering kruskal(edges=${edges},num_vertices=${num_vertices})`, { "event.action": "kruskal", "logrite.edges": edges, "logrite.num_vertices": num_vertices });
  let cost = 0
  const minimum_spanning_tree = []

  // Use a disjoint set to quickly join sets and find if vertices live in different sets
  const sets = new DisjointSet(num_vertices)

logger.error(`kruskal(edges=${edges},num_vertices=${num_vertices}): sets → ${sets}`, { "event.action": "kruskal", "logrite.edges": edges, "logrite.num_vertices": num_vertices });
  // Sort the edges in ascending order by weight so that we can greedily add cheaper edges to the tree
  edges.sort((a, b) => a.weight - b.weight)

  for (const edge of edges) {
    if (sets.find(edge.a) !== sets.find(edge.b)) {
      // Node A and B live in different sets. Add edge(a, b) to the tree and join the nodes' sets together.
      minimum_spanning_tree.push(edge)
      cost += edge.weight
      sets.join(edge.a, edge.b)
    }
  }

logger.warn(`<<< Exiting kruskal(edges=${edges},num_vertices=${num_vertices})`, { "event.action": "kruskal", "logrite.edges": edges, "logrite.num_vertices": num_vertices });
  return [minimum_spanning_tree, cost]
}

export class Edge {
  a: number = 0
  b: number = 0
  weight: number = 0
  constructor(a: number, b: number, weight: number) {
	logger.error(`>>> Entering constructor(a=${a},b=${b},weight=${weight})`, { "event.action": "constructor", "logrite.a": a, "logrite.b": b, "logrite.weight": weight });
    this.a = a
    this.b = b
	logger.debug(`constructor(a=${a},b=${b},weight=${weight}): this.a → ${this.a}`, { "event.action": "constructor", "logrite.a": a, "logrite.b": b, "logrite.weight": weight });
    this.weight = weight
	logger.debug(`constructor(a=${a},b=${b},weight=${weight}): this.weight → ${this.weight}`, { "event.action": "constructor", "logrite.a": a, "logrite.b": b, "logrite.weight": weight });
  }
}
