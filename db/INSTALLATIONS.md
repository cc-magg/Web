
#Installations

## PostgreSQL installation:

### 1)
1. you can have an idea with: [This tutorial](https://www.youtube.com/watch?v=bOHysWYMZM0) but you don't need it, just download your **_PostgreSQL client_** [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
2. Be sure that the variable _setup_ inside the object _configg_ is set to 'true' when you run the db for first time, the variable can be found in the file _config.js_ in the path: _db/src/config.js_

### 2) Install PostgreSQL
_Note_: Please **be sure** to put a password to _PostgreSQL_ while installing it and save the port where you install it.
_Note2_: If the port is diferent than '5433' please go to the file _config_ (usally is in the path: _db/src/config.js_) and change the variable 'port' that is inside of the object 'configg' with your port.

### 3) Open PostgreSQL -> pgAdmin4
- Create the DB
1. Access _PostgreSQL <version>_
2. Write the password that you saved while installing the program
3. Right clic on _Databases_ option and create a new Database
4. Name it 'Webdb' and push on **_save_** button
- Create the user for be used in node
1. Right clic on _PostgreSQL 11_
2. Go to _Create_ -> _Login/Group Role..._
3. In the _Name_ write 'Webdbuser'
4. Now select the nex tab named 'Definition'
5. In the _Passsword_ write 'webdbuserpassword'
6. Now go to the next tab 'Privileges'
7. Make sure the option _Can login?_ is in 'yes'
8. Now push the button 'Save'

### 4) Documentation (in case you have a question):
All the Postgresql documentation is in [here](http://docs.sequelizejs.com/manual/getting-started.html)