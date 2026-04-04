import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id}>
          <Link to={"/product/category/" + item._id}>{item.name}</Link>
        </li>
      );
    });

    return (
      <nav className="navbar">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          An Nhiên
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-menu">
          <li className="nav-item">
            <Link to="/">GIỚI THIỆU</Link>
          </li>
          {/* Mega Menu Dropdown */}
          <li className="nav-item has-mega">
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              CỬA HÀNG <small>▼</small>
            </span>
            <div className="mega-menu">
              <div className="mega-column">
                <div className="mega-title">Sản Phẩm Của Chúng Tôi</div>
                <ul className="mega-list">
                  {cates}
                </ul>
              </div>
              <div className="mega-column">
                <div className="mega-title">Nhang Trầm Hương Sạch</div>
                <ul className="mega-list">
                  <li><Link to="/">Nụ Trầm Hương</Link></li>
                  <li><Link to="/">Nhang Trầm Hương Có Tăm</Link></li>
                  <li><Link to="/">Nhang Vòng Trầm Hương</Link></li>
                  <li><Link to="/">Nhang Trầm Hương Không Tăm</Link></li>
                </ul>
              </div>
              <div className="mega-column">
                <div className="mega-title">Trầm Hương Đốt</div>
                <ul className="mega-list">
                  <li><Link to="/">Bột Trầm Hương</Link></li>
                  <li><Link to="/">Trầm Hương Miếng</Link></li>
                  <li><Link to="/">Dụng Cụ Đốt Trầm</Link></li>
                </ul>
              </div>
              <div className="mega-column">
                <div className="mega-title">Trầm Mỹ Nghệ</div>
                <ul className="mega-list">
                  <li><Link to="/">Mặt Dây Chuyền Trầm Hương</Link></li>
                  <li><Link to="/">Quạt Trầm Hương</Link></li>
                  <li><Link to="/">Tượng Trầm Hương</Link></li>
                </ul>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/">TRẦM SỬ KÝ</Link>
          </li>
          <li className="nav-item">
            <Link to="/">LIÊN HỆ</Link>
          </li>
          <li className="nav-item">
            <Link to="/">BLOG</Link>
          </li>
          <li className="nav-item">
            <span style={{ color: '#ff0000' }}>🇻🇳 TIẾNG VIỆT ▼</span>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="navbar-right">
          <form className="search-box" onSubmit={(e) => this.btnSearchClick(e)} style={{ border: 'none' }}>
            <span className="nav-icon-btn" onClick={(e) => this.btnSearchClick(e)}>🔍</span>
            <input
              type="search"
              placeholder=""
              value={this.state.txtKeyword}
              onChange={(e) => this.setState({ txtKeyword: e.target.value })}
              style={{ width: '0', padding: '0', cursor: 'pointer', transition: 'width 0.3s', backgroundColor: 'transparent' }}
              onFocus={(e) => { e.target.style.width = '120px'; e.target.style.padding = '8px 16px'; e.target.style.border = '1px solid var(--color-border)'; }}
              onBlur={(e) => { if(!e.target.value) { e.target.style.width = '0'; e.target.style.padding = '0'; e.target.style.border = 'none'; } }}
            />
          </form>
          <Link to="/mycart" className="nav-icon-btn">
             🛒<sup>0</sup>
          </Link>
          <a href="#" className="zalo-text">ZALO</a>
        </div>
      </nav>
    );
  }

  btnSearchClick(e) {
    if(e) e.preventDefault();
    if (this.state.txtKeyword) {
      this.props.navigate('/product/search/' + this.state.txtKeyword);
    }
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    axios.get("/api/customer/categories").then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default withRouter(Menu);
