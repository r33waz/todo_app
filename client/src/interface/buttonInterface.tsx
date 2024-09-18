import { ReactNode } from "react"

export interface ButtonInterface{
    children: ReactNode,
    className: string,
    type?: "button" | "submit" | "reset"
}

export interface Action_Button{
    children: ReactNode,
    onClick: () => void,
    className: string,
    type?: "button" | "submit" | "reset"
}