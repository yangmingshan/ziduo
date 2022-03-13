export function stringifyQuery(query: Record<string, string>): string {
  let queryString = '';
  for (const [key, value] of Object.entries(query)) {
    queryString = `${queryString}&${encodeURIComponent(
      key
    )}=${encodeURIComponent(value)}`;
  }

  if (queryString) {
    queryString = queryString.replace(/^&/, '?');
  }

  return queryString;
}
