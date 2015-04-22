# dodofarm
Genetic dodecaphonic composer

## notes
    ascii_phrase_notes('maxim_kondel_1337')

####all 88 chars that represent A0-C8 MIDI notes:
```javascript
ascii_phrase_midi('`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./?><MNBVCXZASDFGHJKLPOIUYTREWQ{}|:~@^*()_+')
```

### how notes relate to sound
#### [math of note frequency](http://www.intmath.com/trigonometric-graphs/music.php).
    note(0) = A4
    f=(440)*(2)^(note/12)

#### [wikipedia on piano notes](http://en.wikipedia.org/wiki/Piano_key_frequencies).
    note(49) = 440Hz (A4)
    note = 12 * log2(freq/440Hz) + 49
    freq = [{2^(1/12)}^(note-49)] * 440Hz
    min: 21=A0, max: 108=C8 , count: 88

## how to grade musical phrases
### representing notes
- bifurcated twelwe space
- archimedes spiral with 12 steps

Bifurcated Cookie|Pitch star
:-:|:-:
[![Bifurcated Cookie](dodofarm/img/bifurcated-cookie.jpg)](http://en.wikipedia.org/wiki/File:Diletsky_circle.jpg)  |  [![Pitch star](http://upload.wikimedia.org/wikipedia/commons/6/6f/Pitch_class_space_star.svg)](http://upload.wikimedia.org/wikipedia/commons/3/33/Circle_of_fifths_deluxe_4.svg)

## GATTACA
#### how to encode/decode ACGT as 12 notes