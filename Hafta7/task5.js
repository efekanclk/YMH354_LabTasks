

const urunler = [
  { ad: "Laptop", fiyat: 15000, adet: 1 },
  { ad: "Mouse", fiyat: 250, adet: 2 },
  { ad: "Klavye", fiyat: 450, adet: 1 },
  { ad: "Monitor", fiyat: 8500, adet: 2 },
];


function toplamHesapla(urunListesi) {
  let t = 0;
  for (const urun of urunListesi) {
    t += urun.fiyat * urun.adet;
  }
  return t;
}

function enPahaliBul(urunListesi) {
  let enPahali = urunListesi[0];
  for (const urun of urunListesi) {
    if (urun.fiyat > enPahali.fiyat) {
      enPahali = urun;
    }
  }
  return enPahali;
}

function indirimUygula(urunListesi, oran) {
  const t = toplamHesapla(urunListesi);
  if (t > 30000) {
    return t - t * oran;
  }
  return t;
}

function sepetiYazdir(urunListesi) {
  console.log("=== ALIŞVERİŞ SEPETİ ===");
  for (const urun of urunListesi) {
    console.log(`${urun.ad.padEnd(8)} x${urun.adet} → ${urun.fiyat * urun.adet} TL`);
  }
  console.log("------------------------");

  const toplam = toplamHesapla(urunListesi);
  console.log(`Toplam: ${toplam} TL`);

  if (toplam > 30000) {
    const oran = 0.1;
    const indirimMiktari = toplam * oran;
    const odeme = toplam - indirimMiktari;
    console.log(`İndirim (%${oran * 100}): -${indirimMiktari} TL`);
    console.log(`Ödenecek: ${odeme} TL`);
  } else {
    console.log(`Ödenecek: ${toplam} TL`);
  }
}

sepetiYazdir(urunler);
console.log("En pahalı ürün:", enPahaliBul(urunler).ad);

