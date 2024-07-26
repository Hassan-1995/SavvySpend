import client from "./client";

const endPoint = "/users";

const getAllContentFromUsers = () => client.get(endPoint);

const getSingleUserByEmail = async (email) => {
  try {
    const result = await client.get(endPoint + email);
    if (result.length === 0) {
      throw new Error(`User with email ${email} not found`);
    }

    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

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

export default {
  getAllContentFromUsers, //getListings,
  getSingleUserByEmail,
  authenticateUser,
  addNewUser,
};
