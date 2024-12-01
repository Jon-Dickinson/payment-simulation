import React, { useState } from "react";

interface AuthProps {
  onAuthSuccess: (token: string) => void;
}

const AuthComponent: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);

      const randomToken = `auth-token-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
      
      setToken(randomToken);
      onAuthSuccess(randomToken);
      console.log(randomToken);
    }, 2000);
  };

  return (
    <div className="if-base-wrapper">
      {token && (
        <span className="token-display">
          Token: {token}
        </span>
      )}
      <button
        className="auth-button"
        onClick={handleLogin}
        disabled={isAuthenticating}
      >
        {isAuthenticating ? "Authenticating..." : "Login"}
      </button>
    </div>
  );
};

export default AuthComponent;
