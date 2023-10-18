import { useEffect, useState } from "react"
import { default as api } from "../api"
import Cookies from "js-cookie"

export function TransactionSaleItem({data}){
  const [showProducts, setShowProducts] = useState(false)

  function toggleShowProducts() {
    setShowProducts(!showProducts)
  }
  return (<div className="border border-gray-400 rounded-[2px]">
    {`${data.id} `}
      <span className="text-xl font-bold cols">
        {`${new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(data.totalPrice)} `}
      </span>
      {`Created at ${data.transactionDate} by cashier ${data.User.name}`}
      <br/>
      <button onClick={toggleShowProducts}>
        {`${showProducts ? "Hide" : "Show"} Bought Products`}
      </button>
      { showProducts
        ?
        <>
          <hr/>
          <div>
            {data.TransactionItems.map((item) => (
              <ProductSaleInTransaction data={item} key={item}/>
            ))}
          </div> 
        </>
        : <></>
      }
  </div>)
}

export function ProductSaleInTransaction({data}){
  return(<div className="border border-gray-400 rounded-[2px]">
    {`${data.product.name} `}
    <span className="text-lg font-bold cols">
      {new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(data.product.price)}
    </span>
    <div >
    {`Amount : ${data.quantity}`}
    </div>
  </div>)
}
/*
export function ProductSale({data}){
  return(<div>
    {`${data.name} `}
    <span className="text-xl font-bold cols">
      {new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(data.price)}
    </span>
    <div>
      // Bisa diadd ke query di backendnya sih, tapi males OMEGALUL
    {`Total Sold: ${
      data.TransactionItemData.reduce((accum, transactionItem) => {
        return accum + transactionItem.quantity
      }, 0)
    }`}
    </div>
  </div>)
}
*/

export default function SalesMenu(){
  const [transactions, setTransactions] = useState([])
  //const [products, setProducts] = useState([])
  //const [currentPage, setCurrentPage] = useState(1)
  //const [itemsPerPage] = useState(10)
  //const [cashiers, setCashiers] = useState([]) // Gunakan backend querying
  
  useEffect(() => {
    api
      .get(
        "/transaction/all",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          }
        }
      ).then((res) => {
        // Cukup ambil data yang sudah disortir di sisi backendnya
        setTransactions(res.data.data)
      })
      .catch((err) => {
        window.alert("Failed to get transaction data");
        console.log(err)
      })
  }, [])



  return (<>
  <section>
    Sales Report
    <hr/>
    <div className="grid gap-1.5 sm:grid-cols-2">
      {transactions.map((item) => (
        <TransactionSaleItem data={item} key={item.id}/>
      ))}
    </div>
  </section>
  </>)
}