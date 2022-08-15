const Habit = require('../models/habit');
const Profile = require('../models/profile');

module.exports = {
    index,
    new: newHabit,
    create,
    show
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
};

function newHabit(req, res) {
    res.render('habits/new.ejs')
    console.log(newHabit, '<- new Habit')
};

async function create(req, res) {
    console.log(req.body)

    try {

    const habitDocCreated = await Habit.create(req.body)
    console.log(habitDocCreated, 'habit doc created in db')
    res.redirect('/habits')
    // res.redirect(`habits/${habitDocCreated._id}`)
    
    } catch(err){
        res.send(err)
    }
}

async function show(req, res){
    console.log(req.params.id, 'req.params.id')

    try {
        const habitDoc = await Habit.findById(req.params.id)
        console.log(habitDoc, '<- habitDoc')
        res.render('habits/show', {
            habit: habitDoc
        })

    } catch(err){
        res.send(err)
    }
}