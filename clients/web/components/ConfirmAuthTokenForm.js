import React from 'react'
import { Form, Field } from 'react-final-form'
import { required, composeValidators } from '../utils/validators'

export default ({ onSubmit }) => {
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
