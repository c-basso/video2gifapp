# Make Video to GIF — App Store listing snapshot

Source: https://apps.apple.com/us/app/make-video-to-gif/id6762465120 (US storefront, read in the
browser) and the iTunes Lookup API. Captured 2026-10-21. Icon and screenshots in `img/` were
downloaded from this listing (originals: 1024px icon, 920px-wide screenshots).

This file is the single source of truth for on-site copy about the app. Keep claims on the
website (build/en.json, build/guides/*.json, llms.txt section in build/build.js) consistent with
what is listed here.

## Identity

| Field | Value |
|---|---|
| App name (title) | Make Video to GIF |
| Subtitle | Turn clips into loops |
| App Store ID | 6762465120 |
| Bundle ID | ru.ivakhnenko.video2gif |
| Seller / developer | Vladimir Ivakhnenko |
| Developer page | https://apps.apple.com/us/developer/vladimir-ivakhnenko/id1239180595 |
| Website | https://video2gifapp.com (listing still links https://c-basso.xyz) |
| Primary category | Photo & Video |
| Secondary category | Productivity |
| Price | Free (in-app purchases: "Video to GIF Converter" $4.99 and $19.99; subscription "Convert videos to GIFs with no limits" with a free trial) |
| Age rating | 4+ |
| Devices | "Only for iPhone" badge; requires iOS 18.6 or later. The description says iPhone and iPad. |
| Size | 28.6 MB (28,569,600 bytes) |
| First released | 2026-04-27 (1.0) |
| Current version | 1.2.0 (2026-10-11, "improvements for video to GIF conversion, small UI improvements and some bugs fixes") |
| Rating | 1.0 out of 5 (1 rating) — not shown on the site (`SOFTWARE_APPLICATION_AGGREGATE_RATING = null`) |

## Languages (31)

English, Croatian, Czech, Danish, Dutch, Filipino, Finnish, French, German, Greek, Hebrew,
Hungarian, Indonesian, Italian, Japanese, Korean, Malay, Norwegian Bokmål, Polish, Portuguese,
Romanian, Russian, Simplified Chinese, Slovak, Spanish, Swedish, Thai, Traditional Chinese,
Turkish, Ukrainian, Vietnamese.

## Features (from the description)

- Import from the library, or send one movie from Photos, Files or another app via the Share extension.
- Trim the timeline to the exact moment.
- Crop with aspect presets.
- Frames per second.
- Loop count, including infinite loop.
- Encoder modes: file size versus palette detail.
- Estimated file size ("Estimated file size: 4,8 MB" on screenshot 2); progress with cancel during export.
- Encoding on the device; export through the iOS share sheet (Messages, Mail, AirDrop, Save to Photos, other apps).
- Reopen projects to tweak settings and export again.

## Screenshots (App Store order → img/screenshots/N.webp, 460×995)

| # | Banner on the screenshot | What the screen shows |
|---|---|---|
| 1 | VIDEO TO GIF · ★★★★★ Loved by users | Woman holding a video-play icon and a GIF icon with an arrow between them |
| 2 | MAKE GIF FROM VIDEO | Cat video preview, "0:13 · 935 KB", Edit Video / Original, GIF settings, Convert to GIF, "Estimated file size: 4,8 MB" |
| 3 | TRIM TO THE EXACT MOMENT | Frame strip with pink trim handles, 0:08 duration, 0:05 – 0:13 range, Save |
| 4 | TURN VIDEO TO GIF FASTER | "Creating GIF..." ring at 34%, Cancel |

UI labels seen: Edit Video, Original, GIF settings, Convert to GIF, Save, Creating GIF..., Cancel.
Note: screenshot 1 says "Loved by users" with five stars while the listing has one 1.0 rating;
the site does not repeat that claim.

## Privacy label (developer-reported)

Data Not Linked to You: purchase history, user ID, device ID, crash data and other diagnostics
(Analytics, App Functionality, Other Purposes). Photos and videos are not listed.

## Links

- Terms of Use: https://c-basso.xyz/terms.html (site copy: https://video2gifapp.com/terms.html)
- Privacy Policy: https://c-basso.xyz/privacy.html (site copy: https://video2gifapp.com/privacy.html)

## Keyword research (en, 2026-10-21)

Source: Google Trends, worldwide, past 12 months, all terms normalized against
"make gif iphone" = 1. Relative interest only, no absolute monthly volume.

| Keyword | × "make gif iphone" | Trend | Notes |
|---|---|---|---|
| video to gif | ~27 | roughly doubled over the year | browser tools own the SERP (Adobe Express, Ezgif, GIPHY) |
| how to make a gif | ~12 | growing | mixed devices |
| gif from video | ~12 | growing | tool intent |
| compress gif | ~1.5 | stable | mostly web compressors |
| gif for discord | ~1.2 | stable | part of it is finding GIFs, not making them |
| make gif iphone | 1 | stable | core iPhone cluster → homepage + main guide |
| video to gif iphone | ~0.9 | stable | same cluster |
| live photo to gif | ~0.6 | stable | |
| gif maker app | ~0.6 | stable | |
| reduce gif size | ~0.6 | stable | |
| gif shortcut | ~0.5 | stable | people looking for the built-in Shortcuts route |
| gif not working iphone | ~0.3 | rising since April 2026 | fix guide, low competition |
| make gif smaller | ~0.25 | stable | |
| best gif maker app | ~0.2 | appeared April 2026 | comparison page |
| screen recording to gif | ~0.1 | sparse data | section inside bigger guides |

Product decision: no online converter on the site (it would satisfy the search without an
install). Head terms ("video to gif", "gif from video", "compress gif") are therefore not
targeted directly; the site targets iPhone-specific queries where the app is the answer.

### Guide plan (priority order)

1. `make-a-gif-from-a-video-on-iphone` — make gif iphone, video to gif iphone (published)
2. reduce / compress GIF size on iPhone
3. GIF for Discord from iPhone (size limits)
4. GIF not working / not moving on iPhone (fix guide)
5. best GIF maker app for iPhone (honest comparison incl. Shortcuts and GIPHY)
6. Live Photo to GIF
7. screen recording to GIF (bug reports, Slack, GitHub README)
8. make a GIF loop forever / play once

### ASO suggestions (App Store side)

- Get real ratings first: ask for a review after a successful export (SKStoreReviewController).
  A 1.0 rating undercuts every visit the site sends to the listing.
- Point the listing's website, privacy and terms links to video2gifapp.com.
- Add campaign tokens (`ct=` / `pt=`) to App Store links per page to see which guides install.

### Next steps

- After 4–8 weeks run `npm run gsc` and compare `gsc/query-page.csv` against these tables;
  rewrite titles of guides with impressions but low CTR, add guides for new queries.
