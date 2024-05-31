import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useFetcher
} from 'react-router-dom';
import { deleteProduct } from '../services/ProductService';
import { Product } from '../types';
import { formatCurrency } from '../utils';

interface ProductsDetailsProps {
  product: Product;
}

export const action = async ({ params }: ActionFunctionArgs) => {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);

    return redirect('/');
  }
};

const ProductsDetails = ({ product }: ProductsDetailsProps) => {
  const fetcher = useFetcher();
  // const navigate = useNavigate();
  const isAvailable = product.available;
  return (
    <tr className='border-b '>
      <td className='p-3 text-lg text-gray-800'>{product.name}</td>
      <td className='p-3 text-lg text-gray-800'>
        {' '}
        {formatCurrency(product.price)}{' '}
      </td>
      <td className='p-3 text-lg text-gray-800'>
        <fetcher.Form action='' method='POST'>
          <button
            type='submit'
            name='id'
            value={product.id}
            className={`${
              isAvailable ? 'text-green-600 ' : 'text-red-600'
            } rounded-lg p-2 text-xs uppercase font-bold  w-full border  border-black-100  hover:cursor-pointer}`}
          >
            {isAvailable ? 'Disponible' : 'No disponible'}
          </button>
          {/* <input type="hidden" name="id" value={product.id} /> */}
        </fetcher.Form>
      </td>
      <td className='p-3 text-lg text-gray-800 '>
        <div className='flex gap-2 items-center'>
          <Link
            to={`/productos/${product.id}/editar`}
            className='rounded-md bg-indigo-600 p-2 text-sm font-bold text-white w-full text-center hover:bg-indigo-500'
          >
            Editar
          </Link>

          {/* <button
            onClick={() => navigate(`/productos/${product.id}/editar`)}
            className='rounded-md bg-indigo-600 p-2 text-sm font-bold text-white w-full text-center hover:bg-indigo-500'
          >
            Editar
          </button> */}

          <Form
            className='w-full'
            method='POST'
            action={`productos/${product.id}/eliminar`}
            onSubmit={e => {
              if (!confirm('¿Seguro que deseas eliminarlo?'))
                e.preventDefault();
            }}
          >
            <input
              type='submit'
              value='Eliminar'
              className='rounded-md bg-red-600 p-2 text-sm font-bold text-white w-full text-center hover:bg-red-500 cursor-pointer'
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};

export default ProductsDetails;
