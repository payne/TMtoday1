// Import jsdom
const { JSDOM } = require('jsdom');

// Load the HTML file into the DOM
const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Test</title>
  </head>
  <body>
    <input type="text" id="myInput" value="Hello World">
    <script src="./myScript.js"></script>
  </body>
</html>
`;
const { window } = new JSDOM(html);
global.document = window.document;

// Import the plain vanilla JavaScript program
const myFunction = require('./myScript.js');

// Write the Jest test
describe('myFunction', () => {
  test('should fetch the content of the input field', () => {
    // Arrange
    const expected = 'Hello World';
    const input = document.getElementById('myInput');

    // Act
    const result = myFunction(input);

    // Assert
    expect(result).toBe(expected);
  });
});

