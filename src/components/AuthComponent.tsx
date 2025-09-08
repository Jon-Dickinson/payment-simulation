import React, { useState } from "react";

interface AuthProps {
  onAuthSuccess: (token: string) => void;
}

const AuthComponent: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // 👈 add this

  const handleLogin = async () => {
    setIsAuthenticating(true);
    setError(null);

    try {
      const response = await fetch("/api/auth", { method: "POST" });
      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        onAuthSuccess(data.token);
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Network error");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="if-base-wrapper">
      {token && <span className="token-display">Token: {token}</span>}
      {error && <p className="error-message">{error}</p>}
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
