import httpClient from "../client/httpClient";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    return (
      <div style={{ padding: '3rem 0' }}>
        <h2 className="section-title">Danh Sách Sản Phẩm</h2>
        {this.state.products.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
            Không tìm thấy sản phẩm nào.
          </p>
        ) : (
          <div className="product-grid">
            {this.state.products.map((item) => (
              <div key={item._id} className="product-card">
                <Link to={'/product/' + item._id}>
                  <div className="card-image">
                    <img
                      src={"data:image/jpg;base64," + item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="product-card-info">
                    <h4>{item.name}</h4>
                    <div className="price">{item.price.toLocaleString('vi-VN')}đ</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  apiGetProductsByCatID(cid) {
    httpClient.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  apiGetProductsByKeyword(keyword) {
    httpClient.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}

export default withRouter(Product);