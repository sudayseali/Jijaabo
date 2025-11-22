// FAYLKA GUUD EE REACT NATIVE (EXPO) OO DHAMMAYSTIRAN
// (Waa la cusbooneysiiyay oo lagu daray Nidaamka Casuumadda & Nidaamka Ogeysiisyada)
// ------------------------------------------------------------------------------------
import React, { useState, useEffect, useContext, createContext } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, Switch, ScrollView, Alert, useColorScheme,
  ActivityIndicator, StatusBar, Image, Platform,
} from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

// Maktabadaha aan ku darnay
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker'; 

// ------------------------------------------------------------------------------------
// 0. FUNCTIONS CAAWIN (STORAGE HELPERS)
// ------------------------------------------------------------------------------------

// Function-ka lagu keydinayo xogta (JSON format)
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Failed to save data to storage", e);
  }
};

// Function-ka lagu soo saarayo xogta (JSON format)
const loadData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Failed to load data from storage", e);
    return null;
  }
};


// ------------------------------------------------------------------------------------
// 1. CONSTANTS: Turjumaada (Translations) iyo Themes
// ------------------------------------------------------------------------------------

const translations = {
  so: {
    // Shared
    appName: "Task Earn Somali",
    hello: "Hello,",
    loading: "Soo deji... ",
    congratulations: "Hambalyo!",
    requiredFields: "Faylasha Waa La Rabaa",
    quickMenu: "Menu Degdeg ah",
    back: "Ku noqo",
    
    // Auth
    login: "Gal",
    signup: "Isdiiwaangeli",
    email: "Email-ka",
    password: "Password-ka",
    forgotPassword: "Password-ka ma ilaawday?",
    noAccount: "Ma haysatid account?",
    haveAccount: "Ma Haysaa Account?",
    confirmPassword: "Xaqiiji Password-ka",
    passwordMismatchShort: "Password-ku isma laha",
    loginError: "Cilad Gelitaan",
    loginErrorDetails: "Email-kaaga ama password-kaagu waa qalad.",
    loginNoAccount: "Ma jiro account diiwaangashan. Fadlan isdiiwaangeli.",
    sendResetLink: "Dir Linkiga Dib-u-dejinta",
    resetLinkSent: "Linkiga dib-u-dejinta waa la diray (Simulated)",
    resetInstructions: "Geli email-kaaga si aad u hesho linkiga dib-u-dejinta password-kaaga.",

    // Tabs
    home: "Hoyga",
    earn: "Kasbo",
    wallet: "Jeebka",
    profile: "Profile",
    
    // Home & Earn
    tasksForYou: "Shaqooyinka Adiga kuu Gaarka ah",
    popularTasks: "Shaqooyinka caanka ah",
    viewAll: "Arag Dhammaan",
    taskDetails: "Faahfaahinta Shaqada",
    reward: "Abaalmarin",
    steps: "Tallaabooyinka",
    requirements: "Shuruudaha",
    completeTask: "Dhammaystir Shaqada",
    
    // Wallet
    currentBalance: "Hadhaagaaga Hadda",
    totalEarned: "Wadarta Aad Kasbatay",
    withdrawal: "Kala Bixista",
    transactionHistory: "Taariikhda Kala Bixista",
    withdrawRequest: "Codsiga Kala Bixista",
    enterAmount: "Geli Qadarka",
    minWithdrawal: "Kala Bixista ugu Yar waa $10.00",
    
    // Profile & Settings
    editProfile: "Wax ka Beddel Profile-ka",
    notification: "Ogeysiisyada",
    changePassword: "Beddel Password-ka",
    settingsAndSupport: "Dejinta & Taageerada",
    signOut: "Ka bax",
    darkMode: "Qaabka Mugdiga",
    language: "Luqadda",
    somali: "Soomaali",
    english: "English",
    permissionDenied: "Ogolaansho la Diiday",
    permissionDetails: "Waan u baahannahay ogolaanshahaaga si aan u galno gallery-gaaga.",
    profilePicUpdated: "Sawirkaaga profile-ka waa la beddelay.",
    
    // Proof Submission
    submitProof: "Xareey Cadeyn",
    proofImage: "Sawirka Caddeynta",
    proofText: "Faahfaahinta Caddeynta",
    uploadImage: "Soo geli Sawir",

    // Change Password
    oldPassword: "Password-kii Hore",
    newPassword: "Password-ka Cusub",
    confirmNewPassword: "Xaqiiji Password-ka Cusub",
    passwordMismatch: "Password-ka cusub isma laha",
    saveChanges: "Keydi Isbeddelada",

    // ** CUSBOONAYSII REFERRAL **
    referralCode: "Koodhka Casuumada (Haddii uu jiro)",
    referralCodeNotFound: "Lama helin koodhka casuumada.",
    
    // ** CUSBOONAYSII NOTIFICATION **
    notifications: "Ogeysiisyada",
    noNotifications: "Wax ogeysiis ah oo cusub ma jiraan.",
    taskApproved: "Shaqo la Ansixiyay",
    taskRejected: "Shaqo la Diiday",
    withdrawalApproved: "Kala Bax la Ansixiyay",
    withdrawalRejected: "Kala Bax la Diiday",
    taskApprovedMessage: "Shaqadaadii '{taskTitle}' waa la ansixiyay. Waxaad heshay ${amount}.",
    taskRejectedMessage: "Shaqadaadii '{taskTitle}' waa la diiday. Sabab: {reason}.",
    withdrawalApprovedMessage: "Codsigaagii kala bixista ee ahaa ${amount} waa la ansixiyay.",
    withdrawalRejectedMessage: "Codsigaagii kala bixista ee ahaa ${amount} waa la diiday. Sabab: {reason}.",
    justNow: "Hadda",
    reasonNotProvided: "Caddeyn ku filan lama helin.",
    reasonInvalidAccount: "Macluumaadka account-ka oo qalad ah."
  },
  en: {
    // Shared
    appName: "Task Earn Somali",
    hello: "Hello,",
    loading: "Loading...",
    congratulations: "Congratulations!",
    requiredFields: "Required Fields",
    quickMenu: "Quick Menu",
    back: "Back",

    // Auth
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    confirmPassword: "Confirm Password",
    passwordMismatchShort: "Passwords do not match",
    loginError: "Login Error",
    loginErrorDetails: "Your email or password incorrect.",
    loginNoAccount: "No account found. Please sign up.",
    sendResetLink: "Send Reset Link",
    resetLinkSent: "Reset link sent (Simulated)",
    resetInstructions: "Enter your email to receive a link to reset your password.",


    // Tabs
    home: "Home",
    earn: "Earn",
    wallet: "Wallet",
    profile: "Profile",

    // Home & Earn
    tasksForYou: "Tasks Just For You",
    popularTasks: "Popular Tasks",
    viewAll: "View All",
    taskDetails: "Task Details",
    reward: "Reward",
    steps: "Steps",
    requirements: "Requirements",
    completeTask: "Complete Task",

    // Wallet
    currentBalance: "Current Balance",
    totalEarned: "Total Earned",
    withdrawal: "Withdrawal",
    transactionHistory: "Transaction History",
    withdrawRequest: "Withdrawal Request",
    enterAmount: "Enter Amount",
    minWithdrawal: "Minimum Withdrawal is $10.00",

    // Profile & Settings
    editProfile: "Edit Profile",
    notification: "Notifications",
    changePassword: "Change Password",
    settingsAndSupport: "Settings & Support",
    signOut: "Sign Out",
    darkMode: "Dark Mode",
    language: "Language",
    somali: "Somali",
    english: "English",
    permissionDenied: "Permission Denied",
    permissionDetails: "We need your permission to access your gallery.",
    profilePicUpdated: "Your profile picture has been updated.",

    // Proof Submission
    submitProof: "Submit Proof",
    proofImage: "Proof Image",
    proofText: "Proof Description",
    uploadImage: "Upload Image",

    // Change Password
    oldPassword: "Old Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    passwordMismatch: "New passwords do not match",
    saveChanges: "Save Changes",

    // ** CUSBOONAYSII REFERRAL **
    referralCode: "Referral Code (Optional)",
    referralCodeNotFound: "Referral code not found.",

    // ** NOTIFICATION UPDATE **
    notifications: "Notifications",
    noNotifications: "No new notifications yet.",
    taskApproved: "Task Approved",
    taskRejected: "Task Rejected",
    withdrawalApproved: "Withdrawal Approved",
    withdrawalRejected: "Withdrawal Rejected",
    taskApprovedMessage: "Your task '{taskTitle}' was approved. You earned ${amount}.",
    taskRejectedMessage: "Your task '{taskTitle}' was rejected. Reason: {reason}.",
    withdrawalApprovedMessage: "Your withdrawal request for ${amount} was approved.",
    withdrawalRejectedMessage: "Your withdrawal request for ${amount} was rejected. Reason: {reason}.",
    justNow: "Just now",
    reasonNotProvided: "Insufficient proof provided.",
    reasonInvalidAccount: "Invalid account details."
  },
};

