# Clash Starter

A four-page English-language Clash Royale guide for the Web Technologies 1 Endterm. Built with semantic HTML, Bootstrap 5.3.3, custom CSS, vanilla JavaScript and local jQuery effects. No framework, backend or build step.

Live site: https://ardkzhn0111.github.io/clash-starter-decks/
Repository: https://github.com/ardkzhn0111/clash-starter-decks

## Pages and contributions

| Account | Student | Pages and integration |
| --- | --- | --- |
| ardkzhn0111 | Ardak Kazykhan | Home and Beginner Decks, shared theme and saved-card foundation |
| Zhanara77 | Zhanar Adilkhan | Card Guide and Practice, quiz answer review and journal improvements |

Work was developed with AI assistance. Both participants should review, understand and be able to explain their own code. The Final report records the student names and individual contributions.

## Run locally

Open `index.html` in a browser, or run `python -m http.server 8000` and visit http://localhost:8000. Images and Bootstrap are local. Google Fonts requires internet; fallback fonts work offline. Practice needs JavaScript for personalized plans and includes a static routine when JavaScript is unavailable.

## Code guide

- All four HTML pages share a header, footer and `css/style.css`.
- Bootstrap provides the grid, buttons, badges, table and form controls. Custom CSS sets the appearance, Flexbox layouts, card grids and responsive breakpoints.
- Home introduces the game and contains a keyboard-accessible FAQ accordion with jQuery slide effects.
- Home includes a client-side learning brief with field-by-field validation. The brief stays in the browser; it is not sent to a server.
- Beginner Decks adds a searchable, role-filtered card catalog rendered from 14 card objects, with live result counts and average elixir cost.
- Beginner Decks includes two eight-card lists, tactics and a comparison table. Giant costs 28 / 8 = 3.5 elixir; Hog costs 21 / 8 = 2.625, shown as 2.6.
- Card Guide renders 14 unique cards from JavaScript data, supports search and role filtering, calculates result counts and average elixir cost, and includes a five-question quiz with per-answer highlighting, correct answers and explanations.
- Practice requires a deck, a goal and a duration. Its planner builds three timed steps and moves focus to the result. The journal validates entries, calculates session totals, win rate and the most practiced focus, and stores valid records in browser `localStorage`.

## Final release upgrades

- A light and dark theme switch appears on every page and remembers the visitor's choice.
- Dark mode uses consistent dark surfaces and readable text for the hero, deck panels and card tiles, practice notes, tables and footer.
- Visitors can save cards in the Card Guide, see them on Beginner Decks, remove individual cards or clear the collection.
- Submitted quiz answers are highlighted; each question displays the correct choice and its explanation.
- The Practice journal rejects invalid calendar dates and shows the most frequently practiced focus.

## Working together

Pull current `main` before making edits. Use your own Git identity. Add work in a feature branch when collaborating simultaneously, then open a pull request. Do not rewrite the other participant's history. Update the same main navigation on all four pages and keep only the current link marked `aria-current="page"`.

## Publication

GitHub Pages deploys `main` from `/ (root)`. Keep relative asset and page paths so the repository subdirectory works. `.nojekyll` enables plain static hosting.

## Verification

- No horizontal overflow at 375, 768 or 1280 px in light and dark themes.
- Main navigation has the same four working links on every page; local links, anchors, IDs and tag nesting checked.
- Practice: empty submission blocked, all 18 deck/goal/duration combinations produce three stages with the correct total duration, regeneration replaces the previous plan, and reset clears both inputs and result.
- Card Guide: all 14 cards render, search and role filtering update results, the empty state appears, and the quiz validates unanswered questions and scores completed answers.
- Practice journal: required fields, future dates, duration range and note length are validated; successful entries persist after reload, can be deleted and update the summary values. Invalid stored JSON is ignored safely.
- Final browser QA completed 105 checks across all four pages, including form and quiz validation, saved-card and journal storage, dark-mode contrast, local links and images, and responsive layouts at 375, 768 and 1280 px in both themes.

## Credits

- Clash Royale artwork © Supercell, provided through https://github.com/RoyaleAPI/cr-api-assets/tree/master/cards. Individual source filenames match `assets/cards/`. No ownership of game artwork is claimed.
- Fan Content Policy: https://supercell.com/en/fan-content-policy/
- Classic Hog deck reference: https://www.deckshop.pro/deck/detail/hog-rider,ice-golem,musketeer,cannon,skeletons,ice-spirit,fireball,the-log
- Inter and Barlow Condensed: https://fonts.google.com/ (SIL Open Font License).
- Bootstrap 5.3.3: https://getbootstrap.com/ (MIT notice retained in the local CSS).
- jQuery 3.7.1: https://jquery.com/ (local vendor file used for Home FAQ and feedback, catalog results, Card Guide quiz feedback and Practice journal effects).
- Original layout, guide text and implementation developed with AI assistance. These are learning decks, not claims about the current competitive meta.
