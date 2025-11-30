// src/components/api/VolunteerMatching.ts
import { v4 as uuidv4 } from "uuid";
import { apiFetch } from '../../utils/apiClient';

// Toggle mock mode with Vite env var (add VITE_USE_MOCK=true in .env.local or run with it in your shell)
const USE_MOCK = (import.meta as any)?.env?.VITE_USE_MOCK === "true";




// --- Types (mirror backend schema) ---
export interface Location {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
}

export interface EventWindow {
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
}

export interface OpportunityResponse {
  id: string; // UUID
  event_id: string;
  title: string;
  description?: string | null;
  required_skills: string[];
  min_hours?: number | null;
  max_slots?: number | null;
}

export interface MatchScoreResponse {
  total_score: number;
  skill_match_score: number;
  availability_score: number;
  preference_score: number;
  distance_score: number;
}

export interface OpportunityMatch {
  opportunity: OpportunityResponse;
  score: MatchScoreResponse;
}

export interface VolunteerMatch {
  profile: Record<string, any>;
  score: MatchScoreResponse;
}

export interface MatchingOpportunitiesResponse {
  matches: OpportunityMatch[];
  total: number;
}

export interface MatchingVolunteersResponse {
  matches: VolunteerMatch[];
  total: number;
}

export interface MatchRequestResponse {
  id: string;
  user_id: string;
  opportunity_id: string;
  requested_at: string;
  status: string;
  score?: number | null;
}

// ---------------- MOCK DATA SECTION ----------------
// Static data to test the volunteer matching UI without a backend.
// Keep shapes aligned to the interfaces above.
const MOCK_OPPORTUNITIES: OpportunityResponse[] = [
  {
    id: "9d1f7b9e-1111-4e3b-9d5b-001122334455",
    event_id: "e1a2b3c4-aaaa-4bbb-8ccc-101010101010",
    title: "Food Bank Sorting",
    description: "Help sort and package food donations for local families.",
    required_skills: ["organization", "lifting", "teamwork"],
    min_hours: 2,
    max_slots: 12,
  },
  {
    id: "e2c3d4f5-2222-4e5f-8a6b-556677889900",
    event_id: "f2e3d4c5-bbbb-4ccc-9ddd-202020202020",
    title: "Community Clean-Up",
    description: "Join a neighborhood clean-up and beautification project.",
    required_skills: ["outdoors", "trash pick-up", "teamwork"],
    min_hours: 3,
    max_slots: 25,
  },
  {
    id: "a3b4c5d6-3333-4f6a-9b7c-aabbccddeeff",
    event_id: "a1b2c3d4-cccc-4ddd-8eee-303030303030",
    title: "Coding Mentorship",
    description: "Mentor high school students learning basic web dev.",
    required_skills: ["javascript", "html", "css", "mentoring"],
    min_hours: 1,
    max_slots: 6,
  },
];

type MockVolunteer = {
  id: string;
  name: string;
  skills: string[];
  availabilityHoursPerWeek: number;
  preferredActivities?: string[];
  distanceMiles?: number;
};

const MOCK_VOLUNTEERS: MockVolunteer[] = [
  {
    id: "u-1000",
    name: "Alex Rivera",
    skills: ["organization", "teamwork", "lifting"],
    availabilityHoursPerWeek: 4,
    preferredActivities: ["community", "food"],
    distanceMiles: 5,
  },
  {
    id: "u-2000",
    name: "Jamie Chen",
    skills: ["javascript", "html", "css", "mentoring"],
    availabilityHoursPerWeek: 6,
    preferredActivities: ["education", "mentorship"],
    distanceMiles: 8,
  },
  {
    id: "u-3000",
    name: "Sam Patel",
    skills: ["outdoors", "teamwork", "first aid"],
    availabilityHoursPerWeek: 2,
    preferredActivities: ["clean-up"],
    distanceMiles: 12,
  },
];

function intersectCount(a: string[], b: string[]): number {
  const setB = new Set(b.map((s) => s.toLowerCase()));
  return a.reduce((acc, s) => (setB.has(s.toLowerCase()) ? acc + 1 : acc), 0);
}

function scoreForOpportunityAgainstVolunteer(opp: OpportunityResponse, vol: MockVolunteer): MatchScoreResponse {
  const req = opp.required_skills ?? [];
  const skillsMatched = intersectCount(req, vol.skills);
  const skillScore = req.length ? skillsMatched / req.length : 0.5;

  // Toy heuristics for demo purposes
  const availabilityScore = Math.min(1, vol.availabilityHoursPerWeek / Math.max(1, opp.min_hours ?? 1));
  const preferenceScore = opp.title.toLowerCase().includes("coding")
    ? (vol.preferredActivities?.includes("mentorship") ? 1 : 0.6)
    : opp.title.toLowerCase().includes("food")
    ? (vol.preferredActivities?.includes("food") ? 1 : 0.7)
    : opp.title.toLowerCase().includes("clean")
    ? (vol.preferredActivities?.includes("clean-up") ? 1 : 0.6)
    : 0.6;
  const distanceScore = vol.distanceMiles != null ? Math.max(0, 1 - Math.min(30, vol.distanceMiles) / 30) : 0.7;

  const total = 0.5 * skillScore + 0.2 * availabilityScore + 0.2 * preferenceScore + 0.1 * distanceScore;
  return {
    total_score: Number(total.toFixed(3)),
    skill_match_score: Number(skillScore.toFixed(3)),
    availability_score: Number(availabilityScore.toFixed(3)),
    preference_score: Number(preferenceScore.toFixed(3)),
    distance_score: Number(distanceScore.toFixed(3)),
  };
}

