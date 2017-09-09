/**
 *  Copyright (c) 2017 Kevin K. Yang
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so.
 * 
 * CC-CEDICT is licensed under the Creative Commons Attribution-Share 
 * Alike 3.0 License (https://creativecommons.org/licenses/by-sa/3.0/). 
 * You must give proper attribution and license any changes or 
 * improvements to the data under the same license.
 */

const fs = require('fs');
const readline = require('readline');

var cedictFile = "cedict_ts.u8";
var outputFile = "cedict.json";
var prettyPrint = false;

if (process.argv.length > 2) {
  cedictFile = process.argv[2];
}
if (process.argv.length > 3) {
  if (typeof process.argv[3] !== 'string') {
    console.log("The output file " + outputFile 
      + " is not a valid filename. Exiting...");
    process.exit(1);
  }
  outputFile = process.argv[3];
}
if (process.argv.length > 4 && process.argv[4] === '-p') {
  prettyPrint = true;
}

/**
 * Object representing an entry in the dictionary.
 * @param      String  traditional  The traditional Chinese characters.
 * @param      String  simplified   The simplified Chinese characters.
 * @param      String  pinyin       The pinyin, separated by spaces.
 * @param      Array   definitions  A string array containing a list of
*                                   definitions for the word or phrase.
 */
function Entry(traditional, simplified, pinyin, definitions) {
  this.traditional = traditional;
  this.simplified = simplified;
  this.pinyin = pinyin;
  this.definitions = definitions;
}

/**
 * Parses a line in the CEDICT file and returns an Entry object.
 * @param      String  entry  A correctly formatted CEDICT entry.
 * @return     Entry  An Entry object.
 */
function parseEntry(entry) {
  var firstSpace = entry.indexOf(' ');
  var secondSpace = entry.indexOf(' ', firstSpace + 1);
  var bracketsMatch = entry.match(/\[(.*?)\]/);
  var definitions = entry.match(/\/(.*?)\//g);

  if (firstSpace <= 0 || secondSpace <= 0 ||
    bracketsMatch === null || definitions.length === 0) {
    console.log("Invalid entry: " + entry);
    return null;
  }

  var traditional = entry.substring(0, firstSpace);
  var simplified = entry.substring(firstSpace + 1, secondSpace);
  var pinyin = bracketsMatch[1];
  for (var i = 0; i < definitions.length; i++) {
    definitions[i] = definitions[i].replace(/[\/]/g, '');
  }
  return new Entry(traditional, simplified, pinyin, definitions);
}

var entryArray = [];

fs.exists(cedictFile, function(exists) {
  if (exists) {
    console.log("Reading from file \'" + cedictFile + "\'...");
    var rl = readline.createInterface({
      input: fs.createReadStream(cedictFile)
    });
    rl.on('line', function(line) {
      if (line.charAt(0) !== '#') {
        var entry = parseEntry(line);
        if (entry !== null) {
          entryArray.push(entry);
        }
        return;
      }
    }).on('close', function() {
      console.log("Writing to file \'" + outputFile + "\'...")
      var data = prettyPrint ? JSON.stringify(entryArray, null,'\t') : 
          JSON.stringify(entryArray);
      fs.writeFile(outputFile, data, function(err) {
        if (err) {
          return console.error(err);
        }

        console.log("Completed: " + entryArray.length + " entries written.")
      })
    });
  } else {
    console.log("The input file " + cedictFile + " was not found. Exiting...");
  }
});