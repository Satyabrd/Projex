import { Card } from 'antd';
import ProjectDetailsProgressCard from '@/components/projectDetailsProgressCard';
import ProjectDetailsInformation from '@/components/projectDetailsInformation';
import ProjectDetailsSprintNotes from '@/components/projectDetailsSprintNotes';
import { useLocation } from 'react-router-dom';

const ProjectDetails = () => {
  const { state } = useLocation();
  const project = state?.project;

  return (
    <div className="bg-lightGrayBg w-screen px-8">
      <div className="space-y-4">
        <Card title="Card title" variant="borderless" style={{ height: 50 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>

        <ProjectDetailsProgressCard project={project} />

        <ProjectDetailsSprintNotes/>

        <ProjectDetailsInformation/>

      </div>
    </div>
  );
};

export default ProjectDetails;
