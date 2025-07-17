import axios from 'axios';
import { Button, Modal, message, Card, Tag } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ProjectDetailsTopRow = (props: any) => {
  const { project } = props;
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1); // ⬅️ This goes to the previous page in history
  };

  const onDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/projects/${project.id}`);
      message.success('Project deleted successfully');
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error('Failed to delete project:', error);
      message.error('Failed to delete project');
    }
  };

  return (
    <Card>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button color="default" variant="solid" onClick={onBack}>
            {' '}
            Back{' '}
          </Button>
          <span className="text-lg font-semibold">{project.projectname}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag color="#87d068">Experiment</Tag>
          <span
            className="text-red-500 hover:text-red-700 text-lg"
            onClick={() => {
              Modal.confirm({
                title: 'Confirm',
                content: `Are you sure to delete ${project.projectname} ?`,
                onOk: () => onDeleteClick(),
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
