// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  yayaWebhookDataValidator,
  yayaWebhookPatchValidator,
  yayaWebhookQueryValidator,
  yayaWebhookResolver,
  yayaWebhookExternalResolver,
  yayaWebhookDataResolver,
  yayaWebhookPatchResolver,
  yayaWebhookQueryResolver
} from './yaya-webhook.schema.js'
import { YayaWebhookService, getOptions } from './yaya-webhook.class.js'

export const yayaWebhookPath = 'yaya-webhook'
export const yayaWebhookMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './yaya-webhook.class.js'
export * from './yaya-webhook.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const yayaWebhook = (app) => {
  // Register our service on the Feathers application
  app.use(yayaWebhookPath, new YayaWebhookService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: yayaWebhookMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(yayaWebhookPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(yayaWebhookExternalResolver),
        schemaHooks.resolveResult(yayaWebhookResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(yayaWebhookQueryValidator),
        schemaHooks.resolveQuery(yayaWebhookQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(yayaWebhookDataValidator),
        schemaHooks.resolveData(yayaWebhookDataResolver),
      ],
      patch: [
        schemaHooks.validateData(yayaWebhookPatchValidator),
        schemaHooks.resolveData(yayaWebhookPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
      create: [async (context) => {
         if(context.result?.code === 401) {
          return context;
         } else {
          const paymentDetails = await context.app.service('payment_details');
          await paymentDetails.create({
            amount: context.data.amount,
            yaya_id: context.data.id,
            currency: context.data.currency,
            cause: context.data.cause,
            full_name: context.data.full_name,
            account_name: context.data.account_name,
            invoice_url: context.data.invoice_url,
          });
          return context;
         }
        },
      ]
    },
    error: {
      all: []
    }
  })
}
