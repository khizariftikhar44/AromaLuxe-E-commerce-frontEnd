import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  // =========================
  // GET CART FROM LOCALSTORAGE
  // =========================

  const [cartItems, setCartItems] = useState(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      return Array.isArray(cart) ? cart : [];
    } catch (error) {
      console.error("Cart loading error:", error);
      return [];
    }
  });

  // =========================
  // CHECK CART + LISTEN FOR UPDATES
  // =========================

  useEffect(() => {
    const checkCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        if (!Array.isArray(cart) || cart.length === 0) {
          setCartItems([]);
          navigate("/", { replace: true });
          return;
        }

        setCartItems(cart);
      } catch (error) {
        console.error("Cart error:", error);
        setCartItems([]);
        navigate("/", { replace: true });
      }
    };

    // Page load par check
    checkCart();

    // Cart update hone par check
    window.addEventListener("cartUpdated", checkCart);

    return () => {
      window.removeEventListener("cartUpdated", checkCart);
    };
  }, [navigate]);

  // =========================
  // PRICE HELPER
  // =========================

  const getProductPrice = (product) => {
    return Number(
      product.price ||
        product.sale_price ||
        product.amount ||
        0
    );
  };

  // =========================
  // SUBTOTAL
  // =========================

  const subtotal = cartItems.reduce((total, product) => {
    const price = getProductPrice(product);
    const quantity = product.quantity || 1;

    return total + price * quantity;
  }, 0);

  // =========================
  // DISCOUNT
  // =========================

  const discount = 10;

  // =========================
  // SHIPPING
  // =========================

  const shipping = 0;

  // =========================
  // TOTAL
  // =========================

  const total = subtotal + shipping - discount;

  // =========================
  // TOTAL ITEMS
  // =========================

  const totalItems = cartItems.reduce((total, product) => {
    return total + (product.quantity || 1);
  }, 0);

  return (
    <main className="checkout-page">
      <div className="container py-5">

        {/* =========================
            PAGE HEADING
        ========================= */}

        <div className="checkout-heading mb-4">
          <span className="checkout-eyebrow">
            SECURE CHECKOUT
          </span>

          <h1>Complete Your Order</h1>

          <p>
            Please enter your details below to complete your purchase.
          </p>
        </div>

        <div className="row g-4">

          {/* =========================
              LEFT COLUMN
          ========================= */}

          <div className="col-lg-8">

            {/* =========================
                CONTACT INFORMATION
            ========================= */}

            <section className="checkout-card mb-4">

              <div className="checkout-card-header">

                <div className="step-number">
                  01
                </div>

                <div>
                  <h2>
                    Contact Information
                  </h2>

                  <p>
                    We'll use this information to contact you about your order.
                  </p>
                </div>

              </div>

              <div className="row g-3">

                <div className="col-md-6">
                  <label className="checkout-label">
                    First Name
                  </label>

                  <input
                    type="text"
                    className="form-control checkout-input"
                    placeholder="John"
                  />
                </div>

                <div className="col-md-6">
                  <label className="checkout-label">
                    Last Name
                  </label>

                  <input
                    type="text"
                    className="form-control checkout-input"
                    placeholder="Doe"
                  />
                </div>

                <div className="col-md-6">
                  <label className="checkout-label">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control checkout-input"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="col-md-6">
                  <label className="checkout-label">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    className="form-control checkout-input"
                    placeholder="+92 300 1234567"
                  />
                </div>

              </div>

            </section>

            {/* =========================
                SHIPPING ADDRESS
            ========================= */}

            <section className="checkout-card mb-4">

              <div className="checkout-card-header">

                <div className="step-number">
                  02
                </div>

                <div>
                  <h2>
                    Shipping Address
                  </h2>

                  <p>
                    Where should we deliver your order?
                  </p>
                </div>

              </div>

              <div className="row g-3">

                <div className="col-12">

                  <label className="checkout-label">
                    Address
                  </label>

                  <input
                    type="text"
                    className="form-control checkout-input"
                    placeholder="Street address, apartment, suite, etc."
                  />

                </div>

                <div className="col-md-6">

                  <label className="checkout-label">
                    City
                  </label>

                  <input
                    type="text"
                    className="form-control checkout-input"
                    placeholder="Karachi"
                  />

                </div>

                <div className="col-md-6">

                  <label className="checkout-label">
                    State / Province
                  </label>

                  <input
                    type="text"
                    className="form-control checkout-input"
                    placeholder="Sindh"
                  />

                </div>

                <div className="col-md-6">

                  <label className="checkout-label">
                    Postal Code
                  </label>

                  <input
                    type="text"
                    className="form-control checkout-input"
                    placeholder="74000"
                  />

                </div>

                <div className="col-md-6">

                  <label className="checkout-label">
                    Country
                  </label>

                  <select className="form-select checkout-input">

                    <option>
                      Pakistan
                    </option>

                    <option>
                      United Arab Emirates
                    </option>

                    <option>
                      United Kingdom
                    </option>

                    <option>
                      United States
                    </option>

                  </select>

                </div>

                <div className="col-12">

                  <div className="checkout-checkbox">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="saveAddress"
                    />

                    <label htmlFor="saveAddress">
                      Save this address for future orders
                    </label>

                  </div>

                </div>

              </div>

            </section>

            {/* =========================
                DELIVERY METHOD
            ========================= */}

            <section className="checkout-card mb-4">

              <div className="checkout-card-header">

                <div className="step-number">
                  03
                </div>

                <div>

                  <h2>
                    Delivery Method
                  </h2>

                  <p>
                    Select your preferred delivery option.
                  </p>

                </div>

              </div>

              <div className="delivery-options">

                <label className="delivery-option active">

                  <input
                    type="radio"
                    name="delivery"
                    defaultChecked
                  />

                  <div className="delivery-radio"></div>

                  <div className="delivery-content">

                    <div className="delivery-title">

                      <strong>
                        Standard Delivery
                      </strong>

                      <span>
                        FREE
                      </span>

                    </div>

                    <p>
                      Delivery within 3–5 business days
                    </p>

                  </div>

                </label>

                <label className="delivery-option">

                  <input
                    type="radio"
                    name="delivery"
                  />

                  <div className="delivery-radio"></div>

                  <div className="delivery-content">

                    <div className="delivery-title">

                      <strong>
                        Express Delivery
                      </strong>

                      <span>
                        $12.00
                      </span>

                    </div>

                    <p>
                      Delivery within 1–2 business days
                    </p>

                  </div>

                </label>

              </div>

            </section>

            {/* =========================
                PAYMENT
            ========================= */}

            <section className="checkout-card">

              <div className="checkout-card-header">

                <div className="step-number">
                  04
                </div>

                <div>

                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Select how you would like to pay.
                  </p>

                </div>

              </div>

              <div className="payment-methods mb-4">

                <div className="payment-method active">

                  <div className="payment-radio"></div>

                  <div>

                    <strong>
                      Credit / Debit Card
                    </strong>

                    <small>
                      Visa, Mastercard, American Express
                    </small>

                  </div>

                  <div className="payment-cards">

                    <span>
                      VISA
                    </span>

                    <span>
                      MC
                    </span>

                  </div>

                </div>

                <div className="payment-method">

                  <div className="payment-radio"></div>

                  <div>

                    <strong>
                      Cash on Delivery
                    </strong>

                    <small>
                      Pay when your order arrives
                    </small>

                  </div>

                </div>

              </div>

              <div className="card-payment-box">

                <div className="row g-3">

                  <div className="col-12">

                    <label className="checkout-label">
                      Card Number
                    </label>

                    <div className="input-icon-wrapper">

                      <span className="card-icon">
                        ▣
                      </span>

                      <input
                        type="text"
                        className="form-control checkout-input"
                        placeholder="1234 5678 9012 3456"
                      />

                    </div>

                  </div>

                  <div className="col-md-6">

                    <label className="checkout-label">
                      Card Holder Name
                    </label>

                    <input
                      type="text"
                      className="form-control checkout-input"
                      placeholder="John Doe"
                    />

                  </div>

                  <div className="col-6 col-md-3">

                    <label className="checkout-label">
                      Expiry Date
                    </label>

                    <input
                      type="text"
                      className="form-control checkout-input"
                      placeholder="MM / YY"
                    />

                  </div>

                  <div className="col-6 col-md-3">

                    <label className="checkout-label">
                      CVV
                    </label>

                    <input
                      type="text"
                      className="form-control checkout-input"
                      placeholder="•••"
                    />

                  </div>

                </div>

              </div>

              <div className="secure-payment">

                <span className="secure-icon">
                  ✓
                </span>

                <div>

                  <strong>
                    Secure Payment
                  </strong>

                  <p>
                    Your payment information is encrypted and secure.
                  </p>

                </div>

              </div>

            </section>

          </div>

          {/* =========================
              RIGHT COLUMN
          ========================= */}

          <div className="col-lg-4">

            <aside className="order-summary">

              {/* SUMMARY HEADER */}

              <div className="summary-header">

                <div>

                  <span>
                    YOUR ORDER
                  </span>

                  <h2>
                    Order Summary
                  </h2>

                </div>

                <span className="item-count">
                  {totalItems}{" "}
                  {totalItems === 1 ? "Item" : "Items"}
                </span>

              </div>

              {/* =========================
                  CART PRODUCTS
              ========================= */}

              {cartItems.map((product) => {

                const price = getProductPrice(product);
                const quantity = product.quantity || 1;

                return (
                  <div
                    className="summary-product"
                    key={product.id}
                  >

                    <div className="product-image">

                      <img
                        src={
                          product.image ||
                          product.image_url ||
                          product.thumbnail
                        }
                        alt={
                          product.title ||
                          product.name ||
                          "Product"
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />

                    </div>

                    <div className="product-info">

                      <h3>
                        {product.title ||
                          product.name ||
                          "Product"}
                      </h3>

                      <p>
                        {product.category ||
                          "Fragrance"}
                      </p>

                      <span>
                        Qty: {quantity}
                      </span>

                    </div>

                    <strong>
                      Rs.{" "}
                      {(price * quantity).toFixed(2)}
                    </strong>

                  </div>
                );
              })}

              {/* =========================
                  COUPON
              ========================= */}

              <div className="coupon-box">

                <label>
                  Have a promo code?
                </label>

                <div className="coupon-input">

                  <input
                    type="text"
                    placeholder="Enter code"
                  />

                  <button type="button">
                    Apply
                  </button>

                </div>

              </div>

              {/* =========================
                  PRICING
              ========================= */}

              <div className="summary-pricing">

                <div>

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    Rs. {subtotal.toFixed(2)}
                  </strong>

                </div>

                <div>

                  <span>
                    Shipping
                  </span>

                  <strong className="free">
                    FREE
                  </strong>

                </div>

                <div>

                  <span>
                    Discount
                  </span>

                  <strong className="discount">
                    -Rs. {discount.toFixed(2)}
                  </strong>

                </div>

              </div>

              {/* =========================
                  TOTAL
              ========================= */}

              <div className="summary-total">

                <span>
                  Total
                </span>

                <div>

                  <strong>
                    Rs. {Math.max(total, 0).toFixed(2)}
                  </strong>

                  <small>
                    PKR
                  </small>

                </div>

              </div>

              {/* =========================
                  PLACE ORDER
              ========================= */}

              <button
                type="button"
                className="place-order-btn"
              >
                Place Order

                <span>
                  →
                </span>

              </button>

              {/* =========================
                  SECURITY
              ========================= */}

              <div className="order-security">

                <span>
                  ✓
                </span>

                <p>
                  Secure checkout. Your information is protected.
                </p>

              </div>

            </aside>

          </div>

        </div>

      </div>
    </main>
  );
};

export default Checkout;
