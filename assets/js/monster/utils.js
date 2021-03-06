// shuffle the first 4 numbers for movepool
export function shuffle(arr, num = 0) {
	var j, x, i;
	for (i = 0; i < num; i++) {
		j = Math.floor(Math.random() * (arr.length - 1 - i)) + i;
		x = arr[i];
		arr[i] = arr[j];
		arr[j] = x;
	}
	return arr;
}

export function createNodeWithClasses(nodeType, classArr) {
	let node = document.createElement(nodeType);

	if (classArr) {
		classArr.forEach(className => {
			node.classList.add(className);
		});
	}
	return node;
}

export function generateRandomIndex(maxCount) {
	return Math.floor(Math.random() * maxCount);
}
