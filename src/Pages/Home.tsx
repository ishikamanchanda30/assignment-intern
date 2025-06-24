import React, { useEffect, useState } from 'react';
import { Input } from '../components/ui/Input'
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoaderCircle } from 'lucide-react';
import type { Product } from '../types/Product';
import { fetchProductsByCategory, searchProductsByName, getProductByBarcode } from '../apis/OpenFoodApi';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [barcode, setBarcode] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [category, page]);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProductsByCategory(category, page);
      const fetchedProducts = data.map((product: any, index: number) => ({
        id: `${product.code}-${index}`,
        product_name: product.product_name,
        image_url: product.image_url,
        categories_tags: product.categories_tags,
        ingredients_text: product.ingredients_text,
        nutrition_grade_fr: product.nutrition_grade_fr,
        code: product.code,
      }));
      setProducts(prev => [...prev, ...fetchedProducts]);
    } catch (err) {
      console.error(err, "error in fetching products");
    } finally {
      setLoading(false);
    }
  };

  const searchByName = async () => {
    if (!search) return;
    try {
      setLoading(true);
      const data = await searchProductsByName(search);
      const fetchedProducts = data.map((product: any, index: number) => ({
        id: `${product.code}-${index}`,
        product_name: product.product_name,
        image_url: product.image_url,
        categories_tags: product.categories_tags,
        ingredients_text: product.ingredients_text,
        nutrition_grade_fr: product.nutrition_grade_fr,
        code: product.code,
      }));
      setProducts(fetchedProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchByBarcode = async () => {
    if (!barcode) return;
    try {
      setLoading(true);
      const product = await getProductByBarcode(barcode);
      setProducts([{ id: product.code, product_name: product.product_name, image_url: product.image_url, categories_tags: product.categories_tags, ingredients_text: product.ingredients_text, nutrition_grade_fr: product.nutrition_grade_fr, code: product.code }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (a: Product, b: Product): number => {
    switch (sort) {
      case 'name-asc': return a.product_name.localeCompare(b.product_name);
      case 'name-desc': return b.product_name.localeCompare(a.product_name);
      case 'grade-asc': return (a.nutrition_grade_fr || '').localeCompare(b.nutrition_grade_fr || '');
      case 'grade-desc': return (b.nutrition_grade_fr || '').localeCompare(a.nutrition_grade_fr || '');
      default: return 0;
    }
  };
  
  return (
    <div className="max-w-screen min-w-screen min-h-screen overflow-hidden">
      <h1 className="justify-center flex text-4xl border-b-1 py-6">Know your food.</h1>
      <div className="grid grid-cols-4 border-b-1 px-6">
        <div className='flex justify-between border-r-1 px-6 py-2'>
          <Input placeholder="Search by name" value={search} onChange={e => setSearch(e.target.value)} className="decoration-none" />
          <Button onClick={searchByName}>Search</Button>
        </div>
        <div className='flex justify-between border-r-1 px-6 py-2  '>
          <Input placeholder="Search by barcode" value={barcode} onChange={e => setBarcode(e.target.value)} className="decoration-none" />
          <Button onClick={searchByBarcode}>Lookup</Button>
        </div>

        <select
          className="focus:outline-none focus:ring-1 focus:ring-brown-500 border-r-1 p-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        > 
          <option value="snacks">Snacks</option>
          <option value="beverages">Beverages</option>
          <option value="dairies">Dairies</option>
        </select>

        <select
          className="focus:outline-none focus:ring-1 focus:ring-brown-500 p-3"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="grade-asc">Nutrition Grade Asc</option>
          <option value="grade-desc">Nutrition Grade Desc</option>
        </select>
      </div>

      {
        loading ? (
          <div className="flex justify-center items-center h-40 ">
            <LoaderCircle className="animate-spin text-gray-600" size={36} />
          </div>
        ) : (
          <div className="grid grid-cols-6 mt-2 ">
            {products.sort(handleSort).map(product => (
              <Card key={product.id} className="h-80 ">
                <CardContent className="flex flex-col h-full">
                  <img src={product.image_url} alt={product.product_name} className="object-contain h-15 p-3" />
                  <p className="border-b-1 px-3 py-1">Nutrition Grade: {product.nutrition_grade_fr || 'N/A'}</p>
                  <h2 className="border-b-1 px-3 font-bold text-xl">{product.product_name || 'N/A'}</h2>
                  <p className=" p-3">Ingredients: {product.ingredients_text || 'N/A'}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      }

      <div className="mt-6 flex justify-center">
        <Button onClick={() => setPage(prev => prev + 1)} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin mr-2" size={18} /> : null}
          Load More
        </Button>
      </div>
    </div >
  );
};

export default Home;