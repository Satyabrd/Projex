import { PlusCircleFilled } from '@ant-design/icons';
import ProjectGrid from '@/components/projectGrid';
import { Card } from 'antd';
import ProjectInventoryTopRow from '@/components/projectInventoryTopRow';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectData from '../assets/projectInventoryData.json';
import { fetchProjects } from '../api/projects';

const ProjectInventory = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects(); // Safe await inside inner async function
    };

    loadProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/projects');
      console.log('res is::', res);
      //if length of project is 0, get the data from json file:
      if (res.data.length >= 1) {
        setProjects(res.data);
      } else {
        setProjects(ProjectData);
      }
    } catch (error) {
      console.error('API fetch failed, loading fallback...', error);

      // Load fallback from local JSON file
      try {
        setProjects(ProjectData);
      } catch (fallbackError) {
        console.error('Fallback file failed too', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async values => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/projects', values);

      if (response.status === 201 || response.status === 200) {
        console.log('Project created successfully:', response.data);
        await fetchProjects(); // assuming you want to add to the list
      } else {
        console.warn('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error while creating project:', error);
      // Optionally show user feedback here
    }
  };

  return (
    <>
      <Card variant="borderless">
        <ProjectInventoryTopRow onSubmit={onSubmit} />
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-conceptualize rounded-full"></span>
            <span className="text-xs">
              Conceptualize: project concept defined, exploring feasibility
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-initialize rounded-full"></span>
            <span className="text-xs">Initialize: Team formed, planning and initial design</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-sprint rounded-full"></span>
            <span className="text-xs">Experiment: MVP development, Iterative testing</span>
          </div>
        </div>
      </Card>

      <ProjectGrid projects={projects} />
    </>
  );
};

export default ProjectInventory;
