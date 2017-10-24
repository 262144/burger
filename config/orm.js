var connection = require("../config/connection.js");

// Makes string of appropriate number of question marks for SQL query

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
} // end of printQuestionMarks function

// Function to convert object key/value pairs to SQL syntax


// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (ob.hasOwnProperty(key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}





// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);
    console.log(vals);
    
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
  // ,

  // Might not need the following delete method.  Will leave it just in case.
  // delete: function(table, condition, cb) {
  //   var queryString = "DELETE FROM " + table;
  //   queryString += " WHERE ";
  //   queryString += condition;

  //   connection.query(queryString, function(err, result) {
  //     if (err) {
  //       throw err;
  //     }

  //     cb(result);
  //   });
  // }
};  // end of orm object



// Export the orm object for the model (cat.js).
module.exports = orm;
