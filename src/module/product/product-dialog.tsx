import { InputForm } from "@/components/form/input-form";
import { SelectForm } from "@/components/form/select-form";
import Upload from "@/components/form/upload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useQueryTypes } from "@/hook/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Constant } from "@/lib/constant";
import { TextAreaForm } from "@/components/form/textarea-form";
import { Ratings } from "@/components/custom/rating";
import { CheckboxForm } from "@/components/form/checkbox-form";
import { Button } from "@/components/ui/button";
import { AddTypeDialog } from "./add-type-dialog";
import { useSubmitProduct } from "@/hook/product";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formValue: Product | null;
  setFormValue: React.Dispatch<React.SetStateAction<Product | null>>;
};

export const ProductDialog = ({
  open,
  setOpen,
  formValue,
  setFormValue,
}: Props) => {
  const { data: typeData, isLoading: typeLoading } = useQueryTypes({
    fetch: open,
  });
  const { mutateAsync, isPending } = useSubmitProduct(formValue?.id);

  const formSchema = z.object({
    file: z.any().optional(),
    image: z.any().optional(),
    name: z.string().nonempty("required"),
    price: z.string().nonempty("required"),
    description: z.string().optional(),
    type: z.string().nonempty("required"),
    isNews: z.boolean().default(false),
    isSold: z.number().default(1),
    recommend: z.boolean().default(false),
    star: z.number(),
  });

  // default value
  const defaultValues = {
    file: [],
    image: [],
    name: "",
    price: "",
    description: "",
    type: "",
    isNews: true,
    isSold: 1,
    recommend: false,
    star: 5,
  };
  // hook form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const onChangeModal = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setOpen(false);
      form.reset(defaultValues);
      setFormValue(null);
    }
  };
  // handle submit
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    if (data.file && data.file.length > 0) {
      for (let i = 0; i < data.file.length; i++) {
        formData.append(`file`, data.file[i]);
      }
    }
    formData.append("image", JSON.stringify(data.image));
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description || "");
    formData.append("type", data.type);
    formData.append("isNews", data.isNews.toString());
    formData.append("isSold", data.isSold.toString());
    formData.append("recommend", data.recommend.toString());
    formData.append("star", data.star.toString());

    mutateAsync(formData).finally(() => {
      onChangeModal(false);
    });
  };

  // get edit
  useEffect(() => {
    if (formValue) {
      form.reset({
        image: formValue.image,
        name: formValue.name,
        description: formValue.description,
        price: formValue.price,
        type: formValue.type.id,
        isSold: formValue.isSold,
        isNews: formValue.isNews,
        star: formValue.star,
        recommend: formValue.recommend,
      });
    }
  }, [form, formValue]);

  return (
    <Dialog open={open} onOpenChange={onChangeModal}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="min-w-[60%]">
        <DialogHeader>
          <DialogTitle>
            {!formValue?.id ? "Create Product" : "Edit Product"}
          </DialogTitle>
          <DialogDescription>product information form</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Upload form={form} name="file" />
            <div className="grid grid-cols-2 gap-3">
              <InputForm name="name" label={"Name"} placeholder={"Name"} />
              <InputForm name="price" label="Price" placeholder="Price" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SelectForm
                name="type"
                label="Model"
                placeholder="Select a Model"
                addMoreComponent={<AddTypeDialog />}
                options={typeData}
                loading={typeLoading}
              />
              <SelectForm
                name="isSold"
                options={Constant.stock}
                label="Stock"
                placeholder="Select a Stock"
              />
            </div>
            <TextAreaForm
              name="description"
              label="Description"
              placeholder="Description"
            />
            <Ratings
              rating={form.getValues("star")}
              variant="yellow"
              onRatingChange={(value) => form.setValue("star", value)}
            />
            <CheckboxForm form={form} name="isNews" label="New" />
            <CheckboxForm form={form} name="recommend" label="Recommend" />
            <DialogFooter className="mt-3">
              <Button type="submit" loading={isPending}>
                {formValue?.id ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
