const Habit = require('../models/habit');

module.exports = {
    create
};

async function create(req, res){
  console.log(req.body, '<- form contents')
  console.log(req.params.id, '<- habit id')

  // req.body.complete = !!req.body.complete; // forces the value to a boolean

  try {
    const habitDoc = await Habit.findOne({ _id: req.params.id, user: req.user._id }) // Only retrieve the habit if it belongs to the currently logged in user
    console.log(habitDoc, '<- habitDoc')

    let streak = logStreak(habitDoc.streak, habitDoc);
    habitDoc.streak = streak;

    habitDoc.habitLog.push(req.body);
    habitDoc.save(function(err){
      res.redirect(`/habits/${req.params.id}`)
    })

  } catch(err){
    res.send(err)
  }
};

// -------------- STREAK -------------- //

function diffInHours(date2, date1){
  console.log(date1, date2, 'these are the dates')
  // Once log is submitted, set date & store in variable
  let startDate = new Date(date1);
  console.log(startDate, 'start date')
  // compare submission date to start date
  let timeElapsed = new Date(date2) - startDate;
  console.log(timeElapsed, 'time elapsed')
  // convert to hours 
  let conversion = 1000 * 60 * 60;
  let timeElapsedToHr = timeElapsed / conversion;

  return timeElapsedToHr;
}


function logStreak(streakCount, habit) {
  // order dates starting from most recent
  sortDateDesc = habit.habitLog.sort((a, b) => b.date - a.date);

  // check if habitLog array is empty
  if (sortDateDesc.length === 0) {
    return 0; // return a streak count of 0
  }

  let today = new Date();
  let diff = diffInHours(today, sortDateDesc[0].date);

  // if more than 48 reset streak
  // if less than 24 hr dont add streak
  // otherwise add to streak
  if (diff > 48) {
    return 0; // reset streak
  } else if (diff < 24) {
    return streakCount;
  } else {
    return streakCount + 1;
  }
}

// wait, [0] will always be the same........