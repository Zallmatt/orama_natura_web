import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ProductCardHome from "../../components/Home/ProductCardHome";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await api.get("/products");
        setProducts(resProducts.data);

        const resCategories = await api.get("/categories");
        setCategorias(resCategories.data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products
    .filter((p) =>
      selectedCategory
        ? p.categories?.name === selectedCategory
        : true
    )
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const finalPriceA = a.price * (1 - a.discount / 100);
      const finalPriceB = b.price * (1 - b.discount / 100);

      if (sortOrder === "priceAsc") {
        return finalPriceA - finalPriceB;
      }
      if (sortOrder === "priceDesc") {
        return finalPriceB - finalPriceA;
      }
      if (sortOrder === "discountAsc") {
        return a.discount - b.discount;
      }
      if (sortOrder === "discountDesc") {
        return b.discount - a.discount;
      }
      if (sortOrder === "nameAsc") {
        return a.name.localeCompare(b.name);
      }
      if (sortOrder === "nameDesc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  return (
    <div className="products-page">
      <h2>Todos los Productos</h2>
      <p className="products-subtitle">
        {filteredProducts.length} productos encontrados
      </p>

      <div className="filters">
        <button
          onClick={() => setSelectedCategory(null)}
          className={!selectedCategory ? "active" : ""}
        >
          Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={selectedCategory === cat.name ? "active" : ""}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="search-sort">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Ordenar por</option>
          <option value="priceAsc">Precio final: menor a mayor</option>
          <option value="priceDesc">Precio final: mayor a menor</option>
          <option value="discountAsc">Descuento: menor a mayor</option>
          <option value="discountDesc">Descuento: mayor a menor</option>
          <option value="nameAsc">Nombre: A-Z</option>
          <option value="nameDesc">Nombre: Z-A</option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCardHome key={product.id} product={product} />
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            No se encontraron productos.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
