const providerModule =
  process.env.DB_SOURCE === "fauna"
    ? "faunaDB"
    : process.env.DB_SOURCE === "json"
    ? "jsonDB"
    : "jsonDB";
const { db } = await import(`#server/data/${providerModule}`);

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

const collection = function ({ key, keyField, fnNew, fnGetLookups }) {
  const self = this;

  self.get = (options) => {
    let result = db(key).get();
    const { sort, lookup } = options ?? {};
    if (lookup && typeof self.getLookups === "function")
      result = db(key)
        .get()
        .map((x) => ({ ...x, ...self.getLookups(x) }));
    if (sort) result = result.sort((a, b) => compare(a, b, sort));
    return result;
  };
  self.getLookups = fnGetLookups;
  self.set = (...items) => {
    db(key).set(...items);
    return items.map((x) => self.getKey(x));
  };
  self.add = (...items) => {
    db(key).add(...items);
  };
  self.update = (key, newItem) => {
    self.set(
      ...self
        .get()
        .map((x) => (self.getKey(x) === key ? { ...x, ...newItem } : x)),
    );
  };
  self.remove = (item) => db(key).remove(item);
  self.filterBy = (filter) =>
    self
      .get()
      .filter((x) => Object.keys(filter).every((k) => filter[k] === x[k]));
  self.findBy = (filter) => [...self.filterBy(filter)][0];
  self.new = (obj) => ({ ...fnNew(obj) });
  self.getKey = (item) => item[keyField ?? "id"];
  self.getByKey = (k) =>
    self.exists(k) ? self.get().filter((x) => self.getKey(x) === k)[0] : null;
  self.exists = (k) => self.get().some((x) => self.getKey(x) === k);
  self.setItem = (newItem) => {
    const key = self.getKey(newItem);
    self.exists(key) ? self.update(key, newItem) : self.add(newItem);
  };

  return self;
};

export { collection };
