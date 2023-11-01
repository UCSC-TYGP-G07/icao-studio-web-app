import {Dropzone, FileWithPath, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {Box, Button, Center, Flex, Image, LoadingOverlay, Text} from "@mantine/core";
import PlaceholderImage from "../../assets/images/dropzone-image/Dropzone-Image.png";
import {useEffect, useRef, useState} from "react";
import {PhotoUploadState} from "../../pages/Reference/ReferenceId";

function ImageUpload({ width, height, uploadState, setUploadState, showErrorMessage,checkImageValidity, imageChecking }: ImageUploadProps){
    /* Dropzone open ref */
    const fileOpenRef = useRef<() => void>(null);

    const [ selectedFile, setSelectedFile ] = useState<FileWithPath | null>(null);
    const [ selectFileType, setSelectFileType ] = useState<string | null>(null);

    const handleImageDrop = (images: FileWithPath[]) => {
        /* Saving image into localStorage, replace dropzone */
        const file = images[0];
        const imageType = images[0].name.split('.')[1];

        /* Display selected file */
        setSelectedFile(file);
        setSelectFileType(imageType);

        setUploadState(PhotoUploadState.SELECTED_IMAGE);
    }

    const removeImageHandler = () => {
        /* Remove current selected image */
        setSelectedFile(null);

        setUploadState(PhotoUploadState.EMPTY_IMAGE);
    }

    const handleImageSubmission = () => {

        if(selectFileType) {
            setUploadState(PhotoUploadState.CHECKING_IMAGE);
            checkImageValidity(selectedFile!);
        } else {
            showErrorMessage('Image not properly selected! Please try again');
        }
    }

    return (
        <>
            { uploadState === PhotoUploadState.EMPTY_IMAGE &&
                <>
                    <Dropzone openRef={fileOpenRef} w={width} h={height - 32} onDrop={(images) => handleImageDrop(images)} accept={IMAGE_MIME_TYPE} maxSize={5 * 1024 ** 2} multiple={false} style={{ border: 1, borderStyle: 'solid' }}>
                        <Flex w={width - 32} h={height - 32} direction='column' align='center' justify='center'>
                            <Image maw={width * 0.3} mb={16} src={PlaceholderImage}/>
                            <Text>Click to select image or drag the image</Text>
                        </Flex>
                    </Dropzone>
                    <Center mt={16}>
                        <Button variant='filled' color='primary' onClick={() => fileOpenRef.current!()}>Select image</Button>
                    </Center>
                </>}
            {
                ( uploadState !== PhotoUploadState.EMPTY_IMAGE) &&
                <Box pos='relative'>
                    <LoadingOverlay visible={uploadState === PhotoUploadState.CHECKING_IMAGE} overlayBlur={2} />
                    <Image src={URL.createObjectURL(selectedFile!)} maw={width * 0.9} />

                    { ( uploadState === PhotoUploadState.SELECTED_IMAGE ) &&
                        <Center mt={16}>
                            <Button variant='light' color='primary' onClick={removeImageHandler} mr={12} disabled={imageChecking}>Remove image</Button>
                            <Button variant='filled' color='primary' onClick={handleImageSubmission} loading={imageChecking}>Check image</Button>
                        </Center>
                    }

                    {
                        (uploadState === PhotoUploadState.CHECKED_INVALID_IMAGE) &&
                        <Center mt={16}>
                            <Button variant='light' color='primary' onClick={removeImageHandler} mr={12} disabled={imageChecking}>Remove image</Button>
                            <Button variant='filled' color='primary' onClick={handleImageSubmission} loading={imageChecking}>Re-Check image</Button>
                        </Center>
                    }

                    {
                        (uploadState === PhotoUploadState.CHECKED_VALID_IMAGE) &&
                        <Center mt={16}>
                            <Button variant='light' color='primary' onClick={removeImageHandler} mr={12} disabled={imageChecking}>Remove image</Button>
                            <Button variant='filled' color='primary' onClick={handleImageSubmission} loading={imageChecking}>Re-Check image </Button>
                        </Center>
                    }
                </Box>
            }
        </>
    );
}

interface ImageUploadProps{
    width: number;
    height: number;
    uploadState: PhotoUploadState;
    setUploadState: React.Dispatch<React.SetStateAction<PhotoUploadState>>;
    showErrorMessage: (errorText: string) => void;
    checkImageValidity: (file: FileWithPath) => any;
    imageChecking: boolean;
}

export default ImageUpload;