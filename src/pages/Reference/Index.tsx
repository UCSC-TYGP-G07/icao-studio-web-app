import {
    Button,
    Center,
    Container,
    Flex, NumberInput,
    SegmentedControl,
    SegmentedControlItem,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import Navbar from "../../components/Navbar";
import Bottombar from "../../components/Bottombar";
import {useViewportSize} from "@mantine/hooks";
import {useState} from "react";
import {FaArrowRight} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

function Index(){
    const segData: Array<SegmentedControlItem> = [{label: 'Reference', value: 'reference'}, {label: 'QR Code', value: 'qr-code'}];
    const { width, height } = useViewportSize();
    const [segValue, setSegValue] = useState(segData[0].value);

    const [referenceNum, setReferenceNum] = useState('127123418769');
    const [buttonDisable, setButtonDisable] = useState(false);

    /* Using react router navigator to navigate */
    const navigate = useNavigate();

    function handleReferenceNumChange(newValue: string): void{
        /* First check whether the new value is 12 digit long number */
        const validReg = /[0-9]{12}/;
        if(validReg.test(newValue)){
            /* If the new value is valid, set the state */
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }

        setReferenceNum(newValue);
    }

    return (
        <>
            <Navbar />
            <Flex direction='column' align='center' justify='center' h={height - 96} py='auto' mx='auto'>
                <Title  order={1} align='center' my={16}>Upload your passport image Now!</Title>
                <Center>
                    <SegmentedControl color='primary.4' data={segData} value={segValue} onChange={setSegValue} />
                </Center>
                <Flex align='center' justify='center' direction='column' h={height * 0.3} w={width * 0.4} my={12} bg='primary.0' style={{ borderRadius: 10}}>
                    <TextInput size='lg' placeholder='1271 2341 8769' value={referenceNum} onChange={(e) => handleReferenceNumChange(e.target.value)} error={buttonDisable} />
                    <Button color='primary' mt={12} rightIcon={<FaArrowRight />} disabled={buttonDisable} onClick={() => {navigate(`/reference/${referenceNum}`)}}>Choose Image</Button>
                </Flex>
            </Flex>
            <Bottombar />
        </>

    );
}



export default Index;