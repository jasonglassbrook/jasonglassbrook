"use strict";

/*
interface Secret {
  base: number;
  code: Record<string, Array<string>>;
}
*/

/***********************************************************
  ENCODE SECRET
------------------------------------------------------------
  ### EXAMPLE ###
  let encodedMessage = "keep it secret, keep it safe";
  let secret = encodeSecret(encodedMessage, 16);
  >>>
  secret = {
    base: 16,
    code: {
      "2c": ["e"],
      "6b": ["0", "10"],
      "20": ["4", "7", "f", "14", "17"],
      "61": ["19"],
      "63": ["a"],
      "65": ["1", "2", "9", "c", "11", "12", "1b"],
      "66": ["1a"],
      "69": ["5", "15"],
      "70": ["3", "13"],
      "72": ["b"],
      "73": ["8", "18"],
      "74": ["6", "d", "16"],
    },
  }
***********************************************************/

function encodeSecret(message /*: string*/, base /*: number*/) /*: Secret*/ {
  /* Define encoder. */
  function encodeItem(x /*: number*/) /*: string*/ {
    return x.toString(base);
  }

  /* Convert string `message` to a list of code points `codeList`. */
  const codeList = Array.from(message, (x) => x.codePointAt(0));

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
------------------------------------------------------------
  ### EXAMPLE ###
  let encodedMessage = "keep it secret, keep it safe";
  let secret = encodeSecret(encodedMessage, 16);
  let decodedMessage = decodeSecret(secret);
  >>>
  decodedMessage = "keep it secret, keep it safe"
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

    for (const secretIndex of secretIndexList) {
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
