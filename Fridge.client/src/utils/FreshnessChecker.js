import { AppState } from "../AppState"
import { logger } from "./Logger"

class FreshnessChecker{
    isFresh(storageType, dateUpdate){
        let timeSince = this.dateSinceAdded(dateUpdate)
        if(AppState.logging)( logger.log('the time since last updated:', timeSince) )

        if(timeSince.seconds>10){
            return this.isWarn(storageType, dateUpdate)
        }
        return 'fresh'
        
        // if (storageType == "Pantry"){
        //     if(timeSince.seconds>10){
        //         return false
        //     }
        //     return true
        // }
    }

    isWarn(storageType, dateUpdate){
        let timeSince = this.dateSinceAdded(dateUpdate)
        if(AppState.logging)( logger.log('the time since last updated:', timeSince) )

        if(timeSince.seconds>20){
            return 'spoil'
        }
        return 'warn'
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