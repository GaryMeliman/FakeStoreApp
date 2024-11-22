import { Formik } from 'formik';
import React, { FC } from 'react';
import { StyleSheet, View } from "react-native";
import { Button, Card, HelperText, TextInput, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { setDialog } from "../redux/dialogSlice";
import { setUser } from '../redux/userSlice';
import { LoginRequest, loginUser } from '../services/users';
import { INVALID_CREDENTIALS, NETWORK_ERROR_MESSAGE } from '../utils/const';

const validationSchema = Yup.object({
    username: Yup.string()
        .required('El correo electrónico es obligatorio'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
});

const LoginScreen: FC = () => {

    const dispatch = useDispatch();

    const handleLogin = async (values: LoginRequest) => {
        try {
            const user = await loginUser(values);
            if (user) {
                dispatch(setDialog({ title: "Exito", details: "Logeado correctamente" }));
                dispatch(setUser(user));
            }
        } catch (error: any) {
            if (error.details === INVALID_CREDENTIALS.details) {
                dispatch(setDialog(INVALID_CREDENTIALS));
            } else {
                dispatch(setDialog(NETWORK_ERROR_MESSAGE));
            }
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title style={styles.title}>Iniciar Sesión</Title>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <>
                                <TextInput
                                    label="Nombre de usuario"
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    autoCapitalize="none"
                                    style={styles.input}
                                />
                                {touched.username && errors.username && (
                                    <HelperText type="error">{errors.username}</HelperText>
                                )}
                                <TextInput
                                    label="Contraseña"
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    secureTextEntry
                                    style={styles.input}
                                />
                                {touched.password && errors.password && (
                                    <HelperText type="error">{errors.password}</HelperText>
                                )}

                                <Button onPress={() => handleSubmit()} mode="contained" style={styles.button}>
                                    Iniciar sesión
                                </Button>
                            </>
                        )}
                    </Formik>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    card: {
        padding: 16,
        margin: 16,
    },
    title: {
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
});

export default LoginScreen;
