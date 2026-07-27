const EVENTS = {
  USER_REGISTERED: 'user.registered',
  USER_LOGIN: 'user.login',

  VEHICLE_CREATED: 'vehicle.created',
  VEHICLE_UPDATED: 'vehicle.updated',

  INSPECTION_BOOKED: 'inspection.booked',
  INSPECTION_COMPLETED: 'inspection.completed',
  INSPECTION_FAILED: 'inspection.failed',

  PAYMENT_INITIATED: 'payment.initiated',
  PAYMENT_SUCCESS: 'payment.success',
  PAYMENT_FAILED: 'payment.failed',

  NOTIFICATION_SENT: 'notification.sent',
};

module.exports = { EVENTS };
