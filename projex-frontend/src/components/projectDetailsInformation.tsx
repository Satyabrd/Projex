import { Card, Button } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import { convertProjectToDisplayGrid } from '@/lib/utils';
import { useMemo } from 'react';

const ProjectDetailsInformation = (props: any) => {
  const { project } = props;
  console.log('project is::', project);

  const displayData = useMemo(() => {
    return convertProjectToDisplayGrid(project, 3);
  }, [project]);

  return (
    <Card
      title="Project Information"
      extra={
        <Button className="cursor-pointer">
          <SettingFilled />
        </Button>
      }
      variant="borderless"
    >
      <div className="grid grid-cols-3 gap-4 p-4">
        {displayData.map((row, rowIdx) =>
          row.map((col, colIdx) => {
            const key = Object.keys(col)[0];
            const value = col[key];
            return (
              <div key={`${rowIdx}-${colIdx}`} className="flex flex-col items-start">
                <div className="text-sm font-bold text-gray-700">{key}:</div>
                <div className="text-base text-gray-900">{value}</div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};

export default ProjectDetailsInformation;
