import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================
  // GET PRODUCTS FROM API
  // ==========================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://inside-dev.com/api/fragrance"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        // API response agar array hai
        const apiProducts = Array.isArray(data)
          ? data
          : data.data || data.products || [];

        // Sirf 4 products Home page par
        setProducts(apiProducts.slice(0, 4));
      } catch (error) {
        console.error("API Error:", error);
        setError("Products load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ==========================
  // ADD TO CART
  // ==========================

  const addToCart = (product) => {
    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem("cart") || "[]");
    } catch (error) {
      cart = [];
    }

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: updatedCart,
      })
    );

    window.dispatchEvent(
      new CustomEvent("openCart", {
        detail: updatedCart,
      })
    );
  };

  return (
    <>
      {/* ================= BANNER ================= */}

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>

        </div>

        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="/images/Perfume-4.jpg"
              className="d-block w-100"
              alt="Men's Fragrance"
            />
          </div>

          <div className="carousel-item">
            <img
              src="/images/Perfume-2.jpg"
              className="d-block w-100"
              alt="Women's Fragrance"
            />
          </div>

          <div className="carousel-item">
            <img
              src="/images/Perfume-3.jpg"
              className="d-block w-100"
              alt="Luxury Perfume"
            />
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Previous
          </span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>

          <span className="visually-hidden">
            Next
          </span>
        </button>
      </div>

      {/* ================= FEATURED PRODUCTS ================= */}

      <section className="featured-products py-5">

        <div className="container">

          <h2 className="section-title text-center mb-5">
            Featured Products
          </h2>

          {/* LOADING */}

          {loading && (
            <div className="text-center py-5">
              <div
                className="spinner-border"
                role="status"
              >
                <span className="visually-hidden">
                  Loading...
                </span>
              </div>
              <p className="mt-3">
                Loading products...
              </p>
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

          {/* PRODUCTS */}

          {!loading && !error && (
            <div className="row g-4">

              {products.map((product) => (

                <div
                  className="col-lg-3 col-md-6"
                  key={product.id}
                >

                  <div className="product-card">

                    {/* IMAGE */}

                    <div className="image-wrapper">

                      <img
                        src={
                          product.image ||
                          product.image_url ||
                          product.thumbnail
                        }
                        alt={
                          product.title ||
                          product.name
                        }
                        className="img-fluid"
                      />

                      <button
                        type="button"
                        className="wishlist-btn"
                      >
                        <i className="fa-regular fa-heart"></i>
                      </button>

                    </div>

                    {/* PRODUCT INFO */}

                    <div className="product-info">

                      <h5>
                        {product.title ||
                          product.name}
                      </h5>

                      {/* RATING */}

                      <div className="rating">

                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>

                        <span>
                          (5.0)
                        </span>

                      </div>

                      {/* PRICE */}

                      <div className="price">
                        Rs.{" "}
                        {product.price ||
                          product.sale_price ||
                          product.amount}
                      </div>

                      {/* ADD TO CART */}

                      <button
                        type="button"
                        className="cart-btn"
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        Add To Cart
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </section>
    </>
  );
}

export default Home;
