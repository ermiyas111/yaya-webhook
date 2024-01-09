import { BadRequest } from '@feathersjs/errors';
import { feathers } from '@feathersjs/feathers';
import { KnexService } from '@feathersjs/knex'
import jwtSign from 'jsonwebtoken';
import express from '@feathersjs/express';
import { app } from '../../app.js'
import {CONSTANTS} from '../../utils/constants.js';

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class YayaWebhookService extends KnexService {
 async create ( data, params) {
  if(verifySignature(data, params.headers["YAYA-SIGNATURE".toLowerCase()])){
    return {
      success: true,
    };
  }
  const verificationFailed = new BadRequest('The signature provided is incorrect!', {
    message: "The signature provided is incorrect!",
  })
  return {...verificationFailed, code: 401, data: data, error: "The signature provided is incorrect!"};
  }
}

const verifySignature = (data, signature) => {
  const secretKey = app.get('secret');
  const signedPayload = jwtSign.sign(Buffer.from(Object.values(data).join(''), 'utf-8').toString(), secretKey, {algorithm: "HS256"});
  const currentUnix = (new Date()).getTime();
  if(signedPayload === signature && ((currentUnix - data.timestamp) <= CONSTANTS.TimestampExpiry)){
    return true;
  }
  return false;
}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'yaya-webhook',
  }
}
