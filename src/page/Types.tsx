import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { useNavigate } from "react-router-dom";
import { TypesFormDialog } from "@/module/type/TypesFormDialog";
import { useState, useEffect } from "react";
import { PaginationDemo } from "@/components/custom/PaginationDemo";
import { toast } from "sonner";

const Types = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/type');
        if (!response.ok) {
          throw new Error('Response Error');
        }
        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`/type/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete');
        }

        setLists(lists.filter(item => item.id !== id));
        toast.success('Type deleted successfully');
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('An error occurred while deleting the type.');
      }
    }
  };


  const handleEdit = (value: any) => {
    setFormValue(value);
    setOpen(true);
  };

  const redirectToInvoice = (name: string) => {
    navigate(`/types/invoice/${name}`);
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lists.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-medium">{item.order}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                          Delete
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => redirectToInvoice(item.name)}
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
            Showing <strong>1-10</strong> of <strong>{lists.length}</strong> Types
          </div>
          <PaginationDemo />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Types;
