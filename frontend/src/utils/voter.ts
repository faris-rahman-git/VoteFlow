const VOTER_KEY = "voter_id";

const generateVoterId = (): string => {
  return crypto.randomUUID();
};

const setVoterId = (id: string) => {
  localStorage.setItem(VOTER_KEY, id);
};

// Get voter id (auto-create if missing)
export const getVoterId = (): string => {
  let voterId = localStorage.getItem(VOTER_KEY);

  if (!voterId) {
    voterId = generateVoterId();
    setVoterId(voterId);
  }

  return voterId;
};
