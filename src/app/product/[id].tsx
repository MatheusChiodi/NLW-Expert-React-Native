import { Image, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { useCartStore } from '@/stores/cart-store';

import { PRODUCTS } from '@/utils/data/products';
import { formatCurrency } from '@/utils/functions/format-currency';

import { Button } from '@/components/button';
import { LinkButton } from '@/components/link-button';

export default function Product() {
  const cartStore = useCartStore();
  const navigation = useNavigation();

  const { id } = useLocalSearchParams();

  const product = PRODUCTS.filter((product) => product.id === id)[0];

  function handleAddToCart() {
    cartStore.add(product);
    navigation.goBack();
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="px-5  pt-2 flex-1">
        <Text className="text-lime-400 text-2xl font-heading my-2">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        <ScrollView
          className="flex-1"
        >
          {product.ingredients.map((ingredient) => (
            <Text
              className="text-slate-400 font-body text-base leading-6"
              key={ingredient}
            >
              {'\u2022'} {ingredient}
            </Text>
          ))}
        </ScrollView>
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>

          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
