function myFunction(input) {
  return input.value;
}


console.log(`myFunction: ${myFunction({ value: 'Hello World!' })}`);

// https://www.reddit.com/r/learnprogramming/comments/wka697/javascript_uncaught_referenceerror_module_is_not/

if (typeof module === 'object') {
  module.exports = myFunction;
}
// export { myFunction };
