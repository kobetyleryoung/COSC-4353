import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Home_page: React.FC = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const [apiData] = useState<any>(null);
  const [error] = useState<string | null>(null);


  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-5xl font-heading mb-6 text-brand">
        Welcome to COSC 4353
      </h1>

      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect({
            authorizationParams: {
              prompt: 'login'
            }
          })}
          className="px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-yellow-600 transition"
        >
          Login / Get Started
        </button>
      ) : (
        <button
          onClick={() => {
            localStorage.clear();
            logout({ 
              logoutParams: { 
                returnTo: window.location.origin,
                federated: true
              }
            });
          }}
          className="px-6 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      )}


      {error && <p className="text-red-500">{error}</p>}

      {apiData && (
        <div className="mt-4 text-left max-w-2xl">
          <h3 className="font-bold">API Response:</h3>
          <pre className="text-xs">{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Home_page;