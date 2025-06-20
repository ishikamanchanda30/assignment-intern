import React, { useEffect, useState } from 'react';
import { Input } from '../components/ui/Input'
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoaderCircle } from 'lucide-react';
import type {Product}  from '../types/Product';
import { fetchProductsByCategory, searchProductsByName, getProductByBarcode } from '../apis/OpenFoodApi';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [barcode, setBarcode] = useState('');
  const [category, setCategory] = useState('snacks');
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
      console.error(err , "error in fetching products");
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
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Food Product Explorer</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <Input placeholder="Search by name" value={search} onChange={e => setSearch(e.target.value)} className="w-60" />
        <Button onClick={searchByName}>Search</Button>

        <Input placeholder="Search by barcode" value={barcode} onChange={e => setBarcode(e.target.value)} className="w-60" />
        <Button onClick={searchByBarcode}>Lookup</Button>

        <select
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="snacks">Snacks</option>
          <option value="beverages">Beverages</option>
          <option value="dairies">Dairies</option>
        </select>

        <select
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
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

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <LoaderCircle className="animate-spin text-gray-600" size={36} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.sort(handleSort).map(product => (
            <Card key={product.id} className="shadow-md">
              <CardContent className="p-4">
                <img src={product.image_url} alt={product.product_name} className="h-32 object-contain mx-auto mb-2" />
                <h2 className="font-semibold text-lg text-center">{product.product_name}</h2>
                <p className="text-sm text-gray-700 mt-1">Ingredients: {product.ingredients_text || 'N/A'}</p>
                <p className="text-sm text-gray-700">Nutrition Grade: {product.nutrition_grade_fr || 'N/A'}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Button onClick={() => setPage(prev => prev + 1)} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin mr-2" size={18} /> : null}
          Load More
        </Button>
      </div>
    </div>
  );
};

export default Home;