import { yayaWebhook } from './yaya-webhook/yaya-webhook.js'

import { paymentDetails } from './payment_details/payment_details.js'

export const services = (app) => {
  app.configure(yayaWebhook)

  app.configure(paymentDetails)

  // All services will be registered here
}
