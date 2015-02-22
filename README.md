Beat-scheduler
==============

An event-based audio clock with variable bpm and swing for use in the browser

Install
-------

`npm install beat-scheduler --save`

Basic Use
---------

```javascript
var ac = new window.AudioContext()
  , ee = require('nee')()
  , opts = { bpm: 135, swing: 0.1, lookahead: 0.2, ee: ee }
  , clock = require('beat-scheduler')(ac, opts)

clock.on('next-tick', function (beat) {
  // do something notable...
})

clock.play()
```

Configuration Options
---------------------
- __opts.bpm__ integer - beats per minute
- __opts.swing__ float - a value between 0 and 1 representing the amount of "swing" in the beat
- __opts.lookahead__ float - number of seconds (typically a fraction thereof) to look ahead for not events
- __opts.ee-- event emitter - an event emitter with `on` and `emit` methods for use communicating with the scheduler; beat-scheduler uses nee internally

Methods
-------
- __clock.play()__ start the clock
- __clock.stop()__ stop the clock
- __clock.changeBpm(bpm)__ set the `bpm` to a number
- __clock.changeSwing(swing)__ change the `swing` to a float between 0 and 1
- __clock.on(event, handler)__ register `handler` as a callback when `event` is fired; `handler` will receive a `beat` object

Beat Objects
------------
- __beat.now__ float - audio context time at which the tick was published
- __beat.beatLength__ float - the total length of this beat (adjusted for swing)
- __beat.lookahead__ float - audio context time to look ahead to; users will typically use this to schedule events for the future
- __beat.lastBeat__ float - audio context time at which the previous beat occurred
- __beat.nextBeat__ float - audio context time at which the next beat will occur

Events
------
Beat-scheduler emits only one event type:

1. __next-tick__ events fire on a request animation frame loop, passing a `beat` object

If you hand in an event emitter with `on` and `emit` methods, beat-scheduler can also respond to events:

1. __schedule-play__ will be handled by `clock.play`
2. __schedule.stop__ will be handled by `clock.stop`
3. __bpm-change__ will be handled by `clock.changeBpm`
4. __swing-change__ will be handled by `clock.changeSwing`
