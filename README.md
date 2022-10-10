# 1DV610-02: A web component representing a window.


## Introduction
The window is closable, minimisable (although that will just hide it, as no menu for retrieving minimised windows has been implemented) and maximisable. The window is also resizable in eight directions and movable.

A Javascript developer may use a few methods to modify his window, including close, minimise, maximise, moveVertically, moveHorisontally, setRight, setLeft, setTop, setBottom, activateWindow deactivateWindow and setTitle, whose names ought to speak for themselves.

Even so, the developer is encouraged to listen for the custom events closeWindow, maximiseWindow, minimiseWindow, resizeWindow and moveWindow, if he wants to implement his own logic. A lot of the methods with more complex behaviour have ben set to private.

Due to lack of time, no "populating" of the window, i.e. setting the client content, has been implemented, but the manual testing shows no apparent faults. The web component has been tested with basic usage, since the requirements for a window are difficult to test automatically through unit testing.

