import { HiOutlinePlusCircle } from "react-icons/hi"

type Dish = {
  imageUrl: string
  title: string
  kcals: number
  serving: number
  id: string
}

interface BoardProps {
  open: () => void
  title: string
  dishes: Dish[]
}

export const Board = ({ open, title, dishes }: BoardProps) => {
  return (
    <div className="p-3 pb-7 bg-white hover:bg-light-grey w-1/5 relative">
      <h2>{title}</h2>
      <div className="flex justify-between text-sm mb-3">
        <p className="text-dark-grey"> kcals</p>
        <p className="text-light-blue">40c/40p/20f</p>
      </div>

      <div>
        {dishes.length ? (
          dishes.map(({ id, title }) => (
            <div
              key={id}
              className="py-3 mx-3 flex justify-between items-center"
            >
              <p>{title}</p>
              <button className="default-button">Select</button>
            </div>
          ))
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
        onClick={open}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 default-button w-2/5 text-sm"
      >
        <HiOutlinePlusCircle size={20} className="mr-1" />
        Add alternative
      </button>
    </div>
  )
}
