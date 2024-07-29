import { getConnection } from "../database/connection.js";
import sql from 'mssql';

export const getProducts =  async (req, res) => {

  const pool = await getConnection();

  const result = await pool.request().query('SELECT * from products');

  res.status(200).json({
    data: result.recordset
  });
}

export const getProduct =  async(req, res) => {
  const id = req.params.id;

  const pool = await getConnection();

  const result = await pool.request()
  .input('id', sql.Int, id)
  .query('SELECT * FROM products WHERE id = @id');

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({message: "Product not found"});
  }

  return res.json(result.recordset[0]);
};

export const createProduct = async(req, res) => {

  const { name, price, quantity, description, url_image } = req.body;

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("name", sql.VarChar, name)
    .input("price", sql.Decimal, price)
    .input("quantity", sql.Int, quantity)
    .input("description", sql.Text, description)
    .input("url_image", sql.Text, url_image)
    .query(
      "INSERT INTO products (name, price, quantity, description, url_image) VALUES(@name, @price, @quantity, @description, @url_image); SELECT SCOPE_IDENTITY() AS id;"
    );

  const product = {
    id: result.recordset[0].id,
    name,
    price,
    quantity,
    description,
    url_image,
  };

  res.status(201).json({ ok: true, result: product });
}

export const editProduct = async(req, res) => {

  const id = req.params.id;
  const { name, price, quantity, description, url_image } = req.body;

  const pool = await getConnection();

  const result = await pool.request()
  .input("name", sql.VarChar, name)
  .input("price", sql.Decimal, price)
  .input("quantity", sql.Int, quantity)
  .input("description", sql.Text, description)
  .input("url_image", sql.Text, url_image)
  .input("id", sql.Int, id)
  .query('UPDATE products SET name = @name, price = @price, quantity = @quantity, description = @description, url_image = @url_image WHERE id = @id');

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({message: "Product not found"});
  }

  const product = {
    id,
    name,
    price,
    quantity,
    description,
    url_image,
  };

  return res.status(200).json({message: "Product updated", item: product});

}


export const deleteProduct = async (req,res) => {
  const id = req.params.id;

  const pool = await getConnection();

  const result = await pool.request()
  .input("id", sql.Int, id)
  .query("DELETE FROM products WHERE id = @id");

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({message: "Product not found"});
  }


  return res.status(200).json({message: "Product deleted"});

}