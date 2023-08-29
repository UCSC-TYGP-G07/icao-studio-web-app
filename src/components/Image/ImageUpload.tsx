import {Button, Center, Container, Group, Image, Title} from "@mantine/core";
import {Dropzone} from "@mantine/dropzone";
import {useRef, useState} from "react";
import FileImage from "../../assets/images/Add-Files-Image.svg";
import {FaPlus} from "react-icons/fa6";
import PassportImage from '../../assets/passport-image.jpg';

function ImageUpload({ width, height }: ImageUploadProps){
    const openRef = useRef<() => void>(null);
    const [showImage, setShowImage] = useState(true);

    return(
        <Container>
            {showImage && <Image width={width} src={PassportImage} /> }
            {!showImage && <Dropzone openRef={openRef} onDrop={() => setShowImage(true)}>
                <Center h={height}>
                    <Image width={96} height='auto' src={FileImage} alt='Dropzone' />
                    <Title order={3} mt='md'>Drag and drop image here!</Title>
                </Center>
            </Dropzone>
            }
        </Container>
    )
}

interface ImageUploadProps{
    width: number;
    height: number;
}

export default ImageUpload;