var pageFunctions = {
	elementTimeout : function() {return this.api.globals.elementTimeout},
	loaderTimeout : function() {return this.api.globals.loaderTimeout},

	selectDate: async function (date) {
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		const _date = date.split("/");
		const day = _date[0]
		const monthAndYear = monthNames[_date[1]-1] + " " + _date[2];

		let currentMonthAndYear = await this.getText('@currentMonth');

		if (currentMonthAndYear.value === monthAndYear){
			this.api.globals.debugMsg(`Already selected month and year: ${monthAndYear}`);
		} else {
			await this.click('@btnToday');
			while (currentMonthAndYear.value != monthAndYear){
				await this.click('@btnNextMonth');
				currentMonthAndYear = await this.getText('@currentMonth');
			}
		}
		await this.click(`//*[@role = 'dialog']//button[. = '${day}'and @tabindex = 0]`);
		await this.waitForElementNotPresent('@btnToday', this.loaderTimeout());
	},
};

module.exports = {
	commands: [pageFunctions],
	elements: {
		//*[@role = 'dialog']
		btnPrevMonth			: { selector: "//*[@role = 'dialog']/div/div/div/div[2]/div/button[1]" , locateStrategy: 'xpath'},
		btnPrevMonth			: { selector: "//*[@role = 'dialog']/div/div/div/div[2]/div/button[1]" , locateStrategy: 'xpath'},
		currentMonth			: { selector: "//*[@role = 'dialog']/div/div/div/div[2]/div/div/p" , locateStrategy: 'xpath'},
		btnNextMonth			: { selector: "//*[@role = 'dialog']/div/div/div/div[2]/div/button[2]" , locateStrategy: 'xpath'},
		btnToday				: { selector: "//button[. = 'Today']" , locateStrategy: 'xpath'},
	}
};
