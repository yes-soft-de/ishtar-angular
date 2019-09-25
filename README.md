# Ishtar Front End Project

### Project Overview:

Create a Front End Project.

Just found out, that i'm a good es6 JS developer, or fast... at least



### Usage:

to start using this product:

1. start backend 
2. start express router using the command `node server` in the express router directory
3. start angular project
4. navigate to `http://localhost:4200` 
5. Enjoy!



### Notes:

Redesign for Home Page, Painting Details Page is a MUST.


### Admin CORS policy Fixed
1. install corsproxy plugin :
    ```npm install -g corsproxy```
2. Open New Terminal in the base folder **the same place where you execute ng serve**
3. Run The Proxy Using keyword `corsproxy`
4. The cors proxy will start at http://localhost:1337. To access another domain, use the domain name (including port) as the first folder, e.g :
    ```
        http://localhost:1337/localhost:3000/sign_in
        http://localhost:1337/my.domain.com/path/to/resource
    ```
