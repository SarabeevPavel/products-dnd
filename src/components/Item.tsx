interface ItemProps {
  id: string
  dragOverlay?: boolean
}
export const Item: React.FC<ItemProps> = ({ id, dragOverlay }) => {
  return (
    <div className={`${dragOverlay && "cursor-grabbing"}`}>
      <img src={id} alt={id + "image"} className="w-28 h-28 object-cover" />
    </div>
  )
}