function scoreForVolunteerAgainstOpportunity(vol: MockVolunteer, opp: OpportunityResponse): MatchScoreResponse {
  // Symmetric wrapper for clarity (uses same scoring)
  return scoreForOpportunityAgainstVolunteer(opp, vol);
}

function mockFindMatchingOpportunities(/* userId: string, minScore = 0.5 */): MatchingOpportunitiesResponse {
  // In mock mode we don't have real user profiles; pretend the user looks like Alex
  const alex = MOCK_VOLUNTEERS[0];
  const matches = MOCK_OPPORTUNITIES
    .map((opp) => ({
      opportunity: opp,
      score: scoreForOpportunityAgainstVolunteer(opp, alex),
    }))
    .sort((a, b) => b.score.total_score - a.score.total_score);
  return { matches, total: matches.length };
}

function mockFindMatchingVolunteers(opportunityId: string, minScore = 0.5): MatchingVolunteersResponse {
  const opp = MOCK_OPPORTUNITIES.find((o) => o.id === opportunityId);
  if (!opp) {
    return { matches: [], total: 0 };
  }
  const raw = MOCK_VOLUNTEERS.map((v) => ({ profile: v as unknown as Record<string, any>, score: scoreForVolunteerAgainstOpportunity(v, opp) }));
  const filtered = raw.filter((m) => m.score.total_score >= minScore).sort((a, b) => b.score.total_score - a.score.total_score);
  return { matches: filtered, total: filtered.length };
}

function mockCreateMatchRequest(opportunityId: string): MatchRequestResponse {
  return {
    id: uuidv4(),
    user_id: "mock-user",
    opportunity_id: opportunityId,
    requested_at: new Date().toISOString(),
    status: "requested",
    score: null,
  };
}

//CHECK ROUTES/ API URL's MAKE SURE THEY MATCH SCHEMA IN BACKEND.
// --- API calls ---
export async function fetchOpportunities(): Promise<OpportunityResponse[]> {
  if (USE_MOCK) {
    // Simulate network delay for realism
    await new Promise((r) => setTimeout(r, 200));
    return [...MOCK_OPPORTUNITIES];
  }
  return apiFetch<OpportunityResponse[]>('/api/v1/volunteer-matching/opportunities');
}

export async function fetchOpportunityById(opportunityId: string): Promise<OpportunityResponse> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 150));
    const found = MOCK_OPPORTUNITIES.find((o) => o.id === opportunityId);
    if (!found) throw new Error("Opportunity not found (mock)");
    return found;
  }
  return apiFetch<OpportunityResponse>(`/api/v1/volunteer-matching/opportunities/${opportunityId}`);
}

/**
 * Find opportunities matching the current user (backend route: /find-opportunities/{user_id})
 * @param userId - UUID string
 */
export async function findMatchingOpportunities(userId: string, minScore = 0.5): Promise<MatchingOpportunitiesResponse> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 250));
    const mock = mockFindMatchingOpportunities();
    // Apply minScore client-side in mock mode for consistency
    const filtered = mock.matches.filter((m) => m.score.total_score >= minScore);
    return { matches: filtered, total: filtered.length };
  }
  // Backend route intended: /find-opportunities/{user_id}
  try {
    return await apiFetch<MatchingOpportunitiesResponse>(`/api/v1/volunteer-matching/find-opportunities/${encodeURIComponent(userId)}?min_score=${minScore}`);
  } catch (error: any) {
    // Graceful fallback: if user profile not found or 404, return mock data
    if (error.message.includes('404') || /profile not found/i.test(error.message)) {
      const mock = mockFindMatchingOpportunities();
      const filtered = mock.matches.filter((m) => m.score.total_score >= minScore);
      return { matches: filtered, total: filtered.length };
    }
    throw error;
  }
}

/**
 * Find volunteers matching an opportunity (backend route: /find-volunteers/{opportunity_id})
 */
export async function findMatchingVolunteers(opportunityId: string, minScore = 0.5): Promise<MatchingVolunteersResponse> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 250));
    return mockFindMatchingVolunteers(opportunityId, minScore);
  }
  return apiFetch<MatchingVolunteersResponse>(`/api/v1/volunteer-matching/find-volunteers/${opportunityId}?min_score=${minScore}`);
}

/**
 * Create a match request (apply) for current user to opportunity.
 * Backend route: POST /match-requests?user_id={userId} with body { opportunity_id: UUID }
 */
export async function createMatchRequest(userId: string, opportunityId: string): Promise<MatchRequestResponse> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 200));
    return mockCreateMatchRequest(opportunityId);
  }
  
  console.log('Creating match request with userId:', userId, 'opportunityId:', opportunityId);
  
  return apiFetch<MatchRequestResponse>(`/api/v1/volunteer-matching/match-requests?user_id=${encodeURIComponent(userId)}`, {
    method: "POST",
    body: JSON.stringify({ opportunity_id: opportunityId }),
  });
}
