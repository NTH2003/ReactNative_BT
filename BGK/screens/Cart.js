import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useMyContextController } from "../store";
import { Button } from "react-native-paper";

const Cart = () => {
  const [controller, dispatch] = useMyContextController();
  const cartItems = controller.cartItems || [];

  const increaseQuantity = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch({ type: "UPDATE_CART", value: updated });
  };

  const decreaseQuantity = (id) => {
    const updated = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    dispatch({ type: "UPDATE_CART", value: updated });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.counterButton}>
          <Text>–</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.counterButton}>
          <Text>+</Text>
        </TouchableOpacity>
        <Text style={styles.itemPrice}>₫ {item.price * item.quantity}</Text>
      </View>
    </View>
  );

  const itemsTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 18;
  const tax = itemsTotal * 0.08;
  const delivery = 30;
  const total = itemsTotal - discount + tax + delivery;

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListFooterComponent={
          <View style={styles.billSection}>
            <Text style={styles.billTitle}>Bill Receipt</Text>
            <Text style={styles.billText}>Items Total: ₹ {itemsTotal}</Text>
            <Text style={styles.billText}>Offer Discount: -₹ {discount}</Text>
            <Text style={styles.billText}>Taxes (8%): ₹ {tax.toFixed(2)}</Text>
            <Text style={styles.billText}>Delivery Charges: ₹ {delivery}</Text>
            <Text style={styles.totalAmount}>Total Pay: ₹ {total.toFixed(2)}</Text>
            <Button mode="contained" style={styles.payButton} onPress={() => {/* handle payment */}}>
              Proceed To Pay
            </Button>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  item: { marginBottom: 16 },
  itemName: { fontSize: 16, fontWeight: "bold", color: "red", marginBottom: 6 },
  counterContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  counterButton: {
    borderWidth: 1, padding: 4, borderRadius: 4, width: 30, alignItems: "center"
  },
  quantity: { marginHorizontal: 10, fontSize: 16 },
  itemPrice: { fontSize: 16 },
  billSection: { borderTopWidth: 1, paddingTop: 16, marginTop: 16 },
  billTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
  billText: { fontSize: 14, marginBottom: 4 },
  totalAmount: { fontSize: 16, fontWeight: "bold", marginVertical: 8 },
  payButton: { backgroundColor: "green", marginTop: 10 },
});

export default Cart;