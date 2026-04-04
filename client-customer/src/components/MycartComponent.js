import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import withRouter from '../utils/withRouter';

class Mycart extends Component {
  static contextType = MyContext;

  render() {
    const mycart = this.context.mycart;
    const total = CartUtil.getTotal(mycart);

    return (
      <div className="container" style={{ margin: '4rem auto', maxWidth: '1200px', padding: '0 2rem' }}>
        {/* Header */}
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          color: 'var(--color-primary)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Giỏ Hàng Của Bạn
        </h2>

        {mycart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
            <p style={{ fontSize: '1.2rem' }}>Giỏ hàng của bạn đang trống</p>
            <button
              className="btn-primary"
              style={{ marginTop: '1rem', padding: '12px 32px' }}
              onClick={() => this.props.navigate('/home')}
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
            {/* Left: Cart Items */}
            <div style={{ flex: 1 }}>
              {mycart.map((item, index) => (
                <div key={item.product._id} style={{
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '1.5rem',
                  borderBottom: '1px solid var(--color-border)',
                  alignItems: 'center'
                }}>
                  {/* Product Image */}
                  <img
                    src={"data:image/jpg;base64," + item.product.image}
                    alt={item.product.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border)'
                    }}
                  />

                  {/* Product Info */}
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      margin: '0 0 0.3rem 0',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.1rem',
                      color: 'var(--color-primary)'
                    }}>
                      {item.product.name}
                    </h4>
                    <p style={{
                      margin: '0 0 0.3rem 0',
                      fontSize: '0.85rem',
                      color: 'var(--color-text-muted)'
                    }}>
                      {item.product.category ? item.product.category.name : ''}
                    </p>
                    <p style={{
                      margin: 0,
                      fontWeight: '600',
                      color: 'var(--color-primary)',
                      fontSize: '1rem'
                    }}>
                      {item.product.price.toLocaleString('vi-VN')}đ
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px'
                  }}>
                    <button
                      onClick={() => this.btnChangeQuantity(item.product._id, -1)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '1rem',
                        color: 'var(--color-text-main)'
                      }}
                    >−</button>
                    <span style={{
                      padding: '6px 16px',
                      borderLeft: '1px solid var(--color-border)',
                      borderRight: '1px solid var(--color-border)',
                      minWidth: '40px',
                      textAlign: 'center',
                      fontSize: '0.95rem'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => this.btnChangeQuantity(item.product._id, 1)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '1rem',
                        color: 'var(--color-text-main)'
                      }}
                    >+</button>
                  </div>

                  {/* Subtotal */}
                  <div style={{
                    minWidth: '120px',
                    textAlign: 'right',
                    fontWeight: '600',
                    color: 'var(--color-primary)',
                    fontSize: '1rem'
                  }}>
                    {(item.product.price * item.quantity).toLocaleString('vi-VN')}đ
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => this.lnkRemoveClick(item.product._id)}
                    style={{
                      color: 'var(--color-danger)',
                      fontSize: '1.2rem',
                      padding: '4px 8px',
                      transition: 'opacity 0.2s'
                    }}
                    title="Xóa sản phẩm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Right: Order Summary */}
            <div style={{
              width: '360px',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '2rem',
              position: 'sticky',
              top: '2rem'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                color: 'var(--color-primary)',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--color-border)'
              }}>
                Tóm tắt đơn hàng
              </h3>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.8rem',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Tạm tính ({mycart.length} sản phẩm)</span>
                  <span style={{ fontWeight: '500' }}>{total.toLocaleString('vi-VN')}đ</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.8rem',
                  fontSize: '0.95rem'
                }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Phí vận chuyển</span>
                  <span style={{ fontWeight: '500', color: 'var(--color-accent)' }}>Miễn phí</span>
                </div>
              </div>

              {/* Promo Code */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <input
                  type="text"
                  placeholder="Mã giảm giá"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <button style={{
                  padding: '10px 16px',
                  backgroundColor: 'var(--color-secondary)',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  fontWeight: '500'
                }}>
                  Áp dụng
                </button>
              </div>

              {/* Total */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '2px solid var(--color-primary)',
                marginBottom: '1.5rem'
              }}>
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'var(--color-primary)'
                }}>Tổng cộng</span>
                <span style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: 'var(--color-danger)'
                }}>
                  {total.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {/* Checkout Button */}
              <button
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: '6px',
                  letterSpacing: '0.5px'
                }}
                onClick={() => this.lnkCheckoutClick()}
              >
                THANH TOÁN
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  btnChangeQuantity(id, delta) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) {
      mycart[index].quantity += delta;
      if (mycart[index].quantity < 1) {
        mycart[index].quantity = 1;
      }
      this.context.setMycart([...mycart]);
    }
  }

  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) {
      mycart.splice(index, 1);
      this.context.setMycart([...mycart]);
    }
  }

  lnkCheckoutClick() {
    if (this.context.mycart.length > 0) {
      if (this.context.customer) {
        this.props.navigate('/checkout');
      } else {
        this.props.navigate('/login');
      }
    } else {
      alert('Giỏ hàng của bạn đang trống!');
    }
  }
}

export default withRouter(Mycart);
