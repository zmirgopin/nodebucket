//setup connection to mongodb
const mongoose = require('mongoose');

const connection_url = `mongodb+srv://nodebucket_admin:Zee03rox@bellevueuniversity.r06aetm.mongodb.net/nodebucketDB?retryWrites=true&w=majority`

mongoose.connect(connection_url ?? 'mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('connetion successfull')).catch((error) => console.log('connection failed', error));

module.exports = mongoose.connection;
