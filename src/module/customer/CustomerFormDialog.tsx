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
import { InputForm } from "@/components/form/InputForm"
import { SelectForm } from "@/components/form/SelectForm"
import { useEffect } from "react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters long."
  }),
  type: z.string().min(2, {
    message: "name must be at least 2 characters long."
  }),
})

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  formValue: any
  setFormValue: any
}

export const CustomerFormDialog = ({ open, setOpen, formValue, setFormValue }: Props) => {

  const defaultValues = {
    name: "",
    type: ""
  }

  const form = useForm({
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

  const onSubmit = () => {

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{!formValue?.id ? 'Create': 'Edit'} customer</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>

            <InputForm
              form={form}
              name="name"
              placeholder="name"
              label="name"
            // description="This is your public display name."
            />
            <SelectForm
              form={form}
              name="type"
              placeholder="Select a verified email to display"
              label="Type"
              options={[
                { id: 1, name: "John Doe" },
                { id: 2, name: "Jane Doe" },
                { id: 3, name: "Michael Doe" },
              ]}
              loading={true}
            />
            <DialogFooter className="mt-3">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
