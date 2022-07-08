import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const extractText = async (src) => {
  const doc = await pdfjsLib.getDocument(src).promise;
  const page = await doc.getPage(1);
  return await page.getTextContent();
};
