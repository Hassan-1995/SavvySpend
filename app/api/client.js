import { create } from "apisauce";

const apiClient = create({
    baseURL: "http://192.168.100.4:8080",
});

export default apiClient;