const colors = {
  primary: "#4CAF50", // Green
  primaryLight: "#81C784",
  secondary: "#FFC107", // Amber
  text: "#333333",
  textSecondary: "#666666",
  white: "#FFFFFF",
  black: "#000000",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  border: "#E0E0E0",
  danger: "#FF5252",
  dangerLight: "#FF8A80",
  success: "#4CAF50",
  overlay: "rgba(0,0,0,0.5)",
};

const darkColors = {
  primary: "#81C784", // Lighter Green
  primaryLight: "#4CAF50",
  secondary: "#FFEB3B", // Yellow
  text: "#E0E0E0",
  textSecondary: "#B0B0B0",
  white: "#121212",
  black: "#FFFFFF",
  background: "#121212",
  surface: "#1E1E1E",
  border: "#333333",
  danger: "#FF8A80",
  dangerLight: "#D32F2F",
  success: "#81C784",
  overlay: "rgba(0,0,0,0.8)",
};

const typography = {
  titleLarge: { fontSize: 28, fontWeight: "800" },
  titleMedium: { fontSize: 20, fontWeight: "700" },
  titleSmall: { fontSize: 16, fontWeight: "600" },
  labelLarge: { fontSize: 14, fontWeight: "600" },
  bodyLarge: { fontSize: 16, fontWeight: "400" },
  bodyMedium: { fontSize: 14, fontWeight: "400" },
  bodySmall: { fontSize: 12, fontWeight: "300" },
};

const spacing = {
  xs: 4,
  small: 8,
  medium: 16,
  large: 24,
  xl: 32,
};

const getTheme = (isDarkMode) => ({
  colors: isDarkMode ? darkColors : colors,
  typography,
  spacing,
});

// ------------------------------------------------------------------------------------
// 2. CONTEXT & HOOKS
// ------------------------------------------------------------------------------------

const AppContext = createContext();
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return { ...context, t: translations[context.lang] };
};

// ------------------------------------------------------------------------------------
// 3. BASE COMPONENTS
// ------------------------------------------------------------------------------------

// Qaadista Screen-ka & Spacing-ga
function ScreenContainer({ children, scrollable = false, style = {} }) {
  const { theme } = useAppContext();
  const insets = useSafeAreaInsets();
  const Component = scrollable ? ScrollView : View;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: scrollable ? 0 : insets.top,
      paddingHorizontal: theme.spacing.medium,
    },
  });

  return (
    <Component style={[styles.container, style]}>
      {children}
      {/* Haddii aanay ahayn ScrollView, waxaan ku darsanaynaa padding-ga hoose */}
      {!scrollable && <View style={{ height: insets.bottom }} />}
    </Component>
  );
}

// Cinwaanka Screen-ka
function ScreenHeader({ title, onBack }) {
  const { theme } = useAppContext();
  const insets = useSafeAreaInsets();
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing.medium,
      paddingTop: insets.top + theme.spacing.small,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      ...theme.typography.titleMedium,
      color: theme.colors.text,
      flex: 1,
      textAlign: "center",
      marginRight: onBack ? 30 : 0, // Si uu badhanka u shaqeeyo
    },
    backButton: {
      padding: theme.spacing.small,
      borderRadius: 12,
      backgroundColor: theme.colors.border,
    },
  });

  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

