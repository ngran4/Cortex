const Habit = require('../models/habit');
const Profile = require('../models/profile');

module.exports = {
    index,
    new: newHabit,
    create,
    show,
    delete: deleteHabit,
    edit: editHabit,
    update: updateHabit
}

// -------------- HOME -------------- //
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

// -------------- ADD HABIT -------------- //
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

// -------------- DELETE HABIT -------------- //
async function deleteHabit(req, res){

    try {
        const habit = await Habit.findByIdAndRemove(req.params.id);
        res.redirect('/habits');

    } catch(err) {
        res.send(err)
    }
}

// -------------- VIEW HABIT -------------- //
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

// -------------- EDIT/UPDATE -------------- //
async function editHabit(req, res){

    try {
        const habitDoc = await Habit.findById(req.params.id, req.body)
        res.render('habits/edit', {
            habit: habitDoc
        })

    } catch(err){
        res.send(err);
    }
};

async function updateHabit(req, res){
    
    try {
        const habitDoc = await Habit.findByIdAndUpdate(req.params.id, req.body)

        res.redirect(`/habits/${habitDoc._id}`)

    } catch(err){
        res.send(err)
    }
}


// -------------- STREAK -------------- //
function updateStreak() {
    const completeHabit = new Habit();
    const complete = completeHabit.complete;
    
    for (let i=0; complete.length; i++) {

    }
}


// loop through, count true
// habitlog array -- set to empty array?

// fin dmost recent, count back # trues

// method = put
// id, streak, habit
// { habit: {
//    streak: JSON.stringify(streak),
//    habit_title: title }
