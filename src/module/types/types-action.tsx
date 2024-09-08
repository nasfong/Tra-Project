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
}

export function TypesAction({ children, onEdit, onDelete }: TypesActionProps) {
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
        <ContextMenuItem inset onClick={onDelete}>
          Delete
          <ContextMenuShortcut>
            <Trash2 size="15px" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
