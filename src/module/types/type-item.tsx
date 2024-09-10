import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
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
import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useDeleteType, useUpdateType } from "@/hook/types";
import { TypesAction } from "./types-action";

const TypesItem = memo(
  ({
    items,
    handleEdit,
  }: {
    items: Types[];
    handleEdit: (item: Types) => void;
  }) => {
    const [data, setData] = useState(items);
    const [activeId, setActiveId] = useState<string | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const { mutateAsync: mutateAsyncDelete, isPending: isPendingDelete } = useDeleteType();

    const { mutate: updateMutation } = useUpdateType();

    const onDelete = (id: string) => {
      return mutateAsyncDelete(id)
        .then(() => true)
        .catch(() => false);
    };

    useEffect(() => {
      setData(items);
    }, [items]);

    const handleDragStart = useCallback((event: DragStartEvent) => {
      setActiveId(event.active.id.toString());
    }, []);

    const handleDragEnd = useCallback(
      (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
          setData((data) => {
            const oldIndex = data.findIndex((item) => item.id === active.id);
            const newIndex = data.findIndex((item) => item.id === over?.id);

            const updatedItems = arrayMove(data, oldIndex, newIndex);
            updateMutation({
              items: updatedItems.map((item, index) => ({
                name: item.name,
                id: item.id,
                order: index + 1, // Update order based on the new index
              })),
            });
            return updatedItems;
          });
        }

        setActiveId(null);
      },
      [updateMutation]
    );

    const handleDragCancel = useCallback(() => {
      setActiveId(null);
    }, []);

    const Item = forwardRef<
      HTMLDivElement,
      {
        id: string;
        name: string;
        order: number;
        isDragging?: boolean;
        style?: React.CSSProperties;
      }
    >(({ name, isDragging, style, ...props }, ref) => {
      const inlineStyles: React.CSSProperties = {
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
        transform: isDragging ? "scale(1.05)" : "scale(1)",
        ...style,
      };

      return (
        <div ref={ref} style={inlineStyles} {...props}>
          <div>{name}</div>
        </div>
      );
    });

    const SortableItem = (props: {
      id: string;
      name: string;
      order: number;
    }) => {
      const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({ id: props.id });

      const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
      };

      return (
        <Item
          ref={setNodeRef}
          style={style}
          isDragging={isDragging}
          {...props}
          {...attributes}
          {...listeners}
        />
      );
    };

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={data.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
            {data.map((item) => (
              <TypesAction
                key={item.id}
                onEdit={() => handleEdit(item)}
                onDelete={() => onDelete(item.id)}
                loading={isPendingDelete}
              >
                <SortableItem
                  id={item.id}
                  name={item.name}
                  order={item.order}
                />
              </TypesAction>
            ))}
          </div>
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
          {activeId ? (
            <Item
              id={activeId}
              name={data.find((item) => item.id === activeId)?.name || ""}
              order={data.find((item) => item.id === activeId)?.order || 0}
              isDragging
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  }
);

export default TypesItem;
