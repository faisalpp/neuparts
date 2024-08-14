'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [category, setCategory] = useState('');
  const [partType, setPartType] = useState('');
  const [conditions, setConditions] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [onsale, setOnsale] = useState(false);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    handleFilterparams('category', event.target.value);
    // router.push({
    //   pathname: '/test',
    //   query: { category: event.target.value },
    // });
  };

  let queryParams;
  const handleFilterparams = (name, value) => {
    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search);
    }
    if (queryParams.has(name)) {
      queryParams.set(name, value);
    } else {
      queryParams.append(name, value);
    }
    const parth = window.location.pathname + '?' + queryParams.toString();
    router.push(parth);
  };

  const handlePartTypeChange = (event) => {
    setPartType(event.target.value);
    handleFilterparams('partType', event.target.value);
  };

  const handleConditionsChange = (event) => {
    const checkedConditions = event.target.checked ? [...conditions, event.target.value] : conditions.filter((condition) => condition !== event.target.value);
    setConditions(checkedConditions);
    handleFilterparams('conditions', event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange([event.target.min, event.target.max]);
    handleFilterparams('priceRange', `${event.target.min},${event.target.max}`);
    // router.push({
    //   pathname: '/test',
    //   query: { priceRange: `${event.target.min},${event.target.max}` },
    // });
  };

  const handleOnsaleChange = (event) => {
    setOnsale(event.target.checked);
    if (event.target.checked) {
      handleFilterparams('onsale', 'true');
    } else {
      handleFilterparams('onsale', 'false');
    }
    // router.push({
    //   pathname: '/test',
    //   query: { onsale: event.target.checked ? 'true' : 'false' },
    // });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let url = '/api/front/product';

      if (typeof window !== 'undefined') {
        queryParams = new URLSearchParams(window.location.search);
      }

      console.log(queryParams.toString());

      // const response = await axios.get(url);
      // const data = response.data;
      // console.log(data);

      //   setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [router.asPath]);

  return (
    <div>
      <div>
        <h2>Filter</h2>
        <form>
          <label>
            Category Type:
            <select value={category} onChange={handleCategoryChange}>
              <option value="">All</option>
              <option value="category-1">Category 1</option>
              <option value="category-2">Category 2</option>
            </select>
          </label>
          <label>
            Part Type:
            <select value={partType} onChange={handlePartTypeChange}>
              <option value="">All</option>
              <option value="part-type-1">Part Type 1</option>
              <option value="part-type-2">Part Type 2</option>
            </select>
          </label>
          <label>
            Conditions:
            <ul>
              <li>
                <input type="checkbox" value="new" checked={conditions.includes('new')} onChange={handleConditionsChange} />
                New
              </li>
              <li>
                <input type="checkbox" value="used" checked={conditions.includes('used')} onChange={handleConditionsChange} />
                Used
              </li>
            </ul>
          </label>
          <label>
            Price Range:
            <input type="range" min={0} max={1000} value={priceRange[0]} onChange={handlePriceRangeChange} />
            <input type="range" min={0} max={1000} value={priceRange[1]} onChange={handlePriceRangeChange} />
          </label>
          <label>
            Onsale:
            <input type="checkbox" checked={onsale} onChange={handleOnsaleChange} />
          </label>
        </form>
      </div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product._id}>
                <h2>{product.title}</h2>
                <p>Price: ${product.regular_price}</p>
                <p>Part Number: {product.part_number}</p>
                <p>Model Number: {product.model_no}</p>
                <p>Condition: {product.condition}</p>
                <p>Type: {product.type}</p>
                <p>Category: {product.category.title}</p>
                <p>Stock: {product.stock}</p>
                <p>Description: {product.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
