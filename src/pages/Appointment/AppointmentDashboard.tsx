import Navbar from "../../components/Navbar";
import Bottombar from "../../components/Bottombar";
import {
    Box,
    Button,
    Collapse,
    Container,
    Flex,
    Group,
    Text,
    Image,
    Modal,
    Table,
    Title,
    Skeleton,
    Badge
} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {useDisclosure, useViewportSize} from "@mantine/hooks";
import IconCancel from "../../assets/message-icons/icons8-cancel.svg";
import IconCheck from "../../assets/message-icons/icons8-checkmark-150.svg";
import EmptyImage from "../../assets/images/appointment-page/undraw_No_data_re_kwbl.png";
import InfoIcon from "../../assets/message-icons/info-solid.svg";
import axios from "axios";
import Cookies from "universal-cookie";
import {FaCheck, FaXmark} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

export default function AppointmentDashboard() {
    const navigate = useNavigate();
    /* Getting current viewport sizes */
    const {width, height} = useViewportSize();

    /* Managing modal elements */
    const [modalColor, setModalColor] = useState('green.9');
    const [modalText, setModalText] = useState('');
    const [modalIcon, setModalIcon] = useState(IconCancel);
    const [modelIconVisible, setModelIconVisible] = useState(true);

    const [overlayVisible, setOverlayVisible] = useState(false);
    const [overlayClosable, setOverlayClosable] = useState(false);

    /* Managining the modal */
    const [opened, { open, close }] = useDisclosure(false);

    /* Closing the overlay */
    function closeModal(){
        close();
    }

    const [collapseRecentOpened, { toggle: recentToggle  }] = useDisclosure(true);
    const [collapsePastOpened, { toggle: pastToggle }] = useDisclosure(true);

    const [pendingAppData, setPendingAppData] = useState<AppointData[] | null>(null);
    const [completedAppData, setCompeletedAppData] = useState<AppointData[] | null>(null);
    const [appDataLoaded, setAppDataLoaded] = useState(false);

    const [disableAppointBtn, setDisableAppointBtn] = useState(false);

    async function getAppointments(){
        /* Saving the access token in cookies */
        const cookie = new Cookies();
        const token = cookie.get('Access-Token');

        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/studio/appointments/`,
            {headers: {
                    'Authorization': 'Bearer ' + token
                }})
            .then(response => {
                const data = response.data;

                let pendingAppData: AppointData[] = [];
                let completedAppData: AppointData[] = [];

                /* @ts-ignore */
                data.forEach(item => {
                    if(item.status === 'PENDING'){
                        pendingAppData.push({appID: item.appointment_id,
                            first_name: item.first_name,
                            last_name: item.last_name,
                            contact_num: item.contact_num,
                            email: item.email,
                            status: item.status,
                            reference_number: item.reference_number
                        });
                    } else {
                        completedAppData.push({appID: item.appointment_id,
                            first_name: item.first_name,
                            last_name: item.last_name,
                            contact_num: item.contact_num,
                            email: item.email,
                            status: item.status,
                            reference_number: item.reference_number
                        });
                    }
                });

                setAppDataLoaded(true);
                setPendingAppData(pendingAppData);
                setCompeletedAppData(completedAppData);
            })
            .catch(err => {
                setModalText('Something went wrong! Please try later');

                setOverlayClosable(true);
                setModalIcon(IconCancel);
                setModalColor('red.9');
            })
    }

    async function acceptAppointment(appointment_id: string){
        // Disabling appoint button
        setDisableAppointBtn(true);

        /* Saving the access token in cookies */
        const cookie = new Cookies();
        const token = cookie.get('Access-Token');

        /* Display the overlay */
        setOverlayVisible(true);
        setOverlayClosable(false);
        open();

        setModelIconVisible(false);
        setModalColor('green.9');
        setModalText('Please wait as we are processing your request!');

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/studio/appointments/${appointment_id}/accept`,
            null,{headers: {
                    'Authorization': 'Bearer ' + token
                }})
            .then(response => {
                // Sucessfully accepted appointment
                setModelIconVisible(true);
                setOverlayClosable(true);
                setModalIcon(IconCheck);
                setModalText('Appointment successfully accepted and we have send mail with refernce number');
                setModalColor('green.9');

                /* Hiding the success modal */
                /* Hiding the success modal */
                closeModal();
                setModalColor('green.9');
                setDisableAppointBtn(false);
                window.location.reload();
            })
            .catch(error => {
                setModalText('Something went wrong! Please try later');

                setModelIconVisible(true);
                setOverlayClosable(true);
                setModalIcon(IconCancel);
                setModalColor('red.9');
                setDisableAppointBtn(false);
            });
    }

    async function rejectAppointment(appointment_id: string){
        // Disabling appoint button
        setDisableAppointBtn(true);

        /* Display the overlay */
        setOverlayVisible(true);
        setOverlayClosable(false);
        open();

        setModelIconVisible(false);
        setModalColor('green.9');
        setModalText('Please wait as we are processing your request!');

        /* Saving the access token in cookies */
        const cookie = new Cookies();
        const token = cookie.get('Access-Token');

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/studio/appointments/${appointment_id}/reject`,
            null, {headers: {
                    'Authorization': 'Bearer ' + token
                }})
            .then(response => {
                // Sucessfully accepted appointment
                setModelIconVisible(true);
                setOverlayClosable(true);
                setModalIcon(IconCheck);
                setModalText('Appointment successfully rejected and we have send mail');
                setModalColor('green.9');

                /* Hiding the success modal */
                closeModal();
                setModalColor('green.9');
                setDisableAppointBtn(false);
                window.location.reload();
            })
            .catch(error => {
                setModalText('Something went wrong! Please try later');
                setModelIconVisible(true);
                setOverlayClosable(true);
                setModalIcon(IconCancel);
                setModalColor('red.9');
                setDisableAppointBtn(false);
            });
    }

    useEffect(() => {
        getAppointments();
    }, []);

    return <>
        { overlayVisible &&
            <Modal opened={opened} onClose={close} withCloseButton={false} closeOnClickOutside={overlayClosable} centered>
                <Flex direction='row' align='center' justify='center'>
                    { modelIconVisible && <Image src={modalIcon} maw={32} mx={12}/> }
                    <Title weight='normal' ml={4} order={4} align='center' color={modalColor}>{modalText}</Title>
                </Flex>
            </Modal>
        }
        <Navbar protectedRoute={true}/>
        <Container fluid px={128} mih={height - 96}>
            <Title align='center' pt={16} color='primary.8'>OneID Studio Dashboard</Title>
            <Box mx="auto" mt={28}>
                <Group mb={5}>
                    <Button onClick={recentToggle} variant='white' mb={12}>
                        <Title align='left' order={3} color='grey.8'>Recent appointments (Pending)</Title>
                    </Button>
                </Group>

                <Collapse in={collapseRecentOpened}>
                    { !appDataLoaded &&
                        <Flex direction='row' justify='left' wrap='wrap'>
                            <Skeleton w={256} h={160} mx={28}/>
                            <Skeleton w={256} h={160} mx={28}/>
                            <Skeleton w={256} h={160} mx={28}/>
                        </Flex>
                    }
                    {
                        appDataLoaded && (!pendingAppData || pendingAppData?.length  === 0) &&
                        <Flex direction='column' h={160} align='center' justify='center' p={16}>
                            <Image src={EmptyImage} fit='contain' height={100} />
                            <Title order={5} color='grey.6' weight='normal'>No pending appointments available</Title>
                        </Flex>
                    }
                    {
                        appDataLoaded && (pendingAppData) &&
                        <Flex direction='row' justify='left' wrap='wrap'>
                            { pendingAppData.map((appData: AppointData) =>
                                <Box w={272} mih={160} mx={14} mb={8} style={{ border: '1px solid #D9D9D9', borderRadius: '8px'}} p={16} >
                                    <Text size={12}>Applicant name</Text>
                                    <Title weight='bold' size={20}>{appData.first_name}&nbsp;{appData.last_name}</Title>
                                    <Box mt={4}>
                                        <Text size={12}>Contact num - {appData.contact_num}</Text>
                                    </Box>
                                    <Box>
                                        <Text size={12}>Email - {appData.email}</Text>
                                    </Box>
                                    <Flex align='center' justify='space-evenly' mt={12}>
                                        <Button variant="filled" size='sm' color="green" onClick={() => { acceptAppointment(appData.appID)}} leftIcon={<FaCheck/>} disabled={disableAppointBtn}>Accept</Button>
                                        <Button variant="light" size='sm' color="red" onClick={() => { rejectAppointment(appData.appID)}} leftIcon={<FaXmark/>} disabled={disableAppointBtn}>Reject</Button>
                                    </Flex>
                                </Box>) }
                        </Flex>
                    }
                </Collapse>
            </Box>
            <Box mx="auto">
                <Group mb={5}>
                    <Button onClick={pastToggle} variant='white' my={12}>
                        <Title align='left' order={3} color='grey.8'>Completed appointments</Title>
                    </Button>
                </Group>

                <Collapse in={collapsePastOpened}>
                    { !appDataLoaded &&
                        <Flex direction='row' justify='left' wrap='wrap'>
                            <Skeleton w={256} h={160} mx={28}/>
                            <Skeleton w={256} h={160} mx={28}/>
                            <Skeleton w={256} h={160} mx={28}/>
                        </Flex>
                    }
                    {
                        appDataLoaded && (!completedAppData || completedAppData?.length  === 0) &&
                        <Flex direction='column' h={160} align='center' justify='center' p={16}>
                            <Image src={EmptyImage} fit='contain' height={100} />
                            <Title order={5} color='grey.6' weight='normal'>No completed appointments available</Title>
                        </Flex>
                    }
                    {
                        appDataLoaded && (completedAppData) &&
                        <Flex direction='row' justify='left' wrap='wrap'>
                            { completedAppData.map((appData: AppointData) =>
                                <Box w={272} mih={160} mx={14} mb={8} style={{ border: '1px solid #D9D9D9', borderRadius: '8px'}} p={16} >
                                    <Text size={12}>Applicant name</Text>
                                    <Title weight='bold' size={20}>{appData.first_name}&nbsp;{appData.last_name}</Title>
                                    <Box mt={4}>
                                        <Text size={12}>Contact num - {appData.contact_num}</Text>
                                    </Box>
                                    <Box>
                                        <Text size={12}>Email - {appData.email}</Text>
                                    </Box>
                                    <Flex align='center' justify='space-evenly' mt={12}>
                                        { appData.status === 'ACCEPTED' && <Badge variant="light" color="blue" size="xl" radius="xs">{appData.reference_number}</Badge>}
                                        { appData.status === 'REJECTED' && <Badge variant="light" color="red" size="xl" radius="xs">Rejected</Badge>}

                                    </Flex>
                                </Box>) }
                        </Flex>
                    }
                </Collapse>
            </Box>

        </Container>
        <Bottombar />
    </>
}

interface AppointData{
    appID: string;
    first_name: string;
    last_name: string;
    contact_num: string;
    email: string;
    status: string;
    reference_number: string;
}