/*
 * This file is part of the Github Contributor Stats.
 *
 * (c) TaehyunHwang <eeht1717@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import axios from 'axios';

import { ParsedQuery } from './common/types';

export type UserResponse<T> = {
  data: {
    user: T;
  };
};

/**
 * https://docs.github.com/en/graphql/reference/interfaces#repositoryinfo
 */
export interface Repository {
  owner: { id: string; avatarUrl: string };
  isInOrganization: boolean;
  url: string;
  homepageUrl: string | null;
  name: string;
  nameWithOwner: string;
  stargazerCount: number;
  openGraphImageUrl: string;
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      };
    };
  } | null;
}

/**
 * The Fetch Contributor Stats Function.
 *
 * This function holds the request for the github graphql APIs, which includes
 * recent commit contributions.
 *
 * @param {String} username The target github username for contribution stats.
 *
 * @return {*}
 */
const fetchContributorStats = async (username: ParsedQuery) => {
  try {
    const response = await axios.post<
      UserResponse<{
        id: string;
        name: string;
        repositoriesContributedTo: {
          totalCount: number;
          nodes: Repository[];
        };
      }>
    >(
      'https://api.github.com/graphql',
      {
        query: `query {
                  user(login: ${JSON.stringify(username)}) {
                    id
                    name
                    repositoriesContributedTo(first :100, contributionTypes: COMMIT) {
                      totalCount
                      nodes {
                        owner {
                          id
                          avatarUrl
                        }
                        isInOrganization
                        url
                        homepageUrl
                        name
                        nameWithOwner
                        stargazerCount
                        openGraphImageUrl
                        defaultBranchRef {
                          target {
                            ... on Commit {
                              history {
                                totalCount
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }`,
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        },
      },
    );

    if (response.status === 200) {
      return response.data.data.user;
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

export { fetchContributorStats };
