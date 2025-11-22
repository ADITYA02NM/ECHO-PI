import { Wifi } from "lucide-react";

export const ConnectivityStatus = () => {
  return (
    <div className="flex items-center gap-2">
      <Wifi className="h-5 w-5 text-primary" />
      <span className="text-sm font-medium text-primary">Connected</span>
    </div>
  );
};
