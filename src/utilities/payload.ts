/**
 * Type guard to check if a Payload relation has full data (object) or just an ID (string)
 * 
 * In Payload CMS, relation fields can return either:
 * - A string (just the document ID) when depth=0 or relation not expanded
 * - The full document object when depth>0 and relation is expanded
 * 
 * @example
 * if (hasData(item.value)) {
 *   // item.value is now typed as the full Service object
 *   console.log(item.value.title)
 * }
 */
export function hasData<T extends object>(value: string | T | null | undefined): value is T {
  return typeof value === 'object' && value !== null
}

/**
 * Type guard to check if a Payload relation value is just an ID string
 */
export function isId(value: string | object | null | undefined): value is string {
  return typeof value === 'string'
}

