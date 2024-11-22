import { createStackNavigator } from "@react-navigation/stack";
import React, { FC } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import DialogWrapper from "../components/DialogWrapper";
import { RootState } from "../redux/store";
import { setUser } from "../redux/userSlice";
import DetailsScreen from "../screens/DetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { ProductResponse } from "../services/products";

type RootStackParamList = {
    Home: undefined;
    Details: { product: ProductResponse };
    Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigation: FC = () => {
    const dialog = useSelector((state: RootState) => state.dialog);
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUser({ token: "" }))
    }
    return (
        <>
            {dialog.title !== "" && <DialogWrapper />}
            <Stack.Navigator>
                {user.token !== "" ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} options={() => ({
                            title: 'Home',
                            headerRight: () => (
                                <Button onPress={handleLogout}>Cerrar sesión</Button>
                            ),
                        })} />
                        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </>
    )
}

export default MainNavigation;
