import { useState, useEffect, useCallback } from 'react';
import ProjectData from '../assets/projectInventoryData.json';
import { Progress } from 'antd';
import { useNavigate } from 'react-router-dom';

interface Stage {
  name: string;
  percent: number;
}

interface Project {
  id: number;
  name: string;
  stages: Stage[];
}

const ProjectGrid = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProjects(ProjectData);
  }, []);

  const handleClick = (project: any) => {
    navigate(`/project/${project}`, { state: { project } });
  };

  const getProjectGrid = useCallback((): JSX.Element[] => {
    const projectList: JSX.Element[] = [];

    // Header Row
    projectList.push(
      <div key="header" className="grid grid-cols-12 ml-5 mr-5 font-medium text-center mb-2 mt-2">
        <div className="col-span-6"></div>
        {['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5', 'Sprint 6'].map(
          (sprint, i) => (
            <div key={i} className="col-span-1">
              {sprint}
            </div>
          )
        )}
      </div>
    );

    // Data Rows
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const conceptualize = project.stages.find(s => s.name === 'Conceptualize');
      const initialize = project.stages.find(s => s.name === 'Initialize');
      const sprints = project.stages.filter(s => s.name.startsWith('Sprint'));

      const elem = (
        <div
          key={project.id}
          className="grid grid-cols-12 gap-0 items-center text-sm ml-5 mr-5 mb-2"
        >
          {/* Project Name */}
          <div className="col-span-2 font-semibold whitespace-nowrap cursor-pointer">
            <span className="text-blue-600" onClick={() => handleClick(project)}>
              {' '}
              P{i + 1}. {project.name}{' '}
            </span>
          </div>

          {/* Conceptualize Stage */}
          <div className="col-span-2">
            <Progress
              percent={conceptualize?.percent ?? 0}
              size={[200, 30]}
              strokeColor={'#3B82F6'}
              showInfo={false}
            />
          </div>

          {/* Initialize Stage */}
          <div className="col-span-2">
            <Progress
              percent={initialize?.percent ?? 0}
              size={[200, 30]}
              strokeColor={'#F97316'}
              showInfo={false}
            />
          </div>

          {/* Sprint Progress Bars */}
          {sprints.map((sprint, idx) => (
            <div className="col-span-1" key={idx}>
              <Progress
                className="custom-progress"
                percent={sprint.percent ?? 0}
                size={[120, 30]}
                strokeColor={'#10B981'}
                showInfo={false}
              />
            </div>
          ))}
        </div>
      );

      projectList.push(elem);
    }

    return projectList;
  }, [projects]);

  return <div>{getProjectGrid()}</div>;
};

export default ProjectGrid;
