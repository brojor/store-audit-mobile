db.getCollection('kategoryNames').aggregate([
    {
        $lookup:
        {
            from: "staticInfo",
            localField: "_id",
            foreignField: "kategory",
            as: "categoryPoints"
        }
    },
    {$unwind: "$categoryPoints"},
    {
        $project: {
            _id: 0, name: "$kategoryName", id: "$_id", "categoryPoints.name": "$categoryPoints.title", "categoryPoints.weight": 1, "categoryPoints.id": "$categoryPoints.kategoryPoint"
        }
    }
])