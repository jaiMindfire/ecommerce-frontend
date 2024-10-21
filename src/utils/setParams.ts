export default function setParams(
  searchParams: any,
  value: any,
  replace: any,
  pathname: any,
  type: any
) {
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set(type, value);
  } else {
    params.delete(type);
  }
  replace(`${pathname}?${params.toString()}`);
}
