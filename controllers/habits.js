const Habit = require('../models/habit');
const Profile = require('../models/profile');

module.exports = {
    index,
    new: newHabit,
    create
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

// async 
function create(req, res) {
    console.log(req.body)

    Habit.create(req.body, function(err, habitDocCreated){
        if(err){
            console.log(err, '<- err in habits create controller')
            // return res.render('/habits/new.ejs')
        }
        console.log(habitDocCreated, '<- habit created in db')
        res.redirect('/habits')
    })

    // try {

    // const habitDocCreated = await Habit.create(req.body)
    // console.log(habitDocCreated, 'habit doc created in db')
    // res.redirect('/habits/habits')
    // // res.redirect(`habits/${habitDocCreated._id}`)
    
    // } catch(err){
    //     res.send(err)
    // }
}