import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Home_page: React.FC = () => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = async () => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      loginWithRedirect({
        authorizationParams: {
          prompt: 'login'
        }
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const jwtToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const res = await fetch("http://127.0.0.1:8000/v1/protected", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
     
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setApiData(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
      
      <button
        onClick={callApi}
        disabled={!isAuthenticated || loading || isLoading}
        className={`px-6 py-3 rounded-xl text-white font-medium transition mt-4 ${
          !isAuthenticated || loading || isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
      </button>
      
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