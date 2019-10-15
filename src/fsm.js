class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
		  this.config = config;
		  this.activeState = this.config.initial;
		  this.historyStack = [];
		  this.previousStateList = [];
  	}

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
		  return this.activeState;
	  }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
		  if(this.config.states[state]){
			  this.historyStack.push(this.activeState);
			  this.activeState = state;
			  this.previousStateList = [];
      }
      else{
        throw new Error;
      }
	  }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {      
		  if(this.config.states[this.activeState].transitions[event]){
        let triggerEvent = this.config.states[this.activeState].transitions[event];
			  this.changeState(triggerEvent);
      }
      else{
        throw new Error;
      }
	  }

    /**
     * Resets FSM state to initial.
     */
    reset() {
		  this.activeState = this.config.initial;
	  }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      let states = Object.getOwnPropertyNames(this.config.states);
		  if(!event){
        return states;
      }		  
		  return states.filter(state => this.config.states[state].transitions[event]);		
	  }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
		  if(this.historyStack.length != 0){
			  this.previousStateList.push(this.activeState);
			  this.activeState = this.historyStack.pop();
			  return true;
		  }
		return false;
	  }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
		  if(this.previousStateList.length != 0){
			  this.historyStack.push(this.activeState);			
			  this.activeState = this.previousStateList.pop();
			  return true;
		  }
		  return false;
	  }

    /**
     * Clears transition history
     */
    clearHistory() {
		  this.historyStack = [];
	  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
