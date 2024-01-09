import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import { KnexService } from '@feathersjs/knex'
import jwtSign from 'jsonwebtoken';
import { app } from '../../app.js'
import {CONSTANTS} from '../../utils/constants.js';

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class YayaWebhookService extends KnexService {
 async create ( data, params) {
  if(verifySignature(data, params.headers["YAYA-SIGNATURE".toLowerCase()])){
    app.service('payment_details').create({
      amount: data.amount,
      yaya_id: data.id,
      currency: data.currency,
      cause: data.cause,
      full_name: data.full_name,
      account_name: data.account_name,
      invoice_url: data.invoice_url,
    });
    return {
      success: true,
    };
  }
  throw new NotAuthenticated('The signature provided is incorrect!', {
    message: "The signature provided is incorrect!",
  })
  }
}

const verifySignature = (data, signature) => {
  const secretKey = app.get('secret');
  
  const signedPayload = jwtSign.sign(Buffer.from(Object.values(data).join(''), 'utf-8').toString(), secretKey, {algorithm: "HS256"});
  const currentUnix = (new Date()).getTime()/ 1000 | 0;
  console.log(secretKey, signedPayload,currentUnix,  signedPayload === signature, ((currentUnix - data.timestamp) <= CONSTANTS.TimestampExpiry))
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
