import { PROJECT_DISPLAY_EXCLUDE_KEYS } from '@/constants/filterKeys';

export function convertProjectToDisplayGrid(
  obj: Record<string, any>,
  columnsPerRow = 3
): Array<Array<Record<string, string>>> {
  const result: Array<Array<Record<string, string>>> = [];

  // Filter out unwanted keys
  const filteredEntries = Object.entries(obj).filter(
    ([key]) => !PROJECT_DISPLAY_EXCLUDE_KEYS.includes(key)
  );

  // Format and chunk into rows
  for (let i = 0; i < filteredEntries.length; i += columnsPerRow) {
    const row = filteredEntries.slice(i, i + columnsPerRow).map(([key, value]) => {
      // Convert snake_case to Capitalized Words
      const formattedKey = key
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { [formattedKey]: value };
    });

    result.push(row);
  }

  return result;
}
