// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const yayaWebhookSchema = {
  $id: 'YayaWebhook',
  type: 'object',
  additionalProperties: false,
  required: ['id'],
  properties: {
    id: { type: 'string' },
    amount: { type: 'number' },
    currency: { type: 'string' },
    created_at_time: { type: 'number' },
    timestamp: { type: 'number' },
    cause: { type: 'string' },
    full_name: { type: 'string' },
    account_name: { type: 'string' },
    invoice_url: { type: 'string' },
  }
}
export const yayaWebhookValidator = getValidator(yayaWebhookSchema, dataValidator)
export const yayaWebhookResolver = resolve({})

export const yayaWebhookExternalResolver = resolve({})

// Schema for creating new data
export const yayaWebhookDataSchema = {
  $id: 'YayaWebhookData',
  type: 'object',
  additionalProperties: false,
  required: ['id'],
  properties: {
    ...yayaWebhookSchema.properties
  }
}
export const yayaWebhookDataValidator = getValidator(yayaWebhookDataSchema, dataValidator)
export const yayaWebhookDataResolver = resolve({})

// Schema for updating existing data
export const yayaWebhookPatchSchema = {
  $id: 'YayaWebhookPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...yayaWebhookSchema.properties
  }
}
export const yayaWebhookPatchValidator = getValidator(yayaWebhookPatchSchema, dataValidator)
export const yayaWebhookPatchResolver = resolve({})

// Schema for allowed query properties
export const yayaWebhookQuerySchema = {
  $id: 'YayaWebhookQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(yayaWebhookSchema.properties)
  }
}
export const yayaWebhookQueryValidator = getValidator(yayaWebhookQuerySchema, queryValidator)
export const yayaWebhookQueryResolver = resolve({})
