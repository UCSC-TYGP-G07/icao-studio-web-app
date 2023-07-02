import {Button, Center, Container, Group, Image, Title} from "@mantine/core";
import {Dropzone} from "@mantine/dropzone";
import {useRef} from "react";
import FileImage from "../../assets/images/Add-Files-Image.svg";
import {FaPlus} from "react-icons/fa6";

function ImageUpload({ width, height }: ImageUploadProps){
    const openRef = useRef<() => void>(null);

    return(
        <Container>
            <Dropzone openRef={openRef} onDrop={() => {}}>
                <Center h={height}>
                    <Image width={96} height='auto' src={FileImage} alt='Dropzone' />
                    <Title order={3} mt='md'>Drag and drop image here!</Title>
                </Center>
            </Dropzone>
        </Container>
    )
}

interface ImageUploadProps{
    width: number;
    height: number;
}

export default ImageUpload;