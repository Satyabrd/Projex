import { PlusCircleFilled } from '@ant-design/icons';
import ProjectGrid from '@/components/projectGrid';

const ProjectInventory = () => {
  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h1 className="text-2xl font-bold text-gray-800">Projects Pipeline</h1>
          <PlusCircleFilled style={{ color: 'blue', fontSize: '2rem', cursor: 'pointer' }} />
        </div>
      </div>
      <div className="ml-10 mr-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-conceptualize rounded-full"></span>
            <span className="text-xs">
              Conceptualize: project concept defined, exploring feasibility
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-initialize rounded-full"></span>
            <span className="text-xs">Initialize: Team formed, planning and initial design</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-sprint rounded-full"></span>
            <span className="text-xs">Experiment: MVP development, Iterative testing</span>
          </div>
        </div>
      </div>
      <ProjectGrid />
    </>
  );
};

export default ProjectInventory;
