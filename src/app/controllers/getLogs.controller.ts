import { HttpResponseOK, Get, HttpResponseBadRequest } from '@foal/core';
import { JWTRequired } from '@foal/jwt';
const mongoose = require('mongoose');


mongoose.connect('mongodb://root:123456@localhost:27017', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

@JWTRequired()
export class GetLogsController {
  @Get('/')
  async getLogs() {
   
    const getData = await mongoose.connection.db.collection('logsCollection').find().toArray()
      .then(items =>  {
         return items
      })
      .catch(error => {
        return new HttpResponseBadRequest()
      })

    return new HttpResponseOK(getData)
  }
}