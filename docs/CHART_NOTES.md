# Chart notes

One paragraph per chart, in page order: what it shows, the idiom, the data fields it reads, and why that idiom fits the job. All files are in `data/processed/`. "Season" means a growing season: the 2019–20 crop is matched to the April to October 2019 rain.

## 1. Guess the 2019 harvest (`guess.vl.json`)
Shows the 2016 wheat harvest (31.8 Mt) next to an empty bar where the reader drags in a guess for 2019, then reveals the real 14.5 Mt. The idiom is a bar chart with a "guess first" drag interaction: a point selection on a ladder of invisible rungs that follows the pointer while the button is held, plus a `reveal` signal fired by the button. Data: `crops_by_state.csv`, rows where `state_code` is AUS and `crop` is wheat, `production_kt` for 2016 and 2019. Bars suit one comparison of two amounts, and making the reader commit to a number first makes the drop feel bigger than if we just stated it.

## 2. Rainfall map with wheat circles (`map_isohyets.vl.json`)
Shows how much rain falls across Australia in an average year, with the wheat belt outlined in gold and a circle per state sized by how much wheat it grows. Two map idioms on one map: an isohyet map (a scalar field drawn as rainfall bands) and proportional symbols. Data: `isohyets_annual_avg.topojson` (`band`), `wheatbelt_outline.geojson`, `aus_states.topojson`, and `crops_by_state.csv` (`production_kt` for wheat, averaged over 2015 to 2024 per state). Rain is continuous over space, so bands show it better than state colours would, and circles on top let the reader see that the wheat sits only where the bands turn green.

## 3. The panorama: 37 seasons (`panorama.vl.json`)
Four rows that share one year axis from 1989 to 2025: the Pacific pattern (sun for El Niño, cloud for La Niña), a rain "capsule" per state, the national wheat harvest, and the money farmers kept hanging below like roots. The idiom is layered, aligned small multiples (a vertical concat), with a heatmap row of capsules, an area chart and a downward bar ("roots") row. Data: `climate_drivers.csv` (`enso`), `rain_vs_yield.csv` (`rain_cool_pct_of_avg` per state), `crops_by_state.csv` (AUS wheat `production_kt`), `farm_income.csv` (`real_net_value_m`). Lining the rows up on the same years lets the eye run down one column and see that a dry year, a small harvest and low income tend to happen together; clicking a column sets the year for the whole page.

## 4. NSW connected scatterplot (`nsw_scatter.vl.json`)
Each dot is one NSW season, placed by April to October rain (x) and wheat yield (y), joined in time order. The idiom is a connected scatterplot, with a "be the farmer" rain slider that turns the seasons inside the chosen rain window brown. Data: `rain_vs_yield.csv`, NSW rows: `rain_cool_mm`, `wheat_yield_t_ha`, `rain_cool_pct_of_avg`, `yield_pct_of_avg`, `year`. A scatterplot is the standard way to show a relationship between two numbers, and joining the dots in order keeps the time story (for example the fall into 2018 and 2019 and the jump to 2022).

## 5. Choropleth small multiples (`choropleths.vl.json`)
Four maps of the states: rain in 2019 and 2022 on the top row, wheat yield in the same two years below, each state coloured by percent of its own normal. The idiom is choropleth small multiples on a 2 × 2 grid with one shared diverging colour scale (brown below normal, teal above). Data: `aus_states.topojson`, `rain_vs_yield.csv` (`rain_cool_pct_of_avg`, `yield_pct_of_avg`, `rain_cool_mm`, `wheat_yield_t_ha`). Comparing each state with its own normal is fair across very different states, and putting the four maps in a grid makes "brown above brown, teal above teal" easy to see.

## 6. WA rain map with locator (`wa_map.vl.json`)
Shows Western Australia in red earth, with rainfall bands only in the south-west corner where the wheat grows, and a small map of Australia showing where WA is. The idiom is a map with a rain-band overlay plus a locator map. Data: `aus_states.topojson`, `isohyets_sw_wa.geojson` (`band`). The map explains why the next chart is weak: the statewide rain average is mostly desert, and a picture of the state makes that obvious faster than words.

