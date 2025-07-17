import { Card, Progress, Button } from 'antd';
import { Key } from 'react';
import { SettingFilled } from '@ant-design/icons';
import ProjectProgressEditButton from './projectDetailsEditButton';

const ProjectDetailsProgressCard = (props: any) => {
  const { project } = props;
  const conceptualize = project.stages.find((s: { name: string }) => s.name === 'Conceptualize');
  const initialize = project.stages.find((s: { name: string }) => s.name === 'Initialize');
  const experiment = project.stages.find((s: { name: string }) => s.name === 'Experiment');
  const sprints = experiment?.sprints;

  return (
    <Card
      title="Project Progress"
      extra={<ProjectProgressEditButton sectionName="projectProgress" />}
      variant="borderless"
    >
      <div className="grid grid-cols-12 gap-x-2 items-center text-sm mx-5 mb-4">
        {/* Conceptualize */}
        <div className="col-span-3 text-center">
          <Progress
            percent={conceptualize?.percent ?? 0}
            showInfo={false}
            size={[undefined, 30]}
            strokeColor="#3B82F6"
            className="w-full"
          />
          <div className="mt-1 text-xs text-blue-500">Conceptualize</div>
        </div>

        {/* Initialize */}
        <div className="col-span-3 text-center">
          <Progress
            percent={initialize?.percent ?? 0}
            showInfo={false}
            size={[undefined, 30]}
            strokeColor="#F97316"
            className="w-full"
          />
          <div className="mt-1 text-xs text-orange-500">Initialize</div>
        </div>

        {/* Sprints */}
        {sprints.map((sprint: { percent: any }, idx: Key | null | undefined) => (
          <div className="col-span-1 text-center" key={idx}>
            <Progress
              percent={sprint.percent ?? 0}
              showInfo={false}
              size={[undefined, 30]}
              strokeColor="#10B981"
              className="w-full"
            />
            <div className="mt-1 text-xs text-emerald-500">Sprint {Number(idx) + 1}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProjectDetailsProgressCard;
