import { Card } from 'antd';
import ProjectProgressEditButton from './projectDetailsEditButton';
import { PROJECT_SECTION_NAMES } from '@/constants/filterKeys';

const ProjectDetailsSprintNotes = (props: any) => {
  const { project } = props;
  const sectionName = 'sprint';

  return (
    <Card
      title="Sprint Notes"
      extra={<ProjectProgressEditButton sectionName={PROJECT_SECTION_NAMES.projectSprintNotes} />}
      variant="borderless"
    >
      <p>{project.hasOwnProperty('sprint_notes') ? project['sprint_notes'] : ''}</p>
    </Card>
  );
};

export default ProjectDetailsSprintNotes;
