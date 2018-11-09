const verifyAPIVersion = (version) => {
	switch (version) {
		case 'v1':
		case 'v1.0':
		case 'v1.0.0':
		case '1':
		case '1.0':
		case '1.0.0':
		case 'ver1':
		case 'version1':
			return true
		default:
			console.log(`API call to version ${version} not supported`)
			return false
	}
}

module.exports = verifyAPIVersion