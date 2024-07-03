import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EcommerceTable.css';

const EcommerceTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post('http://localhost:9200/kibana_sample_data_ecommerce/_search', {
        query: {
          match_all: {}
        },
        size: 1000
      });

      setData(result.data.hits.hits);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
        <h1>eCommerce Orders</h1>
        <table>
        <thead>
            <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Total Price</th>
            <th>Order Date</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
            <tr key={index}>
                <td>{item._source.order_id}</td>
                <td>{item._source.customer_full_name}</td>
                <td>{item._source.taxless_total_price}</td>
                <td>{item._source.order_date}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default EcommerceTable;
