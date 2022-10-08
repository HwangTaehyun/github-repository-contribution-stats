<p align="center">
 <img width="100px" src="https://res.cloudinary.com/anuraghazra/image/upload/v1594908242/logo_ccswme.svg" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">GitHub Contributor Stats</h2>
 <p align="center">Get dynamically generated your github contributor stats on your READMEs!</p>
</p>

# Features

- [GitHub Contributor Stats Card](#github-contributor-stats-card)
- [Themes](#themes)

# GitHub Contributor Stats Card

Copy and paste this into your markdown content, and that's it. Simple!

My project, which is based on [github-readme-stats](https://github.com/anuraghazra/github-readme-stats), focuses on showing GitHub contributor stats and applies the typescript to the original project. Refer to [ISSUE#2027](https://github.com/anuraghazra/github-readme-stats/issues/2027). Thank you [@anuraghazra](https://github.com/anuraghazra) for the awesome open-source project!

Change the `?username=` value to your GitHub username.

```md
![Taehyun's GitHub Contributor stats](https://github-contributor-stats.vercel.app/api?username=HwangTaehyun)
```

### Demo

![Taehyun's GitHub Contributor stats](https://github-contributor-stats.vercel.app/api?username=HwangTaehyun&hide=B)

\_Note: Available ranks are S+ (over 10000), S (over 1000), A+ (over 500), A (over 100), B+ (over 50) and B (over 1).

### Hiding rank stats

To hide specific ranks, you can pass a query parameter `&hide=` with comma-separated rank values. If you need to add plus rank (ex. B+) to hide arrays , it is always safe to replace pluses with %2B

```md
![Taehyun's GitHub Contributor stats](https://github-contributor-stats.vercel.app/api?username=HwangTaehyun&hide=B,B%2B)
```

### Themes

With inbuilt themes, you can customize the look of the card without doing any [manual customization](#customization).

Use `&theme=THEME_NAME` parameter like so :-

```md
![Taehyun's GitHub Contributor stats](https://github-contributor-stats.vercel.app/api?username=HwangTaehyun&hide=B&theme=default)
```

#### All inbuilt themes:- in <a href="https://github.com/anuraghazra/github-readme-stats">github-readme-stats' themes</a>

dark, radical, merko, gruvbox, tokyonight, onedark, cobalt, synthwave, highcontrast, dracula

You can look at a preview for [all available themes](./themes/README.md) or checkout the [theme config file](./themes/index.js) & **you can also contribute new themes** if you like :D

> Note: The minimum of cache_seconds is currently 4 hours as a temporary fix for PATs exhaustion.

Contributions are welcome!

Made with :fire: and TypeScript.
