import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  renderProductCard(item) {
    return (
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
    );
  }

  render() {
    return (
      <div>
        {/* Hero Banner Section */}
        <div className="hero-banner">
          <img src="https://tramhuongannhien.vn/wp-content/uploads/2023/12/banner-web-tram-huong-an-nhien-cuoi-nam.jpg" alt="Ưu đãi cuối năm 30%" />
        </div>

        {/* Categories Strip */}
        <div className="category-strip">
           <div className="category-block">
             <img src="https://tramhuongannhien.vn/wp-content/uploads/2024/01/vong-tram-huong-deo-tay-300x300.jpg" alt="Vòng tay trầm hương" />
             <div className="category-label-container">
               <div className="category-label">VÒNG TAY TRẦM HƯƠNG</div>
               <div className="category-subtext">64 Sản Phẩm</div>
             </div>
           </div>
           <div className="category-block">
             <img src="https://tramhuongannhien.vn/wp-content/uploads/2024/01/nhang-tram-huong-sach-300x300.jpg" alt="Nhang trầm hương sạch" />
             <div className="category-label-container">
               <div className="category-label">NHANG TRẦM HƯƠNG SẠCH</div>
               <div className="category-subtext">23 Sản Phẩm</div>
             </div>
           </div>
           <div className="category-block">
             <img src="https://tramhuongannhien.vn/wp-content/uploads/2024/01/nu-tram-huong-cao-cap-300x300.jpg" alt="Nụ trầm hương" />
             <div className="category-label-container">
               <div className="category-label">NỤ TRẦM HƯƠNG</div>
               <div className="category-subtext">3 Sản Phẩm</div>
             </div>
           </div>
           <div className="category-block">
             <img src="https://tramhuongannhien.vn/wp-content/uploads/2024/01/tuong-phat-tram-huong-300x300.jpg" alt="Trầm cảnh mỹ nghệ" />
             <div className="category-label-container">
               <div className="category-label">TRẦM CẢNH MỸ NGHỆ</div>
               <div className="category-subtext">66 Sản Phẩm</div>
             </div>
           </div>
           <div className="category-block">
             <img src="https://tramhuongannhien.vn/wp-content/uploads/2024/01/bot-tram-huong-nguyen-chat-300x300.jpg" alt="Trầm hương đốt" />
             <div className="category-label-container">
               <div className="category-label">TRẦM HƯƠNG ĐỐT</div>
               <div className="category-subtext">13 Sản Phẩm</div>
             </div>
           </div>
        </div>

        {/* Category Header Bar */}
        <div className="category-header-bar">
          QUÀ TẶNG TRẦM HƯƠNG 2026
        </div>

        {/* New Products Section */}
        <div className="home-section" style={{ paddingTop: '2rem' }}>
          <h2 className="section-title">Sản Phẩm Mới</h2>
          <div className="product-grid">
            {this.state.newprods.map((item) => this.renderProductCard(item))}
          </div>
        </div>

        {/* Hot Products Section */}
        {this.state.hotprods.length > 0 && (
          <div className="home-section">
            <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
            <div className="product-grid">
              {this.state.hotprods.map((item) => this.renderProductCard(item))}
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}

export default Home;