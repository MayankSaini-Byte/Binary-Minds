import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '94wv2qdl', // Project ID provided by user
  dataset: 'production',
  useCdn: true, // Use CDN for caching (faster responses)
  apiVersion: '2023-05-03', // Use current date for API version
})

// Setup image builder for portable text images
const builder = imageUrlBuilder(client)
export function urlFor(source) {
  return builder.image(source)
}