// Badhanka Guud
function AppButton({ title, onPress, variant = "primary", isLoading = false, style = {} }) {
  const { theme } = useAppContext();
  const isPrimary = variant === "primary";
  const isOutline = variant === "outline";

  const styles = StyleSheet.create({
    button: {
      paddingVertical: theme.spacing.medium,
      paddingHorizontal: theme.spacing.large,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isPrimary ? theme.colors.primary : theme.colors.surface,
      borderWidth: isOutline ? 2 : 0,
      borderColor: isOutline ? theme.colors.primary : "transparent",
      opacity: isLoading ? 0.7 : 1,
      minHeight: 56,
    },
    text: {
      ...theme.typography.labelLarge,
      color: isPrimary && !isOutline ? theme.colors.white : theme.colors.primary,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} disabled={isLoading} style={[styles.button, style]}>
      {isLoading ? (
        <ActivityIndicator color={isPrimary ? theme.colors.white : theme.colors.primary} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

// Goobta Qoraalka
function AppTextInput({ label, placeholder, value, onChangeText, secureTextEntry = false, keyboardType = "default", style = {}, variant = "default", multiline = false, numberOfLines = 1, editable = true, autoCapitalize = "none" }) {
  const { theme } = useAppContext();
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: theme.spacing.medium,
    },
    label: {
      ...theme.typography.labelLarge,
      color: theme.colors.text,
      marginBottom: theme.spacing.small,
    },
    input: {
      ...theme.typography.bodyLarge,
      color: editable ? theme.colors.text : theme.colors.textSecondary,
      backgroundColor: variant === "underline" ? "transparent" : (editable ? theme.colors.surface : theme.colors.background),
      padding: variant === "underline" ? theme.spacing.small : theme.spacing.medium,
      borderRadius: variant === "underline" ? 0 : 12,
      borderWidth: variant === "underline" ? 0 : 1,
      borderColor: variant === "underline" ? theme.colors.border : theme.colors.border,
      borderBottomWidth: variant === "underline" ? 1 : 1,
      minHeight: multiline ? 100 : 50,
    },
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
        editable={editable}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}

// Item-yada Dejinta
function SettingItem({ icon, label, onPress, isSwitch = false, switchValue = false, onSwitchChange = () => {} }) {
  const { theme } = useAppContext();
  const styles = StyleSheet.create({
    item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: theme.spacing.medium,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
    },
    label: {
      ...theme.typography.bodyLarge,
      color: theme.colors.text,
      marginLeft: theme.spacing.medium,
    },
    icon: {
      width: 30,
      alignItems: "center",
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: theme.spacing.medium,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    'item:last-child': { 
      borderBottomWidth: 0,
    }
  });

  return (
    <TouchableOpacity style={[styles.item, { borderBottomWidth: 1, borderBottomColor: theme.colors.border }]} onPress={isSwitch ? undefined : onPress}>
      <View style={styles.content}>
        <View style={styles.icon}>
          <Ionicons name={icon} size={24} color={theme.colors.primary} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      {isSwitch ? (
        <Switch
          trackColor={{ false: theme.colors.border, true: theme.colors.primaryLight }}
          thumbColor={switchValue ? theme.colors.primary : theme.colors.textSecondary}
          onValueChange={onSwitchChange}
          value={switchValue}
        />
      ) : (
        <Ionicons name="chevron-forward-outline" size={20} color={theme.colors.textSecondary} />
      )}
    </TouchableOpacity>
  );
}


// Item-ka Shaqada
function TaskItem({ task, onPress }) {
  const { theme, t } = useAppContext();
  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: theme.spacing.medium,
      marginBottom: theme.spacing.medium,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 3,
    },
    icon: {
      width: 50,
      height: 50,
      borderRadius: 10,
      backgroundColor: theme.colors.primaryLight,
      justifyContent: "center",
      alignItems: "center",
      marginRight: theme.spacing.medium,
    },
    info: {
      flex: 1,
    },
    title: {
      ...theme.typography.labelLarge,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    description: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
    },
    reward: {
      ...theme.typography.titleSmall,
      color: theme.colors.primary,
    },
  });

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(task)}>
      <View style={styles.icon}>
        <Ionicons name={task.icon || "receipt-outline"} size={28} color={theme.colors.primary} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
        <Text style={styles.description} numberOfLines={1}>{task.description}</Text>
      </View>
      <Text style={styles.reward}>${task.reward.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

// ------------------------------------------------------------------------------------
// 4. SHAASHADAHA (SCREENS)
// ------------------------------------------------------------------------------------

const DUMMY_TASKS = [
  { id: "t1", title: "Ku Diiwaangeli Survey", description: "Jawaab u bixi 10 su'aalood oo kooban", reward: 0.50, icon: "create-outline" },
  { id: "t2", title: "Daawo Video gaabi", description: "Daawo 30 ilbiriqsi si aad u kasbato", reward: 0.25, icon: "videocam-outline" },
  { id: "t3", title: "Ku rakib App Cusub", description: "App-ka rakib oo fur si aad u hesho", reward: 1.20, icon: "cloud-download-outline" },
  { id: "t4", title: "La wadaag saaxiibkaa", description: "U dir linkigaaga qof kale", reward: 0.75, icon: "share-social-outline" },
];

// --- AUTH SCREENS ---

function SplashScreen({ navigation }) {
  const { theme, t } = useAppContext();
  
  useEffect(() => {
    const checkAuth = async () => {
      // Waa la cusbooneysiiyay si ay ula jaanqaado nidaamka cusub
      const token = await loadData('auth_token');
      const email = await loadData('current_user_email');
      
      if (token && email) {
        navigation.replace("MainTabs");
      } else {
        navigation.replace("Login");
      }
    };
    setTimeout(() => {
      checkAuth();
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}>
      <Ionicons name="cash-outline" size={60} color={theme.colors.primary} />
      <Text style={{ ...theme.typography.titleLarge, color: theme.colors.text, marginTop: theme.spacing.medium }}>{t.appName}</Text>
      <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: theme.spacing.large }} />
    </View>
  );
}

// ** CUSBOONAYSII LOGIN SCREEN **
function LoginScreen({ navigation }) {
  const { theme, t, setUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const allCredentials = (await loadData("all_credentials")) || {};
    const allUsers = (await loadData("all_users")) || {};

    // Hubi haddii email-ka jiro oo password-ku sax yahay
    if (allCredentials[email] && allCredentials[email] === password) {
      const userProfile = allUsers[email];
      
      if (userProfile) {
        
        // Hubi in user profile-ka uu leeyahay 'notifications'
        const fullUserProfile = {
          ...userProfile,
          notifications: userProfile.notifications || []
        };

        setUser(fullUserProfile); // Deji user-ka guud
        await storeData("auth_token", "dummy-token-12345");
        await storeData("current_user_email", email); // Kaydi email-ka user-ka hadda galay
        navigation.replace("MainTabs");
      } else {
        // Kani waa haddii credentials-ka jiro laakiin profile-ku uusan jirin (waa cilad)
        setIsLoading(false);
        Alert.alert(t.loginError, "Cilad profile-ka. Fadlan la xiriir support.");
      }
    } else {
      setIsLoading(false);
      Alert.alert(t.loginError, t.loginErrorDetails);
    }
  };

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ ...theme.typography.titleLarge, color: theme.colors.primary, marginBottom: theme.spacing.large }}>{t.login}</Text>
        <AppTextInput label={t.email} placeholder="tusaale@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <AppTextInput label={t.password} placeholder="******" value={password} onChangeText={setPassword} secureTextEntry />
        
        <TouchableOpacity 
          style={{ alignSelf: "flex-end", marginBottom: theme.spacing.large }}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={{ color: theme.colors.primary, ...theme.typography.labelLarge }}>{t.forgotPassword}</Text>
        </TouchableOpacity>
        
        <AppButton title={t.login} onPress={handleLogin} isLoading={isLoading} />
        
        <TouchableOpacity style={{ marginTop: theme.spacing.large, alignItems: "center" }} onPress={() => navigation.navigate("Signup")}>
          <Text style={{ color: theme.colors.textSecondary }}>
            {t.noAccount} <Text style={{ color: theme.colors.primary, fontWeight: "600" }}>{t.signup}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

// ** CUSBOONAYSII SIGNUP SCREEN (REFERRAL + NOTIFICATIONS) **
function SignupScreen({ navigation }) {
  const { theme, t } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCodeInput, setReferralCodeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert(t.requiredFields, "Fadlan buuxi dhammaan goobaha.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(t.requiredFields, t.passwordMismatchShort);
      return;
    }

    setIsLoading(true);

    try {
      // 1. Soo rAR dhammaan isticmaalayaasha jira
      const allCredentials = (await loadData("all_credentials")) || {};
      const allUsers = (await loadData("all_users")) || {};

      // 2. Hubi haddii email-ka hore loo isticmaalay
      if (allCredentials[email]) {
        setIsLoading(false);
        Alert.alert("Cilad", "Email-kan hore waa loo isticmaalay.");
        return;
      }

      // 3. Hubi koodhka casuumada (Referral Code Check)
      let referredByEmail = null;
      if (referralCodeInput.trim()) {
        const usersList = Object.values(allUsers);
        const referringUser = usersList.find(
          (u) => u.referralCode === referralCodeInput.trim().toUpperCase()
        );

        if (!referringUser) {
          setIsLoading(false);
          Alert.alert(t.requiredFields, t.referralCodeNotFound);
          return;
        }
        referredByEmail = referringUser.email;
      }

      // 4. Abuur user cusub
      const simpleName = email.split("@")[0];
      const newUserProfile = {
        name: simpleName,
        email: email,
        balance: 0.0,
        totalEarned: 0.0,
        tasksCompleted: 0,
        avatarUrl: `https://placehold.co/100x100/CCCCCC/FFFFFF?text=${email[0].toUpperCase()}`,
        referralCode: `${simpleName.toUpperCase()}${Math.floor(Math.random() * 900 + 100)}`, // Tusaale: USER123
        referredByEmail: referredByEmail, // Email-ka qofka casuumay
        referralEarnings: 0.0, // Lacagta uu ka helay casuumadaha
        notifications: [], // <-- WAA KAN CUSUB
      };

      // 5. Kaydi user-ka cusub
      allCredentials[email] = password;
      allUsers[email] = newUserProfile;

      await storeData("all_credentials", allCredentials);
      await storeData("all_users", allUsers);

      setIsLoading(false);
      Alert.alert(
        t.congratulations,
        "Isdiiwaangelintaada waa la dhammaystiray. Hadda gal."
      );
      navigation.replace("Login");
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      Alert.alert("Cilad", "Waa la keydin waayay xogtaada.");
    }
  };

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            ...theme.typography.titleLarge,
            color: theme.colors.primary,
            marginBottom: theme.spacing.large,
          }}
        >
          {t.signup}
        </Text>
        <AppTextInput
          label={t.email}
          placeholder="tusaale@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <AppTextInput
          label={t.password}
          placeholder="******"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <AppTextInput
          label={t.confirmPassword}
          placeholder="******"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {/* GOOBTA CUSUB EE REFERRAL-KA */}
        <AppTextInput
          label={t.referralCode}
          placeholder="Tusaale: SAaxiib123"
          value={referralCodeInput}
          onChangeText={setReferralCodeInput}
          autoCapitalize="characters"
        />

        <AppButton
          title={t.signup}
          onPress={handleSignup}
          isLoading={isLoading}
          style={{ marginTop: theme.spacing.large }}
        />

        <TouchableOpacity
          style={{ marginTop: theme.spacing.large, alignItems: "center" }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: theme.colors.textSecondary }}>
            {t.haveAccount}{" "}
            <Text style={{ color: theme.colors.primary, fontWeight: "600" }}>
              {t.login}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}


