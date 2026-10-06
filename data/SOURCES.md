# Data sources

All raw files were downloaded on 6 October 2026. Raw downloads live in `raw/`; the cleaned files the web page loads live in `processed/`.

| Folder | File(s) | Source | URL |
|---|---|---|---|
| `raw/bom/` | `rain_cool_<state>.txt` (Apr–Oct) and `rain_annual_<state>.txt`, 1900–2025 | Bureau of Meteorology, Australian climate variability & change – time series (area-averaged rainfall) | https://www.bom.gov.au/climate/change/ |
| `raw/bom/` | `rainan.zip` (average annual rainfall grid, ESRI ASCII) | Bureau of Meteorology, climate averages maps | https://www.bom.gov.au/climate/maps/averages/rainfall/ |
| `raw/abares/` | `03_AustCropRrt20260901_StateCropData_v1.0.0.xlsx` | ABARES, Australian Crop Report September 2026 (No. 219), state data | https://www.agriculture.gov.au/abares/research-topics/agricultural-outlook/australian-crop-report/september-2026 |
| `raw/abares/` | `02_AgCommodities202609_Tables_v1.0.0.xlsx`, `03_AgCommodities202609_Stats_v1.0.0.xlsx` | ABARES, Agricultural commodities September quarter 2026 | https://www.agriculture.gov.au/abares/research-topics/agricultural-outlook/data |
| `raw/abs/` | `STE_2021_AUST_SHP_GDA2020.zip` | Australian Bureau of Statistics, ASGS Edition 3 – States and Territories 2021 | https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs-edition-3/jul2021-jun2026/access-and-downloads/digital-boundary-files |
| `raw/fao/` | `faostat_wheat_export_tonnes_2019-2023.csv` (export quantity, tonnes) and `faostat_wheat_export_value_usd_2019-2023.csv` (export value, 1000 USD), Australia → all partner countries | FAO, FAOSTAT Detailed trade matrix | https://www.fao.org/faostat/en/#data/TM |

## Processed files
- `processed/rainfall_by_state.csv` — BOM series combined: state, year, cool-season mm, annual mm, cool-season % of 1961–1990 average.
