import { PlusCircleFilled } from '@ant-design/icons';
import type { FormProps } from 'antd';
import type { CollapseProps } from 'antd';
import {
  Form,
  Modal,
  Input,
  Button,
  Collapse,
  DatePicker,
  InputNumber,
  Typography,
  Divider,
  Row,
  Col,
} from 'antd';
import { useState } from 'react';

const ProjectProgressEditModal = props => {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const { TextArea } = Input;
  const { Title } = Typography;

  const renderSprint = (sprintKey, index) => (
    <div key={sprintKey}>
      <Divider orientation="left">
        Sprint {index + 1} ({sprintKey})
      </Divider>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name={[sprintKey, 'startDate']}
            label="Start Date"
            rules={[{ required: true, message: 'Start date required' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={[sprintKey, 'endDate']}
            label="End Date"
            rules={[{ required: true, message: 'End date required' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={[sprintKey, 'completion']}
            label="Completion %"
            rules={[
              { required: true, message: 'Enter completion %' },
              { type: 'number', max: 100, message: 'Max 100%' },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );

  const sprintKeys = Array.from(
    { length: 6 },
    (_, i) => `sprint-${(i + 1).toString().padStart(2, '0')}`
  );
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Conceptualize',
      children: (
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
          {/* Percentage */}
          <Form.Item
            name="percentage"
            label="Completion Percentage"
            rules={[
              { required: true, message: 'Please enter percentage' },
              { type: 'number', max: 100, message: 'Cannot exceed 100%' },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>

          {/* Notes */}
          <Form.Item
            name="notes"
            label="Notes"
            rules={[{ required: true, message: 'Please enter some notes' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          {/* Initiation Date */}
          <Form.Item
            name="initiationDate"
            label="Initiation Date"
            rules={[{ required: true, message: 'Please select initiation date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          {/* Completed Date */}
          <Form.Item
            name="completedDate"
            label="Completed Date"
            rules={[{ required: true, message: 'Please select completed date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: 'Initialize',
      children: (
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
          {/* Percentage */}
          <Form.Item
            name="percentage"
            label="Completion Percentage"
            rules={[
              { required: true, message: 'Please enter percentage' },
              { type: 'number', max: 100, message: 'Cannot exceed 100%' },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>

          {/* Notes */}
          <Form.Item
            name="notes"
            label="Notes"
            rules={[{ required: true, message: 'Please enter some notes' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          {/* Initiation Date */}
          <Form.Item
            name="initiationDate"
            label="Initiation Date"
            rules={[{ required: true, message: 'Please select initiation date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          {/* Completed Date */}
          <Form.Item
            name="completedDate"
            label="Completed Date"
            rules={[{ required: true, message: 'Please select completed date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '3',
      label: 'Experiment',
      children: (
        <Form
          //form={form}
          layout="vertical"
          //onFinish={onFinish}
        >
          <Title level={3}>Sprint Details</Title>

          {sprintKeys.map((key, idx) => renderSprint(key, idx))}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit All Sprints
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />;
};

export default ProjectProgressEditModal;
