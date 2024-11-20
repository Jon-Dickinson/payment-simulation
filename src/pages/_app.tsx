import { createContext, useState } from 'react';
import '../styles/globals.css';
import { AppProps } from 'next/app';

interface AuthContextType {
  authToken: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  status: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, setStatus, status }}>
      <div className="status-container">

        {status && <p className="status-message">{status}</p>}
      </div>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
