exports.paginateModel = (Model) => async (req ,res,next) =>{
    const { page , limit , sort} = req.query
    let pipeline  = []
    if(sort){
         pipeline.push({$sort :{ sort : 1 }})
    }
        
    var doc = await Model.aggregate(pipeline)
    res.status(201).json({
        status: 'success',
        data: {
            doc
        }
    })
}


