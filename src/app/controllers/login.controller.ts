import { 
  Config, 
  Context, 
  HttpResponseOK, 
  HttpResponseUnauthorized, 
  Post, 
  ValidateBody, 
  verifyPassword 
} from '@foal/core';
import { getSecretOrPrivateKey } from '@foal/jwt';
import { sign } from 'jsonwebtoken';
import { Users } from '../entities';

export class LoginController {
  @Post('/')
  @ValidateBody({
    additionalProperties: false,
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
    },
    required: ['email', 'password'],
    type: 'object'
  })
  async login(ctx: Context) {
    const user = await Users.findOne({ email: ctx.request.body.email });

    if (!user) return new HttpResponseUnauthorized();

    if (!await verifyPassword(ctx.request.body.password, user.password)) {
      return new HttpResponseUnauthorized();
    }

    const token = sign(
      { email: user.email },
      getSecretOrPrivateKey(),
      { expiresIn: '1h' }
    );

    return new HttpResponseOK({ token })
  }
}