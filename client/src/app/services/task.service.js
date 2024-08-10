import httpService from "./http.service";

const taskEndpoint = "tasks/";

const taskService = {
  get: async (payload) => {
    const { data } = await httpService.get(
      taskEndpoint + payload
      // payload ? taskEndpoint + payload : taskEndpoint
    );
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(taskEndpoint, payload);
    return data;
  },
  delete: async (payload) => {
    const { data } = await httpService.delete(taskEndpoint + payload.id);
    return data;
  },
  update: async (payload) => {
    const { data } = await httpService.put(
      taskEndpoint + payload.id,
      payload.body
    );
    return data;
  },
};

export default taskService;
