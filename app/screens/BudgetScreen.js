import React, { useEffect, useState } from "react";
import budgetApi from "../api/budget";

import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";

import AppText from "../components/AppText";
import colors from "../config/colors";
import LogoContainer from "../components/LogoContainer";
import ProgressBar from "../components/ProgressBar";
import Screen from "../components/Screen";
import BudgetTable from "../components/BudgetTable";
import PromptBox from "../components/PromptBox";
import Icon from "../components/Icon";
import ItemCard from "../components/ItemCard";
import AppButton from "../components/AppButton";

const { width, height } = Dimensions.get("window");

const chartConfig = {
  backgroundColor: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForLabels: {
    fontSize: 10,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
  backgroundGradientFrom: "transparent",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "transparent",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(255, 82, 82, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(16, 75, 125, ${opacity})`,
  decimalPlaces: 0,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.25,
  strokeWidth: 5,
};

const utilityOptions = [
  { label: "Electricity", value: "electricity" },
  { label: "Water", value: "water" },
  { label: "Internet", value: "internet" },
  { label: "Gas", value: "gas" },
  { label: "Trash Collection", value: "trash" },
  { label: "Cable TV", value: "cable_tv" },
  { label: "Mobile Phone", value: "mobile_phone" },
  { label: "Home Security", value: "home_security" },
  { label: "Home Maintenance", value: "home_maintenance" },
  { label: "Insurance", value: "insurance" },
  { label: "Sewer", value: "sewer" },
  { label: "Heating", value: "heating" },
];

const utilityExpenses = [
  { id: 1, name: "Electricity", expense: 1500, date: "01-Jan-24" },
  { id: 2, name: "Water", expense: 800, date: "02-Jan-24" },
  { id: 3, name: "Internet", expense: 1200, date: "03-Jan-24" },
  { id: 4, name: "Gas", expense: 600, date: "04-Jan-24" },
  { id: 5, name: "Trash Collection", expense: 400, date: "05-Jan-24" },
  { id: 6, name: "Cable TV", expense: 700, date: "06-Jan-24" },
  { id: 7, name: "Mobile Phone", expense: 900, date: "07-Jan-24" },
  { id: 9, name: "Home Maintenance", expense: 1000, date: "09-Jan-24" },
  { id: 10, name: "Insurance", expense: 1300, date: "10-Jan-24" },
  { id: 8, name: "Home Security", expense: 300, date: "08-Jan-24" },
];

const budgetData = [
  { id: 1, month: "Jan", budget: 10000, expenses: 8000, isPositive: true },
  {
    id: 2,
    month: "Feb",
    budget: 10000,
    expenses: 12000,
    isPositive: false,
  },
  {
    id: 3,
    month: "Mar",
    budget: 15000,
    expenses: 14000,
    isPositive: true,
  },
  {
    id: 4,
    month: "Apr",
    budget: 15000,
    expenses: 16000,
    isPositive: false,
  },
  {
    id: 5,
    month: "May",
    budget: 20000,
    expenses: 19000,
    isPositive: true,
  },
  {
    id: 6,
    month: "June",
    budget: 20000,
    expenses: 21000,
    isPositive: false,
  },
  {
    id: 7,
    month: "July",
    budget: 25000,
    expenses: 24500,
    isPositive: true,
  },
  {
    id: 8,
    month: "Aug",
    budget: 25000,
    expenses: 26000,
    isPositive: false,
  },
  {
    id: 9,
    month: "Sep",
    budget: 30000,
    expenses: 29000,
    isPositive: true,
  },
  {
    id: 10,
    month: "Oct",
    budget: 30000,
    expenses: 31000,
    isPositive: false,
  },
  {
    id: 11,
    month: "Nov",
    budget: 35000,
    expenses: 34000,
    isPositive: true,
  },
  {
    id: 12,
    month: "Dec",
    budget: 35000,
    expenses: 36000,
    isPositive: false,
  },
];

const chartColor = ["#104b7d", "#1b598b", "#266799", "#3175a7", "#3c81b5"];

function BudgetScreen({ totalBudget, totalExpenses, categories }) {
  const [utility, setUtility] = useState([]);
  const [temp, setTemp] = useState();
  const [update, setUpdate] = useState();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadData();
  }, [refresh]);

  const loadData = async () => {
    const response = await budgetApi.getAllContentFromBudget();
    setUtility(response.data);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [label, setLabel] = useState();

  const barChartData = {
    labels: budgetData.map((item) => item.month),
    datasets: [
      {
        data: budgetData.map((item) => item.budget - item.expenses),
      },
    ],
  };

  const sortedUtilities = utilityExpenses.sort((a, b) => b.expense - a.expense);
  // Sort the utilities and calculated the otherExpenses
  const topFiveUtilities = sortedUtilities.slice(0, 5);
  const otherExpenses = sortedUtilities.slice(5);

  // Sum of expenses for 'Others'
  const othersTotal = otherExpenses.reduce(
    (acc, item) => acc + item.expense,
    0
  );

  // Prepare data for pie chart (including top five and 'Others')
  const pieChartData = [
    ...topFiveUtilities.map((item, index) => ({
      name: item.name,
      expense: item.expense,
      color: chartColor[index % chartColor.length],
    })),
    { name: "Others", expense: othersTotal },
  ];

  const remainingBalance = totalBudget - totalExpenses;

  const chartData = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map((category) => category.amount),
      },
    ],
  };

  const getSingleData = async (id) => {
    const response = await budgetApi.getSingleBudgetData(id);
    // console.log(response.data);
    return response.data;
  };

  const handleModal = (value) => {
    // const singleData = getSingleData(value)
    // console.log("value ", singleData)
    getSingleData(value)
      .then((singleData) => {
        setLabel(singleData);
        toggleModal();
      })
      .catch((error) => {
        console.error("Error fetching single data:", error);
      });
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const refreshScreen = () => {
    // Toggle the refresh state
    setRefresh(!refresh);
  };
  const updateBudget = async (old_data, new_amount) => {
    // console.log(old_data);
    toggleModal();
    // const response = await budgetApi.getSingleBudgetData(id);
    const updated_data = {
      ...old_data,
      amount: new_amount,
    };
    const res = await budgetApi.updateBudget(old_data.utility_id, updated_data);
    refreshScreen();
  };

  const addBudget = (value) => {
    console.log(value);
    // toggleModal();
  };

  return (
    <Screen>
      <LogoContainer />
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>Budget Overview</AppText>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <AppText style={styles.summaryLabel}>Total Budget</AppText>
            <AppText style={styles.summaryValue}>
              Rs {totalBudget.toLocaleString()}
            </AppText>
          </View>
          <View style={styles.summaryItem}>
            <AppText style={styles.summaryLabel}>Total Expenses</AppText>
            <AppText style={styles.summaryValue}>
              Rs {totalExpenses.toLocaleString()}
            </AppText>
          </View>
          <View style={styles.summaryItem}>
            <AppText style={styles.summaryLabel}>Remaining Balance</AppText>
            <AppText
              style={[
                styles.summaryValue,
                {
                  color: remainingBalance < 0 ? colors.expense : colors.income,
                },
              ]}
            >
              Rs {remainingBalance.toLocaleString()}
            </AppText>
          </View>
        </View>

        <ProgressBar asset1={totalExpenses} asset2={totalBudget} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AppText style={styles.subHeader}>Utilities</AppText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText style={styles.links}>Add Utility</AppText>
            <TouchableOpacity onPress={(value) => addBudget(value)}>
              <Icon
                name={"circle-edit-outline"}
                iconColor={colors.primary}
                backgroundColor="transparent"
                size={50}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {utilityExpenses.map((item) => (
            <ItemCard
              key={item.id}
              name={item.name}
              onClick={(value) => addBudget(value)}
            />
          ))}
        </ScrollView>

        <BudgetTable assets={utility} onClick={(value) => handleModal(value)} />

        <AppText style={styles.subHeader}>Expense Breakdown</AppText>
        {/* <TableCol4 assets={budgetData} /> */}

        <BarChart
          data={barChartData}
          width={width}
          height={220}
          yAxisLabel="Rs"
          chartConfig={chartConfig}
          verticalLabelRotation={-30}
        />
        <PieChart
          data={pieChartData}
          width={width}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            propsForLabels: {
              fontSize: 1, // Adjust the font size here
            },
          }}
          accessor="expense"
          backgroundColor="transparent"
          // paddingRight="5"
          // absolute
        />
        {/* </View> */}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {/* <AppButton title={"CLose"} onPress={toggleModal}/> */}
        <PromptBox
          onClick={(old_data, new_amount) => updateBudget(old_data, new_amount)}
          label={label}
          dropdownOptions={utilityOptions}
        />
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <AppButton title={"Close"} onPress={toggleModal}/>
        {/* <PromptBox
          onClick={(old_data, new_amount) => updateBudget(old_data, new_amount)}
          label={label}
          dropdownOptions={utilityOptions}
        /> */}
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  links: {
    fontStyle: "italic",
    fontSize: 14,
    color: colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#888",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  labelContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderStyle: "dashed",
    marginHorizontal: 10,
    marginBottom: 20,
    borderColor: colors.primary,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.secondary,
  },
});

export default BudgetScreen;
