import React, { useEffect, useMemo } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
  children: React.ReactNode
}

const modalRootElement = document.querySelector("#modal")

export const Portal = ({ children }: PortalProps) => {
  const element = useMemo(() => document.createElement("div"), [])

  useEffect(() => {
    modalRootElement?.appendChild(element)

    return () => {
      modalRootElement?.removeChild(element)
    }
  })

  return createPortal(
    <div className="fixed top-0 left-0 h-full w-full bg-black/25 flex justify-center items-center">
      {children}
    </div>,
    element
  )
}
