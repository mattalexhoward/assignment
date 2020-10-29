const { SUCCESS, NOT_MATCHING_PAIR, INVALID_CHAR, NO_INPUT } = require("./constants");
valid_pairs_regex = /[^PANYOHWV]/g;
sequence_mappings = {
    'P' : 'A',
    'N' : 'Y',
    'O' : 'H',
    'W' : 'V'
}
status_messages = {
    [SUCCESS]           : 'Success',
    [NOT_MATCHING_PAIR] : 'Only encapsulating pairs of PA NY OH WV are allowed',
    [INVALID_CHAR]      : 'There was an invalid character input. Only PA NY OH and WV are allowed.',
    [NO_INPUT]          : 'Please enter your input in the text box.'
}

function sequenceCheckerProcessor(sequence) {

    if( !sequence ) { //if string is empty or null etc
        return NO_INPUT;
    }

    if ( sequence.match( valid_pairs_regex ) ) { //string contains anything other than PA NY OH or WV
        return INVALID_CHAR;
    }

    for (i = 0; i < ( sequence.length / 2 ) ; i++ ) {
        //matching pairs can only start with P, N, O, or W
        // if ( true ) 
        valid_pair_located = false;

        for ( valid_seq in sequence_mappings ) { // for each possible valid seq in the seq map list

            if ( sequence.charAt(i).valueOf() == valid_seq.valueOf() ) { //check to see that the first char of the string matches one of the first chars
                                                                         //of one of the valid sequences

                if ( sequence.charAt( sequence.length - i - 1 ).valueOf() == sequence_mappings[ valid_seq ].valueOf() ) {
                    //check the end of the string (or the end minus the index) for the second part of the valid string (since they have to be encapsulating)
                    valid_pair_located = true;
                    break;
                }
            }

        }
        if ( !valid_pair_located ) { //if at any point we dont find a valid pair, the string is invalid
            return NOT_MATCHING_PAIR;
        }
        else {
            valid_pair_located = false;
        }
    }
	return SUCCESS;
}

function sequenceChecker (sequence) {


    status_code = sequenceCheckerProcessor(sequence);
    // console.log(status_messages[]);
    return {
        status_code : [status_code],
        status_message : status_messages[ status_code ]
    }
}

exports.sequenceChecker = sequenceChecker;
exports.sequenceCheckerProcessor = sequenceCheckerProcessor;

