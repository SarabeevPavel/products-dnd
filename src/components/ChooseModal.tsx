import { Portal } from "./Portal"
import { RxCross1 } from "react-icons/rx"

type Dish = {
  imageUrl: string
  title: string
  kcals: number
  serving: number
  id: string
}

interface ChooseModalProps {
  open: boolean
  onClose: () => void
  data: Dish[]
}

export const ChooseModal = ({ open, onClose, data }: ChooseModalProps) => {
  if (!open) return null

  return (
    <Portal>
      <div className="rounded-md bg-white w-1/3 max-w-xl h-3/4 divide-y overflow-y-auto">
        <div className="py-3 mx-3 flex justify-between items-center">
          <p className="uppercase ml-5">Recipes</p>
          <button
            className="default-button border-none rounded-full"
            onClick={onClose}
          >
            <RxCross1 />
          </button>
        </div>
        <div className="divide-y">
          {data &&
            data.map(({ id, title }) => (
              <div
                key={id}
                className="py-3 mx-3 flex justify-between items-center"
              >
                <p>{title}</p>
                <button className="default-button">Select</button>
              </div>
            ))}
        </div>
      </div>
    </Portal>
  )
}
