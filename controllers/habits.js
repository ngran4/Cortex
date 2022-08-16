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

        const streak = updateStreak(habitDoc)
        console.log(streak, 'this is the streak')
        
        res.render('habits/show', {
            habit: habitDoc,
            
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
function diffInDays(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
};

function updateStreak(habit) {
    let length = habit.habitLog.length
    const sortedDesc = habit.habitLog.sort(
        (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt),
    );
    console.log(sortedDesc, 'sortedDesc fn')

    let today = new Date().toLocaleDateString();
    let streak = 0;
    if (today = sortedDesc[0].createdAt) {
        streak = 1;
    }
    console.log(diffInDays(today, sortedDesc[0].createdAt));
    if (today == sortedDesc[0].createdAt || diffInDays(today, sortedDesc[0].createdAt == 1)) {
          for (let i = 0; i < length; i++) {
            if(i== length - 1){
                return streak
            }
          let diff = diffInDays(sortedDesc[i].createdAt, sortedDesc[i + 1].createdAt);
          console.log(diff, 'this is the diff')
        }}
        //   if (diff == 1) {
        //     streak += 1
        //   } else if (diff > 1) {
        //     return streak
        //   }
        // }
        //   return streak
        // } else {
        //   return streak
        // }
};


// loop through, count true
// habitlog array -- set to empty array?

// fin dmost recent, count back # trues

// method = put
// id, streak, habit
// { habit: {
//    streak: JSON.stringify(streak),
//    habit_title: title }
