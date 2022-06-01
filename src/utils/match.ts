const specialCharsRegex = /[.*+?^${}()|[\]\\]/g;
const wordCharacterRegex = /[a-z0-9_]/i;
const whitespacesRegex = /\s+/;
const removeDiacritics = /[\u0300-\u036f]/g;

interface Subject {
  insideWords: boolean;
  findAllOccurrences: boolean;
  requireMatchAll: boolean;
}

type SubjectKeys = keyof Subject;

const escapeRegexCharacters = (str: string) => {
  return str.replace(specialCharsRegex, '\\$&');
};

const extend = (subject: Subject, baseObject: Subject) => {
  const baseObjectBuf = baseObject;

  Object.keys(subject).forEach((key) => {
    baseObjectBuf[key as SubjectKeys] = !!subject[key as SubjectKeys];
  });

  return baseObjectBuf;
};

export const match = (text: string, query: string, options?: Subject) => {
  const extendedOptions = extend(options || ({} as Subject), {
    insideWords: false,
    findAllOccurrences: false,
    requireMatchAll: false
  });

  const cleanedTextArray = Array.from(text).map((x) =>
    x.normalize('NFD').replace(removeDiacritics, '')
  );
  let cleanedText = cleanedTextArray.join('');
  const cleanedQuery = query.normalize('NFD').replace(removeDiacritics, '');

  return cleanedQuery
    .trim()
    .split(whitespacesRegex)
    .filter((word) => {
      return word.length > 0;
    })
    .reduce((result: number[][], word) => {
      const wordLen = word.length;
      const prefix = !extendedOptions.insideWords && wordCharacterRegex.test(word[0]) ? '\\b' : '';
      const regex = new RegExp(prefix + escapeRegexCharacters(word), 'i');
      let occurrence;
      let index;

      occurrence = regex.exec(cleanedText);
      if (extendedOptions.requireMatchAll && occurrence === null) {
        cleanedText = '';
        return [];
      }

      while (occurrence) {
        index = occurrence.index;

        const cleanedLength = cleanedTextArray.slice(index, index + wordLen).join('').length;
        const offset = wordLen - cleanedLength;

        const initialOffset = index - cleanedTextArray.slice(0, index).join('').length;
        const wordOffset = offset;

        const indexes = [index + initialOffset, index + wordLen + initialOffset + wordOffset];

        if (indexes[0] !== indexes[1]) {
          result.push(indexes);
        }

        cleanedText =
          cleanedText.slice(0, index) +
          new Array(wordLen + 1).join(' ') +
          cleanedText.slice(index + wordLen);

        if (!extendedOptions.findAllOccurrences) {
          break;
        }

        occurrence = regex.exec(cleanedText);
      }

      return result;
    }, [])
    .sort((match1, match2) => {
      return match1[0] - match2[0];
    });
};
