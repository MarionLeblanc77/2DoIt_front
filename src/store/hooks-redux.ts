/* eslint-disable @typescript-eslint/no-restricted-imports */
import type { TypedUseSelectorHook } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./types";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
