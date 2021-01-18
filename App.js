import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Button,
} from "react-native";
import axios from "axios";

const URL = "https://api.github.com/users/mjstelly/repos";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title, func }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Note = () => (
  <View flex={1}>
    <TextInput backgroundColor="cyan" multiline numberOfLines={20} editable />
    <Button title="Submit" onPress={() => {}} />
  </View>
);

const App = () => {
  const [toggle, setToggle] = useState(false);
  const toggleFunction = () => {
    setToggle(!toggle);
  };

  const [repoData, setRepoData] = useState([]);

  const callApi = async () => {
    const response = await axios.get(URL);
    const data = response.data;
    setRepoData(data);
  };

  useEffect(() => {
    callApi();
  }, []);

  const renderItem = ({ item }) => (
    <Item title={item.title} onPress={toggleFunction} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={repoData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {toggle && <Note />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
