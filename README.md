# Angular CORS Requests Error

So the Problem in short is that Chrome/Firefox is Converting 'POST' request to 'OPTIONS'

Here is the solution:

NOTE: I'm using Nginx as a server and Not Apache. but the same process should be server independent, which shall be in a future Backend Request.

## The Problem

When adding a header containing the header `Content-Type: application/json` to the request it becomes a CORS Request, what this means is that the request should be done in 2 stages and not 1 as a simple header-less request is.

## The Solution

To solve this we need to send first a preflight request, this should return a response containing the headers that allow CORS and then send the data payload request. this is done in my version using the following.

### Setup Nginx

Download from [here](https://nginx.org/download/nginx-1.17.5.zip) and Install it it suitable location. 

Edit the `nginx.conf` located in `conf` directory and add the following:

```conf
...
http {
	#Add From Here
	server {
    server_name auth.loc;
    
    # Add Your Symfony Project Location Here
    set 	$BASE E:/servers/ishtar-backend
    root 	$BASE/public;
    
    listen 8000;

    location / {
        # try to serve file directly, fallback to app.php
        try_files $uri /index.php$is_args$args;
		include preflight.conf;
    }
    # DEV
    location ~ ^/(index_dev|config)\.php(/|$) {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
		include preflight.conf;
		
		
		# This Shall Be Edited Later
		add_header 'Access-Control-Allow-Origin' '*';
    }
    # PROD
    location ~ ^/index\.php(/|$) {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include fastcgi_params;
       	fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
       	fastcgi_param DOCUMENT_ROOT $realpath_root;
		include preflight.conf;
		internal;
		
		
		# This Shall Be Edited Later
		add_header 'Access-Control-Allow-Origin' '*';
   }

   # return 404 for all other php files not matching the front controller
   # this prevents access to other php files you don't want to be accessible.
   location ~ \.php$ {
     return 404;
   }
}


}
```



### Setup PHP

Just Install the latest version and add it to the environment variables of `PATH`



### Running the Project

Open PowerShell and execute the following command:

```
php-cgi -b 0.0.0.0:9000
```

Leave the Script Running and start `nginx` using: 

```
start nginx
```

make sure to execute in `nginx` folder



### Using Preflight Requests

Whenever you need CORS Request you first make requests to preflight Endpoint -- Shall Be Ready today-- and then perform the request you need.

