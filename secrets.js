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

function encodeItem(x /*: number*/, base /*: number*/) /*: string*/ {
  return x.toString(base);
}

function encodeSecret(s /*: string*/, base /*: number*/) /*: Secret*/ {
  /* Convert string `s` to a list of code points `codeList`. */
  const codeList = Array.from(s, (x) => x.codePointAt(0));

  /* Convert code points to a dictionary like `{ [secretCode]: [secretIndex, ...], ... }`. */
  const secretCodeDict = {};
  for (const [index, code] of codeList.entries()) {
    /* Make secret index, code. */
    const secretIndex = encodeItem(index, base);
    const secretCode = encodeItem(code, base);

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

function decodeItem(x /*: string*/, base /*: number*/) /*: number*/ {
  return parseInt(x, base);
}

function decodeSecret(secret /*: Secret*/) /*: string*/ {
  /* Initialize empty list of code points `codeList`. */
  const codeList = [];

  /* Reconstruct code points from the secret. */
  for (const [secretCode, secretIndexList] of Object.entries(secret.code)) {
    /* Convert each secret code to a code point. */
    const code = decodeItem(secretCode, secret.base);

    for (secretIndex of secretIndexList) {
      /* Convert each secret index to a real index. */
      const index = decodeItem(secretIndex, secret.base);

      /* If necessary, grow the list of code points. */
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
