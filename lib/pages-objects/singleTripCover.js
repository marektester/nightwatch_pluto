var pageFunctions = {
	elementTimeout : function() {return this.api.globals.elementTimeout},
	loaderTimeout : function() {return this.api.globals.loaderTimeout},


	fillTripDetails: async function (startDate, endDate, country = "Poland", otherTravellers = 0) {
		await this.click('@inputStartDate');
		await this.api.page.datapicker().selectDate(startDate);
		
		await this.click('@inputEndDate');
		await this.api.page.datapicker().selectDate(endDate);

		await this.clearValue('@inputCountry');
		await this.setValue('@inputCountry', [country, this.api.Keys.ENTER]);

		switch (otherTravellers){
			case 0:
				await this.click('@inputJustMe');
				break;
			case 1:
				await this.click('@inputTwoOfUs');
				break;
			case 2:
				await this.click('@inputThreeOfUs');
				break;
			default:
				await this.click('@inputJustMe');
				break;
		}
	},

	fillPersonalDetails: async function (name, age, medical) {
		await this.clearValue('@inputPersonName');
		await this.setValue('@inputPersonName', name);
		await this.clearValue('@inputPersonAge');
		await this.setValue('@inputPersonAge', age);

		switch (medical){
			case true:
				await this.click('@inputDontHaveMedical');
				break;
			case false:
				await this.click('@inputHaveMedical');
				break;
			default:
				await this.click('@inputDontHaveMedical');
				break;
		}
	},

	isEnabledBtnNext: async function () {
		const result = await this.getCssProperty('@btnNext', 'cursor');
		return result.value === "pointer"
	},

	clickOnNext: async function () {
		const isEnabledBtnNext = await this.isEnabledBtnNext();
		await this.assert.ok(isEnabledBtnNext);
		await this.click('@btnNext');	
	},
};

module.exports = {
	commands: [pageFunctions],
	elements: {
		//Trip form
		inputStartDate 			: { selector: "//*[@id = 'start-date']" , locateStrategy: 'xpath'},
		inputEndDate 			: { selector: "//*[@id = 'end-date']" , locateStrategy: 'xpath'},
		inputCountry 			: { selector: "//*[contains(@id, 'react-select')]" , locateStrategy: 'xpath'},
		inputJustMe 			: { selector: "//*[@name = 'coverQuantity' and @value = '0']" , locateStrategy: 'xpath'},
		inputTwoOfUs			: { selector: "//*[@name = 'coverQuantity' and @value = '1']" , locateStrategy: 'xpath'},
		inputThreeOfUs 			: { selector: "//*[@name = 'coverQuantity' and @value = '2']" , locateStrategy: 'xpath'},
		btnAddDestination		: { selector: "//button[contains(., 'Add another destination')]", locateStrategy: 'xpath'},
		countryField 			: { selector: "//*[contains(@class, 'country_select_control')]/div", locateStrategy: 'xpath'},

		//Personal form
		inputPersonName			: { selector: "//*[@id = 'username']" , locateStrategy: 'xpath'},
		inputPersonNameMsg		: { selector: "//*[@id = 'username-helper-text']" , locateStrategy: 'xpath'},		
		inputPersonAge			: { selector: "//*[@id = 'age']" , locateStrategy: 'xpath'},
		inputPersonAgeMsg		: { selector: "//*[@id = 'age-helper-text']" , locateStrategy: 'xpath'},
		inputDontHaveMedical	: { selector: "//*[@name = 'medical' and @value = 'true']" , locateStrategy: 'xpath'},
		inputHaveMedical		: { selector: "//*[@name = 'medical' and @value = 'false']" , locateStrategy: 'xpath'},
		
		btnNext					: { selector: "//button[contains(., 'Next')]" , locateStrategy: 'xpath'},
	}
};
