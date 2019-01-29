// Given length of a base64-encoded object, calculate decoded size of the
// pbject in bytes.

export function base64DecodedLen(n) {
  return Math.floor(n / 4) * 3;
}
