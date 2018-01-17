# node-jwt
Node and JWT integration

Direction to run the app
NOTE : PLEASE install node and npm before using this app.

1. npm install //to install all dependencies from package.json
2. npm install --save-dev {nodeModule} //to install node module for dev environment only.
    e.g npm install --save-dev nodemon
3. Add the following inside the package.json //not required to current app as already done.

    "scripts": {
        "dev": "nodemon server.js (or app.js depending on the entry point of the app)"
    }

4. npm run dev //this will run the node app in dev environment. Any changes made to the app will be reflected at the same time.
5. Normally the app can be executed using node server.js (or app.js) depending on the entry point.
