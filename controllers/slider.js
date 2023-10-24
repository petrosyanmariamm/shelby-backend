const { prisma } = require("../prisma/prisma-client");


/**
 * @route GET api/slider/all
 * @desc Получение всех сотрудников
 * @access Private
 */

const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {

        const slider = await prisma.slider.findMany(lang && {
            where: {
                lang,
            },
        });

        res.status(200).json(slider);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


/**
 * 
 * @route POST api/employees/add
 * @desc Добавление сотрудника
 * @access Private
 */

const add = async (req, res) => {
    const data = req.body;

    if (!data.lang || !data.title || !data.image || !data.btn_text) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const slider = await prisma.slider.create({
        data: {
            ...data,
            authorId: req.user.id,
        },
    });
    res.status(201).json(slider);
};


/**
 * 
 * @route POST api/employees/remove
 * @desc Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.slider.delete({
            where: {
                id,
            },
        });
        res.status(200).json("OK");
    } catch {
        res.status(500).json({ message: "Failed to delete" });
    };
};

/**
 * 
 * @route PUT api/employees/edit
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await prisma.slider.update({
            where: {
                id,
            },
            data,
        });
        res.status(200).json("OK");
    } catch (error) {
        res.status(500).json({message: "Failed to edit"});
    };
};

/**
 * 
 * @route GET api/employees/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const slide = async (req, res) => {
    const { id } = req.params;

    try {
        const slider = await prisma.slider.findUnique({
            where: {
                id,
            },
        });
        res.status(200).json(slider);
    } catch (error) {
        res.status(400).json({ message: "Failed to receive" });
    };
};

module.exports = {
    all,
    add,
    remove,
    edit,
    slide,
};