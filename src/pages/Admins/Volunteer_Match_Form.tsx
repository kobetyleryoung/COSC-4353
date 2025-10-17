// src/components/VolunteerMatchPanel.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth0"; // adjust import path if needed
import {
  fetchOpportunities,
  findMatchingOpportunities,
  createMatchRequest,
  type OpportunityResponse,
  type MatchingOpportunitiesResponse,
} from "../../components/api/Volunteer_Matching";

const VolunteerMatchPanel: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const userId = user?.userId ?? null;

  const [allOpportunities, setAllOpportunities] = useState<OpportunityResponse[]>([]);
  const [matchedOpportunities, setMatchedOpportunities] = useState<MatchingOpportunitiesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applyInProgress, setApplyInProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // load all opportunities for browsing
    (async () => {
      setError(null);
      try {
        const ops = await fetchOpportunities();
        setAllOpportunities(ops);
      } catch (err: any) {
        setError(err.message || "Could not load opportunities.");
      }
    })();
  }, []);

  useEffect(() => {
    if (!userId) {
      setMatchedOpportunities(null);
      return;
    }

    const loadMatches = async () => {
      setLoading(true);
      setError(null);
      try {
        const matches = await findMatchingOpportunities(userId);
        setMatchedOpportunities(matches);
      } catch (err: any) {
        setError(err.message || "Failed to find matches.");
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [userId]);

  const handleApply = async (opportunityId: string) => {
    setApplyInProgress(prev => ({ ...prev, [opportunityId]: true }));
    setError(null);
    try {
      await createMatchRequest(opportunityId);
      // refresh matches / opportunities if needed:
      if (userId) {
        const matches = await findMatchingOpportunities(userId);
        setMatchedOpportunities(matches);
      }
    } catch (err: any) {
      setError(err.message || "Failed to apply.");
    } finally {
      setApplyInProgress(prev => ({ ...prev, [opportunityId]: false }));
    }
  };

  if (isLoading) {
    return <div>Checking auth...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to see volunteer matches.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Volunteer Matching</h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <section className="mb-6">
        <h3 className="font-semibold mb-2">Recommended Opportunities for you</h3>
        {loading ? (
          <p>Loading matched opportunities...</p>
        ) : matchedOpportunities && matchedOpportunities.matches.length > 0 ? (
          <ul className="space-y-3">
            {matchedOpportunities.matches.map((m) => (
              <li key={m.opportunity.id} className="p-3 border rounded flex justify-between items-start">
                <div>
                  <div className="text-lg font-semibold">{m.opportunity.title}</div>
                  <div className="text-sm text-gray-600">{m.opportunity.description}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Required: {m.opportunity.required_skills.join(", ") || "—"}
                  </div>
                  <div className="text-xs text-gray-700 mt-1">Score: {m.score.total_score.toFixed(2)}</div>
                </div>
                <div>
                  <button
                    onClick={() => handleApply(m.opportunity.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                    disabled={applyInProgress[m.opportunity.id]}
                  >
                    {applyInProgress[m.opportunity.id] ? "Applying…" : "Apply"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No recommended opportunities found.</p>
        )}
      </section>

      <section>
        <h3 className="font-semibold mb-2">Browse All Opportunities</h3>
        {allOpportunities.length === 0 ? (
          <p className="text-sm text-gray-500">No opportunities available.</p>
        ) : (
          <ul className="space-y-3">
            {allOpportunities.map((opp) => (
              <li key={opp.id} className="p-3 border rounded flex justify-between items-start">
                <div>
                  <div className="text-lg font-semibold">{opp.title}</div>
                  <div className="text-sm text-gray-600">{opp.description}</div>
                  <div className="text-xs text-gray-500 mt-1">Required: {opp.required_skills.join(", ") || "—"}</div>
                </div>
                <div>
                  <button
                    onClick={() => handleApply(opp.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
                    disabled={applyInProgress[opp.id]}
                  >
                    {applyInProgress[opp.id] ? "Applying…" : "Apply"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default VolunteerMatchPanel;
