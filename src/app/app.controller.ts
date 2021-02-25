import { controller, IAppController, Log, Hook, Context } from '@foal/core';
import { createConnection } from 'typeorm';
import { ProductController, UsersController, LoginController, GetLogsController } from './controllers';
import { logSchema } from './services';
// import './services/producer';

@Log('AppController', {
  body: true,
  headers: [ 'Authorization' ],
  params: true,
  query: true,
})
@Hook((ctx: Context) => {
  logSchema(ctx)
})
export class AppController implements IAppController {
  subControllers = [
    controller('/products', ProductController),
    controller('/users', UsersController),
    controller('/login', LoginController),
    controller('/logs', GetLogsController)
  ];

  async init() {
    await createConnection();
  }
}
