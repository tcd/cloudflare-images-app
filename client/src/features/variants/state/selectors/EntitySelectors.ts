import { RootState } from "@app/state"
import { VariantsEntityAdapter } from "../state"
import { selectSlice } from "."

export const EntitySelectors = VariantsEntityAdapter.getSelectors<RootState>(selectSlice)
