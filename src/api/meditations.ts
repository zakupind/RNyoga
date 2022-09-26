import { api } from './api';

export type Meditation = {
  name: string;
  path: string;
  id: number;
};

export const requestCategories = () =>
  api.get<Meditation[]>('/media/categories');

export const requestMeditations = (id: number) =>
  api.get('/media/meditations', { params: { categoryId: id } });
