# MUFENG website

Static website for MUFENG PTE. LTD. using verified public company details from the ACRA Business Profile.

## Files

- `index.html` - full website markup and SEO metadata
- `styles.css` - responsive visual system
- `script.js` - navigation, planner, and enquiry interactions
- `assets/mufeng-workshop-hero.png` - generated hero image
- `assets/favicon.svg` - site icon
- `robots.txt` and `sitemap.xml` - search engine files for `mufengsg.com`

## Local preview

Open `index.html` directly in a browser, or run a static server from this folder:

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Domain notes

The site is static and can be deployed to Cloudflare Pages, Netlify, Vercel, GitHub Pages, or ordinary cPanel hosting.

For DNS in GoDaddy, the exact record values depend on the hosting provider:

- Cloudflare Pages, Netlify, or Vercel usually use `CNAME` records for `www` and either an apex `A`/`ALIAS`/provider-specific record for `@`.
- GitHub Pages uses `A` records for `@` and a `CNAME` record for `www`.
- cPanel or shared hosting usually gives an `A` record IP address for `@`.

Update `script.js` if the preferred enquiry address should be different from `hello@mufengsg.com`.
