module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define("teams", {
        name: {
            type: Sequelize.STRING
        },
        region: {
            type: Sequelize.STRING
        },
        filename: {
            type: Sequelize.STRING
        }
    });

    return Team;
};