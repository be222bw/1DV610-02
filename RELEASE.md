## Checklista
  - [x] Jag har skrivit all kod och reflektioner själv. Jag har inte använt mig av andras kod för att lösa uppgiften.
  - [x] Mina testresultat är skrivna utifrån utförd testning ( och inte teoretiskt: "det bör fungera" :) )
  - [x] Koden är objektorienterad
  - [x] Jag har skrivit en modul som riktar sig till programmerare

## Egenskattning och mål
  - [ ] Jag är inte klar eftersom jag vet att jag saknar något. (Då skall du inte lämna in! Lämna då istället in på restlaboration.)
  - [x] Jag eftersträvar med denna inlämning godkänt betyg (E-D)
    - [x] De flesta testfall fungerar
    - [x] Koden är förberedd på Återanvändning
    - [x] All kod samt historik finns i git 
    - [x] Kodkvaliterskraven är ifyllda
    - [ ] Reflektion är skriven utifrån bokens kapitel 
  - [x] Jag eftersträvar med denna inlämning högre betyg (C-B) och anser mig uppfylla alla extra krav för detta. 
    - [ ] Samtliga testfall är skrivna    
    - [ ] Testfall är automatiserade
    - [x] Det finns en tydlig beskrivning i hur modulen skall användas (i git)
    - [x] Kodkvalitetskraven är varierade 
  - [ ] Jag eftersträvar med denna inlämning högsta betyg (A) 

Förtydligande: Examinator kommer sätta betyg oberoende på vad ni anser. 

## Återanvändning
Usage of the module is very simple. The programmer populates the window by putting an HTML element (be it a custom element representing an application or, more unlikely, a built-in element, such as *img*) in the right slot.

Some methods are included to edit the window programmatically, should the programmer wish to do this, but the main goal with the module is to include in a web desktop application.

## Beskrivning av min kod
The module is meant to simplify the creation of computer windows in a web browser environment. The programmer can then populate the client area with a HTML element or an application in the form of a custom element. It is also possible to edit the window in some ways programmatically.

## Hur jag testat
Most of the testing has been manual, as the methods did not return anything useful; the module is supposed to work as a window in a graphical operating system, which is easy to test in the browser.

A small number of exceptions was put in switch statements, in case the programmer tries to set a non-existent side, for example.

### Testfall
Lista de enskilda testfallen. **Fetmarkera** sådant som du själv fyllt i. En rad per testfall. Om ni använder vertyg för testning kan ni ha en bild här med testrapporten. Tänk på att kommunicera till mig. Vad fungerar?, vad fungerar inte? Hur är det testat? Vilka delar testas inte?

Most of the methods, that the second-party programmer uses, do not have any meaningful output, except what is shown in the browser (size of window, etc.), so the the test cases listed are only of the GUI behaviour.

| Vad testas   | input              | output | utfall PASS/FAIL           |
| ------------ | ------------------ | ------ | -------------------------- |
| Maximisation | Click              | N/A    | Window was maximised: PASS |
| Minimisation | Click              | N/A    | Window was minimised: PASS |
| Restoration  | Click              | N/A    | Window was restored: PASS  |
| Closing      | Click              | N/A    | Window was closed: PASS    |
| Resizing     | Mousedown and drag | N/A    | Window was resized: PASS   |
| Moving       | Mousedown and drag | N/A    | Window was moved: PASS     |


## Kodkvalitetskrav

**Fetmarkera** de "regler" som används ur CC. Ni kan frångå tabellformat om ni vill. Skapa direktlänkar till er kod där det är lämpligt. Skriv så att jag kan förstå.

### Namngivning

Since there are no real instance variables, this will list the attributes instead. To avoid **name collision**, all these attributes have been prepended with *data-*. Even though attribute collision is rarely a problem, some HTML attributes have predefined behaviour for all HTML elements. One example is *title*, whose default behaviour is to show a tool-tip on hover.

| Namn och förklaring  | Reflektion                                   |
| -------------------  | ---------------------------------------------|
| data-title           | As stated, *title* has predefined behaviour, |
|                      | so *data-* was prepended. This was done with |
|                      | all other attributes as well, in case of fut-|
|                      | changes to the HTML standard.                |
|                      |                                              |
| data-max             | Whether the window is maximised. The corres- |
|                      | ponding CSS rules are marked as *!important*,|
|                      | so that the coordinates can be saved as att- |
|                      | ributes without conflicting with this attri- |
|                      | bute.                                        |
|                      |                                              |
| data-min             | Whether the window is minimised. No need for |
|                      | *!important* here.                           |
|                      |                                              |
| data-active          | Whether the window is active. **Explicit**   |
|                      | enough.                                      |
|                      |                                              |
| [Some CSS rules are  |                                              |
| included as attri-   |                                              |
| butes, but these are |                                              |
| not listed.]         |                                              |

### Funktioner

| Metodnamn och förklaring | Reflektion                                   |
| ------------------------ | ---------------------------------------------|
| setTitle is **explicit**.| **Monadic**. It has a duplicate in the       |
|                          | *title-bar* as well, which might be a viola- |
|                          | -tion of **DRY**, but it is in another class.|
|                          | The verb *set* in the method name clearly    |
|                          | modifies a variable (the title, which is a   |
|                          | common term in the **problem domain**),a     |
|                          | domain known by developers.                  |
|                          |                                              |
| close, minimise and maxi-| The terms are familiar to someone used to the|
| mise close, minimise,    | **problem domain**, whose userbase includes  |
| and maximise the window  | developers. The methods are **niladic**.     |
| respectively.            |                                              |
|                          |                                              |
| activate and deactivate  | Should be clear, although the terms are not  |
| activates and deactiv-   | necessarily used in the **problem domain**.  |
| ates the window, respect-| The methods are **niladic**.                 |
| ively.                   |                                              |
|                          |                                              |
| moveVertically and       | Since the the window is the caller, no noun  |
| moveHorizontally move    | is included in the method name, but instead  |
| the window vertically and| an adverb. The adverb denotes the dimension  |
| horizontally, respecti-  | in which to move the window. The name for the|
| vely. **Monadic** method | only argument is *movement*, which is pretty |
| that take the number of  | vague. A better name would be                |
| pixels as an argument.   | *movementInPixels*.                          |
|                          |                                              |
| setSide sets the top,    | setSide is **dyadic**, while the lower-level |
| bottom, left or right of | methods are **monadic**. Side is a term used |
| the window. There are    | in the **problem domain**, while in the      |
| methods, for each side,  | **solution domain** (i.e HTML and CSS), the  |
| which handle the logic   | term *position* could have been used.        |
| for each side on a low-  | The method set the sides in pixels, so a     |
| er level.                | better name could have been                  |
|                          | *setSideInPixels*.                           |
| [Private methods not lis-|                                              |
| ted.]                    |                                              |


## Laborationsreflektion
Most methods are monadic, although some of the event handlers could have been niladic; the event object *e* was put in those argument lists for clarity and just in case future iterations needed it. A couple of methods in the main script (for the window-element) were dyadic, and the attributeChangedCallback was triadic, according to its signature.

There are no double dependencies in the code, so the window-element uses the "sub-elements," which are completely independent, although useless on their own. There is some repetition (in violation of **DRY**) in the code, as the three buttons for closing, maximising (and restoring) and minimising are not of the same type; they could each theoretically have used the custom event name as an attribute, and let the window object handle the corresponding behaviour.

The classes do not have any instance variables, except for the *shadowRoot* and *innerHTML*, but they instead store important data as attributes. A positive consequence of this, is that they are selectable from CSS.