const PDFDocument = require("pdfkit");
const fs = require("fs");

const doc = new PDFDocument({ size: "A4", margin: 50 });
doc.pipe(fs.createWriteStream("funciones.pdf"));

// Colores
const C = {
  azul: "#2E5FA3",
  verde: "#3A7D44",
  naranja: "#C25A00",
  gris: "#555555",
  grisOscuro: "#333333",
};

// Helpers
function title(text, color = C.grisOscuro, size = 22) {
  doc.fillColor(color).fontSize(size).text(text, {
    align: "center",
  });
  doc.moveDown();
}

function subtitle(text, color) {
  doc.fillColor(color).fontSize(16).text(text, {
    align: "center",
  });
  doc.moveDown();
}

function paragraph(text) {
  doc
    .fillColor(C.grisOscuro)
    .fontSize(12)
    .text(text, {
      align: "justify",
    });
  doc.moveDown();
}

function formula(text, color) {
  doc
    .rect(50, doc.y, 495, 30)
    .fillAndStroke("#F2F2F2", color);

  doc
    .fillColor(color)
    .fontSize(14)
    .text(text, 55, doc.y - 22, {
      align: "center",
    });

  doc.moveDown(2);
}

function image(path, caption) {
  try {
    doc.image(path, {
      fit: [400, 250],
      align: "center",
    });
    doc.moveDown(0.5);

    doc
      .fillColor(C.gris)
      .fontSize(10)
      .text(caption, {
        align: "center",
        italic: true,
      });

    doc.moveDown();
  } catch (e) {
    doc
      .fillColor("red")
      .text("Imagen no encontrada: " + path, { align: "center" });
    doc.moveDown();
  }
}

function pageBreak() {
  doc.addPage();
}

/* =========================
   PORTADA
========================= */
title("Funciones", C.azul, 30);
subtitle("Constante, Lineal y Afín", C.gris);
subtitle("Guía Didáctica Completa", C.gris);

pageBreak();

/* =========================
   FUNCION CONSTANTE
========================= */
title("1. Función Constante", C.azul, 22);

paragraph(
  "Una función constante es aquella cuyo valor no cambia independientemente de x."
);

formula("f(x) = c", C.azul);

image("./images/chart_constante.png", "Gráfica de función constante");

pageBreak();

/* =========================
   FUNCION LINEAL
========================= */
title("2. Función Lineal", C.verde, 22);

paragraph("Una función lineal pasa siempre por el origen.");

formula("f(x) = mx", C.verde);

image("./images/chart_afin.png", "Gráfica de función lineal");

pageBreak();

/* =========================
   FUNCION AFIN
========================= */
title("3. Función Afín", C.naranja, 22);

paragraph(
  "Una función afín tiene la forma mx + b y generalmente no pasa por el origen."
);

formula("f(x) = mx + b", C.naranja);

image("./images/chart_afin.png", "Gráfica de función afín");

/* =========================
   FINALIZAR
========================= */
doc.end();

const docxConverter = require("docx-pdf");

Packer.toBuffer(doc).then((buffer) => {
  const docxPath = "funciones.docx";
  const pdfPath = "funciones.pdf";

  fs.writeFileSync(docxPath, buffer);

  docxConverter(docxPath, pdfPath, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("PDF generado correctamente:", pdfPath);
    }
  });
});

console.log("PDF generado correctamente: funciones.pdf");