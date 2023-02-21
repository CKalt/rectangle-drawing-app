const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let rectangles = [];
let isDrawing = false;
let startX, startY;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawRectangle);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(event) {
	if (event.button === 2) { // right click
		return;
	}

	startX = event.offsetX;
	startY = event.offsetY;
	isDrawing = true;
}

function drawRectangle(event) {
	if (!isDrawing) {
		return;
	}

	context.clearRect(0, 0, canvas.width, canvas.height);
	drawRectangles();

	const width = event.offsetX - startX;
	const height = event.offsetY - startY;

	context.beginPath();
	context.rect(startX, startY, width, height);
	context.strokeStyle = '#000';
	context.stroke();
}

function stopDrawing(event) {
	if (!isDrawing) {
		return;
	}

	isDrawing = false;

	if (event.button === 2) { // right click
		addRectangle(startX, startY, event.offsetX, event.offsetY);
	} else {
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawRectangles();
	}
}

function addRectangle(x1, y1, x2, y2) {
	const rectangle = {
		x: Math.min(x1, x2),
		y: Math.min(y1, y2),
		width: Math.abs(x2 - x1),
		height: Math.abs(y2 - y1),
		color: '#FFF'
	};

	rectangles.push(rectangle);
	drawRectangles();
}

function deleteRectangle() {
	const selectedRectangleIndex = rectangles.findIndex(rectangle => rectangle.color === 'yellow');
	if (selectedRectangleIndex !== -1) {
		rectangles.splice(selectedRectangleIndex, 1);
		drawRectangles();
	}
}

function selectRectangle(event) {
	const mouseX = event.offsetX;
	const mouseY = event.offsetY;

	rectangles.forEach(rectangle => {
		if (mouseX >= rectangle.x && mouseX <= rectangle.x + rectangle.width &&
			mouseY >= rectangle.y && mouseY <= rectangle.y + rectangle.height) {
			rectangles.forEach(rectangle => rectangle.color = '#FFF');
			rectangle.color = 'yellow';
			drawRectangles();
			return;
		}
	});
}

function moveRectangle(event) {
	const selectedRectangle = rectangles.find(rectangle => rectangle.color === 'yellow');
	if (selectedRectangle) {
		selectedRectangle.x += event.offsetX - startX;
		selectedRectangle.y += event.offsetY - startY;
		drawRectangles();
		startX = event.offsetX;
		startY = event.offsetY;
	}
}

function stopMovingRectangle() {
	canvas.removeEventListener('mousemove', moveRectangle);
	canvas.removeEventListener('mouseup', stopMovingRectangle);
}

function drawRectangles() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	rectangles.forEach(rectangle => {
		context.beginPath();
		context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
		context.fillStyle = rectangle.color;
		context.fill();
		context.strokeStyle = '#000';
		context.stroke();
	});
}

function startMovingRectangle(event) {
	const selectedRectangle = rectangles.find(rectangle => rectangle.color === 'yellow');
	if (selectedRectangle) {
		startX = event.offsetX;
		startY = event.offsetY;
		canvas.addEventListener('mousemove', moveRectangle);
		canvas.addEventListener('mouseup', stopMovingRectangle);
	}
}

drawRectangles();

canvas.addEventListener('contextmenu', event => event.preventDefault());
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', selectRectangle);
canvas.addEventListener('mousedown', startMovingRectangle);
canvas.addEventListener('keydown', event => {
	if (event.key === 'Delete') {
		deleteRectangle();
	}
});

