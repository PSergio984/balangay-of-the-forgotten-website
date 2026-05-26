import { getPayload } from 'payload'
import config from '@/payload.config'

export const getPayloadInstance = async () => {
  return getPayload({ config })
}
