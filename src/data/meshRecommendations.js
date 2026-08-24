/**
 * Screen mesh recommendation charts rebranded for Pro Screen Australia.
 * Source charts adapted from DeSite guidance; imperial sizes kept
 * (industry standard) with approximate mm equivalents for NZ readers.
 * Grade photos sourced from idmcabc.com/screening-recomendation for product-size perception.
 */

function row(mesh, pattern, product, mmHint) {
  return { mesh, pattern, product, mmHint }
}

function img(file, alt) {
  return { src: `/images/mesh-guide/${file}`, alt }
}

export const squareChart = [
  row('5/32" x 5/32"', 'Square', '1/16"', '~4 mm mesh → ~1.5 mm product'),
  row('1/4" x 1/4"', 'Square', '1/8"', '~6 mm mesh → ~3 mm product'),
  row('3/8" x 3/8"', 'Square', '1/4"', '~10 mm mesh → ~6 mm product'),
  row('1/2" x 1/2"', 'Square', '3/8"', '~13 mm mesh → ~10 mm product'),
  row('1" x 1"', 'Square', '3/4"', '~25 mm mesh → ~19 mm product'),
  row('2" x 2"', 'Square', '1-1/2"', '~50 mm mesh → ~38 mm product'),
  row('3" x 3"', 'Square', '2"', '~75 mm mesh → ~50 mm product'),
  row('4" x 4"', 'Square', '3"', '~100 mm mesh → ~75 mm product'),
]

export const elongatedChart = [
  row('3/8" x 4"', 'Elongated', '1/4" to 5/16"', '~10 x 100 mm'),
  row('1/2" x 4"', 'Elongated', '3/8" to 7/16"', '~13 x 100 mm'),
  row('3/4" x 4"', 'Elongated', '1/2" to 9/16"', '~19 x 100 mm'),
  row('1" x 4"', 'Elongated', '3/4" to 7/8"', '~25 x 100 mm'),
]

/** Visual grade strip for quick product-size perception */
export const gradeGallery = [
  img('compost.jpg', 'Screened compost product example'),
  img('wood-mulch.jpg', 'Screened wood mulch product example'),
  img('commercial-triple-mix.jpg', 'Commercial / triple-mix topsoil example'),
  img('pea-stone.jpg', 'Pea stone product example'),
  img('decorative-stone.jpg', 'Decorative stone product example'),
  img('top-coarse-gravel.jpg', 'Top coarse gravel product example'),
  img('septic-stone.jpg', 'Septic stone product example'),
  img('base-rock-gravel.jpg', 'Base rock gravel product example'),
  img('ground-asphalt.jpg', 'Ground asphalt product example'),
  img('crushed-concrete.jpg', 'Crushed concrete product example'),
  img('erosion-control-rock.jpg', 'Erosion control rock product example'),
]

