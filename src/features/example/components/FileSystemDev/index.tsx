import { ExampleState } from "../../slice";

type FileSystemDevProps = {
  fileSystem: ExampleState;
};

export function FileSystemDev({ fileSystem }: FileSystemDevProps) {
  return (
    <div>
      <div>type: {fileSystem.type}</div>
      <div>readyState: {fileSystem.readyState}</div>
    </div>
  );
}
