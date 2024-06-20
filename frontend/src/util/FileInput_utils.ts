import { Dispatch, SetStateAction } from "react";

export type fileOnDragEvent = React.DragEvent<HTMLLabelElement>

export type handleDropType = {
    event: fileOnDragEvent,
    setFile:  Dispatch<SetStateAction<any>>,
    setselectedFile: Dispatch<SetStateAction<any>>
}

export type handleFileChangeType =  {
    event: React.ChangeEvent<HTMLInputElement>,
    setFile:  Dispatch<SetStateAction<any>>,
    setselectedFile: Dispatch<SetStateAction<any>>
}

export const handleFileChange = ({event, setFile, setselectedFile}: handleFileChangeType) => {
    if (!event.target.files) return
    const file = event.target.files[0]
    setFile(file) // this will be use for the backend

    // this will make it so that we can load the file in the front end without saving in the backend
    // Warning!!. Please do not use the selectedFile to send it to backend because it will not be read by multer and other libraries
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            setselectedFile(e.target.result)
        }
        reader.readAsDataURL(file)
    }
}

export const handleDrop = ({event, setFile, setselectedFile}: handleDropType) : void => {
    event.preventDefault()
     // setting the file that is gonna be sent to the backend
    const droppedFile = event.dataTransfer.files[0]
    setFile(droppedFile)

    // this will make it so that we can load the file in the front end without saving in the backend
    // Warning!!. Please do not use the selectedFile to send it to backend because it will not be read by multer and other libraries
    if(droppedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            setselectedFile(e.target.result)
        }
        reader.readAsDataURL(droppedFile)
    }
}

export const handleDragOver = (event: fileOnDragEvent) => {
    event.preventDefault()
}