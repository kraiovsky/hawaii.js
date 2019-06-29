import { EMAIL_REGEXP } from '../constants'

export const required = value => (value ? undefined : 'Required')

export const mustBeEmail = value => (EMAIL_REGEXP.test(value) ? undefined : 'Must be email')

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)
