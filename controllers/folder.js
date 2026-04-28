import { getAllRootFilesByUser } from "../queries/file.js";
import { getAllRootFoldersByUser, getFolderById } from "../queries/folder.js";

export const getSelectFolder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const selectedFolder = await getFolderById(Number(id));
    // console.log(`view selected folder details: `, selectedFolder);

    res.render("pages/folder-content", {
      selectedFolder,
      childFolder: selectedFolder.child,
      childFiles: selectedFolder.files,
    });
    return;
  } catch (error) {
    return next(error);
  }
};
export const getAllFolders = async (req, res, next) => {
  try {
    const { id } = req.user;

    const rootFolders = await getAllRootFoldersByUser(Number(id));
    // rootFolders.map((folder) => console.log(folder.name));

    const rootFiles = await getAllRootFilesByUser(Number(id));
    res.render("pages/index", {
      allFolders: rootFolders,
      allFiles: rootFiles,
    });
    return;
  } catch (error) {
    next(error);
  }
};
