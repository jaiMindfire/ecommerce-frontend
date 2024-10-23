export default function setParams(
  searchParams: any,
  value: any,
  replace: any,
  pathname: any,
  type: any
) {
  const params = new URLSearchParams(searchParams);
  params.set("page", "1");
  if (value) {
    params.set(type, value);
  } else {
    params.delete(type);
  }
  replace(`${pathname}?${params.toString()}`);
  return params
}
