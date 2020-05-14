export function prefix(location, ...prefixes) {
  console.log(location, ...prefixes);
  return prefixes.some(
    (prefix) => location.href.indexOf(`${location.origin}/#/${prefix}`) !== -1
  );
}

export function navbar(location) {
  // The navbar is always active
  return true;
}

export function auth(location) {
  return prefix(location, "user");
}

export function angular(location) {
  return location.href.includes("/angular");
}

export function isKline(location) {
  return location.href.includes("/instant_redemption");
}
