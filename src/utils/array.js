export function* range(from, to) {
  if (from > to) {
    throw new Error("'From' parameter must be bigger that 'to'.");
  }

  let current = from;
  while (current <= to) {
    yield current++;
  }
}
