import Navbar from "../../components/Navbar";
import React, {useEffect, useState} from "react";
import Bottombar from "../../components/Bottombar";
import {Button, Container, Flex, Grid, Image, Input, Modal, Text, Title} from "@mantine/core";
import AppointmentImage from "../../assets/images/appointment-page/undraw_Live_photo_re_4khn.png";
import {FaArrowRight, FaCircleUser, FaSquareArrowUpRight} from "react-icons/fa6";
import {useDisclosure, useViewportSize} from "@mantine/hooks";
import axios from "axios";
import IconCancel from "../../assets/message-icons/icons8-cancel.svg";
import IconCheck from "../../assets/message-icons/icons8-checkmark-150.svg";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

export default function Appointment(){
    const navigate = useNavigate();
    /* Getting current viewport sizes */
    const {width, height} = useViewportSize();

    const [invalidData, setInvalidData] = useState(true);

    const [appData, setAppData] = useState<AppFormDTO>({first_name: 'Your first name', last_name: 'Your last name', NIC: 'NIC number', address: 'Your address', contact_num: 'Your contact number', email: 'Your email address'});

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [NICError, setNICError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [contactNumError, setContactNumError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        const oldNICRegx = /^[0-9]{9}(V|v)$/;
        const newNICRegx = /^[0-9]{12}$/;
        const contactNumRegx = /^[0-9]{10}$/;
        const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        // Convert all error to initial state
        setFirstNameError('');
        setLastNameError('');
        setNICError('');
        setAddressError('');
        setContactNumError('');
        setEmailError('');

        if(appData.first_name.length < 1 && appData.first_name.length > 128){
            setFirstNameError('Invalid first name');
            setInvalidData(true);
        } else if(appData.first_name.length < 1 && appData.first_name.length > 128){
            setLastNameError('Invalid last name');
            setInvalidData(true);
        } else if(appData.address.length < 1){
            setAddressError('Invalid address');
            setInvalidData(true);
        } else if(!oldNICRegx.test(appData.NIC) && !newNICRegx.test(appData.NIC)){
            setNICError('Invalid NIC number');
            setInvalidData(true);
        } else if(!contactNumRegx.test(appData.contact_num)){
            setContactNumError('Invalid contact number');
            setInvalidData(true);
        } else if(!emailRegx.test(appData.email)){
            setEmailError('Invalid email address');
            setInvalidData(true);
        } else {
            setInvalidData(false);
        }
    }, [appData]);

    /* Managing modal elements */
    const [modalColor, setModalColor] = useState('green.9');
    const [modalText, setModalText] = useState('');
    const [modalIcon, setModalIcon] = useState(IconCancel);

    const [overlayVisible, setOverlayVisible] = useState(false);
    const [overlayClosable, setOverlayClosable] = useState(false);

    /* Managining the modal */
    const [opened, { open, close }] = useDisclosure(false);

    /* Closing the overlay */
    function closeModal(){
        close();
    }

    async function createAppointment(){
        /* Display the overlay */
        setOverlayVisible(true);
        setOverlayClosable(false);
        open();

        setModalColor('green.9');
        setModalText('Please wait as we creating your appointment. Almost there..');
        /* Axios call to the backend for creating appointment */
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/studio/appointments`, {
            first_name: appData.first_name,
            last_name: appData.last_name,
            NIC: appData.NIC,
            address: appData.address,
            contact_num: appData.contact_num,
            email: appData.email
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) =>{
            // Sucessfully created appointment
            setOverlayClosable(true);
            setModalIcon(IconCheck);
            setModalText('Appointment successfully created and sent for confirmation. We will send you an email once it is accepted!');
            setModalColor('green.9');

            /* Hiding the success modal */
            setTimeout(() => {
                closeModal();
                setModalColor('green.9');
                setModalText('');

                /* Redirect to the home page */
                navigate('/');
            }, 5000);
        }).catch((err) => {
            setModalText('Something went wrong! Please try later');

            setOverlayClosable(true);
            setModalIcon(IconCancel);
            setModalColor('red.9');
        })
    }

    return <>
        <Navbar protectedRoute={false} />
        { overlayVisible &&
            <Modal opened={opened} onClose={close} withCloseButton={false} closeOnClickOutside={overlayClosable} centered>
                <Flex direction='row' align='center' justify='center'>
                    <Image src={modalIcon} maw={32} mx={12}/>
                    <Title weight='normal' ml={4} order={4} align='center' color={modalColor}>{modalText}</Title>
                </Flex>
            </Modal>
        }
        <Flex direction='row' align='center' justify='space-evenly' w={width - 48} h={height - 96} py='auto' mx={24}>
            <Flex direction='column' align='stretch' w={512}>
                <Title pb={12} order={1} color='primary.8'>Make an appointment today!</Title>
                <Grid>
                    <Grid.Col span={6}>
                        <Input.Wrapper label="First name" withAsterisk error={firstNameError}>
                            <Input value={appData.first_name} onChange={(e) => setAppData({ ...appData, first_name: e.target.value})}/>
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Input.Wrapper label="Last name" withAsterisk error={lastNameError}>
                            {/* @ts-ignore */}
                            <Input value={appData.last_name} onChange={(e) => setAppData({ ...appData, last_name: e.target.value})}/>
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Input.Wrapper label="NIC number" withAsterisk error={NICError}>
                            {/* @ts-ignore */}
                            <Input value={appData.NIC} onChange={(e) => setAppData({ ...appData, NIC: e.target.value})}/>
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Input.Wrapper label="Address" withAsterisk error={addressError}>
                            {/* @ts-ignore */}
                            <Input value={appData.address} onChange={(e) => setAppData({ ...appData, address: e.target.value})}/>
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Input.Wrapper label="Contact number" withAsterisk error={contactNumError}>
                            {/* @ts-ignore */}
                            <Input value={appData.contact_num} onChange={(e) => setAppData({ ...appData, contact_num: e.target.value})}/>
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Input.Wrapper label="Email address" withAsterisk error={emailError}>
                            {/* @ts-ignore */}
                            <Input value={appData.email} onChange={(e) => setAppData({ ...appData, email: e.target.value})}/>
                        </Input.Wrapper>
                    </Grid.Col>
                </Grid>
                <Button color='primary' mt={12} rightIcon={<FaArrowRight />} disabled={invalidData} onClick={createAppointment}>Create appointment</Button>
            </Flex>
            <Image src={AppointmentImage} fit='contain' width='auto' height={(height - 96) * 0.8}/>

        </Flex>
        <Bottombar/>
    </>
}

interface AppFormDTO{
    first_name: string;
    last_name: string;
    NIC: string;
    address: string;
    contact_num: string;
    email: string;
}