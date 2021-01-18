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
/**
 * The intent with the Note component was to have it toggle on below the FlatList when the user
 * clicked a list item. Then use the onPress to submit to the dummy endpoint.
 * At this time, the provided API endpoint returns an empty object with no documentation on how
 * to use it. https://jsonplaceholder.typicode.com/guide.html
 *
 */
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

  /**
   * Work in progress
   * Using axios api to access github rest. I successfully retrieved the data.
   * The next step would be to reshape the data to pass to the FlatList
   */
  // const [repoData, setRepoData] = useState([]);

  // const callApi = async () => {
  //   const response = await axios.get(URL);
  //   const data = response.data;
  //   setRepoData(data);
  // };

  // useEffect(() => {
  //   callApi();
  // }, []);

  const renderItem = ({ item }) => (
    //TODO: Need to debug toggle. No error but doesn't toggle.
    <Item title={item.title} onPress={toggleFunction} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        // data={repoData}
        data={DATA}
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
