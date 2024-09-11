import { DeleteDialog } from "@/components/custom/delete-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Constant } from "@/lib/constant";
import { MoreHorizontal } from "lucide-react";

type CustomerActionProps = {
  status: 1 | 2 | 3
  onEdit: () => void;
  onApprove: () => void; // Updated to return a Promise
  redirectToInvoice: () => void;
  onMoveToTrash: () => void;
  loadingStatus: boolean;
}

export const CustomerAction = ({ status, onEdit, onApprove, redirectToInvoice, onMoveToTrash, loadingStatus }: CustomerActionProps) => {
  return (
    <DropdownMenu >
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
        <DropdownMenuItem onClick={onEdit}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onApprove} loading={loadingStatus} disabled={status === Constant.status.Approved}>
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={redirectToInvoice}>
          Invoice
        </DropdownMenuItem>
        <DropdownMenuItem onClick={e => e.preventDefault()}>
          <DeleteDialog handleConfirm={onMoveToTrash} loading={loadingStatus}>
            <span>Move to trash</span>
          </DeleteDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
