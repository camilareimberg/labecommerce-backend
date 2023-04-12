import { users, products, purchases, createUser, createProduct, getAllProduct, getProductById, getProductByName, createPurchase, getPurchaseByUserId } from "./database";
import { CATEGORY, product, purchase, user } from "./types";
import  express, { Request, Response} from 'express';
import cors from 'cors';
import { unsubscribe } from "diagnostics_channel";

//método use faz as transformações do arquivo json
const app = express()
app.use(express.json())
app.use(cors())
//listen indica onde o servidor rodará
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
  });

//Feedback APIs e Express - 14.03 ex. 2 - get all users - método get - rota users e repsosta é o array de usuários
app.get('/users', (req: Request, res: Response)=> {
    res.send(users)
})

//Feedback APIs e Express - 14.03 ex. 2 - get all products - método get - rota products e repsosta é o array de produtos
app.get('/products', (req: Request, res: Response)=> {
    res.send(products)
})

app.get('/purchases', (req: Request, res: Response)=> {
    res.send(purchases)
})


//Feedback APIs e Express - 14.03 ex. 2 - Search Product by name req e res é o handler da função
app.get('/products/search',(req: Request, res: Response)=> {
    const q = req.query.q as string
    //faz um filtro de produtos e cada elemento chamou de produto. Se a pessoa de fato madnou uma query, se o q é true então mostra todos os produtos q o nome inclui o q, se não, retorna o produto
    const filterProducts: product[] = products.filter((product)=>{
        if(q) {
                    return product.name.toLowerCase().includes(q.toLowerCase())
        }
        return product
    })
    res.status(200).send(filterProducts)
})

//Feedback APIs e Express - 14.03 ex. 3 criar novo produto, usuário e compra
app.post('/users', (req: Request, res: Response)=> {
    const body = req.body
    const{id, email, password} = body
    //cria o objeto com as infos que estamos recebendo do body
    const newUser: user = {
        id,
        email,
        password
    }
    users.push(newUser)
    res.status(201).send("Cadastro realizado com sucesso")
})

//criando novo produto
app.post('/products', (req: Request, res: Response)=> {
    const body = req.body
    const{id, name, price, category} = body
    //cria o objeto com as infos que estamos recebendo do body
    const newProduct: product = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")
})

//criando nova compra
app.post('/purchases', (req: Request, res: Response)=> {
    const body = req.body
    const{userId, productId, quantity, totalPrice} = body
    //cria o objeto com as infos que estamos recebendo do body
    const newPurchase: purchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso")
})


//Aprofundamento Express - 16.03 ex. 01 Get Products by id
app.get('/products/:id',(req: Request, res: Response)=> {
    const id = req.params.id 
    const filterProductsById = products.find((productsId)=> {
        return productsId.id ===id
    })
    res.status(200).send(filterProductsById)
})



//Aprofundamento Express - 16.03 ex. 01 Get User Purchases by User id
app.get('/users/:id/purchases',(req: Request, res: Response)=> {
    const userId = req.params.id 
    const filterPurchaseById = purchases.find((purchasesId)=> purchasesId.userId === userId);
       if (filterPurchaseById) {
        res.status(200).send("Usuário encontrado!")
    }
    res.status(404).send("Usuário não existe!");
})


//Aprofundamento Express - 16.03 ex. 02 Delete User by id
app.delete('/users/:id', (req: Request, res: Response)=> {
    const id= req.params.id
    //o findIndex passa pelo array procurando. Quando achar, retorna o índice do elemento e nos retorna o índice desse elemento. Se não achar nada retorna -1. O find retorna o elemento, o findIndex retorna o índice do elemento
    const indexToRemove = users.findIndex((account)=> {
        return account.id ===id
    })
    if(indexToRemove>=0){
        //splice tem 2 parâmetros. O primeiro é o indice e o outros quantos itens quer q remova
        users.splice(indexToRemove,1)
    }
    res.status(200).send("Conta deletada com sucesso")
})


//Aprofundamento Express - 16.03 ex. 02 Delete product by id
app.delete('/products/:id', (req: Request, res: Response)=> {
    const id= req.params.id
    const indexToRemove = products.findIndex((account)=> {
        return account.id ===id
    })
    if(indexToRemove>=0){
        products.splice(indexToRemove,1)
    }
    res.status(200).send("Produto deletado com sucesso")
})

//Aprofundamento Express - 16.03 ex. 03 Edit User by id
app.put('/users/:id', (req: Request, res: Response)=> {
    const id = req.params.id
     const newId = req.body.id as string| undefined
     const newEmail= req.body.email as string| undefined
     const newPassword= req.body.password as string| undefined

     const newUser= users.find((newUser)=> {
    return newUser.id === id
})
if(newUser) {
    newUser.id = newId || newUser.id 
    newUser.email = newEmail || newUser.email
    newUser.password = newPassword || newUser.password

}
res.status(200).send("Usuário cadastrado com sucesso")
})

//Aprofundamento Express - 16.03 ex. 03 Edit Product by id

app.put('/products/:id', (req: Request, res: Response)=> {
    const id = req.params.id
     const newId = req.body.id as string| undefined
     const newName= req.body.name as string| undefined
     const newPrice= req.body.price as number| undefined
     const newCategory= req.body.category as CATEGORY| undefined

const productToUpdate = products.find((product)=> {
    return product.id === id
})
if(productToUpdate) {
    productToUpdate.id = newId || productToUpdate.id 
    productToUpdate.name = newName || productToUpdate.name
   productToUpdate.price = isNaN(newPrice) ? productToUpdate.price: newPrice
    productToUpdate.category = newCategory || productToUpdate.category


}
res.status(200).send("Produto cadastrado com sucesso")
})


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