import { request } from '../../../services/api'

export const myGroupsAPI = {
  getMyGroups: async () => (await request.get('/api/v1/func_teacher/my-groups/list')).data,
  postMyGroupCreate: async (data) => (await request.post('/func_teacher/my-groups/create', data)).data,
  postMyGroupAddStudents: async (group_id, data) =>
    (await request.post(`/func_teacher/my-groups/${group_id}/add-students/`, data)).data,

  getMyGroupDetail: async (pk) => (await request.get(`/api/v1/func_teacher/my-groups/detail/<${pk}>/`)).data,
  putMyGroupDetail: async (pk, data) => (await request.put(`/api/v1/my-groups/detail/<${pk}>/`, data)).data,
  deleteMyGroup: async (pk) => (await request.delete(`/api/v1/my-groups/detail/<${pk}>/`)).data,
  getNewStudents: async () => (await request.get('/api/v1/func_teacher/students/without-group/new-students/')).data
}
