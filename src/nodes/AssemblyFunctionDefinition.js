const {
  doc: {
    builders: { line }
  }
} = require('prettier');

const printSeparatedItem = require('./print-separated-item');
const printSeparatedList = require('./print-separated-list');

const AssemblyFunctionDefinition = {
  print: ({ node, path, print }) => [
    'function ',
    node.name,
    '(',
    printSeparatedList(path.map(print, 'arguments')),
    ')',
    node.returnArguments.length === 0
      ? ' '
      : printSeparatedItem(
          [
            '->',
            printSeparatedList(path.map(print, 'returnArguments'), {
              firstSeparator: line,
              lastSeparator: ''
            })
          ],
          { firstSeparator: line }
        ),
    path.call(print, 'body')
  ]
};

module.exports = AssemblyFunctionDefinition;
