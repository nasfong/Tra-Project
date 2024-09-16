import { forwardRef } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useFormContext } from 'react-hook-form';

interface SelectFormProps {
  name: string;
  label: string;
  description?: string;
  options?: { id: string | number; name: string }[];
  loading?: boolean;
  placeholder?: string;
  addMoreComponent?: React.ReactNode;
}

export const SelectForm = forwardRef<HTMLDivElement, SelectFormProps>(
  ({ name, label, description, options = [], loading = false, addMoreComponent, ...props }, ref) => {
    const { formState: { errors }, control } = useFormContext();
    const hasError = !!errors[name];

    return (
      <FormField
        control={control}
        name={name}
        render={({ field: { value, onChange, ...fieldProps } }) => (
          <FormItem>
            <FormLabel className='w-full'>
              {label}
              <span className='float-end'>
                {addMoreComponent}
              </span>
            </FormLabel>
            <Select
              onValueChange={(value) => isNaN(Number(value)) ? onChange(value) : onChange(Number(value))}
              defaultValue={value}
              value={value}
              {...fieldProps}
              {...props}
              ref={ref as any}
            >
              <FormControl>
                <SelectTrigger loading={loading} name={name} error={hasError}>
                  <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.id as any}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
  }
);
