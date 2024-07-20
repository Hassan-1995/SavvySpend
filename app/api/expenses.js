import client from "./client";

const endPoint = "/expenses";

const getAllExpenses = async (id) => {
  try {
    const result = await client.get(endPoint + "/" + id);
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

const addNewRowInExpenses = async (user_id, newData) => {
    const data = {
      category_id: newData.nameValue,
      date: newData.month,
      amount: newData.amount,
      description: newData.description
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

export default {
  getAllExpenses,
  addNewRowInExpenses,
  // getSingleContentFromBudgets,
  // addNewRowInBudgets,
};
