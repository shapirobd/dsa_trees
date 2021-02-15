const findMaxPeak = require("./helpers");

/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinaryTree {
	constructor(root = null) {
		this.root = root;
	}

	/** minDepth(): return the minimum depth of the tree -- that is,
	 * the length of the shortest path from the root to a leaf. */

	minDepth(root = this.root, depth = 1) {
		if (!root) return 0;
		let children = [];
		let toVisitQueue = [root];
		let current = toVisitQueue.shift();

		if (!current.left && !current.right) return depth;
		current.left ? children.push(current.left) : null;
		current.right ? children.push(current.right) : null;

		for (let child of children) {
			return this.minDepth(child, depth + 1);
		}

		return depth;
	}

	/** maxDepth(): return the maximum depth of the tree -- that is,
	 * the length of the longest path from the root to a leaf. */

	maxDepth(root = this.root, depth = 1, maxDepth = 1) {
		if (!root) return 0;
		let children = [];
		let toVisitQueue = [root];
		let current = toVisitQueue.shift();

		if (!current.left && !current.right) return depth;
		current.left ? children.push(current.left) : null;
		current.right ? children.push(current.right) : null;
		if (depth > maxDepth) maxDepth = depth;

		for (let child of children) {
			let totalDepth = this.maxDepth(child, depth + 1, maxDepth);
			if (totalDepth > maxDepth) {
				maxDepth = totalDepth;
			}
		}

		return maxDepth;
	}

	/** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
	 * The path doesn't need to start at the root, but you can't visit a node more than once. */

	maxSum(root = this.root, sum = 0, maxSum = 0, peak = null) {
		if (!root) return 0;
		let children = [];
		if (!peak) {
			peak = findMaxPeak(root);
			root = peak.node;
			sum = peak.sum;
			maxSum = sum;
		}
		let toVisitStack = [root];

		let current = toVisitStack.pop();
		current.left ? children.push(current.left) : null;
		current.right ? children.push(current.right) : null;
		if (current === peak.node) {
			for (let child of children) {
				let totalSum = this.maxSum(child, sum, maxSum, peak);
				if (totalSum > maxSum) {
					maxSum = totalSum;
				}
			}
		} else {
			if (current !== peak.left && current !== peak.right) {
				if (!current.left && !current.right) return sum + current.val;
				sum += current.val;
				if (sum > maxSum) maxSum = sum;
			}
			for (let child of children) {
				toVisitStack.push(child);
				let totalSum = this.maxSum(child, sum, maxSum, peak);

				if (totalSum > maxSum) {
					maxSum = totalSum;
				}
			}
		}

		return maxSum;
	}

	/** nextLarger(lowerBound): return the smallest value in the tree
	 * which is larger than lowerBound. Return null if no such value exists. */

	nextLarger(lowerBound, root = this.root, closestValue = null) {
		if (!root) return null;
		let toVisitStack = [root];
		let children = [];
		while (toVisitStack.length) {
			let current = toVisitStack.pop();
			current.left ? children.push(current.left) : null;
			current.right ? children.push(current.right) : null;
			if (
				current.val > lowerBound &&
				(current.val < closestValue || closestValue === null)
			) {
				closestValue = current.val;
			}
			for (let child of children) {
				closestValue = this.nextLarger(lowerBound, child, closestValue);
			}
		}
		return closestValue;
	}

	/** Further study!
	 * areCousins(node1, node2): determine whether two nodes are cousins
	 * (i.e. are at the same level but have different parents. ) */

	areCousins(node1, node2) {}

	/** Further study!
	 * serialize(tree): serialize the BinaryTree object tree into a string. */

	static serialize() {}

	/** Further study!
	 * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

	static deserialize() {}

	/** Further study!
	 * lowestCommonAncestor(node1, node2): find the lowest common ancestor
	 * of two nodes in a binary tree. */

	lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
