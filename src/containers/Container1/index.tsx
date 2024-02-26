import { FeatureKey, useFeatures } from "../../features";
import { Example } from "../../features/example/components/Example";
import { ratingRequest, setName } from "../../features/example/slice";
import { setUser } from "../../features/user/slice";
import { useAppDispatch, useAppSelector } from "../../store/react-hooks";

const features: FeatureKey[] = ["user", "example"];

function Container1() {
  useFeatures(features);
  const user = useAppSelector((state) => state.user?.user);
  const example = useAppSelector((state) => state.example);
  const dispatch = useAppDispatch();

  function handleClickSetUser() {
    dispatch(setUser({ email: "John" }));
  }

  function handleClickSetName() {
    dispatch(setName("John"));
  }

  function handleClickGetRating() {
    dispatch(ratingRequest());
  }

  return (
    <div>
      {user === null && "User null"}
      <button onClick={handleClickSetUser}>Set user</button>
      {example && <Example exampleState={example} />}
      <button onClick={handleClickSetName}>Set name</button>
      <button onClick={handleClickGetRating}>Get a rating</button>
    </div>
  );
}

export default Container1;
