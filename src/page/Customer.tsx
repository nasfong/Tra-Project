import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CustomerFormDialog } from "@/module/customer/customer-dialog";
import { CustomerFilter } from "@/module/customer/customer-filter";
import { useState } from "react";
import { PaginationDemo } from "@/components/custom/pagination-demo";
import { useQueryCustomers, useUpdateStatusCustomer } from "@/hook/customer";
import { Constant } from "@/lib/constant";
import { CustomerItem } from "@/module/customer/customer-item";

const Customer = () => {
  const navigate = useNavigate();

  // state
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState<Customer | null>(null);

  // hook
  const { data } = useQueryCustomers()
  const { mutateAsync: statusMutateAsync, isPending: loadingStatus } = useUpdateStatusCustomer()

  // edit
  const onEdit = (value: any) => {
    setFormValue(value);
    setOpen(true);
  };

  // redirect to invoice
  const redirectToInvoice = (id: string) => {
    navigate(`/customer/invoice/${id}`);
  };

  // approved
  const onApprove = (id: string) => {
    statusMutateAsync({
      id,
      status: Constant.status.Approved,
    })
      .then(() => true)
      .catch(() => false);
  }

  // trash
  const onMoveToTrash = (id: string) => {
    return statusMutateAsync({
      id,
      status: Constant.status.Trash,
    })
      .then(() => true)
      .catch(() => false);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end gap-2">
        <CustomerFilter />
        <CustomerFormDialog
          open={open}
          setOpen={setOpen}
          formValue={formValue}
          setFormValue={setFormValue}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Customer</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerItem
            data={data}
            onEdit={onEdit}
            onApprove={onApprove}
            redirectToInvoice={redirectToInvoice}
            onMoveToTrash={onMoveToTrash}
            loadingStatus={loadingStatus}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground sr-only sm:not-sr-only">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
          <PaginationDemo />
        </CardFooter>
      </Card>
    </div >
  );
};

export default Customer;
