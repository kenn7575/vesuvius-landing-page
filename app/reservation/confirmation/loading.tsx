import { Loader } from "lucide-react";

export default function Loading(): JSX.Element {
  return (
    <div className="flex justify-center items-center h-96">
      <Loader className="animate-spin" />
    </div>
  );
}
