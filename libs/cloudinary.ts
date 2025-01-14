import { Cloudinary } from '@cloudinary/url-gen'

export const cld = new Cloudinary({
  cloud: {
    cloudName: 'dthofpapm'
  },
  url: {
    secure: true
  }
})
