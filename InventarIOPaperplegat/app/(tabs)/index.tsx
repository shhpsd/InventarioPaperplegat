import { useState } from 'react';
import { Image, StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type Product = {
  id: string;
  name: string;
  quantity: number;
};

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const addProduct = () => {
    if (name && quantity) {
      const newProduct: Product = {
        id: Math.random().toString(),
        name,
        quantity: parseInt(quantity, 10),
      };
      setProducts([...products, newProduct]);
      setName('');
      setQuantity('');
    }
  };

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Register Product</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <Button title="Add Product" onPress={addProduct} />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Inventory</ThemedText>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text style={styles.productText}>{item.name}</Text>
              <Text style={styles.productText}>Quantity: {item.quantity}</Text>
            </View>
          )}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    width: 100,
    height: 100,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  stepContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderRadius: 5,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  productText: {
    fontSize: 16,
  },
});