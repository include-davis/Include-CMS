
    const films = {
  "bsonType": "object",
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "title": {
      "bsonType": "string"
    },
    "date": {
      "bsonType": "date"
    },
    "description": {
      "bsonType": "string"
    },
    "film": {
      "bsonType": "array",
      "items": {
        "bsonType": "objectId"
      }
    }
  }
};

    export default films;
  