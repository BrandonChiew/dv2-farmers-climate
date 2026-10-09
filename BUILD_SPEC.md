# BUILD SPEC — "When the rain stops" (FIT3179 DV2)

Hand this whole file to Claude Code, working inside the repo `dv2-farmers-climate`. Build the page described here, section by section, testing each chart in the browser before moving on.

## 0. Brief
- Unit: FIT3179 Data Visualisation 2, Monash. Student Chew Chen Hin (35154667), GitHub BrandonChiew. Due Sun 25 Oct 2026, 11:55pm. Interview in Week 12.
- Topic: **Australian Farmers and Climate** — how rainfall/drought influence agricultural production; compare production across years; relationships between climate and farming outcomes. Focus on agricultural impacts, NOT climate change itself.
- Story stays about Australia. Malaysia is only the audience (explain simply, e.g. "Australia is about 23 times the size of Malaysia"). No Malaysia content otherwise.
- Deliverable: ONE scrolling web page, public GitHub Pages (https://brandonchiew.github.io/dv2-farmers-climate/), all Vega-Lite/Vega JSON specs in the repo. Presentation (story), not exploration.
- Rubric targets: at least 3 different map idioms, at least 10 charts, 8+ advanced idioms for HD, real data from at least 2 sources, custom interactions that help the story, no 3D, no animation.
- Hand-drawn A4 sketch is done by the student on paper (a digital sketch scores 0). Not part of this build.
- Student prefers concise answers.

## 1. Repo layout (target)
```
index.html
css/style.css
js/main.js              (vegaEmbed calls + page-wide year link + guess callback)
js/*.vl.json            (one spec per chart, delete js/test.vl.json before submit)
data/processed/*.csv|topojson
data/raw/...            (already there, do not edit)
data/SOURCES.md
README.md
```
Load libs from CDN: vega@5, vega-lite@5, vega-embed@6. Fonts from Google Fonts: Big Shoulders Display (600,800,900) and IBM Plex Sans (400,600, italic 400). Serve locally with `python3 -m http.server` (fetching JSON needs http, not file://).

## 2. Data (all already in `data/processed/`)
| file | columns / notes |
|---|---|
| `crops_by_state.csv` | state, state_code (AUS,NSW,VIC,QLD,SA,WA,TAS), crop (wheat, barley, canola), season, year, status (actual/estimate/forecast), area_kha, production_kt, yield_t_ha. 1989–2026. Season "2019–20" is matched to year 2019. 2022–23 to 2025–26 are estimates, 2026–27 is forecast. |
| `rain_vs_yield.csv` | state, state_code (6 states incl TAS; exclude TAS in rain charts), year 1989–2025, season, status, rain_cool_mm (April–October rain), rain_cool_pct_of_avg, wheat_yield_t_ha, wheat_production_kt, wheat_area_kha, yield_pct_of_avg |
| `rainfall_by_state.csv` | state, state_code, year (1900–), rain_cool_mm, rain_annual_mm, rain_cool_pct_of_avg |
| `climate_drivers.csv` | year 1989–2025, enso (El Nino / La Nina / Neutral), note, note_source. 9 El Nino, 12 La Nina, 16 Neutral. |
| `farm_income.csv` | season, year 1994–2026, status, cash_costs_m, gross_value_m, net_value_m, real_net_value_m (today's dollars, millions) |
| `aus_states.topojson` | object `states`, properties code, name. Coordinates are lon/lat. |
| `isohyets_annual_avg.topojson` | object `isohyets`, properties min_mm, max_mm, band (9 bands: "0–200 mm","200–300 mm","300–400 mm","400–600 mm","600–800 mm","800–1200 mm","1200–1600 mm","1600–2400 mm","2400+ mm") |
| `wheat_exports_*.csv` | UNUSED. Ignore. |

Sources (cite in footer and SOURCES.md): Bureau of Meteorology (rainfall series and grids, ENSO history, Annual Climate Statements 2019/2022), ABARES (Australian Crop Report Sept 2026, Agricultural commodities Sept quarter 2026), Australian Bureau of Statistics (state boundaries 2021). Three sources combined.

Key numbers (verified): wheat 2016 = 31.8 Mt; 2019 = 14.5 Mt (driest year on record, 277.6 mm national); 2022 = 40.5 Mt (record). 2002 = 10.1 Mt, 2006 = 10.8 Mt. Wheat: El Nino years average 16.2 Mt, La Nina years 27.0 Mt. NSW in 2019: about 40% of its normal April–October rain and about 41% of its normal yield. Farm income left after costs: 1994–95 about $0.1b, 2002 half of 2001, 2021 record $25.2b. 2026–27 forecast wheat 29.9 Mt, down from 36.0 Mt. NSW 2019 to 2022 yield 0.8 to 3.0 t/ha (about 3.5 times). Wheat grown by state (Mt) in my sketch: 2019 WA 5.8, VIC 3.7, SA 2.7, NSW 1.8, QLD 0.4; 2022 WA 14.5, NSW 10.6, SA 7.3, VIC 5.4, QLD 2.6. Recompute all of these from the CSVs before printing; every number on the page must come from the data.

## 3. Design system
Rain sequential (9 bands, dry to wet): `#F6EBD0 #E3E4C0 #C9DDB8 #A6D2B4 #7CC1AE #52A9A2 #2E8C8F #146E78 #0B4F5E`
% of normal rain (7 bins, thresholds 50,70,90,110,130,150): `#8C510A #D8B365 #F3DFA2 #E3EFE9 #A9DDD4 #4FB3A6 #01665E`
Story colours: 2019 brown `#8C510A`, 2022 teal `#01665E`, wheat `#C8901E` (text `#7A5300`), barley `#A88660`, canola `#E9CF4B`, gold highlight `#F0C766`, sun `#E7A04B`.
ENSO: El Nino sun `#E7A04B`, La Nina cloud `#9CC3D6`, neutral `#6B5A48`.
Backgrounds: night `#16222C`, deep `#0F1A22`, dusk `#1B2A35`, sand `#F1E4C8`, soil `#3A2A1E`, earth `#4A3426`, WA red earth `#9A4A24`, cream text `#F3EEDF`, ink `#16222C`.
Type: headlines Big Shoulders Display 900 UPPERCASE, huge (76px sections, 196px hero). Body IBM Plex Sans 17–18px, lines under 75 characters. Bridge sentences: italic Plex 21px. No small all-caps eyebrow labels, no monospace, no numbered section markers, no identical rounded cards. Depth comes from layered SVG landscape, offset hard shadows under maps, wavy section dividers, and chart marks that look like things (capsules, wheat field, roots).
Accessibility: visible focus, alt text/aria-label on charts, colour not the only cue, prefers-reduced-motion, works on phone width (charts scroll or scale).

## 4. Page structure (top to bottom)
Every section ends with an italic bridge sentence leading into the next.

1. **Hero** (full-bleed layered SVG, see Appendix A). Title "When the rain stops" at 196px sits BETWEEN layers; dark wheat stalks in a foreground SVG overlap it. Left side: storm, falling rain pattern, wheat field, silos. Right side: drought sun, cracked red earth. A farmer stands at the join. Lede: "For Australia's grain farmers, one season of rain decides whether the paddocks give a little or a lot. This is 37 harvests, told through the rain that made them."
2. **Guess the 2019 harvest** (dark `#0F1A22`). Chart `guess.vl.json`: the 2016 bar is fixed at 31.8 Mt; the reader drags a dashed bar for 2019 (picking rungs). Button "Show the real harvest" sets signal `reveal` true: brown bar 14.5 Mt appears, text "Less than half." Store the guess in `window.__guess` / `sessionStorage` and reuse it in the last section ("You guessed X Mt for 2019. Now you know why it was 14.5."). Copy: "In 2016, a good year, Australia grew 31.8 million tonnes of wheat. 2019 was the driest year Australia has ever recorded. Drag the empty bar to your guess." Hint: "Your guess stays on the page and comes back in the last section." Wavy dune divider (brown/orange) into the next section.
3. **Only a thin wet crescent can grow grain** (sand paper). Map idiom 1 (isohyet scalar field, contour bands) + map idiom 2 (proportional circles for wheat Mt per state, 2015–2024 average, in the wheat belt) on one map `map_isohyets.vl.json`, with an offset drop shadow and a side legend; the 300–600 mm bands outlined gold = "the wheat belt". Labels: Darwin 1,766 mm, Alice Springs 288 mm (add as text marks with lon/lat). Locator-style context. Copy: "Most of the continent is the colour of sand: too dry to farm. Wheat grows on the curve where the colour turns green-blue, around Perth, Adelaide, Melbourne and inland Sydney. Australia is about 23 times the size of Malaysia, and most of it is in that sand." Bridge: "That crescent is a narrow margin. What happens in the years the rain doesn't come?"
4. **37 seasons, one landscape** (dusk, the memorable centrepiece). One vconcat chart `panorama.vl.json` with four rows sharing one year axis (1989–2025): (a) ENSO strip with sun/cloud shapes, (b) rain capsules per state (NSW, VIC, SA, WA, QLD) coloured by % of normal April–October rain, (c) national wheat harvest area (Mt), (d) "roots" hanging underneath: farm net income after costs, coloured by ENSO, in today's dollars. A glowing light column marks the selected year (default 2019); clicking any chart selects a year and every row highlights it. Annotations (text marks, add): 2002 10.1 Mt, 2006 10.8 Mt, 2022 40.5 Mt record, 1994–95 farmers kept almost nothing, 2002 half of 2001, 2021 record $25.2b. Side text: "El Nino years: 16.2 Mt on average. La Nina years: 27.0 Mt." plus "El Nino is a natural swing in Pacific Ocean temperatures that usually brings dry winters to eastern Australia. Harvests have also grown over time, so dry and wet years 'tend to' matter, not 'cause' on their own." and "2019 had no El Nino. The Bureau of Meteorology says a very strong pattern in the Indian Ocean dried the country instead: the driest year Australia has recorded, 277.6 mm." Legend row: sun = El Nino (usually dry), cloud = La Nina (usually wet), capsule colour scale. Hint: "Click any year: the light column moves, and every chart further down the page follows that year." Bridge: "The dry columns keep landing on the dips. Is the rain really what decides it?"
5. **In New South Wales the harvest follows the rain** (pale green-grey `#DCE8E4`). Idiom: connected scatterplot (x April–October rain mm, y wheat yield t/ha, NSW, points connected in year order, label 1994, 2002, 2018, 2019, 2022) + "Be the farmer" slider (rain 100–160 mm window, highlights seasons in the window: years 1994, 2002, 2018, 2019, yields 0.6–0.8 t/ha) + choropleth small multiples (map idiom 3): 2×2 maps of Australia, columns 2019 and 2022, rows Rain and Wheat yield, each state coloured as % of its own normal on the diverging scale. Copy: "Each grain is one year, joined in time order. Dry seasons sit low and to the left; wet seasons high and to the right. In 2019 NSW got about 40% of its normal rain, and its wheat yield fell to about 41% of normal." Bridge: "It holds almost everywhere, except Western Australia, the biggest grower of all."
6. **WA's rain average is mostly desert** (red earth `#9A4A24`). WA map in red earth with shadow, annotation "Desert: most of the 'state average'" and the wheat belt in the south-west with small isohyet overlay. Copy: "Western Australia's yields barely move with its statewide rain, because the state average is mostly desert. The wheat is in the thin south-west corner, which this average hides." Reuse the isohyet layer clipped to WA, plus a scatter or small line of WA rain vs yield.
7. **NSW swings hardest: from fourth to second** (sand). Dumbbell (yield t/ha by state, 2019 brown dot to 2022 teal dot, annotate "3.0, about 3.5 times more" for NSW) + slopegraph (rank by wheat grown, 2019 vs 2022; NSW climbs from fourth to second). Hover on a state highlights it in both charts (shared param). Hint: "Hover a state to light it up in both charts. Tasmania grows too little wheat to show." Bridge: "Wheat isn't the only crop in the paddock. Does everything else rise and fall with it?"
8. **The whole paddock rises and falls** (dusk-to-earth, farm silhouette strip at top). Streamgraph of wheat, barley, canola production (Mt, national, 1989–2025) with 2002, 2006, 2019, 2022 markers + diverging bars: "How far each crop fell, compared with the five years before" for 2002, 2006, 2019 (wheat −55/−50/−38 %, barley −41/−46/+3 %, canola −49/−61/−32 % in the sketch; RECOMPUTE from data: percent change of the year vs mean of the previous five years). Note: "In 2019 barley held steady (+3%). The state data shows where it held up." Copy: "Barley and canola grow in the same season, on the same farms, under the same sky. Stacked together, the drought years cut into all of them."
9. **Night bookend** (Appendix B). Same farmer at night beside a lit house, rain returning on the right. H2 "When the rain stops, the harvest stops". Copy: "In the worst dry years, Australia's wheat harvest fell by half and farmers kept about half as much money. In the wettest, they broke records on both. ABARES expects a smaller crop in 2026–27, 29.9 Mt, down from 36.0 Mt. Once again, the wheat belt is watching the sky." Callback: "You guessed X Mt for 2019. Now you know why it was 14.5."
10. **Soil footer**: three columns. Where the numbers come from (BoM, ABARES, ABS, linked). Made by: Chew Chen Hin (35154667), Monash University Malaysia, October 2026, charts built with Vega-Lite and Vega. Use of AI: Claude helped plan the design, process the data and check grammar. Every illustration is an original vector drawing (state this honestly; update if hand-edited).

## 5. Idiom and rubric checklist
Maps (3): isohyet scalar field, proportional symbol, choropleth small multiples (+ locator in WA section). Advanced idioms (8+): heatmap capsules, connected scatterplot, dumbbell, slopegraph, streamgraph, area, diverging bars, layered/linked small multiples, plus guess-first drag and rain slider custom interactions. Charts (12+): guess bars, isohyet map, panorama (4 views), connected scatter, 4 choropleths, WA chart, dumbbell, slopegraph, streamgraph, diverging bars. Interactions: guess-first drag, be-the-farmer slider, page-wide year link, tooltips, hover link. Tooltips on every mark; tell the reader what is interactive in a one-line hint.

## 6. Page-wide year link (js/main.js)
Embed each chart with `vegaEmbed(el, spec, {actions:false, renderer:'svg'})` and keep `result.view`. The panorama has a selection param `yr` (point on `year`). On change, push the year into signals of the other charts (e.g. NSW scatter highlight, choropleth year, dumbbell year) via `view.addSignalListener('yr_year' ...)` / `view.signal(...).run()`. Verify the actual signal names in the browser console (`view.getState()`); they can differ.

## 7. Build order (do each, test, commit)
1. Page shell + CSS + hero + fonts, responsive.
2. `guess` chart and button, store guess.
3. Isohyet + proportional symbol map.
4. Panorama and its year selection. Fix any axis misalignment between rows (the y axes are hidden on purpose so plot areas align at the left; row labels are on the left via the nominal axis in the capsule row only).
5. Rain vs yield connected scatter + slider; choropleth small multiples.
6. WA section; dumbbell + slopegraph; streamgraph + diverging bars.
7. Night + footer, guess callback, page-wide link.
8. Polish: mobile, tooltips, alt text, README, delete `js/test.vl.json` and `_to_delete/`, final check in a fresh browser, push, confirm GitHub Pages is live.
Commit messages short, one per step. Do not commit `data/raw/**/*.zip`.

## 8. Gotchas
- TopoJSON feature names: `states`, `isohyets`. Projection used everywhere: `conicEqualArea`, parallels [-18,-36], rotate [-132,0], center [0,-27]; tune scale/translate with `fit` if needed.
- Vega-Lite `threshold` colour scale: n bins need n−1 domain values and n colours.
- Panorama alignment: use the same `width` and the same `x` scale domain [1988.5, 2025.5] in every row; rects built from x0 = year−0.36 to x1 = year+0.36.
- Multi-view selection in a vconcat needs the param at top level with `views` listing the child view names. If a click on a row does not propagate, fall back to JS signals.
- Season matching: crop "2019–20" belongs to year 2019 (matched to April–October 2019 rain).
- Do not claim causation: say "tends to", note El Nino 2019 exception.
- Remove any claim you cannot trace to the CSVs.

## Appendix A — Hero SVG (layers; scale to width with `preserveAspectRatio="xMidYMax slice"`)
Shared defs (put once at top of body, `<svg width="0" height="0" style="position:absolute">`):
```html
<svg width="0" height="0" style="position:absolute">
<defs>
<pattern id="rainP" width="16" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(14)"><line x1="8" y1="2" x2="8" y2="24" stroke="#9CC3D6" stroke-opacity="0.5" style="stroke-width:1.3;stroke-linecap:round"/></pattern>
<pattern id="rainFar" width="11" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(14)"><line x1="5" y1="2" x2="5" y2="14" stroke="#9CC3D6" stroke-opacity="0.25" style="stroke-width:0.9;stroke-linecap:round"/></pattern>
<pattern id="furrow" width="12" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-6)"><line x1="0" y1="4" x2="12" y2="4" stroke="#7A5300" stroke-opacity="0.4" style="stroke-width:2"/></pattern>
<pattern id="wheatTex" width="7" height="22" patternUnits="userSpaceOnUse"><line x1="3.5" y1="0" x2="3.5" y2="22" stroke="#8E5F10" stroke-opacity="0.45" style="stroke-width:1"/><ellipse cx="3.5" cy="5" rx="1.6" ry="3.2" fill="#F0C766" fill-opacity="0.55"/></pattern>
<symbol id="stalk" viewBox="0 0 20 80"><path d="M10,80 C10,55 11,35 10,10" stroke="#8E5F10" fill="none" style="stroke-width:1.6"/><g fill="#C8901E"><ellipse cx="10" cy="7" rx="2.2" ry="5"/><ellipse cx="7" cy="14" rx="2.6" ry="5" transform="rotate(-25 7 14)"/><ellipse cx="13" cy="18" rx="2.6" ry="5" transform="rotate(25 13 18)"/><ellipse cx="7" cy="24" rx="2.6" ry="5" transform="rotate(-25 7 24)"/><ellipse cx="13" cy="28" rx="2.6" ry="5" transform="rotate(25 13 28)"/><ellipse cx="7" cy="34" rx="2.6" ry="5" transform="rotate(-25 7 34)"/><ellipse cx="13" cy="38" rx="2.6" ry="5" transform="rotate(25 13 38)"/></g></symbol>
<symbol id="stalkDark" viewBox="0 0 20 80"><path d="M10,80 C10,55 11,35 10,10" stroke="#1E1608" fill="none" style="stroke-width:1.4"/><g fill="#1E1608"><ellipse cx="10" cy="7" rx="2.2" ry="5"/><ellipse cx="7" cy="14" rx="2.6" ry="5" transform="rotate(-25 7 14)"/><ellipse cx="13" cy="18" rx="2.6" ry="5" transform="rotate(25 13 18)"/><ellipse cx="7" cy="24" rx="2.6" ry="5" transform="rotate(-25 7 24)"/><ellipse cx="13" cy="28" rx="2.6" ry="5" transform="rotate(25 13 28)"/><ellipse cx="7" cy="34" rx="2.6" ry="5" transform="rotate(-25 7 34)"/><ellipse cx="13" cy="38" rx="2.6" ry="5" transform="rotate(25 13 38)"/><path d="M10,60 C4,52 2,46 3,40 C6,46 9,52 10,60Z"/></g></symbol>
<symbol id="drop" viewBox="0 0 20 28"><path d="M10,1 C14,9 18,14 18,19 A8,8 0 0 1 2,19 C2,14 6,9 10,1Z"/></symbol>
<symbol id="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5.5"/><g style="stroke-width:1.8;stroke-linecap:round"><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/><line x1="4.2" y1="4.2" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.8" y2="19.8"/><line x1="4.2" y1="19.8" x2="6.3" y2="17.7"/><line x1="17.7" y1="6.3" x2="19.8" y2="4.2"/></g></symbol>
<symbol id="cloud" viewBox="0 0 28 18"><path d="M7,17 A6,6 0 0 1 6,5 A7,7 0 0 1 19,4 A5.5,5.5 0 0 1 22,17Z"/></symbol>
<symbol id="gauge" viewBox="0 0 16 40"><rect x="3" y="1" width="10" height="38" rx="5" fill="none" stroke="currentColor" style="stroke-width:1.5"/></symbol>
</defs>
</svg>
```
Hero block (title text lives in an HTML `<div class="hero-text">` between the two SVGs, so the foreground stalks overlap it):
```html
<div class="hero">
<svg class="fill" viewBox="0 0 1100 860" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
<rect x="0" y="0" width="1100" height="860" fill="#1B2A35"/>
<rect x="640" y="0" width="460" height="860" fill="#3A2A22"/>
<rect x="560" y="0" width="80" height="860" fill="#2A2A2C"/>
<circle cx="930" cy="250" r="160" fill="#E7A04B" fill-opacity="0.08"/><circle cx="930" cy="250" r="105" fill="#E7A04B" fill-opacity="0.14"/><circle cx="930" cy="250" r="62" fill="#F0B866"/>
<g fill="#22313D"><circle cx="40" cy="30" r="110"/><circle cx="190" cy="10" r="130"/><circle cx="350" cy="40" r="120"/><circle cx="500" cy="10" r="120"/></g>
<g fill="#2C3D4A"><circle cx="110" cy="100" r="80"/><circle cx="260" cy="110" r="92"/><circle cx="420" cy="104" r="84"/><circle cx="560" cy="80" r="56"/></g>
<rect x="0" y="150" width="600" height="520" fill="url(#rainFar)"/>
<path d="M0,560 C140,520 260,530 400,548 C520,560 620,540 760,520 C880,506 1000,520 1100,512 L1100,860 L0,860Z" fill="#2E3B44"/>
<path d="M640,560 C760,540 880,548 1000,536 C1050,532 1080,534 1100,532 L1100,860 L640,860Z" fill="#5A3A28"/>
<path d="M0,610 C150,590 300,600 460,612 C560,620 620,610 660,604 L660,860 L0,860Z" fill="#B88419"/>
<path d="M0,610 C150,590 300,600 460,612 C560,620 620,610 660,604 L660,860 L0,860Z" fill="url(#furrow)"/>
<path d="M640,606 C760,596 880,604 1000,612 C1050,616 1080,614 1100,612 L1100,860 L640,860Z" fill="#9A4A24"/>
<g fill="none" stroke="#6E3318" style="stroke-width:1.5"><path d="M700,660 l18,14 l-6,22 l20,10"/><path d="M780,640 l-10,20 l16,12 l-4,24"/><path d="M880,672 l22,6 l8,20 l18,4"/><path d="M980,650 l-14,18 l10,16"/><path d="M1040,700 l16,-12 l14,8"/><path d="M820,740 l26,-6 l12,14"/><path d="M930,760 l-18,12 l6,20"/></g>
<g fill="none" stroke="#F0B866" stroke-opacity="0.35" style="stroke-width:1.2"><path d="M720,560 q10,-6 20,0 t20,0 t20,0"/><path d="M860,548 q10,-6 20,0 t20,0 t20,0"/><path d="M990,556 q10,-6 20,0 t20,0"/></g>
<rect x="0" y="140" width="610" height="480" fill="url(#rainP)"/>
<g transform="translate(90,612)" fill="#D9D2C2"><rect x="0" y="-74" width="28" height="74"/><path d="M0,-74 Q14,-92 28,-74Z"/><rect x="32" y="-88" width="28" height="88"/><path d="M32,-88 Q46,-106 60,-88Z"/><rect x="64" y="-66" width="24" height="66"/><path d="M64,-66 Q76,-80 88,-66Z"/></g>
<g transform="translate(652,606)" fill="#0E141A"><ellipse cx="0" cy="-64" rx="15" ry="3.6"/><rect x="-6" y="-74" width="12" height="10" rx="3"/><circle cx="0" cy="-56" r="6"/><path d="M-9,-50 L9,-50 L11,-21 L-11,-21Z"/><rect x="-9" y="-21" width="7" height="23"/><rect x="2" y="-21" width="7" height="23"/><path d="M7,-48 L-3,-66 L0,-68 L11,-51Z"/></g>
</svg>
<div class="hero-text">
<h1>When the<br>rain stops</h1>
<p class="hero-lede">For Australia’s grain farmers, one season of rain decides whether the paddocks give a little or a lot. This is 37 harvests, told through the rain that made them.</p>
</div>
<svg class="fill" viewBox="0 0 1100 860" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
<use href="#stalkDark" x="-10" y="430" width="110" height="440"/><use href="#stalkDark" x="60" y="500" width="90" height="360"/><use href="#stalkDark" x="120" y="470" width="100" height="400"/><use href="#stalkDark" x="200" y="560" width="70" height="300"/><use href="#stalkDark" x="250" y="520" width="80" height="340"/>
<use href="#stalkDark" x="930" y="520" width="80" height="340"/><use href="#stalkDark" x="990" y="460" width="110" height="420"/>

</svg>
</div>

```
## Appendix B — Night bookend
```html
<div class="night">
<svg class="fill" viewBox="0 0 1100 660" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
<rect x="0" y="0" width="1100" height="660" fill="#16222C"/>
<path d="M0,0 L1100,0 L1100,12 C900,30 700,6 500,18 C300,30 150,8 0,16Z" fill="#4A3426"/>
<g fill="#E3EAEE"><circle cx="120" cy="80" r="1.3"/><circle cx="260" cy="58" r="1"/><circle cx="410" cy="96" r="1.4"/><circle cx="560" cy="62" r="1"/><circle cx="700" cy="86" r="1.3"/><circle cx="930" cy="54" r="1"/><circle cx="1040" cy="100" r="1.3"/><circle cx="820" cy="140" r="1"/><circle cx="330" cy="160" r="1.1"/></g>
<g fill="#22313D"><circle cx="760" cy="150" r="70"/><circle cx="860" cy="130" r="88"/><circle cx="980" cy="150" r="74"/></g>
<rect x="700" y="190" width="400" height="380" fill="url(#rainFar)"/>
<path d="M0,570 C200,550 420,566 640,558 C860,550 980,562 1100,556 L1100,660 L0,660Z" fill="#1E2A22"/>
<g transform="translate(860,570)" fill="#0E141A"><rect x="0" y="-40" width="70" height="40"/><path d="M-8,-40 L35,-66 L78,-40Z"/><rect x="50" y="-72" width="8" height="16"/><rect x="14" y="-28" width="12" height="12" fill="#E7B76E"/></g>
<g transform="translate(820,570)" fill="#0E141A"><ellipse cx="0" cy="-64" rx="15" ry="3.6"/><rect x="-6" y="-74" width="12" height="10" rx="3"/><circle cx="0" cy="-56" r="6"/><path d="M-9,-50 L9,-50 L11,-21 L-11,-21Z"/><rect x="-9" y="-21" width="7" height="23"/><rect x="2" y="-21" width="7" height="23"/><path d="M7,-48 L-3,-66 L0,-68 L11,-51Z"/></g>
</svg>
<div class="night-text">
<h2>When the rain stops, the harvest stops</h2>
<p class="lead">In the worst dry years, Australia’s wheat harvest fell by half and farmers kept about half as much money. In the wettest, they broke records on both. ABARES expects a smaller crop in 2026–27, 29.9 Mt, down from 36.0 Mt. Once again, the wheat belt is watching the sky.</p>
<p class="small" id="guess-callback">You guessed 25 Mt for 2019. Now you know why it was 14.5.</p>
</div>
</div>

```
## Appendix C — Starting Vega-Lite specs (from my prototype; they ran in Chromium but verify and refine)
### js/guess.vl.json
```json
{
 "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
 "width": 340,
 "height": 320,
 "config": {
  "font": "IBM Plex Sans",
  "background": null,
  "view": {
   "stroke": null
  },
  "axis": {
   "labelColor": "#8FA3AE",
   "titleColor": "#8FA3AE",
   "labelFont": "IBM Plex Sans",
   "titleFont": "IBM Plex Sans",
   "domainColor": "#4A5B66",
   "tickColor": "#4A5B66",
   "labelFontSize": 11,
   "titleFontSize": 12,
   "gridColor": "#2A3A46"
  },
  "legend": {
   "labelColor": "#8FA3AE",
   "titleColor": "#8FA3AE",
   "labelFont": "IBM Plex Sans",
   "titleFont": "IBM Plex Sans"
  }
 },
 "datasets": {
  "rungs": [
   {
    "mt_pick": 0.0
   },
   {
    "mt_pick": 0.5
   },
   {
    "mt_pick": 1.0
   },
   {
    "mt_pick": 1.5
   },
   {
    "mt_pick": 2.0
   },
   {
    "mt_pick": 2.5
   },
   {
    "mt_pick": 3.0
   },
   {
    "mt_pick": 3.5
   },
   {
    "mt_pick": 4.0
   },
   {
    "mt_pick": 4.5
   },
   {
    "mt_pick": 5.0
   },
   {
    "mt_pick": 5.5
   },
   {
    "mt_pick": 6.0
   },
   {
    "mt_pick": 6.5
   },
   {
    "mt_pick": 7.0
   },
   {
    "mt_pick": 7.5
   },
   {
    "mt_pick": 8.0
   },
   {
    "mt_pick": 8.5
   },
   {
    "mt_pick": 9.0
   },
   {
    "mt_pick": 9.5
   },
   {
    "mt_pick": 10.0
   },
   {
    "mt_pick": 10.5
   },
   {
    "mt_pick": 11.0
   },
   {
    "mt_pick": 11.5
   },
   {
    "mt_pick": 12.0
   },
   {
    "mt_pick": 12.5
   },
   {
    "mt_pick": 13.0
   },
   {
    "mt_pick": 13.5
   },
   {
    "mt_pick": 14.0
   },
   {
    "mt_pick": 14.5
   },
   {
    "mt_pick": 15.0
   },
   {
    "mt_pick": 15.5
   },
   {
    "mt_pick": 16.0
   },
   {
    "mt_pick": 16.5
   },
   {
    "mt_pick": 17.0
   },
   {
    "mt_pick": 17.5
   },
   {
    "mt_pick": 18.0
   },
   {
    "mt_pick": 18.5
   },
   {
    "mt_pick": 19.0
   },
   {
    "mt_pick": 19.5
   },
   {
    "mt_pick": 20.0
   },
   {
    "mt_pick": 20.5
   },
   {
    "mt_pick": 21.0
   },
   {
    "mt_pick": 21.5
   },
   {
    "mt_pick": 22.0
   },
   {
    "mt_pick": 22.5
   },
   {
    "mt_pick": 23.0
   },
   {
    "mt_pick": 23.5
   },
   {
    "mt_pick": 24.0
   },
   {
    "mt_pick": 24.5
   },
   {
    "mt_pick": 25.0
   },
   {
    "mt_pick": 25.5
   },
   {
    "mt_pick": 26.0
   },
   {
    "mt_pick": 26.5
   },
   {
    "mt_pick": 27.0
   },
   {
    "mt_pick": 27.5
   },
   {
    "mt_pick": 28.0
   },
   {
    "mt_pick": 28.5
   },
   {
    "mt_pick": 29.0
   },
   {
    "mt_pick": 29.5
   },
   {
    "mt_pick": 30.0
   },
   {
    "mt_pick": 30.5
   },
   {
    "mt_pick": 31.0
   },
   {
    "mt_pick": 31.5
   },
   {
    "mt_pick": 32.0
   },
   {
    "mt_pick": 32.5
   },
   {
    "mt_pick": 33.0
   },
   {
    "mt_pick": 33.5
   },
   {
    "mt_pick": 34.0
   },
   {
    "mt_pick": 34.5
   },
   {
    "mt_pick": 35.0
   },
   {
    "mt_pick": 35.5
   },
   {
    "mt_pick": 36.0
   },
   {
    "mt_pick": 36.5
   },
   {
    "mt_pick": 37.0
   },
   {
    "mt_pick": 37.5
   },
   {
    "mt_pick": 38.0
   },
   {
    "mt_pick": 38.5
   },
   {
    "mt_pick": 39.0
   },
   {
    "mt_pick": 39.5
   },
   {
    "mt_pick": 40.0
   }
  ],
  "actual": [
   {
    "label": "2016",
    "mt": 31.8,
    "kind": "known"
   },
   {
    "label": "2019",
    "mt": 14.5,
    "kind": "actual"
   }
  ]
 },
 "params": [
  {
   "name": "reveal",
   "value": false
  },
  {
   "name": "pick",
   "select": {
    "type": "point",
    "fields": [
     "mt_pick"
    ],
    "on": "pointerdown, pointermove[event.buttons===1]",
    "clear": false
   },
   "value": [
    {
     "mt_pick": 25
    }
   ]
  }
 ],
 "layer": [
  {
   "data": {
    "name": "actual"
   },
   "transform": [
    {
     "filter": "datum.kind=='known'"
    }
   ],
   "mark": {
    "type": "bar",
    "color": "#C8901E",
    "width": 84,
    "cornerRadiusTopLeft": 3,
    "cornerRadiusTopRight": 3
   },
   "encoding": {
    "x": {
     "field": "label",
     "type": "nominal",
     "axis": {
      "title": null,
      "labelFontSize": 14,
      "labelColor": "#F3EEDF",
      "labelAngle": 0
     },
     "scale": {
      "domain": [
       "2016",
       "2019"
      ],
      "paddingOuter": 0.1
     }
    },
    "y": {
     "field": "mt",
     "type": "quantitative",
     "scale": {
      "domain": [
       0,
       40
      ]
     },
     "axis": {
      "title": "Million tonnes of wheat",
      "grid": true,
      "values": [
       0,
       10,
       20,
       30,
       40
      ]
     }
    }
   }
  },
  {
   "data": {
    "name": "actual"
   },
   "transform": [
    {
     "filter": "datum.kind=='known'"
    }
   ],
   "mark": {
    "type": "text",
    "dy": -10,
    "font": "Big Shoulders Display",
    "fontSize": 28,
    "fontWeight": 800,
    "color": "#F3EEDF"
   },
   "encoding": {
    "x": {
     "field": "label",
     "type": "nominal"
    },
    "y": {
     "field": "mt",
     "type": "quantitative"
    },
    "text": {
     "value": "31.8 Mt"
    }
   }
  },
  {
   "data": {
    "name": "rungs"
   },
   "transform": [
    {
     "filter": {
      "param": "pick"
     }
    },
    {
     "calculate": "'2019'",
     "as": "label"
    }
   ],
   "mark": {
    "type": "bar",
    "width": 84,
    "color": "#E7A04B",
    "opacity": 0.35,
    "stroke": "#E7A04B",
    "strokeDash": [
     6,
     4
    ],
    "cornerRadiusTopLeft": 3,
    "cornerRadiusTopRight": 3
   },
   "encoding": {
    "x": {
     "field": "label",
     "type": "nominal"
    },
    "y": {
     "field": "mt_pick",
     "type": "quantitative"
    }
   }
  },
  {
   "data": {
    "name": "rungs"
   },
   "transform": [
    {
     "filter": {
      "param": "pick"
     }
    },
    {
     "calculate": "'2019'",
     "as": "label"
    }
   ],
   "mark": {
    "type": "text",
    "dy": -10,
    "font": "Big Shoulders Display",
    "fontSize": 26,
    "fontWeight": 800,
    "color": "#E7A04B"
   },
   "encoding": {
    "x": {
     "field": "label",
     "type": "nominal"
    },
    "y": {
     "field": "mt_pick",
     "type": "quantitative"
    },
    "text": {
     "field": "mt_pick",
     "type": "quantitative",
     "format": ".1f"
    }
   }
  },
  {
   "data": {
    "name": "actual"
   },
   "transform": [
    {
     "filter": "datum.kind=='actual' && reveal"
    }
   ],
   "mark": {
    "type": "bar",
    "width": 84,
    "color": "#8C510A",
    "cornerRadiusTopLeft": 3,
    "cornerRadiusTopRight": 3
   },
   "encoding": {
    "x": {
     "field": "label",
     "type": "nominal"
    },
    "y": {
     "field": "mt",
     "type": "quantitative"
    }
   }
  },
  {
   "data": {
    "name": "actual"
   },
   "transform": [
    {
     "filter": "datum.kind=='actual' && reveal"
    }
   ],
   "mark": {
    "type": "text",
    "dy": 14,
    "font": "Big Shoulders Display",
    "fontSize": 28,
    "fontWeight": 800,
    "color": "#F3EEDF"
   },
   "encoding": {
    "x": {
     "field": "label",
     "type": "nominal"
    },
    "y": {
     "field": "mt",
     "type": "quantitative"
    },
    "text": {
     "value": "14.5 Mt"
    }
   }
  },
  {
   "data": {
    "name": "rungs"
   },
   "mark": {
    "type": "rule",
    "strokeWidth": 14,
    "opacity": 0.001,
    "color": "#fff"
   },
   "encoding": {
    "y": {
     "field": "mt_pick",
     "type": "quantitative"
    },
    "x": {
     "value": 0
    },
    "x2": {
     "value": 340
    }
   }
  }
 ]
}
```
### js/map_isohyets.vl.json
```json
{
 "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
 "width": 560,
 "height": 560,
 "config": {
  "font": "IBM Plex Sans",
  "background": null,
  "view": {
   "stroke": null
  },
  "axis": {
   "labelColor": "#8FA3AE",
   "titleColor": "#8FA3AE",
   "labelFont": "IBM Plex Sans",
   "titleFont": "IBM Plex Sans",
   "domainColor": "#4A5B66",
   "tickColor": "#4A5B66",
   "labelFontSize": 11,
   "titleFontSize": 12,
   "gridColor": "#2A3A46"
  },
  "legend": {
   "labelColor": "#8FA3AE",
   "titleColor": "#8FA3AE",
   "labelFont": "IBM Plex Sans",
   "titleFont": "IBM Plex Sans"
  }
 },
 "projection": {
  "type": "conicEqualArea",
  "parallels": [
   -18,
   -36
  ],
  "rotate": [
   -132,
   0
  ],
  "center": [
   0,
   -27
  ]
 },
 "layer": [
  {
   "data": {
    "url": "data/processed/isohyets_annual_avg.topojson",
    "format": {
     "type": "topojson",
     "feature": "isohyets"
    }
   },
   "mark": {
    "type": "geoshape",
    "stroke": "#16222C",
    "strokeWidth": 0.2
   },
   "encoding": {
    "fill": {
     "field": "properties.band",
     "type": "ordinal",
     "scale": {
      "domain": [
       "0–200 mm",
       "200–300 mm",
       "300–400 mm",
       "400–600 mm",
       "600–800 mm",
       "800–1200 mm",
       "1200–1600 mm",
       "1600–2400 mm",
       "2400+ mm"
      ],
      "range": [
       "#F6EBD0",
       "#E3E4C0",
       "#C9DDB8",
       "#A6D2B4",
       "#7CC1AE",
       "#52A9A2",
       "#2E8C8F",
       "#146E78",
       "#0B4F5E"
      ]
     },
     "legend": {
      "title": "Average rain in a year",
      "orient": "right",
      "symbolType": "square",
      "labelColor": "#3B372F",
      "titleColor": "#16222C",
      "labelFontSize": 12,
      "titleFontSize": 13,
      "symbolSize": 220
     }
    },
    "tooltip": [
     {
      "field": "properties.band",
      "title": "Rain in a year"
     }
    ]
   }
  },
  {
   "data": {
    "url": "data/processed/aus_states.topojson",
    "format": {
     "type": "topojson",
     "feature": "states"
    }
   },
   "mark": {
    "type": "geoshape",
    "fill": null,
    "stroke": "#F3EEDF",
    "strokeWidth": 1.2,
    "strokeOpacity": 0.85
   }
  },
  {
   "data": {
    "url": "data/processed/crops_by_state.csv"
   },
   "transform": [
    {
     "filter": "datum.crop=='wheat' && datum.status=='actual' && datum.year>=2015 && datum.year<=2024 && datum.state_code!='AUS' && datum.state_code!='TAS'"
    },
    {
     "aggregate": [
      {
       "op": "mean",
       "field": "production_kt",
       "as": "kt"
      }
     ],
     "groupby": [
      "state_code"
     ]
    },
    {
     "lookup": "state_code",
     "from": {
      "data": {
       "values": [
        {
         "state": "WA",
         "lon": 117.8,
         "lat": -31.6
        },
        {
         "state": "SA",
         "lon": 138.6,
         "lat": -33.9
        },
        {
         "state": "VIC",
         "lon": 143.2,
         "lat": -36.4
        },
        {
         "state": "NSW",
         "lon": 147.4,
         "lat": -32.4
        },
        {
         "state": "QLD",
         "lon": 149.6,
         "lat": -27.4
        }
       ]
      },
      "key": "state",
      "fields": [
       "lon",
       "lat"
      ]
     }
    },
    {
     "calculate": "datum.kt/1000",
     "as": "mt"
    }
   ],
   "mark": {
    "type": "circle",
    "fill": "#C8901E",
    "stroke": "#16222C",
    "strokeWidth": 1.5,
    "opacity": 0.92
   },
   "encoding": {
    "longitude": {
     "field": "lon",
     "type": "quantitative"
    },
    "latitude": {
     "field": "lat",
     "type": "quantitative"
    },
    "size": {
     "field": "mt",
     "type": "quantitative",
     "scale": {
      "type": "sqrt",
      "domain": [
       0,
       12
      ],
      "range": [
       0,
       5200
      ]
     },
     "legend": null
    },
    "tooltip": [
     {
      "field": "state_code",
      "title": "State"
     },
     {
      "field": "mt",
      "title": "Wheat a year (Mt, 2015–24 avg)",
      "format": ".1f"
     }
    ]
   }
  },
  {
   "data": {
    "url": "data/processed/crops_by_state.csv"
   },
   "transform": [
    {
     "filter": "datum.crop=='wheat' && datum.status=='actual' && datum.year>=2015 && datum.year<=2024 && datum.state_code!='AUS' && datum.state_code!='TAS'"
    },
    {
     "aggregate": [
      {
       "op": "mean",
       "field": "production_kt",
       "as": "kt"
      }
     ],
     "groupby": [
      "state_code"
     ]
    },
    {
     "lookup": "state_code",
     "from": {
      "data": {
       "values": [
        {
         "state": "WA",
         "lon": 117.8,
         "lat": -31.6
        },
        {
         "state": "SA",
         "lon": 138.6,
         "lat": -33.9
        },
        {
         "state": "VIC",
         "lon": 143.2,
         "lat": -36.4
        },
        {
         "state": "NSW",
         "lon": 147.4,
         "lat": -32.4
        },
        {
         "state": "QLD",
         "lon": 149.6,
         "lat": -27.4
        }
       ]
      },
      "key": "state",
      "fields": [
       "lon",
       "lat"
      ]
     }
    },
    {
     "calculate": "datum.state_code+' '+format(datum.kt/1000,'.1f')",
     "as": "lab"
    }
   ],
   "mark": {
    "type": "text",
    "font": "Big Shoulders Display",
    "fontWeight": 800,
    "fontSize": 16,
    "color": "#16222C",
    "dx": 0,
    "dy": 0
   },
   "encoding": {
    "longitude": {
     "field": "lon",
     "type": "quantitative"
    },
    "latitude": {
     "field": "lat",
     "type": "quantitative"
    },
    "text": {
     "field": "lab"
    }
   }
  }
 ]
}
```
### js/panorama.vl.json
```json
{
 "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
 "config": {
  "font": "IBM Plex Sans",
  "background": null,
  "view": {
   "stroke": null
  },
  "axis": {
   "labelColor": "#8FA3AE",
   "titleColor": "#8FA3AE",
   "labelFont": "IBM Plex Sans",
   "titleFont": "IBM Plex Sans",
   "domainColor": "#4A5B66",
   "tickColor": "#4A5B66",
   "labelFontSize": 11,
   "titleFontSize": 12,
   "gridColor": "#2A3A46"
  },
  "legend": {
   "labelColor": "#8FA3AE",
   "titleColor": "#8FA3AE",
   "labelFont": "IBM Plex Sans",
   "titleFont": "IBM Plex Sans"
  }
 },
 "padding": {
  "left": 40,
  "right": 60,
  "top": 10,
  "bottom": 10
 },
 "params": [
  {
   "name": "yr",
   "select": {
    "type": "point",
    "fields": [
     "year"
    ],
    "on": "click",
    "clear": "dblclick",
    "toggle": false
   },
   "views": [
    "strip",
    "caps",
    "wheat",
    "roots"
   ],
   "value": [
    {
     "year": 2019
    }
   ]
  }
 ],
 "vconcat": [
  {
   "name": "strip",
   "width": 820,
   "height": 34,
   "data": {
    "url": "data/processed/climate_drivers.csv"
   },
   "layer": [
    {
     "mark": {
      "type": "point",
      "filled": true,
      "size": 150
     },
     "transform": [
      {
       "filter": "datum.enso=='El Nino'"
      }
     ],
     "encoding": {
      "x": {
       "field": "year",
       "type": "quantitative",
       "scale": {
        "type": "linear",
        "domain": [
         1988.5,
         2025.5
        ],
        "nice": false
       },
       "axis": null
      },
      "y": {
       "value": 17
      },
      "shape": {
       "value": "M0,-3 A3,3 0 1 1 0,3 A3,3 0 1 1 0,-3Z M0,-9 L0,-6 M0,6 L0,9 M-9,0 L-6,0 M6,0 L9,0 M-6.4,-6.4 L-4.2,-4.2 M4.2,4.2 L6.4,6.4 M-6.4,6.4 L-4.2,4.2 M4.2,-4.2 L6.4,-6.4"
      },
      "color": {
       "value": "#E7A04B"
      },
      "stroke": {
       "value": "#E7A04B"
      },
      "strokeWidth": {
       "value": 1.5
      },
      "tooltip": [
       {
        "field": "year",
        "title": "Year"
       },
       {
        "field": "enso",
        "title": "Pacific pattern"
       }
      ]
     }
    },
    {
     "mark": {
      "type": "point",
      "filled": true,
      "size": 150
     },
     "transform": [
      {
       "filter": "datum.enso=='La Nina'"
      }
     ],
     "encoding": {
      "x": {
       "field": "year",
       "type": "quantitative",
       "scale": {
        "type": "linear",
        "domain": [
         1988.5,
         2025.5
        ],
        "nice": false
       },
       "axis": null
      },
      "y": {
       "value": 17
      },
      "shape": {
       "value": "M-8,5 A4,4 0 0 1 -7,-2 A5,5 0 0 1 2,-4 A4,4 0 0 1 8,2 A3,3 0 0 1 7,5Z"
      },
      "color": {
       "value": "#9CC3D6"
      },
      "tooltip": [
       {
        "field": "year",
        "title": "Year"
       },
       {
        "field": "enso",
        "title": "Pacific pattern"
       }
      ]
     }
    },
    {
     "mark": {
      "type": "tick",
      "thickness": 2,
      "size": 8,
      "color": "#6B5A48"
     },
     "transform": [
      {
       "filter": "datum.enso=='Neutral'"
      }
     ],
     "encoding": {
      "x": {
       "field": "year",
       "type": "quantitative",
       "scale": {
        "type": "linear",
        "domain": [
         1988.5,
         2025.5
        ],
        "nice": false
       },
       "axis": null
      },
      "y": {
       "value": 17
      }
     }
    }
   ]
  },
  {
   "name": "caps",
   "width": 820,
   "height": 150,
   "data": {
    "url": "data/processed/rain_vs_yield.csv"
   },
   "transform": [
    {
     "filter": "datum.state_code!='TAS'"
    },
    {
     "calculate": "datum.year-0.36",
     "as": "x0"
    },
    {
     "calculate": "datum.year+0.36",
     "as": "x1"
    }
   ],
   "layer": [
    {
     "data": {
      "url": "data/processed/climate_drivers.csv"
     },
     "transform": [
      {
       "calculate": "datum.year-0.5",
       "as": "x0"
      },
      {
       "calculate": "datum.year+0.5",
       "as": "year2"
      },
      {
       "filter": {
        "param": "yr"
       }
      }
     ],
     "mark": {
      "type": "rect",
      "color": "#FFFFFF",
      "opacity": 0.12,
      "stroke": "#F3EEDF",
      "strokeOpacity": 0.6,
      "cornerRadius": 8
     },
     "encoding": {
      "x": {
       "field": "x0",
       "type": "quantitative",
       "scale": {
        "type": "linear",
        "domain": [
         1988.5,
         2025.5
        ],
        "nice": false
       },
       "axis": null
      },
      "x2": {
       "field": "year2"
      },
      "y": {
       "value": 0
      },
      "y2": {
       "value": 150
      }
     }
    },
    {
     "mark": {
      "type": "rect",
      "cornerRadius": 6
     },
     "encoding": {
      "x": {
       "field": "x0",
       "type": "quantitative",
       "scale": {
        "type": "linear",
        "domain": [
         1988.5,
         2025.5
        ],
        "nice": false
       },
       "axis": null
      },
      "x2": {
       "field": "x1"
      },
      "y": {
       "field": "state_code",
       "type": "nominal",
       "sort": [
        "NSW",
        "VIC",
        "SA",
        "WA",
        "QLD"
       ],
       "axis": {
        "title": null,
        "labelColor": "#C9D6DC",
        "labelFontSize": 12,
        "domain": false,
        "ticks": false,
        "orient": "left"
       },
       "scale": {
        "paddingInner": 0.22
       }
      },
      "color": {
       "field": "rain_cool_pct_of_avg",
       "type": "quantitative",
       "scale": {
        "type": "threshold",
        "domain": [
         50,
         70,
         90,
         110,
         130,
         150
        ],
        "range": [
         "#8C510A",
         "#D8B365",
         "#F3DFA2",
         "#E3EFE9",
         "#A9DDD4",
         "#4FB3A6",
         "#01665E"
        ]
       },
       "legend": null
      },
      "tooltip": [
       {
        "field": "year",
        "title": "Year"
       },
       {
        "field": "state",
        "title": "State"
       },
       {
        "field": "rain_cool_mm",
        "title": "Rain, Apr–Oct (mm)",
        "format": ".0f"
       },
       {
        "field": "rain_cool_pct_of_avg",
        "title": "% of normal",
        "format": ".0f"
       }
      ]
     }
    }
   ]
  },
  {
   "name": "wheat",
   "width": 820,
   "height": 170,
   "data": {
    "url": "data/processed/crops_by_state.csv"
   },
   "transform": [
    {
     "filter": "datum.state_code=='AUS' && datum.crop=='wheat' && datum.year<=2025"
    },
    {
     "calculate": "datum.production_kt/1000",
     "as": "mt"
    }
   ],
   "layer": [
    {
     "data": {
      "url": "data/processed/climate_drivers.csv"
     },
     "transform": [
      {
       "calculate": "datum.year-0.5",
       "as": "x0"
      },
      {
       "calculate": "datum.year+0.5",
       "as": "year2"
      },
      {
       "filter": {
        "param": "yr"
       }
      }
     ],
     "mark": {
      "type": "rect",
      "color": "#FFFFFF",
      "opacity": 0.12,
      "stroke": "#F3EEDF",
      "strokeOpacity": 0.6,
      "cornerRadius": 8
     },
     "encoding": {
      "x": {
       "field": "x0",
       "type": "quantitative",
       "scale": {
        "type": "linear",
        "domain": [
         1988.5,
         2025.5
        ],
        "nice": false
       },
       "axis": null
      },
      "x2": {
       "field": "year2"
      },
      "y": {
       "value": 0
      },
      "y2": {
       "value": 170
      }
     }
    },
    {
     "mark": {
      "type": "area",
      "color": "#C8901E",
      "opacity": 0.95,
      "interpolate": "monotone",
      "line": {
       "color": "#F0C766",
       "strokeWidth": 2
      }
     },
     "encoding": {
      "x": {
       "field": "year",
       "type": "quantitative",
       "scale": {
        "type": "linear",
        "domain": [
         1988.5,
         2025.5
        ],
        "nice": false
       },
       "axis": null
      },
      "y": {
       "field": "mt",
       "type": "quantitative",
       "scale": {
        "domain": [
         0,
         45
        ]
       },
       "axis": {
        "title": null,
        "values": [
         0,
         10,
         20,
         30,
         40
        ],
        "orient": "right",
        "grid": true,
        "domain": false,
        "ticks": false,
        "labelColor": "#C9D6DC",
        "labelExpr": "datum.value==40 ? '40 Mt' : datum.value"
       }
      }
     }
    },
    {
     "mark": {
      "type": "point",
      "filled": true,
      "size": 70,
      "color": "#F3EEDF",
      "opacity": 0
     },
     "encoding": {
      "x": {
       "field": "year",
       "type": "quantitative",
       "scale": {
        "type": "linear",
        "domain": [
         1988.5,
         2025.5
        ],
        "nice": false
       }
      },
      "y": {
       "field": "mt",
       "type": "quantitative"
      },
      "tooltip": [
       {
        "field": "season",
        "title": "Season"
       },
       {
        "field": "mt",
        "title": "Wheat harvest (Mt)",
        "format": ".1f"
       },
       {
        "field": "status",
        "title": "Type"
       }
      ]
     }
    }
   ]
  },
  {
   "name": "roots",
   "width": 820,
   "height": 120,
   "data": {
    "url": "data/processed/farm_income.csv"
   },
   "transform": [
    {
     "filter": "datum.year<=2025"
    },
    {
     "lookup": "year",
     "from": {
      "data": {
       "url": "data/processed/climate_drivers.csv"
      },
      "key": "year",
      "fields": [
       "enso"
      ]
     }
    },
    {
     "calculate": "datum.real_net_value_m/1000",
     "as": "b"
    },
    {
     "calculate": "datum.year-0.36",
     "as": "x0"
    },
    {
     "calculate": "datum.year+0.36",
     "as": "x1"
    }
   ],
   "layer": [
    {
     "data": {
      "url": "data/processed/climate_drivers.csv"
     },
     "transform": [
      {
       "calculate": "datum.year-0.5",
       "as": "x0"
      },
      {
       "calculate": "datum.year+0.5",
       "as": "year2"
      },
      {
       "filter": {
        "param": "yr"
       }
      }
     ],
     "mark": {
      "type": "rect",
      "color": "#FFFFFF",
      "opacity": 0.12,
      "stroke": "#F3EEDF",
      "strokeOpacity": 0.6,
      "cornerRadius": 8
     },
     "encoding": {
      "x": {
       "field": "x0",
       "type": "quantitative",
       "scale": {
        "type": "linear",
        "domain": [
         1988.5,
         2025.5
        ],
        "nice": false
       },
       "axis": null
      },
      "x2": {
       "field": "year2"
      },
      "y": {
       "value": 0
      },
      "y2": {
       "value": 120
      }
     }
    },
    {
     "mark": {
      "type": "rect",
      "cornerRadiusBottomLeft": 5,
      "cornerRadiusBottomRight": 5
     },
     "encoding": {
      "x": {
       "field": "x0",
       "type": "quantitative",
       "scale": {
        "type": "linear",
        "domain": [
         1988.5,
         2025.5
        ],
        "nice": false
       },
       "axis": {
        "title": null,
        "values": [
         1989,
         1994,
         1999,
         2004,
         2009,
         2014,
         2019,
         2024
        ],
        "format": "d",
        "labelColor": "#C9D6DC",
        "labelExpr": "datum.value",
        "grid": false,
        "orient": "bottom",
        "domain": false,
        "ticks": false
       }
      },
      "x2": {
       "field": "x1"
      },
      "y": {
       "field": "b",
       "type": "quantitative",
       "scale": {
        "domain": [
         0,
         27
        ],
        "reverse": true
       },
       "axis": {
        "title": null,
        "values": [
         0,
         10,
         20
        ],
        "orient": "right",
        "labelColor": "#C9D6DC",
        "grid": true,
        "domain": false,
        "ticks": false,
        "labelExpr": "'$'+datum.value+'b'"
       }
      },
      "y2": {
       "datum": 0
      },
      "color": {
       "field": "enso",
       "type": "nominal",
       "scale": {
        "domain": [
         "El Nino",
         "La Nina",
         "Neutral"
        ],
        "range": [
         "#E7A04B",
         "#9CC3D6",
         "#6B5A48"
        ]
       },
       "legend": null
      },
      "tooltip": [
       {
        "field": "season",
        "title": "Season"
       },
       {
        "field": "b",
        "title": "Left for farmers after costs ($b, today's money)",
        "format": ".1f"
       },
       {
        "field": "enso",
        "title": "Pacific pattern"
       }
      ]
     }
    }
   ]
  }
 ],
 "spacing": 4
}
```
