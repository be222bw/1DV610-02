# 1DV610-02: A web component representing a window.


## Introduction
This web component represents a window in an operating system.

The window is closable, minimisable (although that will just hide it, as no menu for retrieving minimised windows has been implemented, but the window can also be de-minimised by calling the method *minimise*) and maximisable. The window is also resizable in eight directions and movable.

A Javascript developer may use a few methods to modify his window, including close, minimise, maximise, moveVertically, moveHorisontally, setRight, setLeft, setTop, setBottom, activateWindow deactivateWindow and setTitle, whose names ought to speak for themselves.

Even so, the developer is encouraged to listen for the custom events *wasClosed*, *wasMaximised*, *wasMinimised*, *wasResized* and *wasMoved*, if he wants to implement his own logic. A lot of the methods with more complex behaviour have been set to private.

The user can populate the window through the slot named content, i.e.
    <window-element>
      <element-name slot="content"></element-name>
    <window-element/>

## Installation

To install the module, run "git clone https://github.com/be222bw/1DV610-02.git" in the directory you want to install it. The module uses Snowpack to run, so before you can run it, you have to also run "npm install" in the terminal.

To run the test application, run "npm start" in the terminal.
