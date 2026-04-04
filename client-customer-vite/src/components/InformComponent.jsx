import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";

class Inform extends Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="info-bar">
        <div className="info-bar-left">
          {this.context.token === "" ? (
            <>
              <Link to="/login">Đăng nhập</Link>
              <span>|</span>
              <Link to="/signup">Đăng ký</Link>
              <span>|</span>
              <Link to="/active">Kích hoạt</Link>
            </>
          ) : (
            <>
              <span>Xin chào, <b>{this.context.customer.name}</b></span>
              <span>|</span>
              <Link to="/myprofile">Tài khoản</Link>
              <span>|</span>
              <Link to="/myorders">Đơn hàng</Link>
              <span>|</span>
              <Link to="/home" onClick={() => this.lnkLogoutClick()}>
                Đăng xuất
              </Link>
            </>
          )}
        </div>
        <div className="info-bar-right">
          <Link to="/mycart">
            🛒 Giỏ hàng
          </Link>
          <span className="cart-badge">{this.context.mycart.length}</span>
        </div>
      </div>
    );
  }

  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;
