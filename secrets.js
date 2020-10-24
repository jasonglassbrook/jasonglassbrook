"use strict";

/*
interface Secret {
  base: number;
  code: Record<string, Array<string>>;
}
*/

/***********************************************************
  MAKE SECRET
***********************************************************/

function toSecret(x /*: number*/, base /*: number*/) /*: string*/ {
  return x.toString(base);
}

function makeSecret(s /*: string*/, base /*: number*/) /*: Secret*/ {
  /* Convert string `s` to a list of code points `codeList`. */
  const codeList = Array.from(s, (x) => x.codePointAt(0));

  /* Convert code points to a dictionary like `{ [secretCode]: [secretIndex, ...], ... }`. */
  const secretCodeDict = {};
  for (const [index, code] of codeList.entries()) {
    /* Make secret index, code. */
    const secretIndex = toSecret(index, base);
    const secretCode = toSecret(code, base);

    /* If needed, add new key `secretCode` to `secretCodeDict`. */
    if (!(secretCode in secretCodeDict)) {
      secretCodeDict[secretCode] = [];
    }

    /* Append secret index. */
    secretCodeDict[secretCode].push(secretIndex);
  }

  return {
    base: base,
    code: secretCodeDict,
  };
}
