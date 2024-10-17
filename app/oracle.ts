export async function queryApi(url: string, attr: string) {
  const resp = await fetch(url);
  const data = await resp.json();

  const value = data[attr];
  return value;
}
