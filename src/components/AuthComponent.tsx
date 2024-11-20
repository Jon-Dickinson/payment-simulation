import React, { useState } from "react";

interface AuthProps {
  onAuthSuccess: (token: string) => void;
}

const AuthComponent: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = async () => {
    setIsAuthenticating(true);
    // Simulating authentication
    setTimeout(() => {
      setIsAuthenticating(false);
      const token = "auth-token-123"; // Simulated token
      onAuthSuccess(token);
    }, 2000);
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={isAuthenticating}>
        {isAuthenticating ? "Authenticating..." : "Login"}
      </button>
    </div>
  );
};

export default AuthComponent;
