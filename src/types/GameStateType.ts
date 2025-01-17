import { GameOptionsType } from "../types"
import { Dispatch, SetStateAction } from "react"
export type GameStateType = {
isGameLoaded: boolean
setIsGameLoaded: Dispatch<SetStateAction<boolean>>
gameOptions: GameOptionsType
setGameOptions: Dispatch<SetStateAction<GameOptionsType>>
}