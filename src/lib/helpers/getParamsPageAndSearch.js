export function getParamsPageAndSearch(url) {
  const params = new URLSearchParams(url);
  const pageValue = params.get('page');
  const searchValue = params.get('search');
  return [pageValue, searchValue]
}
