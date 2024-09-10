import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { TypesFormDialog } from "@/module/types/type-dialog";
import { useQueryTypes } from "@/hook/types";
import TypesItem from "@/module/types/type-item";
import { Skeleton } from "@/components/ui/skeleton";
import DragDrop from "@/components/custom/drag-drop";
import { TypesAction } from "@/module/types/types-action";

const Types = () => {
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState(null);

  // hook
  const { data, isLoading } = useQueryTypes();

  // edit
  const handleEdit = (value: any) => {
    setFormValue(value);
    setOpen(true);
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
          {isLoading && Array(3).fill(null).map((_, index) => (
            <Skeleton key={index} className="h-[267px] rounded-xl" />
          ))}
          {/* {data && (
            <TypesItem
              items={data}
              handleEdit={handleEdit}
            />
          )} */}
          {data && (
            <DragDrop data={data} handleDragEnd={(e) => console.log(e)}>
              {(item, index) => (
                <TypesAction
                  key={index}
                  onEdit={() => null}
                  onDelete={() => null}
                  loading={false}
                >
                  <div>{item.name}</div>
                </TypesAction>
              )}
            </DragDrop>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default Types;
