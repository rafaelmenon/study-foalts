import { controller, IAppController, Log, LogOptions } from '@foal/core';
import { createConnection } from 'typeorm';
import { ProductController, UsersController, LoginController } from './controllers';

@Log('AppController', {
  body: true,
  headers: [ 'Authorization' ],
  params: true,
  query: true,
})
export class AppController implements IAppController {
  subControllers = [
    controller('/products', ProductController),
    controller('/users', UsersController),
    controller('/login', LoginController)
  ];

  async init() {
    await createConnection();
  }
}
