import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { CustomerFormDialog } from "@/module/customer/customer-dialog";
import { CustomerFilter } from "@/module/customer/customer-filter";
import { useState } from "react";
import { PaginationDemo } from "@/components/custom/pagination-demo";

const lists = [
  {
    id: 1,
    name: "Laser Lemonade Machine",
    status: "Draft",
    price: "$499.99",
    totalSales: "25",
    createdAt: "2023-07-12 10:42 AM",
  },
  {
    id: 2,
    name: "Hypernova Headphones",
    status: "Active",
    price: "$129.99",
    totalSales: "100",
    createdAt: "2023-10-18 03:21 PM",
  },
];

const Customer = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState(null);

  const handleEdit = (value: any) => {
    console.log(value);
    setFormValue(value);
    setOpen(true);
  };

  const redirectToInvoice = (id: number) => {
    navigate(`/customer/invoice/${id}`);
  };

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
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Total Sales
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lists.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.price}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.totalSales}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.createdAt}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => redirectToInvoice(item.id)}
                        >
                          Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground sr-only sm:not-sr-only">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
          <PaginationDemo />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Customer;
