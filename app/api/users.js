import client from "./client";

const endPoint = "/users";

const getAllContentFromUsers = () => client.get(endPoint);

const getSingleUserByEmail = async (email) => {
  try {
    const result = await client.get(endPoint + "/email/" + email);
    if (result.length === 0) {
      throw new Error(`User with email ${email} not found`);
    }

    const user = result.data;

    return user;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
const getSingleUserByUserID = async (userID) => {
  try {
    const result = await client.get(endPoint + "/userID/" + userID);
    if (result.length === 0) {
      throw new Error(`User with userID ${userID} not found`);
    }

    const user = result.data;

    return user;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
const authenticateUser = async (email, password) => {
  try {
    // const response = await client.post("/api/auth", { email, password });
    const response = await client.post(endPoint, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};
const addNewUser = async (newData) => {
  // Ensure `newData` has the expected structure
  const formatDate = (date) => {
    if (!date) return placeholder;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const data = {
    first_name: newData.firstName,
    last_name: newData.lastName,
    password: newData.password,
    email: newData.email,
    phone_number: newData.number || null,
    date_of_birth: formatDate(newData.dob) || null,
    role: newData.role || "user",
  };
  try {
    const response = await client.post(endPoint, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
const updateUser = async (user_id, updatedData) => {
  console.log("Updated Data: ", updatedData);

  const data = {
    user_id: updatedData.user_id,
    password_hash: updatedData.password_hash,
    email: updatedData.email,
    first_name: updatedData.first_name,
    last_name: updatedData.last_name,
    phone_number: updatedData.phone_number,
    date_of_birth: updatedData.date_of_birth,
    role: "user",
  };
  try {
    const result = await client.put(`${endPoint}/${user_id}`, data);
    console.log("Result: ", result);
    return result;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export default {
  getAllContentFromUsers, //getListings,
  getSingleUserByEmail,
  getSingleUserByUserID,
  authenticateUser,
  addNewUser,
  updateUser,
};
