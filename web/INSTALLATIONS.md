
#Installations

## MongoDB installation:

### 1)
follow this video: [Frist steps tutorial](https://www.youtube.com/watch?v=FwMwO8pXfq0) until the minute 5:32

### 2)
open the **_mongo.exe_** aplication in the path: 
C:\Program Files\MongoDB\Server\3.4\bin

### 3)
1. Create the database typing on **_mongo.exe_**:
```
use web-chat
```
2. Then create the collection:
```
db.createCollection("chat")
```
3. Next run the server and write something like 'Hola!'
4. Now you can look at the collection, on the **_mongo.exe_**:
```
use web-chat
db.chat.find()
```
### 4) in case of error in the point 3.4
if this doesn't work (if the collecption is empty):
```
show collections
```
and now if you see other collection than *chat* like:
```
chat
chats
```
type:
```
use web-chat
db.chats.find()
```
and you should see something like this:
```
> db.chats.find()
{ "_id" : ObjectId("5c98f202e9fb4c46b4a178c7"), "from" : "6.436505710835049", "message" : "Hola!", "created_at" : ISODate("2019-03-25T15:21:38.660Z"), "__v" : 0 }
```