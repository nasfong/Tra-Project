import { DeleteDialog } from "@/components/custom/delete-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Edit2Icon, Trash2 } from "lucide-react";

interface TypesActionProps {
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
  loading: boolean
}

export function TypesAction({ children, onEdit, onDelete, loading }: TypesActionProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="">{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-32">
        <ContextMenuItem inset onClick={onEdit}>
          Edit
          <ContextMenuShortcut>
            <Edit2Icon size="15px" />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <DeleteDialog handleConfirm={onDelete} loading={loading}>
          <ContextMenuItem inset onSelect={(e) => { e.preventDefault() }}>
            <span>Delete</span>
            <ContextMenuShortcut>
              <Trash2 size="15px" />
            </ContextMenuShortcut>
          </ContextMenuItem>
        </DeleteDialog>
      </ContextMenuContent>
    </ContextMenu>
  );
}
