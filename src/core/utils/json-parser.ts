export function parseJsonString(str: string) {
  const cleanStr = str
    .replace(/^```json\n/, '')
    .replace(/\n```$/, '')
    .trim();

  try {
    return JSON.parse(cleanStr);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw error;
  }
}
