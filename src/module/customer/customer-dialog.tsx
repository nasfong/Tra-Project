import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { InputForm } from "@/components/form/input-form"
import { SelectForm } from "@/components/form/select-form"
import { useEffect } from "react"
import { useQueryProducts } from "@/hook/product"
import { useSubmitCustomer } from "@/hook/customer"

const formSchema = z.object({
  file: z.any().optional(),
  image: z.any().optional(),
  name: z.string().nonempty("required"),
  phone: z.string().nonempty("required"),
  product: z.string().nonempty("required"),
})

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  formValue: Customer | null
  setFormValue: React.Dispatch<React.SetStateAction<Customer | null>>
}

export const CustomerFormDialog = ({ open, setOpen, formValue, setFormValue }: Props) => {
  // hook
  const { data: productData, isLoading: productLoading } = useQueryProducts({ fetch: open });
  const { mutateAsync, isPending } = useSubmitCustomer(formValue?.id);


  const defaultValues = {
    file: null,
    image: "",
    name: "",
    phone: "",
    product: "",
  }

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  useEffect(() => {
    if (formValue) {
      form.reset({
        image: formValue.image,
        name: formValue.name,
        phone: formValue.phone,
        product: formValue.product.id,
      });
    }
  }, [form, formValue]);

  const onChangeModal = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setOpen(false);
      form.reset(defaultValues);
      setFormValue(null);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("image", data.image);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("product", data.product);

    mutateAsync(formData).finally(() => {
      onChangeModal(false);
    });
  }
  return (
    <Dialog open={open} onOpenChange={onChangeModal}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1" onClick={() => onChangeModal(true)}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Customer
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[80%]">
        <DialogHeader>
          <DialogTitle>
            {!formValue?.id ? "Create Customer" : "Edit Customer"}
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              <InputForm
                name="name"
                placeholder="Name"
                label="Name"
              />
              <InputForm
                name="phone"
                placeholder="Phone"
                label="Phone"
              />
            </div>
            <SelectForm
              name="product"
              placeholder="Select a product"
              label="Product"
              options={productData}
              loading={productLoading}
            />

            <DialogFooter className="mt-3">
              <Button type="submit" loading={isPending}>
                {formValue?.id ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
