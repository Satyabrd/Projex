import { Card, Tag } from 'antd';
import { Button } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';

const ProjectDetailsTopRow = (props: any) => {
  const { project } = props;

  const onBack = () => {};

  const onDelete = () => {};

  return (
    <Card>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button color="default" variant="solid" onClick={onDelete}>
            {' '}
            Back{' '}
          </Button>
          <span className="text-lg font-semibold">{project.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag color="#87d068">Experiment</Tag>
          <Button icon={<DeleteOutlined />} danger onClick={onDelete}></Button>
        </div>
      </div>
    </Card>
  );
};

export default ProjectDetailsTopRow;
