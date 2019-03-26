# Web
Web first view.
This is a server with Node.js and express, please follow the indications below to run the server:

## Running the project:
### 1)  To run the web servers
run the next 2 commands in the 2 servers (_api_ and _web_)
``` js
npm install
npm run dev
```

### 2) To run the mongoDB

**_NOTE1_**: You have to run **_mongoDB_** so that everything works well.
**_NOTE2_**: If you haven't installed the **_mongoDB_** yet, please follow the **_INSTALLATIONS.md_** in the 'web' folder before and then come back here.
1. Open a _CMD_ and go to the next direccion:
``` 
C:\Program Files\MongoDB\Server\3.4\bin> 
```
Once there type:
```
mongod
```
and **be sure not to close that _CMD_ window**

### 3) To run the DB

**_NOTE1_**: This isn't necessary for the project, to run the project you will only need the points **_1_** and **_2_**.
**_NOTE2_**: If you haven't installed the **_postgreSQL_** yet, please follow the **_INSTALLATIONS.md_** in the 'db' folder before and then come back here.

with a _CMD_ go to the path _db/src/example_ and write:
```
node .\index.js
```
And that is it!, now you have it working very nice and you should have a table created named 'users', you should see it with the _pgAdmin4_, just go to PostgreSQL 11 --> Databases --> Webdb --> Schemas --> public --> Tables and there it is.

## If you make some code
If you make some code pls comment and be sure to use the:
``` js
npm run lint
```
and make the corrections, let's do our best.