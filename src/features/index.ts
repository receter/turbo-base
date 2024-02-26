import { createContext, useContext, useEffect } from "react";
import { ReducerManager } from "../store/reducerManager";
import { Dispatch } from "@reduxjs/toolkit";
import { sagaMiddleware } from "../store";
import exampleFeature from "./example";
import fileSystemFeature from "./fileSystem";
import settingsFeature from "./settings";
import userFeature from "./user";

const featureMap = {
  settings: settingsFeature,
  user: userFeature,
  fileSystem: fileSystemFeature,
  example: exampleFeature,
};

export type FeatureKey = keyof typeof featureMap;

// Feature reducers are optional in the root state
export type RootStateFeatures = {
  [K in FeatureKey]?: ReturnType<(typeof featureMap)[K]["slice"]["reducer"]>;
};

type FeaturesValue = ReturnType<typeof configureFeatureManager> | null;

const FeaturesContext = createContext<FeaturesValue>(null);

const configureFeatureManager = (
  reducerManager: ReducerManager,
  dispatch: Dispatch,
) => {
  let currentRegistry: FeatureKey[][] = [];
  const runningSagas: {
    [key in FeatureKey]?: ReturnType<typeof sagaMiddleware.run>;
  } = {};

  function updateReducers() {
    let reducerWasChanged: boolean = false;

    const registeredFeaturesSet: FeatureKey[] = [
      ...new Set(currentRegistry.flat()),
    ];

    const reducerMap = reducerManager.getReducerMap();
    const reducerMapFeatureKeys = Object.keys(reducerMap).filter((key) =>
      Object.keys(featureMap).includes(key),
    ) as FeatureKey[];

    // Add recently registered reducers
    const reducersToAdd = registeredFeaturesSet.filter(
      (key) => !reducerMapFeatureKeys.includes(key),
    );

    reducersToAdd.forEach((key) => {
      const { slice, saga } = featureMap[key];
      reducerManager.add(key, slice.reducer);
      if (saga) {
        runningSagas[key] = sagaMiddleware.run(saga);
      }
    });

    // Remove recently unregistered reducers
    const reducersToRemove = reducerMapFeatureKeys.filter(
      (key) => !registeredFeaturesSet.includes(key),
    );

    reducersToRemove.forEach((key) => {
      reducerManager.remove(key);
      const saga = runningSagas[key];
      if (typeof saga !== "undefined") {
        saga.cancel();
        delete runningSagas[key];
      }
    });

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
