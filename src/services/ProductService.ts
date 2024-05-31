import axios from 'axios';
import { safeParse } from 'valibot';
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema
} from '../types';
import { toBoolean } from '../utils';

interface ProductDataProps {
  [k: string]: FormDataEntryValue;
}

export const addProduct = async (data: ProductDataProps) => {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: Number(data.price)
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price
      });
    } else {
      throw new Error('Datos no validos');
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    const result = safeParse(ProductsSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error('Error al cargar los productos');
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: Product['id']) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);
    const result = safeParse(ProductSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error('Error al cargar los productos');
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (
  id: Product['id'],
  data: ProductDataProps
) => {
  try {
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: Number(data.price),
      available: toBoolean(data.available.toString())
    });
    
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    } else {
      throw new Error('Datos no validos');
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: Product['id']) => {
  
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
};

export const updateProducAvailability = async (
  id: Product['id'],  
) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
};
