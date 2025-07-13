import { Card, Button } from 'antd';
import { Key } from 'react';
import { SettingFilled } from '@ant-design/icons';

const ProjectDetailsInformation = () => {
    return(
        <Card title="Project Information" extra={<Button className='cursor-pointer'><SettingFilled/></Button>} variant="borderless">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
    );
}

export default ProjectDetailsInformation