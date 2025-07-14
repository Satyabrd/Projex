import { Card, Button } from 'antd';
import { SettingFilled } from '@ant-design/icons';

const ProjectDetailsSprintNotes = (props: any) => {
  const { project } = props;

  return (
    <Card
      title="Sprint Notes"
      extra={
        <Button className="cursor-pointer">
          <SettingFilled />
        </Button>
      }
      variant="borderless"
    >
      <p>{project.hasOwnProperty('sprint_notes') ? project['sprint_notes'] : ''}</p>
    </Card>
  );
};

export default ProjectDetailsSprintNotes;
