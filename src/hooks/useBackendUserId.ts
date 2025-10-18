import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { v5 as uuidv5 } from "uuid";

// fixed namespace for deterministic UUID from Auth0 sub
const USER_NS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

export default function useBackendUserId() {
  const { user } = useAuth0();
  return useMemo(() => (user?.sub ? uuidv5(user.sub, USER_NS) : ""), [user]);
}
