<!-- MIDDLEWARE  -->

-  Functions that extend middle software 

- used to add features to express

- The biggest feature of Express

-   Most code we write, including route handlesrs, is middleware.
can be considred an array of functiosn that get excuted in the order they are introduced into the sever code.

<!-- More on middle  -->
- Express middeware is complatibnle with connect middle

Connect is a web app framework for NODE.js that only provides the middleware layer

- you if cannot find a express middleware package with the functionality you'd like, you can search for a connect middleware moedule instead.



<!--There are different types of middleware; for our purposes, we’ll group them into:   -->


 - Built-in middleware.      e.g = express.json

 - Third-party middleware.    

 - Custom middleware.

 - Built-in middleware is included with Express, but not added to the application automatically. Like the other types, we need to opt-in to using it in our application.

 - We saw an example of built-in middleware when we added support for parsing JSON content out of the request body using server.use(express.json());.


 Some popular middleware modules are THAT I'LL BE USING

morgan.  - is an http request logger for node it logs out a line in the console with some deatls everytome somene makes a request to the api.

CORS. -


helmet. -

CUSTOM MIDDLEWARE
if seaching for that one package that doesn't exist? write your own \


MIDDLEWARE - are just funcitons that we write to perform certain tasks.
