import React from 'react'
import { Form, Field } from 'react-final-form'
import PropTypes from 'prop-types'
import { required, mustBeEmail, composeValidators } from '../utils/validators'

const AuthForm = ({ onSubmit }) => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="email" validate={composeValidators(required, mustBeEmail)}>
            {({ input, meta }) => (
              <div>
                <label htmlFor="email">Email</label>
                <input {...input} type="text" placeholder="example@email.com" id="email" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            {/* eslint-disable-next-line react/jsx-handler-names */}
            <button type="button" onClick={form.reset} disabled={submitting || pristine}>
              Reset
            </button>
          </div>
        </form>
      )}
    />
  )
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default AuthForm
