import { useDroppable } from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import { HiOutlinePlusCircle } from "react-icons/hi"
import { Dish } from "./Dish"

// type Dish = {
//   imageUrl: string
//   title: string
//   kcals: number
//   serving: number
//   id: string
// }

interface BoardProps {
  id: string
  title: string
  dishes: string[]
  activeId: string | null
}

export const Board = ({ id, title, dishes }: BoardProps) => {
  const { setNodeRef } = useDroppable({ id })
  return (
    <SortableContext id={id} items={dishes} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        className="p-3 pb-7 bg-white hover:bg-light-grey w-1/5 relative"
      >
        <h2>{title}</h2>
        <div className="flex justify-between text-sm mb-3">
          <p className="text-dark-grey"> kcals</p>
          <p className="text-light-blue">40c/40p/20f</p>
        </div>

        <div className="droppable" ref={setNodeRef}>
          {dishes.length ? (
            dishes.map((dish, i) => <Dish key={i} id={dish} />)
          ) : (
            <div className="my-3 text-center">
              <p className="text-sm text-dark-grey">
                It's empty here for now.
                <br />
                Add dishes please.
              </p>
            </div>
          )}
        </div>

        <button
          //   onClick={open}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 default-button w-2/5 text-sm"
        >
          <HiOutlinePlusCircle size={20} className="mr-1" />
          Add alternative
        </button>
      </div>
    </SortableContext>
  )
}