## 7. WA scatterplot (`wa_scatter.vl.json`)
Each dot is one WA season, statewide April to October rain against wheat yield. The idiom is a plain scatterplot, with the selected year highlighted. Data: `rain_vs_yield.csv`, WA rows: `rain_cool_mm`, `wheat_yield_t_ha`, `rain_cool_pct_of_avg`, `yield_pct_of_avg`. It uses the same yield axis (0 to 3.6 t/ha) as the NSW chart so the two can be compared: in NSW the dots line up, in WA they scatter (correlation 0.62 against 0.24, computed from the same file).

## 8. Dumbbell and slopegraph (`swing.vl.json`)
Left: each state's wheat yield in 2019 (brown dot) and 2022 (teal dot), joined by a line. Right: states ranked by wheat grown in 2019 and 2022, with a line from one rank to the other. The idioms are a dumbbell chart and a slopegraph, linked so hovering a state highlights it in both. Data: `crops_by_state.csv`, wheat rows for 2019 and 2022, `yield_t_ha` and `production_kt`, states except AUS and TAS. A dumbbell shows the size of a before-and-after change per category, and a slopegraph shows changes in order; together they show NSW gained the most yield and climbed from fourth to second.

## 9. Bump chart (`bump.vl.json`)
Ranks the five mainland states by wheat grown in every season from 1989 to 2025 (1 at the top). The idiom is a bump chart: rank on the y axis, one line per state, so lines cross when states swap places. Data: `crops_by_state.csv`, wheat rows, `production_kt` ranked within each `year`, plus `state_code` and `season`. It extends the slopegraph from two years to all 37, so the reader can see that WA is nearly always first and that NSW drops to fourth in dry years such as 1994, 2018 and 2019. It follows the page-wide year and shows that year's tonnes, and clicking a point chooses a year.

## 10. Streamgraph (`streamgraph.vl.json`)
Shows wheat, barley and canola grown in Australia each season, stacked around a centre line, with the total marked in 2002, 2006, 2019 and 2022. The idiom is a streamgraph (a stacked area chart centred on zero). Data: `crops_by_state.csv`, AUS rows, `production_kt` by `crop` and `year`. A streamgraph shows the total and the parts over time at once, and the whole stream visibly narrows in the drought years.

## 11. Diverging bars (`diverging.vl.json`)
For the drought seasons 2002, 2006 and 2019, shows how far each crop's harvest was above or below the average of the five seasons before. The idiom is a diverging bar chart around zero. Data: `crops_by_state.csv`, AUS rows, `production_kt` per `crop`, with the five-year average computed in the spec. Bars going left or right from zero make "fell by about half" readable at a glance, and they show the exception: barley held steady in 2019.

## 12. Waffle charts (`waffle.vl.json`)
Three grids of 100 squares, each square 1% of the wheat, barley and canola grown that season: 2019, 2022, and the year chosen in the panorama. The idiom is a waffle chart (a part-to-whole chart made of countable squares). Data: `crops_by_state.csv`, AUS rows, `production_kt` per `crop`; the spec turns each crop's share into a number of squares. Waffles are easier to read than pie charts because you can count squares, and they show the mix changing: wheat is 54% in the drought year and 64% in the record year, while barley's share shrinks. The total in tonnes is printed under each heading because the share alone hides that 2022 was more than twice as big.

## 13. Lollipop chart (`lollipop.vl.json`)
One stick per season from 1994 to 2026 for the money farms kept after costs, in today's dollars, with each head shaded by that season's national wheat harvest. The idiom is a lollipop chart (a thin bar with a dot at the end), with a sequential colour on the heads. Data: `farm_income.csv` (`real_net_value_m`, `status`) joined by `year` to `crops_by_state.csv` (AUS wheat `production_kt`). A lollipop shows 33 values with less ink than 33 thick bars, which leaves room to colour the heads; pale heads (small harvests) sit low and dark heads sit high, so income and harvest can be compared in one chart. Dashed heads are ABARES estimates and the 2026 forecast; it follows the page-wide year, and clicking a head chooses a year.

## How the charts link
The panorama holds the selected year (default 2019). Choosing a year there, with the slider beside it, or by clicking a point in the bump chart or a head in the lollipop chart, moves the highlight in the NSW scatterplot, the WA scatterplot, the streamgraph, the bump chart, the lollipop chart and the third waffle. `js/main.js` passes the year to each chart through its `selYear` parameter.
