import React, { forwardRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input, InputProps } from '../ui/inputs';

type InputFileFormProps = {
  name: string;
  label?: string;
  description?: string;
  onChanges?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputProps

export const InputFileForm = forwardRef<HTMLInputElement, InputFileFormProps>(
  ({ name, label, description, onChanges, ...props }, ref) => {
    const { control } = useFormContext(); // Access form control from context
    const {
      field: { value, onChange, ...fieldProps },
      fieldState,
    } = useController({ name, control });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      const preData = Array.isArray(value) ? value : [];
      const updatedFiles = [...preData, ...files];
      if (onChanges) {
        onChanges(event);
        return
      }
      onChange(updatedFiles);

    };

    return (
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                {...props}
                ref={ref}
                placeholder="Picture"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleChange}
              />
            </FormControl>
            {!!description && <FormDescription>{description}</FormDescription>}
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        )}
      />
    );
  }
);

InputFileForm.displayName = 'InputFileForm'; // Set display name for better debugging
