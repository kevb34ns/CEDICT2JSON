# CEDICT2JSON

This is a simple Node console app that converts the CC-CEDICT Chinese-English dictionary format file into a JSON file that can be used to easily create a MongoDB database, or for any other purpose.

## CC-CEDICT

[CC-CEDICT](https://cc-cedict.org/wiki/) is a dictionary project that provides English definitions and Pinyin pronunciations for Chinese words and phrases.

You can [download CC-CEDICT's data here](https://www.mdbg.net/chinese/dictionary?page=cc-cedict). The format of the data is described [here](https://cc-cedict.org/wiki/format:syntax).

## Usage
1. Download and install Node.js
2. Clone the repository: `git clone git@github.com:kevinkyang/CEDICT2JSON.git`
3. [Download CC-CEDICT data file](https://www.mdbg.net/chinese/dictionary?page=cc-cedict), and extract it into the CEDICT2JSON directory
4. Run the program:
    - In the console, run: `node cedict2json.js`
        + This assumes that the CC-CEDICT file has the default filename, `cedict_ts.u8`
        + The resulting JSON is written to `cedict.json`
    - Options:
        + Specify a different cedict input file: `node cedict2json.js inputFilename`
        + Specify a different output file: `node cedict2json.js inputFilename outputFilename`
        + Specify JSON pretty-print (the file is more readable, at a cost of a larger file): `node cedict2json.js inputFilename outputFilename -p`

## License

This program is licensed under the MIT License. For more info, see the LICENSE file.

CC-CEDICT is licensed under the [Creative Commons Attribution-Share Alike 3.0 License](https://creativecommons.org/licenses/by-sa/3.0/). You must give proper attribution and license any changes or improvements to the data under the same license.
