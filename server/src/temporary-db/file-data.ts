export interface FileDataModel {
    fileUrl: string,
    fileSize: { height: number, width: number },
    fileName: string;
    fileId: string;
    status: 'RequestSubmitted' | 'InQueue' | 'Failed' | 'Success'
}

export const FileData: { [id: string]: FileDataModel } = {};

export const StoreFileDateToDB = (data: FileDataModel[]) => {
    data.forEach(d => {
        FileData[d.fileId] = {...d};
    });
}

export const GetFileDateFromDB = (fileIds: string[]): FileDataModel[] => {
    const data: FileDataModel[] = []
    fileIds.forEach(id => data.push(FileData[id]));
    return data;
}

export const UpdateFileStatus = (fileId: string, status: 'RequestSubmitted' | 'InQueue' | 'Failed' | 'Success'): void => {
    FileData[fileId].status = status;
}
