import { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from ".";
import { useSelector, useDispatch } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
