import { logging } from "./Logger"

class DePluralizer{
    lower(word){
            logging.warn(`[DePluralizer.lower(${word})]`)

        let output = ''
        // removing plurality from the word, denoted by an ending of s or ies
        if(word[word.length-1] == 's'){
            if(word[word.length-3] + word[word.length-2] + word[word.length-1] == 'ies'){
                    logging.log('the search word ends in ies so removing it')
                for(let i = 0; i < word.length-3; i++){
                    output += word[i]
                }
                    logging.log('the edited word is now', output)

            }else{
                    logging.log('the search word ends in s so removing it')
                for(let i = 0; i < word.length-1; i++){
                    output += word[i]
                }
                    logging.log('the edited word is now', output)
            }
        }else{
                logging.log('the search word was not plural, so setting it without modifications')
            output = word
        }

        return output.toLowerCase()
    }
}

export const dePluralizer = new DePluralizer()