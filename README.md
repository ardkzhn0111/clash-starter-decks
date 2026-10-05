# Clash Starter

A four-page English-language Clash Royale guide for the Web Technologies 1 midterm. Built with semantic HTML, Bootstrap 5.3.3, custom CSS and a small vanilla JavaScript practice planner. No framework, backend or build step.

Live site: https://ardkzhn0111.github.io/clash-starter-decks/
Repository: https://github.com/ardkzhn0111/clash-starter-decks

## Pages and contributions

| Account | Pages and integration |
| --- | --- |
| ardkzhn0111 | Home (`index.html`) and Beginner Decks (`decks.html`), initial shared styling and assets |
| Zhanara77 | Card Guide (`cards.html`) and Practice (`practice.html`), practice planner (`js/practice.js`), page-specific styling and four-page navigation |

Work was developed with AI assistance. Both participants should review, understand and be able to explain their own code. Replace account labels with full student names in the eventual report. Existing commits are preserved; later work is committed under the contributing account.

## Run locally

Open `index.html` in a browser, or run `python -m http.server 8000` and visit http://localhost:8000. Images and Bootstrap are local. Google Fonts requires internet; fallback fonts work offline. Practice needs JavaScript for personalized plans and includes a static routine when JavaScript is unavailable.

## Code guide

- All four HTML pages share a header, footer and `css/style.css`.
- Bootstrap provides the grid, buttons, badges, table and form controls. Custom CSS sets the appearance, Flexbox layouts, card grids and responsive breakpoints.
- Home introduces the game and contains native HTML expandable FAQs.
- Beginner Decks includes two eight-card lists, tactics and a comparison table. Giant costs 28 / 8 = 3.5 elixir; Hog costs 21 / 8 = 2.625, shown as 2.6.
- Card Guide explains 14 unique cards and two simple combinations.
- Practice requires a deck, a goal and a duration. The script selects advice from small objects, creates three steps with `textContent`, displays the result and moves focus to its heading. Reset clears the result. Nothing is stored or sent to a server.

## Working together

Pull current `main` before making edits. Use your own Git identity. Add work in a feature branch when collaborating simultaneously, then open a pull request. Do not rewrite the other participant's history. Update the same main navigation on all four pages and keep only the current link marked `aria-current="page"`.

## Publication

GitHub Pages deploys `main` from `/ (root)`. Keep relative asset and page paths so the repository subdirectory works. `.nojekyll` enables plain static hosting.

## Verification

- All four pages checked at 375, 768 and 1280 px without horizontal overflow.
- Main navigation has the same four working links on every page; local links, anchors, IDs and tag nesting checked.
- Practice: empty submission blocked, all 18 deck/goal/duration combinations produce three stages with the correct total duration, regeneration replaces the previous plan, and reset clears both inputs and result.
- Images, keyboard focus and the native Home FAQ checked.

## Credits

- Clash Royale artwork © Supercell, provided through https://github.com/RoyaleAPI/cr-api-assets/tree/master/cards. Individual source filenames match `assets/cards/`. No ownership of game artwork is claimed.
- Fan Content Policy: https://supercell.com/en/fan-content-policy/
- Classic Hog deck reference: https://www.deckshop.pro/deck/detail/hog-rider,ice-golem,musketeer,cannon,skeletons,ice-spirit,fireball,the-log
- Inter and Barlow Condensed: https://fonts.google.com/ (SIL Open Font License).
- Bootstrap 5.3.3: https://getbootstrap.com/ (MIT notice retained in the local CSS).
- Original layout, guide text and implementation developed with AI assistance. These are learning decks, not claims about the current competitive meta.

## Still required for submission

The report is intentionally not created yet. After team review, prepare the shared English report with full names and contributions, topic choice, design rationale, readable screenshots of all four pages at 375/768/1280 px, a conclusion, and both repository and deployed-site links. Each participant must submit and defend the project according to the assignment rules.
