import { ExampleState } from "../../slice";

type ExampleProps = {
  exampleState: ExampleState;
};

export function Example({ exampleState }: ExampleProps) {
  return (
    <div>
      <div>Name: {exampleState.name}</div>
      <div>Rating: {exampleState.rating}</div>
      {exampleState.isRatingFetching && "Fetching rating..."}
    </div>
  );
}
