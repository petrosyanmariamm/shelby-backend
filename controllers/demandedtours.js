const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET api/demandedtour/all
 * @desc Получение всех горяъих туров
 * @access Private
 */

const all = async (req, res) => {

  const lang = req.query.lang || '';

  try {
    const tours = await prisma.demandedtour.findMany(lang && {
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
 * @route POST api/demandedtour/add
 * @desc Добавление тура
 * @access Private
 */

const add = async (req, res) => {
  const data = req.body;

  if (!data.lang || !data.title || !data.descr || !data.image || !data.btn_text) {
    return res.status(400).json({ data: "All fields are required" });
  }

  const tour = await prisma.demandedtour.create({
    data: {
      ...data,
      authorId: req.user.id
    },
  });

  res.status(201).json(tour);
};


/**
 * 
 * @route POST api/demandedtour/remove/:id
 * @desc Удаление тура
 * @access Private
 */

const remove = async (req, res) => {

  const id = req.params.id;

  try {
    await prisma.demandedtour.delete({
      where: {
        id,
      },
    });

    res.status(200).json("OK");
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete" });
  }
};


/**
 * 
 * @route PUT api/demandedtour/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */

const edit = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  try {
    await prisma.demandedtour.update({
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
 * @route GET api/demandedtour/:id
 * @desc Полчуние сотрудника
 * @access Private
 */

const demandedtour = async (req, res) => {
  const { id } = req.params;

  try {
    const tour = await prisma.demandedtour.findUnique({
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
  demandedtour,
};