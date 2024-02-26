import { FeatureKey, useFeatures } from "../../features";
import { useAppSelector } from "../../store/react-hooks";

const features: FeatureKey[] = ["user", "settings"];

function Container2() {
  useFeatures(features);
  const settings = useAppSelector((state) => state.settings?.settings);
  return <div>{settings?.test}</div>;
}

export default Container2;
