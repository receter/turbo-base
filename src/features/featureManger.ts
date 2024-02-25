import { createContext, useContext, useEffect } from "react";
import { ReducerManager } from "../store/reducerManager";
import { Dispatch } from "@reduxjs/toolkit";
import settingsSlice from "./settings/slice";
import userSlice from "./user/slice";
import fileSystemSlice from "./fileSystem/slice";

export const featureSliceMap = {
  settings: settingsSlice,
  user: userSlice,
  fileSystem: fileSystemSlice,
};

export type FeatureKey = keyof typeof featureSliceMap;

// Feature reducers are optional in the root state
export type RootStateFeatures = {
  [K in FeatureKey]?: ReturnType<(typeof featureSliceMap)[K]["reducer"]>;
};

type FeaturesValue = ReturnType<typeof configureFeatureManager> | null;

const FeaturesContext = createContext<FeaturesValue>(null);

const configureFeatureManager = (
  reducerManager: ReducerManager,
  dispatch: Dispatch,
) => {
  let currentRegistry: FeatureKey[][] = [];

  function updateReducers() {
    let reducerWasChanged: boolean = false;

    const registeredFeaturesSet: FeatureKey[] = [
      ...new Set(currentRegistry.flat()),
    ];

    const reducerMap = reducerManager.getReducerMap();
    const reducerMapFeatureKeys = Object.keys(reducerMap).filter((key) =>
      Object.keys(featureSliceMap).includes(key),
    );
    // Add recently registered reducers
    const reducersToAdd = registeredFeaturesSet.filter(
      (key) => !reducerMapFeatureKeys.includes(key),
    );

    reducersToAdd.forEach((key) => {
      const slice = featureSliceMap[key];
      reducerManager.add(key, slice.reducer);
    });

    // Remove recently unregistered reducers
    const reducersToRemove = reducerMapFeatureKeys.filter(
      (key) => !registeredFeaturesSet.includes(key as FeatureKey),
    );

    reducersToRemove.forEach((key) => reducerManager.remove(key));
    reducerWasChanged = reducersToAdd.length > 0 || reducersToRemove.length > 0;

    if (reducerWasChanged) {
      dispatch({ type: "REDUCER_REPLACED" });
    }
  }
  return {
    register: (features: FeatureKey[]) => {
      currentRegistry = [...currentRegistry, features];
      updateReducers();
    },
    unregister: (features: FeatureKey[]) => {
      currentRegistry = currentRegistry.filter((item) => item !== features);
      updateReducers();
    },
  };
};

function useFeatures(features: FeatureKey[]) {
  const featureManager = useContext(FeaturesContext);
  useEffect(() => {
    if (featureManager) {
      featureManager.register(features);
      return () => {
        featureManager.unregister(features);
      };
    }
  }, [featureManager, features]);
}

export { useFeatures, configureFeatureManager, FeaturesContext };
