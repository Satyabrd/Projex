import { Card, Tag } from 'antd';
import { Button, Modal } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ProjectDetailsTopRow = (props: any) => {
  const { project } = props;
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1); // ⬅️ This goes to the previous page in history
  };

  return (
    <Card>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button color="default" variant="solid" onClick={onBack}>
            {' '}
            Back{' '}
          </Button>
          <span className="text-lg font-semibold">{project.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag color="#87d068">Experiment</Tag>
          <span
            className="text-red-500 hover:text-red-700 text-lg"
            onClick={() => {
              Modal.confirm({
                title: 'Confirm',
                content: `Are you sure to delete ${project.name} ?`,
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
              });
            }}
          >
            <DeleteFilled />
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectDetailsTopRow;
