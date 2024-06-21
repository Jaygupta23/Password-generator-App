import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as yup from "yup";
import { Formik } from "formik";

const PasswordSchema = yup.object().shape({
  passwordLength: yup
    .number()
    .min(4, "should be min of 4 character")
    .max(20, "should be max of 20 character")
    .required("length is required"),
});

const App = () => {
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength) => {
    let characterList = "";
    const upperCaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChar = "abcdefghijklmnopqrstuvwxyz";
    const digits = "1234567890";
    const specialChars = "!@#$%^&*()";

    if (upperCase) {
      characterList += upperCaseChar;
    }
    if (lowerCase) {
      characterList += lowerCaseChar;
    }
    if (numbers) {
      characterList += digits;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const newPassword = createPassword(characterList, passwordLength);

    setPassword(newPassword);
    setIsPassword(true);
  };

  const createPassword = (characters, passwordLength) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setIsPassword(false);
    setPassword("");
    setNumbers(false);
    setLowerCase(false);
    setUpperCase(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: "" }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              generatePasswordString(+values.passwordLength);
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleReset,
              handleSubmit,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.imputColumn}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        color: "#3c40c6",
                      }}
                    >
                      Password Length
                    </Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange("passwordLength")}
                    placeholder="Ex. 8"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lowercase letters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="#00d8d6"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="#ff5e57"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#ffa801"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#3c40c6"
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity disabled={!isValid} onPress={handleSubmit}>
                    <Text style={styles.buttons}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}
                  >
                    <Text style={styles.buttons}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassword && (
          <View
            style={{
              height: 200,
              backgroundColor: "lightgreen",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: "600" }}>
              Long Press To Copy
            </Text>
            <Text selectable={true} style={styles.passwordText}>
              {password}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  errorText: {
    color: "#c23616",
    width: 250,
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    textAlign:"center",
    textDecorationLine:"underline"
  },
  appContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  formContainer: {},
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: "#3c40c6",
    backgroundColor: "#f7f1e3",
    height: 40,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "800",
    paddingHorizontal: 30,
    marginTop: 20,
    borderRadius: 6,
  },
  formActions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 30,
  },
  heading: {
    fontSize: 17,
    fontWeight: "600",
  },
  imputColumn: {
    marginVertical: 30,
  },
  buttons: {
    backgroundColor: "#3742fa",
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "600",
    borderRadius: 5,
  },
  passwordContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  passwordText: {
    backgroundColor: "#ff4757",
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    textAlign: "center",
    borderRadius: 5,
    fontWeight:"700"
  },
});

export default App;