function ForgotPasswordScreen({ navigation }) {
  const { theme, t } = useAppContext();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    if (!email) {
      Alert.alert(t.requiredFields, t.email);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(t.congratulations, t.resetLinkSent, [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    }, 1500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t.forgotPassword} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: theme.spacing.medium }}>
        <Text style={{ ...theme.typography.bodyMedium, color: theme.colors.textSecondary, marginBottom: theme.spacing.large }}>
          {t.resetInstructions}
        </Text>
        <AppTextInput 
          label={t.email} 
          placeholder="tusaale@email.com" 
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
        />
        <AppButton 
          title={t.sendResetLink} 
          onPress={handleReset} 
          isLoading={isLoading} 
          style={{ marginTop: theme.spacing.large }} 
        />
      </ScrollView>
    </View>
  );
}


// --- MAIN TABS SCREENS ---

// ** CUSBOONAYSII HOMESCREEN (OO LEH BADGE NOTIFICATION) **
function HomeScreen({ navigation }) {
  const { theme, t, user } = useAppContext();
  
  if (!user) {
      return (
          <ScreenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
          </ScreenContainer>
      );
  }
  
  // Xisaabi ogeysiisyada aan la aqrin
  const unreadCount = user.notifications ? user.notifications.filter(n => !n.read).length : 0;
  
  const styles = getHomeStyles(theme);

  const handleTaskPress = (task) => {
    navigation.navigate("TaskDetail", { task });
  };

  return (
    <ScreenContainer scrollable={true}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{t.hello}</Text>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation.navigate("Notifications")} // <-- U beddel inuu furo shaashad cusub
        >
          <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
          {unreadCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>{t.currentBalance}</Text>
        <Text style={styles.balanceAmount}>${user.balance.toFixed(2)}</Text>
        
        <AppButton title={t.withdrawal} onPress={() => navigation.navigate("Wallet")} variant="secondary" style={styles.withdrawButton} />
      </View>

      {/* Tasks Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t.tasksForYou}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Earn")}>
          <Text style={styles.viewAllText}>{t.viewAll}</Text>
        </TouchableOpacity>
      </View>

      {DUMMY_TASKS.slice(0, 3).map((task) => (
        <TaskItem key={task.id} task={task} onPress={handleTaskPress} />
      ))}
    </ScreenContainer>
  );
}

// ** CUSBOONAYSII STYLES-KA HOMESCREEN (OO LEH BADGE NOTIFICATION) **
const getHomeStyles = (theme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: theme.spacing.medium,
      paddingTop: useSafeAreaInsets().top,
    },
    greeting: {
      ...theme.typography.bodyLarge,
      color: theme.colors.textSecondary,
    },
    userName: {
      ...theme.typography.titleLarge,
      color: theme.colors.text,
    },
    notificationButton: {
      padding: theme.spacing.small,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      position: 'relative', // <-- WAA MUHIIM
    },
    // ** KUWAN WAA CUSUB YIHIIN **
    notificationBadge: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: theme.colors.danger,
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.surface,
    },
    notificationBadgeText: {
      color: theme.colors.white,
      fontSize: 10,
      fontWeight: 'bold',
    },
    balanceCard: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      padding: theme.spacing.large,
      marginBottom: theme.spacing.xl,
    },
    balanceLabel: {
      ...theme.typography.bodyMedium,
      color: theme.colors.white,
    },
    balanceAmount: {
      ...theme.typography.titleLarge,
      fontSize: 42,
      color: theme.colors.white,
      marginVertical: theme.spacing.small,
    },
    withdrawButton: {
      marginTop: theme.spacing.large,
      backgroundColor: theme.colors.secondary,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing.medium,
      marginTop: theme.spacing.medium,
    },
    sectionTitle: {
      ...theme.typography.titleMedium,
      color: theme.colors.text,
    },
    viewAllText: {
      ...theme.typography.labelLarge,
      color: theme.colors.primary,
    },
  });


function EarnScreen({ navigation }) {
  const { theme, t } = useAppContext();
  
  const handleTaskPress = (task) => {
    navigation.navigate("TaskDetail", { task });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t.earn} />
      <FlatList
        contentContainerStyle={{ padding: theme.spacing.medium }}
        data={DUMMY_TASKS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} onPress={handleTaskPress} />}
        ListHeaderComponent={() => (
          <Text style={{ ...theme.typography.titleMedium, color: theme.colors.text, marginBottom: theme.spacing.medium }}>
            {t.tasksForYou} ({DUMMY_TASKS.length})
          </Text>
        )}
      />
    </View>
  );
}

// ------------------------------------------------------------------------------------
// SHAASHADDA WAALLET-KA (JEBKA) - OO LA CUSBOONAYSIIYAY
// ------------------------------------------------------------------------------------

function WalletScreen({ navigation }) {
  const { theme, t, user, setUser } = useAppContext();
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState(""); 
  const [selectedMethod, setSelectedMethod] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  
  const MIN_WITHDRAWAL = 5.00; // Waa la beddelay si ay ula mid noqoto text-ka hoose

  const PAYMENT_METHODS = [
    { id: "Zaad", label: "Zaad", icon: "wallet-outline", color: "#4CAF50" }, 
    { id: "EVCPlus", label: "EVCPlus", icon: "card-outline", color: "#007AFF" }, 
    { id: "Jeeb", label: "Jeeb", icon: "cash-outline", color: "#9C27B0" }, 
    { id: "Sahal", label: "Sahal", icon: "phone-portrait-outline", color: "#FF9800" }, 
    { id: "PAYER", label: "PAYER", icon: "person-circle-outline", color: "#795548" }, 
    { id: "TronTRX", label: "TronTRX", icon: "logo-bitcoin", color: "#673AB7" }, 
  ];

  // ** CUSBOONAYSII: HANDLEWITHDRAW OO SIMULEYNAYA NOTIFICATION **
  const handleWithdraw = async () => {
    const withdrawalAmount = parseFloat(amount);
    
    if (isNaN(withdrawalAmount) || withdrawalAmount < MIN_WITHDRAWAL) {
      Alert.alert(t.requiredFields, `Kala Bixista ugu Yar waa $${MIN_WITHDRAWAL.toFixed(2)}.`);
      return;
    }
    if (withdrawalAmount > user.balance) {
      Alert.alert(t.requiredFields, "Qadarka aad codsatay wuu ka badan yahay hadhaaggaaga.");
      return;
    }
    if (!selectedMethod || !accountNumber.trim()) {
      Alert.alert(t.requiredFields, "Fadlan dooro habka lacag bixinta oo geli lambarka account-kaaga.");
      return;
    }

    setIsLoading(true);
    
    // Go'aan random ah (70% waa la ansixiyay, 30% waa la diiday)
    const isApproved = Math.random() < 0.7;
    
    const newNotificationId = `notif_${new Date().getTime()}`;
    let newNotification;
    let alertTitle;
    let alertMessage;

    // Samee nuqul cusub oo user-ka ah
    const updatedUser = { 
      ...user,
      notifications: user.notifications || [] // Hubi inuu jiro
    };

    if (isApproved) {
      // --- WAA LA ANSIXIYAY ---
      alertTitle = t.congratulations;
      alertMessage = t.withdrawalApprovedMessage.replace('${amount}', `$${withdrawalAmount.toFixed(2)}`);

      newNotification = {
        id: newNotificationId,
        type: 'withdrawal_approved',
        title: t.withdrawalApproved,
        message: alertMessage,
        timestamp: new Date().toISOString(),
        read: false
      };
      
      // Ka jar hadhaaga
      updatedUser.balance = updatedUser.balance - withdrawalAmount;
      
    } else {
      // --- WAA LA DIIDAY ---
      const reason = t.reasonInvalidAccount; // Sabab la simuleeyay
      alertTitle = t.withdrawalRejected;
      alertMessage = t.withdrawalRejectedMessage.replace('${amount}', `$${withdrawalAmount.toFixed(2)}`).replace('{reason}', reason);

      newNotification = {
        id: newNotificationId,
        type: 'withdrawal_rejected',
        title: t.withdrawalRejected,
        message: alertMessage,
        timestamp: new Date().toISOString(),
        read: false
      };
      // Lacagta looma jarin
    }

    // Ku dar ogeysiiska cusub
    updatedUser.notifications.unshift(newNotification);

    // Cusbooneysii xaaladda app-ka (Context)
    // Tani waxay si toos ah u kicin doontaa kaydinta (save) ee App.js
    setUser(updatedUser); 

    setIsLoading(false);
    
    Alert.alert(alertTitle, alertMessage);
    setAmount(""); 
    setAccountNumber("");
  };
  
  const styles = getWalletStyles(theme);

  if (!user) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t.wallet} />
      <ScrollView contentContainerStyle={{ padding: theme.spacing.medium }}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>{t.currentBalance}</Text>
          <Text style={styles.balanceAmount}>${user.balance.toFixed(2)}</Text>
          <Text style={styles.totalEarned}>{t.totalEarned}: ${user.totalEarned.toFixed(2)}</Text>
        </View>

        {/* Withdrawal Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t.withdrawRequest}</Text>
          
          <Text style={styles.minWithdrawal}>Minimum withdrawal: ${MIN_WITHDRAWAL.toFixed(2)}</Text>
          
          <AppTextInput 
            label="Amount ($)"
            placeholder={MIN_WITHDRAWAL.toFixed(2)} 
            value={amount} 
            onChangeText={setAmount} 
            keyboardType="numeric" 
            style={{ marginBottom: theme.spacing.medium }}
          />

          <Text style={{ ...theme.typography.labelLarge, color: theme.colors.text, marginBottom: theme.spacing.small }}>Payment Method</Text>

          {/* Payment Method Grid */}
          <View style={styles.methodGrid}>
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.methodCard,
                  selectedMethod === method.id && { borderColor: method.color, borderWidth: 3 },
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={[styles.methodIconContainer, { backgroundColor: method.color + '1A' }]}>
                  {method.id === "TronTRX" ? (
                    <FontAwesome name="bitcoin" size={30} color={method.color} />
                  ) : (
                    <Ionicons name={method.icon} size={30} color={method.color} />
                  )}
                </View>
                <Text style={styles.methodLabel}>{method.label}</Text>
                {selectedMethod === method.id && (
                  <Ionicons name="checkmark-circle" size={20} color={method.color} style={styles.checkIconOverlay} />
                )}
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={{ ...theme.typography.labelLarge, color: theme.colors.text, marginTop: theme.spacing.medium, marginBottom: theme.spacing.small }}>Account Number</Text>
          <AppTextInput 
            placeholder="Geli lambarka account-kaaga ama address-ka TronTRX" 
            value={accountNumber} 
            onChangeText={setAccountNumber} 
            keyboardType={selectedMethod && selectedMethod !== "TronTRX" ? "numeric" : "default"}
          />
          
          <AppButton 
            title={t.withdrawRequest} 
            onPress={handleWithdraw} 
            isLoading={isLoading} 
            style={{ marginTop: theme.spacing.large }} 
          />
        </View>

        {/* Transaction History */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t.transactionHistory}</Text>
          <Text style={{...theme.typography.bodyMedium, color: theme.colors.textSecondary, textAlign: 'center', paddingVertical: theme.spacing.large }}>
            Halkan waxaa ku yaal liiska kala bixista iyo xareynta. (U baahan API)
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const getWalletStyles = (theme) =>
  StyleSheet.create({
    balanceCard: {
      backgroundColor: theme.colors.primary,
      borderRadius: 20,
      padding: theme.spacing.large,
      marginBottom: theme.spacing.medium,
      alignItems: 'center',
    },
    balanceLabel: { ...theme.typography.bodyMedium, color: theme.colors.white },
    balanceAmount: { ...theme.typography.titleLarge, fontSize: 40, color: theme.colors.white, marginVertical: theme.spacing.small },
    totalEarned: { ...theme.typography.labelLarge, color: theme.colors.secondary },
    sectionCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: theme.spacing.medium,
      marginBottom: theme.spacing.medium,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    sectionTitle: { ...theme.typography.titleMedium, color: theme.colors.text, marginBottom: theme.spacing.medium },
    minWithdrawal: { ...theme.typography.bodySmall, color: theme.colors.textSecondary, marginBottom: theme.spacing.medium },
    
    methodGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.medium,
    },
    methodCard: {
      width: '32%',
      height: 90,
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.small,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      position: 'relative',
    },
    methodIconContainer: {
      padding: theme.spacing.small,
      borderRadius: 8,
      marginBottom: theme.spacing.xs,
    },
    methodLabel: {
      ...theme.typography.bodySmall,
      color: theme.colors.text,
      fontWeight: '600',
      textAlign: 'center',
    },
    checkIconOverlay: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
    },
  });


