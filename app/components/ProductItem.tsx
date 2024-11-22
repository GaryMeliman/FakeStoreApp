/* eslint-disable prettier/prettier */
import React, { FC } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Chip, List } from "react-native-paper";
import { ProductResponse } from "../services/products";

interface ProductItemProps {
    product: ProductResponse;
    onPress: (product: ProductResponse) => void;
}

const ProductItem: FC<ProductItemProps> = ({ product, onPress }) => {
    const { category, description, id, image, price, title } = product;
    return <TouchableOpacity onPress={() => onPress(product)} testID="product-item-button">
        <List.Item
            id={id.toString()}
            title={`${title} - ${category}`}
            description={description}
            left={props => <Avatar.Image {...props} size={24} source={{ uri: image }} testID="avatar-image" />}
            right={props => <Chip {...props}>${price}</Chip>}
        />
    </TouchableOpacity>
}
export default ProductItem;
