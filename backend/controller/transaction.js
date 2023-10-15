const Transaction = require("../models/transaction");
const TransactionItem = require("../models/transactionitem");

exports.handleNewTransaction = async (req, res) => {
  const { products } = req.body;
  const userId = req.user.id;
  const transaction = await Transaction.create({
    userId,
  });

  const transactionItems = products.map((product) => {
    return {
      transactionId: transaction.id,
      productId: product.id,
      quantity: product.quantity,
      price: product.price,
    };
  });

  await TransactionItem.bulkCreate(transactionItems);

  res.json({
    ok: true,
    data: transaction,
    message: "Transaction successfully created",
  });
};

exports.getAllTransaction = async (req, res) => {
  const transactions = await Transaction.findAll({
    include: {
      model: TransactionItem,
      include: "product",
    },
  });

  res.json({
    ok: true,
    data: transactions,
  });
};

exports.getTransactionById = async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findOne({
    where: { id },
    include: {
      model: TransactionItem,
      include: "product",
    },
  });

  if (!transaction) {
    res.status(404).json({
      ok: false,
      message: "Transaction not found",
    });
    return;
  }

  res.json({
    ok: true,
    data: transaction,
  });
};
