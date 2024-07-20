import client from "./client";

const endPoint = "/budgets";

const getAllBudgets = async (id) => {
  try {
    const result = await client.get(endPoint + "/" + id);
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
const getSingleContentFromBudgets = async (budget_id, user_id) => {
  try {
    const result = await client.get(endPoint + "/" + budget_id + "/" + user_id);
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

const addNewRowInBudgets = async (user_id, newData) => {
  const data = {
    category_id: newData.name,
    period: newData.period,
    amount: newData.amount,
  };
  try {
    // const response = await client.post(endPoint +"/"+ user_id +"/"+ data);
    const response = await client.post(`${endPoint}/${user_id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
// const addNewRowInBudgets = async (newData) => {
//   const data = {
//     user_id: newData.id,
//     category_id: newData.category_id,
//     period: newData.period,
//     amount: newData.amount,
//   };
//   try {
//     const response = await client.post(endPoint, data);
//     return response.data;
//   } catch (error) {
//     console.error("Error posting data:", error);
//     throw error;
//   }
// };

export default {
  getAllBudgets,
  getSingleContentFromBudgets,
  addNewRowInBudgets,
};
