import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
  TextareaAutosize,
  FormHelperText,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { FormSection, FormField } from '../types/form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface DynamicFormProps {
  sections: FormSection[];
  onSubmit: (data: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ sections, onSubmit }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const generateValidationSchema = (fields: FormField[]) => {
    const schemaFields: { [key: string]: any } = {};
    
    fields.forEach((field) => {
      let validator = yup.string();
      
      if (field.required) {
        validator = validator.required(field.validation?.message || 'This field is required');
      }
      
      if (field.type === 'email') {
        validator = validator.email('Please enter a valid email');
      }
      
      if (field.maxLength) {
        validator = validator.max(field.maxLength, `Maximum ${field.maxLength} characters allowed`);
      }
      
      if (field.minLength) {
        validator = validator.min(field.minLength, `Minimum ${field.minLength} characters required`);
      }
      
      schemaFields[field.fieldId] = validator;
    });
    
    return yup.object().shape(schemaFields);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(generateValidationSchema(sections[currentSection].fields)),
  });

  const handleSectionSubmit = (data: any) => {
    if (currentSection === sections.length - 1) {
      onSubmit(data);
    } else {
      setCurrentSection(currentSection + 1);
    }
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'tel':
      case 'email':
        return (
          <Controller
            name={field.fieldId}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                value={value}
                onChange={onChange}
                error={!!errors[field.fieldId]}
                helperText={errors[field.fieldId]?.message as string}
                data-testid={field.dataTestId}
                margin="normal"
              />
            )}
          />
        );

      case 'textarea':
        return (
          <Controller
            name={field.fieldId}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth margin="normal" error={!!errors[field.fieldId]}>
                <FormLabel>{field.label}</FormLabel>
                <TextareaAutosize
                  minRows={3}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={onChange}
                  data-testid={field.dataTestId}
                  style={{ width: '100%', padding: '8px', marginTop: '8px' }}
                />
                {errors[field.fieldId] && (
                  <FormHelperText>{errors[field.fieldId]?.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case 'date':
        return (
          <Controller
            name={field.fieldId}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                type="date"
                label={field.label}
                value={value}
                onChange={onChange}
                error={!!errors[field.fieldId]}
                helperText={errors[field.fieldId]?.message as string}
                data-testid={field.dataTestId}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        );

      case 'dropdown':
        return (
          <Controller
            name={field.fieldId}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth margin="normal" error={!!errors[field.fieldId]}>
                <FormLabel>{field.label}</FormLabel>
                <Select
                  value={value}
                  onChange={onChange}
                  data-testid={field.dataTestId}
                >
                  {field.options?.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      data-testid={option.dataTestId}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors[field.fieldId] && (
                  <FormHelperText>{errors[field.fieldId]?.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case 'radio':
        return (
          <Controller
            name={field.fieldId}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <FormControl
                component="fieldset"
                margin="normal"
                error={!!errors[field.fieldId]}
              >
                <FormLabel component="legend">{field.label}</FormLabel>
                <RadioGroup value={value} onChange={onChange}>
                  {field.options?.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                      data-testid={option.dataTestId}
                    />
                  ))}
                </RadioGroup>
                {errors[field.fieldId] && (
                  <FormHelperText>{errors[field.fieldId]?.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            name={field.fieldId}
            control={control}
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
              <FormControl
                component="fieldset"
                margin="normal"
                error={!!errors[field.fieldId]}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                      data-testid={field.dataTestId}
                    />
                  }
                  label={field.label}
                />
                {errors[field.fieldId] && (
                  <FormHelperText>{errors[field.fieldId]?.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      default:
        return null;
    }
  };

  const currentSectionData = sections[currentSection];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {currentSectionData.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {currentSectionData.description}
        </Typography>
        
        <form onSubmit={handleSubmit(handleSectionSubmit)}>
          {currentSectionData.fields.map((field) => (
            <Box key={field.fieldId}>
              {renderField(field)}
            </Box>
          ))}
          
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            {currentSection > 0 && (
              <Button
                variant="outlined"
                onClick={() => setCurrentSection(currentSection - 1)}
                data-testid="prev-button"
              >
                Previous
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              data-testid={currentSection === sections.length - 1 ? 'submit-button' : 'next-button'}
              sx={{ ml: 'auto' }}
            >
              {currentSection === sections.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default DynamicForm; 