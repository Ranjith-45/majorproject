import Project from '../models/project.model.js';

/**
 * CREATE NEW PROJECT
 * Triggered by the "New Project" button on the dashboard.
 */
export const createProject = async (req, res) => {
  try {
    const { name, designData } = req.body;
    
    const newProject = new Project({
      name: name || "Untitled Blueprint",
      owner: req.user.id, // Attached by protectRoute middleware
      designData: designData || { rooms: [], doors: [] },
      settings: req.user.settings // Inherit user's default neon theme/units
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: "FAILED_TO_INITIALIZE_PROJECT", error: error.message });
  }
};

/**
 * GET ALL USER PROJECTS
 * Populates the Dashboard grid.
 */
export const getMyProjects = async (req, res) => {
  console.log("req ",req)
  try {
    // Only fetch projects belonging to the logged-in user
    const projects = await Project.find({ owner: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "ERROR_FETCHING_DASHBOARD", error: error.message });
  }
};

/**
 * GET SINGLE PROJECT BY ID
 * Used by the Editor to load a specific blueprint.
 */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, owner: req.user.id });
    
    if (!project) {
      return res.status(404).json({ message: "PROJECT_NOT_FOUND_OR_ACCESS_DENIED" });
    }
    
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "ERROR_LOADING_EDITOR_DATA" });
  }
};

/**
 * UPDATE PROJECT (SAVE)
 * Triggered when the user hits "Save" in the Editor.
 */
export const updateProject = async (req, res) => {
  try {
    const { name, designData, settings } = req.body;
    
    const updatedProject = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { name, designData, settings, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "UPDATE_FAILED: PROJECT_NOT_FOUND" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: "DATA_VALIDATION_ERROR", error: error.message });
  }
};

/**
 * DELETE PROJECT
 */
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findOneAndDelete({ 
      _id: req.params.id, 
      owner: req.user.id 
    });

    if (!deletedProject) {
      return res.status(404).json({ message: "DELETE_FAILED: UNAUTHORIZED" });
    }

    res.status(200).json({ message: "PROJECT_DELETED_SUCCESSFULLY" });
  } catch (error) {
    res.status(500).json({ message: "SERVER_ERROR_ON_DELETE" });
  }
};