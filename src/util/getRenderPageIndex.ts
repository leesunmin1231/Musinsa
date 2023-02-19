export const getRenderPageIndex = (totalLength: number, pageSize: number, newPageLength: number) => {
  const prevPageIndex = totalLength % pageSize;
  if (newPageLength === 0 || prevPageIndex === 0) return { totalLength, renderPageIndex: totalLength };
  return { totalLength, renderPageIndex: Math.trunc(totalLength / pageSize) * pageSize };
};
