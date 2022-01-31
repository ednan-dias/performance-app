import React, { useState, useCallback } from "react";
import { FriendsList } from "../components/FriendsList";

import { View, Text, TextInput, StyleSheet, Button } from "react-native";

interface DataState {
  id: string;
  name: string;
  likes: number;
}

export function Home() {
  const [name, setName] = useState("");

  const [friends, setFriends] = useState([]);

  async function handleSearch() {
    const response = await fetch(`http://192.168.1.5:3333/friends?q=${name}`);
    const data = await response.json();

    const formattedData = data.map((item: DataState) => {
      return {
        ...item,
        online: `${new Date().getHours()}:${new Date().getMinutes()}`,
      };
    });

    setFriends(formattedData);
  }

  const handleFollow = useCallback(() => {
    console.log("follow user");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigos</Text>

      <TextInput
        placeholder="Nome do cliente"
        onChangeText={setName}
        value={name}
        style={styles.input}
      />

      <Button title="Buscar" onPress={handleSearch} />

      <FriendsList data={friends} follow={handleFollow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 25,
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginBottom: 10,
    marginVertical: 10,
  },
  list: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
