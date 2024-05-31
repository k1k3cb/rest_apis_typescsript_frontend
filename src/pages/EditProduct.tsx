import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData
} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { getProductById, updateProduct } from '../services/ProductService';
import { Product } from '../types';
import ProductForm from '../components/ProductForm';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (params.id !== undefined) {
    const product = await getProductById(Number(params.id));   
    if (!product) {
      throw new Response('', { status: 404, statusText: 'Product not found' });
    }
    return product;
  }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  let error = '';
  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }

  if (error) {
    return error;
  }

  if (params.id !== undefined) {
    await updateProduct(Number(params.id), data);
    return redirect('/');
  }
};

const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false }
];

const EditProduct = () => {
  const productData = useLoaderData() as Product;
  const error = useActionData() as string;

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Editar producto</h2>
        <Link
          to='/'
          className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
        >
          Volver a productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form className='mt-10' method='POST'>
      <ProductForm product={productData}/>
        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='available'>
            Disponibilidad:
          </label>
          <select
            id='available'
            className='mt-2 block w-full p-3 bg-gray-50'
            name='available'
            defaultValue={productData?.available.toString()}
          >
            {availabilityOptions.map(option => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type='submit'
          className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
          value='Actualizar Producto'
        />
      </Form>
    </>
  );
};

export default EditProduct;
