const safeLowerCase = (x) =>
  typeof x.toLowerCase === "function" ? x.toLowerCase() : x;

const compareValue = (a, b, desc) =>
  (safeLowerCase(a) > safeLowerCase(b)
    ? 1
    : safeLowerCase(a) < safeLowerCase(b)
    ? -1
    : 0) * (desc ? -1 : 1);

const compare = (a, b, sort) =>
  sort
    .split("|")
    .map((x) =>
      compareValue(
        a[x.replace(/^__/, "")],
        b[x.replace(/^__/, "")],
        x.startsWith("__"),
      ),
    )
    .find((x) => x !== 0);

export { compare };
