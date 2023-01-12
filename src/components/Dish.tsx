import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Item } from "./Item"

interface DishProps {
  id: string
}

export const Dish = ({ id }: DishProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="item py-3 mx-3 flex justify-between items-center p-2 hover:bg-green-100 hover:cursor-move"
    >
      <Item id={id} />
    </div>
  )
}
