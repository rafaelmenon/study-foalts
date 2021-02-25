import mongoose = require('mongoose');

mongoose.connect('mongodb://root:123456@localhost:27017', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function() {
  console.log("Connection Successful!");
})

const saveLog = new mongoose.Schema({
  data: {
    type: String
  },
  body: {
    type: Object
  },
  params: {
    type: Object
  },
  query: {
    type: Object
  },
  method: {
    type: String
  },
  url: {
    type: String
  },
  token: {
    type: String
  }
}, {
  timestamps: true
})

const Modal = mongoose.model("modal", saveLog, "logsCollection")

export const logSchema = async (ctx) => {
  const getData = new Modal({
    data: ctx.request._startTime,
    body: ctx.request.body,
    params: ctx.request.params,
    query: ctx.request.query,
    method: ctx.request.method,
    url: ctx.request.url,
    token: ctx.request.authorization
  })

  await getData.save(function (error, doc) {
    if (error) return console.error(error)
  })
}
