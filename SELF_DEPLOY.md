# Deploy Your Own Instance

The shared instance at `github-contributor-stats.vercel.app` works fine,
but it uses one GitHub API token for everyone.

If too many people use it, you might hit GitHub rate limits. If that
happens or if you simply want your own endpoint, you can deploy your own
instance on Vercel easily.

The repository already includes everything Vercel needs, so the setup is
simple.

------------------------------------------------------------------------

## What You'll Need

-   A GitHub account
-   A Vercel account
-   A GitHub Personal Access Token. This allows the app to talk to GitHub's GraphQL API and fetch contribution data.

------------------------------------------------------------------------

## How It Works

This project is an Express server bundled into a single `index.js` file
using webpack.

Vercel runs it as a serverless function through `@vercel/node`.

There is no build step on Vercel because the bundle is already built and
committed in the repository.

The only thing you need to provide is an environment variable:

    GITHUB_PERSONAL_ACCESS_TOKEN

That token allows the server to request contribution data from GitHub's
API.

------------------------------------------------------------------------

## Getting Your GitHub Token

The app fetches contribution data from GitHub's GraphQL API, which
requires authentication.

Go to:

`GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)`

Create a new classic token.

Scopes:

-   `public_repo` for public repository stats
-   `repo` if you want stats from private repositories as well

Give it a recognizable name such as `contributor-stats-vercel` and save
the token somewhere safe.

GitHub only shows the token once.

------------------------------------------------------------------------

## Deploying

There are a few ways to deploy thishttps://github.com/wyMinLwin on Vercel. Use whichever you prefer.

------------------------------------------------------------------------

## Quickest Way

Fork the repository and click the deploy button below.

Vercel will ask for the environment variable during setup.

[![Deploy with
Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/HwangTaehyun/github-repository-contribution-stats&env=GITHUB_PERSONAL_ACCESS_TOKEN&envDescription=GitHub%20Personal%20Access%20Token%20with%20public_repo%20scope&repository-name=github-repository-contribution-stats)

------------------------------------------------------------------------

## Through the Vercel Dashboard

If you prefer to do it manually:

1.  Fork this repository to your GitHub account
2.  Go to `https://vercel.com/new`
3.  Import the forked repository

Project configuration:

-   Framework Preset: Other
-   Build Command: leave empty
-   Output Directory: leave default

After the first deployment, add your token under:

`Settings > Environment Variables`

  Name                             Value
  -------------------------------- --------------------
  `GITHUB_PERSONAL_ACCESS_TOKEN`   `ghp_xxxxxxxxxxxx`

Then redeploy so the variable takes effect.

------------------------------------------------------------------------

## Deploy Using the CLI

``` bash
npm i -g vercel
git clone https://github.com/<your-username>/github-contributor-stats.git
cd github-contributor-stats
vercel
```

The CLI will guide you through linking the project.

You can set the environment variable during the prompts or later in the
dashboard.

------------------------------------------------------------------------

## Verify It Works

After deployment, open this URL in your browser:

    <deployed_url>/api?username=<your-github-username>

If everything is working, you should see an SVG card with your
contribution stats.

If you see an error card instead, the token is usually missing or
misconfigured.


