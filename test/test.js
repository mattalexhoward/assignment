const assert = require('assert');
const { sequenceChecker } = require('../sequenceChecker');

// Tests for the sequence function.
// This tests to see if the sequence validator is working correctly.
describe('Tests for Sequence', () => {

    // Simple Successful test cases
    describe('Simple Successful Tests should return 0 when NY, PA, OH, or WV are entered', () => {
        it('Should return 0 when NY is entered', () => {
            assert.strictEqual(sequenceChecker('NY'), 0);

        });
        it('Should return 0 when PA is entered', () => {
            assert.strictEqual(sequenceChecker('PA'), 0);
        });
        it('Should return 0 when OH is entered', () => {
            assert.strictEqual(sequenceChecker('OH'), 0);
        });
        it('Should return 0 when WV is entered', () => {
            assert.strictEqual(sequenceChecker('WV'), 0);
        });
    });

    // Complex Successful test cases
    describe('Complex Successful Tests', () => {
        it('Should return 0 encapsulating NY entered', () => {
            assert.strictEqual(sequenceChecker('NNNNNNNNNNYYYYYYYYYY'), 0);
        });
        it('Should return 0 encapsulating NY entered', () => {
            assert.strictEqual(sequenceChecker('PNOWNPOWONPOPWNOPNOOOONPNOWNPOWONPOPWNOPNOOOONYHHHHYAHYVAHAYHVHAYVHYAYHHHHYAHYVAHAYHVHAYVHYA'), 0);
        });
    });


    // Simple Error test cases
    describe('Simple Error Tests', () => {
        it('Should return 3 when empty string is sent', () => {
            assert.strictEqual(sequenceChecker(''), 3);
        });

        it('Should return 1 when non-complete string is sent', () => {
            assert.strictEqual(sequenceChecker('P'), 1);
        });

        it('Should return 2 when invalid char string \'Q\' is sent', () => {
            assert.strictEqual(sequenceChecker('Q'), 2);
        });

        it('Should return 2 when invalid string \'Q\' is sent', () => {
            assert.strictEqual(sequenceChecker('PPPPPQAAAAA'), 2);
        });

        it('Should return 2 when invalid string \'1\' is sent', () => {
            assert.strictEqual(sequenceChecker('PPPPP1AAAAA'), 2);
        });

        it('Should return 2 when invalid string \'!\' is sent', () => {
            assert.strictEqual(sequenceChecker('PPPPP!AAAAA'), 2);
        });

        it('Should return 2 when invalid string \' \' (the space character) is sent', () => {
            assert.strictEqual(sequenceChecker('PPPPP AAAAA'), 2);
        });
    });

    // Complex Error test cases
    describe('Simple Error Tests', () => {
        it('Should return 1 non encapsulating string is sent', () => {
            assert.strictEqual(sequenceChecker('PNOWNNPOWONPOPWNOPNOOOONYHHHHYAHYYVAHAYHVHAYVHYA'), 1);
        });

        it('Should return 2 when invalid char 1 is sent', () => {
            assert.strictEqual(sequenceChecker('PNOWNPOWONPOPWNOPNOOOONPNOWNPOWONPOPWNOPNOOOON1YHHHHYAHYVAHAYHVHAYVHYAYHHHHYAHYVAHAYHVHAYVHYA'), 2);
        });

        it('Should return 1 when invalid char ! is sent', () => {
            assert.strictEqual(sequenceChecker('PNOWNPOWONPOPWNOPNOOOONPNOWNPOWONPOPWNOPNOOOON!YHHHHYAHYVAHAYHVHAYVHYAYHHHHYAHYVAHAYHVHAYVHYA'), 2);
        });

        it('Should return 1 when invalid char \' \' is sent', () => {
            assert.strictEqual(sequenceChecker('PNOWNPOWONPOPWNOPNOOOONPNOWNPOWONPOPWNOPNOOOON YHHHHYAHYVAHAYHVHAYVHYAYHHHHYAHYVAHAYHVHAYVHYA'), 2);
        });
        
    });

});