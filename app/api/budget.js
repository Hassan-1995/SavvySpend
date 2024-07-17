import client from "./client";

const endPoint = "/budget";

const getAllContentFromBudget = () => client.get(endPoint);

const getSingleBudgetData = async (id) => {
  try {
    const result = await client.get(endPoint + "/" + id);
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

const updateBudget = async (budgetID, updatedData) => {
  try {
    const result = await client.put(endPoint + "/" + budgetID, updatedData);
    return result;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

const addNewBudget = async (newData) => {
  const data = {
    amount: newData.amount,
    description: newData.description,
    utility_name: newData.utility_name,
  };

  try {
    const response = await client.post(endPoint, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export default {
  getAllContentFromBudget, //getAllData,   -- Read
  getSingleBudgetData, //getAllData,   -- Read
  updateBudget, //update        -- Update
  addNewBudget, //add           -- Create
};
