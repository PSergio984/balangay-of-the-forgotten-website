import { getPayload } from 'payload'
import config from '../payload.config'

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  }
}

export const getPayloadInstance = async () => {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = getPayload({ config }).then((client) => {
      cached.client = client
      return client
    })
  }

  return cached.promise
}
