const {List} = require("../models/list.model");
const {User} = require("../models/user.model");
const {ListItem} = require("../models/list.items.model");

class ListService {
    async findAll(user_id) {
        try {
            const lists = await User.findAll({
                where: {id: user_id,},
                attributes: ['id'],
                include: [{model: List, include: ListItem,},],
            })
            return lists;
        } catch (error) {
            console.error("Error in findAll:", error);
            return false;
        }
    }

    async findById(id) {
        try {
            const list = await List.findByPk(id);
            return list;
        } catch (error) {
            console.error("Error in findById:", error);
            return false;
        }
    }

    async create(list) {
        try {
            const createdList = await List.create(list);
            return createdList;
        } catch (error) {
            console.error("Error in create:", error);
            return false;
        }
    }

    async destroy(id) {
        try {
            const deletedRowCount = await List.destroy({where: {id}});
            return deletedRowCount > 0;
        } catch (error) {
            console.error("Error in destroy:", error);
            return false;
        }
    }

    async update(list) {
        try {
            const [updatedRowCount] = await List.update(list, {
                where: {id: list.id},
            });
            return updatedRowCount > 0;
        } catch (error) {
            console.error("Error in update:", error);
            return false;
        }
    }
}

module.exports = {
    ListService,
};
