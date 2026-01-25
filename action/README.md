# GitHub Contributor Stats Action

A GitHub Action to generate contributor stats SVG files with rate limit awareness. This action is designed to handle users with extensive contribution history (hundreds of repositories) without hitting API rate limits or timeouts.

## Why Use This Action?

The Vercel-hosted API has a timeout limit that can be exceeded when:
- `combine_all_yearly_contributions=true` (fetches contributions across all years)
- `hide_contributor_rank=false` (requires fetching contributor data for each repository)

For users like [@Atry](https://github.com/Atry) with 15+ years of contribution history across 300+ repositories, this combination triggers hundreds of API calls that exceed Vercel's timeout.

This Action runs in GitHub Actions with no timeout constraints and includes built-in rate limiting to avoid hitting GitHub API limits.

## Usage

```yaml
name: Update GitHub Contributor Stats

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:

jobs:
  update-stats:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4

      - name: Generate GitHub Contributor Stats SVG
        uses: HwangTaehyun/github-contributor-stats/action@main
        env:
          GITHUB_PERSONAL_ACCESS_TOKEN: ${{ secrets.GITHUB_PERSONAL_ACCESS_TOKEN }}
        with:
          username: YOUR_USERNAME
          output-file: github-contributor-stats.svg
          combine-all-yearly-contributions: 'true'
          hide-contributor-rank: 'false'

      - uses: actions4git/add-commit-push@v1
        continue-on-error: true
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_PERSONAL_ACCESS_TOKEN` | GitHub Personal Access Token for API access | No |

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `username` | GitHub username to generate stats for | Yes | - |
| `output-file` | Output SVG file path | No | `github-contributor-stats.svg` |
| `combine-all-yearly-contributions` | Combine contributions from all years | No | `true` |
| `hide-contributor-rank` | Hide contributor rank (faster if true) | No | `true` |
| `hide` | Comma-separated ranks to hide (e.g., "B,B+") | No | - |
| `order-by` | Order by "stars" or "contributions" | No | `stars` |
| `limit` | Max repositories to show (-1 for all) | No | `-1` |
| `theme` | Theme name | No | `default` |
| `title-color` | Custom title color (hex) | No | - |
| `text-color` | Custom text color (hex) | No | - |
| `icon-color` | Custom icon color (hex) | No | - |
| `bg-color` | Custom background color (hex) | No | - |
| `border-color` | Custom border color (hex) | No | - |
| `border-radius` | Border radius in pixels | No | - |
| `hide-title` | Hide the title | No | `false` |
| `hide-border` | Hide the border | No | `false` |
| `custom-title` | Custom title text | No | - |
| `locale` | Locale for translations | No | - |

## Outputs

| Output | Description |
|--------|-------------|
| `svg-path` | Path to the generated SVG file |


## Building from Source

```bash
npm install
npm run build:action
```

The built action will be in `action/dist/`.
