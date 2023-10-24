const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET api/tours/all
 * @desc Получение всех сотрудников
 * @access Private
 */

const all = async (req, res) => {

    const lang = req.query.lang || '';

    try {
        const tours = await prisma.tour.findMany(lang && {
            where: {
                lang,
            },
        });

        res.status(200).json(tours);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};


/**
 * 
 * @route POST api/tours/add
 * @desc Добавление сотрудника
 * @access Private
 */

const add = async (req, res) => {
    const data = req.body;


    if (
        !data.lang ||
        !data.name ||
        !data.city ||
        !data.hotel ||
        !data.transport_depart ||
        !data.transport_arrive ||
        !data.price ||
        !data.btn_text
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const tour = await prisma.tour.create({
        data: {
            ...data,
            authorId: req.user.id,
        },
    });

    res.status(201).json(tour);
};


/**
 * 
 * @route POST api/tours/remove
 * @desc Удаление сотрудника
 * @access Private
 */

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.tour.delete({
            where: {
                id,
            },
        });

        res.status(200).json("OK");
    } catch (err) {
        res.status(500).json({ message: "Failed to delete" });
    }
};


/**
 * 
 * @route PUT api/tours/edit
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        await prisma.tour.update({
            where: {
                id,
            },
            data,
        });

        res.status(200).json("OK");
    } catch {
        res.status(500).json({ message: "Failed to edit" });
    }
};


/**
 * 
 * @route GET api/employees/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const tour = async (req, res) => {
    const { id } = req.params;

    try {
        const tour = await prisma.tour.findUnique({
            where: {
                id,
            },
        });

        res.status(200).json(tour);
    } catch {
        res.status(400).json({ message: "Failed to receive" });
    }
};

module.exports = {
    add,
    remove,
    edit,
    all,
    tour,
};