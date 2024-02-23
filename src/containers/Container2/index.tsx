import { FeatureId, useFeatures } from "../../featureManger";
import { useAppSelector } from "../../store/react-hooks";

const features: FeatureId[] = ["user", "settings"];

function Container2() {
  useFeatures(features);
  const settings = useAppSelector((state) => state.settings?.settings);
  return <div>{settings?.test}</div>;
}

export default Container2;
