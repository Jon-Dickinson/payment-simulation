import { createContext, useState } from 'react';
import '../app/globals.css';
import { AppProps } from 'next/app';

interface AuthContextType {
  authToken: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  setPaymentStatus: React.Dispatch<React.SetStateAction<string>>;
  paymentStatus: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, setPaymentStatus, paymentStatus }}>
      <div className="status-container">
        {paymentStatus && <p className="status-message">status {paymentStatus}</p>}
      </div>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
