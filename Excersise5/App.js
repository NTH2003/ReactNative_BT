import React from "react";
import firestore from "@react-native-firebase/firestore";
import { View, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { Appbar, TextInput, Button } from "react-native-paper";
import Todo from "./todo";

function App() {
    const [todos, setTodos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [todo, setTodo] = React.useState('');
    const ref = firestore().collection('todos');

    async function addTodo() {
        if (todo.trim().length === 0) return;

        try {
            await ref.add({
                title: todo,
                completed: false,
            });
            setTodo('');
        } catch (error) {
            console.error('Lỗi khi thêm TODO:', error);
        }
    }

    React.useEffect(() => {
        const unsubscribe = ref.onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const { title, completed } = doc.data();
                list.push({ id: doc.id, title, completed });
            });
            setTodos(list);
            if (loading) setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1, padding: 16 }}>
                <Appbar>
                    <Appbar.Content title={'TODOs List'} />
                </Appbar>

                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Todo {...item} />}
                    style={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                />

                <TextInput
                    label="New TODO"
                    value={todo}
                    onChangeText={setTodo}
                    mode="outlined"
                    style={{ marginVertical: 8 }}
                />

                <Button mode="contained" onPress={addTodo}>
                    Add TODO
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
}

export default App;
