// When the rain stops — embeds every chart and links them together.
const views = {};
window.views = views; // handy for checking signal names in the console

const OPTS = { actions: false, renderer: 'svg' };

function embed(id, spec) {
  return vegaEmbed('#' + id, 'js/' + spec, OPTS).then(res => {
    views[id] = res.view;
    return res.view;
  }).catch(err => console.error(spec, err));
}

// Wait for web fonts so Vega measures text with the right typeface.
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
  // charts are added step by step
});
