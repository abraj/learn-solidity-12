export async function queryApi(url: string, attr: string) {
  const reqUrl = `${url}/${attr}`;
  const resp = await fetch(reqUrl);
  const data = await resp.json();

  const value = data.name;
  return value;
}
