// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const paymentDetailsSchema = {
  $id: 'PaymentDetails',
  type: 'object',
  additionalProperties: false,
  required: ['yaya_id'],
  properties: {
    id: { type: 'string' },
    amount: { type: 'number' },
    yaya_id: { type: 'string' },
    currency: { type: 'string' },
    cause: { type: 'string' },
    full_name: { type: 'string' },
    account_name: { type: 'string' },
    invoice_url: { type: 'string' },
  }
}
export const paymentDetailsValidator = getValidator(paymentDetailsSchema, dataValidator)
export const paymentDetailsResolver = resolve({})

export const paymentDetailsExternalResolver = resolve({})

// Schema for creating new data
export const paymentDetailsDataSchema = {
  $id: 'PaymentDetailsData',
  type: 'object',
  additionalProperties: false,
  required: ['yaya_id'],
  properties: {
    ...paymentDetailsSchema.properties
  }
}
export const paymentDetailsDataValidator = getValidator(paymentDetailsDataSchema, dataValidator)
export const paymentDetailsDataResolver = resolve({})

// Schema for updating existing data
export const paymentDetailsPatchSchema = {
  $id: 'PaymentDetailsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...paymentDetailsSchema.properties
  }
}
export const paymentDetailsPatchValidator = getValidator(paymentDetailsPatchSchema, dataValidator)
export const paymentDetailsPatchResolver = resolve({})

// Schema for allowed query properties
export const paymentDetailsQuerySchema = {
  $id: 'PaymentDetailsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(paymentDetailsSchema.properties)
  }
}
export const paymentDetailsQueryValidator = getValidator(paymentDetailsQuerySchema, queryValidator)
export const paymentDetailsQueryResolver = resolve({})
