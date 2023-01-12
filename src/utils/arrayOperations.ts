import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable"

export const removeAtIndex = (dishes: string[], index: number) => {
  return [...dishes.slice(0, index), ...dishes.slice(index + 1)]
}

export const insertAtIndex = (
  dishes: string[],
  index: number,
  item: string
) => {
  return [...dishes.slice(0, index), item, ...dishes.slice(index)]
}

export const arrayMove = (
  dishes: string[],
  oldIndex: number,
  newIndex: number
) => {
  return dndKitArrayMove(dishes, oldIndex, newIndex)
}
