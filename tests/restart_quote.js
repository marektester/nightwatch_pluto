describe('After restart Single trip cover quote form', () => {

    this.tags = ['single_trip', 'restart'];
    
	test.skip('user should be navigated to home page', async client => {
        const Page = client.page;
        await Page.homePage().load();
        await Page.homePage().openSingleTripCover();
        await Page.singleTripCover().fillTripDetails("28/05/2020", "15/07/2020", "Chile", 0);
        //Confirmation that form is valid 
        const isEnabledBtnNext = await Page.singleTripCover().isEnabledBtnNext();
        await client.assert.ok(isEnabledBtnNext);
        await Page.homePage().restartQuote();
        Page.homePage().verify.visible('@btnSingleTripCover');
        Page.homePage().verify.visible('@btnAnnualCover');
    });

    test('quote form fields should be empty or default', async client => {
        const Page = client.page;
        await Page.homePage().load();
        await Page.homePage().openSingleTripCover();
        await Page.singleTripCover().fillTripDetails("28/05/2020", "15/07/2020", "Chile", 0);
        //Confirmation that form is valid 
        const isEnabledBtnNext = await Page.singleTripCover().isEnabledBtnNext();
        await client.assert.ok(isEnabledBtnNext);
        await Page.homePage().restartQuote();
        await Page.homePage().openSingleTripCover();

        Page.singleTripCover().verify.value('@inputStartDate', client.globals.convertDate());
        Page.singleTripCover().verify.value('@inputEndDate', client.globals.convertDate(1));
        Page.singleTripCover().verify.not.containsText('@countryField', "Chile");
    });

	afterEach(async client => {
		if (client.sessionId != null) {
			if (client.options.tag_filter != "debug"){
				await client.saveResultScreenshot();
				client.end();
            } else {
                await client.closeSessionManager(); //Keep browser window and display info dialog in case of error in Debug mode
            }
        }
    });
});