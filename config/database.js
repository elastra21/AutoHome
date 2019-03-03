exports.db = function () {
  var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
  mongoURLLabel = "";

  if (mongoURL == null && process.env.database_name) {
    var mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
    mongoDatabase = process.env.database_name;
    mongoPassword = process.env.password;
    mongoUser = process.env.username;
    var mongoUriParts = process.env.uri && process.env.uri.split("//");
    if (mongoUriParts.length == 2) {
      mongoUriParts = mongoUriParts[1].split(":");
      if (mongoUriParts && mongoUriParts.length == 2) {
        mongoHost = mongoUriParts[0];
        mongoPort = mongoUriParts[1];
      }
    }

    if (mongoHost && mongoPort && mongoDatabase) {
      mongoURLLabel = mongoURL = 'mongodb://';
      if (mongoUser && mongoPassword) {
        mongoURL += mongoUser + ':' + mongoPassword + '@';
      }
      mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
      mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase +'/login';

    }
  } else {
    mongoURL = 'mongodb://127.0.0.1:27017/login'
  }
  return mongoURL

};
