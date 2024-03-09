import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, FlatList, View, Alert } from 'react-native';
import { firebase } from "../config";

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const inventoryRef = firebase.firestore().collection('inventory');
      const snapshot = await inventoryRef.get();
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventory(items);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      Alert.alert('Error', 'Failed to fetch inventory');
    }
  };

  const addItem = async () => {
    try {
      const inventoryRef = firebase.firestore().collection('inventory');
      await inventoryRef.add({
        itemName,
        quantity: parseInt(quantity),
      });
      setItemName('');
      setQuantity('');
      Alert.alert('Success', 'Item added successfully');
      fetchInventory(); 
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert('Error', 'Failed to add item');
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const inventoryRef = firebase.firestore().collection('inventory');
      await inventoryRef.doc(itemId).delete();
      Alert.alert('Success', 'Item deleted successfully');
      fetchInventory(); 
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  const signOut = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch(error => {
        console.error('Sign-out error:', error);
        Alert.alert('Error', 'Failed to sign out');
      });
  };

  const forgotPassword = () => {
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        Alert.alert('Success', 'Password reset email sent');
      })
      .catch(error => {
        console.error('Forgot password error:', error);
        Alert.alert('Error', 'Failed to send password reset email');
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.itemName}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Inventory Management</Text>

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={addItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>

      <FlatList
        data={inventory}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity style={styles.button} onPress={forgotPassword}>
        <Text style={styles.buttonText}>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#026efd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

