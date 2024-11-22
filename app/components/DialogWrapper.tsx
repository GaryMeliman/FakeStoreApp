import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setDialog } from "../redux/dialogSlice";
import { RootState } from "../redux/store";

const DialogWrapper: FC = () => {

    const { details, title } = useSelector((state: RootState) => state.dialog);

    const dispatch = useDispatch();

    const handleHideDialog = () => {
        dispatch(setDialog({ details: "", title: "" }));
    }

    return (
        <Portal>
            <Dialog visible={true} onDismiss={handleHideDialog}>
                <Dialog.Title style={styles.title}>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{details}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleHideDialog}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
})

export default DialogWrapper;