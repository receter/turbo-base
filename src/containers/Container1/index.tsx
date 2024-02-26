import { FeatureKey, useFeatures } from "../../features/featureManger";
import { setUser } from "../../features/user/slice";
import { useAppDispatch, useAppSelector } from "../../store/react-hooks";

const features: FeatureKey[] = ["user"];

function Container1() {
  useFeatures(features);
  const user = useAppSelector((state) => state.user?.user);
  const dispatch = useAppDispatch();
  function handleClickSetUser() {
    dispatch(setUser({ email: "John" }));
  }
  return (
    <div>
      {user === null && "User null"}
      <button onClick={handleClickSetUser}>Set user</button>
    </div>
  );
}

export default Container1;
