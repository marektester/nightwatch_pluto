var pageFunctions = {
	elementTimeout : function() {return this.api.globals.elementTimeout},
	loaderTimeout : function() {return this.api.globals.loaderTimeout},
	
	load: async function () {
		await this.navigate();
		await this.maximizeWindow();
		//await this.resizeWindow(1456, 993);
		await this.waitForElementVisible('@logoPluto', this.elementTimeout());
	},

	openSingleTripCover: async function () {
		await this.click('@btnSingleTripCover');
		await this.waitForElementVisible('@inputStartDate');
	},

	openAnnualCover: async function () {
		await this.click('@btnAnnualCover');
		await this.waitForElementVisible('@inputStartDate');
	},

	restartQuote: async function () {
		await this.click('@logoPluto');
		await this.waitForElementVisible('@quickHelpPopup');
		await this.click('@btnRestartQuote');
	},

};

module.exports = {
	url: function () {
		return this.api.launchUrl;
	},
	commands: [pageFunctions],
	elements : {
		btnSingleTripCover					: { selector: "//h5[contains(., 'Single trip cover')]/../../button" , locateStrategy: 'xpath'},
		btnAnnualCover						: { selector: "//h5[contains(., 'Annual cover')]/../../button" , locateStrategy: 'xpath'},
		logoPluto							: { selector: "//*[@class = 'logo-quote-container']" , locateStrategy: 'xpath'},

		inputStartDate 						: { selector: "//*[@id = 'start-date']" , locateStrategy: 'xpath'},

		quickHelpPopup 						: { selector: "//h4[contains(., 'Everything ok?')]" , locateStrategy: 'xpath'},
		btnRestartQuote 					: { selector: "//h4[contains(., 'Everything ok?')]/..//button[contains(., 'Restart quote')]" , locateStrategy: 'xpath'},
	} 
};
