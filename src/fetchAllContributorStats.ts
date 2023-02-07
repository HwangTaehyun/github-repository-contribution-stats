import axios from 'axios';

/**
 * The Fetch All Contributor Stats Function.
 *
 * This function combines all the yearly `contributionsCollection` from the
 * github graphql APIs.
 *
 * @param {String} username The target github username for contribution stats.
 *
 * @return {*}
 */
export async function fetchAllContributorStats(username) {
  const {
    data: {
      data: {
        user: {
          id,
          name,
          contributionsCollection: { contributionYears },
        },
      },
    },
  } = await axios({
    url: 'https://api.github.com/graphql',
    method: 'POST',
    headers: {
      Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
    validateStatus: (status) => status == 200,
    data: {
      query: `query {
          user(login: "${username}") {
            id
            name
            contributionsCollection {
              contributionYears
            }
          }
        }`,
    },
  });
  return {
    id,
    name,
    repositoriesContributedTo: {
      nodes: Object.values(
        Object.fromEntries(
          (
            await Promise.all(
              (contributionYears as string[]).map((contributionYear) =>
                axios({
                  url: 'https://api.github.com/graphql',
                  method: 'POST',
                  headers: {
                    Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
                  },
                  validateStatus: (status) => status == 200,
                  data: {
                    query: `query {
                      user(login: ${JSON.stringify(username)}) {
                        contributionsCollection(from: "${contributionYear}-01-01T00:00:00Z") {
                          commitContributionsByRepository(maxRepositories: 100) {
                            repository {
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
                            }
                          }
                        }
                      }
                    }`,
                  },
                }),
              ),
            )
          ).flatMap(
            ({
              data: {
                data: {
                  user: {
                    contributionsCollection: { commitContributionsByRepository },
                  },
                },
              },
            }) =>
              commitContributionsByRepository.map(({ repository }) => [
                repository.nameWithOwner,
                repository,
              ]),
          ),
        ),
      ),
    },
  };
}
