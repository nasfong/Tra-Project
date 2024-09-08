import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { TypesFormDialog } from "@/module/types/TypesFormDialog";
import { useDeleteType, useQueryTypes } from "@/hook/types";
import TypesItem from "@/module/types/TypesItem";

const Types = () => {
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState(null);

  const { data } = useQueryTypes();
  const { mutate: deleteMutation } = useDeleteType();

  const handleEdit = (value: any) => {
    setFormValue(value);
    setOpen(true);
  };
  const onDelete = (id: string) => {
    deleteMutation(id);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end gap-2">
        <TypesFormDialog
          open={open}
          setOpen={setOpen}
          formValue={formValue}
          setFormValue={setFormValue}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Types</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data && (
            <TypesItem
              items={data}
              onDelete={onDelete}
              handleEdit={handleEdit}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Types;
