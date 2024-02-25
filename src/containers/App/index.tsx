import { useState } from "react";

import { FeatureKey, useFeatures } from "../../features/featureManger";

const features: FeatureKey[] = ["fileSystem"];

import Container1 from "../Container1";
import Container2 from "../Container2";
import { useAppDispatch, useAppSelector } from "../../store/react-hooks";
import { FileSystemDev } from "../../features/fileSystem/components/FileSystemDev";
import { initialize } from "../../features/fileSystem/slice";

function App() {
  useFeatures(features);
  const [container1Active, setContainer1Active] = useState(false);
  const [container2Active, setContainer2Active] = useState(false);
  return (
    <div style={{ padding: "1rem" }}>
      <h1>App</h1>
      <FileSystemTest />
      <h2>Dev</h2>
      <button onClick={() => setContainer1Active((v) => !v)}>
        Toggle container 1
      </button>
      {container1Active && <Container1 />}
      <button onClick={() => setContainer2Active((v) => !v)}>
        Toggle container 2
      </button>
      {container2Active && <Container2 />}
    </div>
  );
}

function FileSystemTest() {
  const fileSystem = useAppSelector((state) => state.fileSystem);
  console.log("fileSystem", fileSystem);
  const dispatch = useAppDispatch();

  function handleClickInit() {
    dispatch(initialize("dropbox"));
  }

  return (
    <div>
      <h2>FileSystem</h2>
      {fileSystem && <FileSystemDev fileSystem={fileSystem} />}
      <button onClick={handleClickInit}>Init</button>
    </div>
  );
}

export default App;
