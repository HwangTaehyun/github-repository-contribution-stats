import compression from 'compression';
import express from 'express';

import { renderContributorStatsCard } from '@/cards/stats-card';
import {
  clampValue,
  CONSTANTS,
  CustomError,
  parseArray,
  parseBoolean,
  renderError,
} from '@/common/utils';
import { fetchAllContributorStats } from '@/fetchAllContributorStats';
import { fetchContributorStats } from '@/fetchContributorStats';
import { isLocaleAvailable } from '@/translations';

// Initialize Express
const app = express();
app.use(compression());

// Create GET request
app.get('/api', async (req, res) => {
  const {
    username,
    hide,
    hide_title,
    hide_border,
    hide_contributor_rank,
    order_by,
    line_height,
    title_color,
    icon_color,
    text_color,
    bg_color,
    custom_title,
    border_radius,
    border_color,
    theme,
    cache_seconds,
    locale,
    combine_all_yearly_contributions,
    limit,
  } = req.query;
  res.set('Content-Type', 'image/svg+xml');

  if (locale && !isLocaleAvailable(locale)) {
    return res.send(renderError('Something went wrong', 'Language not found'));
  }

  try {
    const result = await (combine_all_yearly_contributions
      ? fetchAllContributorStats(username)
      : fetchContributorStats(username));

    if (result === undefined) {
      throw new Error('Failed to fetch contributor stats');
    }

    const name = result.name;
    const contributorStats = result.repositoriesContributedTo.nodes;

    const cacheSeconds = clampValue(
      parseInt((cache_seconds as string) || CONSTANTS.FOUR_HOURS, 10),
      CONSTANTS.FOUR_HOURS,
      CONSTANTS.ONE_DAY,
    );

    res.setHeader('Cache-Control', `public, max-age=${cacheSeconds}`);

    res.send(
      await renderContributorStatsCard(username, name, contributorStats, {
        hide: parseArray(hide),
        hide_title: parseBoolean(hide_title as string),
        hide_border: parseBoolean(hide_border as string),
        hide_contributor_rank: parseBoolean(hide_contributor_rank as string),
        order_by,
        line_height,
        title_color,
        icon_color,
        text_color,
        bg_color,
        custom_title,
        border_radius,
        border_color,
        theme,
        locale: locale ? (locale as string).toLowerCase() : null,
        limit,
      }),
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.send(
        renderError(
          err.message,
          err instanceof CustomError ? err.secondaryMessage : undefined,
        ),
      );
    }
  }
});

const port = 9999;

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
