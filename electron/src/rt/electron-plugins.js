const { BrowserWindow, session } = require('electron');
const { randomBytes } = require('crypto');

function randomId(length = 5) {
	return randomBytes(length).toString('hex');
}

class ElectronBrowser {
	constructor() {
		this.windows = new Map();
	}

	async createWindow(options = {}) {
		const { partition = 'persist:default', show = false, offscreen = true } = options;
		const customSession = session.fromPartition(partition);
		const browser = new BrowserWindow({
			show,
			webPreferences: {
				session: customSession,
				offscreen,
				devTools: true
			}
		});

		// Force a more standard user-agent. Some sites do not like the default Electron UA.
		browser.webContents.setUserAgent(
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
				'(KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
		);

		// For debugging: open devtools if show = true
		if (show) {
			browser.webContents.openDevTools({ mode: 'detach' });
		}

		// Debug load failures
		browser.webContents.on('did-finish-load', () => {
			console.log(`Window ${partition} -> did-finish-load`);
		});
		browser.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
			console.log(`Window ${partition} -> did-fail-load`, {
				errorCode,
				errorDescription,
				validatedURL
			});
		});
		browser.webContents.on('console-message', (event, level, message, line, sourceId) => {
			console.log(`Offscreen console: [${level}] ${message} (line ${line}, ${sourceId})`);
		});

		const windowId = randomId();
		this.windows.set(windowId, browser);
		return windowId;
	}

	async closeWindow(windowId) {
		const bw = this.windows.get(windowId);
		if (!bw) return;
		if (!bw.isDestroyed()) {
			bw.close();
		}
		this.windows.delete(windowId);
	}

	async loadURL(windowId, url) {
		const bw = this.windows.get(windowId);
		if (!bw) throw new Error(`No BrowserWindow found for ID: ${windowId}`);
		await bw.loadURL(url);
	}

	async executeJavaScript(windowId, code) {
		const bw = this.windows.get(windowId);
		if (!bw) throw new Error(`No BrowserWindow found for ID: ${windowId}`);
		// This can throw if the code itself has an error, or the page is not accessible
		return bw.webContents.executeJavaScript(code);
	}

	async clearSessionData(partitionKey) {
		const s = session.fromPartition(partitionKey);
		await s.clearStorageData();
	}
}

module.exports = {
	ElectronBrowser: {
		ElectronBrowser
	}
};
