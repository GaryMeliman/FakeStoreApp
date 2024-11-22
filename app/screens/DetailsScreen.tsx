import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Card, Paragraph, Text, Title } from "react-native-paper";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { ProductResponse } from "../services/products";
import { roundToNearestHalf } from "../utils/utils";

interface DetailsScreenProps {
    product: ProductResponse;
}

const DetailsScreen: FC = () => {
    const route = useRoute();
    const { product } = route.params as DetailsScreenProps;
    const { category, description, image, price, title, rating } = product;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbarHeader}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
            </Appbar.Header>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Title>{title}</Title>
                        <Paragraph style={{ marginBottom: 10 }}>{description}</Paragraph>
                        <Paragraph><Text style={{ fontWeight: 'bold' }}>Categoría:</Text> {category}</Paragraph>
                        <Paragraph style={{ marginBottom: 10 }}><Text style={{ fontWeight: 'bold' }}>Precio:</Text> ${price}</Paragraph>
                        <StarRatingDisplay
                            rating={roundToNearestHalf(rating.rate)}
                        />
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    appbarHeader: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    imageContainer: {
        marginTop: 60,
        width: '100%',
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    scrollContainer: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    card: {
        width: '100%',
        marginBottom: 16,
        borderRadius: 8,
    },
});

export default DetailsScreen;
