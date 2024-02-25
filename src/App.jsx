import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SortingApp = () => {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSort = (order) => {
    const sortedData = [...data].sort((a, b) => {
      if (order === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    setData(sortedData);
    setSortOrder(order);
  };

  return (
    <div>
      <h1>Sorting App</h1>
      <label htmlFor="sortOrder">Sort Order: </label>
      <select id="sortOrder" value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}{item.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default SortingApp;
