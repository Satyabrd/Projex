import { Card, Progress, Button } from 'antd';
import { Key } from 'react';
import { SettingFilled } from '@ant-design/icons';

const ProjectDetailsProgressCard = (props: any) => {
  const { project } = props;
  console.log("project is::",project)
  const conceptualize = project.stages.find((s: { name: string }) => s.name === 'Conceptualize');
  const initialize = project.stages.find((s: { name: string }) => s.name === 'Initialize');
  const sprints = project.stages.filter((s: { name: string }) => s.name.startsWith('Sprint'));

  return (
    <Card title="Project Progress" extra={<Button className='cursor-pointer'><SettingFilled/></Button>} variant="borderless">
      <div key={project.id} className="grid grid-cols-12 gap-0 items-center text-sm ml-5 mr-5 mb-2 progress-bar">
        {/* Conceptualize Stage */}
        <div className="col-span-3 text-center">
    <Progress
      percent={conceptualize?.percent ?? 0}
      size={[300, 30]}
      strokeColor={'#3B82F6'}
      showInfo={false}
    />
    <div className="mt-1 text-xs text-blue-500">Conceptualize</div>
  </div>

        {/* Initialize Stage */}
        <div className="col-span-3">
          <Progress
            percent={initialize?.percent ?? 0}
            size={[300, 30]}
            strokeColor={'#F97316'}
            showInfo={false}
          />
          <div className="mt-1 text-xs text-orange-500">Initialize</div>
        </div>

        {/* Sprint Progress Bars */}
        {sprints.map((sprint: { percent: any }, idx: Key | null | undefined) => (
          <div className="col-span-1" key={idx}>
            <Progress
              className="custom-progress"
              percent={sprint.percent ?? 0}
              size={[115, 30]}
              strokeColor={'#10B981'}
              showInfo={false}
            />
            <div className="mt-1 text-xs text-emerald-500">Sprint {Number(idx) + 1}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProjectDetailsProgressCard;
