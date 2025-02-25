export function textSlicer(text: string, max: number = 80) {
  if (text.length >= max) {
    return `${text.slice(0, max)}...`;
  }
  return text;
}
