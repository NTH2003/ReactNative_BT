import { createContext, useContext, useMemo, useReducer } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

const MyContext = createContext();
MyContext.displayName = "vbdvabv";

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, userLogin: action.value };
        case "LOGOUT":
            return { ...state, userLogin: null };
        case "ADD_TO_CART":
            const existingItemIndex = state.cartItems.findIndex(
                (item) => item.id === action.value.id
            );
            let updatedCart;
            if (existingItemIndex !== -1) {
                updatedCart = state.cartItems.map((item, idx) =>
                    idx === existingItemIndex
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            } else {
                updatedCart = [...state.cartItems, { ...action.value, quantity: 1 }];
            }
            return { ...state, cartItems: updatedCart };
        case "UPDATE_CART_ITEM":
            const { id, quantity } = action.value;
            if (quantity <= 0) {
                // Xóa món khỏi giỏ
                const filtered = state.cartItems.filter((item) => item.id !== id);
                return { ...state, cartItems: filtered };
            } else {
                // Cập nhật số lượng món
                const updatedCart = state.cartItems.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                );
                return { ...state, cartItems: updatedCart };
            }
        default:
            return new Error("Action not found");
    }
};

const MyContextControllerProvider = ({ children }) => {
    const initialState = {
        userLogin: null,
        services: [],
        cartItems: [],
    };
    const [controller, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

const useMyContextController = () => {
    const context = useContext(MyContext);
    if (context == null)
        return new Error("useMyContextController must inside in MyContextControllerProvider");
    return context;
};

const USERS = firestore().collection("USERS");

const createAccount = (email, password, fullName, navigation) => {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            Alert.alert("Thành công", "Tạo tài khoản thành công với email: " + email);
            USERS.doc(email)
                .set({
                    email,
                    fullName,
                    role: "customer",
                    createdAt: firestore.FieldValue.serverTimestamp()
                })
                .catch(error => {
                    console.error("Lỗi khi lưu thông tin user:", error);
                    Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu thông tin người dùng");
                });
            // Chuyển sang màn hình đăng nhập
            if (navigation) navigation.navigate('Login');
        })
        .catch(error => {
            console.error("Lỗi khi tạo tài khoản:", error);
            Alert.alert("Lỗi", error.message);
        });
};

const login = (dispatch, email, password, navigation) => {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            USERS.doc(email)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const userData = doc.data();
                        console.log("Đăng nhập thành công với: " + email);
                        dispatch({type: "USER_LOGIN", value: userData});
                        
                        // Chuyển hướng dựa vào role
                        if (userData.role === "admin") {
                            navigation.navigate("Admin");
                        } else {
                            navigation.navigate("Customers");
                        }
                    } else {
                        Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng");
                    }
                })
                .catch(error => {
                    console.error("Lỗi khi lấy thông tin user:", error);
                    Alert.alert("Lỗi", "Đã xảy ra lỗi khi lấy thông tin người dùng");
                });
        })
        .catch(error => {
            console.error("Lỗi khi đăng nhập:", error);
            Alert.alert("Lỗi", error.message);
        });
};

const logout = (dispatch) => {
    auth()
        .signOut()
        .then(() => {
            dispatch({type: "LOGOUT"});
        })
        .catch(error => {
            console.error("Lỗi khi đăng xuất:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi đăng xuất");
        });
};

export { createAccount, login, logout, useMyContextController, MyContextControllerProvider };

