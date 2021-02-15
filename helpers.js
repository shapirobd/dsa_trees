// helper function for maxSum
function findMaxPeak(root, peakSum = 0, peakNode = null) {
	let toVisitStack = [root];

	while (toVisitStack.length) {
		let current = toVisitStack.pop();
		let currPeakSum = current.val;
		if (current.left) {
			currPeakSum += current.left.val;
			toVisitStack.push(current.left);
		}
		if (current.right) {
			currPeakSum += current.right.val;
			toVisitStack.push(current.right);
		}
		if (currPeakSum > peakSum && peakSum <= 0) {
			peakSum = currPeakSum;
			peakNode = current;
		}
		toVisitStack.map((node) => {
			findMaxPeak(node, peakSum, peakNode);
		});
	}
	return {
		sum: peakSum,
		node: peakNode,
		left: peakNode.left,
		right: peakNode.right,
	};
}

module.exports = findMaxPeak;
