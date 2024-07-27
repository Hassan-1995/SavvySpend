import { date } from "yup";
import client from "./client";

const endPoint = "/budgets";

const getAllBudgets = async (id) => {
  try {
    const result = await client.get(endPoint + "/user_id/" + id);
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
const getAllBudgetsInCurrentMonth = async (id) => {
  try {
    const result = await client.get(endPoint + "/userId_by_month/" + id);
    return result;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
const getAllExpensesByCurrentMonthNotIncludedInBudgets = async (id) => {
  try {
    const result = await client.get(endPoint + "/nonAssignedBudget/" + id);
    return result;
  } catch (error) {
    console.error("Error gettig data:", error);
    throw error;
  }
};
const addNewRowInBudgets = async (user_id, newData) => {
  const data = {
    category_id: newData.nameValue,
    type: "Expense",
    period: newData.month,
    amount: newData.amount,
  };
  try {
    const response = await client.post(`${endPoint}/${user_id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
const updateRowInBudget = async (budget_id, updatedData) => {
  const formatDate = (dateString) => {
    return dateString.split("T")[0]; // Splits the date string at 'T' and returns the first part (date)
  };
  const data = {
    user_id: updatedData.user_id,
    category_id: updatedData.category_id,
    type: updatedData.type,
    amount: updatedData.amount,
    period: formatDate(updatedData.period),
  };
  try {
    const result = await client.put(`${endPoint}/${budget_id}`, data);
    return result;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};
const deleteRowFromBudget = async (id) => {
  try {
    const result = await client.delete(endPoint + "/" + id);
    return result;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export default {
  getAllBudgets,
  getAllBudgetsInCurrentMonth,
  getAllExpensesByCurrentMonthNotIncludedInBudgets,
  addNewRowInBudgets,
  updateRowInBudget,
  deleteRowFromBudget,
};
