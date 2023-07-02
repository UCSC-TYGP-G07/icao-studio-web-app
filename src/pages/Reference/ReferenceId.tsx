import {Button, Center, Container, Flex, Text, Title} from "@mantine/core";
import Navbar from "../../components/Navbar";
import {useParams} from "react-router-dom";
import Bottombar from "../../components/Bottombar";
import {useViewportSize} from "@mantine/hooks";
import ImageUpload from "../../components/Image/ImageUpload";
import {FaCheck, FaShuffle} from "react-icons/fa6";
import ValidityProgress, {ProgressItemProps, ProgressProps, ProgressStatus} from "../../components/ValidityProgress";

function ReferenceId(){
    /* Getting the reference id from params */
    const { redId } = useParams();
    const { width, height } = useViewportSize();

    const progress: Array<ProgressItemProps>= [{index: 1, status: ProgressStatus.success, text: 'Please select your image to upload'}, {index: 2, status: ProgressStatus.success, text: 'Image should be 2 inch by 2 inch'}, {index: 3, status: ProgressStatus.error, text: 'Image should have proper bright ...'}, {index: 4, status: ProgressStatus.error, text: 'Face should be in proper angle'}, {index: 5, status: ProgressStatus.error, text: 'Face should in proper light backgr ...'}];

    return (
        <>
            <Navbar />
            <Flex direction='row' align='stretch' justify='stretch' w={width} h={height - 96}>
                <Flex direction='column' pl={128} justify='center' my={24} w={width / 2}>
                    <Title order={1} my={8}>Theodore Gunasekara</Title>
                    <Center>
                        <Container p={4} mx={4} bg='grey.0' style={{ borderRadius: 4}}>NIC Number - 843521817V</Container>
                        <Container p={4} mx={4} bg='grey.0' style={{ borderRadius: 4}}>Telephone Number - 076 332 1723</Container>
                    </Center>
                    <Title order={3} mt={24}>Checking the validity of the image</Title>
                    <ValidityProgress progress={progress}/>
                    <Center>
                        <Button color='primary' variant='light' mx={8} leftIcon={<FaShuffle />}>Check validity</Button>
                        <Button color='primary' variant='filled' mx={8} leftIcon={<FaCheck />}>Submit</Button>
                    </Center>
                </Flex>
                <Center>
                    <ImageUpload width={width * 0.3} height={height * 0.6} />
                </Center>
            </Flex>
            <Bottombar />
        </>

    );
}

export default ReferenceId;