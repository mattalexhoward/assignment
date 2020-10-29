const assert = require('assert');
const { SUCCESS } = require('../constants');
const { sequenceChecker, sequenceCheckerProcessor } = require('../sequenceChecker');


// Tests for the sequence function.
// This tests to see if the sequence validator is working correctly.
describe('Tests for Sequence', () => {

    // Simple Successful test cases
    describe('Simple Successful Tests should return 0 when NY, PA, OH, or WV are entered', () => {
        it('Should return 0 when NY is entered', () => {
            assert.strictEqual(sequenceCheckerProcessor('NY'), 0);

        });
        it('Should return 0 when PA is entered', () => {
            assert.strictEqual(sequenceCheckerProcessor('PA'), 0);
        });
        it('Should return 0 when OH is entered', () => {
            assert.strictEqual(sequenceCheckerProcessor('OH'), 0);
        });
        it('Should return 0 when WV is entered', () => {
            assert.strictEqual(sequenceCheckerProcessor('WV'), 0);
        });
    });

    // Complex Successful test cases
    describe('Complex Successful Tests', () => {
        it('Should return 0 encapsulating NY entered', () => {
            assert.strictEqual(sequenceCheckerProcessor('NNNNNNNNNNYYYYYYYYYY'), 0);
        });
        it('Should return 0 encapsulating NY entered', () => {
            assert.strictEqual(sequenceCheckerProcessor('PNOWNPOWONPOPWNOPNOOOONPNOWNPOWONPOPWNOPNOOOONYHHHHYAHYVAHAYHVHAYVHYAYHHHHYAHYVAHAYHVHAYVHYA'), 0);
        });
    });


    // Simple Error test cases
    describe('Simple Error Tests', () => {
        it('Should return 3 when empty string is sent', () => {
            assert.strictEqual(sequenceCheckerProcessor(''), 3);
        });

        it('Should return 1 when non-complete string is sent', () => {
            assert.strictEqual(sequenceCheckerProcessor('P'), 1);
        });

        it('Should return 2 when invalid char string \'Q\' is sent', () => {
            assert.strictEqual(sequenceCheckerProcessor('Q'), 2);
        });

        it('Should return 2 when invalid string \'Q\' is sent', () => {
            assert.strictEqual(sequenceCheckerProcessor('PPPPPQAAAAA'), 2);
        });

        it('Should return 2 when invalid string \'1\' is sent', () => {
            assert.strictEqual(sequenceCheckerProcessor('PPPPP1AAAAA'), 2);
        });

        it('Should return 2 when invalid string \'!\' is sent', () => {
            assert.strictEqual(sequenceCheckerProcessor('PPPPP!AAAAA'), 2);
        });

        it('Should return 2 when invalid string \' \' (the space character) is sent', () => {
            assert.strictEqual(sequenceCheckerProcessor('PPPPP AAAAA'), 2);
        });
    });

    // Complex Error test cases
    describe('Simple Error Tests', () => {
        it('Should return 1 non encapsulating string is sent', () => {
            assert.strictEqual(sequenceCheckerProcessor('PNOWNNPOWONPOPWNOPNOOOONYHHHHYAHYYVAHAYHVHAYVHYA'), 1);
        });

        it('Should return 2 when invalid char 1 is sent', () => {
            assert.strictEqual(sequenceCheckerProcessor('PNOWNPOWONPOPWNOPNOOOONPNOWNPOWONPOPWNOPNOOOON1YHHHHYAHYVAHAYHVHAYVHYAYHHHHYAHYVAHAYHVHAYVHYA'), 2);
        });

        it('Should return 1 when invalid char ! is sent', () => {
            assert.strictEqual(sequenceCheckerProcessor('PNOWNPOWONPOPWNOPNOOOONPNOWNPOWONPOPWNOPNOOOON!YHHHHYAHYVAHAYHVHAYVHYAYHHHHYAHYVAHAYHVHAYVHYA'), 2);
        });

        it('Should return 1 when invalid char \' \' is sent', () => {
            assert.strictEqual(sequenceCheckerProcessor('PNOWNPOWONPOPWNOPNOOOONPNOWNPOWONPOPWNOPNOOOON YHHHHYAHYVAHAYHVHAYVHYAYHHHHYAHYVAHAYHVHAYVHYA'), 2);
        });
        
    });

});

describe('Tests for Sequence', () => {

    describe('Checks status that status codes match status messages', () => {

        it('Should return Success', () => {
            assert.strictEqual(sequenceChecker('PA').status_message, 'Success');
        });
        it('Should return encapsulating pair error', () => {
            assert.strictEqual(sequenceChecker('PAA').status_message, 'Only encapsulating pairs of PA NY OH WV are allowed');
        });
        it('Should return No Input error', () => {
            assert.strictEqual(sequenceChecker('').status_message, 'Please enter your input in the text box.');
        });
        it('Should return invalid input error', () => {
            assert.strictEqual(sequenceChecker('!PA!').status_message, 'There was an invalid character input. Only PA NY OH and WV are allowed.');
        });

    });
});