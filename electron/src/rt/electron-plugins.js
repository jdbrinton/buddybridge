const { BrowserWindow } = require('electron');

class FacebookScraper {
	async scrapeDom() {
		const browser = new BrowserWindow({ show: false, webPreferences: { offscreen: true } });
		await browser.loadURL('https://www.facebook.com/');
		const data = await browser.webContents.executeJavaScript(
			"document.querySelector('title').textContent"
		);
		browser.close();
		return data;
	}
}

module.exports = {
	FacebookScraper: {
		FacebookScraper
	}
};
