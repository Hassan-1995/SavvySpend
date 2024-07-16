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

const addBudget = async (newData) => {
  const data = new FormData();
  data.append("user_email", newData.email);
  data.append("user_name", newData.name);
  data.append("user_password", newData.password);
  data.append("user_phone", newData.phone);
  try {
    const response = await client.post(endPoint, listings);
    // console.log('data', response.data)
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export default {
  getAllContentFromBudget,  //getAllData,   -- Read
  getSingleBudgetData,      //getAllData,   -- Read
  updateBudget,             //update        -- Update
  addBudget,                //add           -- Create
};
