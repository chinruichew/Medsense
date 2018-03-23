const UserLevelScheme = require('../models/UserLevelScheme');
const UserLevelScoring = require('../models/UserLevelScoring');

module.exports = {
    ISO_DATE_FORMATTER: async(date) => {
        return new Date(date.substring(0, date.length - 1) + '-08:00');
    },
    UTC_DATE_FORMATTER: async(date) => {
        return new Date(date.substring(0, date.length - 1) + '+08:00');
    },
    CALCULATE_USER_LEVEL: async(xp) => {
        const userLevelScorings = await UserLevelScoring.find().sort({level: -1});
        let level = 1;
        for(let i = 0; i < userLevelScorings.length; i++) {
            const userLevelScoring = userLevelScorings[i];
            if(userLevelScoring.scoreNeeded <= xp) {
                level = userLevelScoring.level;
                break;
            }
        }
        return level;
    },
    CALCULATE_USER_RANK: async(level) => {
        const userLevelSchemes = await UserLevelScheme.find().sort({level: -1});
        let userRank = '';
        for(let i = 0; i < userLevelSchemes.length; i++) {
            const userLevelScheme = userLevelSchemes[i];
            if(userLevelScheme.level <= level) {
                userRank = userLevelScheme.rank;
                break;
            }
        }
        return userRank;
    }
};