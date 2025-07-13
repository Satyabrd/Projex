import { Card, Button } from 'antd';
import { Key } from 'react';
import { SettingFilled } from '@ant-design/icons';

const ProjectDetailsSprintNotes = () => {
    return(
        <Card title="Sprint Notes" extra={<Button className='cursor-pointer'><SettingFilled/></Button>} variant="borderless">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
    );
}

export default ProjectDetailsSprintNotes