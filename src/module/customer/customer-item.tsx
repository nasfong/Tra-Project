import { Image } from "@/components/custom/image";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateDisplay, statusDisplay } from "@/lib/utils";
import { CustomerAction } from "./customer-action";

type CustomerItemProps = {
  data: Customer[] | undefined;
  onEdit: (item: Customer) => void
  onApprove: (id: string) => void
  redirectToInvoice: (id: string) => void
  onMoveToTrash: (id: string) => void
  loadingStatus: boolean
}

export const CustomerItem = ({ data, onEdit, onApprove, redirectToInvoice, onMoveToTrash, loadingStatus }: CustomerItemProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">
            Created at
          </TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <Image src={item.image} alt={item.name} width={50} height={50} />
            </TableCell>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>
              <Badge variant="outline">{statusDisplay(item.status)}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              ${item.product.price}
            </TableCell>

            <TableCell className="hidden md:table-cell">
              {dateDisplay(item.createdAt, 'yyyy-MM-dd hh:mm a')}
            </TableCell>
            <TableCell>
              <CustomerAction
                status={item.status}
                onEdit={() => onEdit(item)}
                onApprove={() => onApprove(item.id)}
                redirectToInvoice={() => redirectToInvoice(item.id)}
                onMoveToTrash={() => onMoveToTrash(item.id)}
                loadingStatus={loadingStatus}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
