declare global {
	interface Window {
		CapacitorCustomPlatform?: {
			plugins: {
				ElectronBrowser: {
					createWindow(options?: {
						partition?: string;
						show?: boolean;
						offscreen?: boolean;
					}): Promise<string>;
					closeWindow(windowId: string): Promise<void>;
					loadURL(windowId: string, url: string): Promise<void>;
					executeJavaScript(windowId: string, code: string): Promise<any>;
					clearSessionData(partitionKey: string): Promise<void>;
				};
			};
		};
	}
}
