import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { ReactNode } from "react";
import { CSS } from "@dnd-kit/utilities";
import { TypesAction } from "@/module/types/types-action";

type DragDropProps<T> = {
  data: T[];
  className?: string;
  children: (item: T) => ReactNode;
  handleDragEnd?: (event: any) => void;
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
};

export const DragDrop = <T extends { id: string }>({
  children,
  handleDragEnd,
  data = [],
  className,
  onEdit,
  onDelete,
  loading = false,
}: DragDropProps<T>) => {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const SortableItem = ({
    id,
    children,
  }: {
    id: string;
    children: ReactNode;
  }) => {
    const {
      isDragging,
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id });

    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition: transition || undefined,
      opacity: isDragging ? 0.5 : 1,
      transformOrigin: "50% 50%",
      // height: "50px",
      borderRadius: "10px",
      cursor: isDragging ? "grabbing" : "grab",
      // backgroundColor: "#ffffff",
      boxShadow: isDragging
        ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
        : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    );
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (handleDragEnd) {
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over?.id);
      const updatedItems = arrayMove(data, oldIndex, newIndex);
      handleDragEnd(updatedItems);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={data.map((item) => item.id)}
        strategy={rectSortingStrategy}
      >
        <div className={className}>
          {data.map((item) => (
            <TypesAction
              key={item.id}
              onEdit={() => onEdit(item)}
              onDelete={() => onDelete(item.id)}
              loading={loading}
            >
              <SortableItem key={item.id} id={item.id}>
                {children(item)}
              </SortableItem>
            </TypesAction>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
