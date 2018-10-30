import React from 'react';
import { Field } from 'redux-form';
import { Header, Input, Form, Label, Button } from 'semantic-ui-react';

const renderField = (field) => {
    const {
        placeholder,
        label,
        labelPosition,
        maxLength,
        type,
        labelInput,
        inputStyle,
        labelStyle,
        labelStyleContent,
        meta: { touched, error }
    } = field;

    let validateError = false;

    if (touched && error) {
        validateError = true;
    }


    if (type === 'text' || type === 'email' || type === 'number' || type === 'checkbox') {
        return (
            <Form.Field>
                <Input
                    labelPosition={labelPosition}
                    placeholder={placeholder}
                    type={type}
                    maxLength={maxLength}
                    {...field.input}
                >
                    <Label style={labelStyle} basic>
                        {labelInput}
                    </Label>
                    <input style={inputStyle} />
                    <Label basic style={labelStyleContent}>{label.content}</Label>
                </Input>
                {validateError ? (
                    <Header as="label" color="red" size="tiny" textAlign="center">
                        {error}
                    </Header>
                ) : (
                        ''
                    )}
            </Form.Field>)
    } else if (type === 'select') {
        const { options, name } = field
        return (
            <select name={name} onChange={field.input.onChange}>
                {options.map((option, index) => {
                    return <option key={index} value={option.value}>{option.label}</option>
                })}
            </select>
        )
    } else {
        return <div>Type not supported.</div>
    }
}

const complexForm = ({ handleSubmit, fields, buttons }) => {
    return (
        <Form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
                <Field
                    key={index}
                    component={renderField}
                    {...field}
                />
            ))}

            {buttons.map((button, index) => (
                <Button
                    key={index}
                    {...button}
                />
            ))}
        </Form>
    )
}

export default complexForm;