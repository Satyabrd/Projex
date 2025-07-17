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

export function buildProjectPayload(values) {
  const { projectname, description, technology, business_function } = values;
  console.log('valuess are::', projectname, description, technology, business_function);
  const now = new Date().toISOString(); // full datetime timestamp

  const sprintsForExperiment = Array.from({ length: 6 }, (_, i) => ({
    name: `Sprint ${i + 1}`,
    completion_percentage: 0,
    sprint_notes: null,
    start_date: null,
    end_date: null,
  }));

  const stages = [
    {
      name: 'Conceptualize',
      completion_percentage: 0,
      stage_notes: 'Define problem and scope',
      start_date: null,
      end_date: null,
      sprints: [],
    },
    {
      name: 'Initialize',
      completion_percentage: 0,
      stage_notes: 'Set up tools and environment',
      start_date: null,
      end_date: null,
      sprints: [],
    },
    {
      name: 'Experiment',
      completion_percentage: 0,
      stage_notes: 'Prototype and test ideas',
      start_date: null,
      end_date: null,
      sprints: sprintsForExperiment,
    },
  ];

  const projectPayload = {
    projectname,
    description,
    technology,
    business_function,
    initiation_date: now,
    creation_date: now,
    stages,
  };

  return projectPayload;
}
