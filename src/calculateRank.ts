export const calculateRank = (stargazers) => {
  const RANK_S_PLUS_VALUE = 10000; // S+
  const RANK_S_VALUE = 1000; // S
  const RANK_A_PLUS_VALUE = 500; // A+
  const RANK_A_VALUE = 100; // A
  const RANK_B_PLUS_VALUE = 50; // B+
  const RANK_B_VALUE = 1; // B

  if (stargazers >= RANK_S_PLUS_VALUE) return 'S+';
  if (stargazers >= RANK_S_VALUE) return 'S';
  if (stargazers >= RANK_A_PLUS_VALUE) return 'A+';
  if (stargazers >= RANK_A_VALUE) return 'A';
  if (stargazers >= RANK_B_PLUS_VALUE) return 'B+';
  return 'B';
};