function TaskDetailScreen({ navigation, route }) {
  const { theme, t } = useAppContext();
  const { task } = route.params;
  const insets = useSafeAreaInsets();
  
  const handleProofSubmission = () => {
      // ** CUSBOONAYSII ** Waxaan u diraynaa dhammaan object-ka 'task'
      navigation.navigate('ProofSubmission', { task: task });
  };
  
  const getTaskDetailStyles = (theme) => 
    StyleSheet.create({
        taskDetailHeader: {
            padding: theme.spacing.medium,
            backgroundColor: theme.colors.surface,
            borderRadius: 16,
            marginBottom: theme.spacing.medium,
        },
        taskDetailTitle: { ...theme.typography.titleLarge, color: theme.colors.text, marginBottom: theme.spacing.small },
        taskDetailReward: { ...theme.typography.titleMedium, color: theme.colors.primary, marginBottom: theme.spacing.medium },
        sectionTitle: { ...theme.typography.titleSmall, color: theme.colors.text, marginTop: theme.spacing.medium, marginBottom: theme.spacing.small },
        listItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: theme.spacing.small },
        listText: { ...theme.typography.bodyMedium, color: theme.colors.text },
        taskActions: { flexDirection: 'row', justifyContent: 'space-between', gap: theme.spacing.medium, marginTop: theme.spacing.large },
    });
  const styles = getTaskDetailStyles(theme);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, paddingTop: insets.top }}>
      <ScreenHeader title={t.taskDetails} onBack={() => navigation.goBack()} />
      <ScrollView style={{ padding: theme.spacing.medium }}>
        <View style={styles.taskDetailHeader}>
          <Text style={styles.taskDetailTitle}>{task.title}</Text>
          <Text style={styles.taskDetailReward}>{t.reward}: ${task.reward.toFixed(2)}</Text>
        </View>
        
        {/* Requirements */}
        <Text style={styles.sectionTitle}>{t.requirements}</Text>
        <View>
          {['Must be a new user of the service.', 'Must use the referral code.', 'Only one submission per user.'].map((req, index) => (
            <View key={index} style={styles.listItem}>
              <Ionicons name="checkmark-circle-outline" size={18} color={theme.colors.success} style={{ marginRight: theme.spacing.small, marginTop: 2 }} />
              <Text style={styles.listText}>{req}</Text>
            </View>
          ))}
        </View>
        
        {/* Steps */}
        <Text style={styles.sectionTitle}>{t.steps}</Text>
        <View>
          {['1. Click the "Complete Task" button below.', '2. Install the app/Visit the site.', '3. Complete the required action.', '4. Return here and click "Submit Proof".'].map((step, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={{...styles.listText, fontWeight: 'bold', marginRight: theme.spacing.small}}>{index + 1}.</Text>
              <Text style={styles.listText}>{step}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.taskActions}>
          <AppButton
            title={t.completeTask}
            onPress={() => Alert.alert("Furin Linkiga", "Tani waxay ku geynaysaa bogga shaqada.")}
            variant="primary"
            style={{ flex: 2 }}
          />
          <AppButton
            title={t.submitProof}
            onPress={handleProofSubmission}
            variant="outline"
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

// ** CUSBOONAYSII PROOF SUBMISSION SCREEN (OO DHAMAYSTIRAN) **
function ProofSubmissionScreen({ navigation, route }) {
  const { theme, t, user, setUser } = useAppContext();
  const styles = getProofStyles(theme);
  
  const { task } = route.params || {};
  const taskTitle = task?.title || "Task";
  const taskReward = task?.reward || 0;

  const [proofText, setProofText] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    // ... (Kani waa sidii hore, waxba ha ka beddelin)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t.permissionDenied, t.permissionDetails);
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // ** WAA KAN ISBEDDELKA UGU WEYN EE HANDLESUBMIT **
  const handleSubmit = async () => {
    if (!proofText.trim() || !imageUri) {
      Alert.alert(t.requiredFields, "Fadlan ku dar sawirka caddeynta iyo faahfaahinta.");
      return;
    }
    setIsLoading(true);

    try {
      // Go'aan random ah (70% waa la ansixiyay, 30% waa la diiday)
      const isApproved = Math.random() < 0.7; 
      
      const newNotificationId = `notif_${new Date().getTime()}`;
      let newNotification;
      let alertTitle;
      let alertMessage;
      let bonusMessage = "";

      const allUsers = (await loadData("all_users")) || {};
      const currentUserEmail = user.email;
      const updatedUserB = { ...allUsers[currentUserEmail] };
      updatedUserB.notifications = updatedUserB.notifications || []; // Hubi inuu jiro

      if (isApproved) {
        // --- WAA LA ANSIXIYAY ---
        const bonusAmount = taskReward * 0.10;
        const referredByEmail = user.referredByEmail;

        alertTitle = t.congratulations;
        let baseMessage = t.taskApprovedMessage.replace('{taskTitle}', taskTitle).replace('${amount}', `$${taskReward.toFixed(2)}`);
        
        newNotification = {
          id: newNotificationId,
          type: 'task_approved',
          title: t.taskApproved,
          message: baseMessage, // Fariinta aasaasiga ah
          timestamp: new Date().toISOString(),
          read: false
        };

        // Cusbooneysii User B (Isticmaalaha hadda)
        updatedUserB.balance = (updatedUserB.balance || 0) + taskReward;
        updatedUserB.totalEarned = (updatedUserB.totalEarned || 0) + taskReward;
        updatedUserB.tasksCompleted = (updatedUserB.tasksCompleted || 0) + 1;

        // Cusbooneysii User A (Qofka Casuumay)
        if (referredByEmail && allUsers[referredByEmail]) {
          const updatedUserA = { ...allUsers[referredByEmail] };
          updatedUserA.balance = (updatedUserA.balance || 0) + bonusAmount;
          updatedUserA.referralEarnings = (updatedUserA.referralEarnings || 0) + bonusAmount;
          allUsers[referredByEmail] = updatedUserA;
          
          bonusMessage = `\n\nQofka ku casuumay wuxuu helay $${bonusAmount.toFixed(2)} gunno ah.`;
        }
        alertMessage = baseMessage + bonusMessage; // Isku dar fariimaha Alert-ka

      } else {
        // --- WAA LA DIIDAY ---
        const reason = t.reasonNotProvided; // Sabab la simuleeyay
        alertTitle = t.taskRejected;
        alertMessage = t.taskRejectedMessage.replace('{taskTitle}', taskTitle).replace('{reason}', reason);
        
        newNotification = {
          id: newNotificationId,
          type: 'task_rejected',
          title: t.taskRejected,
          message: alertMessage,
          timestamp: new Date().toISOString(),
          read: false
        };
        // Lacag looma darin user-ka
      }

      // Ku dar ogeysiiska cusub (bilowga liiska)
      updatedUserB.notifications.unshift(newNotification);
      allUsers[currentUserEmail] = updatedUserB; // Ku kaydi isbeddelka

      // Kaydi dhammaan isbeddellada
      await storeData("all_users", allUsers);

      // Cusbooneysii xaaladda app-ka (context)
      setUser(updatedUserB);

      setIsLoading(false);
      Alert.alert(
        alertTitle, 
        alertMessage, 
        [
          { text: "OK", onPress: () => navigation.pop(2) } // Ku noqo Earn Screen
        ]
      );

    } catch (e) {
      setIsLoading(false);
      console.error("Error submitting proof:", e);
      Alert.alert("Cilad", "Way dhici wayday in la xareeyo caddeynta.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t.submitProof} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: theme.spacing.medium }}>
        <Text style={styles.subtitle}>{t.taskDetails}: {taskTitle || "Task ID: " + task?.id}</Text>

        <View style={styles.card}>
          {/* Sawirka Caddeynta */}
          <Text style={styles.sectionTitle}>{t.proofImage}</Text>
          <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
              <View style={styles.uploadIconContainer}>
                <Ionicons name="cloud-upload-outline" size={30} color={theme.colors.primary} />
                <Text style={styles.uploadText}>{t.uploadImage}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Faahfaahinta Caddeynta */}
          <Text style={styles.sectionTitle}>{t.proofText}</Text>
          <AppTextInput
            placeholder="Waa kan isku xirka (link) ama faahfaahin dheeri ah oo ku saabsan sida loo dhammeeyay..."
            value={proofText}
            onChangeText={setProofText}
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
        </View>

        <AppButton
          title={t.submitProof}
          onPress={handleSubmit}
          isLoading={isLoading}
          style={{ marginTop: theme.spacing.large }}
        />
      </ScrollView>
    </View>
  );
}


const getProofStyles = (theme) =>
  StyleSheet.create({
    subtitle: { ...theme.typography.bodyLarge, color: theme.colors.textSecondary, marginBottom: theme.spacing.large },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: theme.spacing.medium,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    sectionTitle: { ...theme.typography.labelLarge, color: theme.colors.text, marginTop: theme.spacing.medium, marginBottom: theme.spacing.small },
    imagePlaceholder: {
      height: 200,
      backgroundColor: theme.colors.border,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing.medium,
      overflow: 'hidden',
    },
    uploadIconContainer: {
      alignItems: 'center',
    },
    uploadText: {
      ...theme.typography.bodyMedium,
      color: theme.colors.primary,
      marginTop: theme.spacing.xs,
    },
    imagePreview: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    textArea: {
      minHeight: 120,
      textAlignVertical: 'top',
      paddingTop: theme.spacing.medium,
    }
  });

// --- PROFILE SCREENS (Settings waa lagu dhex daray) ---

function ProfileScreen({ navigation }) {
  const { 
    theme, t, user, setUser, 
    isDarkMode, setIsDarkMode, lang, setLang 
  } = useAppContext();
  
  const styles = getProfileStyles(theme);
  
  // ** CUSBOONAYSII SIGN OUT **
  const handleSignOut = async () => {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('current_user_email'); // <-- KALIYA KAN KA SAAR
    
    setUser(null);
    navigation.replace("Login");
  };

  // Shaqada sawir beddelka (kani waa sax)
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t.permissionDenied, t.permissionDetails);
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const newUri = result.assets[0].uri;
      setUser(prev => ({ ...prev, avatarUrl: newUri })); 
      Alert.alert(t.congratulations, t.profilePicUpdated);
    }
  };
  
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const changeLanguage = (newLang) => setLang(newLang);

  if (!user) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
    );
  }

  return (
    <ScreenContainer scrollable={true}>
      <View style={{paddingTop: useSafeAreaInsets().top}} />

      {/* Qaybta Sare ee Profile-ka */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user.avatarUrl || "https://placehold.co/100x100/4CAF50/FFFFFF?text=SA" }} 
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={pickImage}
          >
            <Ionicons name="pencil" size={18} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        
        {/* Koodhka Casuumadda User-ka */}
        <View style={styles.referralBox}>
          <Text style={styles.referralLabel}>Koodhkaaga Casuumadda:</Text>
          <Text style={styles.referralCode}>{user.referralCode || 'N/A'}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{user.tasksCompleted}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>${user.referralEarnings?.toFixed(2) || '0.00'}</Text>
            <Text style={styles.statLabel}>Referrals</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>${user.totalEarned.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Total Earned</Text>
          </View>
        </View>
      </View>

      {/* --- QAABKA CUSUB EE MENU-GA --- */}

      {/* Qaybta 1: Account */}
      <Text style={styles.menuHeader}>Account</Text>
      <View style={styles.menuContainer}>
        <SettingItem icon="person-outline" label={t.editProfile} onPress={() => navigation.navigate("EditProfile")} />
        <SettingItem icon="notifications-outline" label={t.notifications} onPress={() => navigation.navigate("Notifications")} />
        <SettingItem icon="lock-closed-outline" label={t.changePassword} onPress={() => navigation.navigate("ChangePassword")} />
      </View>
      
      {/* Qaybta 2: Settings */}
      <Text style={styles.menuHeader}>Settings</Text>
      <View style={styles.menuContainer}>
          <SettingItem icon="moon-outline" label={t.darkMode} isSwitch switchValue={isDarkMode} onSwitchChange={toggleDarkMode} />
          <SettingItem icon="language-outline" label={`${t.language} (${t[lang]})`} onPress={() => Alert.alert("Beddel Luqadda", "Doorashada Luqadda: Somali (so), English (en)", [
            { text: t.somali, onPress: () => changeLanguage('so') },
            { text: t.english, onPress: () => changeLanguage('en') },
            { text: "Cancel", style: "cancel" }
          ])} />
      </View>

      {/* Qaybta 3: Support */}
      <Text style={styles.menuHeader}>Support</Text>
      <View style={styles.menuContainer}>
          <SettingItem icon="information-circle-outline" label="Ku saabsan App-ka" onPress={() => {Alert.alert("Info", "App-ka Kasbashada Shaqada v1.0")}} />
          <SettingItem icon="help-circle-outline" label="Taageero & Caawimaad" onPress={() => {Alert.alert("Taageero", "Fadlan noogu soo dir emailka help@taskearn.com")}} />
      </View>

      <AppButton
        title={t.signOut}
        onPress={handleSignOut}
        variant="outline"
        style={{ marginTop: theme.spacing.large, marginBottom: theme.spacing.xl }}
      />
    </ScreenContainer>
  );
}

