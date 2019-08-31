# Ishtar Front End Project

### Project Overview:

Create a Front End Ishtar Project.



## starting the Project

to start you should install the fallowing:

### Installations 

1. install XAMPP, which serves as good MySQL Server
2. Install Node, The Medium for Front-End Development
3. Install PHP 7.x , The Medium for Back-End Development 



### Installing NPM Dependencies:

1. `npm install -g @angular/cli`

### Running 

1. Start XAMPP, and run MySQL
2. Start express server located in the `express-router` directory using the command:
   1. `node server`
3. start `cors-proxy` using the commands 
   1. `npm install -g corsproxy`
   2. `corsproxy`
4. start Back-End Development Environment using the command <b>from within the back-end folder</b>:
   1. `php bin/console server:run`
5. start the Front-End Development Project using <b>from within the front-end folder</b>:
   1. `ng serve --o`



## Current Known Issues:

1. add painting adds paintings but it doesn't show, because we can't add painting images yet (Depends on File Upload)
2. Painting Details Design is Soo bad it hurts 