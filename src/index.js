//Aula 1 node e package j-son 27.02.2023
// console.log("O app foi iniciado")
// console.log(process.argv[2])
//Aula node e package j-son 27.02.2023 - Par ou impar ex. 3

console.log("Jogo par ou ímpar")
console.log("\nEscolha par ou ímpar e digite um número")

const parImpar = process.argv[2]
const numero = Number(process.argv[3])

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  
const numeroAleatorio = getRndInteger(0, 10)
const soma = numero + numeroAleatorio


if (soma%2 === 0 && parImpar=== "par") {
   console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${soma}. Você ganhou!`)

} else if  (soma %2 === 0 && (parImpar=== "impar" || parImpar=== "ímpar" )) { 

    console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${soma}. Você perdeu!`)

} else if  (soma %2 !== 0 && (parImpar=== "impar" || parImpar=== "ímpar" ))  {
    console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${soma}. Você ganhou!!!`)

} else{
    console.log(`Você escolheu par e o computador escolheu ímpar. O resultado foi ${soma}. Você perdeu!`)

}

//Aula 2 typescript I
