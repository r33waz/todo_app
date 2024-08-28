import { ReactNode } from "react"

export interface ButtonInterface{
    children: ReactNode,
    onClick: () => void,
    className: string,
    type?: "button" | "submit" | "reset"
}