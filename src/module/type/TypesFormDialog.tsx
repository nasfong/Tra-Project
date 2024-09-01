import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/form/InputForm";
import { useEffect } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Name is required!" }),
  order: z
    .number({ invalid_type_error: "Order must be a number!" })
    .int("Order must be an integer"),
});

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formValue: any;
  setFormValue: any;
};

export const TypesFormDialog = ({
  open,
  setOpen,
  formValue,
  setFormValue,
}: Props) => {
  const defaultValues = {
    name: "",
    order: 0,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (formValue) {
      form.reset({
        ...formValue,
        order: Number(formValue.order),
      });
    }
  }, [formValue]);

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset();
      setFormValue(defaultValues);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const parsedData = {
      ...data,
      order: Number(data.order),
    };

    try {
      if (formValue?.id) {
        const response = await fetch(`/type/${formValue.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parsedData),
        });

        if (!response.ok) throw new Error('Failed to update');
        toast("Type has been updated", {
          description: JSON.stringify(parsedData, null, 2),
        });
      } else {
        // Create new item
        const response = await fetch('/type', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parsedData),
        });

        if (!response.ok) throw new Error('Failed to create');
        toast("A New Type has been created", {
          description: JSON.stringify(parsedData, null, 2),
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred while submitting the form.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-8 gap-1"
          onClick={() => onOpenChange(true)}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[60%]">
        <DialogHeader>
          <DialogTitle>
            {!formValue?.id ? "Create" : "Edit"} Product
          </DialogTitle>
          <DialogDescription>Product information form.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputForm
              form={form}
              name="name"
              placeholder="name"
              label="Name"
            />
            <InputForm
              form={form}
              name="order"
              placeholder="order"
              label="Order"
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                form.setValue("order", Number(e.target.value));
              }}
            />
            <DialogFooter className="mt-3">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
