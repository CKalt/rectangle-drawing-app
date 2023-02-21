# rectangle-drawing-app


Can you write me a javascript application that will run in a web browser and allow a user to draw a set of movable rectangles. Each rectangle being drawn by the user by right clicking on a point to be one of the rectangle's vertices and and then dragging while the button is continued to be pressed and then released at a second point that will define a second vertex as the diagonal for the rectangle? I would like the user to be able to see a tracking rectangle as the mouse is moved while the rectangle is drawn.  After each rectangle has been drawn, right clicking should allow it to be moved to a point where the right click is released.   A selected rectangle should change color to yellow, and when the delete key is pressed, the selected rectangle should be removed.


The moveRectangle function finds the selected rectangle (i.e., the one that is currently yellow) and updates its position based on the distance the mouse has moved since the last mouse event. It then redraws all the rectangles to reflect the new position of the selected rectangle. Finally, it updates startX and startY to the current mouse position so that the distance moved in the next mouse event can be calculated correctly.

The stopMovingRectangle function removes the event listeners for mousemove and mouseup so that the selected rectangle can no longer be moved.

The drawRectangles function is called at the end of moveRectangle, stopMovingRectangle, and whenever a rectangle is added or deleted. It clears the canvas, loops through all the rectangles in the rectangles array, and draws each one with its corresponding color.
