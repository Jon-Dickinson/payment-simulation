import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import AuthComponent from "./AuthComponent";

export default function MainComponent() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const handleAuthSuccess = (token: string) => {
    setAuthToken(token);
  };

  const handleLogout = () => {
    setAuthToken(null);
  };

  return (
   
    <div className="if-base-wrapper">
      {!authToken ? (
        <AuthComponent onAuthSuccess={handleAuthSuccess} />
      ) : (
        <>
          <div className="horizontal-inline-flex justify--space-between align--center">
            <p>{authToken}</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
          <PaymentForm setPaymentStatus={() => {}} />
        </>
      )}
    </div>

  );
}
