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

  // params
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get('page') || '1')
  const status = parseInt(queryParams.get('status') || "") || undefined;


  // hook
  const { data } = useQueryCustomers({ limit: 2, page, status: status })
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
            data={data?.data}
            onEdit={onEdit}
            onApprove={onApprove}
            redirectToInvoice={redirectToInvoice}
            onMoveToTrash={onMoveToTrash}
            loadingStatus={loadingStatus}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <PaginationDemo {...data?.pagination} />
        </CardFooter>
      </Card>
    </div >
  );
};

export default Customer;
