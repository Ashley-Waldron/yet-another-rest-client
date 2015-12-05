/**
 * General constants used within the application.
 */
clientApp.constant('GENERAL_CONSTANTS', {
	MAX_OBJECT_SIZE: 100000,
	INDENTATION_LEVEL: 2,
	DATE_FORMAT: 'MMM dd, yyyy HH:mm',
	HISTORY_KEY_FORMAT: 'yarc.history.',
	HEADER_KEY_FORMAT: 'yarc.header.',
	FAVORITE_KEY_FORMAT: 'yarc.favorite.',
	EXPORT_FILE_NAME: 'yarc_favorites.json',
	MAX_IMPORT_FILE_SIZE: 50000
});


/**
 * Common request headers.
 */
clientApp.constant('EXAMPLE_HEADERS', [ {
		id : "accept",
		name : "Accept",
		value : "application/json"
	}, {
		id : "accept_charset",
		name : "Accept-Charset",
		value : "utf-8"
	}, {
		id : "app_id",
		name : "ApplicationId",
		value : "36"
	}, {
		id : "auth",
		name : "Authorization",
		value : "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=="
	}, {
		id : "cache",
		name : "Cache-Control",
		value : "no-cache"
	}, {
		id : "content",
		name : "Content-Type",
		value : "application/json"
	}, {
		id : "user_agent",
		name : "User-Agent",
		value : "yarc-rest-client"
	} ]
);
