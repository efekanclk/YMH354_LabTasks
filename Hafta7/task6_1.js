
function sayacOlustur(baslangic) {
  let sayac = baslangic;

  function artir() {
    sayac += 1;
    return sayac;
  }

  function sayacSifirla() {
    sayac = baslangic;
    return sayac;
  }

  return { artir, sayacSifirla };
}

const sayac1 = sayacOlustur(0);
const sayac2 = sayacOlustur(10);
console.log(sayac1.artir());
console.log(sayac1.artir());
console.log(sayac1.artir());
console.log(sayac2.artir());
console.log(sayac2.artir());
console.log(sayac1.artir());

console.log(typeof sayacOlustur(0));
console.log(typeof sayacOlustur(0).artir);


console.log(sayac1.sayacSifirla());
console.log(sayac1.artir());


