import { InfoBarItem } from "./InfoBarItem"

export const InfoBar = () => {
  return (
    <div className="flex items-center h-full  border-b border-light-grey">
      <div className="flex justify-between">
        <InfoBarItem title="Target kcals" data="4000" />
        <InfoBarItem title="Macro split" data="40c/40p/20f" />
        <InfoBarItem title="Status" data="Plan is visible" />
        <InfoBarItem title="Created" data="25 aug 2019" />
      </div>
      <div className="mx-5 py-3 px-2 bg-light-red rounded-md">
        <p className="text-dark-red">Message</p>
      </div>
    </div>
  )
}
