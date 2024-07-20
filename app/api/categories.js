import client from "./client";

const endPoint = "/categories";

// const getAllContentFromCategories = () => client.get(endPoint);

const getAllContentFromCategories = async (id) => {
  try {
    const result = await client.get(endPoint + "/" + id);
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

// const getSingleContentFromCategories = async (id) => {
//   try {
//     const result = await client.get(endPoint + "/" + id);
//     return result;
//   } catch (error) {
//     console.error("Error getting data:", error);
//     throw error;
//   }
// };

const getSingleContentFromCategories = async (category_id, user_id) => {
  try {
    const result = await client.get(endPoint + "/" + category_id +"/"+ user_id);
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};

const addNewRowInCategories = async (newData) => {
  const data = {
    user_id: newData.id,
    name: newData.name,
    description: newData.description,
    type: newData.type,
  };
  try {
    const response = await client.post(endPoint, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

const updateSingleRowInCategories = async (category_id, updatedData) => {
  const data = {
    user_id: updatedData.id,
    name: updatedData.name,
    description: updatedData.description,
    type: updatedData.type,
  };
  try {
    const result = await client.put(endPoint + "/" + category_id, data);
    return result;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

const deleteSingleContentFromCategories = async (id) => {
    try {
      const result = await client.delete(endPoint + "/" + id);
      return result;
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  };
  

export default {
  getAllContentFromCategories, 
  getSingleContentFromCategories,
  addNewRowInCategories,
  updateSingleRowInCategories,
  deleteSingleContentFromCategories
};
