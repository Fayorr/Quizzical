import { GameLoadedType, GameOptionsType } from "../types"
import { Dispatch, SetStateAction } from "react"
export type GameStateType = {
isGameLoaded: GameLoadedType
setIsGameLoaded: GameLoadedType
gameOptions: GameOptionsType
setGameOptions: Dispatch<SetStateAction<GameOptionsType>>
}