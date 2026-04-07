
const notlar = [85, 42, 90, 67, 55, 78, 91, 38];

console.log("Toplam not sayısı:", notlar.length);


let toplam = 0;
for (let i = 0; i < notlar.length; i++) {
  toplam += notlar[i];
}
const ortalama = toplam / notlar.length;
console.log("Ortalama:", ortalama);

const gecersizNotlar = notlar.filter(not => not < 60);
console.log("Geçersiz notlar:", gecersizNotlar);

if (ortalama >= 70) {
  console.log("Sınıfın genel durumu: Başarılı");
} else {
  console.log("Sınıfın genel durumu: Geliştirilmeli");
}

