---
name: collab.io - Collaborative Note-taking
anchor: collaborativenotes
technologies:
    - Angular
    - Three.JS
    - RxJS
    - Node.JS
    - MySQL
    - Socket.IO
duration:
    start: April 2018
    end: July 2018
---
This semester project started as a vision for **collaborative drawing and note-taking**. A user should be able to start
a page and can invite others to join him syncing the drawings of all users in **real-time** to everyone. Similar applications
on the web usually used a basic canvas element but for this project we wanted to explore the use of *WebGL* for a high detail renderings of
lines. Because of the **realtime manipulation** from multiple sources we had to come up with a solution that separates the strokes from the 
actual inputs devices. In the final version we ended up keeping track of the strokes by maintaining them in the DOM as custom elements.