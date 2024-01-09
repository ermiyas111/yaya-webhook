// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  paymentDetailsDataValidator,
  paymentDetailsPatchValidator,
  paymentDetailsQueryValidator,
  paymentDetailsResolver,
  paymentDetailsExternalResolver,
  paymentDetailsDataResolver,
  paymentDetailsPatchResolver,
  paymentDetailsQueryResolver
} from './payment_details.schema.js'
import { PaymentDetailsService, getOptions } from './payment_details.class.js'

export const paymentDetailsPath = 'payment_details'
export const paymentDetailsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './payment_details.class.js'
export * from './payment_details.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const paymentDetails = (app) => {
  // Register our service on the Feathers application
  app.use(paymentDetailsPath, new PaymentDetailsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: paymentDetailsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(paymentDetailsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(paymentDetailsExternalResolver),
        schemaHooks.resolveResult(paymentDetailsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(paymentDetailsQueryValidator),
        schemaHooks.resolveQuery(paymentDetailsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(paymentDetailsDataValidator),
        schemaHooks.resolveData(paymentDetailsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(paymentDetailsPatchValidator),
        schemaHooks.resolveData(paymentDetailsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
