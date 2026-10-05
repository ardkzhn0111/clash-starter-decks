# Clash Starter

A small English-language Clash Royale guide for the Web Technologies 1 midterm. Built with semantic HTML, custom CSS and Bootstrap 5.3.3. No build step or JavaScript is required.

## Run

Open `index.html` in a browser, or run `python -m http.server 8000` from this folder and visit http://localhost:8000. Google Fonts requires an internet connection; fallback fonts work offline. Card images and Bootstrap are local.

## Current contribution

The repository owner has completed two pages:

- `index.html`: Home, with game basics, a learning path, deck previews and expandable FAQs.
- `decks.html`: Beginner Decks, with two full deck lists, game plans, comparison table and practice tips.

Both pages share working navigation, the same footer and `css/style.css`.

## Team plan

| Member | Pages |
| --- | --- |
| Member 1 (repository owner) | Home and Beginner Decks (complete) |
| Member 2 | Card Guide, Practice (later) |

Replace member labels with real names before final submission. Every member must commit their own work using their own GitHub account. Keep work comparable and coordinate shared CSS changes.

The teammate should add `cards.html` (Card Guide) and `practice.html` (Practice). Once those files are ready, add their links to the main navigation on ALL four pages; keep `aria-current="page"` and the `active` class only on the current page. Do not add links before their pages exist. Copy the header and footer from an existing page. Reuse `css/style.css`, keep its shared rules stable, and scope new styles with page-specific classes. Use relative paths so GitHub Pages works.

Practice should include a useful form: select a deck, practice goal and time, then generate a training plan in the browser. Do not pretend to send data to a server. The full project still needs the teammate's two pages, that form, final integration and a team report. The report is deliberately deferred until both members finish.

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

Check 375 px, 768 px and 1280 px: no horizontal overflow, readable table, no overlapping cards, all images loaded. Check anchor links, visible keyboard focus, one H1, descriptive alt text and live GitHub Pages asset paths. The two owner pages are complete; the full midterm is not complete until both teammate pages and the report are added.


## Handoff to teammate

Repository: https://github.com/ardkzhn0111/clash-starter-decks

1. Clone the repository, then create your own branch: `git switch -c teammate-pages`.
2. Build `cards.html` and `practice.html` completely, using the shared style. Card Guide can explain card roles and combinations; Practice must include the useful form described above.
3. Use Bootstrap grid/components on your own pages and customize them. Check 375, 768 and 1280 px without horizontal scrolling.
4. Update all four navigation menus once both pages exist. Keep the existing deck links and section IDs working.
5. Commit with your own Git identity, push your branch and open a pull request. Direct push requires the owner to add your GitHub account as a collaborator; otherwise fork the repository and open a pull request from your fork.
6. After merging, verify all four pages on GitHub Pages. Prepare the shared English report only after integration.

Do not rewrite Git history or attribute someone else's work to yourself. No package install is needed. The current project has no report and no backend.
