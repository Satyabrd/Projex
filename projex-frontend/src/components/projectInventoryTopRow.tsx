import { PlusCircleFilled } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Form, Modal, Input, Button } from 'antd';
import { useState } from 'react';
import { buildProjectPayload } from '@/lib/utils';

type FieldType = {
  projectname?: string;
  description?: string;
  technology?: string;
  business_function?: string;
};

const ProjectInventoryTopRow = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    console.log('Success:', values);
    const payload = buildProjectPayload(values);
    console.log('payload is::', payload);
    props.onSubmit(payload);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between border-b">
      <h1 className="text-2xl font-bold text-gray-800">Projects Pipeline</h1>
      <PlusCircleFilled
        style={{ color: 'blue', fontSize: '2rem', cursor: 'pointer' }}
        onClick={showModal}
      />
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout={formLayout}
          onFinish={onFinish}
          style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
          initialValues={{ remember: true }}
        >
          <Form.Item<FieldType>
            label="Project Name"
            name="projectname"
            rules={[{ required: true, message: 'Please input your Projectname!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Technology" name="technology">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Business Function" name="business_function">
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectInventoryTopRow;
