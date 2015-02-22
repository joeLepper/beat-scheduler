module.exports = function (ac, ee, opts) {
  var bpm
    , oneMinute = 60
    , playback = false
    , numberOfBeats
    , beatLength
    , lastBeat
    , offset
    , swingPercent
    , rush = false
    , lookahead

  opts = opts || {}
  numberOfBeats = opts.beats || 16
  bpm = opts.bpm || 120
  swingPercent = opts.sinwg || 1 // int from 0 - 1
  lookahead = opts.lookahead || 0.100

  ee.on('schedule-play', play)
  ee.on('schedule-stop', stop)
  ee.on('bpm-change', changeBpm)
  ee.on('swing-change', changeSwing)

  return (
    { play: play
    , stop: stop
    , changeBpm: changeBpm
    , changeSwing: changeSwing
    }
  )

  function play () {
    offset = ac.currentTime
    lastBeat = ac.currentTime - offset
    playback = true
    clock()
  }

  function stop () {
    playback = false
  }
  function changeBpm (_bpm) { bpm = _bpm }

  function changeSwing (_swingPercent) { swingPercent = _swingPercent }

  function clock () {
    beatLength = oneMinute / bpm

    var now = ac.currentTime - offset
      , swingLength = swingPercent * (beatLength / 3)
      , currentSwing = rush ? swingLength : -swingLength
      , swingBeatLength = beatLength + currentSwing

    if (lastBeat + swingBeatLength < now) {
      lastBeat += swingBeatLength
      rush = !rush
    }

    var beatEvt = (
      { now: now
      , beatLength: beatLength
      , lookahead: now + lookahead
      , lastBeat: lastBeat
      , nextBeat: lastBeat + swingBeatLength
      }
    )

    ee.emit('next-tick', [beatEvt])
    if (playback) window.requestAnimationFrame(clock)
  }

}

