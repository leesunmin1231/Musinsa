export const getRenderPageIndex = (totalLength: number, pageSize: number) => {
  const prevPageIndex = totalLength % pageSize;
  if (prevPageIndex === 0) return { totalLength, renderPageIndex: totalLength };
  return { totalLength, renderPageIndex: Math.trunc(totalLength / pageSize) * pageSize };
};
