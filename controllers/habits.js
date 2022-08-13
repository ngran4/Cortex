const Habit = require('../models/habit');
const Profile = require('../models/profile');

module.exports = {
    index,
}

async function index(req, res) {
    try {
        const habitDoc = await Habit.find({})

        res.render('habits/habits.ejs', {
            habits: habitDoc
        });

    } catch(err){
        res.send(err)
    }
}