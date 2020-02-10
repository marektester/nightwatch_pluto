describe('Only people aged 18-46 can be covered', () => {

    this.tags = ['single_trip', 'age'];
    
	it('should display error message for too young person', async client => {
        const Page = client.page;
        await Page.homePage().load();
        await Page.homePage().openSingleTripCover();
        await Page.singleTripCover().fillTripDetails("13/04/2020", "16/04/2020", "France", 0);
        await Page.singleTripCover().clickOnNext();
        await Page.singleTripCover().fillPersonalDetails("Josh Samsung", 12);

        Page.singleTripCover().verify.visible('@inputPersonAgeMsg');
        Page.singleTripCover().verify.containsText('@inputPersonAgeMsg', "Unfortunately we can only provide insurance to people aged 18 - 46");    
    });

	it('should display error message for too old person', async client => {
        const Page = client.page;
        await Page.homePage().load();
        await Page.homePage().openSingleTripCover();
        await Page.singleTripCover().fillTripDetails("22/08/2020", "29/08/2020", "Chile", 1);
        await Page.singleTripCover().clickOnNext();
        await Page.singleTripCover().fillPersonalDetails("Alan Parker", 88);

        Page.singleTripCover().verify.visible('@inputPersonAgeMsg');
        Page.singleTripCover().verify.containsText('@inputPersonAgeMsg', "Unfortunately we can only provide insurance to people aged 18 - 46");    
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