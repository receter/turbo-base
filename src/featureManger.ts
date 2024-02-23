import { createContext, useContext, useEffect } from "react";
import { ReducerManager } from "./store/reducerManager";
import { settingsSlice } from "./features/settings/slice";
import { userSlice } from "./features/user/slice";
import { Dispatch } from "@reduxjs/toolkit";

const featureSliceMap = {
  settings: settingsSlice,
  user: userSlice,
};

export type FeatureId = keyof typeof featureSliceMap;

type FeaturesValue = ReturnType<typeof configureFeatureManager> | null;

const FeaturesContext = createContext<FeaturesValue>(null);

const configureFeatureManager = (
  reducerManager: ReducerManager,
  dispatch: Dispatch,
) => {
  let currentRegistry: FeatureId[][] = [];

  function updateReducers() {
    let reducerWasChanged: boolean = false;

    const registeredFeaturesSet: FeatureId[] = [
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
      (key) => !registeredFeaturesSet.includes(key as FeatureId),
    );

    reducersToRemove.forEach((key) => reducerManager.remove(key));
    reducerWasChanged = reducersToAdd.length > 0 || reducersToRemove.length > 0;

    if (reducerWasChanged) {
      dispatch({ type: "REDUCER_REPLACED" });
    }
  }
  return {
    register: (features: FeatureId[]) => {
      currentRegistry = [...currentRegistry, features];
      updateReducers();
    },
    unregister: (features: FeatureId[]) => {
      currentRegistry = currentRegistry.filter((item) => item !== features);
      updateReducers();
    },
  };
};

function useFeatures(features: FeatureId[]) {
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
