import { Card } from 'antd'

const ProjectDetails = () => {
    return(
        <div className='bg-lightGrayBg w-screen px-8'>
            <div className='space-y-4'>
            <Card title="Card title" variant="borderless" style={{height: 50}}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>

  <Card title="Card title" variant="borderless">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>

  <Card title="Card title" variant="borderless">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>

  <Card title="Card title" variant="borderless">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>

            </div>
            
        </div>
    )
}

export default ProjectDetails