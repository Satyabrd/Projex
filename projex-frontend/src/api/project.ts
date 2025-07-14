// src/api/projects.ts
import apiClient from './client';

export const fetchProjects = async () => {
  const response = await apiClient.get('/projects');
  return response.data;
};

export const createProject = async data => {
  const response = await apiClient.post('/projects', data);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await apiClient.put(`/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async id => {
  const response = await apiClient.delete(`/projects/${id}`);
  return response.data;
};
