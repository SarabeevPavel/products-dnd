interface InfoBarItemProps {
  title: string
  data: string
}

export const InfoBarItem = ({ title, data }: InfoBarItemProps) => {
  return (
    <div className="px-3 my-3 border-r border-light-grey">
      <p className="text-dark-grey font-semibold">{title}</p>
      <p>{data}</p>
    </div>
  )
}
