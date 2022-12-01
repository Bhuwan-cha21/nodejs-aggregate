const factory = require('../factory')
const  features = require('../features')
const Tour = require('../models/tourModel');

exports.createTour = factory.createOne(Tour)
exports.getAll =  features.paginateModel(Tour)
exports.getOne = factory.getOne(Tour)


exports.getTourStats = async (req, res, next) => {
    
    const stats = await Tour.aggregate([
        { 
            $match: { ratingsAverage: { $gte:4.5 } }
        },
        {
            $group: {
                _id: '$difficulty',
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price'},
                minPrice: { $min: '$price'},
                maxPrice: { $max: '$price'}
            }
        },
        {
            $sort: { avgPrice: 1 }
        },

    ])
    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    })
    
}



exports.getTourStats = (async (req, res, next) => {
    
    const stats = await Tour.aggregate([
        { 
            $match: { ratingsAverage: { $gte:4.5 } }
        },
        {
            $group: {
                _id: '$difficulty',
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price'},
                minPrice: { $min: '$price'},
                maxPrice: { $max: '$price'}
            }
        },
        {
            $sort: { avgPrice: 1 }
        },
        
    ])
    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    })
    
})

exports.getMonthlyPlan = async (req, res, next) => {
    
    const year = req.params.year * 1;
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: { $sum: 1 },
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: { month: '$_id' }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: { numTourStarts: -1 }
            }
        ])

        res.status(200).json({
            status: 'success',
            data: {
                plan
            }
        })
    };