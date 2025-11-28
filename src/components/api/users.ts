const API_URL = "http://localhost:8000/api/v1";

export interface UserCreateRequest {
  email: string;
  display_name: string;
  auth0_sub: string;
}

export interface UserResponse {
  id: string;
  email: string;
  display_name: string;
  auth0_sub: string | null;
}

export async function createOrGetUser(userData: UserCreateRequest): Promise<UserResponse> {
  const res = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  
  if (!res.ok) {
    throw new Error("Failed to create/get user");
  }
  
  return res.json();
}