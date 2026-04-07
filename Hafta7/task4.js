
const ogrenci = {
  isim: "Caner",
  yas: 21,
  bolum: "Yazılım Mühendisliği",
  notlar: [70, 85, 60, 90]
};

function hesaplaOrtalama(ogrenciNesnesi) {
  let toplam = 0;
  ogrenciNesnesi.notlar.forEach(not => toplam += not);
  return toplam / ogrenciNesnesi.notlar.length;
}

function ogrenciRaporu(ogrenciNesnesi) {
  const ort = hesaplaOrtalama(ogrenciNesnesi);
  const durum = ort >= 60 ? "Geçti" : "Kaldı";

  let rapor = `Ad: ${ogrenciNesnesi.isim} | Bölüm: ${ogrenciNesnesi.bolum} | Ortalama: ${ort.toFixed(2)} | Durum: ${durum}`;

  if (ogrenciNesnesi.ogrenciNo) {
    rapor = `No: ${ogrenciNesnesi.ogrenciNo} | ` + rapor;
  }

  console.log(rapor);
}

ogrenciRaporu(ogrenci);

ogrenci.ogrenciNo = "2024105";

ogrenciRaporu(ogrenci);