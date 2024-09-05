import { forwardRef } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'; // Adjust import paths as needed
import { Input } from '../ui/input';

export const InputForm = forwardRef<HTMLDivElement, any>(({ name, label, description, ...props }, ref) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              {...props}
              value={field.value || ''}
              onChange={(event) => {
                const value = props.type === 'number' ? parseFloat(event.target.value) : event.target.value;
                field.onChange(value);
              }}
              ref={ref}
            />
          </FormControl>
          {!!description && (
            <FormDescription>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

InputForm.displayName = "InputForm";
