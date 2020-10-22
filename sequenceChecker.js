const { SUCCESS, NOT_MATCHING_PAIR, INVALID_CHAR, NO_INPUT } = require("./constants");
valid_pairs_regex = /[^PANYOHWV]/g;
sequence_mappings = {
    'P' : 'A',
    'N' : 'Y',
    'O' : 'H',
    'W' : 'V'
}

function sequenceChecker(sequence) {

    if( !sequence ) { //if string is empty or null etc
        return NO_INPUT;
    }
    console.log('test');

    if ( sequence.match( valid_pairs_regex ) ) { //string contains anything other than PA NY OH or WV
        console.log(sequence);
        return INVALID_CHAR;
        
    }
    console.log('seq length = ' + sequence.length )
    // for ( valid_seq in sequence_mappings ) {
    //     console.log(valid_seq + " " + sequence_mappings[valid_seq]);
    // }
    for (i = 0; i < ( sequence.length / 2 ) ; i++ ) {
        //matching pairs can only start with P, N, O, or W
        // if ( true ) 
        valid_pair_located = false;

        for ( valid_seq in sequence_mappings ) {

            console.log(valid_seq + " " + sequence_mappings[valid_seq]);

            if ( sequence.charAt(i).valueOf() == valid_seq.valueOf() ) {
                console.log('first char matches')

                if ( sequence.charAt( sequence.length - i - 1 ).valueOf() == sequence_mappings[ valid_seq ].valueOf() ) {
                    console.log('second char matches first')
                    valid_pair_located = true;
                    break;
                }
            }

        }
        if ( !valid_pair_located ) {
            return NOT_MATCHING_PAIR;
        }
        else {
            valid_pair_located = false;
        }
        // console.log('first: ' + sequence.charAt(i) + ' second: ' + sequence.charAt( sequence.length - i - 1 ) );
        // console.log(sequence_mappings.sequence.charAt(i) ' second: ' + sequence.charAt( sequence.length - i - 1 ) );

    }



	return SUCCESS;
}
exports.sequenceChecker = sequenceChecker;
