'use strict';
var dao = {
    /**
     * Function to store a given code string into the database.
     * This function will take 1000ms to complete, and will call the given callback
     * with an integer ID number on success.
     * @param {string} code The DNA string to store, assumed to already be checked and valid.
     * @param {function} cb   The node-style callback in the form function(error, resultId)
     */
    store(code, cb) {
        console.log(`Storing code ${code} to db...`); //an ES6 template literal

        //Return a success reponse after 1000ms.
        setTimeout(function () {
            console.log('...DB store done.'); //a normal string

            //Call the given callback function with no errors  (e.g. `null`), and a random number as the ID
            cb(null, Math.round(Math.random() * 1000));
        }, 1000);
    }
};
module.exports = dao;
