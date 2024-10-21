import Header from "./Header";
import Footer from "./Footer";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

const Contact = () => {
  const [isSent, setIsSent] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mrs2gmr",
        "template_1atvw44",
        form.current,
        "2vAafyWokU5vCYmE9"
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsSent(!isSent);
          setTimeout(() => {
            if (result.status === 200) {
              setIsSent(false);
            }
          }, 3000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="contact">
      <Header />
      <img src="contact_bg.png" alt="" />
      <div className="contc-cont">
        <div className="contc-descrp">
          <h1>Need additional information?</h1>
          <p>
            Got questions about your dream car? We've got answers. You've come
            to the right place for all the answers. Our team is here to help you
            navigate through any questions you may have, providing clear and
            straightforward information.
          </p>
          <div className="info-cont">
            <i class="fa-solid fa-square-phone"></i>
            <p>+27 7XX XXX XXXX</p>
          </div>
          <div className="info-cont">
            <i class="fa-regular fa-envelope"></i>
            <p>support@aem.co.za</p>
          </div>
          <div className="info-cont">
            <i class="fa-solid fa-location-dot"></i>
            <p>Addis Ababa, Ethiopia</p>
          </div>
        </div>
        <form className="contc-form" ref={form} onSubmit={sendEmail}>
          <div
            style={{ display: isSent ? "flex" : "none" }}
            className="confirm-cont"
          >
            <img src="check.png" alt="" />
            <p>Sent succesfully!</p>
          </div>
          <label htmlFor="name">
            Name<b>*</b>
          </label>
          <input
            type="name"
            placeholder="Enter Your Name"
            name="user_name"
            id="name"
          />
          <label htmlFor="email">
            Email<b>*</b>
          </label>
          <input
            type="email"
            placeholder="Enter Email Address"
            name="user_email"
            id="email"
          />
          <label htmlFor="textarea">
            Textarea<b>*</b>
          </label>
          <textarea
            name="message"
            id="textarea"
            cols="30"
            rows="10"
            placeholder="Write Your Message Here..."
          ></textarea>
          <input type="submit" value="Send" />
        </form>
      </div>

      <Footer />
    </div>
  );
};
export default Contact;
