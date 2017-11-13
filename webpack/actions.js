const FILTER = 'FILTER'

export function filter(criteria) {
  return { type: FILTER, criteria }
}