export const meshSections = [
  {
    id: 'charts',
    title: 'Base Mesh Charts',
    intro:
      'Use these square and elongated charts as a starting point. Final product size is typically a little smaller than the mesh opening, depending on material and moisture.',
    tables: [
      {
        title: 'Square Mesh',
        headers: ['Mesh Size', 'Pattern', 'Product Size', 'Approx. Metric'],
        rows: squareChart.map((r) => [r.mesh, r.pattern, r.product, r.mmHint]),
      },
      {
        title: 'Elongated Mesh',
        headers: ['Mesh Size', 'Pattern', 'Product Size', 'Approx. Metric'],
        rows: elongatedChart.map((r) => [r.mesh, r.pattern, r.product, r.mmHint]),
      },
    ],
  },
  {
    id: 'topsoil',
    title: 'Topsoil and Triple Mix',
    intro:
      'Topsoil is in demand and profitable. Some customers want a very fine finish; others prefer commercial-grade product at a sharper price point.',
    tables: [
      {
        title: 'Top Dressing Mesh Recommendation',
        headers: ['Mesh Size', 'Product Size'],
        rows: [
          ['1/8 x 4" elongated mesh', '1/16 minus product'],
          ['1/4 x 1/4 square mesh', '1/8 minus product'],
          ['1/4 x 4" elongated mesh', '1/8 minus product'],
          ['3/8 x 3/8 square mesh', '1/4 minus product'],
          ['3/8 x 4" elongated mesh', '1/4 minus product'],
        ],
      },
      {
        title: 'Fine Topsoil Mesh Recommendation',
        headers: ['Mesh Size', 'Product Size'],
        rows: [
          ['1/4 x 4" elongated mesh', '1/8 minus product'],
          ['3/8 x 4" elongated mesh', '1/4 minus product'],
          ['1/2 x 4" elongated mesh', '3/8 minus product'],
        ],
      },
      {
        title: 'Commercial Grade or Triple Mix Topsoil',
        headers: ['Mesh Size', 'Product Size'],
        note: 'A blend of topsoil, sand and compost that normally commands a premium price.',
        image: img('commercial-triple-mix.jpg', 'Commercial grade / triple-mix topsoil product grade'),
        rows: [
          ['1/2 x 1/2 square mesh', '1/4 minus product'],
          ['3/4 x 4" elongated mesh', '1/2 minus product'],
          ['1" x 4" elongated mesh', '3/4 minus product'],
          ['1" x 1" square mesh', '1/2 minus product'],
          ['2" x 2" square mesh', '1-1/4 minus product'],
          ['3" x 3" square mesh', '2" minus product'],
          ['4" x 4" square mesh', '3" minus product'],
        ],
      },
    ],
  },
  {
    id: 'compost',
    title: 'Compost',
    intro:
      'Compost can be finished as a top-dressing fertiliser / soil builder, or blended with sand and topsoil to create triple mix.',
    image: img('compost.jpg', 'Screened compost product grade example'),
    tables: [
      {
        title: 'Compost Mesh Recommendation',
        headers: ['Mesh Size', 'Product Size'],
        rows: [
          ['3/8 x 3/8 square mesh', '1/4 minus product'],
          ['3/8 x 4" elongated mesh', '1/4 minus product'],
          ['1/2 x 1/2 square mesh', '3/8 minus product'],
          ['3/4 x 4" elongated mesh', '1/2 minus product'],
          ['1" x 4" elongated mesh', '3/4 minus product'],
          ['1" x 1" square mesh', '3/4 minus product'],
        ],
      },
    ],
  },
  {
    id: 'mulch',
    title: 'Wood Mulch',
    intro:
      'Wood mulch is a light product that moves differently across the deck than soil or aggregate. Run a slightly larger mesh. Many operators screen out fines and mix them into topsoil for slow-release decomposition — a practical way to recycle wood fines.',
    image: img('wood-mulch.jpg', 'Screened wood mulch product grade example'),
    tables: [
      {
        title: 'Wood Mulch Mesh Recommendation',
        headers: ['Mesh Size', 'Product Size'],
        rows: [
          ['1/2 x 1/2 square mesh', '1/4 minus product'],
          ['3/4 x 4" elongated mesh', '1/2 minus product'],
          ['1" x 4" elongated mesh', '3/4 minus product'],
          ['1" x 1" square mesh', '1/2 minus product'],
          ['2" x 2" square mesh', '1-1/4 minus product'],
          ['3" x 3" square mesh', '2" minus product'],
          ['4" x 4" square mesh', '3" minus product'],
        ],
      },
    ],
  },
  {
    id: 'farm-filling',
    title: 'Farm Gravel, Cow Races and Filling',
    intro:
      'Immediate market offer: 100 mm mesh first to knock off oversize, then a 50 mm or 3 inch (~75 mm) secondary to make filling material. Riverbed stone that has rounded on farm makes stronger cow races than sharp crushed product. Exact 70 mm is not a listed stock square — 50 mm and 3 inch (~75 mm) are the nearest DeSite openings; 70 mm can be special-ordered.',
    tables: [
      {
        title: 'First pass — oversize',
        headers: ['Mesh Size', 'Approx. Metric', 'Use'],
        note: 'Lead with 100 mm / 4″ on a Static Grizzly or Proscreen. Same opening contractors already spec for oversize gravel.',
        rows: [
          ['4" x 4" square (grizzly)', '~100 mm mesh → ~75 mm product', 'Knock off cobbles from farm river gravel'],
          ['100 mm square (Proscreen)', '~100 mm', 'Same first pass on a vibratory deck'],
        ],
      },
      {
        title: 'Second pass — filling material',
        headers: ['Mesh Size', 'Approx. Metric', 'Use'],
        note: 'Filling for cow races, farm tracks and civil fill. 50 mm and 3 inch (~75 mm) are stock; 70 mm is special-order if the spec is exact.',
        rows: [
          ['2" x 2" square', '~50 mm mesh → ~38 mm product', 'Tighter filling material'],
          ['3" x 3" square', '~75 mm mesh → ~50 mm product', 'Nearest stock opening to 70 mm'],
          ['70 mm square (special order)', '~70 mm', 'Order if the race or fill spec names 70 mm exactly'],
        ],
      },
    ],
  },
  {
    id: 'aggregates',
    title: 'Aggregate Products',
    intro:
      'Wider square mesh (including 2″, 3″ and 4″ grizzly openings) is commonly sought for durable aggregate separation, road base and recycled materials. Photos show typical finished grades for visual comparison.',
    tables: [
      {
        title: 'Pea Stone',
        headers: ['Mesh Size', 'Product Size'],
        note: 'Often used in playgrounds or for decoration. Pea stone usually commands a premium because most aggregate is crushed and too sharp.',
        image: img('pea-stone.jpg', 'Pea stone product grade example'),
        rows: [
          ['3/8 x 3/8 square mesh', '1/4 minus product'],
          ['1/2 x 1/2 square mesh', '3/8 minus product'],
          ['1/2 x 4" elongated mesh', '3/8 minus product'],
          ['1" x 1" square mesh', '3/4 minus product'],
        ],
      },
      {
        title: 'Decorative Stone',
        headers: ['Mesh Size', 'Product Size'],
        note: 'Where outdoor watering is restricted, decorative rock is a manageable and cost-effective landscaping solution.',
        image: img('decorative-stone.jpg', 'Decorative stone product grade example'),
        rows: [
          ['3/4 x 4" elongated mesh', '5/8 minus product'],
          ['1" x 1" square mesh', '3/4 minus product'],
          ['1-1/4 x 1-1/4 square mesh', '7/8 minus product'],
          ['1-1/2 x 1-1/2 square mesh', '1-1/8 minus product'],
          ['2" x 2" square mesh', '1-1/2 minus product'],
          ['3" x 3" square mesh', '2-1/4 minus product'],
          ['4" x 4" square mesh', '3-1/4 minus product'],
        ],
      },
      {
        title: 'Top Coarse Gravel',
        headers: ['Mesh Size', 'Product Size'],
        note: 'Finer road gravel works well for capping roadways.',
        image: img('top-coarse-gravel.jpg', 'Top coarse gravel product grade example'),
        rows: [
          ['3/4 x 4" elongated mesh', '5/8 minus product'],
          ['1" x 1" square mesh', '3/4 minus product'],
          ['1-1/4 x 1-1/4 square mesh', '7/8 minus product'],
          ['1-1/2 x 1-1/2 square mesh', '1-1/8 minus product'],
        ],
      },
      {
        title: 'Septic Stone',
        headers: ['Mesh Size', 'Product Size'],
        note: 'Many regions still use stone in septic fields for the evaporation process.',
        image: img('septic-stone.jpg', 'Septic stone product grade example'),
        rows: [
          ['1/2 x 1/2 square mesh', '3/8 minus product'],
          ['3/4 x 4" elongated mesh', '5/8 minus product'],
          ['1" x 1" square mesh', '3/4 minus product'],
          ['1-1/4 x 1-1/4 square mesh', '7/8 minus product'],
        ],
      },
      {
        title: 'Base Rock Gravel',
        headers: ['Mesh Size', 'Product Size'],
        note: 'Separating smaller gravel makes a more stable road base. Fines can then be spread on top of the base course for a gradeable surface.',
        image: img('base-rock-gravel.jpg', 'Base rock gravel product grade example'),
        rows: [
          ['1-1/2 x 1-1/2 square mesh', '1-1/8 minus product'],
          ['2" x 2" square mesh', '1-1/2 minus product'],
          ['3" x 3" square mesh', '2-1/4 minus product'],
          ['4" x 4" square mesh', '3-1/4 minus product'],
        ],
      },
      {
        title: 'Ground Asphalt',
        headers: ['Mesh Size', 'Product Size'],
        note: 'Screening recycled asphalt from repaving projects is popular. Fines often go on driveways; larger material suits roads and yards with heavier traffic.',
        image: img('ground-asphalt.jpg', 'Ground asphalt product grade example'),
        rows: [
          ['3/4 x 4" elongated mesh', '5/8 minus product'],
          ['1" x 1" square mesh', '3/4 minus product'],
          ['1-1/4 x 1-1/4 square mesh', '7/8 minus product'],
          ['1-1/2 x 1-1/2 square mesh', '1-1/8 minus product'],
          ['2" x 2" square mesh', '1-1/2 minus product'],
        ],
      },
      {
        title: 'Crushed Concrete',
        headers: ['Mesh Size', 'Product Size'],
        note: 'Screened crushed concrete makes excellent base material when building roads.',
        image: img('crushed-concrete.jpg', 'Crushed concrete product grade example'),
        rows: [
          ['3/4 x 4" elongated mesh', '5/8 minus product'],
          ['1" x 1" square mesh', '3/4 minus product'],
          ['1-1/4 x 1-1/4 square mesh', '7/8 minus product'],
          ['1-1/2 x 1-1/2 square mesh', '1-1/8 minus product'],
          ['2" x 2" square mesh', '1-1/2 minus product'],
          ['3" x 3" square mesh', '2-1/4 minus product'],
          ['4" x 4" square mesh', '3-1/4 minus product'],
        ],
      },
      {
        title: 'Erosion Control Rock',
        headers: ['Mesh Size', 'Product Size'],
        note: 'Erosion control rock stabilises slopes and areas around culverts during heavy rain.',
        image: img('erosion-control-rock.jpg', 'Erosion control rock product grade example'),
        rows: [
          ['1/2 x 4" elongated mesh', '3/8 minus product'],
          ['3/4 x 4" elongated mesh', '1/2 minus product'],
          ['1" x 4" elongated mesh', '3/4 minus product'],
          ['1" x 1" square mesh', '3/4 minus product'],
          ['1-1/4 x 1-1/4 square mesh', '7/8 minus product'],
          ['1-1/2 x 1-1/2 square mesh', '1-1/8 minus product'],
        ],
      },
    ],
  },
]

export const meshNav = [
  { id: 'charts', label: 'Charts' },
  { id: 'topsoil', label: 'Topsoil' },
  { id: 'compost', label: 'Compost' },
  { id: 'mulch', label: 'Mulch' },
  { id: 'farm-filling', label: 'Farm & filling' },
  { id: 'aggregates', label: 'Aggregates' },
]
