// Similar to Python's range(), but without third 'step' argument.
export function* range(start, stop) {
  if (start >= stop) {
    return [];
  }

  let current = start;
  while (current < stop) {
    yield current++;
  }
}