// STYLES-KA PROFILE-KA (Waa la cusbooneysiiyay)
const getProfileStyles = (theme) =>
  StyleSheet.create({
    profileHeader: {
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
    },
    avatarContainer: {
      position: 'relative',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },
    editIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: theme.colors.primary,
      padding: 6,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: theme.colors.surface,
    },
    profileName: { ...theme.typography.titleMedium, color: theme.colors.text, marginTop: theme.spacing.medium },
    profileEmail: { ...theme.typography.bodyMedium, color: theme.colors.textSecondary, marginBottom: theme.spacing.medium },
    
    // ** CUSBOONAYSII REFERRAL **
    referralBox: {
        backgroundColor: theme.colors.primaryLight,
        paddingVertical: theme.spacing.small,
        paddingHorizontal: theme.spacing.medium,
        borderRadius: 10,
        marginBottom: theme.spacing.medium,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    referralLabel: {
        ...theme.typography.bodySmall,
        color: theme.colors.text,
        textAlign: 'center',
    },
    referralCode: {
        ...theme.typography.labelLarge,
        color: theme.colors.text,
        textAlign: 'center',
    },

    statsContainer: {
      flexDirection: 'row',
      marginTop: theme.spacing.medium,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: theme.spacing.medium,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    statBox: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: theme.spacing.small, // La yareeyay
      borderRightWidth: 1,
      borderRightColor: theme.colors.border,
      ':last-child': {
        borderRightWidth: 0,
      },
    },
    statValue: { ...theme.typography.titleSmall, color: theme.colors.primary },
    statLabel: { ...theme.typography.bodySmall, color: theme.colors.textSecondary, marginTop: theme.spacing.xs },
    
    menuHeader: { 
      ...theme.typography.titleSmall, 
      color: theme.colors.textSecondary, 
      marginTop: theme.spacing.medium, 
      marginBottom: theme.spacing.small,
      paddingHorizontal: theme.spacing.small,
    },
    
    menuContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: theme.spacing.medium,
      overflow: 'hidden', 
    }
  });


