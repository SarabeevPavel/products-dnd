import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import {
  arrayMove,
  insertAtIndex,
  removeAtIndex,
} from "./utils/arrayOperations"
import { Board } from "./components/Board"
import { Item } from "./components/Item"
import { Header } from "./components/Header"
import { InfoBar } from "./components/InfoBar"
import data from "./data/data.json"

function App() {
  const [dishGroups, setDishGroups] = useState<Record<string, string[]>>(data)

  const [activeId, setActiveId] = useState(null)

  const [over, setOver] = useState(null)

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = ({ active }: any) => setActiveId(active.id)
  const handleDragCancel = () => setActiveId(null)
  const handleDragOver = ({ active, over }: any) => {
    const overId = over?.id
    if (!overId) return

    const activeContainer = active.data.current.sortable.containerId
    const overContainer = over.data.current?.sortable.containerId || over.id
    if (activeContainer === overContainer) return
    setOver(overContainer)
  }

  const handleDragEnd = ({ active, over }: any) => {
    if (!over) {
      setActiveId(null)
      return
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId
      const overContainer = over.data.current?.sortable.containerId || over.id
      const activeIndex = active.data.current.sortable.index
      const overIndex =
        over.id in dishGroups
          ? dishGroups[overContainer].length + 1
          : over.data.current.sortable.index
      setDishGroups((dishGroups) => {
        let newDishes
        if (activeContainer === overContainer) {
          newDishes = {
            ...dishGroups,
            [overContainer]: arrayMove(
              dishGroups[overContainer],
              activeIndex,
              overIndex
            ),
          }
        } else {
          newDishes = moveBetweenContainers(
            dishGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          )
        }

        return newDishes
      })
    }
    setActiveId(null)
    setOver(null)
  }

  const moveBetweenContainers = (
    items: Record<string, string[]>,
    activeContainer: string,
    activeIndex: number,
    overContainer: string,
    overIndex: number,
    item: string
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    }
  }
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <main className="py-10 flex flex-col justify-center items-center bg-light-grey">
        <section className="w-3/4 h-2/3">
          <h1 className="text-left mb-4 text-xl text-dark-blue font-bold ">
            Zenfit Meal [v2]
          </h1>
          <div className="bg-white drop-shadow-md m-3 pb-5">
            <Header />
            <InfoBar />
            <div className="flex border border-light-grey mb-5 m-3">
              {Object.keys(dishGroups).map((group) => (
                <Board
                  id={group}
                  dishes={dishGroups[group]}
                  activeId={activeId}
                  over={over}
                  key={group}
                />
              ))}
            </div>
          </div>
          <DragOverlay>
            {activeId ? <Item id={activeId} dragOverlay /> : null}
          </DragOverlay>
        </section>
      </main>
    </DndContext>
  )
}

export default App
