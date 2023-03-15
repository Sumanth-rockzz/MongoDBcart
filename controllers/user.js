const User = require('../models/user');

exports.addUsers=async(req,res,next)=>{
    try{
        if(!req.body.numberinput)
        {
            throw new Error('Phone number is Mandatory');
        }
    const name=req.body.nameinput;
    const email=req.body.emailinput;
    const number=req.body.numberinput;
    const date=req.body.dateinput;
    const time=req.body.timeinput;

    const data= await User.create({
        name:name,
        email:email,
        number:number,
        date:date,
        time:time
    }) 
    res.status(201).json({newuserdetails:data});
    }
    catch(err){
        res.status(404).json({
            error:err
        });
    }

}

exports.getAllUsers=async(req,res,next)=>{

    try{
     const users = await User.findAll();
        res.status(200).json({Allusers:users})
    }
    catch(err){
        console.log('Get user is failing',err);
        res.status(404).json({
            error:err
        });
    }

}

exports.deleteUser=async (req,res,next)=>{
    try{
    const Userid=req.params.id;
   
    if(Userid==='undefined')
    {
        console.log("Id is missing");
      return  res.status(404).json({error:"ID is missing"})
    }
    await User.destroy({where:{id:Userid}})
    res.sendStatus(200);
    }
    catch(err){
        console.log("error at delete",err);
        res.sendStatus(400);
    }

}