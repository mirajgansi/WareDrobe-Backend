const Dress = require("../model/dress");

exports.addDress = async (req, res) => {
  try {
    const {
        id ,
        name ,
        date ,
        comment ,
        category ,
        season ,
        brand ,
        occasion ,
        last_worn_date ,
        times_worn ,
        favorite ,      } = req.body;

    const dressimage = req.file ? req.file.path : null;

    const newDress = await Dress.create({
         id ,
        name ,
        date ,
        comment ,
        category ,
        season ,
        brand ,
        occasion ,
        last_worn_date ,
        times_worn ,
        favorite ,  
        dressimage 
    });

    res.status(201).json(newDress);
  } catch (err) {
    console.error("Error adding Dress:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDress = async (req, res) => {
  try {
    const Dress = await Dress.findAll({ attributes: { exclude: ["timestamps"] } }); // Exclude timestamps if needed
    res.status(200).json(Dress);
  } catch (err) {
    console.error("Error fetching Dress:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get a single Dress by ID
exports.getDressById = async (req, res) => {
  try {
    const Dress = await Dress.findByPk(req.params.id); // ✅ Use `findByPk()`
    if (!Dress) return res.status(404).json({ error: "Dress not found" });
    res.status(200).json(Dress);
  } catch (err) {
    console.error("Error fetching Dress:", err);
    res.status(500).json({ error: err.message });
  }
};

const { Op } = require("sequelize");

exports.getDressByName = async (req, res) => {
  try {
    const DressName = req.params.Dress_name.trim();  // Trim spaces from Dress name
    console.log("Searching for Dress:", DressName);

    if (!DressName) {
      return res.status(400).json({ error: "Dress name is required" });
    }

    // Log the Dress name to make sure it's being passed correctly
    console.log("Dress name after trimming:", DressName);

    // Perform the case-insensitive search using ILIKE
    const Dress = await Dress.findAll({
      where: {
        Dress_name: {
          [Op.iLike]: `%${DressName}%`  // Case-insensitive search
        }
      },
      attributes: ["Dress_id","Dress_name", "thumbnailupload", "youtube_link"]
    });

    // Log the found Dress to see if they're being retrieved correctly
    console.log("Dress retrieved from the database:", Dress.map(Dress => Dress.Dress_name));

    if (Dress.length === 0) {
      console.log("No Dress found with the name:", DressName);
      return res.status(404).json({ error: "No Dress found" });
    }

    res.status(200).json(Dress);
  } catch (err) {
    console.error("Error fetching Dress:", err);
    res.status(500).json({ error: err.message });
  }
};


// Delete a Dress by ID
exports.deleteDress = async (req, res) => {
  try {
    const Dress = await Dress.findByPk(req.params.id);
    if (!Dress) return res.status(404).json({ error: "Dress not found" });

    await Dress.destroy(); // ✅ Use `destroy()` instead of `findByIdAndDelete()`
    res.status(200).json({ message: "Dress deleted successfully" });
  } catch (err) {
    console.error("Error deleting Dress:", err);
    res.status(500).json({ error: err.message });
  }
};