import { Request, Response } from "express";
import transactionService from "../services/transaction.service";


// transaction id still vulnerable to IDOR, 
// Need to fix group members table first
const addTransaction = async (req: Request, res: Response) => {
  const { payment_of, amount, benefactor, group } = req.body.formData;
  const spender = res.locals.user
  const group_data = await transactionService.addTransaction({
    spender,
    payment_of,
    amount,
    benefactor,
    group,
  });
  res.status(200).send({
    success: true,
    group_data,
    message: "Transaction created successfully",
  });
};

const getTransaction = async (req: Request, res: Response) => {
  const groupId: number = Number(req.params.id);
  const transaction_data = await transactionService.getTransaction(groupId);
  res.status(200).send({
    success: true,
    transaction_data,
    message: "Transaction fetched successfully",
  });
};

export default {
  addTransaction,
  getTransaction,
};
