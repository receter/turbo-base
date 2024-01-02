import { FeatureId, useFeatures } from "../../featureManger";
import { useAppSelector } from "../../store/react-hooks";

const features: FeatureId[] = ["user"];

function Container1() {
  useFeatures(features);
  const user = useAppSelector((state) => state.user?.user);
  return <div>{user === null && "User null"}</div>;
}

export default Container1;
