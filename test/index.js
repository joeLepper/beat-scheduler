var test = require('tape')
  , nee = require('nee')
  , Scheduler = require('../')
  , ac = new window.AudioContext()

test('Respond to schedule events', function (t) {
  var ee = nee()
    , scheduler = Scheduler(ac, ee)

  t.plan(1)
  ee.on('next-tick', function (beat) {
    t.equal(beat.lookahead, 0.1, 'default beat.lookahead is 100ms')
    ee.emit('schedule-stop', [])
  } )
  ee.emit('schedule-play', [])
})

test('Respond to methods', function (t) {
  var  ee = nee()
    , scheduler = Scheduler(ac, ee)

  t.plan(1)
  ee.on('next-tick', function (beat) {
    t.equal(beat.lookahead, 0.1, 'default beat.lookahead is 100ms')
    scheduler.stop()
  })
  scheduler.play()
})

test('Change BPM', function (t) {
  var  ee = nee()
    , scheduler = Scheduler(ac, ee)

  t.plan(1)
  ee.on('next-tick', function (beat) {
    t.equal(beat.beatLength, 0.25, 'bpm of 240 has beat.beatLength of 0.25')
    scheduler.stop()
  })
  scheduler.changeBpm(240)
  scheduler.play()
})

// test('Track last beat', function (t) {
//   var ee = nee()
//     , scheduler = Scheduler(ac, ee)
//     , lastBeat

//   t.plan(1)
//   ee.on('next-tick', function (beat) {
//     if (lastBeat !== beat.lastBeat) {
//       if (typeof lastBeat === 'undefined') return lastBeat = beat.lastBeat
//       console.log(lastBeat, beat)
//       t.equal(beat.lastBeat, lastBeat + beat.beatLength, 'new beats should be one beat length away from the last')
//       scheduler.stop()
//     }
//   })
//   scheduler.play()
// })
