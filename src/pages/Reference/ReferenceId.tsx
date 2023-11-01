import {
    Badge,
    Box,
    Button,
    Center,
    Container,
    Flex,
    Image,
    Progress,
    ScrollArea, Skeleton,
    Stepper,
    Table,
    Text,
    Title
} from "@mantine/core";
import Navbar from "../../components/Navbar";
import {useParams} from "react-router-dom";
import Bottombar from "../../components/Bottombar";
import {useMediaQuery, useViewportSize} from "@mantine/hooks";
import ImageUpload from "../../components/Image/ImageUpload";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {modals} from "@mantine/modals";
import IconCancel from "../../assets/message-icons/icons8-cancel.svg";
import UploadImage from "../../assets/images/upload-image.svg";
import ICAOGuidelines, {ICAOGuideLine} from "../../data/ICAOGuildelines";
import ICAOProgressDTO from "../../services/ICAOProgressDTO";
import ICAOProgressCard from "../../components/ICAOProgressCard";
import ICAOProgressTable from "../../components/ICAOProgressTable";
import Cookies from "universal-cookie";
import app from "../../App";

function ReferenceId(){
    /* Getting the reference id from params */
    const { refId } = useParams();
    const { width, height } = useViewportSize();

    /* Use of media query */
    const largeScreen = useMediaQuery('(min-width: 60em)');

    const [ uploadState, setUploadState ] = useState<PhotoUploadState>(PhotoUploadState.EMPTY_IMAGE);

    const [ overallValidity, setOverallValidity ] = useState<boolean | null>(null);
    const [ icaoComValue, setIcaoComValue ] = useState<ICAOTest[] | null>(null);
    const [ icaoPassed, setICAOPassed] = useState(false);

    const [imageChecking, setImageChecking] = useState(false);

    const [appointment, setAppointment] = useState<AppFormDTO | null>(null);
    const [isAppointmentLoaded, setIsAppointmentLoaded] = useState(false);

    useEffect(() => {
        if(refId) {
            fetchAppointment(refId);
        }
    }, [refId]);

    async function fetchAppointment(refNumber: string){
        /* Saving the access token in cookies */
        const cookie = new Cookies();
        const token = cookie.get('Access-Token');

        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/studio/appointments/${refNumber}/get-appointment`, {headers: {
                    'Authorization': 'Bearer ' + token
                }})
            .then(response => {
                const data = response.data;

                // Setting the appointment data
                setAppointment({appointment_id: data.appointment_id, first_name: data.first_name, last_name: data.last_name, NIC: data.NIC, contact_num: data.contact_num, email: data.email});

                setIsAppointmentLoaded(true);
            })
            .catch(err => console.log(err));
    }

    const checkImageValidity = async (file: File) => {
        /* Handling ICAO image checking */

        const formData = new FormData();
        formData.append('file', file);
        const postUrl = `${process.env.REACT_APP_ICAO_VALIDATE_BACKEND}/validate_icao`;

        setUploadState(PhotoUploadState.CHECKING_IMAGE);

        setOverallValidity(true);
        // setUploadState(PhotoUploadState.CHECKED_VALID_IMAGE);
        setImageChecking(true);
        setIcaoComValue(null);

        await axios.post(postUrl,
            formData, { headers: {
                        'Content-Type': 'multipart/form-data',
            }}).then(response => {
                const data = response.data;
                const testResults = response.data.tests;
                const icao_compliant: boolean = data.is_icao_compliant;

                setICAOPassed(icao_compliant);

                const blurring: ICAOTest = {testName: "Blurred", category: "Photographic and Pose-Specific Tests", is_passed: testResults.blurring.is_passed, time_elapsed: testResults.blurring.time_elapsed};
                const eyes_closed: ICAOTest = {testName: "Eyes Closed", category: "Photographic and Pose-Specific Tests", is_passed: testResults.eyes_closed.is_passed, time_elapsed: testResults.eyes_closed.time_elapsed};
                const geometry: ICAOTest = {testName: "Geometry Tests", category: "Geometric Tests(Full Frontal Image Format)", is_passed: testResults.geometry.is_passed, time_elapsed: testResults.geometry.time_elapsed};
                const hair_across_eyes: ICAOTest = {testName: "Eyes Closed", category: "Photographic and Pose-Specific Tests", is_passed: testResults.hair_across_eyes.is_passed, time_elapsed: testResults.hair_across_eyes.time_elapsed};
                const illumination_intensity: ICAOTest = {testName: "Illumination Intensity", category: "Photographic and Pose-Specific Tests", is_passed: testResults.illumination_intensity.is_passed, time_elapsed: testResults.illumination_intensity.time_elapsed};
                const looking_away: ICAOTest = {testName: "Looking Away", category: "Photographic and Pose-Specific Tests", is_passed: testResults.looking_away.is_passed, time_elapsed: testResults.looking_away.time_elapsed};
                const mouth_open: ICAOTest = {testName: "Mouth open", category: "Photographic and Pose-Specific Tests", is_passed: testResults.mouth_open.is_passed, time_elapsed: testResults.mouth_open.time_elapsed};
                const redeye: ICAOTest = {testName: "Red Eyes", category: "Photographic and Pose-Specific Tests", is_passed: testResults.redeye.is_passed, time_elapsed: testResults.redeye.time_elapsed};
                const shadows_across_face: ICAOTest = {testName: "Shadows Across Face", category: "Photographic and Pose-Specific Tests", is_passed: testResults.shadows_across_face.is_passed, time_elapsed: testResults.shadows_across_face.time_elapsed};
                const varied_bg: ICAOTest = {testName: "Varied Background", category: "Photographic and Pose-Specific Tests", is_passed: testResults.varied_bg.is_passed, time_elapsed: testResults.varied_bg.time_elapsed};

                setOverallValidity(false);
                setIcaoComValue([blurring, eyes_closed, geometry, hair_across_eyes, illumination_intensity, looking_away, mouth_open, redeye, shadows_across_face, varied_bg]);
                setImageChecking(false);

                if(icao_compliant){
                    setUploadState(PhotoUploadState.CHECKED_VALID_IMAGE);
                } else {
                    setUploadState(PhotoUploadState.CHECKED_INVALID_IMAGE);
                }
            })
            .catch(err => {
                // TODO: Remove commented parts
                showErrorMessage('Internal server error. Please try again later!');
            });
    }

    /* Handling error messages */
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
            <Navbar protectedRoute={true} />
            <Flex direction={ largeScreen ? 'row' : 'column'}>
                <Box w={largeScreen ? width * 0.7 : width} h={height - 96}>
                    <Box p={12} pl={28} w='full'>
                        <Text size={16} color='grey.7'>Applicant details</Text>
                        {
                            !appointment && <Box my={12}>
                                <Skeleton height={24} width='50%' radius="sm" />
                                <Flex direction='row' my={4}>
                                    <Skeleton height={20} width={156} radius='sm' />
                                    <Skeleton height={20} width={156} radius='sm' ml={24} />
                                </Flex>
                                <Skeleton height={24} mt={8} width='75%' radius="sm" />
                            </Box>
                        }
                        {
                            appointment && <Box my={4}>
                                <Title order={2}>{appointment.first_name}&nbsp;{appointment.last_name}</Title>
                                <Flex direction='row' my={4}>
                                    <Text size={14}>Contact number - {appointment.contact_num}</Text>
                                    <Text size={14} ml={24}>Email - {appointment.email}</Text>
                                </Flex>
                                <Flex direction='row' my={4}>
                                    <Text size={14}>NIC - {appointment.NIC}</Text>
                                    <Badge variant="light" color="primary" radius="xs" ml={48}>Reference num - {appointment.appointment_id}</Badge>
                                </Flex>
                            </Box>
                        }
                    </Box>
                    <Box p={12} pl={28}>
                        <Title order={2} color='primary.8'>Check ICAO compliance score</Title>
                        { (uploadState === PhotoUploadState.EMPTY_IMAGE || uploadState === PhotoUploadState.SELECTED_IMAGE || uploadState === PhotoUploadState.CHECKING_IMAGE) &&
                            <Flex direction='column' align='center'>
                                <Image maw={240} mt={12} mx='auto' src={UploadImage} />
                                <Text>Please upload the image to check compliance score</Text>
                            </Flex>
                        }

                        { (uploadState === PhotoUploadState.CHECKED_VALID_IMAGE || uploadState === PhotoUploadState.CHECKED_INVALID_IMAGE) &&
                            <>
                            { icaoComValue && <Text size='sm'>ICAO validity status - { icaoPassed ? <Badge color='success'>Valid Image</Badge> : <Badge color='error'>Invalid Image</Badge>}</Text> }
                                { /* ICAO guideline summary */}
                                <ScrollArea.Autosize  mah={256} px={24}>
                                    {/*<ICAOProgressCard icaoProgress={icaoProgress} />*/}
                                    {/*<ICAOProgressTable icaoProgress={icaoProgress} />*/}
                                    {
                                        icaoComValue && icaoComValue.map((testResult: ICAOTest) => <Flex my={6} direction='row' justify='space-between'>
                                        <Box>
                                            <Text size={14}>{testResult.testName}</Text>
                                            <Text size={12} color='grey.7'>{testResult.category}</Text>
                                        </Box>
                                        <Flex direction='column' align='flex-end'>
                                            {
                                                testResult.is_passed === true ? <Badge variant="light" color="green" radius="xs">Test passed</Badge> : <Badge variant="light" color="red" radius="xs">Test failed</Badge>
                                            }
                                            <Text size={12} color='grey.7'>Time elapsed - {testResult.time_elapsed} seconds</Text>
                                        </Flex>
                                        </Flex>)
                                    }
                                </ScrollArea.Autosize >
                            </>
                        }
                    </Box>
                </Box>
                <Flex direction='column' w={largeScreen ? width * 0.3 : width} h={height - 96} bg='gray.0' align='center' justify='center'>
                    <ImageUpload uploadState={uploadState} setUploadState={setUploadState} width={largeScreen ? width * 0.35 * 0.8 : width * 0.8} height={(height - 96) * 0.8} showErrorMessage={showErrorMessage} checkImageValidity={checkImageValidity} imageChecking={imageChecking}/>
                </Flex>
            </Flex>
            <Bottombar />
        </>

    );
}

/* Enums for handling image upload state */
export enum PhotoUploadState{
    EMPTY_IMAGE = "EMPTY_IMAGE",
    SELECTED_IMAGE = "SELECTED_IMAGE",
    CHECKING_IMAGE = "CHECKING_IMAGE",
    CHECKED_VALID_IMAGE = "CHECKED_VALID_IMAGE",
    CHECKED_INVALID_IMAGE = "CHECKED_INVALID_IMAGE"
}

interface AppFormDTO{
    appointment_id: string;
    first_name: string;
    last_name: string;
    NIC: string;
    contact_num: string;
    email: string;
}

interface ICAOTest{
    testName: string;
    category: string;
    is_passed: boolean;
    time_elapsed: number;
}

export default ReferenceId;