import React from "react"
import { arrayMove, insertAtIndex, removeAtIndex } from "./arrayOperations"

export const handleDragStart = (
  { active }: any,
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
) => setActiveId(active.id)

export const handleDragCancel = (
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
) => setActiveId(null)

export const handleDragOver = (
  { active, over }: any,
  setOver: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const overId = over?.id
  if (!overId) return

  const activeContainer = active.data.current.sortable.containerId
  const overContainer = over.data.current?.sortable.containerId || over.id
  if (activeContainer === overContainer) return
  setOver(overContainer)
}

export const handleDragEnd = (
  { active, over }: any,
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>,
  setDishGroups: React.Dispatch<React.SetStateAction<Record<string, string[]>>>,
  setOver: React.Dispatch<React.SetStateAction<string | null>>,
  dishGroups: Record<string, string[]>
) => {
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

export const moveBetweenContainers = (
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