function EditProfileScreen({ navigation }) {
  const { theme, t, user, setUser } = useAppContext();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState("617777888");
  
  const handleSave = () => {
    setUser(prev => ({ ...prev, name }));
    Alert.alert(t.congratulations, "Profile-kaaga waa la cusboonaysiiyay.");
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t.editProfile} onBack={() => navigation.goBack()} />
      <ScrollView style={{ padding: theme.spacing.medium }}>
        <AppTextInput label="Magaca Buuxa" value={name} onChangeText={setName} />
        <AppTextInput label="Telefoonka" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <AppTextInput label={t.email} value={user.email} editable={false} />
        <AppButton title={t.saveChanges} onPress={handleSave} style={{ marginTop: theme.spacing.large }} />
      </ScrollView>
    </View>
  );
}

// ------------------------------------------------------------------------------------
// SHAASHADDA BEDDELKA PASSWORD-KA
// ------------------------------------------------------------------------------------

// ** CUSBOONAYSII CHANGE PASSWORD SCREEN **
function ChangePasswordScreen({ navigation }) {
  const { theme, t, user } = useAppContext(); // <-- KU DAR 'user'
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert(t.requiredFields, "Fadlan buuxi dhammaan goobaha.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert(t.requiredFields, t.passwordMismatch);
      return;
    }

    setIsLoading(true);

    const allCredentials = (await loadData("all_credentials")) || {};
    const currentUserEmail = user.email; // Ka hel email-ka context-ka

    if (allCredentials[currentUserEmail] && allCredentials[currentUserEmail] === oldPassword) {
      // Waa sax, beddel password-ka
      allCredentials[currentUserEmail] = newPassword;
      await storeData("all_credentials", allCredentials);
      
      setIsLoading(false);
      Alert.alert(t.congratulations, "Password-kaaga waa la beddelay si guul leh.", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } else {
      setIsLoading(false);
      Alert.alert(t.loginError, "Password-kaagii hore waa qalad.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t.changePassword} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: theme.spacing.medium }}>
        <AppTextInput 
          label={t.oldPassword} 
          value={oldPassword} 
          onChangeText={setOldPassword} 
          secureTextEntry 
          placeholder="******"
        />
        <AppTextInput 
          label={t.newPassword} 
          value={newPassword} 
          onChangeText={setNewPassword} 
          secureTextEntry 
          placeholder="******"
        />
        <AppTextInput 
          label={t.confirmNewPassword} 
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
          secureTextEntry 
          placeholder="******"
        />
        <AppButton 
          title={t.saveChanges} 
          onPress={handleSave} 
          isLoading={isLoading} 
          style={{ marginTop: theme.spacing.large }} 
        />
      </ScrollView>
    </View>
  );
}


// ------------------------------------------------------------------------------------
// SHAASHADDA Ogeysiisyada (SHAASHAD CUSUB)
// ------------------------------------------------------------------------------------

function NotificationScreen({ navigation }) {
  const { theme, t, user, setUser } = useAppContext();

  // Marka shaashaddan la furo, ka dhig dhammaan ogeysiisyada 'read'
  useEffect(() => {
    const markAsRead = () => {
      if (!user || !user.notifications) return; // Hubi haddii user-ku jiro
      
      const hasUnread = user.notifications.some(n => !n.read);
      if (hasUnread) {
        const updatedNotifications = user.notifications.map(n => 
          n.read ? n : { ...n, read: true }
        );
        setUser(prev => ({ ...prev, notifications: updatedNotifications }));
      }
    };
    
    // Ku calaamadi 'read' 1 ilbiriqsi ka dib markaad furto
    const timer = setTimeout(markAsRead, 1000);
    return () => clearTimeout(timer);
  }, [user.notifications]); // U kici markasta oo notifications-ku is beddelo

  // Function-ka muujinaya hal ogeysiis
  const renderNotificationItem = ({ item }) => {
    let iconName;
    let iconColor;

    switch (item.type) {
      case 'task_approved':
        iconName = 'checkmark-circle-outline';
        iconColor = theme.colors.success;
        break;
      case 'task_rejected':
        iconName = 'close-circle-outline';
        iconColor = theme.colors.danger;
        break;
      case 'withdrawal_approved':
        iconName = 'arrow-up-circle-outline';
        iconColor = theme.colors.primary;
        break;
      case 'withdrawal_rejected':
        iconName = 'alert-circle-outline';
        iconColor = theme.colors.danger;
        break;
      default:
        iconName = 'information-circle-outline';
        iconColor = theme.colors.textSecondary;
    }

    return (
      <View style={[
        styles.notificationCard, 
        !item.read && { backgroundColor: theme.colors.primary + '1A', borderColor: theme.colors.primary } // Midab khafiif ah haddii aan la aqrin
      ]}>
        <Ionicons name={iconName} size={30} color={iconColor} style={styles.notificationIcon} />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationTime}>{t.justNow}</Text> {/* Simuleyn time */}
        </View>
      </View>
    );
  };
  
  const styles = getNotificationStyles(theme);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title={t.notifications} onBack={() => navigation.goBack()} />
      <FlatList
        data={user.notifications || []}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: theme.spacing.medium }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={60} color={theme.colors.textSecondary} />
            <Text style={styles.emptyText}>{t.noNotifications}</Text>
          </View>
        }
      />
    </View>
  );
}

