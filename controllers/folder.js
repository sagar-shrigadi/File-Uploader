import { getAllRootFilesByUser } from "../queries/file.js";
import { getAllRootFoldersByUser, getFolderById } from "../queries/folder.js";

export const getSelectFolder = async (req, res, next) => {
  try {
    const folderId = Number(req.params.id);
    if (isNaN(folderId)) {
      return res
        .status(404)
        .render("pages/404", { message: "Invalid Folder ID" });
    }

    const selectedFolder = await getFolderById(folderId);
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
    const userId = Number(req.user.id);

    const rootFolders = await getAllRootFoldersByUser(userId);
    // rootFolders.map((folder) => console.log(folder.name));

    const rootFiles = await getAllRootFilesByUser(userId);
    res.render("pages/index", {
      allFolders: rootFolders,
      allFiles: rootFiles,
    });
    return;
  } catch (error) {
    next(error);
  }
};
