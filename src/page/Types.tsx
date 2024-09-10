import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { TypesFormDialog } from "@/module/types/type-dialog";
import { useDeleteType, useQueryTypes, useUpdateTypeOrder } from "@/hook/types";
import { Skeleton } from "@/components/ui/skeleton";
import { DragDrop } from "@/components/custom/drag-drop";

const Types = () => {
  // hook
  const { data: listData, isLoading } = useQueryTypes();
  const { mutate: updateOrderMutation } = useUpdateTypeOrder();
  const { mutateAsync: mutateAsyncDelete, isPending: isPendingDelete } =
    useDeleteType();

  // state
  const [data, setData] = useState<Types[] | undefined>([]);
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState(null);

  // useEffect
  useEffect(() => {
    setData(listData);
  }, [listData]);

  // edit
  const handleEdit = (value: any) => {
    setFormValue(value);
    setOpen(true);
  };

  // delete
  const onDelete = (id: string) => {
    return mutateAsyncDelete(id)
      .then(() => true)
      .catch(() => false);
  };

  // drag and drop
  const handleDragEnd = useCallback(
    (updatedItems: any[]) => {
      setData(updatedItems);
      updateOrderMutation({
        items: updatedItems.map((item, index) => ({
          name: item.name,
          id: item.id,
          order: index + 1, // Update order based on the new index
        })),
      });
    },
    [updateOrderMutation]
  );

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
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {isLoading &&
              Array(5)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="h-[64px] rounded-xl" />
                ))}
          </div>
          {data && (
            <DragDrop
              data={data}
              handleDragEnd={handleDragEnd}
              onEdit={handleEdit}
              onDelete={onDelete}
              loading={isPendingDelete}
              className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
            >
              {(item) => (
                <div
                  key={item.id}
                  className="text-center flex justify-center items-center h-16"
                >
                  {item.name}
                </div>
              )}
            </DragDrop>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Types;
