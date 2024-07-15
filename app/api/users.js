import client from "./client";

const endPoint = "/users";

const getAllContentFromUsers = () => client.get(endPoint);

export default {
  getAllContentFromUsers, //getListings,
};
