const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    applier_id: {
        type: Schema.Types.ObjectId,
		required: true
    },
    application_perm_lvl: {
        type: Number,
		required: true
    },
    content: {
        type: String,
		required: true
    },
    approved_by: Schema.Types.ObjectId,
    approved_at: Date
});

applicationSchema.methods.approveApplicationAndSave = async function(_user){
    this.approved_by = _user;
    this.approved_at = new Date();
    await this.save();
}

applicationSchema.methods.rejectApplicationAndSave = async function(_user){
    // todo implement
    await this.save();
}

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;