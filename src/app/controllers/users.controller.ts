import {
  ApiOperationId, ApiUseTag, Context, Delete, Get, HttpResponseCreated,
  HttpResponseNoContent, HttpResponseNotFound, HttpResponseOK, Patch, Post,
  ValidateBody, ValidatePathParam, HttpResponseConflict
} from '@foal/core';
import { getRepository } from 'typeorm';
import { JWTRequired } from '@foal/jwt';
import { Users } from '../entities';
import { hashPassword } from '@foal/core';

const usersSchema = {
  additionalProperties: false,
  properties: {
    name: { type: 'string', maxLength: 20, nullable: false },
    email: { type: 'string', maxLength: 50, nullable: false },
    phone: { type: 'string' },
    password: { type: 'string', nullable: false }
  },
  required: [ 'name', 'email', 'password', 'phone' ],
  type: 'object',
};


@ApiUseTag('users')
export class UsersController {

  @JWTRequired()
  @Get()
  @ApiOperationId('findUserss')
  async findUserss(ctx: Context) {
    const users = await getRepository(Users).find({
      select: ['id', 'name', 'email', 'phone', 'admin']
    })
    return new HttpResponseOK(users);
  }

  @JWTRequired()
  @Get('/:usersId')
  @ApiOperationId('findUsersById')
  @ValidatePathParam('usersId', { type: 'string' })
  async findUsersById(ctx: Context) {
    const users = await getRepository(Users).findOne(ctx.request.params.usersId, { 
      select: ['id', 'name', 'email', 'phone']
    });

    if (!users) {
      return new HttpResponseNotFound();
    }

    return new HttpResponseOK(users);
  }

  @Post()
  @ApiOperationId('createUsers')
  @ValidateBody(usersSchema)
  async createUsers(ctx: Context) {
    const user = await getRepository(Users).findOne({ email: ctx.request.body.email })

    if (user) return new HttpResponseConflict('Email já cadastrado')

    const newUser = ctx.request.body;
    newUser.name = ctx.request.body.name;
    newUser.email = ctx.request.body.email;
    newUser.password = await hashPassword(ctx.request.body.password)
    
    const users = await getRepository(Users).save(newUser);
    delete users.password
    return new HttpResponseCreated(newUser);
  }

  @JWTRequired()
  @Patch('/:usersId')
  @ApiOperationId('modifyUsers')
  @ValidatePathParam('usersId', { type: 'string' })
  @ValidateBody({ ...usersSchema, required: [] })
  async modifyUsers(ctx: Context) {
    const users = await getRepository(Users).findOne(ctx.request.params.usersId, {
      select: ['id', 'name', 'email', 'phone']
    });

    if (!users) {
      return new HttpResponseNotFound();
    } 

    Object.assign(users, ctx.request.body);

    await getRepository(Users).save(users);

    return new HttpResponseOK(users);
  }

  @JWTRequired()
  @Delete('/:usersId')
  @ApiOperationId('deleteUsers')
  @ValidatePathParam('usersId', { type: 'string' })
  async deleteUsers(ctx: Context) {
    const users = await getRepository(Users).findOne(ctx.request.params.usersId);

    if (!users) {
      return new HttpResponseNotFound();
    }

    await getRepository(Users).delete(ctx.request.params.usersId);

    return new HttpResponseNoContent();
  }
}
