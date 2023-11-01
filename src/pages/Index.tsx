import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Image,
    Modal, Paper,
    SegmentedControl,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import Navbar from "../components/Navbar";
import Bottombar from "../components/Bottombar";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useDisclosure, useViewportSize} from "@mantine/hooks";
import {FaArrowRight, FaCircleUser, FaSquareArrowUpRight} from "react-icons/fa6";
import IndexImage from '../assets/images/index-page/Studio photographer-amico.png';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../services/AuthContextProvider";
import QrScanner from "qr-scanner";
import IconCancel from "../assets/message-icons/icons8-cancel.svg";
import {modals} from "@mantine/modals";
import axios from "axios";
import Cookies from "universal-cookie";

function Index(){
    /* Getting current viewport sizes */
    const {width, height} = useViewportSize();

    const navigate = useNavigate();

    /* Getting current logged user */
    const { user, setUser } = useContext(AuthContext);

    /* Adding modal to add reference number */
    const [opened, {open, close}] = useDisclosure(false);
    const [segValue, useSegValue] = useState('ref-number');

    const [refNumber, setRefNumber] = useState('127123418769');
    const [refValid, setRefValid] = useState(true);
    const [refErrorText, setRefErrorText] = useState('');

    /* Video element for QR code scanning */
    let videoElement = useRef<HTMLVideoElement|null>(null);
    let qrScanner: QrScanner | null = null;
    const [qrBgColor, setQrBgColor] = useState('gray.1');

    const [errorModalText, setErrorModalText] = useState('');

    useEffect(() => {
        /* Handling qr code open and closing */
        /* Getting access to camera */

        if(segValue === 'qr-code'){
            /* Changing to QR reference mode */
            navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 320}})
                .then(stream => {

                    if(videoElement.current){
                        videoElement.current.srcObject = stream;

                        qrScanner = new QrScanner(videoElement.current, result => {
                            /* Checking the validity of the reference code and redirect */
                            const refNumber = result.data.toString();
                            const regex = /[0-9]{12}/;

                            if(regex.test(refNumber)){
                                setQrBgColor('green.5');
                                qrScanner?.stop();
                                navigate(`/reference/${refNumber}`);
                            }
                        }, {});

                        if(qrScanner) {
                            qrScanner.start();
                        }
                    } else {
                        showErrorMessage('Error: Cannot access webcam');
                    }
                })
                .catch(error => showErrorMessage(error));
        } else {
            /* Changing to reference number mode */
            navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 320}})
                .then(stream => {
                    const tracks = stream.getVideoTracks();

                    tracks.forEach(track => track.stop());
                })
                .catch(error => showErrorMessage(error));
        }

    }, [segValue]);

    const handleRefChange = (refValue: string) => {
        /* Checking the current string value */
        const oldRegex = /^[0-9]{12}$/;
        const firstRegex = /^[0-9]{9}(V|v)$/;

        if(!oldRegex.test(refValue) && !firstRegex.test(refValue)){
            /* Entered value not valid */
            setRefValid(false);
            setRefErrorText('Invalid reference number. please check the reference number');
        } else {
            /* Entered value is valid */
            setRefValid(true);
            setRefErrorText('');
        }

        setRefNumber(refValue);
    }

    async function handleReferenceSubmit(){
        /* Saving the access token in cookies */
        const cookie = new Cookies();
        const token = cookie.get('Access-Token');

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/studio/appointments/${refNumber}/check-validity`,
            null , {headers: {
                    'Authorization': 'Bearer ' + token
                }})
            .then(response => {
                const data = response.data;

                if(data.validity === true){
                    navigate(`/reference/${refNumber}`);
                } else {
                    setRefErrorText('Invalid reference number. please check the reference number');
                }
            }).catch(err => {
                console.log(err);
            });
    }

    const showErrorMessage = (errorText: string) => {
        modals.open({
            children: (
                <Flex direction='row' align='center' justify='center'>
                    <Image src={IconCancel} maw={32} mx={12}/>
                    <Title weight='normal' ml={4} order={4} align='center' color='red.9'>{errorText}</Title>
                </Flex>
            ),
            withCloseButton: false,
            closeOnClickOutside: false,
            centered: true
        });
    }

    return (
        <>
            <Navbar protectedRoute={false} />
            <Modal opened={opened} onClose={close} withCloseButton={false} centered>
                <Flex direction='column' align='center'>
                    <SegmentedControl color='primary' value={segValue} onChange={useSegValue} data={[{ label: 'Reference number', value: 'ref-number'}, { label: 'QR code', value: 'qr-code'}]} />
                    {/* Changing parts of reference number modal */}
                    { segValue === 'ref-number' &&
                        <>
                            <TextInput size='lg' mt={16} value={refNumber} onChange={(event) => { handleRefChange(event.target.value) }}/>
                            <Text size='sm' color='red'>{refErrorText}</Text>
                            <Button color='primary' mt={12} rightIcon={<FaArrowRight />} disabled={!refValid} onClick={handleReferenceSubmit}>Choose Image</Button>
                        </>
                     }
                    { segValue === 'qr-code' &&
                        <>
                            <Center mt={16} p={4} bg={qrBgColor}>
                                {/* Web cam placeholder */}
                                <video id='qr-code-scanner' height='360' ref={videoElement} autoPlay/>
                            </Center>
                        </>
                    }
                </Flex>
            </Modal>
            <Flex direction='row' align='center' justify='center' w={width - 48} h={height - 96} py='auto' mx={24}>
                <Image src={IndexImage} fit='contain' height={(height - 96) * 0.8}/>
                <Container>
                    <Title pb={12} order={1} color='primary.8'>ICAO Studio Web App</Title>
                    <Text pb={24}>Instant checking of photographs adhering to internationally recognized ICAO (International Civil Aviation Organization) standards. </Text>
                    <Flex direction='row' align='center' justify='start'>
                        { !user && <Button variant='filled' color='primary' mx={6} onClick={() => navigate('/signin')}>Sign in&nbsp;<FaCircleUser/></Button> }
                        { user && <>
                            <Button variant='filled' color='primary' mx={6} onClick={open}>Choose image&nbsp;<FaArrowRight/></Button>
                            </>
                        }
                    </Flex>
                </Container>
            </Flex>

            <Bottombar />
        </>

    );
}

export default Index;