import { AppState } from '../AppState'
import { dev } from '../env'

function log(type, content) {
  // NOTE this lines turns off all logs if logging is true, otherwise only the 
  // functions with the check will be turned off
  // if(!AppState.logging){ return }
  if (dev) {
    // eslint-disable-next-line no-console
    console[type](`[${type}] :: ${new Date().toLocaleTimeString()} :: `, ...content)
  } else {
    switch (type) {
      case 'log':
      case 'assert':
        return
    }
    // TODO SEND LOGS TO EXTERNAL SERVICE
    // eslint-disable-next-line no-console
    console[type](`[${type}] :: ${new Date().toLocaleTimeString()} :: `, ...content)
  }
}

export const logger = {
  log() {
    log('log', arguments)
  },
  error() {
    log('error', arguments)
  },
  warn() {
    log('warn', arguments)
  },
  assert() {
    log('assert', arguments)
  },
  trace() {
    log('trace', arguments)
  }
}

export const logging = {
  log(){
      if(AppState.logging){
        log('log', arguments)
      }
  },
  warn(){
      if(AppState.logging){
        log('warn', arguments)
      }
  },
  error(){
      if(AppState.logging){
        log('error', arguments)
      }
  },
  assert(){
      if(AppState.logging){
        log('assert', arguments)
      }
  },
  trace(){
      if(AppState.logging){
        log('trace', arguments)
      }
  }     
}
