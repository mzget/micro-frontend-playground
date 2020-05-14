import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

type EnhancedCSVProps = {
    component: React.ComponentType<any>;
    fileName: string;
    dataSource?: any[];
    exportAction?: (cb: (data: any) => void) => void;
};

function EnhancedCSV({
    component: Component,
    fileName,
    dataSource,
    exportAction,
}: EnhancedCSVProps) {
    const dispatch = useDispatch();

    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = useCallback((csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }, []);

    const callback = useCallback(
        data => {
            exportToCSV(data, fileName);
        },
        [exportToCSV, fileName]
    );
    const exportHandler = useCallback(() => {
        if (exportAction) dispatch(exportAction(callback));
    }, [callback, dispatch, exportAction]);

    const onComponentClick = useCallback(() => {
        if (exportAction) {
            exportHandler();
        } else {
            exportToCSV(dataSource, fileName);
        }
    }, [dataSource, exportAction, exportHandler, exportToCSV, fileName]);

    return (
        <Component
            disabled={dataSource && dataSource.length === 0 ? true : false}
            onClick={onComponentClick}
            // loading={true}
            id="export-component"
        />
    );
}

export default React.memo(EnhancedCSV);
