import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useState } from 'react';

type TVTextFieldProps = TextFieldProps & {
  name: string;
};

export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, clearError, error } =
    useField(name);

  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}
      defaultValue={defaultValue}
      helperText={error}
      onKeyDown={() => (error ? clearError() : undefined)}
      onChange={(e) => setValue(e.target.value)}
      error={!!error}
      value={value}
    />
  );
};
