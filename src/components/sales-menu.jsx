import { useEffect, useState } from "react"
import { default as api } from "../api"
import Cookies from "js-cookie"

export function TransactionSaleItem({data}){
  return (<div>
    <div className="text-xl font-bold cols">
      {new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(data.totalPrice)}
    </div>
    <div>
      Created at {data.transactionDate}
      {/*<span>
        by Cashier // Logika untuk Mengambil data user dengan user ID tertentu.
      </span>*/}
    </div>
    <div>
      Bought items:
      {data.transactionItems.map((item) => (
        <ProductSale data={item}/>
      ))}
    </div>
  </div>)
}

export function ProductSale({data}){

}

export default function SalesMenu(){
  const [transactions, setTransactions] = useState([])
  //const [users, setUsers] = useState([]) // Data user mustahil diambil.
  
  useEffect(() => {
    api.
      get(
        "/transaction/all",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          }
        }
      ).then((res) => {
        // Tidak perlu fetch data berulang kali, data produk bisa diambil dari transactionItem karena sudah di eager-load di backendnya
        //const transactionsCopy = res.data.data 
        setTransactions(res.data.data)
        
        
        /* 
        // Masalahnya...
        let productCopy = []
        for (v in transactionsCopy) {
          // polynom
          if (Boolean(productCopy.find((existingItem) => {
            Boolean(v.transactionItems.find((newItem => (newItem.productId === existingItem.id))))
          }))){
            let itemCopy = v.transactionItems.product
            itemCopy.totalSales = 
            productCopy.concat()
          }
        }
        setProducts(productCopy) 
        */
        

      })
      .catch((err) => {
        window.alert("Failed to get transaction data");
        console.log(err)
      })
  }, [])

  return (<>
    {
      transactions.map((item) => (
        <TransactionSaleItem data={item}/>
      ))
    }
  </>)
}