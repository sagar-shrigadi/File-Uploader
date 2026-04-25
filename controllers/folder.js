import { getAllFoldersByUser, getFolderById } from "../queries/folder.js";

export const getSelectFolder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const selectedFolder = await getFolderById(Number(id));
    // console.log(`view selected folder details: `, selectedFolder);

    res.render("pages/folder-content", { selectedFolder });
    return;
  } catch (error) {
    return next(error);
  }
};
export const getAllFolders = async (req, res, next) => {
  try {
    const { id } = req.user;
    const allFoldersByCurrentUser = await getAllFoldersByUser(Number(id));
    // allFoldersByCurrentUser.map((folder) => console.log(folder.name));
    res.render("pages/index", { allFolders: allFoldersByCurrentUser });
    return;
  } catch (error) {
    next(error);
  }
};
