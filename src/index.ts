import { users, products, purchases, createUser, createProduct, getAllProduct, getProductById, getProductByName, createPurchase, getPurchaseByUserId } from "./database";
import { CATEGORY } from "./types";

// console.table(products)
// console.log(users)
// console.log(purchases)

function repeat():void{
    console.log("=".repeat(70))
}

createUser("5", "amora@gmail.com", "333")
repeat()
createProduct("8", "Vestido", 79, CATEGORY.CLOTHES_AND_SHOES)
repeat()
createPurchase("4", "7", 1, 1500)
//ex. 2 aula typescript II 
console.table(getAllProduct())
console.table(getProductById("7"))
console.table(getProductByName("Co"))
console.table(getPurchaseByUserId("2"))