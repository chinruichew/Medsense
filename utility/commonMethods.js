const UserLevelScheme = require('../models/UserLevelScheme');
const ContributionLevelScheme = require('../models/ContributionLevelScheme');
const UserLevelScoring = require('../models/UserLevelScoring');

module.exports = {
    ISO_DATE_FORMATTER: async(date) => {
        return new Date(date.substring(0, date.length - 1) + '-08:00');
    },
    UTC_DATE_FORMATTER: async(date) => {
        return new Date(date.substring(0, date.length - 1) + '+08:00');
    },
    // CALCULATE_USER_LEVEL: async(xp) => {
    //     const userLevelScorings = await UserLevelScoring.find().sort({level: -1});
    //     let level = 1;
    //     for(let i = 0; i < userLevelScorings.length; i++) {
    //         const userLevelScoring = userLevelScorings[i];
    //         if(userLevelScoring.scoreNeeded <= xp) {
    //             level = userLevelScoring.level;
    //             break;
    //         }
    //     }
    //     return level;
    // },
    CALCULATE_USER_LEVEL: async(xp) => {
        let level;
        if (xp<480){
            level = 1;
        } else {
            level = Math.floor((120 + Math.sqrt(120**2-4*120*(240-xp)))/(2*120));
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
    },
    CALCULATE_CONTRIBUTION_RANK: async(points) => {
        const contributionSchemes = await ContributionLevelScheme.find().sort({points: -1});
        let rank = '';
        for(let i = 0; i < contributionSchemes.length; i++) {
            const contributionScheme = contributionSchemes[i];
            if(contributionScheme.points <= points) {
                rank = contributionScheme.rank;
                break;
            }
        }
        return rank;
    }
};