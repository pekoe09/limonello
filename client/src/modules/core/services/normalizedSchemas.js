import { schema } from 'normalizr'

export const countryEntity = new schema.Entity('countries')

export const regionEntity = new schema.Entity(
  'regions',
  { country: countryEntity }
)