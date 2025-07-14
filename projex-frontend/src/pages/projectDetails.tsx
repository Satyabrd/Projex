import ProjectDetailsProgressCard from '@/components/projectDetailsProgressCard';
import ProjectDetailsInformation from '@/components/projectDetailsInformation';
import ProjectDetailsSprintNotes from '@/components/projectDetailsSprintNotes';
import ProjectDetailsTopRow from '@/components/projectDetailsTopRow';
import { useLocation } from 'react-router-dom';

const ProjectDetails = () => {
  const { state } = useLocation();
  const project = state?.project;

  return (
    <div className="w-screen px-8">
      <div className="space-y-4">
        <ProjectDetailsTopRow project={project} />

        <ProjectDetailsProgressCard project={project} />

        <ProjectDetailsSprintNotes project={project} />

        <ProjectDetailsInformation project={project} />
      </div>
    </div>
  );
};

export default ProjectDetails;
