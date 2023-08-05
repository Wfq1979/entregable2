class ProductManager {
  constructor(path) {
      if (fs.existsSync(path)) {
          this.path = path
      } else {
          fs.promises.writeFile(path, JSON.stringify([]))
      }
  }

  getProducts = async () => await fs.promises.readFile(this.path, "utf-8")

  addProduct = async ({title, description, price, thumbnail, code, stock}) => {

      try {

          if (!(title && description && price && thumbnail && code && stock)) return console.log("Tienes que completar todos los campos")

          let array = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))

          if (array.filter(p => p.code === code)[0]) return console.log("Ya existe un producto con ese código")

          array.push({
              title,
              description,
              price,
              thumbnail,
              code,
              stock,
              id: array.length
          })

          await fs.promises.writeFile(this.path, JSON.stringify(array))
          console.log("Producto añadido correctamente")

      } catch (err){
          console.log(err)
      }

  }

  getProductById = async (pid) => {
      try {

          let array = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))

          let product = array.filter(p => p.id === pid)

          if (!product[0]) return "No existe ningún producto con ese número de id"

          return product[0]

      } catch (err) {
          console.log(err)
      }
  }

  updateProduct = async ({pid, title, description, price, code, stock, thumbnail}) => {

      try {

          let array = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))

          let product = array.filter(p => p.id === pid)

          if (!product[0]) return console.log("No existe ningún producto con ese número de id")

          if (array.filter(p => p.code === code)[0]) return console.log("Ya existe un producto con ese código")

          let updatedProduct = {
              title: title ?? product[0].title,
              description: description ?? product[0].description,
              price: price ?? product[0].price,
              code: code ?? product[0].code,
              stock: stock ?? product[0].stock,
              thumbnail: thumbnail ?? product[0].thumbnail,
              id: product[0].id