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

Using the module can be done in **public/js/index.js**.

## Reflection

This module took a lot longer than intended to develop. Maybe drawing up a plan or an object diagram before-hand would have speeded up the process, but also deciding which techniques to use (during development, both an attribute of the web component and a slot were considered, but in the end it was settled for a slot).

Testing the module was done manually, without many exceptions or similar techniques. At least during development, some exceptions were thrown in switch statements, in case of invalid cases, but those would only occur if the user had changed the code willingly, so they did not really fill a need. The module, like any computer window, is mostly based on a graphical representation of applications, so manual testing was the most sensible option.

The module made use of custom events to inform the parent window of events in the controls (such as buttons), but also so the user could react. When testing an application in the window (a window within a window, for lack of a better application), however, it was noticed that those events affected both the parent window and the child window, so it was decided to stop propagation from the child window, and instead passing **another** custom event, which would not affect the windows. Maybe this was a bad decision, because few users would put a window within a window. The point is, another application with which to test the window would be a good choice.

The nomenclature of the variables and methods was fairly straight-forward, even though one particular type of variable name was hard to decide (should it be position or coordinate) and there was some mix-up during development of side and dimension, although are naturally different concepts.
