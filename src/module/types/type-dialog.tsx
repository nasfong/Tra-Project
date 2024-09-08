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
import { useSubmitType } from "@/hook/types";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Model is required!" }),
  // order: z.number().optional(),
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
  const { mutateAsync } = useSubmitType(formValue?.id);

  const defaultValues = {
    name: "",
    // order: undefined,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (formValue) form.reset(formValue);
  }, [form, formValue]);

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset();
      setFormValue(defaultValues);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutateAsync(data).finally(() => onOpenChange(false));
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
            Add Type
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="min-w-[60%]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{!formValue?.id ? "Create" : "Edit"} Type</DialogTitle>
          <DialogDescription>product information form.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputForm name="name" placeholder="name" label="Model" />
            <DialogFooter className="mt-3">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
