// Pure calculation logic (also usable from Node for tests)
function computeCost(d) {
  const ing = (d.ingredients || []).reduce((s, r) => {
    const size = +r.pkgSize, price = +r.pkgPrice, used = +r.used;
    return s + (size > 0 ? (used / size) * price : 0);
  }, 0);
  const labor = (+d.laborHours || 0) * (+d.laborRate || 0);
  const overhead = (ing + labor) * ((+d.overheadPct || 0) / 100) + (+d.packaging || 0);
  const total = ing + labor + overhead;
  const yieldN = Math.max(+d.yield || 1, 1);
  const costPerItem = total / yieldN;
  const pricePerItem = costPerItem * (1 + (+d.markupPct || 0) / 100);
  const r2 = x => Math.round(x * 100) / 100;
  return { ingredients: r2(ing), labor: r2(labor), overhead: r2(overhead), total: r2(total),
    costPerItem: r2(costPerItem), pricePerItem: r2(pricePerItem), batchPrice: r2(pricePerItem * yieldN),
    profitPerItem: r2(pricePerItem - costPerItem) };
}
if (typeof module !== 'undefined') module.exports = { computeCost };
