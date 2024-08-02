import { date } from "yup";
import client from "./client";

const endPoint = "/incomes";

const getAllIncomes = async (id) => {
  try {
    const result = await client.get(endPoint + "/user_id/" + id);
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
const getAllIncomesInCurrentMonth = async (id) => {
  try {
    const result = await client.get(endPoint + "/userId_by_month/" + id);
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
const getAllIncomesInPickedMonth = async (id, month) => {
  try {
    const result = await client.get(
      endPoint + "/userId/" + id + "/month/" + month
    );
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
const addNewRowInIncomes = async (user_id, newData) => {
  const data = {
    category_id: newData.nameValue,
    date: newData.month,
    amount: newData.amount,
    description: newData.description,
  };
  try {
    const response = await client.post(`${endPoint}/${user_id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
const updateRowInIncome = async (income_id, updatedData) => {
  const formatDate = (dateString) => {
    return dateString.split("T")[0]; // Splits the date string at 'T' and returns the first part (date)
  };
  const data = {
    user_id: updatedData.user_id,
    category_id: updatedData.category_id,
    amount: updatedData.amount,
    date: formatDate(updatedData.date),
    description: updatedData.description,
  };
  try {
    const result = await client.put(`${endPoint}/${income_id}`, data);
    return result;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};
const deleteRowFromIncome = async (id) => {
  try {
    const result = await client.delete(endPoint + "/" + id);
    return result;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export default {
  getAllIncomes,
  getAllIncomesInCurrentMonth,
  getAllIncomesInPickedMonth,
  addNewRowInIncomes,
  updateRowInIncome,
  deleteRowFromIncome,
};
