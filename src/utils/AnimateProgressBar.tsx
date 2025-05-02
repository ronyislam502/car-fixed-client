import { useEffect, useState } from "react";

export const AnimatedProgress = ({ value }: { value: number }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative w-full h-3 bg-gray-200 rounded">
      <div
        className="h-full bg-green-500 rounded transition-all duration-700"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
