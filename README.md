# rectangle-drawing-app



Chris: Can you write me a javascript application that will run in a web browser and allow a user to draw a set of movable rectangles. Each rectangle being drawn by the user by right clicking on a point to be one of the rectangle's vertices and and then dragging while the button is continued to be pressed and then released at a second point that will define a second vertex as the diagonal for the rectangle? I would like the user to be able to see a tracking rectangle as the mouse is moved while the rectangle is drawn.  After each rectangle has been drawn, right clicking should allow it to be moved to a point where the right click is released.   A selected rectangle should change color to yellow, and when the delete key is pressed, the selected rectangle should be removed.


ChatGPT: The moveRectangle function finds the selected rectangle (i.e., the one that is currently yellow) and updates its position based on the distance the mouse has moved since the last mouse event. It then redraws all the rectangles to reflect the new position of the selected rectangle. Finally, it updates startX and startY to the current mouse position so that the distance moved in the next mouse event can be calculated correctly.

The stopMovingRectangle function removes the event listeners for mousemove and mouseup so that the selected rectangle can no longer be moved.

The drawRectangles function is called at the end of moveRectangle, stopMovingRectangle, and whenever a rectangle is added or deleted. It clears the canvas, loops through all the rectangles in the rectangles array, and draws each one with its corresponding color.


Chris: Can you please change the code so that all the unselected rectangles are blue?


ChatGPT: Certainly! To change the code so that all unselected rectangles are blue, you can modify the drawRectangles function as follows:


```
function drawRectangles() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	rectangles.forEach(rectangle => {
		context.beginPath();
		context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
		context.fillStyle = rectangle.color;
		if (rectangle.color !== 'yellow') {
			context.fillStyle = 'blue';
		}
		context.fill();
		context.strokeStyle = '#000';
		context.stroke();
	});
}
```


In this modified version of drawRectangles, we first clear the canvas and then iterate over each rectangle in the rectangles array. We use the fillStyle property to set the fill color of each rectangle. If the rectangle's color is not yellow (i.e., it is not currently selected), we set its fill color to blue.

With this change, when the user selects a rectangle by clicking on it, the selected rectangle will turn yellow and all other rectangles will turn blue.
..................


Chris: Right after a rectangle is drawn I want to have it unselected and blue. Can you change the code to make this the case?


Yes, we can modify the code to unselect the currently selected rectangle and make all rectangles blue immediately after a new rectangle is drawn. Here's one way to achieve this:

Add a new function called unselectAllRectangles that sets the color of all rectangles to blue, and then call this function immediately after a new rectangle is added to the rectangles array:
js
Copy code
function addRectangle(rectangle) {
	rectangles.push(rectangle);
	unselectAllRectangles();
	drawRectangles();
}

function unselectAllRectangles() {
	rectangles.forEach(rectangle => {
		rectangle.color = 'blue';
	});
}
Modify the startDrawing function to unselect the currently selected rectangle, if there is one, before adding the new rectangle:
js
Copy code
function startDrawing(event) {
	if (event.button === 2) {
		event.preventDefault();
		if (drawStartX === null) {
			drawStartX = event.offsetX;
			drawStartY = event.offsetY;
		} else {
			const width = event.offsetX - drawStartX;
			const height = event.offsetY - drawStartY;
			const rectangle = { x: drawStartX, y: drawStartY, width, height, color: 'blue' };
			addRectangle(rectangle);
			drawStartX = null;
			drawStartY = null;
		}
	}
}
In this modified version of startDrawing, we call unselectAllRectangles before adding the new rectangle. This ensures that there is no selected rectangle after a new one is added.

With these changes, when the user draws a new rectangle, the currently selected rectangle (if there is one) is unselected and all rectangles are set to blue.






