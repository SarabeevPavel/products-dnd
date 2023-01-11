import { Header } from "./components/Header"
import { InfoBar } from "./components/InfoBar"
import { ChooseModal } from "./components/ChooseModal"
import { useState } from "react"
import foodData from "./data/foodData.json"
import { Board } from "./components/Board"

function App() {
  const [isOpenChooseModal, setIsOpenChooseModal] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState<null | string>(null)
  const [breakfastDishes, setBreakfastDishes] = useState([])

  console.log(foodData)
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center bg-light-grey">
      <section className="w-3/4 h-2/3">
        <h1 className="text-left mb-4 text-xl text-dark-blue font-bold ">
          Zenfit Meal [v2]
        </h1>
        <div className="bg-white drop-shadow-md m-3 pb-5">
          <Header />
          <InfoBar />
          <div className="flex border border-light-grey mb-5 m-3">
            <Board
              title="Breakfast"
              dishes={breakfastDishes}
              open={() => setIsOpenChooseModal(true)}
            />
          </div>
        </div>
      </section>
      <ChooseModal
        open={isOpenChooseModal}
        onClose={() => {
          setIsOpenChooseModal(false)
          setSelectedBoard(null)
        }}
        data={foodData}
      />
    </main>
  )
}

export default App