// Styles-ka NotificationScreen
const getNotificationStyles = (theme) => StyleSheet.create({
  notificationCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  notificationIcon: {
    marginRight: theme.spacing.medium,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    ...theme.typography.titleSmall,
    color: theme.colors.text,
  },
  notificationMessage: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  notificationTime: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.small,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100, // Ka fogee header-ka
  },
  emptyText: {
    ...theme.typography.titleSmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.medium,
  }
});


// ------------------------------------------------------------------------------------
// 6. NAVIGATION (Stacks & Tabs)
// ------------------------------------------------------------------------------------

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator(); 

// --- Main Tabs ---
function MainTabs() {
  const { theme, t } = useAppContext();
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface, 
          borderTopColor: theme.colors.border,
          height: 60 + insets.bottom, 
          paddingBottom: insets.bottom + theme.spacing.xs,
          paddingTop: theme.spacing.small,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: theme.colors.primary, 
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          ...theme.typography.bodySmall,
          fontWeight: "600",
        },
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />), tabBarLabel: t.home }} />
      <Tabs.Screen name="Earn" component={EarnScreen} options={{ tabBarIcon: ({ color, focused }) => (<MaterialIcons name="task-alt" size={24} color={color} />), tabBarLabel: t.earn }} />
      <Tabs.Screen name="Wallet" component={WalletScreen} options={{ tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? "wallet" : "wallet-outline"} size={24} color={color} />), tabBarLabel: t.wallet }} />
      
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
          ),
          tabBarLabel: t.profile,
        }}
      />
    </Tabs.Navigator>
  );
}

// --- App Root Stack ---
function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash" 
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <Stack.Screen name="ProofSubmission" component={ProofSubmissionScreen} /> 
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      
      {/* ** WAA KAN SHAASHADDA CUSUB ** */}
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      
    </Stack.Navigator>
  );
}

// ------------------------------------------------------------------------------------
// 7. APP ROOT 
// ------------------------------------------------------------------------------------

// ** CUSBOONAYSII APP ROOT (OO DHAMMAYSTIRAN) **
export default function App() {
  const colorScheme = useColorScheme();
  
  const [user, setUser] = useState(null); 
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [lang, setLang] = useState("so");
  const [isAppLoading, setIsAppLoading] = useState(true);

  // 1. Marka App-ku furmo, la soco xogta keydsan
  useEffect(() => {
    const bootstrapApp = async () => {
      try {
        const storedLang = await loadData('app_lang');
        const storedMode = await loadData('app_dark_mode');
        const authToken = await loadData('auth_token');
        const currentUserEmail = await loadData('current_user_email'); // Soo rAR email-ka la kaydiyay

        if (authToken && currentUserEmail) {
          // Haddii la galay, soo rAR profile-ka user-kaas
          const allUsers = (await loadData('all_users')) || {};
          const storedUser = allUsers[currentUserEmail];
          
          if (storedUser) {
            // ** CUSBOONAYSII: ** Hubi in 'notifications' array uu jiro
            const fullUser = {
              ...storedUser,
              notifications: storedUser.notifications || [] 
            };
            setUser(fullUser);
            
          } else {
            // Haddii ay cilad dhacdo (email-ka waa la hayaa laakiin profile-ka lama hayo)
            await AsyncStorage.removeItem('auth_token');
            await AsyncStorage.removeItem('current_user_email');
            setUser(null);
          }
        } else {
          setUser(null); 
        }
        
        setLang(storedLang || 'so');
        setIsDarkMode(storedMode !== null ? storedMode : colorScheme === 'dark');
        
      } catch (e) {
        console.warn("Error bootstrapping app:", e);
      } finally {
        setIsAppLoading(false);
      }
    };
    bootstrapApp();
  }, []);

  // 2. Keydi isbeddel kasta oo ku yimaada user-ka
  useEffect(() => {
    // Kani wuxuu si toos ah u kaydinayaa isbeddelka ku dhaca user-ka hadda galay
    // Tusaale: Marka 'setUser' loo waco meel kasta (sida EditProfile, Wallet, Proof)
    const saveUserChanges = async () => {
      if (user && user.email) {
        try {
          const allUsers = (await loadData("all_users")) || {};
          allUsers[user.email] = user; // Cusbooneysii kaliya user-kan
          await storeData("all_users", allUsers);
        } catch (e) {
          console.error("Failed to save user changes:", e);
        }
      }
    };
    
    // Si looga fogaado in la kaydiyo marka app-ku furmayo
    if (!isAppLoading) {
        saveUserChanges();
    }
  }, [user]); // Kani wuxuu shaqeeyaa mar kasta oo 'user' object-ka la beddelo

  // 3. Keydi isbeddelka Luqadda
  useEffect(() => {
    if (!isAppLoading) storeData('app_lang', lang);
  }, [lang]);

  // 4. Keydi isbeddelka Dark Mode
  useEffect(() => {
    if (!isAppLoading) storeData('app_dark_mode', isDarkMode);
  }, [isDarkMode]);

  const theme = getTheme(isDarkMode);

  const appContextValue = {
    theme,
    lang,
    setLang,
    isDarkMode,
    setIsDarkMode,
    user,
    setUser,
  };

  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors), 
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      primary: theme.colors.primary,
      border: theme.colors.border,
    },
  };

  if (isAppLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <AppContext.Provider value={appContextValue}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor="transparent"
          translucent={true}
        />
        <NavigationContainer theme={navigationTheme}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppContext.Provider>
  );
}
