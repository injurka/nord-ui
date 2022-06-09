export const parse = (text: string | number, matches: number[][]) => {
  const value = text.toString();
  const result = [];

  if (matches.length === 0) {
    result.push({
      text: value,
      highlight: false
    });
  } else if (matches[0][0] > 0) {
    result.push({
      text: value.slice(0, matches[0][0]),
      highlight: false
    });
  }

  matches.forEach((match: number[], i: number) => {
    if (match.length < 1) return;

    const startIndex = match[0];
    const endIndex = match[1];

    result.push({
      text: value.slice(startIndex, endIndex),
      highlight: true
    });

    if (i === matches.length - 1) {
      if (endIndex < value.length) {
        result.push({
          text: value.slice(endIndex, value.length),
          highlight: false
        });
      }
    } else if (endIndex < matches[i + 1][0]) {
      result.push({
        text: value.slice(endIndex, matches[i + 1][0]),
        highlight: false
      });
    }
  });

  return result;
};
