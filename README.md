# Clash Starter

A small English-language Clash Royale guide for the Web Technologies 1 midterm. Built with semantic HTML, custom CSS and Bootstrap 5.3.3. No build step or JavaScript is required.

## Run

Open `index.html` in a browser, or run `python -m http.server 8000` from this folder and visit http://localhost:8000. Google Fonts requires an internet connection; fallback fonts work offline. Card images and Bootstrap are local.

## Current contribution

Beginner Decks is complete as the first page: two decks, eight cards each, game plans, comparison table and practice tips. It currently occupies `index.html` so the first deployment has a working entry page.

## Team plan

| Member | Pages |
| --- | --- |
| Member 1 (repository owner) | Beginner Decks (current), Home (later) |
| Member 2 | Card Guide, Practice (later) |

Replace member labels with real names before final submission. Every member must commit their own work using their own GitHub account. Keep work comparable and coordinate shared CSS changes.

When Home is ready, rename the current page to `decks.html` and use `index.html` for Home. Then add the same four-page navigation to every page. Keep the colors, fonts, container widths and footer consistent. Reuse `css/style.css`; scope page-specific additions with descriptive classes.

Practice should include a useful form: select a deck, practice goal and time, then generate a training plan in the browser. Do not pretend to send data to a server. The full project still needs four pages, that form, final integration and a team report. The report is deliberately deferred until both members finish.

## GitHub Pages

Use a public repository named `clash-starter-decks`. In Settings → Pages, select Deploy from a branch, `main`, and `/ (root)`. Use relative asset paths, as this site is served under a repository subdirectory.

## Design and code

Navy headings, blue actions, gold accents and purple elixir counters reference the game without copying a template. Barlow Condensed is used for headings and Inter for body text. The hero uses two tilted game cards, with all layout handled by CSS.

Bootstrap supplies the responsive row/column grid, button, badge and table foundations. Custom CSS supplies the card grid, Flexbox navigation, layout, colors and media queries. There is no dynamic data, backend, framework or installation step.

Deck costs: Giant = 28 / 8 = 3.5. Hog = 21 / 8 = 2.625, displayed as 2.6. Standard cards are used, with no evolutions. These are learning examples, not current-meta or win-rate claims.

## Credits

- Clash Royale artwork © Supercell; downloaded from https://github.com/RoyaleAPI/cr-api-assets/tree/master/cards (individual source filenames match `assets/cards/`). No ownership of game artwork is claimed.
- Fan Content Policy: https://supercell.com/en/fan-content-policy/
- Classic Hog composition: https://www.deckshop.pro/deck/detail/hog-rider,ice-golem,musketeer,cannon,skeletons,ice-spirit,fireball,the-log
- Fonts: Inter and Barlow Condensed via https://fonts.google.com/ (SIL Open Font License).
- Bootstrap 5.3.3: https://getbootstrap.com/ (MIT; license notice retained in the CSS).
- Original page layout and guide text created with AI assistance. Review and understand all code before the individual defense.

## Acceptance checklist

Check 375 px, 768 px and 1280 px: no horizontal overflow, readable table, no overlapping cards, all images loaded. Check anchor links, visible keyboard focus, one H1, descriptive alt text and live GitHub Pages asset paths. Do not claim the entire midterm is complete after this first page.
