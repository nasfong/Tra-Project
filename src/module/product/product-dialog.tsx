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
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from "@/components/ui/form"
import { InputForm } from "@/components/form/InputForm"
import { SelectForm } from "@/components/form/SelectForm"
import { useEffect } from "react"
import { toast } from "sonner"

const formSchema = z.object({
  model: z.string().nonempty({message: 'Model is required!'}),
  price: z.string().nonempty({message: 'Price is required!'}),
  type: z.string().nonempty({message: 'Type is required!'}),
  color: z.string().nonempty({message: 'Color is required!'}),
  motorNumber: z.string().optional(),
  machineNumber: z.string().optional(),
})

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  formValue: any
  setFormValue: any
}

export const ProductFormDialog = ({ open, setOpen, formValue, setFormValue }: Props) => {

  const defaultValues = {
    model: "",
    price: "",
    type: "",
    color: "",
    motorNumber: "",
    machineNumber: "",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  useEffect(() => {
    if (formValue) form.reset(formValue)
  }, [form, formValue])

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    // close with clear value
    if (!isOpen) {
      form.reset()
      setFormValue(defaultValues)
    }
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    toast("Event has been created", {
      description: JSON.stringify(data, null, 2),
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })

  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1" onClick={() => onOpenChange(true)}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[60%]">
        <DialogHeader>
          <DialogTitle>{!formValue?.id ? 'Create' : 'Edit'} Product</DialogTitle>
          <DialogDescription>
            product information form.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <InputForm
              form={form}
              name="model"
              placeholder="model"
              label="Model"
            />
            <div className="grid grid-cols-3 gap-3">
              <InputForm
                form={form}
                name="price"
                placeholder="price"
                label="Price"
              />
              <SelectForm
                form={form}
                name="type"
                placeholder="Select a type"
                label="Type"
                options={[
                  { id: "1", name: "Dream" },
                  { id: "2", name: "Scoopy" },
                  { id: "3", name: "Suzuki" },
                ]}
                loading={true}
              />
              <SelectForm
                form={form}
                name="color"
                placeholder="Select a color"
                label="Color"
                options={[
                  { id: "1", name: "red" },
                  { id: "2", name: "yellow" },
                  { id: "3", name: "white" },
                ]}
                loading={true}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputForm
                form={form}
                name="motorNumber"
                placeholder="Motor Number"
                label="Motor Number"
              />
              <InputForm
                form={form}
                name="machineNumber"
                placeholder="Machine Number"
                label="Machine Number"
              />
            </div>
            <DialogFooter className="mt-3">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
