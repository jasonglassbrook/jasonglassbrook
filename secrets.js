"use strict";

/*
interface Secret {
  base: number;
  code: Record<string, Array<string>>;
}
*/

/***********************************************************
  ENCODE SECRET
***********************************************************/

function encodeSecret(s /*: string*/, base /*: number*/) /*: Secret*/ {
  /* Define encoder. */
  function encodeItem(x /*: number*/) /*: string*/ {
    return x.toString(base);
  }

  /* Convert string `s` to a list of code points `codeList`. */
  const codeList = Array.from(s, (x) => x.codePointAt(0));

  /* Convert code points to a dictionary like `{ [secretCode]: [secretIndex, ...], ... }`. */
  const secretCodeDict = {};
  for (const [index, code] of codeList.entries()) {
    /* Encode secret index, code. */
    const secretIndex = encodeItem(index);
    const secretCode = encodeItem(code);

    /* If needed, add new key `secretCode` to `secretCodeDict`. */
    if (!(secretCode in secretCodeDict)) {
      secretCodeDict[secretCode] = [];
    }

    /* Append secret index. */
    secretCodeDict[secretCode].push(secretIndex);
  }

  /* Make the secret object; return. */
  return {
    base: base,
    code: secretCodeDict,
  };
}

/***********************************************************
  DECODE SECRET
***********************************************************/

function decodeSecret(secret /*: Secret*/) /*: string*/ {
  /* Define decoder. */
  function decodeItem(x /*: string*/) /*: number*/ {
    return parseInt(x, secret.base);
  }

  /* Initialize empty list of code points `codeList`. */
  const codeList = [];

  /* Reconstruct code points from the secret. */
  for (const [secretCode, secretIndexList] of Object.entries(secret.code)) {
    /* Decode secret code to a real code point. */
    const code = decodeItem(secretCode);

    for (secretIndex of secretIndexList) {
      /* Decode secret index to a real index. */
      const index = decodeItem(secretIndex);

      /* If needed, grow the list of code points. */
      const missingLength = index + 1 - codeList.length;
      if (missingLength > 0) {
        codeList.push(...Array(missingLength));
      }

      /* Place the code point. */
      codeList[index] = code;
    }
  }

  /* Convert the code points to a string; return. */
  return String.fromCodePoint(...codeList);
}
