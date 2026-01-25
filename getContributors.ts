import fetch from 'node-fetch';

// https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repository-contributors
export interface Contributor {
  login: string;
  contributions: number;
  avatar_url: string;
  type: string;
}

export async function getContributors(
  username: string,
  nameWithOwner: string,
  token: string,
): Promise<Contributor[]> {
  const page = 1;
  const url = `https://api.github.com/repos/${nameWithOwner}/contributors?page=${page}&per_page=100`;
  const response = await fetch(url, {
    headers: { Authorization: `token ${token}` },
  });
  console.log(response);

  if (!response.ok) return [];

  const contributors: Contributor[] = (await response.json()) as Contributor[];

  return contributors;
}
