import { BiDotsHorizontalRounded, BiLogInCircle } from "react-icons/bi"

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-2 px-3 font-bold  border-b border-light-grey">
      <p>Test</p>
      <div className="flex items-center">
        <button className="default-button mr-2 border-none w-10 h-100">
          <BiDotsHorizontalRounded />
        </button>
        <button className="default-button">
          <BiLogInCircle className="mr-2" />
          Details
        </button>
      </div>
    </header>
  )
}
