import { controller, IAppController } from '@foal/core';
import { createConnection } from 'typeorm';

import { ProductController } from './controllers';

export class AppController implements IAppController {
  subControllers = [
    controller('/products', ProductController),
  ];

  async init() {
    await createConnection();
  }
}
