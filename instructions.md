# Fun Node Homework

The purpose of this homework assignment is to evaluate the approach, code, communication, _following requirements_ and ability of candidates for the Developer position. This is far from anything useful, though hopefully is fun!

> Read this entire doc before starting.

Depending on previous knowledge, this assignment should take around 2-6 hours. Email me with any questions you have.


## Assignment
Researchers of a DNA-sequencing group need to store newly found sequences. Design a system that will display a web page and make a call to the server to evaluate a sequence's validity and store valid results using the requirements detailed below.

### Summary

Your system will have two parts. A web page that loads at some path ("/" or "/home", for example) and an API server that accepts HTTP requests (at some path, like "/sequence" or "/processDNA"). The flow of the app will be:

> Load web page -> Type in sequence in `<input>` text box -> click "Submit" button -> send http request to server -> server validates and, if good, stores into the db -> server sends response back -> web page displays the response.

The one trick with NodeJS is the callback style, so the ultimate goal is to respond to the request only once the db.js file has run its function (e.g. `.store(seq)`). I would expect a valid string to take **1 second** to respond if the message trail went through the db.js file and waited for the callback before calling the server response. It will be near instant if there is a validation error. That’s the key piece, that "storing in the database" needs to finish before sending the response. 

### Sequences
Valid pairs of DNA are represented by `PA`, `NY`,`OH`,`WV` and encapsulate other valid pairs. A sequence can be any number of pairs.

**Example valid pairs:**

* `PNOWVHYA`
* `NY`
* `WOHV`
* `PPAA`

**Exmaple invalid pairs: **

* `PAPA` - not encapsulating
* `NOH` - no matching pair on `N`
* `OONQHH` - invalid character `Q`

### Technologies

Build this app as a web page front-end talking to a NodeJS server.

#### Web

The web page will be a single page, with two *centered* inputs:

* A text box to input potential sequences
* A button to submit the text to the server

Responses from the server should be indicated to the user (i.e. icon for success or fail, a toast, message alert, hidden/shown `<div>`, whatever). Clear the text box after a successful response to enter another one. **Do not validate Sequences on the Web page**

Other page flair is fine (CSS styles, etc), show your artistic skills if you want to, but this is not a design assignment.

Use whatever library and tools you prefer (the less complex the better). A common starting project will use WebPack, which is fine, but this assignment could be completed with a single `index.html` file.

**Choose a modern framework!** This single page must be in a modern framework. Examples of these would be ReactJS, AngularJS, *VueJS*, Ember, Polymer etc. *Do not use jQuery.*

#### Server

Build a web server in NodeJS that can respond to the request from the web client. *Define whatever interface you want, including payload.* This processing will include:

1. Validity of request (were the correct parameters provided?)
2. Validity of sequence string (is the sequence valid? see rules above)
3. If valid, storing to DB (call and wait for the storage in the "database")
4. Response to client

Make sure `package.json` file is getting created by starting with `npm init`. You can use a server package (Express, Restify, actionhero, Sails, etc), and whatever other `npm` packages you'd like, or none at all.

 Either statically serve the client web page files, or do not serve them with this NodeJS server at all and I will just open index.html from the file system while running the web server. You do **not** need to use NodeJS templating engines (Jade, EJS, Handlebars, etc).

Remember this is a *simple* web server.

If you are already familiar with NodeJS and wish to use Promises or `async/await`, go for it.

#### Included Files

* `readme.md` - This file

* `db.js` - use this file as your data access in the server, as if it was a valid Node package that could send commands to a database. Example would be like:

    ```
    var db = require('./db.js')
    // ... later ...
        db.store(sequenceString, callbackFunction)
    ```
     No need to connect to a real database, but **do note** NodeJS is asynchronous, continuing only when that `callback` is called. _A successful store will take 1000ms_ (time to upgrade the database!). Make sure your "success path" utilizes this file.

    Use this file un-edited. This will simulate calling into 3rd party library for a data storage function.


#### Use Case

A successful use case of this system will work like this:

1. User inputs a string on the web page and clicks Submit/Enter
2. Message is sent to server, which processes (and stores to database if valid sequence)
3. Response is sent to client. Either indicating success after the DB stores the message, or explains what was wrong.
4. Response is handled by the web page, indicating success or failure.

Note that the user will not know if their string was a success or failure _until the server responds_. An invalid sequence will return quickly, but a valid sequence will only respond *after 1000ms* because of the `db.js` delay.

#### Unit Test

Write a unit test. Either on the server side or the client side. Use any JavaScript testing framework.


#### Documentation

Document in a file (markdown is cool) how to:

1. Build your project
2. Run your project
3. Run your tests
3. What technologies you used, and any other explanations or choices you feel were important. (No dissertations, but include the important stuff.)


## Submittal

Zip up your project and email me.

Do **not** zip any library packages (node_modules, bower_components, etc). I would install those when I build your project, and will know how to do so from your documentation. With just source code and maybe some static scripts (like if you include your web framework's CDN file), this zip file should be pretty small.
