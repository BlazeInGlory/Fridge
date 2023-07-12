import { logging } from "./Logger"

class FreshnessChecker{
    isFresh(storageType, dateUpdate){
            logging.warn(`[FreshnessChecker.isFresh(${storageType}, ${dateUpdate})]`)

        let storageLengthsFresh = {
            Pantry: 10,
            Fridge: 20,
            Freezer: 30
        }
        let storageLengthsWarn = {
            Pantry: 20,
            Fridge: 30,
            Freezer: 40
        }
        let storageLengthsEdible = {
            Pantry: 30,
            Fridge: 40,
            Freezer: 50
        }
        let timeSince = this.dateSinceAdded(dateUpdate)
            logging.log('the time since last updated:', timeSince)

        if(timeSince.seconds < storageLengthsFresh[storageType]){
            return 'fresh'
        }
        if(timeSince.seconds < storageLengthsWarn[storageType]){
            return 'near'
        }
        if(timeSince.seconds < storageLengthsEdible[storageType]){
            return 'warn'
        }
        return 'spoil'
        
    }
    dateSinceAdded(origDate){
        let today = new Date()
        let weeks = Math.floor((today - origDate) / 604800000)
        let days = Math.floor((today - origDate) / 86400000)
        let hours = Math.floor((today - origDate) / 3600000)
        let minutes = Math.floor((today - origDate) / 60000)
        let seconds = Math.floor((today - origDate) / 1000)

        return { 
            weeks: weeks, 
            days: days, 
            hours: hours, 
            minutes: minutes, 
            seconds: seconds
        }
    }

}

export const freshnessChecker = new FreshnessChecker()