const mongoose = require('mongoose')

const teamMembersSchema = new mongoose.Schema({
    name : {type: String, required:true},
    role: {type: String, required:true},
    bio: {type: String, required:true},
    avatar: {type: String, required:true},
},{timestamps: true});

const TeamMember = mongoose.models.TeamMembers || mongoose.model('TeamMembers',teamMembersSchema,'teamMembers');

export default TeamMember;