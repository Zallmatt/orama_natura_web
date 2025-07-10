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
  const [fragrances, setFragrances] = useState([]);
  const [promotionsData, setPromotionsData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProducts, resCategories, resFragrances, resPromotions] =
          await Promise.all([
            api.get("/products"),
            api.get("/categories"),
            api.get("/fragrances"),
            api.get("/promotions"),
          ]);

        setProducts(resProducts.data);
        setCategorias(resCategories.data);
        setFragrances(resFragrances.data);
        setPromotionsData(resPromotions.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products
    .filter((p) =>
      selectedCategory ? p.categories?.name === selectedCategory : true
    )
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((p) => {
      const finalPrice = p.price * (1 - p.discount / 100);
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    })
    .sort((a, b) => {
      const finalPriceA = a.price * (1 - a.discount / 100);
      const finalPriceB = b.price * (1 - b.discount / 100);

      if (sortOrder === "priceAsc") return finalPriceA - finalPriceB;
      if (sortOrder === "priceDesc") return finalPriceB - finalPriceA;
      if (sortOrder === "discountAsc") return a.discount - b.discount;
      if (sortOrder === "discountDesc") return b.discount - a.discount;
      if (sortOrder === "nameAsc") return a.name.localeCompare(b.name);
      if (sortOrder === "nameDesc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="products-page">
      <aside className="sidebar">
        <h3>Categorías</h3>

        {/* SELECT SOLO EN MOBILE */}
        <select
          className="category-select"
          value={selectedCategory || ""}
          onChange={(e) =>
            setSelectedCategory(e.target.value === "" ? null : e.target.value)
          }
        >
          <option value="">Todas</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* BOTONES SOLO EN DESKTOP */}
        <div className="category-buttons">
          <button
            onClick={() => setSelectedCategory(null)}
            className={!selectedCategory ? "active" : ""}
          >
            Todas
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

        <div className="price-range">
          <label>Precio máximo: ${priceRange[1].toLocaleString("es-ES")}</label>
          <input
            type="range"
            min="0"
            max="100000"
            step="500"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, e.target.value)}
          />
        </div>
      </aside>

      <main className="products-content">
        <div className="breadcrumb">
          <span>Inicio</span> &gt; <span>Productos</span>
          {selectedCategory && (
            <>
              {" "}
              &gt; <span>{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="products-header">
          <div>
            <h2>
              {selectedCategory
                ? `${selectedCategory}`
                : "Todos los Productos"}
            </h2>
            <p>{filteredProducts.length} producto{filteredProducts.length !== 1 && "s"} encontrado{filteredProducts.length !== 1 && "s"}</p>
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
              <option value="priceAsc">Precio: menor a mayor</option>
              <option value="priceDesc">Precio: mayor a menor</option>
              <option value="discountDesc">Mayor descuento</option>
              <option value="nameAsc">Nombre: A-Z</option>
              <option value="nameDesc">Nombre: Z-A</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCardHome
                key={product.id}
                product={product}
                fragrances={fragrances}
                promotions={promotionsData}
              />
            ))
          ) : (
            <p className="no-products">No se encontraron productos.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
