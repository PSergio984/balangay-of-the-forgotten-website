import type { FieldHook } from 'payload'

/**
 * Converts a string to a URL-safe slug.
 * e.g. "Diwata ng Dagat!" → "diwata-ng-dagat"
 */
export const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Payload beforeChange field hook that auto-generates a slug from a fallback field.
 * - If the slug field already has a value, it formats it.
 * - If no slug and operation is 'create', generates from fallbackField (e.g. 'name').
 */
export const slugHook =
  (fallbackField: string): FieldHook =>
  ({ value, originalDoc, data, operation }) => {
    // If user typed a slug, format it
    if (typeof value === 'string' && value.trim() !== '') {
      return formatSlug(value)
    }

    // Auto-generate from fallback field on create, or when slug is empty
    if (operation === 'create' || !value) {
      const fallback = (data as Record<string, unknown>)?.[fallbackField] ?? (originalDoc as Record<string, unknown>)?.[fallbackField]
      if (fallback && typeof fallback === 'string') {
        return formatSlug(fallback)
      }
    }

    return value
  }
