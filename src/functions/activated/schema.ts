export default {
  type: "object",
  properties: {
    applicationId: { type: 'string' },
    applicationName: { type: 'string' },
    userEmail: { type: 'string' },
    userId: { type: 'string' },
    signature: { type: 'string' },
    userName: { type: 'string' },
    eventTime: { type: 'string' },
    ip: { type: 'string' },
    refralUrl: { type: 'string' },
    url: { type: 'string' },
    userAgent: { type: 'string' },
    dataVal: { type: 'string' },
    from_server: { type: 'string' },
    ttl: { type: 'string' },
    discription: { type: 'string' },
    verb: { type: 'string' }
  },
  required: ['']
} as const;
