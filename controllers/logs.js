const Habit = require('../models/habit');

module.exports = {
    create
};

async function create(req, res){
    console.log(req.body, '<- form contents')
    console.log(req.params.id, '<- habit id')

    try {
        const habitDoc = await Habit.findById(req.params.id)
        console.log(habitDoc, '<- habitDoc')

        habitDoc.habitLog.push(req.body);
        habitDoc.save(function(err){
            res.redirect(`/habits/${req.params.id}`)
        })

    } catch(err){
        res.send(err)
    }
};

