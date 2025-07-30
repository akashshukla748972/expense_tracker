import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ModelWrapper from "../../components/ModelWrapper";
import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import * as Icon from "phosphor-react-native";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/authContext";
import ImageUpload from "../../components/ImageUpload";
import { useWallet } from "../../contexts/walletContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import DeleteButton from "../../components/DeleteButton";
import { Dropdown } from "react-native-element-dropdown";
import { expenseCategories, transactionTypes } from "../../constants/data";
import useFetch from "../../hooks/useFetch";
import DateTimePicker from "@react-native-community/datetimepicker";
import { create } from "../../services/transactionService";

const TransactionModel = () => {
  const { user } = useAuth();
  const [transaction, setTransaction] = useState({
    type: "expense",
    amount: 0,
    description: "",
    category: "",
    date: new Date(),
    walletId: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();
  const wallets = useFetch();

  const oldTransaction = useLocalSearchParams();
  useEffect(() => {
    // if (oldTransaction?.id) {
    //   setTransaction({
    //     name: oldTransaction?.name,
    //     image: oldTransaction?.image,
    //   });
    // }
  }, []);

  const onSubmit = async () => {
    const { type, amount, description, category, date, walletId, image } =
      transaction;

    if (
      !amount ||
      (type == "expense" && !category) ||
      !date ||
      !walletId ||
      (type != "expense" && type !== "income")
    ) {
      Alert.alert("Transaction", "Please fill all the required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await create(transaction);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteWallet = async () => {
    // setLoading(true);
    // try {
    //   const res = await handleDeleteWallet(oldTransaction?.id);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <ModelWrapper>
      <View className="flex-1 px-5">
        <Header
          title={oldTransaction?.id ? "Update Transaction" : "New Transaction"}
          leftIcon={<BackButton />}
          deleteIcon={
            oldTransaction?.id && (
              <DeleteButton
                onDelete={() =>
                  Alert.alert(
                    "Confirm",
                    "Do you want to delete wallet",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Canceled"),
                        style: "cancel",
                      },
                      {
                        text: "Delete",
                        onPress: deleteWallet,
                        style: "destructive",
                      },
                    ],
                    {
                      cancelable: true,
                      onDismiss: () => {
                        "No action performed";
                      },
                    }
                  )
                }
              />
            )
          }
          style={"mb-[10px]"}
        />

        {/* form */}
        <ScrollView
          className=""
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex gap-y-6 pb-32">
            {/* Trensaction type */}
            <View className="gap-[10px]">
              <Text className="text-md font-semibold text-[#ccc]">Type</Text>
              <Dropdown
                activeColor="#404040"
                style={styles.dropdownContainer}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelectedText}
                iconStyle={styles.dropdownIcon}
                data={transactionTypes}
                maxHeight={300}
                labelField="label"
                valueField="value"
                itemTextStyle={styles.dropdownItemText}
                itemContainerStyle={styles.dropdownItemContainer}
                containerStyle={styles.dropdownListContainer}
                // placeholder={"Select wallet"}
                value={transaction?.type}
                onChange={(item) => {
                  setTransaction({ ...transaction, type: item.value });
                }}
              />
            </View>

            {/* Wallet */}
            <View className="gap-[10px]">
              <Text className="text-md font-semibold text-[#ccc]">Wallet</Text>
              <Dropdown
                activeColor="#404040"
                style={styles.dropdownContainer}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelectedText}
                iconStyle={styles.dropdownIcon}
                data={wallets?.data.map((wallet) => ({
                  label: `${wallet?.name} (${wallet?.amount})`,
                  value: wallet?._id,
                }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                itemTextStyle={styles.dropdownItemText}
                itemContainerStyle={styles.dropdownItemContainer}
                containerStyle={styles.dropdownListContainer}
                placeholder={"Select wallet"}
                value={transaction?.walletId}
                onChange={(item) => {
                  setTransaction({ ...transaction, walletId: item.value });
                }}
              />
            </View>

            {/* Expense category */}
            {transaction?.type == "expense" && (
              <View className="gap-[10px]">
                <Text className="text-md font-semibold text-[#ccc]">
                  Expense Category
                </Text>
                <Dropdown
                  activeColor="#404040"
                  style={styles.dropdownContainer}
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedTextStyle={styles.dropdownSelectedText}
                  iconStyle={styles.dropdownIcon}
                  data={Object.values(expenseCategories)}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  itemTextStyle={styles.dropdownItemText}
                  itemContainerStyle={styles.dropdownItemContainer}
                  containerStyle={styles.dropdownListContainer}
                  placeholder={"Select category"}
                  value={transaction?.category}
                  onChange={(item) => {
                    setTransaction({ ...transaction, category: item.value });
                  }}
                />
              </View>
            )}

            {/* date picker */}

            <View className="gap-[10px]">
              <Text className="text-md font-semibold text-[#ccc]">Date</Text>
              {!showDatePicker ? (
                <Pressable
                  onPress={() => setShowDatePicker(true)}
                  className="text-white text-[17px] border border-[#ccc] p-4 py-5 rounded-2xl"
                >
                  <Text className="text-[#ccc] font-medium">
                    {new Date(transaction.date).toLocaleDateString()}
                  </Text>
                </Pressable>
              ) : (
                <View>
                  <DateTimePicker
                    themeVariant="dark"
                    value={transaction?.date}
                    textColor="#ccc"
                    mode="date"
                    display="calendar"
                    onChange={(event, selectedDate) => {
                      const currentData = selectedDate || transaction.date;
                      setTransaction({ ...transaction, date: currentData });
                      setShowDatePicker(false);
                    }}
                  />
                </View>
              )}
            </View>

            <View className="gap-[10px]">
              <Text className="text-md font-semibold text-[#ccc]">Amount</Text>
              <TextInput
                placeholder="Enter your amount"
                keyboardType="numeric"
                placeholderTextColor={"#ccc"}
                value={transaction.amount}
                onChangeText={(value) =>
                  setTransaction({
                    ...transaction,
                    amount: Number(value.replace(/[^0-9]/g, "")),
                  })
                }
                className="text-white text-[17px] border border-[#ccc] px-2 py-3 rounded-xl"
              />
            </View>

            <View className="gap-[10px]">
              <View className="flex flex-row items-center gap-1">
                <Text className="text-md font-semibold text-[#ccc]">
                  Description
                </Text>
                <Text className="text-md font-semibold text-[#ccc] opacity-50">
                  (optional)
                </Text>
              </View>
              <TextInput
                multiline
                value={transaction.description}
                onChangeText={(value) =>
                  setTransaction({
                    ...transaction,
                    description: value,
                  })
                }
                className="text-white text-[17px] border border-[#ccc] px-2 rounded-xl h-28 flex flex-row items-start"
              />
            </View>

            <View className="gap-[10px]">
              <View className="flex flex-row items-center gap-1">
                <Text className="text-md font-semibold text-[#ccc]">
                  Receipt
                </Text>
                <Text className="text-md font-semibold text-[#ccc] opacity-50">
                  (optional)
                </Text>
              </View>
              <ImageUpload
                file={transaction.image}
                onSelect={(file) =>
                  setTransaction({ ...transaction, image: file })
                }
                onClear={() => setTransaction({ ...transaction, image: null })}
                placeholder="Upload Image"
              />
            </View>
          </View>
        </ScrollView>
      </View>

      {/* footer */}
      <View className="items-center flex-row justify-center px-[20px] gap-[12px] py-[25px] border-t-[#404040] border-[1px] mb-[10px]">
        <Button
          loading={loading}
          className=""
          style="flex-1"
          onPress={onSubmit}
        >
          <Text className="text-[#fff]">
            {oldTransaction?.id ? "Update Wallet" : "New Wallet"}
          </Text>
        </Button>
      </View>
    </ModelWrapper>
  );
};

export default TransactionModel;

const styles = StyleSheet.create({
  form: {
    gap: 30,
    marginTop: 15,
  },
  editIcon: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    padding: 7,
  },
  dropdownContainer: {
    height: 54,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    paddingHorizontal: 15,
    borderRadius: 15,
    borderCurve: "continuous",
  },
  dropdownPlaceholder: {
    color: "#ccc",
  },
  dropdownSelectedText: {
    color: "#ccc",
    fontSize: 14,
  },
  dropdownIcon: {
    height: 30,
    tintColor: "#d4d4d4",
  },
  dropdownItemText: {
    color: "#d4d4d4",
  },
  dropdownItemContainer: {},
  dropdownListContainer: {
    backgroundColor: "#171717",
    borderRadius: 15,
    borderCurve: "continuous",
    paddingVertical: 7,
    top: 5,
    borderColor: "#737373",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
});
