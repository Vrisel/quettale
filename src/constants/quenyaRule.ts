export const VOWELS = [
  // single vowel and dipthong
  'a',
  'e',
  'i',
  'o',
  'u',
  'á',
  'é',
  'í',
  'ó',
  'ú',
  'ai',
  'au',
  'eu',
  'iu',
  'oi',
  'ui',
  // combinations
  'aia',
  'ea',
  'eo',
  'ie',
  'io',
  'oa',
  'oe', // exists in corpula but only as 'loëndë'
  'oia',
  'oio',
  'ua',
  'uo', // exist in corpula but only as 'Eruo'
  'uio',
  'úa',
];

export const CONSONANTS = [
  // single tengwa
  't',
  'nd',
  /* 'th', */
  'nt',
  'n',
  'r',
  'p',
  'mb',
  'f',
  'mp',
  'm',
  'v',
  'c', // k
  'ng',
  'h',
  'nc',
  'y',
  'qu', // cw
  'ngw',
  'hw',
  'nqu', // ncw
  'nw',
  'w',
  'rd',
  'l',
  'ld',
  's',
  'ss',
  // double
  'cc',
  /* 'ff', // occurs only 'effir- */
  'll',
  'mm',
  'rr',
  // digraphs
  'hy',
  'ly',
  'my',
  'ny',
  'ry',
  'ty',
  'hr',
  'hl',
  // -s
  'ps',
  'ts',
  'x', // cs
  // others
  'ht',
  'lc',
  'lm',
  'lv',
  'lqu',
  'lt',
  'mn',
  'pt',
  'rc',
  'rqu',
  'rn',
  'rm',
  'st',
  'ts',
];

export const INITIAL_CONSONANTS = [
  'c',
  'f',
  'h',
  'l',
  'm',
  'n',
  'p',
  'r',
  's',
  't',
  'v',
  'w',
  'nw',
  'qu',
  'hy',
  'ly',
  'ny',
  'ty',
  'hl',
  'hr',
];

export const LAST_CONSONANTS = [
  'l',
  'n',
  'r',
  's',
  't',
  'nt', // occurs grammatically only
];

export const IMPOSSIBLE_CLUSTER = [
  'ct', // ht
  'ln', // ld
  'lr', // ll
  'ls', // ld
  'ns', // ss
  'nr', // rr
  'nm', // mm
  'np', // mp
  'rl', // ll
  'sf', // ff?
  'sh',
  'sl',
  'sm',
  'sn',
  'sr',
  'sv',
  'tc',
  'tf',
  'th', // s
  'tl',
  'tn', // nt
  'tr',
  'yi',
];

export function wordValidation(word: string): boolean {
  const forInitCons = `^(?:${INITIAL_CONSONANTS.join('|')})?`;
  const forVowels = `(?:${VOWELS.join('|')})`;
  const forCons = `(?:${CONSONANTS.join('|')})`;
  const forLastCons = `[${LAST_CONSONANTS.join('')}]?$`;
  const isValid = new RegExp(
    `${forInitCons}${forVowels}(?:${forCons}${forVowels})*${forLastCons}`
  );
  const hasInvalidCluster = new RegExp(`(?:${IMPOSSIBLE_CLUSTER.join('|')})`);
  const hasClusterAfterLongVowel = new RegExp(
    `[áéíóú](?:mb|ld|nd|rd|ng|x|[cfhlmnprstvw](?:[cfhlmnprstvw]|y))`
  );
  return (
    isValid.test(word) &&
    !hasInvalidCluster.test(word) &&
    !hasClusterAfterLongVowel.test(word)
  );
}
