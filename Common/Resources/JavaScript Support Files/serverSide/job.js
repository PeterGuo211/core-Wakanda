/**
 *
 * 
 *
 * @class Jobs
 * @extends Object
 *
 */
Job = function Job() {
    
    
    /**
     * contains the unique ID of the job on the Wakanda Server
     *
     * @property id
     * @attributes 
     * @type String
     */
    this.id =  ''; 
    
    
    /**
     * logs the messageInfo event for the job and terminates the job
     *
     * @method terminate
     * @param {String} messageInfo
     */
    this.terminate = function terminate(messageInfo) {             };
    
    /**
     * logs the messageInfo event for the job
     *
     * @method log
     * @param {String} messageInfo
     */
    this.log = function log(messageInfo) {             };
    

};


JobManager = function JobManager() {
    
    
    
    /**
     * returns an array containing all the jobs currently running on the Wakanda Server
     *
     * @method getJobs
     * @return {Array}
     */
    this.getJobs = function getJobs() {        return [];     };
    
    /**
     * returns a new job object or the job object corresponding to the jobID string parameter
     *
     * @method getJob
     * @param {String} jobID
     * @return {Job}
     */
    this.getJob = function getJob(jobID) {        return new Job( );     };
    

};

