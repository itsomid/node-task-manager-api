// CRUD crate read update delete
const { MongoClient, ObjectId } = require('mongodb')
// id =  ObjectId()
// console.log(id.id)
// console.log(id.toHexString())
// console.log(id.toString())
// console.log(id.valueOf())

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database')
  }
  const db = client.db(databaseName)

  db.collection('tasks').deleteOne({
    description: 'Complete website task'
  }).then((result)=>{
    console.log(result)
  }).catch((error)=>{
    console.log(error)
  })

})