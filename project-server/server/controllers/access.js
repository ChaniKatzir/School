const db = require('../models')
const teachers=db.teachers

exports.login=async(req, res) => {
    let a=await(teachers.findOne({where:{id:req.params.id}}));
    if (!req.params.id|| !req.params.password) 
        return res.status(400).json({ message: 'יש למלא את כל השדות'}) 
    else if(a==null)
        return res.status(400).json({message:'מספר זהות זה אינו מוכר במערכת. אנא נסה שנית'})
    else if(a&&!(req.params.password==a.password)) 
        return res.status(400).json({ message: 'סיסמא שגויה. אנא נסה שנית'})
    else if(a.admin=='1')
        return res.status(201).send('1')
    else
        return res.status(201).send('0')
}