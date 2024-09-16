import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, PlusCircle, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDeleteType, useQueryTypes, useSubmitType } from '@/hook/types'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { InputForm } from '@/components/form/input-form'
import { DeleteDialog } from '@/components/custom/delete-dialog'

const formSchema = z.object({
  name: z.string().nonempty("required!"),
})

export const AddTypeDialog = () => {
  const [open, setOpen] = useState(false)
  const [formValue, setFormValue] = useState<any>(null)

  const { data: typeData } = useQueryTypes()
  const { mutate, isPending } = useSubmitType(formValue?.id)
  const { mutateAsync: mutateAsyncDelete, isPending: isPendingDelete } = useDeleteType()

  const defaultValues = {
    name: "",
  }
  // hook form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  const onChangeModal = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setOpen(false)
      form.reset(defaultValues)
      setFormValue(defaultValues)
    }
  }

  const handleEdit = (item: Types) => {
    setFormValue(item)
    form.reset({
      name: item.name,
    })
    setOpen(true)
  }

  const handleDelete = (id: string): Promise<boolean> => {
    return mutateAsyncDelete(id)
      .then(() => true)
      .catch(() => false);
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: () => {
        setFormValue(null)
        form.reset(defaultValues)
      }
    })
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={onChangeModal}>
        <DialogTrigger asChild>
          <Button size="sm" type='button' className="h-6" variant="outline" onClick={() => setOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[300px] sm:w-[400px] md:w-[500px]">
          <DialogHeader>
            <DialogTitle>{!formValue?.id ? 'Create Model' : 'Edit Model'}</DialogTitle>
            <DialogDescription>
              model information form
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={(e) => {
              e.stopPropagation(); // duplicate button type=submit
              form.handleSubmit(onSubmit)(e);
            }} className="flex flex-col gap-3">
              <InputForm
                name="name"
                placeholder='Name'
              />
              <div>{typeData?.map((item, index) => (
                <div key={index} className='flex justify-between'>
                  {item.name}
                  <span>
                    <Button type='button' size='sm' variant='outline' onClick={() => handleEdit(item)} disabled={formValue?.id === item.id}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <DeleteDialog handleConfirm={() => handleDelete(item.id)} loading={isPendingDelete}>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DeleteDialog>
                  </span>
                </div>
              ))}</div>
              <DialogFooter className="mt-3">
                <Button type="submit" loading={isPending}>{formValue?.id ? 'Update' : 'Create'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

