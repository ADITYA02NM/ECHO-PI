import { Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";

export const ConnectivityStatus = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch("http://192.168.4.1:8000/health", {
          method: "GET",
          signal: AbortSignal.timeout(3000),
        });
        setIsConnected(response.ok);
      } catch {
        setIsConnected(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {isConnected ? (
        <>
          <Wifi className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="h-5 w-5 text-primary/50" />
          <span className="text-sm font-medium text-muted-foreground">Offline</span>
        </>
      )}
    </div>
  );
};
