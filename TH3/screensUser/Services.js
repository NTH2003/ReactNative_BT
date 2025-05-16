import React from "react";
import { View, FlatList } from "react-native";
import { Searchbar, Text } from "react-native-paper";
import fireStore from "@react-native-firebase/firestore";
import ItemService from "./ItemService";

const Services = ({ navigation }) => {
    const [search, setSearch] = React.useState("");
    const [service, setServices] = React.useState([]);
    const ServiceList = fireStore().collection("SERVICES");
    const [filteredServices, setFilteredServices] = React.useState([]);

    React.useEffect(() => {
        return ServiceList.onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { name, price } = doc.data();
                list.push({
                    id: doc.id,
                    name,
                    price,
                });
            });
            console.log("Dịch vụ lấy được:", list);
            setServices(list);
        });
    }, []);

    return (
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                <Searchbar
                    placeholder="search service"
                    onChangeText={setSearch}
                    value={search}
                />
            </View>
            <View>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Danh sách dịch vụ</Text>
                <FlatList
                    data={service}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ItemService
                            id={item.id}
                            ServiceName={item.name}
                            Price={item.price}
                            onPress={() => navigation.navigate('ServiceDetail', { service: item })}
                        />
                    )}
                    contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
                    style={{ marginTop: 0 }}
                />
            </View>
        </View>
    );
};

export default Services;