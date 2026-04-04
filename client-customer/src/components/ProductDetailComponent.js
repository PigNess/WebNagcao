import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
class ProductDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className="container" style={{ margin: '4rem auto' }}>
          <div className="product-detail-container" style={{ display: 'flex', gap: '4rem' }}>
            <div className="product-images" style={{ flex: 1 }}>
              <img
                src={"data:image/jpg;base64," + prod.image}
                alt={prod.name}
                style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                 <img src={"data:image/jpg;base64," + prod.image} alt={prod.name} style={{ width: '80px', height: '80px', borderRadius: '4px', border: '2px solid var(--color-primary)' }}/>
                 {/* Placeholders for additional images if needed */}
              </div>
            </div>
            
            <div className="product-info" style={{ flex: 1 }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{prod.name}</h2>
              <div style={{ fontSize: '1.5rem', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '2rem' }}>
                {prod.price.toLocaleString('vi-VN')} đ
              </div>
              
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
                {prod.description || `Được mệnh danh là "Vua của các loại trầm", Kỳ Nam mang trong mình linh khí ngàn năm của đại ngàn. Nổi bật vùng bì mặt lồi, vân tựa rỉ sắt, chứa lượng tinh dầu dồi dào với hương thơm thanh khiết giúp định tâm trấn thần.`}
              </p>

              <div style={{ marginBottom: '2rem' }}>
                 <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-accent)' }}>✦</span> Khí công dương thọ, xua đuổi tà ma và chiêu cát tường.
                 </p>
                 <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-accent)' }}>✦</span> Hương thơm thanh khiết, thư giãn tinh thần, định tâm tĩnh trí.
                 </p>
                 <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-accent)' }}>✦</span> Biểu tượng của quyền quý và đẳng cấp của giới thượng lưu.
                 </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
                  <button 
                    onClick={(e) => { e.preventDefault(); this.setState({ txtQuantity: Math.max(1, this.state.txtQuantity - 1) }) }}
                    style={{ padding: '8px 16px', fontSize: '1.2rem' }}>-</button>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={this.state.txtQuantity}
                    onChange={(e) => this.setState({ txtQuantity: e.target.value })}
                    style={{ width: '50px', textAlign: 'center', border: 'none', borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)' }}
                  />
                  <button 
                    onClick={(e) => { e.preventDefault(); this.setState({ txtQuantity: this.state.txtQuantity + 1 }) }}
                    style={{ padding: '8px 16px', fontSize: '1.2rem' }}>+</button>
                </div>
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '1.1rem', backgroundColor: 'var(--color-text-main)' }}
                onClick={(e) => this.btnAdd2CartClick(e)}
              >
                THÊM VÀO GIỎ HÀNG
              </button>

            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
  btnAdd2CartClick(e) {
    e.preventDefault();

    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);

    if (quantity) {
      const mycart = this.context.mycart;

      const index = mycart.findIndex(
        x => x.product._id === product._id
      ); // check if the _id exists in mycart

      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      }
      else { // increasing the quantity
        mycart[index].quantity += quantity;
      }

      this.context.setMycart(mycart);
      alert('OK BABY!');
    }
    else {
      alert('Please input quantity');
    }
  }
}

export default withRouter(ProductDetail);
