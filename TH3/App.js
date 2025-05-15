import { MyContextControllerProvider } from "./store";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./routers/Router";

const App = () => {
    const USERS = firestore().collection("USERS");
    const admin = {
        fullName: "Admin",
        email: "hau@gmail.com",
        password: "123456",
        phone: "0913131732",
        address: "Bình Dương",
        role: "admin"
    };

    useEffect(() => {
        USERS.doc(admin.email)
            .onSnapshot(u => {
                if (!u) {
                    console.log("Không lấy được document snapshot từ Firestore");
                    return;
                }
                if (!u.exists) {
                    auth()
                        .createUserWithEmailAndPassword(admin.email, admin.password)
                        .then(response => {
                            USERS.doc(admin.email).set(admin);
                            console.log("Add new account admin");
                        })
                        .catch(e => {
                            console.log("Lỗi tạo tài khoản admin:", e.message);
                        });
                }
            });
    }, []);

    return (
        <MyContextControllerProvider>
            <NavigationContainer>
                <Router />
            </NavigationContainer>
        </MyContextControllerProvider>
    );
};

export default App;