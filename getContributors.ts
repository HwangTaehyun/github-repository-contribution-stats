import _ from 'lodash';
import fetch from 'node-fetch';

interface Contributor {
  login: string;
  contributions: number;
  avatar_url: string;
}

export async function getContributors(
  username: string,
  nameWithOwner: string,
  token: string,
): Promise<Contributor[]> {
  const contributors: Contributor[] = [];
  let page = 1;
  while (true) {
    const url = `https://api.github.com/repos/${nameWithOwner}/contributors?page=${page}&per_page=100`;
    const response = await fetch(url, {
      headers: { Authorization: `token ${token}` },
    });

    if (!response.ok) break;

    const data: Contributor[] = await response.json();
    if (data.length === 0) break;

    contributors.push(...data);
    page++;
  }
  return contributors;
}
