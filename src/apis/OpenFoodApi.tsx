import axios from "axios";
const base_url = `https://world.openfoodfacts.org/`;

export const fetchProductsByCategory = async(category:string , page: number) => {
  const url = base_url + `category/${category}.json`;
  const res = await axios.get(url);
  return res.data.products;
}

export const searchProductsByName = async(name:String) => {
  const url = base_url + `/cgi/search.pl?search_terms=${name}&json=true`;
  const res = await axios.get(url);
  return res.data.products;
}

export const getProductByBarcode = async (barcode: string) => {
  const url = base_url + `api/v0/product/${barcode}.json`;
  const res = await axios.get(url);
  return res.data.product;
};
