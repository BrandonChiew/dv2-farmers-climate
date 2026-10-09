// When the rain stops — embeds every chart and links them together.
const views = {};
window.views = views; // handy for checking signal names in the console

const OPTS = { actions: false, renderer: 'svg' };
const ACTUAL_2019 = 14.5; // shown only after the reveal; the chart reads it from crops_by_state.csv

function embed(id, spec) {
  return vegaEmbed('#' + id, 'js/' + spec, OPTS).then(res => {
    views[id] = res.view;
    return res.view;
  }).catch(err => console.error(spec, err));
}

/* ---------- Guess the 2019 harvest ---------- */
function readGuess() {
  try { const g = parseFloat(sessionStorage.getItem('guess2019')); if (!isNaN(g)) return g; } catch (e) {}
  return null;
}
function saveGuess(g) {
  window.__guess = g;
  try { sessionStorage.setItem('guess2019', g); } catch (e) {}
  updateCallback();
}
function updateCallback() {
  const el = document.getElementById('guess-callback');
  if (!el) return;
  const g = window.__guess;
  el.textContent = g == null
    ? `In 2019 the harvest was ${ACTUAL_2019} Mt. Now you know why.`
    : `You guessed ${g.toFixed(1)} Mt for 2019. Now you know why it was ${ACTUAL_2019}.`;
}

function setupGuess(view) {
  const input = document.getElementById('guess-input');
  const out = document.getElementById('guess-out');
  const button = document.getElementById('reveal');
  const result = document.getElementById('guess-result');
  const fields = view.signal('pick_tuple_fields');
  const unit = view.data('pick_store')[0].unit;

  const show = g => { input.value = g; out.textContent = g.toFixed(1) + ' Mt'; };
  // Slider -> chart: replace the selection store with the chosen rung.
  const setChart = g => view.data('pick_store', [{ unit, fields, values: [g] }]).runAsync();

  const start = readGuess();
  if (start != null) setChart(start);
  show(start != null ? start : 25);
  window.__guess = start;
  updateCallback();

  // Chart drag -> slider and storage.
  view.addSignalListener('pick', (name, value) => {
    const g = value && value.mt_pick ? value.mt_pick[0] : null;
    if (g == null) return;
    show(g); saveGuess(g);
  });
  input.addEventListener('input', () => {
    const g = parseFloat(input.value);
    show(g); setChart(g); saveGuess(g);
  });

  button.addEventListener('click', () => {
    view.signal('reveal', true).runAsync();
    if (window.__guess == null) saveGuess(parseFloat(input.value));
    const g = window.__guess, diff = g - ACTUAL_2019;
    const how = Math.abs(diff) < 0.75 ? 'Spot on.'
      : `You were ${Math.abs(diff).toFixed(1)} Mt ${diff > 0 ? 'too high' : 'too low'}.`;
    result.innerHTML = `Less than half.<span>The real 2019 harvest was ${ACTUAL_2019} Mt, under half of 2016. You guessed ${g.toFixed(1)} Mt. ${how}</span>`;
    button.disabled = true;
    button.textContent = 'Real harvest shown';
  });
}

// Wait for web fonts so Vega measures text with the right typeface.
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
  embed('c-guess', 'guess.vl.json').then(v => v && setupGuess(v));
  embed('c-map', 'map_isohyets.vl.json');
});
