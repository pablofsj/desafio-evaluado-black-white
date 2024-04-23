import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import Jimp from "jimp";
import { v4 as uuidv4 } from "uuid";

const app = express();

// ruta absoluta
const __dirname = import.meta.dirname;

// middleware archivos estáticos
app.use(express.static("public"));
app.use(
  "/assets/css",
  express.static(__dirname + "/node_modules/bootstrap/dist/css")
);
app.use(
  "/assets/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("home", { title: "Conversor de imagenes a blanco y negro" });
});

app.get("/image", async (req, res) => {

  try {
    const urlImage = req.query.urlImage;
    const image = await Jimp.read(urlImage);
    const buffer = await image
      .resize(350, Jimp.AUTO)
      .grayscale()
      .getBufferAsync(Jimp.MIME_JPEG);

    const dirnameImg = __dirname + `/public/assets/img/image-${uuidv4()}.jpeg`;
    await image.writeAsync(dirnameImg);
    res.set("Content-Type", "image/jpeg");
    return res.send(buffer);

  } catch (error) {
    const msgError = `Error en la solicitud de tipo: ${error.message}`;
    console.error(error);
    return res.status(500).send(msgError);
  }
});

app.get('*', (_, res) => {
    return res.status(404).render('404', { title: "Página no encontrada" })
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
