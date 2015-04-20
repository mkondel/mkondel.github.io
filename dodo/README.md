# dodofarm
Genetic dodecaphonic composer

## representing notes
 * biforcated twelwe space
 * archimedes spiral with 12 steps

### how notes relate to sound 
#### [math of note frequency](http://www.intmath.com/trigonometric-graphs/music.php).
- `note(0) = A4`
- `note = 12 * log2(freq/440Hz) + 49`
- `freq = [{2^(1/12)}^(note-49)] * 440Hz`

#### [wikipedia on piano notes](http://en.wikipedia.org/wiki/Piano_key_frequencies).
- `f=(440)*(2)^(note/12)`
