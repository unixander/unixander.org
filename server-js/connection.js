var mongodb = require('mongodb');
var Server = mongodb.Server,
  Db = mongodb.Db,
  BSON = mongodb.BSONPure;

var mongoCache = function() {

  var mongoDatabases = {};
  var env, mongo, mongoUrl;
  if (process.env.VCAP_SERVICES) {
    env = JSON.parse(process.env.VCAP_SERVICES);
    mongo = env['mongodb-1.8'][0]['credentials'];
  } else {
    mongo = {
      "hostname": "db_hostname",
      "port": "db_port",
      "username": "db_username",
      "password": "db_password",
      "name": "",
      "db": "db_name"
    };
  }

  var generate_mongo_url = function(obj) {
    obj.hostname = obj.hostname || 'localhost';
    obj.port = obj.port || 27017;
    obj.db = obj.db || 'default_db_name';
    return obj;
  };

  mongoUrl = generate_mongo_url(mongo);

  var ensureDatabase = function(readyCallback) {
    var dbName = mongoUrl.db;
    // check if we already have this db connection open
    if (mongoDatabases[dbName]) {
      readyCallback(null, mongoDatabases[dbName]);
      console.log("Already connected");
      return;
    }

    // get the connection
    var server = new Server(mongoUrl.hostname, mongoUrl.port);

    // get a handle on the database
    var db = new Db(dbName, server, {
      safe: true
    });
    db.open(function(error, databaseConnection) {
      if (error) throw error;
      db.authenticate(mongoUrl.username, mongoUrl.password, function(err, success) {
        if (err) throw error;
        console.log("Connecting to " + dbName);
        // add the database to the cache
        mongoDatabases[dbName] = databaseConnection;

        // remove the database from the cache if it closes
        databaseConnection.on('close', function() {
          delete(mongoDatabases[dbName]);
        });

        // return the database connection
        readyCallback(error, databaseConnection);
      });
    });
  }

  var ensureCollection = function(collectionName, readyCallback) {
    ensureDatabase(function(error, databaseConnection) {
      if (error) throw error;

      databaseConnection.createCollection(collectionName, function(error, collection) {
        if (error) throw error;

        // return the collection finally
        readyCallback(error, collection);
      })
    })
  }

  return ensureCollection;
}

module.exports = mongoCache;