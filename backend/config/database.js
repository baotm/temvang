module.exports = ({ env }) => (
  {
    "defaultConnection": "default",
    "connections": {
      "default": {
        "connector": "mongoose",
        "settings": {
          "uri":"mongodb://admin:anhyeu12@cluster0-shard-00-00.arfp6.mongodb.net:27017,cluster0-shard-00-01.arfp6.mongodb.net:27017,cluster0-shard-00-02.arfp6.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-12xbou-shard-0&authSource=admin&retryWrites=true&w=majority"
        },
        "options": {
          "ssl": true
        }
      }
    }
  }
);