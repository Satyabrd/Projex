import { SettingFilled } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Form, Modal, Input, Button, Collapse } from 'antd';
import { useState } from 'react';
import ProjectProgressEditModal from './projectProgressEditModal';
import { PROJECT_SECTION_NAMES } from '@/constants/filterKeys';

const ProjectProgressEditButton = props => {
  const { sectionName } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');

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
    </>
  );
};

export default ProjectProgressEditButton;
