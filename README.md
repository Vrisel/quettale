# Quettale

- Quettale, Wordle for Quenya. `quetta` in Quenya means 'word'.
- 퀘냐 **워들**입니다. 이름의 `quetta`는 '단어'를 뜯하는 퀘냐 단어입니다.
  - [원본 워들 해보기](https://www.powerlanguage.co.uk/wordle/)
  - 참고: 위키페디아 [퀘냐](https://ko.wikipedia.org/wiki/%EA%BF%B0%EB%83%90)
- Pronounced like _QUE-TTA-LAY_
- _퀘탈레_ 라고 읽습니다.

## Input letters 글자 입력 방법

- You can type letters with your keyboard or by clicking/touching the buttons.
- 화면상에 표시된 키보드를 클릭/터치하거나, 직접 키보드로 입력할 수 있습니다.
- You can type long vowels with double short vowels.
- 장모음은 같은 모음을 연속으로 입력하면 장모음이 됩니다.
  - ex: aa → á, ee → é, ii → í, oo → ó, uu → ú
- Some consonant clusters will be converted along the Exilic Quenya style.
- 일부 자음(군) 입력 시, 표준 표기법에 맞게 자동으로 변환됩니다.
  - ex: cs → x, cw → qu, k → c, th → s

## Answers 정답 기준

- In [the Exilic Quenya style](#Quenya)
- [퀘냐 표준 표기법](#Quenya)을 따릅니다.
- Only concerned with phonetic transcription, regardless of actual spelling in Tengwar
- 실제 텡과르 표기와는 상관 없이, 후기 퀘냐의 발음만을 고려합니다.
  - ex: I**th**il → I**s**il, **Ng**oldor → **N**oldor, **Ngw**walme → **Nw**alme

## Resources 활용 자료

- Cloned from [cwackerfuss/react-wordle](https://github.com/cwackerfuss/react-wordle)
- Corpus from [Ardalambion](https://folk.uib.no/hnohf)
  - [Quenya Corpus Wordlist](https://folk.uib.no/hnohf/qlist.htm)
  - [Quettaparma Quenyallo](https://folk.uib.no/hnohf/quen-eng.htm)

---

# Quenya

## Vowels 모음

- Basic vowels in Quenya:
- 퀘냐의 기본 모음은 다음과 같습니다.
  - Short vowel(단모음): a, e, i, o, u
  - Long vowel(장모음): á, é, í, ó, ú
  - Diphthong(이중모음): ai, au, eu, iu, oi, ui
- Short vowels and diphthongs can follow each other.
- 단모음과 이중모음은 연달아 올 수 있습니다.
  - ex: M**aia**, Eldal**ie**, **oio**losse 등
- Long vowels don't make a cluster.
- 하지만 장모음은 모음군을 이루지 않습니다.
<!-- - 하지만 장모음 뒤에는 다른 모음이나 자음군이 올 수 없습니다.
  - 일부 digraph (nw, qu, hy, ly, ny, ty, hl, hr)는 엄밀히는 자음군으로 취급되지 않습니다. -->

## Consonants 자음

- Alphabets used for Quenya:
- 퀘냐를 알파벳으로 옮겨쓸 때 쓰이는 자음은 다음과 같습니다.
  - c(=k), f, h, l, m, n, p, r, s, t, v, w
  - ld, mb, mp, nc, nd, ng, nt, nqu(=ncw), qu(=cw), rd, x(=cs)
- J and Z are never used.
- J와 Z는 쓰이지 않습니다.
- B, D, and G are only used in cluster form like mb, nd/ld/rd, and ng.
- B, D, G는 mb, nd/ld/rd, ng 자음군의 형태로만 사용됩니다.
- K is replaced with C.
- K는 C로 대체됩니다.
- `th` sound is replaced with `s` sound in Exilic Quenya, and so does spelling.
- `th` 발음은 후기 퀘냐에서 모두 `s` 발음이 되었습니다.
- At the beginning of a word, single consonants and some digraphs are allowed.
- 어두에는 단자음과 일부 digraph만 올 수 있습니다.
  - 허용 digraph: nw, qu, hy, ly, ny, ty, hl, hr
- In the middle of a word, more clusters are allowed:
- 단어 중간에 추가로 허용되는 자음군은 다음과 같습니다.
  - ly, my, ny, ry, ty
  - hl, hr
  - cc, ll, mm, nn, rr, ss
  - ht, mn, lc, lm, lqu, lt, lv, ps, pt, rc, rm, rn, rqu, sc, st, ts
- At the end of a word, only five consonants are allowed: l, n, r, s, and t.
- 어말에는 오직 다섯가지 자음만 올 수 있습니다: l, n, r, s, t
  - Of course, also vowels are allowed.
  - 물론 모음으로 끝날 수도 있습니다.
  - There is a gramatical exception, `nt`, but it is not used in Quettale.
  - 문법상 예외로 nt로 끝날 수도 있지만, 퀘탈레에서는 쓰이지 않습니다.
