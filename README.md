<!--
**jasonglassbrook/jasonglassbrook** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.
-->

### About Me

Hi there 👋

I'm a full-stack web developer with a background in teaching and mechanical engineering. I'm an experienced programmer who focuses on usability and writing clean, reusable code. I love solving challenging problems and figuring out complex systems.

I develop with JavaScript/TypeScript and Python, but I enjoy learning new languages. I've developed front-end apps with React and back-end apps with Django and Node+Express. I've even developed a mobile app (Android/iOS) with React Native + Expo. Before I entered web development, I programmed with MATLAB/Simulink, C/C++, Fortran, and Java for research and school. I also taught MATLAB to engineering students.

Outside of work, I enjoy drawing, gardening, cooking, running, and hiking with my partner and our dog. I also enjoy learning new programming and markup languages on my own — because I'm a nerd 🤓

### Get In Touch

-   [github.com/jasonglassbrook](https://github.com/jasonglassbrook/) (you're already here)
-   [linkedin.com/in/jasonglassbrook](https://www.linkedin.com/in/jasonglassbrook/)
-   To email me, run the following code in your browser's console.

    ```js
    if (window.confirm('If you click "OK", you will be redirected to email Jason.')) {
      /* Can you figure out the secret code? */
      const secret = {
        base: 36,
        code: { "1a": ["i"], "1s": ["2"], "2p": ["4", "a"], "2q": ["d"], "2s": ["j"], "2t": ["1", "k"], "2v": ["8"], "2y": ["3"], "2z": ["h"], "3a": ["l"], "30": ["9"], "31": ["0"], "32": ["7"], "33": ["6", "f", "g"], "36": ["e"], "37": ["5", "b", "c"] },
      };

      function fromSecret(x /*: string*/, base /*: number*/) /*: number*/ {
        return parseInt(x, base);
      }

      function discoverSecret(secret /*: Secret*/) /*: string*/ {
        /* Initialize empty list of code points `codeList`. */
        const codeList = [];

        /* Reconstruct code points from the secret. */
        for (const [secretCode, secretIndexList] of Object.entries(secret.code)) {
          /* Convert each secret code to a code point. */
          const code = fromSecret(secretCode, secret.base);

          for (secretIndex of secretIndexList) {
            /* Convert each secret index to a real index. */
            const index = fromSecret(secretIndex, secret.base);

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

      /* Recover email from secret. */
      const email = discoverSecret(secret);

      /* Redirect to email. */
      window.location.href = `mailto:${email}`;
    }
    ```
