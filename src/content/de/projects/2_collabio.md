---
order: 2
name: collab.io – kollaboratives Notizenmachen
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
  end: Juli 2018
---

Dieses Semesterprojekt begann als Vision für **kollaboratives Zeichnen und Notizenmachen**. Man sollte eine
Seite starten und andere einladen können, wobei die Zeichnungen aller Beteiligten in **Echtzeit** synchronisiert werden. Vergleichbare Anwendungen
im Web setzten damals meist auf ein einfaches Canvas-Element; wir wollten stattdessen _WebGL_ für hochaufgelöste Linien erkunden.
Wegen der **Echtzeitmanipulation** aus mehreren Quellen brauchten wir eine Lösung, die die Striche von den
tatsächlichen Eingabegeräten entkoppelt. In der finalen Version verwalteten wir die Striche als Custom Elements im DOM.
