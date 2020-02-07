let menuSelection = 0
storyboard.registerScene("title", function () {
    const title = sprites.create(img`.`)
    title.say("TITLE SCREEN")

    const subtitle = sprites.create(img`.`)
    subtitle.y = 80;
    subtitle.say("press A")

    // Any events that are registered in a scene will not run when another
    // scene is active. The "menu" scene also registers an event handler
    // for button A below
    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        // replace() destroys the current scene and creates a new one in
        // its place
        storyboard.replace("menu")
    });
})
storyboard.registerScene("menu", function () {
    // Create two dummy menu options
    const option1 = sprites.create(image.create(50, 10))
    option1.image.fill(1);
    option1.image.print("OPTION 1", 2, 2, 15);
    option1.top = 20;

    const option2 = sprites.create(image.create(50, 10))
    option2.image.fill(1);
    option2.image.print("OPTION 2", 2, 2, 15);
    option2.top = 32;

    // This cursor will indicate which menu item is selected
    const cursor = sprites.create(img`
        4 . . .
        . 4 . .
        . . 4 .
        . . . 4
        . . 4 .
        . 4 . .
        4 . . .
    `)
    cursor.right = option1.left - 2;
    cursor.y = option1.y;
    
    // This function mutates the menu state declared at the top
    // of the file
    function updateCursorPosition() {
        menuSelection = (menuSelection + 1) % 2
        if (menuSelection === 0) {
            cursor.y = option1.y;
        }
        else {
            cursor.y = option2.y;
        }
    }

    controller.up.onEvent(ControllerButtonEvent.Pressed, updateCursorPosition)
    controller.down.onEvent(ControllerButtonEvent.Pressed, updateCursorPosition)

    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        // Here I use push() instead of replace(). This will keep the scene in
        // the background, but not run any of the code in registerScene().
        // In the next scene, I use pop() to return to this scene
        storyboard.push("game")
    })
})
storyboard.registerScene("game", function () {
    const title2 = sprites.create(img`.`)

    if (menuSelection === 0) {
        title2.say("YOU CHOSE 1")
    }
    else {
        title2.say("YOU CHOSE 2")
    }

    const subtitle2 = sprites.create(img`.`)
    subtitle2.y = 80;
    subtitle2.say("B TO GO BACK")

    controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
        // This returns us to the "menu" scene
        storyboard.pop();
    })
})
// Start the initial scene
storyboard.start("title")
