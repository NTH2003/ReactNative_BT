import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native"
import { Text, TextInput, Button, Avatar, Card, Divider, IconButton } from "react-native-paper"
import { logout, useMyContextController } from "../store"
import firestore from "@react-native-firebase/firestore"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import auth from "@react-native-firebase/auth"

const Setting = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [controller, dispatch] = useMyContextController()
  const { userLogin } = controller

  const [fullName, setFullName] = useState(userLogin?.fullName || "")
  const [phone, setPhone] = useState(userLogin?.phone || "")
  const [address, setAddress] = useState(userLogin?.address || "")
  const [loading, setLoading] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const handleUpdateProfile = async () => {
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!")
      return
    }

    setLoading(true)
    try {
      await firestore().collection("USERS").doc(userLogin.email).update({
        fullName,
        phone,
        address,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      })
      Alert.alert("Thành công", "Cập nhật thông tin thành công!")
    } catch (e) {
      Alert.alert("Lỗi", e.message || "Không thể cập nhật thông tin!")
    }
    setLoading(false)
  }

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!")
      return
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới không khớp!")
      return
    }

    if (newPassword.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu mới phải có ít nhất 6 ký tự!")
      return
    }

    setLoading(true)
    try {
      const user = auth().currentUser
      const credential = auth.EmailAuthProvider.credential(
        userLogin.email,
        currentPassword
      )

      await user.reauthenticateWithCredential(credential)
      await user.updatePassword(newPassword)
      
      Alert.alert("Thành công", "Đổi mật khẩu thành công!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setShowChangePassword(false)
    } catch (e) {
      Alert.alert("Lỗi", e.message || "Không thể đổi mật khẩu!")
    }
    setLoading(false)
  }

  const handleLogout = () => {
    Alert.alert("Xác nhận đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => logout(dispatch),
      },
    ])
  }

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate("Login");
    }
  }, [userLogin]);

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]} contentContainerStyle={styles.contentContainer}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Avatar.Text
            size={80}
            label={getInitials(fullName)}
            style={styles.avatar}
            color="#fff"
            backgroundColor="#f5586c"
          />
          <View style={styles.editAvatarButton}>
            <IconButton icon="camera" size={16} iconColor="#fff" style={styles.editIcon} />
          </View>
        </TouchableOpacity>
        <Text style={styles.emailText}>{userLogin?.email}</Text>
      </View>

      {/* Personal Information Card */}
      <Card style={styles.card} mode="elevated">
        <Card.Title
          title="Thông tin cá nhân"
          titleStyle={styles.cardTitle}
          left={(props) => <IconButton {...props} icon="account-edit" iconColor="#f5586c" />}
        />
        <Card.Content style={styles.cardContent}>
          <TextInput
            label="Họ và tên"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            mode="outlined"
            outlineColor="#e0e0e0"
            activeOutlineColor="#f5586c"
            left={<TextInput.Icon icon="account" color="#757575" />}
          />
          <TextInput
            label="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
            mode="outlined"
            outlineColor="#e0e0e0"
            activeOutlineColor="#f5586c"
            left={<TextInput.Icon icon="phone" color="#757575" />}
          />
          <TextInput
            label="Địa chỉ"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            mode="outlined"
            outlineColor="#e0e0e0"
            activeOutlineColor="#f5586c"
            left={<TextInput.Icon icon="map-marker" color="#757575" />}
          />
          <Button
            mode="contained"
            onPress={handleUpdateProfile}
            loading={loading}
            disabled={loading}
            style={styles.updateButton}
            labelStyle={styles.buttonLabel}
            icon="content-save"
          >
            Cập nhật thông tin
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="elevated">
        <Card.Title
          title="Tài khoản"
          titleStyle={styles.cardTitle}
          left={(props) => <IconButton {...props} icon="cog" iconColor="#f5586c" />}
        />
        <Card.Content style={styles.cardContent}>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => setShowChangePassword(!showChangePassword)}
          >
            <IconButton icon="shield-lock" size={24} iconColor="#757575" />
            <Text style={styles.settingText}>Đổi mật khẩu</Text>
            <IconButton 
              icon={showChangePassword ? "chevron-up" : "chevron-down"} 
              size={24} 
              iconColor="#757575" 
            />
          </TouchableOpacity>

          {showChangePassword && (
            <View style={styles.passwordForm}>
              <TextInput
                label="Mật khẩu hiện tại"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
                style={styles.input}
                mode="outlined"
                outlineColor="#e0e0e0"
                activeOutlineColor="#f5586c"
                left={<TextInput.Icon icon="lock" color="#757575" />}
                right={
                  <TextInput.Icon
                    icon={showCurrentPassword ? "eye-off" : "eye"}
                    onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  />
                }
              />
              <TextInput
                label="Mật khẩu mới"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                style={styles.input}
                mode="outlined"
                outlineColor="#e0e0e0"
                activeOutlineColor="#f5586c"
                left={<TextInput.Icon icon="lock-plus" color="#757575" />}
                right={
                  <TextInput.Icon
                    icon={showNewPassword ? "eye-off" : "eye"}
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  />
                }
              />
              <TextInput
                label="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                mode="outlined"
                outlineColor="#e0e0e0"
                activeOutlineColor="#f5586c"
                left={<TextInput.Icon icon="lock-check" color="#757575" />}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? "eye-off" : "eye"}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
              />
              <Button
                mode="contained"
                onPress={handleChangePassword}
                loading={loading}
                disabled={loading}
                style={styles.updateButton}
                labelStyle={styles.buttonLabel}
                icon="content-save"
              >
                Cập nhật mật khẩu
              </Button>
            </View>
          )}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        labelStyle={styles.buttonLabel}
        icon="logout"
      >
        Đăng xuất
      </Button>

      <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 8,
  },
  avatar: {
    elevation: 4,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#f5586c",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  editIcon: {
    margin: 0,
  },
  emailText: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#424242",
  },
  cardContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  updateButton: {
    marginTop: 8,
    backgroundColor: "#f5586c",
    borderRadius: 8,
    elevation: 2,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  settingText: {
    fontSize: 16,
    color: "#424242",
    flex: 1,
  },
  passwordForm: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  divider: {
    marginVertical: 4,
  },
  logoutButton: {
    backgroundColor: "#b71c1c",
    borderRadius: 8,
    elevation: 2,
    marginTop: 8,
  },
  versionText: {
    textAlign: "center",
    color: "#9e9e9e",
    fontSize: 12,
    marginTop: 24,
  },
})

export default Setting
