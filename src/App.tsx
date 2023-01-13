import { useState } from "react"
import { DndContext, DragOverlay } from "@dnd-kit/core"

import { Board } from "./components/Board"
import { Item } from "./components/Item"
import { Header } from "./components/Header"
import { InfoBar } from "./components/InfoBar"
import data from "./data/data.json"
import { useDefaultSensors } from "./hooks/useDefaultSensors"
import {
  handleDragCancel,
  handleDragEnd,
  handleDragOver,
  handleDragStart,
} from "./utils/handlers"

function App() {
  const [dishGroups, setDishGroups] = useState<Record<string, string[]>>(data)

  const [activeId, setActiveId] = useState<string | null>(null)

  const [over, setOver] = useState<string | null>(null)

  const sensors = useDefaultSensors()

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => handleDragStart(e, setActiveId)}
      onDragCancel={() => handleDragCancel(setActiveId)}
      onDragOver={(e) => handleDragOver(e, setOver)}
      onDragEnd={(e) =>
        handleDragEnd(e, setActiveId, setDishGroups, setOver, dishGroups)
      }
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
