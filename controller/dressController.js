import Dress from "../model/dress.js"

const addDress = async (req, res) => {
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
        favorite , } = req.body;

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

const getAllDress = async (req, res) => {
  try {
    const dress = await Dress.findAll({ attributes: { exclude: ["createdAt","updatedAt"] } }); // Exclude timestamps if needed
    res.status(200).json(dress);
  } catch (err) {
    console.error("Error fetching Dress:", err);
    res.status(500).json({ error: err.message });
  }
};

 const getDressById = async (req, res) => {
  try {
    const dress = await Dress.findByPk(req.params.id); // ✅ Use `findByPk()`
    if (!dress) return res.status(404).json({ error: "Dress not found" });
    res.status(200).json(dress);
  } catch (err) {
    console.error("Error fetching Dress:", err);
    res.status(500).json({ error: err.message });
  }
};


import { Op } from "sequelize";

const getDressByName = async (req, res) => {
  try {
    const DressName = req.params.Dress_name.trim();  // Trim spaces from Dress name
    console.log("Searching for Dress:", DressName);

    if (!DressName) {
      return res.status(400).json({ error: "Dress name is required" });
    }

    // Log the Dress name to make sure it's being passed correctly
    console.log("Dress name after trimming:", DressName);

    // Perform the case-insensitive search using ILIKE
    const dress = await Dress.findAll({
      where: {
        Dress_name: {
          [Op.iLike]: `%${DressName}%`  // Case-insensitive search
        }
      },
      attributes: ["Dress_id","Dress_name", "thumbnailupload", "youtube_link"]
    });

    // Log the found Dress to see if they're being retrieved correctly
    console.log("Dress retrieved from the database:", Dress.map(Dress => Dress.Dress_name));

    if (dress.length === 0) {
      console.log("No Dress found with the name:", DressName);
      return res.status(404).json({ error: "No Dress found" });
    }

    res.status(200).json(dress);
  } catch (err) {
    console.error("Error fetching Dress:", err);
    res.status(500).json({ error: err.message });
  }
};


// Delete a Dress by ID
 const deleteDress = async (req, res) => {
  try {
    const dress = await Dress.findByPk(req.params.id);
    if (!dress) return res.status(404).json({ error: "Dress not found" });

    await dress.destroy(); // ✅ Use `destroy()` instead of `findByIdAndDelete()`
    res.status(200).json({ message: "Dress deleted successfully" });
  } catch (err) {
    console.error("Error deleting Dress:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateDress = async (req, res) => {
  try {
      const id = decodeURIComponent(req.params.id);
      // console.log("Updating profile picture for email:", email);
      // console.log("File Uploaded:", req.file);
    
      const {
        name ,
        date ,
        comment ,
        category ,
        season ,
        brand ,
        occasion ,
        last_worn_date ,
        times_worn ,
        favorite 
      } = req.body

      const dressimage = req.file ? req.file.filename:null;
      
      const dress = await Dress.findOne({where:{id}});
      if(!dress){
        return res.status(404).json({ message: "Dress not found" });
      }
      
      dress.name = name || dress.name;
      dress.date = date || dress.date;
      dress.comment = comment || dress.comment;
      dress.category = category || dress.category;
      dress.season = season || dress.season;
      dress.brand = brand || dress.brand;
      dress.occasion = occasion || dress.occasion;
      dress.last_worn_date = last_worn_date || dress.last_worn_date;
      dress.times_worn = times_worn || dress.times_worn;
      dress.favorite = favorite || dress.favorite;
      if(dressimage){
        dress.dressimage= dressimage;
      }
      await dress.save();
      res.json({
        message: "Dress updated successfully",
        updateDress:dress
      });
    }
    catch (err) {
      console.error("Error updating dress:", error);
      res.status(500).json({message:"update failed",error:error.message});
    }
  };

export default {
  addDress,
  getAllDress,
  getDressById,
  getDressByName,
  deleteDress,
  updateDress,
};