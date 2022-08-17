const Habit = require('../models/habit');

module.exports = {
    create
};

async function create(req, res){
    console.log(req.body, '<- form contents')
    console.log(req.params.id, '<- habit id')

    req.body.complete = !!req.body.complete; // forces the value to a boolean

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

// -------------- STREAK -------------- //

// Event listener on submit log?
function diffInHours(date1, date2){
    // Once log is submitted, set date & store in variable
    let startDate = new Date(date1);
    // compare submission date to start date
    let timeElapsed = new Date(date2) - startDate;
    // convert to hours 
    let timeElapsedToHr = timeElapsed / 1000 * 60 * 60;

    return timeElapsedToHr;

}


function logStreak(){
    // order dates starting from most recent
    sortDateDesc = habit.habitLog.sort((a, b) => b.date - a.date);

    let today = new Date();
    let diff = diffInHours(today, sortedDesc[0]);
    let streakCount = 0;

    // if more than 48 reset streak 
    // if less than 24 hr dont add streak
    // otherwise add to streak
    if (diff > 48) {
        streakCount = 0
    } else if(diff < 24){
        streakCount = streakCount
    } else{
        streakCount += 1
    }


    // if (diff < 48 && diff > 24){
    //     streakCount += 1
    // } else if (diff < 24) {
    //     streakCount = streakCount
    // } else{
    //     streakCount = 0
    // }

}
