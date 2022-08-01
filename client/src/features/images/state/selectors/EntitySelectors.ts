import { RootState } from "@app/state"
import { ImagesEntityAdapter } from "../state"
import { selectSlice } from "."

export const EntitySelectors = ImagesEntityAdapter.getSelectors<RootState>(selectSlice)
