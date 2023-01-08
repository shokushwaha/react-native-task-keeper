import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [textInput, setTextInput] = useState('');

    useEffect(() => {
        getTodosFromUserDevice();
    }, []);

    useEffect(() => {
        saveTodoToUserDevice(todos);
    }, [todos]);

    const addTodo = () => {
        if (textInput == '') {
            Alert.alert('Error', 'Please input todo');
        } else {
            const newTodo = {
                id: Math.random(),
                task: textInput,
                completed: false,
            };
            setTodos([...todos, newTodo]);
            setTextInput('');
        }
    };

    const saveTodoToUserDevice = async todos => {
        try {
            const stringifyTodos = JSON.stringify(todos);
            await AsyncStorage.setItem('todos', stringifyTodos);
        } catch (error) {
            console.log(error);
        }
    };

    const getTodosFromUserDevice = async () => {
        try {
            const todos = await AsyncStorage.getItem('todos');
            if (todos != null) {
                setTodos(JSON.parse(todos));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const markTodoComplete = todoId => {
        const newTodosItem = todos.map(item => {
            if (item.id == todoId) {
                return { ...item, completed: true };
            }
            return item;
        });

        setTodos(newTodosItem);
    };

    const deleteTodo = todoId => {
        const newTodosItem = todos.filter(item => item.id != todoId);
        setTodos(newTodosItem);
    };

    const clearAllTodos = () => {
        Alert.alert('Sure?', 'Clear All Todos...?', [
            {
                text: 'Yes',
                onPress: () => setTodos([]),
            },
            {
                text: 'No',
            },
        ]);
    };
    const ListItem = ({ todo }) => {
        return (
            <View style={styles.listItem}>
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 15,
                            color: "#1f145c",
                            textDecorationLine: todo?.completed ? 'line-through' : 'none',
                        }}>
                        {todo?.task}
                    </Text>
                </View>
                {!todo?.completed && (
                    <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
                        <View style={[styles.actionIcon, { backgroundColor: "#6be012" }]}>
                            <Icon name="done" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
                    <View style={[styles.actionIcon, { backgroundColor: "#e02d12" }]}>
                        <Icon name="delete" size={20} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#2c2048',
                marginTop: 40,

            }}>
            <View style={styles.header}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 40,
                        color: "azure"
                    }}>
                    TODO APP
                </Text>
                <Icon name="delete" size={25} color="red" onPress={clearAllTodos} />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                data={todos}
                renderItem={({ item }) => <ListItem todo={item} />}
            />

            <View style={styles.footer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={textInput}
                        placeholder="Add Todo"
                        onChangeText={text => setTextInput(text)}
                    />
                </View>
                <TouchableOpacity onPress={addTodo}>
                    <View style={styles.iconContainer}>
                        <Icon name="add" backgroundColor="#3b5998" color="#ff6071" size={40} />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Home


const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: "#2c2048",
    },
    inputContainer: {
        height: 40,
        padding: 10,
        elevation: 40,
        backgroundColor: "#ff6071",
        flex: 1,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 20,
        color: "black"
    },
    iconContainer: {
        height: 50,
        width: 50,
        backgroundColor: "#1f145c",
        elevation: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

    listItem: {
        padding: 10,
        backgroundColor: "#ffe477",
        flexDirection: 'row',
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10,
    },
    actionIcon: {
        height: 25,
        width: 25,
        backgroundColor: "azure",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        marginLeft: 5,
        borderRadius: 3,
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})