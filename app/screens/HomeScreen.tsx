/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import ProductItem from '../components/ProductItem';
import { setDialog } from '../redux/dialogSlice';
import { getAllProducts, ProductResponse } from '../services/products';
import { NETWORK_ERROR_MESSAGE } from '../utils/const';

const HomeScreen: FC = () => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const currentProducts = await getAllProducts();
                if (currentProducts) setProducts(currentProducts);
            } catch (error) {
                dispatch(setDialog(NETWORK_ERROR_MESSAGE));
            }
        })();
    }, []);

    const handleOnPress = (product: ProductResponse) => {
        navigation.navigate("Details", { product });
    }

    return (
        <ScrollView>
            <List.Section>
                <List.Subheader>Lista de Productos</List.Subheader>
                {products?.map(p => <ProductItem onPress={handleOnPress} product={p} key={p.id.toString()} />)}
            </List.Section>
        </ScrollView>
    );
};

export default HomeScreen;