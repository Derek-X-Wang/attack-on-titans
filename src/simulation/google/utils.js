
export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function subtractParagraph(combined, sub) {
  const combinedLines = combined.trim().split('\n');
  const subLines = sub.trim().split('\n');
  // since combinedLines will double the empty line,
  // we need to double empty line in subLines also.
  const doubleEmptyLines = [];
  subLines.forEach((line) => {
    if (line === '') {
      doubleEmptyLines.push(line);
      doubleEmptyLines.push(line);
    } else {
      doubleEmptyLines.push(line);
    }
  });
  const diff = combinedLines.slice(doubleEmptyLines.length);
  const answer = diff.join('\n');
  return answer.trim();
}
