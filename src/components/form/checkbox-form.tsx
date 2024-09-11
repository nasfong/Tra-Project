import { forwardRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Checkbox } from '../ui/checkbox';

export const CheckboxForm = forwardRef<HTMLDivElement, any>(({ name, label, description, ...props }, ref) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  return (
    <FormField
      name={name}
      render={() => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              {...props}
            />
          </FormControl>
          {label && (
            <FormLabel>
              {label}
            </FormLabel>
          )}
          {description && (
            <FormDescription>
              {description}
            </FormDescription>
          )}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
});
