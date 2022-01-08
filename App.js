import React, { useState, useMemo, memo } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";

export default function App() {
  const [enterGoal, setEnterGoal] = useState("");
  const [courseGoal, setCourseGoal] = useState([]);
  const [modalToogle, setModalToogle] = useState(false);

  function goalInputhandler(enterText) {
    setEnterGoal(enterText);
  }

  const addGoalhandler = () => {
    if (enterGoal) {
      setCourseGoal((st) => [
        ...st,
        { _id: Math.random().toString(), value: enterGoal },
      ]);
    }
    setEnterGoal("");
  };

  const removeGoal = (goalId) => {
    setCourseGoal((curr) => {
      return curr.filter((i) => i._id !== goalId);
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="ADD"
        onPress={() => {
          setModalToogle((st) => !st);
          console.log(modalToogle);
        }}
      />
      <Modal visible={modalToogle} animationType="slide">
        <View style={styles.layout}>
          <TextInput
            placeholder="Coure"
            style={styles.input}
            value={enterGoal}
            onChangeText={goalInputhandler}
          />
          <View style={styles.buttonContainer}>
            <Button title="ADD" onPress={addGoalhandler} />
            <Button
              title="close"
              onPress={() => {
                setModalToogle((st) => !st);
              }}
            />
          </View>
        </View>
      </Modal>
      <Items courseGoal={courseGoal} removeGoal={removeGoal} />
      {/*<View
        style={{
          backgroundColor: "red",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <View
        style={{
          backgroundColor: "green",
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <View
        style={{
          backgroundColor: "blue",
          flex: 0.3,
          justifyContent: "center",
          alignItems: "center",
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 50,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  layout: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: { width: "80%", borderBottomColor: "black", borderWidth: 1 },
  listItem: {
    padding: 10,

    marginVertical: 10,

    borderColor: "black",
    borderWidth: 1,
  },
  buttonContainer: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const Items = memo(({ courseGoal, removeGoal }) => {
  const RandomColor = useMemo(() => {
    return `rgb(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    })`;
  }, []);

  return (
    <FlatList
      keyExtractor={(item, index) => item._id}
      data={courseGoal}
      renderItem={(itemData) => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => removeGoal(itemData.item._id)}
        >
          <View
            style={{
              ...styles.listItem,
              backgroundColor: RandomColor,
            }}
            onTouchEnd={() => console.log("working")}
          >
            <Text>{itemData.item.value}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
});
