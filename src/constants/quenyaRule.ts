export const VOWELS = [
  // single vowel and dipthong
  'a',
  'ai',
  'au',
  'á',
  'e',
  'eu',
  'é',
  'i',
  'iu',
  'í',
  'o',
  'oi',
  'ó',
  'u',
  'ui',
  'ú',
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
  's',
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
  'll',
  'rr',
  'mm',
  'cc',
  // -s, -y
  'ps',
  'ts',
  'x', // cs
  'hy',
  'ny',
  'ry',
  'ty',
  'ly',
  // others
  'hr',
  'hl',
  'lv',
  'lm',
  'lc',
  'lqu',
  'lt',
  'pt',
  'rc',
  'rqu',
  'rn',
  'rm',
  'st',
  'ts',
  'ht',
  'mn',
];

export const INITIAL_CONSONANTS = [
  'c',
  'f',
  'h',
  'hl',
  'hr',
  'hy',
  'l',
  'm',
  'n',
  'ny',
  'p',
  'qu',
  'r',
  's',
  't',
  'ty',
  'v',
  'w',
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
  'ln',
  'lr',
  'ls',
  'ns',
  'nr',
  'nm',
  'np',
  'rl',
  'sf',
  'sh',
  'sl',
  'sm',
  'sn',
  'sr',
  'sv',
  'tc',
  'tf',
  'th',
  'tl',
  'tn',
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
