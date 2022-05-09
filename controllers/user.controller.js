const UserModel = require('../models/user.model')
const objectID = require('mongoose').Types.ObjectId


module.exports.getAllUser = async (req, res) =>{
    const users = await UserModel.find().select('-password')
    res.status(200).json(users)
}


module.exports.getUserInfo = (req , res)=>{
    console.log(req.params);
    if(!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)
    UserModel.findById(req.params.id , (err, docs) =>{
        if(!err)res.send(docs);
        else console.log('ID unkmown' + err);
    }).select('-password')

}


module.exports.updateUser = async (req,res) =>{
    // if(!objectID.isValid(req.params.id));
    // return res.status(400).send('ID ' + req.params.id)
    if(!objectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)
    
    try {
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
            $set:{
                bio: req.body.bio
            }
          },
          {new: true, upsert: true, setDefaultsOnInsert: true},
        ).then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(500).json({message: err})
    }
};

module.exports.deleteUser = async(req , res) =>{
    if(!objectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)
    
    try {
        await UserModel.remove({_id : req.params.id}).exec()
        res.status(200).json({message: "seccesfully deleted"});
    } catch (error) {
        return res.status(500).json({message: error})
 
    }
}


