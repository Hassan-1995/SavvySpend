import client from "./client";

const endPoint = "/budget";

const getAllContentFromBudget = () => client.get(endPoint);

export default {
  getAllContentFromBudget, //getListings,
};
