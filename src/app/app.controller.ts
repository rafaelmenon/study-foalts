import { controller, IAppController } from '@foal/core';
import { createConnection } from 'typeorm';

import { ProductController, UsersController, LoginController } from './controllers';

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
