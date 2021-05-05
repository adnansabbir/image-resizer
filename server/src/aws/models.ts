export interface SQSMessageBody {
    fileUrl: string,
    fileSize: { height: number, width: number },
    fileName: string
}
