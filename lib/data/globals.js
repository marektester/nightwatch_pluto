var self = module.exports = {
	
	debugMsg(msg) {
		if (this.debugMode)
			console.log(`[DEBUG] ${msg}`);
		return;
	},

	convertDate(nextDays = 0) {
		let date = new Date();
		if (nextDays != 0){
			date.setDate(date.getDate() + nextDays);
		} 
		let dd = date.getDate();
		let mm = date.getMonth() + 1;
		const yyyy = date.getFullYear();
		
		dd = (dd < 10) ? '0' + dd : dd;
		mm = (mm < 10) ? '0' + mm : mm;
		return `${dd}/${mm}/${yyyy}`;
	}, 

	debugMode: true,

	testUUIDData: {
		UUID: undefined,
		shortUUID: undefined,
		timestamp: undefined
	},

	testUUIDFile						: require('path').resolve(__dirname + '/../data/testUUID.json'),
	loaderTimeout						: 120 * 1000,
	elementTimeout						: 60 * 1000,
	latestFrame							: null,
	abortOnAssertionFailure				: false,
};