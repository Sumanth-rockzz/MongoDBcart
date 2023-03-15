const Expense=require('../models/expense');


//ADD expense 

exports.addExpense=async (req,res,next)=>{

    try{
    const date=req.body.date;
    const amount=req.body.amount;
    const reason=req.body.reason;
    const category=req.body.category;
   const data= await Expense.create({
        date:date,
        amount:amount,
        reason:reason,
        category:category
    })
    res.status(200).json({userexpense:data})
}
catch(err){
    console.log(err);
    res.status(404).json({error:err})
}   
}

//get Expenses

exports.getExpenses=async(req,res,next)=>{
    try{
        const expenses = await Expense.findAll();
           res.status(200).json({AllExpenses:expenses })
       }
       catch(err){
           console.log('Get Expenses is failing',err);
           res.status(404).json({
               error:err
           });
       }
   
}

//delete expense

exports.deleteExpense=async(req,res,next)=>{
    try{
        const Expenseid=req.params.id;
        console.log(Expenseid);
        await Expense.destroy({where:{id:Expenseid}});
        res.sendStatus(200);
    }
    catch(err){
        console.log("error at delete");
        res.status(404).json({error:err})
    }
}

//edit Expenses

exports.editExpense =async(req,res,next)=>{
    try{
        const Expenseid=req.params.id;
        console.log(Expenseid);
        await Expense.destroy({where:{id:Expenseid}});
        res.sendStatus(200);
    }
    catch(err){
        console.log("error at edit");
        res.status(404).json({error:err})
        
    }
}


/* app.put('/expense/update-expense/:id', async (req, res, next) => {
    try {
      const expenseId = req.params.id;
      const updatedDate = req.body.date;
      const updatedAmount = req.body.amount;
      const updatedReason = req.body.reason;
      const updatedCategory = req.body.category;
  
      const expense = await Expense.findByPk(expenseId);
  
      expense.date = updatedDate;
      expense.amount = updatedAmount;
      expense.reason = updatedReason;
      expense.category = updatedCategory;
      await expense.save();
  
      res.status(200).json({ updatedexpense: expense });
    } catch (err) {
      console.log('Error at update expense', err);
      res.status(404).json({ error: err });
    }
  }); */