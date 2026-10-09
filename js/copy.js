/* =====================================================================
   PAGE TEXT: every word the reader sees, one block per section,
   in the order the sections appear on the page.

   How to edit
   - Text sits between backticks `like this`, so ' and " are safe to type.
   - Keep the names before each colon (heading:, bridge: ...). index.html
     finds each piece of text by that name (data-copy="guess.heading").
   - <br>, <strong> and <em> work inside the text.
   - Lines written as  x => `...${x}...`  are sentences that fill in a
     number from the data. Rewrite the words, keep the ${...} parts.

   Not in this file
   - The browser tab title and search description: <head> of index.html.
   - Chart alt text (aria-label on each chart): index.html, next to each chart.
   - Footer (sources, credits, use of AI): bottom of index.html.
   - Words drawn inside the charts (chart titles, axis titles, labels such as
     "40.5 Mt, a record"): the chart's own js/*.vl.json file. See the list at
     the bottom of this file.
   ===================================================================== */

const COPY = {

  /* ---------- Hero ---------- */
  hero: {
    skip: `Skip to the story`,
    title: `When the<br>rain stops`,
    lede: `For Australia’s grain farmers, one season of rain decides whether the paddocks give a little or a lot. Here are 37 harvests, 1989 to 2025, and the rain behind each one.`,
  },

  /* ---------- 1. Guess the 2019 harvest ---------- */
  guess: {
    heading: `Guess the 2019 harvest`,
    intro: `In 2016, a good year, Australia grew 31.8 million tonnes of wheat. 2019 was the driest year Australia has ever recorded. Drag the empty bar to your guess.`,
    hint: `Your guess stays on the page and comes back in the last section.`,
    slider: `Or set your guess:`,
    button: `Show the real harvest`,
    buttonDone: `Real harvest shown`,
    // After the button: a big line, then a smaller line underneath.
    resultBig: `Less than half.`,
    resultSmall: (actual, guess, how) => `The real 2019 harvest was ${actual} Mt, under half of 2016. You guessed ${guess} Mt. ${how}`,
    spotOn: `Spot on.`,
    off: (mt, highOrLow) => `You were ${mt} Mt ${highOrLow}.`,
    tooHigh: `too high`,
    tooLow: `too low`,
    bridge: `To see why a dry year hurts so much, start with where the rain falls.`,
  },

  /* ---------- 2. Only a thin wet crescent can grow grain ---------- */
  crescent: {
    heading: `Only a thin wet crescent can grow grain`,
    intro: `Most of the continent is the colour of sand: too dry to farm. Wheat grows on the curve where the colour turns green-blue, around Perth, Adelaide, Melbourne and inland Sydney. Australia is about 23 times the size of Malaysia, and most of it is in that sand.`,
    bridge: `Grain grows only on that crescent, so a dry year there shows up in the national harvest.`,
  },

  /* ---------- 3. 37 seasons, side by side (the panorama) ---------- */
  seasons: {
    heading: `37 seasons, side by side`,
    intro: `Each column is one growing season, 1989 to 2025. Read it from the top down: the Pacific pattern that year, the rain each state got from April to October, the wheat harvest, and the money farmers kept after paying their costs.`,
    legendElNino: `El Niño (usually dry)`,
    legendLaNina: `La Niña (usually wet)`,
    legendNeutral: `Neutral`,
    legendRain: `Rain, % of normal:`,
    yearPick: `Or choose a year:`,
    statElNino: `El Niño years: <strong>16.2 Mt</strong> of wheat on average.`,
    statLaNina: `La Niña years: <strong>27.0 Mt</strong>.`,
    noteElNino: `El Niño is a natural swing in Pacific Ocean temperatures that usually brings dry winters to eastern Australia. Harvests have also grown over time, so a dry or wet year is only part of why one harvest beats another.`,
    note2019: `2019 had no El Niño. The Bureau of Meteorology says a very strong pattern in the Indian Ocean dried the country instead: the driest year Australia has recorded, 277.6 mm.`,
    hint: `Click or tap any year: the light column moves, and the charts further down the page that run through time follow that year.`,
    bridge: `The dry columns keep landing on the dips. New South Wales shows the link most plainly.`,
    // The card beside the panorama for the chosen year.
    cardWheat: (mt, status) => `Wheat: ${mt} Mt${status ? ' (ABARES ' + status + ')' : ''}.`,
    cardRain: pct => `NSW rain: ${pct}% of normal.`,
    cardMoney: b => `Farmers kept $${b}b.`,
    cardPacific: name => `Pacific: ${name}.`,
    elNino: `El Niño`,
    laNina: `La Niña`,
    neutral: `no El Niño or La Niña`,
  },

  /* ---------- 4. In New South Wales the harvest follows the rain ---------- */
  nsw: {
    heading: `In New South Wales the harvest follows the rain`,
    intro: `Each grain is one year, joined in time order. Dry seasons sit low and to the left; wet seasons high and to the right. In 2019 NSW got about 40% of its normal rain, and its wheat yield fell to about 41% of normal.`,
    farmer: `<strong>Be the farmer.</strong> Pick how much rain falls from April to October:`,
    // Readout under the slider.
    noSeason: (lo, hi) => `No season since 1989 got ${lo}–${hi} mm in NSW.`,
    seasons: (count, lo, hi, years) => `${count === 1 ? 'One season' : count + ' seasons'} got ${lo}–${hi} mm: ${years}. `,
    yield: range => `Wheat yielded ${range} tonnes a hectare.`,
    hint: `Drag the rain slider: the grains that got that much rain turn brown. Hover any grain or state for its numbers.`,
    bridge: `It holds almost everywhere, except Western Australia, the biggest grower of all.`,
  },

  /* ---------- 5. WA's rain average is mostly desert ---------- */
  wa: {
    heading: `WA’s rain average is mostly desert`,
    intro: `Western Australia’s yields barely move with its statewide rain, because the state average is mostly desert. The wheat is in the thin south-west corner, which this average hides.`,
    note: `Over the 37 seasons, a wetter season goes with a bigger harvest far more reliably in NSW than in WA: a correlation of 0.62 in NSW, but only 0.24 in WA.`,
    bridge: `Back in the east, one state swings harder than any other between a dry year and a wet one.`,
  },

  /* ---------- 6. NSW swings hardest: from fourth to second ---------- */
  swing: {
    heading: `NSW swings hardest: from fourth to second`,
    intro: `Between 2019, the driest year on record, and 2022, the record harvest, every mainland state’s wheat yield rose. New South Wales rose the most: from 0.8 to 3.0 tonnes a hectare. It went from the fourth-biggest wheat grower to the second.`,
    hint: `Hover a state to light it up in both charts. Tasmania grows too little wheat to show.`,
    bridge: `Wheat isn’t the only crop in the paddock. Does everything else rise and fall with it?`,
  },

  /* ---------- 7. The whole paddock rises and falls ---------- */
  paddock: {
    heading: `The whole paddock rises and falls`,
    intro: `Barley and canola grow in the same season and on the same farms as wheat. Stacked together, all three shrink in the drought years.`,
    // Note under the diverging bars. pct values arrive already formatted (+3%).
    barley: (aus, vic, nsw) => `In 2019 barley held steady (${aus}). The state data shows where it held up: Victoria grew ${vic}% more barley than its five-year average, while New South Wales grew ${nsw}% less.`,
    bridge: `Across 37 seasons, the rain, the harvest and the money have moved together.`,
  },

  /* ---------- 8. Night: when the rain stops, the harvest stops ---------- */
  end: {
    heading: `When the rain stops, the harvest stops`,
    lead: `In the worst dry years, Australia’s wheat harvest fell by half and farmers kept about half as much money. In the wettest, they broke records on both. ABARES expects a smaller crop in 2026–27: 29.9 Mt, down from 36.0 Mt.`,
    // Last line, which brings back the reader's guess from section 1.
    callback: (guess, actual) => `You guessed ${guess} Mt for 2019. Now you know why it was ${actual}.`,
    callbackNoGuess: actual => `In 2019 the harvest was ${actual} Mt. Now you know why.`,
  },
};

/* ---------------------------------------------------------------------
   Words inside the charts (edit them in the chart file named):
   guess.vl.json        "your guess", "half of 2016", axis titles
   map_isohyets.vl.json "The wheat belt", city labels, legend titles
   panorama.vl.json     row titles ("Pacific pattern that year", ...), the
                        notes "10.1 Mt", "40.5 Mt, a record", "farmers kept
                        almost nothing" (built from the data in "calculate" lines)
   nsw_scatter.vl.json  axis titles, year labels
   choropleths.vl.json  map titles ("Rain, April–October, 2019", ...)
   wa_map.vl.json       "Where WA is", desert note, legend
   wa_scatter.vl.json   axis titles
   swing.vl.json        chart titles, "about 3.5 times more"
   streamgraph.vl.json  title and subtitle
   diverging.vl.json    title
   --------------------------------------------------------------------- */

// Put each piece of text into the element that names it with data-copy="block.name".
document.querySelectorAll('[data-copy]').forEach(el => {
  const text = el.dataset.copy.split('.').reduce((o, k) => (o ? o[k] : undefined), COPY);
  if (typeof text === 'string') el.innerHTML = text;
  else console.warn('copy.js has no text for', el.dataset.copy);
});
