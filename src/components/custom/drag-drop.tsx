import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { memo, ReactNode } from "react";
import { CSS } from "@dnd-kit/utilities";

type DragDropProps<T> = {
  children: (item: T, index: number) => ReactNode;
  handleDragEnd?: (event: any) => void;
  data: T[];
};

const DragDrop = memo(
  <T extends { id: string }>({
    children,
    handleDragEnd,
    data = [],
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
        height: "50px",
        borderRadius: "10px",
        cursor: isDragging ? "grabbing" : "grab",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={data.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {data.map((item, index) => (
              <SortableItem key={item.id} id={item.id}>
                {children(item, index)}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  }
);

export default DragDrop;
