import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import httpClient from "../client/httpClient";
import withRouter from '../utils/withRouter';

class Checkout extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      paymentMethod: 'cod',
      note: ''
    };
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        fullName: this.context.customer.name || '',
        phone: this.context.customer.phone || '',
        email: this.context.customer.email || ''
      });
    } else {
      this.props.navigate('/login');
    }
    if (this.context.mycart.length === 0) {
      this.props.navigate('/mycart');
    }
  }

  render() {
    const mycart = this.context.mycart;
    const total = CartUtil.getTotal(mycart);

    const inputStyle = {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid var(--color-border)',
      borderRadius: '6px',
      fontSize: '0.95rem',
      fontFamily: 'var(--font-body)',
      outline: 'none',
      transition: 'border-color 0.2s',
      backgroundColor: '#fff'
    };

    const labelStyle = {
      display: 'block',
      marginBottom: '6px',
      fontSize: '0.9rem',
      fontWeight: '500',
      color: 'var(--color-text-main)'
    };

    const fieldGroup = {
      marginBottom: '1.2rem'
    };

    return (
      <div className="container" style={{ margin: '3rem auto', maxWidth: '1200px', padding: '0 2rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          color: 'var(--color-primary)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Thanh Toán
        </h2>

        <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
          {/* LEFT: Shipping & Payment Form */}
          <div style={{ flex: 1 }}>
            {/* Shipping Info */}
            <div style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                color: 'var(--color-primary)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>1</span>
                Thông Tin Giao Hàng
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={fieldGroup}>
                  <label style={labelStyle}>Họ và tên *</label>
                  <input
                    type="text"
                    value={this.state.fullName}
                    onChange={(e) => this.setState({ fullName: e.target.value })}
                    placeholder="Nhập họ và tên"
                    style={inputStyle}
                  />
                </div>
                <div style={fieldGroup}>
                  <label style={labelStyle}>Số điện thoại *</label>
                  <input
                    type="tel"
                    value={this.state.phone}
                    onChange={(e) => this.setState({ phone: e.target.value })}
                    placeholder="Nhập số điện thoại"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={fieldGroup}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  placeholder="Nhập địa chỉ email"
                  style={inputStyle}
                />
              </div>

              <div style={fieldGroup}>
                <label style={labelStyle}>Địa chỉ giao hàng *</label>
                <input
                  type="text"
                  value={this.state.address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  style={inputStyle}
                />
              </div>

              <div style={fieldGroup}>
                <label style={labelStyle}>Ghi chú đơn hàng</label>
                <textarea
                  value={this.state.note}
                  onChange={(e) => this.setState({ note: e.target.value })}
                  placeholder="Ghi chú về đơn hàng, ví dụ: thời gian giao hàng..."
                  rows="3"
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '2rem'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                color: 'var(--color-primary)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>2</span>
                Phương Thức Thanh Toán
              </h3>

              {/* COD */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.2rem',
                border: this.state.paymentMethod === 'cod' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                borderRadius: '8px',
                marginBottom: '1rem',
                cursor: 'pointer',
                background: this.state.paymentMethod === 'cod' ? 'rgba(74,53,37,0.04)' : 'transparent',
                transition: 'all 0.2s'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={this.state.paymentMethod === 'cod'}
                  onChange={(e) => this.setState({ paymentMethod: e.target.value })}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>Thanh toán khi nhận hàng (COD)</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Thanh toán bằng tiền mặt khi nhận được hàng</div>
                </div>
              </label>

              {/* Bank Transfer */}
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.2rem',
                border: this.state.paymentMethod === 'bank' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                borderRadius: '8px',
                cursor: 'pointer',
                background: this.state.paymentMethod === 'bank' ? 'rgba(74,53,37,0.04)' : 'transparent',
                transition: 'all 0.2s'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={this.state.paymentMethod === 'bank'}
                  onChange={(e) => this.setState({ paymentMethod: e.target.value })}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>Chuyển khoản ngân hàng</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Chuyển khoản qua tài khoản ngân hàng</div>
                </div>
              </label>

              {this.state.paymentMethod === 'bank' && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1.2rem',
                  background: 'rgba(201,160,122,0.1)',
                  borderRadius: '8px',
                  border: '1px solid var(--color-accent)',
                  fontSize: '0.9rem',
                  lineHeight: '1.6'
                }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: 'var(--color-primary)' }}>Thông tin chuyển khoản:</p>
                  <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
                    Ngân hàng: Vietcombank<br />
                    Số tài khoản: 1234567890<br />
                    Chủ tài khoản: TRAM TINH STORE<br />
                    Nội dung: [Mã đơn hàng]
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div style={{
            width: '400px',
            position: 'sticky',
            top: '2rem'
          }}>
            <div style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '2rem'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                color: 'var(--color-primary)',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--color-border)'
              }}>
                Đơn hàng của bạn
              </h3>

              {/* Cart Items Summary */}
              <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1.5rem' }}>
                {mycart.map((item) => (
                  <div key={item.product._id} style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--color-border)',
                    alignItems: 'center'
                  }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={"data:image/jpg;base64," + item.product.image}
                        alt={item.product.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '6px'
                        }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        background: 'var(--color-primary)',
                        color: '#fff',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: '700'
                      }}>
                        {item.quantity}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '2px' }}>{item.product.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.product.category ? item.product.category.name : ''}</div>
                    </div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                      {(item.product.price * item.quantity).toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Tạm tính</span>
                  <span>{total.toLocaleString('vi-VN')}đ</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.7rem', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Phí vận chuyển</span>
                  <span style={{ color: 'var(--color-accent)' }}>Miễn phí</span>
                </div>
              </div>

              {/* Total */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '2px solid var(--color-primary)',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-primary)' }}>TỔNG CỘNG</span>
                <span style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--color-danger)' }}>
                  {total.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {/* Pay Button */}
              <button
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '6px',
                  letterSpacing: '0.5px'
                }}
                onClick={() => this.btnSubmitOrder()}
              >
                ĐẶT HÀNG
              </button>

              <p style={{
                textAlign: 'center',
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                marginTop: '1rem',
                lineHeight: '1.4'
              }}>
                Bằng việc đặt hàng, bạn đồng ý với các
                <span style={{ color: 'var(--color-primary)', cursor: 'pointer' }}> điều khoản & chính sách </span>
                của Trầm Tịnh.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  btnSubmitOrder() {
    const { fullName, phone, address } = this.state;
    if (!fullName || !phone || !address) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng!');
      return;
    }

    if (window.confirm('Xác nhận đặt hàng?')) {
      const total = CartUtil.getTotal(this.context.mycart);
      const items = this.context.mycart;
      const customer = this.context.customer;

      this.apiCheckout(total, items, customer);
    }
  }

  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    httpClient.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Trầm Tịnh.');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('Đặt hàng thất bại. Vui lòng thử lại!');
      }
    });
  }
}

export default withRouter(Checkout);
