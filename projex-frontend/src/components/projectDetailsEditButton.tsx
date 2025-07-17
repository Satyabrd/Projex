import { SettingFilled } from '@ant-design/icons';
import { Form, Modal, Button, Input } from 'antd';
import { useState } from 'react';
import ProjectProgressEditModal from './projectProgressEditModal';
import { PROJECT_SECTION_NAMES } from '@/constants/filterKeys';

const ProjectDetailsEditButton = props => {
  const { sectionName } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const { TextArea } = Input;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button className="cursor-pointer">
        <SettingFilled onClick={showModal} />
      </Button>
      {sectionName == PROJECT_SECTION_NAMES.projectProgress && (
        <Modal
          title="Basic Modal"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <ProjectProgressEditModal />
        </Modal>
      )}
      {sectionName == PROJECT_SECTION_NAMES.projectSprintNotes && (
        <Modal
          title="Basic Modal"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            //form={Form}
            layout="vertical"
            //onFinish={onFinish}
            initialValues={{
              percentage: 0,
              notes: '',
              initiationDate: null,
              completedDate: null,
            }}
          >
            {/* Notes */}
            <Form.Item name="notes" label="Notes">
              <TextArea rows={4} />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default ProjectDetailsEditButton;
