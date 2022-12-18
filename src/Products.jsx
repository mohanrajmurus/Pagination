import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    setProducts(data.products);
  };
  const pageHandler = (selectPage) => {
    if (
      selectPage >= 1 &&
      selectPage <= products.length / 10 &&
      selectPage !== page
    )
      setPage(selectPage);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            role="img"
            aria-label="xxxxx"
            onClick={() => pageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ⬅️
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => pageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            role="img"
            aria-label="xxxxx"
            onClick={() => pageHandler(page + 1)}
            className={page < products.length / 10 ? "" : "pagination__disable"}
          >
            ➡️
          </span>
        </div>
      )}
    </div>
  );
};

export default Products;
