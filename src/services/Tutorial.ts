import http from "../helpers/http-common";
import ITutorialData from "../types/Tutorial";
const basePath: string = "/tutorials";
const getAll = () => {
  return http.get<Array<ITutorialData>>(basePath);
};
const get = (id: any) => {
  return http.get<ITutorialData>(`${basePath}/${id}`);
};
const create = (data: ITutorialData) => {
  return http.post<ITutorialData>(basePath, data);
};
const update = (id: any, data: ITutorialData) => {
  return http.put<ITutorialData>(`${basePath}/${id}`, data);
};
const remove = (id: any) => {
  return http.delete<any>(`${basePath}/${id}`);
};
const removeAll = () => {
  return http.delete<any>(basePath);
};
const findByTitle = (title: string) => {
  return http.get<Array<ITutorialData>>(`${basePath}?title=${title}`);
};

export const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
