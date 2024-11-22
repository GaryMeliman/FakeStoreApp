import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import React, { act } from 'react';
import 'react-native-gesture-handler/jestSetup';
import { Provider as PaperProvider } from 'react-native-paper';
import ProductItem from '../../components/ProductItem';
import { ProductResponse } from '../../services/products';

describe("ProductItem component", () => {
    const mockOnPress = jest.fn();
    jest.mock('react-native-gesture-handler', () => {
        return {
            TouchableOpacity: 'TouchableOpacity',
        };
    });
    const product: ProductResponse = {
        id: 1,
        title: 'Product Title',
        price: 99.99,
        category: 'Category',
        description: 'Product description',
        image: 'https://via.placeholder.com/150',
        rating: {
            rate: 4.5,
            count: 100,
        },
    };
    beforeEach(() => {
        mockOnPress.mockClear();
    });
    it("renderea el ProductItem con el product correcto", () => {
        render(
            <PaperProvider>
                <ProductItem product={product} onPress={mockOnPress} />
            </PaperProvider>
        );
        expect(screen.getByText(`${product.title} - ${product.category}`)).toBeTruthy();
        expect(screen.getByText(product.description)).toBeTruthy();
        expect(screen.getByText(`$${product.price}`)).toBeTruthy();
        const avatarImage = screen.getByTestId ('avatar-image');
        expect(avatarImage.props.source.uri).toBe(product.image);
    });
    it('debe llamar onPress con el producto correcto cuando se presiona', async () => {
        render(<ProductItem product={product} onPress={mockOnPress} />);
        act(() => {
            fireEvent.press(screen.getByTestId('product-item-button'));
        });
        await waitFor(() => {
            expect(mockOnPress).toHaveBeenCalledTimes(1);
            expect(mockOnPress).toHaveBeenCalledWith(product);
        });
    });
});