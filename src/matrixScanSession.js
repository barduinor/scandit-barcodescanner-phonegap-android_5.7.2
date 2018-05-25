
function MatrixScanSession(newlyTrackedCodes) {
	this.newlyTrackedCodes = newlyTrackedCodes;
	this.rejectedTrackedCodes = [];
}

MatrixScanSession.prototype.rejectTrackedCode = function(code) {
	this.rejectedTrackedCodes.push(code.uniqueId);
}

module.exports = MatrixScanSession;
