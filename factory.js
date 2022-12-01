
exports.createOne = (Model)=> async (req,res,next) =>{
    
    try{
        const doc = await Model.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                doc
            }
        })
    }catch(err){
        console.log(err)
    }
}


exports.getAll = (Model) => async (req,res,next) =>{

    try{
        const doc = await Model.find();
        res.status(201).json({
            status: 'success',
            data: {
                doc
            }
        })
    }catch(err){
        console.log(err)
    }
}
exports.getOne = (Model) => async (req,res,next) =>{

    try{
        const doc = await Model.findById(req.body.id);
        console.log(doc.passwordChangedAt)
        res.status(201).json({
            status: 'success',
            data: {
                doc
            }
        })
    }catch(err){
        console.log(err)
    }
}