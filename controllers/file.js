import { supabaseStorage } from "../lib/supabse.js";
import { getFileById } from "../queries/file.js";

export const downloadSelectFile = async (req, res, next) => {
  const { fileId } = req.params;
  if (isNaN(fileId)) {
    return res.status(404).render("pages/404", { message: "Invalid File ID" });
  }

  try {
    const selectedFile = await getFileById(Number(fileId));
    console.log(selectedFile);
    // download file using supabase
    const { data, error } = await supabaseStorage
      .from("images")
      .download(selectedFile.url);

    if (error) throw error;

    const buffer = Buffer.from(await data.arrayBuffer());

    res.set({
      "Content-type": selectedFile.mimetype,
      "Content-disposition": `attachment; filename="${selectedFile.name}"`,
      "Content-Length": buffer.length,
    });
    return res.send(buffer);
  } catch (error) {
    next(error);
  }
};
