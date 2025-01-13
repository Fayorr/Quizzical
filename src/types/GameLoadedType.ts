import { Dispatch, SetStateAction } from "react"
export type GameLoadedType = {
    isGameLoaded: boolean
    setIsGameLoaded: Dispatch<SetStateAction<boolean>>
}