# Google Query Script

A Node.js script that uses curl to query Google and return search results.

## Installation

```bash
npm install
```

## Usage

### Command Line
```bash
node google-query.js "your search query"
```

### Programmatic Usage
```javascript
const { queryGoogle } = require('./google-query');

queryGoogle('test search', (error, stdout, stderr) => {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Results:', stdout);
});
```

## Testing

Run the test suite:
```bash
npm test
```

## Features

- URL encoding of search queries
- User agent spoofing for better request handling
- Command line interface
- Programmatic API with callback support
- Comprehensive test coverage