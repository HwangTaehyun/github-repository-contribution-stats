import { type Contributor } from 'getContributors';

export const calculateContributionRank = (
  name,
  contributors: Contributor[],
  numOfMyContributions: number,
) => {
  contributors = contributors.filter((contributor) => contributor.type === 'User');

  const numOfOverRankContributors = contributors.filter(
    (contributor) => contributor.contributions > numOfMyContributions,
  );
  const rankOfContribution =
    ((contributors.length - numOfOverRankContributors.length) / contributors.length) *
    100;

  const RANK_S_PLUS_VALUE = 90; // S+
  const RANK_S_VALUE = 80; // S
  const RANK_A_PLUS_VALUE = 70; // A+
  const RANK_A_VALUE = 60; // A
  const RANK_B_PLUS_VALUE = 50; // B+
  // const RANK_B_VALUE = 1; // B

  if (rankOfContribution >= RANK_S_PLUS_VALUE) return 'S+';
  if (rankOfContribution >= RANK_S_VALUE) return 'S';
  if (rankOfContribution >= RANK_A_PLUS_VALUE) return 'A+';
  if (rankOfContribution >= RANK_A_VALUE) return 'A';
  if (rankOfContribution >= RANK_B_PLUS_VALUE) return 'B+';
  return 'B';
};
