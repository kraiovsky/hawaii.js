import React from 'react'
import { Form, Field } from 'react-final-form'
import PropTypes from 'prop-types'
import { required, composeValidators } from '../utils/validators'

const ConfirmAuthTokenForm = ({ onSubmit }) => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="token" validate={composeValidators(required)}>
            {({ input, meta }) => (
              <div>
                <label>Confirmation token</label>
                <input {...input} type="text" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button type="button" onClick={form.reset} disabled={submitting || pristine}>
              Reset
            </button>
          </div>
        </form>
      )}
    />
  )
}

ConfirmAuthTokenForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default ConfirmAuthTokenForm
