import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Liên hệ BaoPhone</h1>

        <p>
          Địa chỉ: Gò Vấp, TP.HCM <br />
          Hotline: 0384 078 353
        </p>

        <form className="contact-form">
          <input type="text" placeholder="Họ và tên" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Nội dung" rows="5" required />
          <button type="submit">Gửi liên hệ</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;