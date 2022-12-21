import React from 'react'
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

export const Input = ({ type,helperText,error, required, onChange, label }) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    };
    return (
        <TextField
        inputProps={{ 'aria-label': 'code' }}
            data-testid="inputTest"
            margin="normal"
            required={required}
            fullWidth
            label={label}
            type={type}
            error={error}
            placeholder={label}
            helperText={error&&helperText}
            onChange={handleChange} />
    )
}

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    helperText:PropTypes.string,
    error:PropTypes.bool
};

Input.defaultProps = {
    type: "text",
    label: "",
    required: false,
    helperText:"",
    error:false,
    onChange: () => { },
};
