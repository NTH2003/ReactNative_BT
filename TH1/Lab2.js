import React, { useState } from "react";
import { StyleSheet, Vibration, View } from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import { evaluate } from 'mathjs';

const Calculator = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [currentNumber, setCurrentNumber] = useState("");
    const [lastNumber, setLastNumber] = useState("");

    const bgColorFunction = darkMode ? "#414853" : "#ededed";
    const bgColorNumber = darkMode ? "#303946" : "#fff";
    const bgColorResult = darkMode ? "#282f38" : "#f5f5f5";
    const bgColorThemeButton = darkMode ? "#7b8084" : "#e5e5e5";
    const textColorHistory = darkMode ? "#857b7b" : "#7c7c7c";
    const colorIcon = darkMode ? "white" : "black";

    const buttonsLeft = [
        ["C", "DEL"],
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3],
        [0, "."],
    ];

    const buttonsRight = ["/", "*", "-", "+", "="];

    // Hàm tính toán, xử lý lỗi và giới hạn số chữ số sau dấu .
    const calculator = () => {
        const lastChar = currentNumber[currentNumber.length - 1];
        if (["+", "-", "*", "/", "."].includes(lastChar)) {
            return;
        }
        try {
            let result = evaluate(currentNumber).toString();
            result = parseFloat(result).toFixed(6).replace(/\.?0+$/, "");
            setCurrentNumber(result);
        } catch {
            setCurrentNumber("Lỗi tính toán");
        }
    };

    // Hàm xử lý nút bấm
    const handleInput = (btn) => {
        const lastChar = currentNumber[currentNumber.length - 1];
        // Kiểm tra không cho nhập toán tử liên tiếp
        if (["+", "-", "*", "/"].includes(btn) && (currentNumber === "" || ["+", "-", "*", "/"].includes(lastChar))) {
            return;
        }
        // Kiểm tra dấu chấm, không cho nhập nhiều dấu chấm trong một số
        if (btn === ".") {
            const parts = currentNumber.split(/[\+\-\*\/]/);
            const lastPart = parts[parts.length - 1];
            if (lastPart.includes(".")) return;
        }

        switch (btn) {
            case "C":
                setCurrentNumber("");
                setLastNumber("");
                break;
            case "DEL":
                setCurrentNumber(currentNumber.slice(0, -1));
                break;
            case "=":
                setLastNumber(currentNumber + "=");
                calculator();
                break;
            default:
                setCurrentNumber(currentNumber + btn);
        }
    };

    return (
        <View style={styles.container}>
            {/* Kết quả */}
            <View style={{ ...styles.containerResult, backgroundColor: bgColorResult }}>
                <IconButton
                    icon={darkMode ? "white-balance-sunny" : "moon-waning-crescent"}
                    size={30}
                    onPress={() => setDarkMode(!darkMode)}
                    style={{ ...styles.themeButton, backgroundColor: bgColorThemeButton }}
                    iconColor={colorIcon}
                />
                <Text style={{ ...styles.historyText, color: textColorHistory }}>{lastNumber}</Text>
                <Text style={styles.resultText}>{currentNumber}</Text>
            </View>

            {/* Nút bấm */}
            <View style={styles.containerButton}>
                {/* Bên trái */}
                <View style={styles.containerButtonLeft}>
                    {buttonsLeft.map((row, index) => (
                        <View
                            key={index}
                            style={{
                                ...styles.containerRow,
                                backgroundColor: index === 0 ? bgColorFunction : bgColorNumber,
                            }}
                        >
                            {row.map((item, i) => (
                                <Button
                                    key={i}
                                    mode="text"
                                    onPress={() => handleInput(item.toString())}
                                    style={styles.button}
                                    labelStyle={styles.buttonText}
                                >
                                    {item}
                                </Button>
                            ))}
                        </View>
                    ))}
                </View>

                {/* Bên phải */}
                <View style={styles.containerButtonRight}>
                    {buttonsRight.map((item, index) => (
                        <Button
                            key={index}
                            mode="contained"
                            onPress={() => handleInput(item)}
                            style={styles.button}
                            labelStyle={{ ...styles.buttonText, color: "#fff" }}
                            buttonColor="#00b9d6"
                        >
                            {item}
                        </Button>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default Calculator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerResult: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "flex-end",
        paddingHorizontal: 15,
    },
    containerButton: {
        flex: 2,
        flexDirection: "row",
    },
    containerButtonLeft: {
        flex: 3,
    },
    containerButtonRight: {
        flex: 1,
        backgroundColor: "#00b9d6",
        justifyContent: "space-around",
    },
    containerRow: {
        flex: 1,
        flexDirection: "row",
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    themeButton: {
        marginTop: 50,
        borderRadius: 30,
        height: 60,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
    },
    historyText: {
        fontSize: 18,
    },
    resultText: {
        color: "#00b9d6",
        fontSize: 35,
    },
});
