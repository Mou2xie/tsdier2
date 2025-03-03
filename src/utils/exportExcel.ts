import * as XLSX from 'xlsx';
import { StoredWord } from "@/models/StoredWord";
import localforage from "localforage";


async function exportToExcel() {

    // file name
    const fileName = `word-list-${new Date().getDate()}-${new Date().getMonth()}.xlsx`;
    
    const data: StoredWord[] = [];

    // get all stored words form localforage
    await localforage.iterate<StoredWord, void>((value) => {
        data.push(value);
    });

    // 1. create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 2. create workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // 3. generate buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // 4. create Blob and URL
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    // 5. revoke URL
    URL.revokeObjectURL(url);
}

export { exportToExcel };