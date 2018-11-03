import React from 'react';
import { Field } from 'redux-form';
import { Header, Input, Form, Label, Button } from 'semantic-ui-react';

const renderError = error => <Header as="label" color="red" size="tiny" textAlign="center" content={error} />;

const renderComplexField = field => {
  const {
    formInput: { type, placeholder, maxLength, inputStyle },
    labelRight,
    labelLeft,
    meta: { touched, error }
  } = field;

  const validateError = touched && error ? true : false;

  if (type === 'text' || type === 'email' || type === 'number' || type === 'checkbox') {
    return (
      <Form.Field>
        <Input labelPosition="right" placeholder={placeholder} type={type} maxLength={maxLength} {...field.input}>
          <Label {...labelLeft} basic />
          <input style={inputStyle} />
          <Label {...labelRight} basic />
        </Input>
        {validateError ? renderError(error) : ''}
      </Form.Field>
    );
  } else if (type === 'select') {
    const { options, name } = field;
    return (
      <select name={name} onChange={field.input.onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    return <div>Type not supported.</div>;
  }
};

const renderSimpleField = field => {
  const {
    formInput,
    meta: { touched, error }
  } = field;

  const validateError = touched && error ? true : false;

  return (
    <Form.Field>
      <Input fluid {...formInput} {...field.input} />
      {validateError ? renderError(error) : ''}
    </Form.Field>
  );
};

const ComplexForm = ({ handleSubmit, fields, buttons }) => {
  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <Field key={index} component={renderComplexField} {...field} />
      ))}

      {buttons.map((button, index) => (
        <Button key={index} {...button} />
      ))}
    </Form>
  );
};

const SimpleForm = ({ handleSubmit, fields, buttons }) => {
  return (
    <Form onSubmit={handleSubmit}>
      {fields && fields.map((field, index) => <Field key={index} component={renderSimpleField} {...field} />)}
      {buttons && buttons.map((button, index) => <Button key={index} {...button} />)}
    </Form>
  );
};

export { ComplexForm, SimpleForm };
