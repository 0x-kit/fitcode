import React from 'react';
import { Field } from 'redux-form';
import { Form } from 'semantic-ui-react';

//Redux-semantic-ui Form
const FormField = ({ fieldProps }) => {
  return (
    <Field
      name={fieldProps.name}
      type={fieldProps.type}
      component={Form.Input}
      fluid
      icon={fieldProps.icon}
      iconPosition={fieldProps.iconPosition}
      placeholder={fieldProps.placeholder}
    />
  );
};

export default FormField;
