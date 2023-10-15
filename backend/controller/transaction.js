// const Transaction = require("../models/transaction");

// exports.handleNewTransaction = async (req, res) => {
//   const { products } = req.body;
//   const userId = req.user.id;
//   const transaction = await Transaction.create({
//     userId,
//   });

//   const transactionItems = products.map((product) => {
//     return {
//       transactionId: transaction.id,
//       productId: product.id,
//       quantity: product.quantity,
//       price: product.price,
//     };
//   });

//   await TransactionItem.bulkCreate(transactionItems);

//   res.json({
//     ok: true,
//     data: transaction,
//     message: "Transaction successfully created",
//   });
// };
