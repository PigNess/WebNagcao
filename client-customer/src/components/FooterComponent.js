import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer-dark">
        <div className="footer-container">
          <div className="footer-column">
            <h4>THÔNG TIN CHUNG</h4>
            <div className="footer-company">
              <strong>CTY TNHH THƯƠNG MẠI TRẦM HƯƠNG TRẦM TỊNH</strong>
            </div>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> 56C Lê Tự Tài, P.4, Q. Phú Nhuận, Thành phố Hồ Chí Minh</li>
              <li><i className="fas fa-phone"></i> 07.0855.0855</li>
              <li><i className="fas fa-envelope"></i> info@tramtinh.vn</li>
              <li><i className="fab fa-facebook-f"></i> Fanpage</li>
            </ul>

            <h4 style={{ marginTop: '2rem' }}>THÔNG TIN THEO GPKD</h4>
            <ul>
              <li>CTY TNHH THƯƠNG MẠI TRẦM HƯƠNG TRẦM TỊNH</li>
              <li>56C Lê Tự Tài, P.4, Q. Phú Nhuận, Tp. HCM</li>
              <li>0315836045</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>THÔNG TIN LIÊN HỆ</h4>
            <ul>
              <li><strong>Kinh doanh dự án:</strong> 0906 365 839 (Mr.Trúc)</li>
              <li><strong>Kinh doanh Showroom:</strong> 07.0855.0855 (Ms.Ngân)</li>
              <li><strong>Hotline/CSKH/Zalo:</strong> 07.0855.0855</li>
              <li><strong>Mail:</strong> info@tramtinh.vn</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>THÔNG TIN BỔ SUNG</h4>
            <ul className="footer-links">
              <li><a href="#">Chính Sách Vận Chuyển & Thanh Toán</a></li>
              <li><a href="#">Chính Sách Bảo Hành</a></li>
              <li><a href="#">Chính Sách Bảo Mật Thông Tin</a></li>
              <li><a href="#">Chính Sách Đổi Trả Hàng</a></li>
              <li><a href="#">Chính Sách Hàng Hóa/Dịch Vụ</a></li>
              <li><a href="#">Theo Dõi Đơn Hàng</a></li>
            </ul>

            <h4 style={{ marginTop: '2rem' }}>THỜI GIAN LÀM VIỆC</h4>
            <ul>
              <li><i className="far fa-clock"></i> T2 - CN: 08:00 - 20:00</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>PHƯƠNG THỨC THANH TOÁN</h4>
            <div className="payment-methods">
              <span className="payment-icon">VISA</span>
              <span className="payment-icon">Mastercard</span>
              <span className="payment-icon">JCB</span>
            </div>

            <h4 style={{ marginTop: '2rem' }}>MẠNG XÃ HỘI</h4>
            <div className="social-links">
              <a href="#" className="social-icon fb"><i className="fab fa-facebook-f">f</i></a>
              <a href="#" className="social-icon ig"><i className="fab fa-instagram">ig</i></a>
              <a href="#" className="social-icon yt"><i className="fab fa-youtube">yt</i></a>
              <a href="#" className="social-icon tw"><i className="fab fa-twitter">tw</i></a>
            </div>
          </div>
        </div>
        
        {/* Floating Action Buttons */}
        <div className="floating-actions">
           <a href="#" className="fab-btn map">📍</a>
           <a href="#" className="fab-btn fb">f</a>
           <a href="#" className="fab-btn msg">💬</a>
           <a href="#" className="fab-btn zalo">Z</a >
        </div>
      </footer>
    );
  }
}

export default Footer;
