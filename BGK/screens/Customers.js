import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"

const Customers = ({navigation}) => {
  const cuisines = [
    { id: "1", name: "Chinese", icon: require("../../images/chinese.png") },
    { id: "2", name: "South Indian", icon: require("../../images/south-indian.png") },
    { id: "3", name: "Beverages", icon: require("../../images/beverages.png") },
    { id: "4", name: "North India", icon: require("../../images/north-indian.png") },
    { id: "5", name: "KFC", icon: require("../../images/biryani.png") },
    { id: "6", name: "Rice", icon: require("../../images/biryani.png") },
  ]

  const handlePress = (item) => {
        navigation.navigate("DetailFood", {
            cuisineId: item.id,
            cuisineName: item.name,
            });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.gridContainer}>
          {cuisines.map((item) => (
            <TouchableOpacity key={item.id} style={styles.cuisineItem}
                onPress={() => handlePress(item)}
            >
              <View style={styles.imageContainer}>
                <Image source={item.icon} style={styles.icon} />
              </View>
              <Text style={styles.cuisineName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  cuisineItem: {
    width: "50%",
    padding: 10,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },
  cuisineName: {
    marginTop: 8,
    fontSize: 14,
    color: "#E74C3C",
    textAlign: "center",
  },
})

export default Customers;