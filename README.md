# tyler1-ign-generator

A Front-End react app that generates a tyler1 (twitch streamer) inspired IGN.

website: https://tyler1-ign-generator.netlify.app/

# what makes a tyler1 ign?

- all words capitalized
- followed by a random sequence of numbers
- max words are 2.
- the words are combined with no spaces between
- example: `HULKSMASH1337`
- 
# solution

- find or make an api that contains a decent amount of words, can also just make an array of words.
- make a function that takes an array and returns a random element.
- get 2 random words from the array, make them upper case with no spaces.
- get a random integer between min and max.
- join the words and the number.

# bonus
- added a feature where the user can enter a numbers to add to the name.
